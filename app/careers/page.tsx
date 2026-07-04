import Image from "next/image";
import Link from "next/link";
import { getCareersSettings } from "@/app/lib/careers-settings";
import { getActivePositions } from "@/app/lib/positions";
import { MaterialIcon } from "../components/material-icon";
import { CareersRolesList } from "./components/careers-roles-list";

export default async function CareersPage() {
  const [settings, positions] = await Promise.all([getCareersSettings(), getActivePositions()]);
  const missionCount = positions.length;

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
                {settings.heroSubtext}
              </p>
              {missionCount > 0 ? (
                <Link
                  href="/careers/apply"
                  className="mt-10 inline-flex items-center gap-2 rounded-sm border border-primary-container/40 bg-surface-container-low/60 px-8 py-4 font-label text-xs font-bold uppercase tracking-widest text-primary-container transition-colors hover:border-primary-container hover:bg-surface-container-low"
                >
                  Apply now
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                </Link>
              ) : null}
            </div>
            <div className="flex justify-end md:col-span-4">
              <div className="glass-panel max-w-xs rounded-lg border border-outline-variant/20 p-8">
                <div className="mb-2 font-headline text-4xl font-bold text-on-surface">{missionCount}</div>
                <div className="label-md uppercase tracking-widest text-on-surface-variant">Active Missions</div>
                <div className="mt-6 border-t border-outline-variant/10 pt-6">
                  <p className="text-sm italic text-on-surface-variant">{settings.statsQuote}</p>
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
          <div className="grid grid-cols-1 border border-outline-variant/10 md:grid-cols-3">
            {settings.cultureCards.map((card, i) => (
              <div
                key={`${card.title}-${i}`}
                className={`p-12 transition-colors hover:bg-surface-container-high ${
                  i === 1 ? "bg-surface-container-low md:bg-surface-container-low" : ""
                } group`}
              >
                <MaterialIcon name={card.icon} className="mb-8 text-4xl text-primary-container" />
                <h3 className="mb-4 font-headline text-xl font-bold transition-transform group-hover:translate-x-2">
                  {card.title}
                </h3>
                <p className="font-light leading-relaxed text-on-surface-variant">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {positions.length === 0 ? (
        <section className="px-8 py-16">
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
      ) : (
        <CareersRolesList positions={positions} />
      )}

      <section className="px-8 pb-32">
        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center overflow-hidden rounded-xl">
          <Image
            src={settings.monolithImageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="relative z-10 max-w-2xl px-12 py-20 md:px-24">
            <h2 className="mb-6 font-headline text-5xl font-black tracking-tighter text-on-surface">
              {settings.monolithHeading}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">{settings.monolithBody}</p>
            <Link
              href={settings.monolithCtaHref}
              className="group flex items-center gap-4 font-headline font-bold uppercase tracking-widest text-primary"
            >
              {settings.monolithCtaLabel}
              <span className="h-px w-12 bg-primary transition-all group-hover:w-20" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
