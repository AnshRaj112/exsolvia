/**
 * Public shape for careers + apply (mirrors admin Position fields).
 * Use this type anywhere UI reads role data — not ad-hoc duplicates.
 */

/** Admin-managed label; not a fixed enum. */
export type PositionCategory = string;

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

const LEGACY_CATEGORY_LABELS: Record<string, string> = {
  engineering: "Engineering",
  security: "Security",
  operations: "Operations",
};

/** Case-insensitive identity for matching / deduping categories. */
export function categoryKey(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Sanitize category from API / form input. */
export function parseCategory(input: unknown, fallback = "General"): string {
  const raw = String(input ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 64);
  return raw || fallback;
}

/** Display label (pretty-prints legacy slug values). */
export function formatCategoryLabel(category: string): string {
  const key = categoryKey(category);
  if (LEGACY_CATEGORY_LABELS[key]) return LEGACY_CATEGORY_LABELS[key];
  return category.trim();
}

/**
 * Unique categories from a list, case-insensitive.
 * Prefers a human label (legacy map or first non-empty casing seen).
 */
export function uniqueCategories(categories: Iterable<string>): string[] {
  const seen = new Map<string, string>();
  for (const c of categories) {
    const parsed = parseCategory(c, "");
    if (!parsed) continue;
    const key = categoryKey(parsed);
    if (seen.has(key)) continue;
    seen.set(key, formatCategoryLabel(parsed));
  }
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

/** Normalize GET /api/positions JSON (public active list) to PublicPosition. */
export function publicPositionFromApi(raw: Record<string, unknown>): PublicPosition {
  const tags = raw.tags;
  return {
    _id: String(raw._id ?? ""),
    title: String(raw.title ?? ""),
    summary: typeof raw.summary === "string" ? raw.summary : "",
    icon: typeof raw.icon === "string" && raw.icon.trim() ? raw.icon.trim() : "work",
    tags: Array.isArray(tags) ? tags.map((t) => String(t)) : [],
    description: typeof raw.description === "string" ? raw.description : "",
    isActive: Boolean(raw.isActive),
    category: parseCategory(raw.category),
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
