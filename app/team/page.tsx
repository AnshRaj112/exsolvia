import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../components/material-icon";
import { TEAM } from "../lib/team-data";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest pb-24">
      <section className="mx-auto mb-24 max-w-7xl px-8">
        <div className="flex flex-col justify-between gap-8 border-l border-primary/20 py-12 pl-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="font-label mb-4 block font-bold uppercase tracking-[0.3em] text-primary">
              Personnel Manifest
            </span>
            <h1 className="mb-6 font-headline text-6xl font-black leading-none tracking-tighter md:text-8xl">
              The Minds <span className="text-primary">Behind</span> <br />
              The Machine
            </h1>
          </div>
          <div className="max-w-sm">
            <p className="text-lg font-light leading-relaxed text-on-surface-variant">
              A collective of high-intelligence specialists dedicated to the architecture of obsidian
              systems and neural precision.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-32">
        <div className="grid grid-cols-1 gap-0.5 bg-outline-variant/10 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.slug}
              className="group relative overflow-hidden border-outline-variant/5 bg-[#0F0F0F] p-8 transition-all duration-500 hover:z-10"
            >
              <div className="relative mb-8 aspect-[3/4] overflow-hidden">
                <Image
                  src={m.img}
                  alt=""
                  width={400}
                  height={533}
                  className="h-full w-full scale-105 object-cover grayscale transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60" />
              </div>
              <div className="relative z-10">
                <span className="font-label mb-2 block text-xs uppercase tracking-[0.2em] text-primary">
                  {m.role}
                </span>
                <h3 className="mb-4 font-headline text-3xl font-bold tracking-tight transition-colors group-hover:text-primary">
                  {m.name}
                </h3>
                <p className="mb-8 line-clamp-2 text-sm font-light text-on-surface-variant">{m.bio}</p>
                <Link
                  href={`/team/${m.slug}`}
                  className="inline-flex items-center gap-2 border-b border-outline-variant py-3 font-label text-xs font-bold uppercase tracking-widest transition-all group-hover:border-primary group-hover:text-primary"
                >
                  View Protocol
                  <MaterialIcon name="arrow_forward" className="text-[16px]" />
                </Link>
              </div>
              <div className="pointer-events-none absolute inset-0 border border-primary/0 transition-all duration-500 group-hover:border-primary/20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
