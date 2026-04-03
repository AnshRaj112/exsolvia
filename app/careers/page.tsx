import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../components/material-icon";

const ROLES = [
  {
    icon: "hub",
    title: "Senior Neural Architect",
    tags: ["Core Engineering", "Remote / HQ"],
  },
  {
    icon: "encrypted",
    title: "Security Protocol Lead",
    tags: ["Defensive Systems", "Tokyo HQ"],
  },
  {
    icon: "computer",
    title: "Quantum Systems Engineer",
    tags: ["Advanced Computing", "Remote"],
  },
];

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
                We are recruiting the world&apos;s most capable minds to architect the infrastructure of
                the synthetic age. Precision is our standard.
              </p>
            </div>
            <div className="flex justify-end md:col-span-4">
              <div className="glass-panel max-w-xs rounded-lg border border-outline-variant/20 p-8">
                <div className="mb-2 font-headline text-4xl font-bold text-on-surface">12</div>
                <div className="label-md uppercase tracking-widest text-on-surface-variant">
                  Active Missions
                </div>
                <div className="mt-6 border-t border-outline-variant/10 pt-6">
                  <p className="text-sm italic text-on-surface-variant">
                    &quot;The future is not found; it is calculated.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary-container/10 blur-[120px]" />
      </section>

      <section className="bg-surface-container-lowest px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight">Culture of Intelligence</h2>
            <div className="h-1 w-12 bg-primary-container" />
          </div>
          <div className="grid grid-cols-1 gap-0 border border-outline-variant/10 md:grid-cols-3">
            <div className="group p-12 transition-colors hover:bg-surface-container-high">
              <MaterialIcon name="neurology" className="mb-8 text-4xl text-primary-container" />
              <h3 className="mb-4 font-headline text-xl font-bold transition-transform group-hover:translate-x-2">
                Neural Synergy
              </h3>
              <p className="font-light leading-relaxed text-on-surface-variant">
                Collaborative cognition between human expertise and synthetic intelligence is our
                baseline operation.
              </p>
            </div>
            <div className="group bg-surface-container-low p-12 transition-colors hover:bg-surface-container-high">
              <MaterialIcon name="security" className="mb-8 text-4xl text-primary-container" />
              <h3 className="mb-4 font-headline text-xl font-bold transition-transform group-hover:translate-x-2">
                Protocol Zero
              </h3>
              <p className="font-light leading-relaxed text-on-surface-variant">
                Security is not an add-on; it is the fundamental fabric of every line of code we ship to
                the monolith.
              </p>
            </div>
            <div className="group p-12 transition-colors hover:bg-surface-container-high">
              <MaterialIcon
                name="precision_manufacturing"
                className="mb-8 text-4xl text-primary-container"
              />
              <h3 className="mb-4 font-headline text-xl font-bold transition-transform group-hover:translate-x-2">
                Atomic Precision
              </h3>
              <p className="font-light leading-relaxed text-on-surface-variant">
                We value the microscopic detail. In our systems, a single misplaced bit is a failure of
                vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-4 font-headline text-4xl font-bold tracking-tighter md:text-5xl">
                Open Operative Roles
              </h2>
              <p className="text-on-surface-variant">
                Select a designation to view technical requirements and mission parameters.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="border border-outline-variant/30 px-6 py-2 font-headline text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary-container"
              >
                Engineering
              </button>
              <button
                type="button"
                className="border border-outline-variant/30 px-6 py-2 font-headline text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary-container"
              >
                Security
              </button>
              <button
                type="button"
                className="border border-outline-variant/30 px-6 py-2 font-headline text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary-container"
              >
                Operations
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {ROLES.map((r) => (
              <div
                key={r.title}
                className="group relative flex flex-col items-center justify-between rounded-md bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container hover:shadow-[0_0_40px_rgba(255,85,63,0.05)] md:flex-row"
              >
                <div className="flex w-full flex-col gap-8 md:flex-row md:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-surface-container-highest transition-colors group-hover:text-primary-container">
                    <MaterialIcon name={r.icon} className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface transition-colors group-hover:text-primary">
                      {r.title}
                    </h3>
                    <div className="mt-2 flex gap-4">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="label-md rounded-full bg-surface-container-highest px-3 py-1 text-[10px] uppercase tracking-widest text-on-surface-variant"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 md:mt-0">
                  <Link
                    href="/careers/apply"
                    className="flex items-center gap-3 bg-surface-bright px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-primary-container hover:text-on-primary"
                  >
                    Apply to Join
                    <MaterialIcon name="arrow_forward" className="text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 pb-32">
        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center overflow-hidden rounded-xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmfAvUx1geg7TxmKxADv3P0-DWGTwuFRgokFWcH3Q48QBq8xeQMaxJ5oqKEGTTemwvhXxWQWWm87qHWxxDpZaRKqfxBbw3YIULSt1xWSd4q75KII_QM9NBhoSD-maLWJO8Phr41t6tE-P2j62XJulDZ-8DhNJwJxBAqA3o7r9kBMDebW25MrjXiMtgUqyfhTZRrD11BcO4ms-JD7gxY55y9c7a5Gjp9ZAeherUJvqHulnuPnWNnkHLKoCVDwUjjH0AeGC7chNfTkU"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="relative z-10 max-w-2xl px-12 py-20 md:px-24">
            <h2 className="mb-6 font-headline text-5xl font-black tracking-tighter text-on-surface">
              The Monolith Awaits.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
              Do not see a role that matches your specialized skillset? We are always scouting for
              exceptional intelligence that defies traditional categorization.
            </p>
            <Link
              href="/contact"
              className="group flex items-center gap-4 font-headline font-bold uppercase tracking-widest text-primary"
            >
              Submit a General Inquiry
              <span className="h-px w-12 bg-primary transition-all group-hover:w-20" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
