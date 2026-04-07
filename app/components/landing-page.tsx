import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../lib/products-data";
import { MaterialIcon } from "./material-icon";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEj4KWDSvkRk-HtmEsGeBrLe_6q2WB0v4-jU2UspLsQl1CmDyld_wjF4wmFec9dhyw1bu7CRV0m0ncJMhTDeDllY-T7_F7FyU2MgAc5tcUyOKt94l5W7Y7DnE8q-PgbNbd1oygCDE0dLyqFFsD8hZ-hy6OlNQ4SnC4uVPxluO_cosWDgUaFhUqXZ0nphlVjjhusz7stIM7-kHNM5Y-GkCoEdh7qWpywvtDKAbfu0KV-T5d8bigNXhtGlbGucV-UTB0Bpuz73Pe0CE";

export default function LandingPage() {
  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary-container/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary-container/10 blur-[100px]" />
          <div className="absolute inset-0">
            <Image
              src={HERO_BG}
              alt=""
              fill
              className="object-cover opacity-10 mix-blend-overlay"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="relative z-10 max-w-5xl px-8 text-center">
          <h1 className="mb-8 font-headline text-6xl font-black leading-tight tracking-tighter text-on-background md:text-8xl">
            Solving <span className="text-primary-container">Tomorrow</span>, Today.
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl font-light leading-relaxed text-neutral-400 md:text-2xl">
            We build intelligent systems that eliminate bottlenecks and unlock new possibilities
            for the modern elite enterprise.
          </p>
          <div className="flex flex-col justify-center gap-6 md:flex-row">
            <Link
              href="/products"
              className="rounded-sm bg-primary-container px-10 py-5 font-headline text-lg font-bold text-on-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,85,63,0.3)]"
            >
              Explore Products
            </Link>
            <Link
              href="/careers"
              className="rounded-sm border border-surface-bright/40 px-10 py-5 font-headline text-lg font-bold text-on-background transition-all duration-300 hover:bg-surface-bright/10"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <span className="font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Portfolio
              </span>
              <h2 className="mt-2 font-headline text-4xl font-bold text-on-background md:text-5xl">
                Our Solutions
              </h2>
            </div>
            <p className="max-w-md text-neutral-500">
              Precision-engineered tools designed for performance, security, and exponential growth.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.slug}
                className={`group relative overflow-hidden rounded-md bg-surface-container-low p-12 transition-all duration-500 hover:shadow-[0_0_40px_rgba(142,15,40,0.15)] ${
                  PRODUCTS.length === 1
                    ? "md:col-span-8"
                    : index === 0
                      ? "md:col-span-8"
                      : "md:col-span-4"
                }`}
              >
                <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary-container/5 blur-[80px] transition-all duration-500 group-hover:bg-primary-container/10" />
                <div className="relative z-10 flex h-full flex-col">
                  <MaterialIcon
                    name={product.materialIcon}
                    className="mb-6 text-4xl text-primary-container"
                  />
                  <span className="mb-2 font-label text-xs uppercase tracking-wider text-primary">
                    {product.tagline}
                  </span>
                  <h3 className="mb-4 font-headline text-3xl font-bold">{product.name}</h3>
                  <p className="mb-8 max-w-md text-lg text-neutral-400">{product.shortDescription}</p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-auto flex items-center gap-2 font-headline font-bold text-primary-container group/btn"
                  >
                    Learn More
                    <MaterialIcon
                      name="arrow_forward"
                      className="text-sm transition-transform group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            ))}
            {/* <div className="group rounded-md bg-surface-container-high p-8 transition-all duration-500 hover:bg-surface-bright md:col-span-4">
              <MaterialIcon name="shield" className="mb-6 text-3xl text-primary-container" />
              <h3 className="mb-3 font-headline text-xl font-bold">Sentience Firewall</h3>
              <p className="text-neutral-400">
                Autonomous threat detection that evolves alongside emerging digital vulnerabilities.
              </p>
            </div> */}
            {/* <div className="group rounded-md bg-surface-container-high p-8 transition-all duration-500 hover:bg-surface-bright md:col-span-4">
              <MaterialIcon name="terminal" className="mb-6 text-3xl text-primary-container" />
              <h3 className="mb-3 font-headline text-xl font-bold">Apex SDK</h3>
              <p className="text-neutral-400">
                Low-latency development kits for high-frequency trading and algorithmic execution.
              </p>
            </div> */}
            {/* <div className="group relative overflow-hidden rounded-md bg-surface-container-low p-12 transition-all duration-500 hover:shadow-[0_0_40px_rgba(142,15,40,0.15)] md:col-span-8">
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZWoERY5xMKxET7EwijYZUb-JxpQvxf-2EIlpKcIgWbudgnNNbj9Yp5q8MpbSHLE2UBY0wNMFzbyzr3BKPlbQGTBb0Ml8CaqOHRLApYcynoap9IE8v1HenQv9q4fS5qDvgRglrE7Da1pdkSJ3ChAFgFBEKETiXtyjODKojkLHBvcvPi7RjBJsVKNPHBNNfNsGfYmsqUAfOKFsAiQC9mpzQ8eAhMhFiGm6dF8ifrFX_-1Go3paBCDz2NVfwUyL9TIKjdzWRkLqrro4"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 66vw, 100vw"
                />
              </div>
              <div className="relative z-10">
                <h3 className="mb-4 font-headline text-3xl font-bold">Omni-Cloud Infrastructure</h3>
                <p className="mb-8 max-w-md text-lg text-neutral-400">
                  Decentralized compute resources that scale vertically with your ambitions.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="overflow-hidden bg-surface-container-lowest py-24">
        <div className="mx-auto mb-16 max-w-7xl px-8">
          <span className="font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Pipeline
          </span>
          <h2 className="mt-2 font-headline text-4xl font-bold text-on-background md:text-5xl">
            Building the Future
          </h2>
        </div>
        <div className="no-scrollbar flex gap-8 overflow-x-auto px-8 pb-8">
          {PIPELINE.map((p) => (
            <div
              key={p.title}
              className="w-80 flex-shrink-0 overflow-hidden rounded-md bg-surface-container transition-transform hover:scale-[1.02] md:w-[400px]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={p.img}
                  alt=""
                  width={400}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-start justify-between">
                  <h4 className="font-headline text-xl font-bold">{p.title}</h4>
                  <span
                    className={`rounded-sm px-2 py-1 font-label text-xs uppercase tracking-wider ${p.tagStyle}`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="mb-6 text-sm text-neutral-500">{p.desc}</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <div className={`h-full bg-primary-container ${p.progress}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className="bg-surface px-8 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 font-headline text-4xl font-black tracking-tight md:text-6xl">
            Who We Are
          </h2>
          <div className="space-y-8">
            <p className="font-headline text-2xl leading-snug text-neutral-200 md:text-3xl">
              EXSOLVIA is a sanctuary for the exceptional. We exist at the intersection of{" "}
              <span className="text-primary-container">radical engineering</span> and{" "}
              <span className="text-primary-container">philosophical foresight</span>.
            </p>
            <div className="mx-auto h-px w-24 bg-primary-container" />
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-500">
              Our mission is not merely to build software, but to construct the digital cathedrals of the
              next century. We solve the impossible so you can focus on the extraordinary.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="mb-4 font-headline text-4xl font-bold">Who We Solve For</h2>
            <div className="h-1 w-20 bg-primary-container" />
          </div>
          <div className="grid grid-cols-1 gap-[1px] bg-outline-variant/10 md:grid-cols-3">
            <div className="group bg-surface-container-low p-12 transition-colors hover:bg-surface-bright">
              <MaterialIcon
                name="rocket_launch"
                className="mb-8 text-neutral-500 transition-colors group-hover:text-primary-container"
              />
              <h3 className="mb-4 font-headline text-2xl font-bold">Startups</h3>
              <ul className="space-y-4 text-neutral-500 group-hover:text-neutral-400">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Rapid Scaling Frameworks
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  MVP to Enterprise Transition
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Technical Advisory
                </li>
              </ul>
            </div>
            <div className="group bg-surface-container-low p-12 transition-colors hover:bg-surface-bright">
              <MaterialIcon
                name="corporate_fare"
                className="mb-8 text-neutral-500 transition-colors group-hover:text-primary-container"
              />
              <h3 className="mb-4 font-headline text-2xl font-bold">Enterprises</h3>
              <ul className="space-y-4 text-neutral-500 group-hover:text-neutral-400">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Legacy Infrastructure Modernization
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Military-Grade Security Systems
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Global Operations Intelligence
                </li>
              </ul>
            </div>
            <div className="group bg-surface-container-low p-12 transition-colors hover:bg-surface-bright">
              <MaterialIcon
                name="code"
                className="mb-8 text-neutral-500 transition-colors group-hover:text-primary-container"
              />
              <h3 className="mb-4 font-headline text-2xl font-bold">Developers</h3>
              <ul className="space-y-4 text-neutral-500 group-hover:text-neutral-400">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Unified API Eco-systems
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  High-Performance Toolkits
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary-container" />
                  Global Open Source Collaboration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-8 py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-24 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 font-headline text-5xl font-bold">Initiate Contact</h2>
            <p className="mb-12 max-w-md text-lg text-neutral-500">
              Our team of specialists is ready to discuss your next breakthrough. Expect a response
              within one standard solar cycle.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-neutral-300">
                <MaterialIcon name="alternate_email" className="text-primary-container" />
                <span>contact@exsolvia.com</span>
              </div>
              {/* <div className="flex items-center gap-4 text-neutral-300">
                <MaterialIcon name="location_on" className="text-primary-container" />
                <span>Level 82, Obsidian Tower, Neo-City</span>
              </div> */}
            </div>
          </div>
          <div className="rounded-md bg-surface-container-highest/30 p-10 backdrop-blur-sm">
            <div className="space-y-8">
              <div className="group">
                <label className="font-label mb-2 block text-xs uppercase tracking-widest text-primary">
                  Identification
                </label>
                <input
                  className="w-full border-none border-b-2 border-transparent bg-surface-container-highest px-0 py-4 text-on-background placeholder:text-neutral-600 focus:border-primary-container focus:ring-0"
                  placeholder="Your Full Name"
                  type="text"
                />
              </div>
              <div className="group">
                <label className="font-label mb-2 block text-xs uppercase tracking-widest text-primary">
                  Signal Address
                </label>
                <input
                  className="w-full border-none border-b-2 border-transparent bg-surface-container-highest px-0 py-4 text-on-background placeholder:text-neutral-600 focus:border-primary-container focus:ring-0"
                  placeholder="Email Address"
                  type="email"
                />
              </div>
              <div className="group">
                <label className="font-label mb-2 block text-xs uppercase tracking-widest text-primary">
                  Objectives
                </label>
                <textarea
                  className="w-full resize-none border-none border-b-2 border-transparent bg-surface-container-highest px-0 py-4 text-on-background placeholder:text-neutral-600 focus:border-primary-container focus:ring-0"
                  placeholder="Describe your project"
                  rows={4}
                />
              </div>
              <Link
                href="/contact"
                className="block w-full rounded-sm bg-primary-container py-5 text-center font-headline font-bold text-on-primary transition-all hover:brightness-110 active:scale-95"
              >
                Submit Protocol
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
