"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterGate() {
  const pathname = usePathname();

  // Hide footer on the landing page ("/") so "Coming soon" stands alone.
  if (pathname === "/") return null;

  return <Footer />;
}


