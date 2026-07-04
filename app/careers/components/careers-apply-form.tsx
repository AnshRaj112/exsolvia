"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PublicCareersSettings } from "@/app/lib/careers-settings";
import type { PublicPosition } from "@/app/lib/positions-types";
import { MaterialIcon } from "@/app/components/material-icon";

const MAX_MESSAGE = 2500;

type Props = {
  settings: Pick<PublicCareersSettings, "applyPhaseLabel">;
  initialPositions: PublicPosition[];
  initialPositionId?: string;
  /** When applying for a specific role (query or preselected) */
  role?: PublicPosition | null;
};

export function CareersApplyForm({
  settings,
  initialPositions,
  initialPositionId,
  role,
}: Props) {
  const [positions, setPositions] = useState<PublicPosition[]>(initialPositions);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [positionTitle, setPositionTitle] = useState(role?.title ?? "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    setPositions(initialPositions);
  }, [initialPositions]);

  useEffect(() => {
    if (role) {
      setPositionTitle(role.title);
      return;
    }
    if (!initialPositionId || positions.length === 0) return;
    const m = positions.find((p) => p._id === initialPositionId);
    if (m) setPositionTitle(m.title);
  }, [initialPositionId, positions, role]);

  const progress = useMemo(() => {
    let filled = 0;
    const total = 5;
    if (name.trim()) filled++;
    if (email.trim()) filled++;
    if (portfolio.trim() || linkedin.trim()) filled++;
    if (positionTitle.trim()) filled++;
    if (message.trim()) filled++;
    return Math.min(100, Math.round((filled / total) * 100));
  }, [name, email, portfolio, linkedin, positionTitle, message]);

  const introText = role
    ? role.summary.trim() || role.description.trim() || ""
    : "";

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus(null);
      if (!name.trim() || !email.trim() || !positionTitle.trim()) {
        setStatus({ ok: false, text: "Name, email, and position are required." });
        return;
      }
      if (!portfolio.trim() && !linkedin.trim()) {
        setStatus({
          ok: false,
          text: "Provide at least a portfolio URL or LinkedIn profile.",
        });
        return;
      }
      if (message.length > MAX_MESSAGE) {
        setStatus({ ok: false, text: `Intent must be at most ${MAX_MESSAGE} characters.` });
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: "",
            position: positionTitle.trim(),
            resume: portfolio.trim() || linkedin.trim(),
            portfolio: portfolio.trim() || undefined,
            linkedin: linkedin.trim() || undefined,
            message: message.trim() || undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setStatus({ ok: false, text: data.error || "Submission failed." });
          return;
        }
        setStatus({ ok: true, text: "Application received. The Board will review your dossier." });
        setName("");
        setEmail("");
        setPortfolio("");
        setLinkedin("");
        setMessage("");
        if (role) setPositionTitle(role.title);
        else if (initialPositionId) {
          const m = positions.find((p) => p._id === initialPositionId);
          if (m) setPositionTitle(m.title);
        }
      } catch {
        setStatus({ ok: false, text: "Network error. Try again." });
      } finally {
        setLoading(false);
      }
    },
    [name, email, portfolio, linkedin, message, positionTitle, role, initialPositionId, positions]
  );

  return (
    <>
      <div className="pointer-events-none fixed right-0 top-0 hidden h-screen w-1/4 opacity-20 lg:block">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuD6brC3s67Wrl6NkLs4Sa-3TxF-1abMyiR935fi29Uywd4HhlVBDU3xmGe3jVgvAzJx7TXhrYueLQ1TI_OmcFpdSxe6QopftP8VUq_7jhJdzkYXPtpLWgwL2EqbRLDxrG2b-0VKKjp4Yp2RAPqplUHZ5mZhDJfHRlXe8oM1qr-enbX-pxm13o2vbtBE17kz5v0G8Yv6XX0MpZFTqz82Qizhoyji4UEj6exxttkCZewrs0TCVdJA-QI9Y9nwYmQqcfoxJDRhcnr7CkU)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-12 bg-primary-container" />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-primary-fixed">
              {settings.applyPhaseLabel}
            </span>
          </div>
          <h1 className="mb-6 font-headline text-5xl font-black leading-none tracking-tighter text-on-surface md:text-7xl">
            {role?.title ?? "Application"}
          </h1>
          {introText ? (
            <p className="max-w-xl text-lg font-light leading-relaxed text-on-surface-variant">
              {introText}
            </p>
          ) : !role ? (
            <p className="max-w-xl text-lg font-light leading-relaxed text-on-surface-variant">
              Select a role and complete the protocol below.
            </p>
          ) : null}
        </div>

        <div className="mb-12">
          <div className="mb-3 flex items-end justify-between">
            <span className="font-label text-xs uppercase tracking-widest text-primary-fixed">
              Application Fidelity
            </span>
            <span className="font-headline text-lg font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full bg-primary-container shadow-[0_0_15px_rgba(255,85,63,0.4)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {!role && positions.length > 0 && (
            <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">
                  Designation
                </h3>
                <p className="text-sm font-light text-neutral-500">
                  Choose the operative role you are applying for.
                </p>
              </div>
              <div className="md:col-span-8">
                <label className="mb-2 block font-label text-[10px] uppercase tracking-widest text-neutral-500">
                  Role
                </label>
                <select
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest p-4 font-headline text-xl text-on-surface focus:border-primary focus:ring-0"
                >
                  <option value="">Select position</option>
                  {positions.map((p) => (
                    <option key={p._id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </section>
          )}

          <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">
                Identification
              </h3>
              <p className="text-sm font-light text-neutral-500">
                Verify your biometric and digital presence within our network.
              </p>
            </div>
            <div className="space-y-6 md:col-span-8">
              <div className="group">
                <label className="mb-2 block font-label text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-primary">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest p-4 font-headline text-xl text-on-surface placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                  placeholder="YOUR NAME"
                  autoComplete="name"
                />
              </div>
              <div className="group">
                <label className="mb-2 block font-label text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-primary">
                  Neural Mesh / Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest p-4 font-headline text-xl text-on-surface placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                  placeholder="you@domain.com"
                  autoComplete="email"
                />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">
                Archives
              </h3>
              <p className="text-sm font-light text-neutral-500">
                Provide direct access to your architectural repositories and professional history.
              </p>
            </div>
            <div className="space-y-6 md:col-span-8">
              <div className="group">
                <label className="mb-2 block font-label text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-primary">
                  Portfolio / Repository URL
                </label>
                <div className="flex items-center bg-surface-container-highest">
                  <span className="pl-4 text-neutral-600">
                    <MaterialIcon name="link" className="text-xl" />
                  </span>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full border-0 border-b-2 border-transparent bg-transparent p-4 text-base text-on-surface placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                    placeholder="https://"
                  />
                </div>
              </div>
              <div className="group">
                <label className="mb-2 block font-label text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-primary">
                  LinkedIn Profile
                </label>
                <div className="flex items-center bg-surface-container-highest">
                  <span className="pl-4 text-neutral-600">
                    <MaterialIcon name="account_circle" className="text-xl" />
                  </span>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full border-0 border-b-2 border-transparent bg-transparent p-4 text-base text-on-surface placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                    placeholder="linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">
                Intent
              </h3>
              <p className="text-sm font-light text-neutral-500">
                The Board values philosophical alignment as much as technical prowess.
              </p>
            </div>
            <div className="md:col-span-8">
              <label className="mb-2 block font-label text-[10px] uppercase tracking-widest text-neutral-500">
                Why EXSOLVIA?
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                maxLength={MAX_MESSAGE}
                className="w-full resize-none border-0 border-b-2 border-transparent bg-surface-container-highest p-6 text-lg text-on-surface placeholder:text-neutral-700 focus:border-primary focus:ring-0"
                placeholder="Define your vision for the future of synthetic cognition..."
              />
              <div className="mt-2 flex justify-end">
                <span className="font-label text-[10px] uppercase tracking-tighter text-neutral-600">
                  Maximum Character Density: {MAX_MESSAGE} · {message.length}/{MAX_MESSAGE}
                </span>
              </div>
            </div>
          </section>

          {status && (
            <div
              className={`rounded-sm border px-4 py-3 text-sm ${
                status.ok
                  ? "border-green-500/40 text-green-400"
                  : "border-red-500/40 text-red-400"
              }`}
            >
              {status.text}
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-8 border-t border-surface-container-high pt-12 md:flex-row">
            <div className="flex max-w-[200px] items-center gap-4">
              <MaterialIcon name="security" className="text-primary-container" />
              <p className="font-label text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                Encrypted Transmission Protocol Active
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center gap-4 bg-primary-container px-12 py-5 font-headline text-xl font-black text-on-primary shadow-[0_0_30px_rgba(255,85,63,0.2)] transition-all hover:shadow-[0_0_50px_rgba(255,85,63,0.4)] active:scale-95 disabled:opacity-60 md:w-auto"
            >
              {loading ? "Transmitting…" : "Submit Application to the Board"}
              <MaterialIcon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-outline-variant/20 pt-12">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            All open roles
          </Link>
          <Link
            href="/contact"
            className="font-label text-xs uppercase tracking-widest text-primary-container hover:text-primary"
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
}
