import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Position from "@/models/Position";
import type { PublicPosition } from "@/app/lib/positions-types";

export type { PublicPosition } from "@/app/lib/positions-types";
export { getPositionCardBody } from "@/app/lib/positions-types";

function toPublic(p: {
  _id: unknown;
  title: string;
  summary?: string;
  icon?: string;
  tags?: string[];
  description?: string;
  isActive?: boolean;
  category?: string;
}): PublicPosition {
  const cat = String(p.category ?? "engineering").toLowerCase();
  const category =
    cat === "security" || cat === "operations" ? cat : "engineering";
  return {
    _id: String(p._id),
    title: p.title,
    summary: p.summary ?? "",
    icon: (p.icon ?? "").trim() || "work",
    tags: Array.isArray(p.tags) ? p.tags : [],
    description: p.description ?? "",
    isActive: Boolean(p.isActive),
    category: category as PublicPosition["category"],
  };
}

export async function getActivePositions(): Promise<PublicPosition[]> {
  try {
    await connectDB();
    const docs = await Position.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return docs.map((p) => toPublic(p));
  } catch (error) {
    console.warn("Database connection failed in getActivePositions, returning empty list:", error);
    return [];
  }
}

export async function getPositionById(id: string): Promise<PublicPosition | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  try {
    await connectDB();
    const doc = await Position.findOne({ _id: id, isActive: true }).lean();
    if (!doc) {
      return null;
    }
    return toPublic(doc);
  } catch (error) {
    console.warn(`Database connection failed in getPositionById for id ${id}:`, error);
    return null;
  }
}
