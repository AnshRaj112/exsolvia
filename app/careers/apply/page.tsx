import Link from "next/link";
import { notFound } from "next/navigation";
import { getCareersSettings } from "@/app/lib/careers-settings";
import { getActivePositions, getPositionById } from "@/app/lib/positions";
import { MaterialIcon } from "../../components/material-icon";
import { CareersApplyForm } from "../components/careers-apply-form";

type Props = {
  searchParams: Promise<{ position?: string }>;
};

export default async function ApplyPage({ searchParams }: Props) {
  const { position: positionId } = await searchParams;
  const [settings, positions] = await Promise.all([getCareersSettings(), getActivePositions()]);

  if (positionId) {
    const role = await getPositionById(positionId);
    if (!role) {
      notFound();
    }

    return (
      <main className="relative min-h-screen obsidian-glow">
        <CareersApplyForm
          settings={settings}
          initialPositions={positions}
          initialPositionId={positionId}
          role={role}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen obsidian-glow">
      {positions.length === 0 ? (
        <div className="mx-auto max-w-3xl px-6 pt-32">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-12 bg-primary-container" />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-primary-fixed">
              Applications
            </span>
          </div>
          <h1 className="mb-6 font-headline text-5xl font-black leading-none tracking-tighter text-on-surface md:text-6xl">
            Apply
          </h1>
          <div className="rounded-md border border-outline-variant/15 bg-surface-container-lowest/50 px-8 py-16 text-center">
            <p className="font-headline text-xl font-semibold text-white md:text-2xl">
              No careers available right now
            </p>
            <p className="mt-4 text-on-surface-variant">
              There are no open roles to apply for. Please check back later.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 border-t border-outline-variant/20 pt-12">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary"
            >
              <MaterialIcon name="arrow_back" className="text-sm" />
              Back to careers
            </Link>
            <Link
              href="/contact"
              className="font-label text-xs uppercase tracking-widest text-primary-container hover:text-primary"
            >
              Contact us
            </Link>
          </div>
        </div>
      ) : (
        <CareersApplyForm settings={settings} initialPositions={positions} />
      )}
    </main>
  );
}
