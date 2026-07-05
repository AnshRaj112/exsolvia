export default function TermsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-24">
      <header className="mb-20 flex flex-col justify-between gap-8 border-b border-surface-container-high pb-12 md:mb-24 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-12 bg-[#FF0800]" />
            <span className="font-label text-xs font-bold uppercase tracking-[0.3em] text-[#FF0800]">
              Regulatory Framework v4.0
            </span>
          </div>
          <h1 className="mb-6 font-headline text-5xl font-black leading-none tracking-tighter text-ghost-white md:text-7xl">
            PROTOCOL: TERMS OF OPERATION
          </h1>
          <p className="max-w-xl text-xl font-light text-zinc-500">
            The framework of our engagement. These parameters define the legal architecture
            governing the utilization of the EXSOLVIA Intelligence Layer.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <span className="font-label text-[10px] uppercase tracking-widest text-zinc-600">
            Effective Timestamp
          </span>
          <span className="font-headline text-lg font-bold text-ghost-white">OCT.24.2024.1200Z</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <aside className="sticky top-32 hidden h-fit md:col-span-3 md:block">
          <ul className="space-y-6">
            {[
              ["#operational", "01. Operational Parameters", true],
              ["#integrity", "02. Service Integrity", false],
              ["#intellectual", "03. Intellectual Property", false],
              ["#liability", "04. Liability Constraints", false],
              ["#termination", "05. Termination Protocols", false],
            ].map(([href, label, active]) => (
              <li key={label as string}>
                <a
                  href={href as string}
                  className={
                    active
                      ? "font-label text-xs font-bold uppercase tracking-widest text-[#FF0800] transition-all"
                      : "font-label text-xs font-bold uppercase tracking-widest text-zinc-500 transition-all hover:text-white"
                  }
                >
                  {label as string}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-20 border-l-2 border-[#FF0800] bg-surface-container-lowest p-6">
            <p className="font-body text-[11px] uppercase tracking-wider text-zinc-500">
              Compliance with these protocols is non-negotiable for all entities accessing the
              high-intelligence infrastructure.
            </p>
          </div>
        </aside>

        <div className="space-y-24 md:col-span-9 md:space-y-32">
          <section id="operational" className="scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-headline text-4xl font-black text-[#FF0800] opacity-20">01</span>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-[#FF0800]">
                Operational Parameters
              </h2>
            </div>
            <div className="space-y-6 leading-relaxed text-zinc-300">
              <p className="text-lg">
                EXSOLVIA grants you a limited, non-exclusive, non-transferable license to access our
                proprietary intelligence frameworks. This access is contingent upon the continuous
                adherence to the security protocols established in the EXSOLVIA Intelligence
                Directive.
              </p>
              <p>
                User accounts are verified through multi-layered biometric and cryptographic
                signatures. Attempting to bypass these identity verification modules constitutes a
                terminal breach of these protocols. Users are solely responsible for all compute
                cycles and intelligence queries initiated through their authenticated nodes.
              </p>
            </div>
          </section>

          <section id="integrity" className="scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-headline text-4xl font-black text-[#FF0800] opacity-20">02</span>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-[#FF0800]">
                Service Integrity
              </h2>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-sm border-t border-white/5 bg-surface-container-low p-8">
                <h3 className="mb-4 font-headline font-bold uppercase tracking-tighter text-white">
                  System Uptime
                </h3>
                <p className="text-sm text-zinc-400">
                  EXSOLVIA aims for 99.999% architecture availability. Maintenance cycles are
                  scheduled during low-demand windows to ensure continuous service integrity.
                </p>
              </div>
              <div className="rounded-sm border-t border-white/5 bg-surface-container-low p-8">
                <h3 className="mb-4 font-headline font-bold uppercase tracking-tighter text-white">
                  Usage Limits
                </h3>
                <p className="text-sm text-zinc-400">
                  Computational resource allocation is governed by tier-based quotas. Excessive load
                  that threatens the stability of the Obsidian Monolith will result in automated
                  throttling.
                </p>
              </div>
            </div>
            <p className="leading-relaxed text-zinc-300">
              The EXSOLVIA infrastructure is provided as-is. While we maintain the architecture of
              intelligence, we do not warrant that the output of synthetic reasoning models will be
              error-free or suit every specific user application without independent verification.
            </p>
          </section>

          <section id="intellectual" className="scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-headline text-4xl font-black text-[#FF0800] opacity-20">03</span>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-[#FF0800]">
                Intellectual Property
              </h2>
            </div>
            <div className="relative mb-8 overflow-hidden rounded-sm bg-gradient-to-br from-surface-container-high to-surface-container-lowest p-12">
              <p className="relative z-10 mb-6 text-lg font-medium text-ghost-white">
                All algorithmic frameworks, neural weightings, and architectural designs remain the
                exclusive property of EXSOLVIA.
              </p>
              <p className="relative z-10 text-sm text-zinc-400">
                Users retain ownership of the raw data inputted into the system, but grant EXSOLVIA
                a perpetual, global, royalty-free license to utilize anonymized interaction patterns
                to refine the core intelligence layer.
              </p>
            </div>
          </section>

          <section id="liability" className="scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-headline text-4xl font-black text-[#FF0800] opacity-20">04</span>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-[#FF0800]">
                Liability Constraints
              </h2>
            </div>
            <div className="space-y-6 text-zinc-300">
              <p>
                Under no circumstances shall EXSOLVIA, its architects, or its algorithmic
                controllers be liable for any direct, indirect, incidental, or consequential damages
                resulting from the use or inability to use the intelligence infrastructure.
              </p>
              <div className="border-y border-white/10 py-6">
                <span className="mb-4 block font-headline text-xs uppercase tracking-widest text-white">
                  MAXIMUM RECOVERY
                </span>
                <p className="font-headline text-2xl font-black tracking-tight text-ghost-white">
                  LIMIT: $0.00 USD / COMPUTE CREDIT EQUIVALENT
                </p>
              </div>
              <p className="text-sm uppercase tracking-tight text-zinc-500">
                This limitation applies regardless of the legal theory under which liability is
                asserted.
              </p>
            </div>
          </section>

          <section id="termination" className="scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-headline text-4xl font-black text-[#FF0800] opacity-20">05</span>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-[#FF0800]">
                Termination Protocols
              </h2>
            </div>
            <div className="space-y-6 text-zinc-300">
              <p>
                Engagement may be terminated by either party at any time. EXSOLVIA reserves the right
                to initiate immediate Cold Shutdown of user access without notice if a security breach
                or protocol violation is detected via our intelligence surveillance systems.
              </p>
              <p>
                Upon termination, all licenses granted herein immediately cease. All user data will be
                purged according to our Data Sovereignty policy within 72 hours, unless retention is
                required by governing intelligence mandates.
              </p>
            </div>
            <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-[#FF0800]/20 pt-12 md:flex-row">
              <div>
                <h4 className="mb-2 font-headline text-lg font-bold uppercase text-ghost-white">
                  Acknowledge Agreement
                </h4>
                <p className="font-label text-xs uppercase tracking-widest text-zinc-500">
                  By continuing use, you confirm binary acceptance.
                </p>
              </div>
              <button className="rounded-sm bg-[#FF553F] px-12 py-4 font-headline text-sm font-bold uppercase tracking-widest text-[#5b0100] transition-all hover:brightness-110 active:scale-95">
                Accept Protocol
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
