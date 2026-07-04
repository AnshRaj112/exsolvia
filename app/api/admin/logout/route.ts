import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  clearAdminSessionCookie(response);
  return response;
}
