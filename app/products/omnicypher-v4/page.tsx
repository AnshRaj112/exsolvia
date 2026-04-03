import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../../components/material-icon";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBC9iJoC_na2nJSmO7OnrxtutZin3c1WyGj7hqohtn8htYuRUdX0EejEPhMS5RaWL-EjW5NrP4dAfLIrD4x6BWx3aMLC4hEbqdWR1DQuiq_ut3ZBEaxbFJGlmI2rEh0uZxrM7JGp4OrmqKboEB8IPioc-Y_F54LlurZzTbuBsXjfpiibtKpvjHCU2itArQikxGBDYPIhtPzCwzLyLjIMQkCniXDNlOTmYJ-n4eik1Nmpn2fqG1oPZCy2wUTLTWFYtHBaEXnAIDXoXc";

export default function OmniCypherPage() {
  return (
    <div className="min-h-screen obsidian-gradient pb-24">
      <section className="relative flex min-h-[921px] flex-col items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-full w-full max-w-6xl opacity-40">
            <Image
              src={HERO_IMG}
              alt=""
              width={1200}
              height={800}
              className="h-full w-full object-contain brightness-75 contrast-125 grayscale"
              priority
            />
          </div>
        </div>
        <div className="relative z-10 max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-outline-variant/20 bg-surface-container-highest px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              Intelligence Class V4
            </span>
          </div>
          <h1 className="mb-6 font-headline text-7xl font-black leading-none tracking-tighter text-white md:text-9xl">
            OMNICYPHER<span className="text-glow text-[#FF0800]">_V4</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl font-body text-xl leading-relaxed text-on-surface-variant/80 md:text-2xl">
            Eliminating data breaches in high-frequency environments through autonomous cryptographic
            shielding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="red-glow rounded-sm bg-primary-container px-10 py-4 font-headline text-lg font-black uppercase tracking-widest text-on-primary transition-all active:scale-95"
            >
              Request Access
            </Link>
            <button
              type="button"
              className="rounded-sm border border-outline-variant/30 bg-transparent px-10 py-4 font-headline text-lg font-black uppercase tracking-widest text-white transition-all hover:bg-surface-container-high"
            >
              Technical Specs
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-8 py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="group relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-md border border-outline-variant/10 bg-surface-container-lowest p-10 md:col-span-8">
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary-container/10 blur-[100px] transition-all duration-700 group-hover:bg-primary-container/20" />
            <div>
              <MaterialIcon name="security" className="mb-6 text-4xl text-primary" />
              <h3 className="mb-4 font-headline text-4xl font-bold text-white">
                Neural-Layer Encryption
              </h3>
              <p className="max-w-md text-lg text-on-surface-variant">
                Self-evolving algorithms that adapt to decryption attempts in real-time, creating a
                moving target for adversarial actors.
              </p>
            </div>
            <div className="mt-12 flex gap-4">
              <div className="h-1 w-24 bg-primary-container" />
              <div className="h-1 w-24 bg-surface-container-highest" />
              <div className="h-1 w-24 bg-surface-container-highest" />
            </div>
          </div>
          <div className="flex flex-col justify-end rounded-md border border-outline-variant/10 bg-surface-container p-8 md:col-span-4">
            <MaterialIcon name="psychology" className="mb-6 text-4xl text-primary" />
            <h3 className="mb-2 font-headline text-2xl font-bold text-white">Sovereign Intelligence</h3>
            <p className="text-sm text-on-surface-variant">
              On-premise AI cores that never call home. Total data isolation with cognitive awareness.
            </p>
          </div>
          <div className="flex flex-col justify-end rounded-md border border-outline-variant/10 bg-surface-container-high p-8 md:col-span-4">
            <MaterialIcon name="bolt" className="mb-6 text-4xl text-primary" />
            <h3 className="mb-2 font-headline text-2xl font-bold text-white">Zero-Latency Auth</h3>
            <p className="text-sm text-on-surface-variant">
              Sub-millisecond verification cycles using hardware-level biometric hashing.
            </p>
          </div>
          <div className="rounded-md border border-primary/20 bg-surface p-1 md:col-span-8">
            <div className="flex h-full w-full items-center justify-between rounded-md bg-surface-container-lowest p-10">
              <div className="max-w-sm">
                <h3 className="mb-4 font-headline text-3xl font-bold text-white">
                  Hardware Root of Trust
                </h3>
                <p className="text-on-surface-variant">
                  Silicon-level validation of every instruction set before execution.
                </p>
              </div>
              <div className="hidden lg:block">
                <MaterialIcon
                  name="memory"
                  className="text-8xl text-outline-variant/20 transition-colors duration-500 group-hover:text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest px-8 py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-24">
            <h2 className="mb-4 font-headline text-5xl font-black text-white md:text-7xl">
              OPERATIONAL
              <br />
              DOMAINS
            </h2>
            <div className="h-2 w-32 bg-primary-container" />
          </div>
          <div className="space-y-32">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="w-full md:w-1/2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHrT8anLZp_1UAyp6pDpq_CRyktYCbL660Ol4vL8WH0N75nk876SM1-8P5O6xYTPgU3vyr8vYgQk7G5kk1o6Q2NEa4hvTTU2KBrh7lZd4BjbAl07ifi_n-d_iYnJUwlHHJfZ_2ILmA_sm2F9NwbYOiilfn3omqv6aZeZkIwRGvWTJuXlCkI4jTcvNlldZzSBpPZPj8pfTNxiVb1OKbLIII-LRL_uRGZlpOByvGts4LxG9vKvUPW0jrrT5ATh1NTIio-IalvsNl6ag"
                  alt=""
                  width={800}
                  height={450}
                  className="aspect-video w-full rounded-sm border border-outline-variant/20 object-cover shadow-2xl grayscale transition-all duration-1000 hover:grayscale-0"
                />
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-12">
                <span className="font-label mb-4 block uppercase tracking-[0.3em] text-primary">
                  Sector 01
                </span>
                <h3 className="mb-6 font-headline text-5xl font-bold text-white">Military Defense</h3>
                <p className="mb-8 text-xl leading-relaxed text-on-surface-variant">
                  Securing battlefield communications and drone command chains where a single millisecond
                  of latency or a byte of leaked data means catastrophic failure.
                </p>
                <div className="h-px w-full bg-gradient-to-r from-primary-container to-transparent opacity-30" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
              <div className="w-full md:w-1/2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdJyB0zZY5TxBVkUTo438x2vQViy-5Tkdit01C03YoHgpiPeB1roCI1RcW-sYg0yOEX6k4hjMVWEqrlQuNLjcqQ5XQXy3xZnn-vslrvlH8hXw1jH4GZ0_no9nbrQHALDaDQ5rdciOadwVS9guAVxdXUcG0jFra1-n2jvDVuHOuE9Oqhnpxlc6WAiwqO1joV6XE1vx6VyKeQVNRsQzX-TD0ChOQJEouiMfCNS09EyTHQidJZXndjZt7zMESNE3fLMRc2a2p6V3mt68"
                  alt=""
                  width={800}
                  height={450}
                  className="aspect-video w-full rounded-sm border border-outline-variant/20 object-cover shadow-2xl grayscale transition-all duration-1000 hover:grayscale-0"
                />
              </div>
              <div className="w-full pr-0 text-right md:w-1/2 md:pr-12 md:text-left">
                <span className="font-label mb-4 block uppercase tracking-[0.3em] text-primary">
                  Sector 02
                </span>
                <h3 className="mb-6 font-headline text-5xl font-bold text-white">Global Fintech</h3>
                <p className="mb-8 text-xl leading-relaxed text-on-surface-variant">
                  Shielding trillion-dollar transaction layers. OMNICYPHER handles the volume of
                  high-frequency trading with zero-trust integrity at every node.
                </p>
                <div className="h-px w-full bg-gradient-to-l from-transparent to-primary-container opacity-30 md:bg-gradient-to-r md:from-primary-container md:to-transparent" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="w-full md:w-1/2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy_Ok-keUEvL5FvdKEX2swYGRFupNkTRSzlaffeS8D0ft1vKKmE6WKxM7LamPejNVjmV7HFay79ezmv9oU_HZ90HufEW0QG-c24UOhlO1M1lpxoyPOkDeoGKfAFe93tzH38N56CEkU4cAJIXgAV2y_0dhLXOpCLIiBfLDc9Bjsf-2IniLmUbuL2CMgBYmpRK-faE9lr_BmWEU3mWkuBPlWJcPbmRvkUXHtVNviYoYWBNCi3cYxzdyigXFGdKJ6qVAH58l-FxIx6hs"
                  alt=""
                  width={800}
                  height={450}
                  className="aspect-video w-full rounded-sm border border-outline-variant/20 object-cover shadow-2xl grayscale transition-all duration-1000 hover:grayscale-0"
                />
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-12">
                <span className="font-label mb-4 block uppercase tracking-[0.3em] text-primary">
                  Sector 03
                </span>
                <h3 className="mb-6 font-headline text-5xl font-bold text-white">Quantum Research</h3>
                <p className="mb-8 text-xl leading-relaxed text-on-surface-variant">
                  Protecting the world&apos;s most sensitive IP. Our encryption layers are tested against
                  post-quantum compute loads to ensure tomorrow&apos;s data stays private.
                </p>
                <div className="h-px w-full bg-gradient-to-r from-primary-container to-transparent opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-8 py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline text-4xl font-bold uppercase tracking-widest text-white">
              Command Surface
            </h2>
            <p className="text-on-surface-variant">Low-level control with high-level intelligence.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container-lowest shadow-2xl">
            <div className="flex items-center gap-2 border-b border-outline-variant/10 bg-surface-container-high px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
              <span className="ml-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                omnicypher-core // kernel_access
              </span>
            </div>
            <div className="space-y-2 p-8 font-mono text-sm text-primary-container/80">
              <p className="text-on-surface-variant">
                <span className="text-primary">$</span> omnicypher status --verbose
              </p>
              <p className="text-white">Checking neural integrity layers...</p>
              <p className="text-green-500">[OK] L1: Quantum-Resistant Hash</p>
              <p className="text-green-500">[OK] L2: Asymmetric Sharding Active</p>
              <p className="text-white">Active Connections: 4,092</p>
              <p className="text-white">
                Threat Mitigation: <span className="text-primary-container">ADAPTIVE MODE</span>
              </p>
              <p className="mt-4 animate-pulse text-on-surface-variant">_</p>
            </div>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT3lojYOWQEMkBZ0GGrnrm8_sq3qtOOKEw6iyQ1Po08FNNUMw_5AJZTjCM91JOmHhQV3p9xOwP6FSKCwGeF9YHsAPfASbQhae-9_27bAZpXCTrjPibWXKR5eupmNwr07SUInLzMfPzztfEKj9Qps9lq9u41e9bTLZS0KDZjFIqJNwAKhcqcFINLbrd88hWOqMLsBfsJ3-nQTRx8pPzz3mv0PJIi8Xu29n20NuuVa-kLd4oKl9Od6qzsPOnzogKTrVglHPZrNnkfjU"
              alt=""
              width={1200}
              height={400}
              className="w-full border-t border-outline-variant/10 object-cover contrast-125"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-8 py-40">
        <div className="absolute inset-0 -translate-y-1/2 scale-150 rounded-full bg-[#FF0800]/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-8 font-headline text-6xl font-black leading-tight text-white md:text-8xl">
            THE FUTURE IS
            <br />
            SHIELDED.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl font-body text-xl text-on-surface-variant">
            Limited seats available for the V4 Early Access program. Enterprise-only deployment.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <input
              className="w-full border-b-2 border-primary-container bg-surface-container-highest px-6 py-4 font-label tracking-widest text-white focus:outline-none focus:ring-0 md:w-96"
              placeholder="ENTER WORK EMAIL"
              type="email"
            />
            <Link
              href="/contact"
              className="bg-primary-container px-12 py-4 font-headline text-xl font-black uppercase tracking-widest text-on-primary transition-all active:scale-95"
            >
              INITIATE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
