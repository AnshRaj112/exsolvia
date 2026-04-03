import Link from "next/link";
import { MaterialIcon } from "../../components/material-icon";

export default function ApplyPage() {
  return (
    <div className="min-h-screen pb-24 obsidian-glow">
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-12 bg-primary-container" />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-primary-fixed">
              Intelligence Recruitment Phase II
            </span>
          </div>
          <h1 className="mb-6 font-headline text-6xl font-black leading-none tracking-tighter md:text-7xl">
            Senior Neural Architect
          </h1>
          <p className="max-w-xl text-lg font-light leading-relaxed text-on-surface-variant">
            Design the cognitive infrastructure of tomorrow. We are seeking a visionary to lead our
            Neural Synthesis division in the development of Tier-1 autonomous logic clusters.
          </p>
        </div>

        <div className="mb-12">
          <div className="mb-3 flex items-end justify-between">
            <span className="font-label text-xs uppercase tracking-widest text-primary-fixed">
              Application Fidelity
            </span>
            <span className="font-headline text-lg font-bold text-primary">45%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full w-[45%] bg-primary-container shadow-[0_0_15px_rgba(255,85,63,0.4)] transition-all duration-1000" />
          </div>
        </div>

        <div className="space-y-12">
          <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">
                Identification
              </h3>
              <p className="text-sm font-light text-neutral-500">
                Verify your biometric and digital presence within our network.
              </p>
            </div>
            <div className="space-y-6 md:col-span-8">
              <div className="group">
                <label className="font-label mb-2 block text-[10px] uppercase tracking-widest text-neutral-500 transition-colors group-focus-within:text-primary">
                  Full Name
                </label>
                <input
                  className="w-full border-none border-b-2 border-transparent bg-surface-container-highest p-4 font-headline text-xl text-on-surface transition-all placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                  placeholder="ERIKSON VANCE"
                  type="text"
                />
              </div>
              <div className="group">
                <label className="font-label mb-2 block text-[10px] uppercase tracking-widest text-neutral-500 transition-colors group-focus-within:text-primary">
                  Neural Mesh / Email
                </label>
                <input
                  className="w-full border-none border-b-2 border-transparent bg-surface-container-highest p-4 font-headline text-xl text-on-surface transition-all placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                  placeholder="vance.e@exsolvia.net"
                  type="email"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end border-t border-outline-variant/20 pt-12">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
            >
              <MaterialIcon name="arrow_back" className="text-sm" />
              Return to roles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
