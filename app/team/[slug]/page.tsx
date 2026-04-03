import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialIcon } from "../../components/material-icon";
import { getMember } from "../../lib/team-data";

type Props = { params: Promise<{ slug: string }> };

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();

  return (
    <div className="glossy-glow min-h-screen pb-24">
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-8 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <div className="group relative overflow-hidden rounded-lg bg-surface-container-highest">
              <Image
                src={member.img}
                alt=""
                width={600}
                height={800}
                className="aspect-[3/4] w-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60" />
            </div>
            <div className="mt-8 flex items-center gap-6">
              <Link
                href="/team"
                className="flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
              >
                <MaterialIcon name="arrow_back" className="text-sm" />
                Manifest
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="font-label mb-4 block text-xs uppercase tracking-[0.2em] text-primary">
              {member.role}
            </span>
            <h1 className="mb-8 font-headline text-5xl font-black tracking-tighter text-white md:text-7xl">
              {member.name}
            </h1>
            <p className="mb-12 text-lg font-light leading-relaxed text-on-surface-variant md:text-xl">
              {member.longBio ?? member.bio}
            </p>
            <div className="space-y-6 border-t border-outline-variant/20 pt-12">
              <h2 className="font-headline text-2xl font-bold text-white">Operational Focus</h2>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary-container" />
                  High-intelligence systems architecture
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary-container" />
                  Neural security protocols
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary-container" />
                  Enterprise-scale orchestration
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-12 inline-flex rounded-sm bg-primary-container px-8 py-4 font-headline font-bold text-on-primary transition hover:brightness-110"
            >
              Initiate Contact
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
