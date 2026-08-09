/**
 * Curated Material Symbols names for admin pickers (positions, culture cards).
 * Keep labels short — shown next to the glyph in the admin UI.
 */
export const MATERIAL_ICON_OPTIONS = [
  { name: "work", label: "Work" },
  { name: "computer", label: "Computer" },
  { name: "terminal", label: "Terminal" },
  { name: "code", label: "Code" },
  { name: "developer_mode", label: "Developer" },
  { name: "memory", label: "Memory" },
  { name: "cloud", label: "Cloud" },
  { name: "dns", label: "Infrastructure" },
  { name: "hub", label: "Network" },
  { name: "security", label: "Security" },
  { name: "shield", label: "Shield" },
  { name: "shield_lock", label: "Shield lock" },
  { name: "lock", label: "Lock" },
  { name: "vpn_key", label: "VPN key" },
  { name: "verified_user", label: "Verified" },
  { name: "policy", label: "Policy" },
  { name: "gavel", label: "Legal" },
  { name: "analytics", label: "Analytics" },
  { name: "monitoring", label: "Monitoring" },
  { name: "query_stats", label: "Stats" },
  { name: "psychology", label: "Research" },
  { name: "science", label: "Science" },
  { name: "biotech", label: "Biotech" },
  { name: "architecture", label: "Architecture" },
  { name: "design_services", label: "Design" },
  { name: "palette", label: "Creative" },
  { name: "campaign", label: "Marketing" },
  { name: "support_agent", label: "Support" },
  { name: "groups", label: "People" },
  { name: "handshake", label: "Partnership" },
  { name: "business_center", label: "Business" },
  { name: "account_balance", label: "Finance" },
  { name: "engineering", label: "Engineering" },
  { name: "precision_manufacturing", label: "Ops" },
  { name: "settings", label: "Settings" },
  { name: "build", label: "Build" },
  { name: "rocket_launch", label: "Launch" },
  { name: "bolt", label: "Bolt" },
  { name: "visibility", label: "Vision" },
  { name: "public", label: "Global" },
] as const;

export type MaterialIconName = (typeof MATERIAL_ICON_OPTIONS)[number]["name"];

export const DEFAULT_MATERIAL_ICON: MaterialIconName = "work";

const ICON_SET = new Set<string>(MATERIAL_ICON_OPTIONS.map((o) => o.name));

export function isAllowedMaterialIcon(name: string): name is MaterialIconName {
  return ICON_SET.has(name);
}

/** Coerce free-form / legacy values to an allowed icon. */
export function parseMaterialIcon(input: unknown, fallback: MaterialIconName = DEFAULT_MATERIAL_ICON): MaterialIconName {
  const raw = String(input ?? "").trim();
  if (isAllowedMaterialIcon(raw)) return raw;
  return fallback;
}
