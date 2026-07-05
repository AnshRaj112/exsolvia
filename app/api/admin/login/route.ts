import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { setAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await argon2.verify(admin.passwordHash, password);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json(
      { success: true, data: { id: String(admin._id), name: admin.name, email: admin.email } },
      { status: 200 },
    );
    setAdminSessionCookie(response, { id: String(admin._id), email: admin.email });
    return response;
  } catch (error) {
    console.error("Error logging in admin:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to login" },
      { status: 500 },
    );
  }
}
