/**
 * KAMPYN — extended detail copy (edit this file with your own facts, metrics, and story).
 * Core card fields live in app/lib/products-data.ts
 */

export type FeatureBlock = { title: string; body: string };

export const kampynDetailContent = {
  /** Small label above the title on the detail page */
  statusLabel: "Live product",

  /** Longer intro under the hero (2–4 sentences) */
  intro:
    "KAMPYN streamlines how universities run campus dining: from inventory and vendor workflows to student ordering and pickup. " +
    "Teams get one place to operate, while students get a clear path from browse to pay.",

  /** Problem / opportunity (optional section) */
  problem:
    "Campus dining often splits tools across spreadsheets, POS systems, and ad-hoc communication—slowing service and creating gaps in inventory visibility.",

  /** How KAMPYN addresses it */
  approach:
    "KAMPYN brings ordering, payments, and operational views together with roles tuned for how universities actually work.",

  /** Deeper feature blocks for the detail page */
  highlights: [
    {
      title: "Operations in one flow",
      body: "Support day-to-day inventory and fulfillment without jumping between disconnected systems.",
    },
    {
      title: "Built for campus scale",
      body: "Designed for many outlets, time windows, and pickup patterns typical of university dining.",
    },
    {
      title: "Access that matches responsibility",
      body: "Role-based access so staff, vendors, and students see what they need—no more, no less.",
    },
  ] satisfies FeatureBlock[],

  /** Bullet list you can extend */
  outcomes: [
    "Clearer order and payment status for students",
    "Better visibility into inventory and demand",
    "Less manual coordination between teams",
  ],

  /** Technologies — fill in as you like */
  techStack: ["Web app", "Payments integration", "Role-based access"],

  /** Contact or product link overrides (falls back to products-data) */
  primaryCta: { label: "Visit KAMPYN", url: "https://kampyn.com" },
  secondaryCta: { label: "Talk to us", href: "/contact" as const },
};
