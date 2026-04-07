import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialIcon } from "../../components/material-icon";
import { getProduct } from "../../lib/products-data";
import { kampynDetailContent } from "./content";

export default function KampynProductPage() {
  const product = getProduct("kampyn");
  if (!product) notFound();

  const c = kampynDetailContent;

  return (
    <div className="min-h-screen pb-24">
      <main className="mx-auto max-w-4xl px-8 pb-16 pt-8 md:pt-12">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-2 font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            Products
          </Link>
          <div className="inline-flex items-center gap-2 rounded-sm border border-outline-variant/20 bg-surface-container-high px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-primary-container" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">{c.statusLabel}</span>
          </div>
        </div>

        <h1 className="mb-3 font-headline text-5xl font-black tracking-tighter text-on-background md:text-7xl">
          {product.name}
        </h1>
        <p className="mb-10 font-headline text-xl text-primary md:text-2xl">{product.tagline}</p>

        <div className="relative mb-14 aspect-[21/9] overflow-hidden rounded-md border border-outline-variant/20">
          <Image
            src={product.image}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 896px) 896px, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
        </div>

        <p className="mb-14 text-lg leading-relaxed text-on-surface-variant md:text-xl">{c.intro}</p>

        <div className="mb-14 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="mb-4 font-headline text-2xl font-bold text-on-background">The challenge</h2>
            <p className="leading-relaxed text-on-surface-variant">{c.problem}</p>
          </section>
          <section>
            <h2 className="mb-4 font-headline text-2xl font-bold text-on-background">Our approach</h2>
            <p className="leading-relaxed text-on-surface-variant">{c.approach}</p>
          </section>
        </div>

        <h2 className="mb-8 font-headline text-3xl font-bold text-on-background">Highlights</h2>
        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {c.highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-md border border-outline-variant/15 bg-surface-container-low p-6"
            >
              <MaterialIcon name="check_circle" className="mb-4 text-2xl text-primary-container" />
              <h3 className="mb-2 font-headline text-lg font-bold text-on-background">{h.title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="mb-14 rounded-md border border-outline-variant/15 bg-surface-container-lowest p-8">
          <h2 className="mb-6 font-headline text-2xl font-bold text-on-background">Outcomes</h2>
          <ul className="space-y-3 text-on-surface-variant">
            {c.outcomes.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-container" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-14">
          <h2 className="mb-4 font-headline text-2xl font-bold text-on-background">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {c.techStack.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-outline-variant/20 bg-surface-container-high px-3 py-1.5 font-label text-xs uppercase tracking-wider text-on-surface-variant"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-outline-variant/20 pt-10 sm:flex-row sm:items-center">
          <a
            href={c.primaryCta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-primary-container px-8 py-4 font-headline font-bold text-on-primary transition hover:brightness-110"
          >
            {c.primaryCta.label}
          </a>
          <Link
            href={c.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-sm border border-outline-variant/30 px-8 py-4 font-headline font-bold text-on-background transition hover:bg-surface-container-high"
          >
            {c.secondaryCta.label}
          </Link>
        </div>
      </main>
    </div>
  );
}
