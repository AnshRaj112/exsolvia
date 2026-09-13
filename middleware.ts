import { NextRequest, NextResponse } from "next/server";
import { rateLimiter, rateLimitHeaders, type RateLimitPolicy } from "@/lib/rate-limit";

const DEFAULT_API_POLICY: RateLimitPolicy = { name: "api", limit: 300, windowMs: 60_000 };
const POLICIES: Record<string, RateLimitPolicy> = {
  "/api/admin/login": { name: "admin-login", limit: 5, windowMs: 15 * 60_000 },
  "/api/contact": { name: "contact-submit", limit: 5, windowMs: 60 * 60_000 },
  "/api/applications": { name: "application-submit", limit: 5, windowMs: 60 * 60_000 },
};

function clientIdentifier(request: NextRequest): string {
  // Vercel and other managed reverse proxies set this header. Only use the
  // first value, which is the originating client when the proxy is trusted.
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

export async function middleware(request: NextRequest) {
  const policy = request.method === "POST"
    ? (POLICIES[request.nextUrl.pathname] ?? DEFAULT_API_POLICY)
    : DEFAULT_API_POLICY;
  const result = await rateLimiter.limit(clientIdentifier(request), policy);
  const headers = rateLimitHeaders(result);

  if (!result.success) {
    const status = result.reason === "unavailable" ? 503 : 429;
    return NextResponse.json(
      { success: false, error: status === 429 ? "Too many requests" : "Rate limiting is temporarily unavailable" },
      { status, headers },
    );
  }

  const response = NextResponse.next();
  for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
  return response;
}

export const config = { matcher: "/api/:path*" };
