import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "exsolvia_admin_session";
const TTL_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  adminId: string;
  email: string;
  exp: number;
};

function getSecret(): string {
  return (
    process.env.ADMIN_AUTH_SECRET ||
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-insecure-secret-change-this"
  );
}

function base64url(input: Buffer | string): string {
  const value = Buffer.isBuffer(input) ? input.toString("base64") : Buffer.from(input).toString("base64");
  return value.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sign(value: string): string {
  return base64url(crypto.createHmac("sha256", getSecret()).update(value).digest());
}

function encode(payload: SessionPayload): string {
  const body = base64url(JSON.stringify(payload));
  const signature = sign(body);
  return `${body}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  if (sign(body) !== signature) return null;

  try {
    const raw = Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const data = JSON.parse(raw) as SessionPayload;
    if (!data.exp || Date.now() > data.exp * 1000) return null;
    if (!data.adminId || !data.email) return null;
    return data;
  } catch {
    return null;
  }
}

export function setAdminSessionCookie(
  response: NextResponse,
  admin: { id: string; email: string },
): void {
  const payload: SessionPayload = {
    adminId: admin.id,
    email: admin.email,
    exp: Math.floor(Date.now() / 1000) + TTL_SECONDS,
  };
  response.cookies.set(COOKIE_NAME, encode(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_SECONDS,
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getAdminSessionFromRequest(request: NextRequest): SessionPayload | null {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decode(token);
}

export function requireAdminSession(request: NextRequest): SessionPayload | null {
  return getAdminSessionFromRequest(request);
}
