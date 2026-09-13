import assert from "node:assert/strict";
import test from "node:test";
import { createRateLimiter, rateLimitHeaders } from "./rate-limit.ts";

test("rejects a burst with 429-compatible retry headers", async () => {
  let redisCalls = 0;
  const limiter = createRateLimiter({
    redisUrl: "https://redis.example.test",
    redisToken: "test-token",
    now: () => 1_000,
    random: () => "fixed",
    fetcher: async () => new Response(JSON.stringify({
      result: redisCalls++ === 0 ? [1, 0, 1] : [0, 59_000, 1],
    })),
  });

  const policy = { name: "test", limit: 1, windowMs: 60_000 };
  assert.equal((await limiter.limit("203.0.113.2", policy)).success, true);
  const blocked = await limiter.limit("203.0.113.2", policy);
  assert.equal(blocked.success, false);
  assert.equal(blocked.retryAfter, 59);
  assert.equal(rateLimitHeaders(blocked)["Retry-After"], "59");
});

test("fails closed in production-style configuration when Redis is absent", async () => {
  const limiter = createRateLimiter({ allowMissingConfig: false });
  const result = await limiter.limit("203.0.113.2", { name: "test", limit: 1, windowMs: 60_000 });
  assert.equal(result.success, false);
  assert.equal(result.reason, "unavailable");
});
