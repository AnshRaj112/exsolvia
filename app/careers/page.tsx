import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="min-h-screen pb-24">
      <section className="relative overflow-hidden bg-obsidian-gradient px-8 py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="label-md mb-6 block font-semibold uppercase tracking-[0.2em] text-primary-container">
                Career opportunities
              </span>
              <h1 className="mb-8 font-headline text-6xl font-black leading-[0.9] tracking-tighter text-on-surface md:text-8xl">
                Build the <br />
                <span className="text-primary-container">Inevitable</span>
              </h1>
              <p className="max-w-2xl text-xl font-light leading-relaxed text-on-surface-variant md:text-2xl">
                We recruit exceptional people to architect the infrastructure of the synthetic age.
                Open roles will appear here when available.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary-container/10 blur-[120px]" />
      </section>

      <section className="bg-surface-container-lowest px-8 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-md border border-outline-variant/15 bg-surface-container-lowest/40 px-8 py-20 text-center">
          <p className="font-headline text-xl font-semibold text-white md:text-2xl">
            No careers available right now
          </p>
          <p className="mt-4 text-on-surface-variant">
            We are not accepting applications for listed roles at the moment. Follow us for updates.
          </p>
          <Link
            href="/contact"
            className="mt-10 font-label text-xs font-bold uppercase tracking-widest text-primary-container transition-colors hover:text-primary"
          >
            General inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
