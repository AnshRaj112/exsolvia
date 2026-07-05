import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { setAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const exists = await AdminUser.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Admin account already exists for this email" },
        { status: 409 },
      );
    }

    const passwordHash = await argon2.hash(password);
    const admin = await AdminUser.create({ name, email, passwordHash });

    const response = NextResponse.json(
      { success: true, data: { id: String(admin._id), name: admin.name, email: admin.email } },
      { status: 201 },
    );
    setAdminSessionCookie(response, { id: String(admin._id), email: admin.email });
    return response;
  } catch (error) {
    console.error("Error signing up admin:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create admin account",
      },
      { status: 500 },
    );
  }
}
