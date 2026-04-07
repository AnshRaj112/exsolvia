"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MaterialIcon } from "./components/material-icon";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-background font-body text-on-background antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
          <MaterialIcon name="error" className="mb-6 text-6xl text-primary-container" />
          <h1 className="mb-4 font-headline text-5xl font-black text-white">500</h1>
          <p className="mb-10 max-w-md text-on-surface-variant">
            An internal fault occurred. Our systems are attempting to stabilize the node.
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-sm border border-outline-variant px-8 py-4 font-headline font-bold text-white hover:bg-surface-container-high"
            >
              Retry
            </button>
            <Link
              href="/"
              className="rounded-sm bg-primary-container px-8 py-4 font-headline font-bold text-on-primary"
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
