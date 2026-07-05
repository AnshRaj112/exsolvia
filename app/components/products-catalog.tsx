"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  filterProductsByCatalog,
  type CatalogFilterState,
  type Product,
} from "../lib/products-data";
import { MaterialIcon } from "./material-icon";

const FILTERS: { id: CatalogFilterState; label: string }[] = [
  { id: "all", label: "All Units" },
  { id: "enterprise", label: "Enterprise Solutions" },
  { id: "devtools", label: "Developer Tools" },
  { id: "optimization", label: "System Optimization" },
];

type Props = {
  products: Product[];
};

export function ProductsCatalog({ products }: Props) {
  const [active, setActive] = useState<CatalogFilterState>("all");

  const visible = useMemo(() => filterProductsByCatalog(products, active), [products, active]);

  return (
    <>
      <div className="sticky top-20 z-40 mb-12 flex flex-wrap items-center gap-3 bg-background/80 py-6 backdrop-blur-md md:gap-4">
        <div className="text-label-md mr-1 border-r border-outline-variant/30 pr-4 font-bold uppercase tracking-[0.2em] text-primary-fixed md:mr-2 md:pr-6">
          System Catalog
        </div>
        {FILTERS.map(({ id, label }) => {
          const isSelected = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-pressed={isSelected}
              className={`rounded-sm px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                isSelected
                  ? "bg-surface-container-high text-on-surface shadow-sm"
                  : "border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:border-primary/50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-md border border-outline-variant/20 bg-surface-container-lowest/50 px-6 py-12 text-center font-body text-on-surface-variant">
          No products in this category yet. Try{" "}
          <button
            type="button"
            className="font-semibold text-primary-container underline-offset-4 hover:underline"
            onClick={() => setActive("all")}
          >
            All Units
          </button>{" "}
          to see the full catalog.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article
              key={p.slug}
              className="group relative overflow-hidden rounded-md bg-surface-container-low transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,85,63,0.15)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  width={600}
                  height={256}
                  className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
                <div
                  className={`absolute right-4 top-4 rounded-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest ${p.badgeClass}`}
                >
                  {p.badge}
                </div>
              </div>
              <div className="p-8">
                <p className="mb-1 font-label text-[10px] uppercase tracking-widest text-primary">
                  {p.tagline}
                </p>
                <h3 className="mb-4 font-headline text-2xl font-bold tracking-tight">{p.name}</h3>
                <p className="mb-8 line-clamp-3 font-body leading-relaxed text-on-surface-variant">
                  {p.shortDescription}
                </p>
                <Link
                  href={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2 font-headline font-bold text-primary-container transition-all group-hover:gap-4"
                >
                  Learn More
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-container transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      )}
    </>
  );
}
