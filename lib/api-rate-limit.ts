import { NextRequest, NextResponse } from "next/server";
import { rateLimiter, rateLimitHeaders, type RateLimitPolicy } from "@/lib/rate-limit";

export const ADMIN_PII_READ_POLICY: RateLimitPolicy = { name: "admin-pii-read", limit: 60, windowMs: 60_000 };
export const ADMIN_WRITE_POLICY: RateLimitPolicy = { name: "admin-cms-write", limit: 30, windowMs: 60_000 };
export const APPLICATION_EMAIL_POLICY: RateLimitPolicy = { name: "application-email", limit: 5, windowMs: 60 * 60_000 };

export async function enforceRateLimit(identifier: string, policy: RateLimitPolicy): Promise<NextResponse | null> {
  const result = await rateLimiter.limit(identifier, policy);
  if (result.success) return null;
  const status = result.reason === "unavailable" ? 503 : 429;
  return NextResponse.json(
    { success: false, error: status === 429 ? "Too many requests" : "Rate limiting is temporarily unavailable" },
    { status, headers: rateLimitHeaders(result) },
  );
}
