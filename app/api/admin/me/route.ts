import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { requireAdminSession } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const admin = await AdminUser.findById(session.adminId).select("name email");
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { success: true, data: { id: String(admin._id), name: admin.name, email: admin.email } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to check auth" },
      { status: 500 },
    );
  }
}
