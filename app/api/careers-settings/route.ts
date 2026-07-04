import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CareersSettings, { CAREERS_DEFAULTS, type CultureCard } from "@/models/CareersSettings";
import { requireAdminSession } from "@/lib/admin-auth";

export async function GET() {
  try {
    await connectDB();
    let doc = await CareersSettings.findOne({ singletonKey: "default" }).lean();
    if (!doc) {
      await CareersSettings.create({ singletonKey: "default", ...CAREERS_DEFAULTS });
      doc = await CareersSettings.findOne({ singletonKey: "default" }).lean();
    }
    return NextResponse.json({ success: true, data: doc }, { status: 200 });
  } catch (error) {
    console.error("Error fetching careers settings:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch careers settings",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const body = await request.json();

    const {
      heroSubtext,
      statsQuote,
      cultureCards,
      monolithHeading,
      monolithBody,
      monolithImageUrl,
      monolithCtaLabel,
      monolithCtaHref,
      applyPhaseLabel,
    } = body;

    const update: Record<string, unknown> = {};
    if (typeof heroSubtext === "string") update.heroSubtext = heroSubtext;
    if (typeof statsQuote === "string") update.statsQuote = statsQuote;
    if (Array.isArray(cultureCards) && cultureCards.length >= 1) {
      update.cultureCards = cultureCards.map((c: CultureCard) => ({
        title: String(c.title ?? "").trim(),
        icon: String(c.icon ?? "work").trim(),
        description: String(c.description ?? ""),
      }));
    }
    if (typeof monolithHeading === "string") update.monolithHeading = monolithHeading;
    if (typeof monolithBody === "string") update.monolithBody = monolithBody;
    if (typeof monolithImageUrl === "string") update.monolithImageUrl = monolithImageUrl;
    if (typeof monolithCtaLabel === "string") update.monolithCtaLabel = monolithCtaLabel;
    if (typeof monolithCtaHref === "string") update.monolithCtaHref = monolithCtaHref;
    if (typeof applyPhaseLabel === "string") update.applyPhaseLabel = applyPhaseLabel;

    const doc = await CareersSettings.findOneAndUpdate(
      { singletonKey: "default" },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: doc }, { status: 200 });
  } catch (error) {
    console.error("Error updating careers settings:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update careers settings",
      },
      { status: 500 }
    );
  }
}
