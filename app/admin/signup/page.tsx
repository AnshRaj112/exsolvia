"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Signup failed");
        return;
      }
      router.push("/admin");
    } catch {
      setError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest px-6 py-16">
      <div className="mx-auto max-w-md rounded-md border border-outline-variant/20 bg-surface p-8">
        <h1 className="mb-2 font-headline text-3xl font-black text-on-surface">Admin Signup</h1>
        <p className="mb-8 text-on-surface-variant">Create an admin account for dashboard access.</p>
        <form className="space-y-5" onSubmit={onSubmit}>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-sm border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-sm border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface"
          />
          <input
            type="password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 chars)"
            className="w-full rounded-sm border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface"
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-primary-container px-4 py-3 font-headline font-bold text-on-primary disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-primary-container hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
