import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            <h1 className="mb-6 font-headline text-5xl font-black tracking-tighter text-white md:text-7xl">
              {member.name}
            </h1>
            {(member.linkedin || member.github) && (
              <div className="mb-8 flex items-center gap-5">
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant transition-colors hover:text-primary"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <FaLinkedin className="h-7 w-7" />
                  </a>
                ) : null}
                {member.github ? (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant transition-colors hover:text-primary"
                    aria-label={`${member.name} on GitHub`}
                  >
                    <FaGithub className="h-7 w-7" />
                  </a>
                ) : null}
              </div>
            )}
            <p className="mb-10 text-lg font-light leading-relaxed text-on-surface-variant md:text-xl">
              {member.longBio ?? member.bio}
            </p>

            {member.stats && member.stats.length > 0 ? (
              <div className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-outline-variant/20 bg-outline-variant/20 sm:grid-cols-3">
                {member.stats.map((s) => (
                  <div
                    key={`${s.label}-${s.value}`}
                    className="bg-surface-container-lowest/80 px-6 py-5 text-center sm:text-left"
                  >
                    <div className="font-headline text-3xl font-black tracking-tight text-white md:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-1 font-label text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {member.operationalFocus.length > 0 ? (
              <div className="space-y-6 border-t border-outline-variant/20 pt-12">
                <h2 className="font-headline text-2xl font-bold text-white">Operational Focus</h2>
                <ul className="space-y-4 text-on-surface-variant">
                  {member.operationalFocus.map((line, i) => (
                    <li key={`${member.slug}-focus-${i}`} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary-container" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {member.projectCards && member.projectCards.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
                {member.projectCards.slice(0, 2).map((proj) => (
                  <Link
                    key={proj.title}
                    href={proj.href}
                    className="group relative overflow-hidden rounded-md border border-outline-variant/20 bg-surface-container-low/50 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_32px_rgba(255,85,63,0.12)]"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="font-headline text-xl font-bold text-white">{proj.title}</h3>
                      <MaterialIcon
                        name="arrow_forward"
                        className="text-lg text-primary transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface-variant">{proj.blurb}</p>
                  </Link>
                ))}
              </div>
            ) : null}

            {member.philosophy ? (
              <p className="mt-10 border-l-2 border-primary-container pl-5 font-headline text-lg italic leading-snug text-primary md:text-xl">
                {member.philosophy}
              </p>
            ) : null}

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
