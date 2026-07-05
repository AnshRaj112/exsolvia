"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/dashboard");

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen pt-16">{children}</div>
      <SiteFooter />
    </>
  );
}
