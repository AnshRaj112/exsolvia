import Link from "next/link";

export default function BuildInPublicPage() {
  return (
    <main className="obsidian-glow min-h-screen pb-24 pt-8">
      <div className="mx-auto max-w-[1440px] px-8">
        <section className="mb-20">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <label className="font-label mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary-fixed">
                Transparency
              </label>
              <h1 className="font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-white md:text-8xl">
                BUILD IN <span className="text-primary-container">PUBLIC</span>
              </h1>
            </div>
            <div className="pb-4 lg:col-span-4">
              <p className="max-w-sm border-l border-outline-variant/30 pl-6 text-lg leading-relaxed text-gray-400">
                Follow how we ship: experiments, metrics, and lessons from the workbench—when we have
                something to share.
              </p>
            </div>
          </div>
        </section>

        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-md border border-outline-variant/15 bg-surface-container-lowest/40 px-8 py-20 text-center">
          <p className="font-headline text-xl font-semibold text-white md:text-2xl">
            No build in public updates available right now
          </p>
          <p className="mt-4 max-w-md text-on-surface-variant">
            We will post progress, builds, and learnings here when we publish them.
          </p>
          <Link
            href="/blog"
            className="mt-10 font-label text-xs font-bold uppercase tracking-widest text-primary-container transition-colors hover:text-primary"
          >
            Editorial
          </Link>
        </div>
      </div>
    </main>
  );
}
