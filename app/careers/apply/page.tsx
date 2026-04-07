import Link from "next/link";
import { MaterialIcon } from "../../components/material-icon";

export default function ApplyPage() {
  return (
    <div className="min-h-screen pb-24 obsidian-glow">
      <div className="mx-auto max-w-3xl px-6 pt-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-primary-container" />
          <span className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-primary-fixed">
            Applications
          </span>
        </div>
        <h1 className="mb-6 font-headline text-5xl font-black leading-none tracking-tighter text-on-surface md:text-6xl">
          Apply
        </h1>
        <div className="rounded-md border border-outline-variant/15 bg-surface-container-lowest/50 px-8 py-16 text-center">
          <p className="font-headline text-xl font-semibold text-white md:text-2xl">
            No careers available right now
          </p>
          <p className="mt-4 text-on-surface-variant">
            There are no open roles to apply for. Please check back later.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 border-t border-outline-variant/20 pt-12">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            Back to careers
          </Link>
          <Link href="/contact" className="font-label text-xs uppercase tracking-widest text-primary-container hover:text-primary">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
