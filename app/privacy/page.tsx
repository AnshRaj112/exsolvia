import Image from "next/image";
import { MaterialIcon } from "../components/material-icon";

export default function PrivacyPage() {
  return (
    <main className="relative pb-20 pt-24">
      <div className="pointer-events-none fixed right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary-container/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-[600px] w-[600px] translate-y-1/3 -translate-x-1/4 rounded-full bg-secondary-container/5 blur-[100px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <header className="mb-24 max-w-4xl md:mb-32">
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-12 bg-primary-container" />
            <span className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-primary-container">
              SECURITY PROTOCOL 01
            </span>
          </div>
          <h1 className="mb-8 font-headline text-5xl font-black leading-none tracking-tighter md:text-8xl">
            PROTOCOL: <span className="text-zinc-500">DATA</span>
            <br />
            SOVEREIGNTY
          </h1>
          <p className="max-w-2xl text-xl font-light leading-relaxed text-zinc-400 md:text-2xl">
            How we protect the architecture of your information through high-intelligence
            containment and neural privacy.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="sticky top-32 hidden self-start md:col-span-3 md:block">
            <nav className="space-y-6">
              {[
                ["Introduction", true],
                ["Data Sovereignty", false],
                ["Neural Privacy", false],
                ["Encryption", false],
              ].map(([label, active]) => (
                <div key={label as string} className="group flex cursor-pointer items-center gap-4">
                  <span
                    className={
                      active
                        ? "h-2 w-2 rounded-full bg-primary-container shadow-[0_0_10px_rgba(255,85,63,0.8)]"
                        : "h-2 w-2 rounded-full bg-zinc-800 transition-colors group-hover:bg-zinc-600"
                    }
                  />
                  <span
                    className={
                      active
                        ? "font-label text-xs uppercase tracking-widest text-white"
                        : "font-label text-xs uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-zinc-300"
                    }
                  >
                    {label as string}
                  </span>
                </div>
              ))}
            </nav>
          </aside>

          <div className="space-y-24 md:col-span-9 md:space-y-32">
            <section id="sovereignty" className="scroll-mt-48">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-headline text-3xl font-bold text-primary">01</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">
                  Data Sovereignty
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                <div className="space-y-6 text-lg leading-relaxed text-zinc-300 lg:col-span-3">
                  <p>
                    Your information is not merely data; it is the structural integrity of your
                    operation. EXSOLVIA operates on a zero-trust architecture where data residency is
                    strictly managed according to the highest global compliance tiers.
                  </p>
                  <p>
                    Under our sovereignty protocol, your intelligence assets remain localized and
                    isolated. We do not participate in cross-border data harvesting or secondary-market
                    analytics. Every byte is siloed within dedicated high-security clusters.
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="rounded-lg border border-zinc-800/30 bg-surface-container-low p-8">
                    <MaterialIcon name="shield_lock" className="mb-4 text-primary-container" />
                    <h4 className="mb-2 font-headline font-bold text-white">Isolation Protocol</h4>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      Hardened silicon isolation prevents lateral data movement between enterprise
                      instances.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="neural" className="scroll-mt-48">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-headline text-3xl font-bold text-primary">02</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">
                  Neural Privacy
                </h2>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-white/5 bg-surface-container-lowest p-12">
                <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-20">
                  <MaterialIcon name="psychology" className="text-[12rem]" />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <p className="mb-12 text-xl leading-relaxed text-zinc-300">
                    Our artificial intelligence models are trained using{" "}
                    <span className="font-bold text-white">Federated Learning</span> and{" "}
                    <span className="font-bold text-white">Differential Privacy</span>. This ensures
                    that while our systems become more intelligent, they never remember your specific
                    proprietary inputs.
                  </p>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {[
                      [
                        "Zero Retention",
                        "Transitional neural weights are purged immediately following inference cycles.",
                      ],
                      [
                        "Noise Injection",
                        "Differential privacy masks individual data points within statistical aggregates.",
                      ],
                    ].map(([title, body]) => (
                      <div key={title as string} className="space-y-4">
                        <div className="h-[2px] w-8 bg-primary-container" />
                        <h5 className="font-headline text-sm font-bold uppercase tracking-widest text-white">
                          {title as string}
                        </h5>
                        <p className="text-sm text-zinc-500">{body as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="encryption" className="scroll-mt-48">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-headline text-3xl font-bold text-primary">03</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">
                  Encryption Protocols
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  ["edit", "Post-Quantum", "Lattice-based cryptography for future-proof security."],
                  [
                    "enhanced_encryption",
                    "AES-256-GCM",
                    "Authenticated encryption at rest for all storage tiers.",
                  ],
                  ["vpn_lock", "TLS 1.3 Strict", "Mandatory encryption for all data in transit."],
                ].map(([icon, title, body], idx) => (
                  <div
                    key={title as string}
                    className={`flex h-64 flex-col justify-between rounded-lg border border-zinc-800/20 p-8 ${idx === 1 ? "bg-surface-container-high" : "bg-surface-container"}`}
                  >
                    <div className="text-primary-container">
                      <MaterialIcon name={icon as string} />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-white">{title as string}</h4>
                      <p className="text-xs text-zinc-500">{body as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="logic" className="scroll-mt-48">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-headline text-3xl font-bold text-primary">04</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">
                  Third-Party Logic
                </h2>
              </div>
              <div className="max-w-3xl space-y-8">
                <p className="text-lg leading-relaxed text-zinc-300">
                  EXSOLVIA does not rely on third-party analytical trackers or advertising cookies.
                  Our logic is self-contained. When integration with third-party providers is
                  required, we act as a secure proxy, scrubbing all non-essential metadata before
                  transmission.
                </p>
                <ul className="space-y-4">
                  {[
                    "Zero-Tracker Policy on all public and private dashboards.",
                    "Anonymized telemetry for system health monitoring only.",
                    "Proxy-filtered vendor communication layers.",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-4">
                      <MaterialIcon
                        name="check_circle"
                        className="mt-1 text-sm text-primary-container"
                      />
                      <span className="text-zinc-400">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="agency" className="scroll-mt-48">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-headline text-3xl font-bold text-primary">05</span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">
                  User Agency
                </h2>
              </div>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="mb-8 text-lg leading-relaxed text-zinc-300">
                    Agency is the foundation of intelligence. You maintain absolute control over your
                    digital footprint. Our Kill Switch protocol allows for the immediate, irreversible
                    cryptographic erasure of your entire environment.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="rounded-sm bg-white px-8 py-3 font-headline text-sm font-bold uppercase tracking-wider text-black">
                      Request Archive
                    </button>
                    <button className="rounded-sm border border-zinc-700 px-8 py-3 font-headline text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-900">
                      Data Erasure
                    </button>
                  </div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-lg border border-white/5 bg-zinc-900/50 lg:col-span-5">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUgVupDbOdA9QGCwxy7aKfDygY-0P6DxwSSn8InEAsw961U1-GMdpwFJiwqeNeUrIq-ykGlS4oBn5JfRDteVsiZEnN4Crp5iuVj3pyhGx-Sfxs5mR5iGtjjcnAubdXhMyeEHUtNeJXnVMctkPe2Aiqcn2VnE8TjMR8p2LG6gD2idgpw605kpCXqnm_cKCHlC9xIZholIKO9JB6NGRSq0RzL0nYckQ8OhlVLT2fwRfcRnqM8Hkb2RuDmmxUZUTkWJSCMwdyMldHRgU"
                    alt=""
                    fill
                    className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-1 font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Status
                    </div>
                    <div className="font-headline text-sm font-bold text-white">
                      Full Agency Enabled
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
