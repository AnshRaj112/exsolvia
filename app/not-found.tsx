import Link from "next/link";
import { MaterialIcon } from "./components/material-icon";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
      <MaterialIcon name="search_off" className="mb-6 text-6xl text-primary-container" />
      <h1 className="mb-4 font-headline text-5xl font-black text-white md:text-7xl">404</h1>
      <p className="mb-10 max-w-md text-on-surface-variant">
        The requested resource is not present in the current operational manifest.
      </p>
      <Link
        href="/"
        className="rounded-sm bg-primary-container px-8 py-4 font-headline font-bold text-on-primary transition hover:brightness-110"
      >
        Return Home
      </Link>
    </div>
  );
}
