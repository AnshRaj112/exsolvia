/**
 * Public shape for careers + apply (mirrors admin Position fields).
 * Use this type anywhere UI reads role data — not ad-hoc duplicates.
 */
export type PositionCategory = "engineering" | "security" | "operations";

export type PublicPosition = {
  _id: string;
  title: string;
  summary: string;
  icon: string;
  tags: string[];
  description: string;
  isActive: boolean;
  category: PositionCategory;
};

/** Normalize GET /api/positions JSON (public active list) to PublicPosition. */
export function publicPositionFromApi(raw: Record<string, unknown>): PublicPosition {
  const tags = raw.tags;
  const cat = String(raw.category ?? "engineering").toLowerCase();
  const category: PositionCategory =
    cat === "security" || cat === "operations" ? cat : "engineering";
  return {
    _id: String(raw._id ?? ""),
    title: String(raw.title ?? ""),
    summary: typeof raw.summary === "string" ? raw.summary : "",
    icon: typeof raw.icon === "string" && raw.icon.trim() ? raw.icon.trim() : "work",
    tags: Array.isArray(tags) ? tags.map((t) => String(t)) : [],
    description: typeof raw.description === "string" ? raw.description : "",
    isActive: Boolean(raw.isActive),
    category,
  };
}

/** Card blurb: summary, else truncated description — no filler copy. */
export function getPositionCardBody(role: PublicPosition, maxDescChars = 280): string | null {
  const s = role.summary.trim();
  if (s) return s;
  const d = role.description.trim();
  if (!d) return null;
  if (d.length <= maxDescChars) return d;
  return `${d.slice(0, maxDescChars).trim()}…`;
}
