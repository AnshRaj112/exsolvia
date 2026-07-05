"use client";

import Image from "next/image";
import { useState } from "react";
import { MaterialIcon } from "../components/material-icon";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    clearanceLevel: "Level 01: Public Access",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setFeedback({ ok: false, text: "Please enter your name and message." });
      return;
    }
    try {
      setSubmitting(true);
      setFeedback(null);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          organization: form.organization,
          clearanceLevel: form.clearanceLevel,
          message: form.message,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setFeedback({ ok: false, text: data.error || "Failed to transmit signal." });
        return;
      }
      setFeedback({ ok: true, text: "Signal transmitted. Our team will reach out shortly." });
      setForm({
        name: "",
        organization: "",
        clearanceLevel: "Level 01: Public Access",
        message: "",
      });
    } catch {
      setFeedback({ ok: false, text: "Failed to transmit signal." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">
      <header className="relative mb-20 text-center md:text-left">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary-container/5 blur-[120px]" />
        <p className="font-label mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-container">
          Protocol Status: Awaiting Initiation
        </p>
        <h1 className="max-w-3xl font-headline text-5xl font-bold leading-none tracking-tighter text-neutral-50 md:text-7xl">
          Initiate Secure Protocol
        </h1>
        <div className="mt-8 h-1 w-24 bg-primary-container" />
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <section className="relative overflow-hidden border border-outline-variant/10 bg-surface-container-low p-8 md:col-span-7 md:p-12">
          <div className="absolute right-0 top-0 p-4 opacity-10">
            <MaterialIcon name="security" className="text-7xl" />
          </div>
          <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-label text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                  Operator Name
                </label>
                <input
                  className="w-full border-none border-b-2 border-surface-container-high bg-surface-container-lowest px-0 py-4 text-on-background transition-all placeholder:text-neutral-700 focus:border-primary-container focus:ring-0"
                  placeholder="Full Legal Identity"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                  Organization
                </label>
                <input
                  className="w-full border-none border-b-2 border-surface-container-high bg-surface-container-lowest px-0 py-4 text-on-background transition-all placeholder:text-neutral-700 focus:border-primary-container focus:ring-0"
                  placeholder="Affiliated Entity"
                  type="text"
                  value={form.organization}
                  onChange={(e) => setForm((prev) => ({ ...prev, organization: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                Security Clearance level
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none border-none border-b-2 border-surface-container-high bg-surface-container-lowest px-0 py-4 text-on-background transition-all focus:border-primary-container focus:ring-0"
                  value={form.clearanceLevel}
                  onChange={(e) => setForm((prev) => ({ ...prev, clearanceLevel: e.target.value }))}
                >
                  <option>Level 01: Public Access</option>
                  <option>Level 02: Internal Research</option>
                  <option>Level 03: Administrative Oversight</option>
                  <option>Level 04: Executive Protocol</option>
                  <option>Level 05: Black-Site Access</option>
                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                  <MaterialIcon name="expand_more" className="text-primary-container" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                Encrypted Message
              </label>
              <textarea
                className="w-full resize-none border-none border-b-2 border-surface-container-high bg-surface-container-lowest px-0 py-4 text-on-background transition-all placeholder:text-neutral-700 focus:border-primary-container focus:ring-0"
                placeholder="Input transmission data here..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>
            {feedback ? (
              <p className={`text-sm ${feedback.ok ? "text-emerald-300" : "text-red-300"}`}>
                {feedback.text}
              </p>
            ) : null}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="group flex items-center gap-4 rounded-sm bg-primary-container px-10 py-5 font-headline font-black uppercase tracking-tighter text-on-primary transition-all hover:shadow-[0_0_30px_rgba(255,85,63,0.3)] active:scale-95"
              >
                {submitting ? "Transmitting..." : "Transmit Signal"}
                <MaterialIcon
                  name="arrow_forward"
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-8 lg:col-span-5">
          <div className="border-l-4 border-primary-container bg-surface-container-high p-8">
            <h3 className="mb-6 font-headline text-2xl font-bold text-neutral-50">Nexus Point</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MaterialIcon name="location_on" className="text-primary-container" />
                <div>
                  <p className="font-bold text-neutral-100">Obsidian Tower</p>
                  <p className="text-sm text-neutral-400">Sector 7-G, Neo-City</p>
                  <p className="mt-1 text-xs text-neutral-500">Grid: 40.7128° N, 74.0060° W</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MaterialIcon name="alternate_email" className="text-primary-container" />
                <div>
                  <p className="font-bold text-neutral-100">Direct Uplink</p>
                  <p className="text-sm text-neutral-400">secure@exsolvia.nexus</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-md border border-outline-variant/10 bg-surface-container-lowest">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS4DLkWzACkCK8Azuthn_H5v49BYKiyqJ0nnQG2BTV2jVc0fFZfEEaqURNeWlKCoIPhpUokLSpdiT0SY334JrE2evILYxTXo3m5zwAjqtyoc4GHRuFIZufbNUkWg66J4qseLaS_L1hpCJvLekcpqZHRczzsysfHquA2XYsyxR_kdGpdwhEDrBQcUtZ4D9ozf1HxkoVBc6xlmLtZck_9KJhIsCF-ZCEFCXc7QvcSF_WBzhj5M_UDW5C16Epq9JUHtxibzGWPikW-qQ"
              alt=""
              fill
              className="object-cover grayscale opacity-40 transition-opacity duration-700 group-hover:opacity-60"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-full bg-primary-container/20" />
                <div className="relative h-4 w-4 rounded-full border-2 border-on-primary bg-primary-container shadow-[0_0_20px_rgba(255,85,63,0.8)]" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded border border-outline-variant/20 bg-surface-container/80 px-3 py-1 font-label text-[10px] uppercase tracking-widest backdrop-blur-md">
              Operational Zone Alpha
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
