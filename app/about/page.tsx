import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../components/material-icon";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="relative flex min-h-[819px] flex-col justify-center overflow-hidden px-8 py-20 lg:px-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-surface-container-lowest via-background to-primary/5 opacity-50" />
        <div className="relative z-10 max-w-5xl">
          <p className="font-label mb-6 text-sm uppercase tracking-[0.2em] text-primary">
            Origins &amp; Evolution
          </p>
          <h1 className="mb-12 font-headline text-6xl font-black leading-none tracking-tighter text-ghost-white md:text-8xl">
            DECODING THE <br /> <span className="text-primary-container">UNSOLVABLE.</span>
          </h1>
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg font-light leading-relaxed text-on-surface-variant md:text-xl">
                Exsolvia was born in the silent hours of 2025, not in a garage, but within a
                high-frequency compute cluster. Our founders recognized that the world&apos;s most
                critical problems weren&apos;t lacking data—they were lacking the intelligence to
                navigate through the noise.
              </p>
              <p className="text-lg font-light leading-relaxed text-on-surface-variant/80">
                From optimizing global logistics in real-time to architecting ethical neural
                governance, we have evolved into a monolith of high-stakes problem solving.
              </p>
            </div>
            <div className="glass-panel relative flex aspect-square items-center justify-center rounded-md border border-outline-variant/10 p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuB7D9W5nDYSJC4FnPIqDs654PKtIMK-8S9Df-JT_5U0GvH6g1H3fN9nnaTunaQY2gxmIlb1kPOWKNUHp03iqKWx1udygpZHfH8cok3IA0TmKA58FIv6r5X6l6Sx8y815yqG66k7rWPi92FK3kheFNmCxWLVZpDLhF5dd29z0NR_cM-gA0npNsBvDKj0eR89GARR_MYFHe6ODgdOv9zRWsmnXDCkMoRRxM0G9OWC_6klxeHR8gH5A4R3ORSdwwytijYAmMeKesOKbs4)",
                }}
              />
              <div className="z-10 text-center">
                <span className="font-headline text-7xl font-bold text-primary-container">0.001%</span>
                <p className="font-label mt-4 text-xs uppercase tracking-widest text-on-surface-variant">
                  The threshold of our tolerance for error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest px-8 py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-md bg-surface p-12 md:col-span-7">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px] transition-all duration-700 group-hover:bg-primary/20" />
              <div>
                <MaterialIcon name="visibility" className="mb-8 text-4xl text-primary" />
                <h2 className="mb-6 font-headline text-4xl font-bold text-ghost-white">THE VISION</h2>
                <p className="text-2xl font-light leading-snug text-on-surface-variant">
                  To become the cognitive backbone of global civilization, ensuring every complex
                  decision is backed by absolute clarity.
                </p>
              </div>
              <div className="mt-8 border-t border-outline-variant/20 pt-8">
                <p className="font-label text-xs uppercase tracking-widest text-primary-fixed">
                  Target Horizon: 2035
                </p>
              </div>
            </div>
            <div className="relative min-h-[400px] overflow-hidden rounded-md bg-surface-container-high md:col-span-5">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5JYEBYGYVrK2OYriQNq8iF4UlVuaXgLD0nw6t1LZI_V-KxNvcOgnEv3FKi3WKAmxvFFQgApdCngq95Ags2LDNFXMKsKK3F2AMotu8RJTZK3RElvFqnEFKx43pZ-wtq_LkehrZ6GvkneM44KabrjZQAbOTFTCVwycYQQHx77ACk3CqPyj6u8ee3BI7HbYjwnHFww226hBZ6oaNhDjAR0_h6jtWYf3gMjU9VYvJa9W7MztKR6fXFrLLWqOrAOuP7Dhb_5HMx5T96S8"
                alt=""
                fill
                className="scale-105 object-cover opacity-60 grayscale transition-all duration-1000 hover:grayscale-0"
                sizes="40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent" />
            </div>
            <div className="flex min-h-[400px] flex-col justify-between rounded-md bg-primary-container p-12 text-on-primary md:col-span-5">
              <div>
                <MaterialIcon name="bolt" className="mb-8 text-4xl text-on-primary" />
                <h2 className="mb-6 font-headline text-4xl font-bold">THE MISSION</h2>
                <p className="text-xl font-medium leading-relaxed">
                  We engineer high-intelligence systems that solve the &quot;Impossible Tier&quot; of human
                  challenges through data rigor and architectural elegance.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-on-primary/20 pt-8">
                <div className="h-0.5 w-12 bg-on-primary" />
                <span className="font-label text-xs uppercase tracking-widest">
                  Execute without compromise.
                </span>
              </div>
            </div>
            <div className="rounded-md border border-outline-variant/5 bg-surface-container p-12 md:col-span-7">
              <h3 className="mb-8 font-headline text-2xl font-bold text-ghost-white">CORE ARCHITECTURE</h3>
              <div className="space-y-8">
                {[
                  {
                    n: "01",
                    t: "Signal Distillation",
                    d: "Converting entropy into actionable intelligence using proprietary entropy-reduction algorithms.",
                  },
                  {
                    n: "02",
                    t: "Neural Sovereignty",
                    d: "Every system we build is designed for absolute autonomy and ethical durability.",
                  },
                  {
                    n: "03",
                    t: "Impact Velocity",
                    d: "We do not just solve problems; we solve them at the speed of the modern threat landscape.",
                  },
                ].map((x) => (
                  <div key={x.n} className="flex items-start gap-6">
                    <span className="font-headline text-xl font-black italic text-primary">{x.n}</span>
                    <div>
                      <h4 className="mb-1 font-bold text-ghost-white">{x.t}</h4>
                      <p className="text-sm text-on-surface-variant">{x.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background px-8 py-40 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-high px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface">
              Philosophical Engine
            </span>
          </div>
          <h2 className="mb-12 font-headline text-5xl font-black tracking-tighter text-ghost-white md:text-7xl">
            &quot;FINDING A <span className="text-primary">WAY OUT</span>&quot;
          </h2>
          <div className="mx-auto max-w-3xl space-y-8 text-xl font-light leading-relaxed text-on-surface-variant md:text-2xl">
            <p>
              In a world of increasing complexity, most companies build walls. We build{" "}
              <span className="font-medium text-ghost-white">Exits.</span>
            </p>
            <p>
              Exsolvia&apos;s philosophy is rooted in the belief that for every labyrinth of data or
              systemic crisis, there exists a perfect sequence of operations—a high-intelligence path
              that leads to the solution.
            </p>
            <p className="italic text-primary-fixed">Complexity is not an obstacle; it is the map.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-surface-container-lowest px-8 py-32 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 rounded-md border border-outline-variant/10 bg-surface p-16 md:flex-row">
          <div>
            <h2 className="mb-4 font-headline text-4xl font-bold text-ghost-white">READY TO SOLVE?</h2>
            <p className="max-w-md text-on-surface-variant">
              Our team of analysts and engineers is ready to tackle your most complex structural
              challenges.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="rounded-sm bg-primary-container px-8 py-4 font-headline font-black text-on-primary transition-all active:scale-95"
            >
              ENGAGE THE TEAM
            </Link>
            <Link
              href="/products"
              className="rounded-sm border border-outline-variant px-8 py-4 font-headline font-black text-ghost-white transition-all hover:bg-surface-bright active:scale-95"
            >
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
