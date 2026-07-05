import Link from "next/link";
import { ProductsCatalog } from "../components/products-catalog";
import { PRODUCTS } from "../lib/products-data";

export default function ProductsPage() {
  return (
    <div className="min-h-screen pb-24">
      <main className="mx-auto max-w-7xl px-8 pb-24 pt-8">
        <header className="relative mb-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-container/10 blur-[120px]" />
          <h1 className="mb-4 font-headline text-6xl font-black uppercase tracking-tighter md:text-8xl">
            Solutions<span className="text-primary-container">.</span>
          </h1>
          <p className="max-w-2xl font-body text-xl leading-relaxed text-on-surface-variant">
            Precision-engineered tools designed for sovereign intelligence and high-velocity systems
            architecture.
          </p>
        </header>

        <ProductsCatalog products={PRODUCTS} />
      </main>

      <section className="border-y border-outline-variant/10 bg-surface-container-lowest px-8 py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-6 font-headline text-4xl font-black uppercase tracking-tight">
              Custom Architecture?
            </h2>
            <p className="font-body text-lg text-on-surface-variant">
              Our engineering elite can help design bespoke system environments tailored to your
              specific operational constraints.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-sm bg-primary-container px-10 py-4 font-headline font-bold text-on-primary transition-all hover:brightness-110"
          >
            CONSULT ENGINEERS
          </Link>
        </div>
      </section>
    </div>
  );
}
