"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PositionCategory, PublicPosition } from "@/app/lib/positions-types";
import { MaterialIcon } from "@/app/components/material-icon";

const FILTERS: { id: PositionCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "security", label: "Security" },
  { id: "operations", label: "Operations" },
];

type Props = {
  positions: PublicPosition[];
};

export function CareersRolesList({ positions }: Props) {
  const [active, setActive] = useState<PositionCategory | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return positions;
    return positions.filter((p) => p.category === active);
  }, [positions, active]);

  return (
    <section className="px-8 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-4 font-headline text-4xl font-bold tracking-tighter text-on-surface md:text-5xl">
              Open Operative Roles
            </h2>
            <p className="text-on-surface-variant">
              Select a designation to view technical requirements and mission parameters.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2 md:gap-4">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`border px-4 py-2 font-headline text-xs font-bold uppercase tracking-widest transition-colors ${
                  active === f.id
                    ? "border-primary-container bg-primary-container/10 text-primary-container"
                    : "border-outline-variant/30 text-on-surface-variant hover:border-primary-container"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-on-surface-variant">
              No roles in this filter. Try another category.
            </p>
          ) : (
            filtered.map((role) => (
              <div
                key={role._id}
                className="group relative flex flex-col items-center justify-between rounded-md bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container hover:shadow-[0_0_40px_rgba(255,85,63,0.05)] md:flex-row"
              >
                <div className="flex w-full flex-col gap-8 md:flex-row md:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-surface-container-highest text-on-surface transition-colors group-hover:text-primary-container">
                    <MaterialIcon name={role.icon} className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface transition-colors group-hover:text-primary">
                      {role.title}
                    </h3>
                    {role.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="label-md rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 shrink-0 md:mt-0">
                  <Link
                    href={`/careers/apply?position=${encodeURIComponent(role._id)}`}
                    className="flex items-center gap-3 bg-surface-bright px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-primary-container hover:text-on-primary"
                  >
                    Apply to Join
                    <MaterialIcon name="arrow_forward" className="text-sm" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
