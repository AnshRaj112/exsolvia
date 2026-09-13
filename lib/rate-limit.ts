/**
 * Distributed, atomic sliding-window rate limiting backed by Upstash Redis.
 *
 * This module is runtime-neutral: it uses only fetch and Web Crypto, so it can
 * be called by either Next.js route handlers or middleware (Edge runtime).
 */

export type RateLimitPolicy = {
  /** Maximum requests allowed during `windowMs`. */
  limit: number;
  /** Size of the rolling window in milliseconds. */
  windowMs: number;
  /** A stable name used to separate policies in Redis. */
  name: string;
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number;
  reason?: "unavailable";
};

type LimiterOptions = {
  redisUrl?: string;
  redisToken?: string;
  namespace?: string;
  allowMissingConfig?: boolean;
  fetcher?: typeof fetch;
  now?: () => number;
  random?: () => string;
};

const SLIDING_WINDOW_SCRIPT = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local max = tonumber(ARGV[3])
local member = ARGV[4]
redis.call("ZREMRANGEBYSCORE", key, 0, now - window)
local count = redis.call("ZCARD", key)
if count >= max then
  local oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")
  local retry = window
  if oldest[2] then retry = math.max(1, window - (now - tonumber(oldest[2]))) end
  return {0, retry, count}
end
redis.call("ZADD", key, now, member)
redis.call("PEXPIRE", key, window)
return {1, 0, count + 1}
`;

function configuredLimiterOptions(): LimiterOptions {
  return {
    redisUrl: process.env.UPSTASH_REDIS_REST_URL,
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    namespace: process.env.RATE_LIMIT_NAMESPACE || "exsolvia:rate-limit",
    // A local server should stay usable without external services. Production
    // must configure Redis so it never silently becomes per-instance limiting.
    allowMissingConfig: process.env.NODE_ENV !== "production",
  };
}

async function hashIdentifier(identifier: string): Promise<string> {
  const bytes = new TextEncoder().encode(identifier);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Creates a limiter instance. Exported for integration tests and custom deployments. */
export function createRateLimiter(options: LimiterOptions = {}) {
  const config = { ...configuredLimiterOptions(), ...options };
  const fetcher = config.fetcher ?? fetch;
  const now = config.now ?? Date.now;
  const random = config.random ?? (() => crypto.randomUUID());

  return {
    async limit(identifier: string, policy: RateLimitPolicy): Promise<RateLimitResult> {
      const currentTime = now();
      const reset = currentTime + policy.windowMs;

      if (!config.redisUrl || !config.redisToken) {
        if (config.allowMissingConfig) {
          return { success: true, limit: policy.limit, remaining: policy.limit, reset, retryAfter: 0 };
        }
        return { success: false, limit: policy.limit, remaining: 0, reset, retryAfter: 1, reason: "unavailable" };
      }

      const key = `${config.namespace}:${policy.name}:${await hashIdentifier(identifier)}`;
      try {
        const response = await fetcher(config.redisUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.redisToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            "EVAL", SLIDING_WINDOW_SCRIPT, "1", key,
            String(currentTime), String(policy.windowMs), String(policy.limit), `${currentTime}:${random()}`,
          ]),
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`Redis returned ${response.status}`);

        const payload = (await response.json()) as { result?: [number, number, number]; error?: string };
        if (!payload.result || payload.error) throw new Error(payload.error || "Invalid Redis response");
        const [allowed, retryMs, count] = payload.result;
        const success = allowed === 1;
        const retryAfter = success ? 0 : Math.max(1, Math.ceil(retryMs / 1000));
        return {
          success,
          limit: policy.limit,
          remaining: success ? Math.max(0, policy.limit - count) : 0,
          reset: success ? reset : currentTime + retryMs,
          retryAfter,
        };
      } catch (error) {
        console.error("Rate limiter unavailable", error);
        // Do not make Redis outages an availability incident in development.
        if (config.allowMissingConfig) {
          return { success: true, limit: policy.limit, remaining: policy.limit, reset, retryAfter: 0 };
        }
        return { success: false, limit: policy.limit, remaining: 0, reset, retryAfter: 1, reason: "unavailable" };
      }
    },
  };
}

export const rateLimiter = createRateLimiter();

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
  };
  if (!result.success) headers["Retry-After"] = String(result.retryAfter);
  return headers;
}
