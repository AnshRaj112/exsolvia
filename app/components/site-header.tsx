"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MaterialIcon } from "./material-icon";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/build-in-public", label: "Build in Public" },
] as const;

function navLinkClass(active: boolean) {
  if (active) {
    return "text-red-500 font-bold border-b-2 border-red-500 pb-1 font-headline tracking-tight";
  }
  return "text-neutral-400 hover:text-neutral-100 transition-colors font-headline font-bold tracking-tight";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    const path = href;
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-neutral-900/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-xl bg-gradient-to-b from-red-500/5 to-transparent">
      <div className="flex max-w-full items-center justify-between px-4 py-4 sm:px-8">
        <Link
          href="/"
          className="font-headline text-2xl font-black tracking-tighter text-neutral-50"
        >
          EXSOLVIA
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map(({ href, label }) => (
            <Link
              key={href + label}
              href={href}
              className={navLinkClass(isActive(href))}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="text-neutral-400 transition-all duration-300 hover:text-neutral-100"
            aria-label="Contact"
          >
            <MaterialIcon name="contact_support" />
          </Link>
          <Link
            href="/careers/apply"
            className="rounded-sm bg-primary-container px-4 py-2 font-headline font-bold text-on-primary transition duration-200 ease-out hover:opacity-90 active:scale-95 sm:px-6"
          >
            Join Us
          </Link>
          <button
            type="button"
            className="rounded-sm p-2 text-neutral-400 md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MaterialIcon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-neutral-800 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV.map(({ href, label }) => (
              <Link
                key={href + label}
                href={href}
                className="font-headline font-bold text-neutral-200"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
