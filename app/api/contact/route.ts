import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { requireAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const organization = String(body?.organization || "").trim();
    const email = String(body?.email || "").trim();
    const clearanceLevel = String(body?.clearanceLevel || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 },
      );
    }

    const inquiry = await ContactInquiry.create({
      name,
      organization: organization || undefined,
      email: email || undefined,
      clearanceLevel: clearanceLevel || undefined,
      message,
    });

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit contact request",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const contacts = await ContactInquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch contact inquiries",
      },
      { status: 500 },
    );
  }
}
