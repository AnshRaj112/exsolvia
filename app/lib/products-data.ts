/**
 * Single source of truth for portfolio (landing), products section, and /products catalog.
 * Add new products here; optional per-product copy lives under app/products/<slug>/content.ts
 */

/** Matches the System Catalog filters on /products (excluding “All Units”). */
export type ProductCatalogTag = "enterprise" | "devtools" | "optimization";

export type Product = {
  slug: string;
  name: string;
  /** Shown on cards (e.g. “University management platform”) */
  tagline: string;
  /** One short paragraph for grids and portfolio cards */
  shortDescription: string;
  features: string[];
  badge: string;
  badgeClass: string;
  image: string;
  /** Material Symbols name for landing portfolio */
  materialIcon: string;
  externalUrl?: string;
  /** Which catalog filters include this product (can be multiple). */
  catalogTags: ProductCatalogTag[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "kampyn",
    name: "KAMPYN",
    tagline: "University management platform",
    shortDescription:
      "Fast inventory and online food ordering for campus dining—payments, pickup, and role-based access for admins, vendors, and students.",
    features: [
      "Real-time order tracking",
      "Integrated payments",
      "Inventory and access levels",
      "Campus-wide ordering and pickup",
    ],
    badge: "Live",
    badgeClass: "bg-primary-container text-on-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrIKpwIvP2nXv6_fpi9dXYK3kVoXL-pDrIQ2H_tQtmTjzBAojL3eKcv9OH39br3XovyS9Gc0SreYwGMIoq0mlf1RqsPCWT31jaQGrb4fbIDKxnpa8xK5BsPCQqIwNRhBm0r5zaJlWBJbJFoNLIWkWgKJdr9sYORhJdF_xQsdQwyAcQOyIOuCg94ncmgwou_B1HEDf1Po0VGOTQ_omvMoH4IMaB9LoMjEIdy7xQhGIMNtCMWMU7LiDhyaFU9G1C7Up5FSCjnvd4xY8",
    materialIcon: "analytics",
    externalUrl: "https://kampyn.com",
    catalogTags: ["enterprise"],
  },
];

/** Active tab on the System Catalog bar */
export type CatalogFilterState = "all" | ProductCatalogTag;

export function filterProductsByCatalog(
  products: Product[],
  filter: CatalogFilterState,
): Product[] {
  if (filter === "all") return products;
  return products.filter((p) => p.catalogTags.includes(filter));
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
