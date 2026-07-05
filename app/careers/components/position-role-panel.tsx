import Link from "next/link";
import { MaterialIcon } from "@/app/components/material-icon";
import { getPositionCardBody, type PublicPosition } from "@/app/lib/positions-types";

type CardProps = {
  mode: "card";
  role: PublicPosition;
};

type DetailProps = {
  mode: "detail";
  role: PublicPosition;
};

/**
 * Renders admin-managed role fields only (title, icon, tags, summary, description).
 * Used on /careers (card) and /careers/apply?position= (detail) so layout stays aligned.
 */
export function PositionRolePanel(props: CardProps | DetailProps) {
  const { role, mode } = props;
  const tags = role.tags.filter(Boolean);

  if (mode === "card") {
    const body = getPositionCardBody(role);
    return (
      <article className="group relative flex flex-col rounded-md border border-outline-variant/15 bg-surface-container-lowest/50 p-8 transition-colors hover:border-primary-container/30">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-outline-variant/20 bg-surface-container-low/80 text-primary-container">
            <MaterialIcon name={role.icon} className="text-2xl" />
          </span>
        </div>
        <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">{role.title}</h2>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-outline-variant/20 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {body ? (
          <p className="mt-4 flex-1 whitespace-pre-wrap text-base leading-relaxed text-on-surface-variant">
            {body}
          </p>
        ) : null}
        <Link
          href={`/careers/apply?position=${encodeURIComponent(role._id)}`}
          className="mt-8 inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-widest text-primary-container transition-colors group-hover:text-primary"
        >
          Apply for this role
          <MaterialIcon name="arrow_forward" className="text-sm" />
        </Link>
      </article>
    );
  }

  const summary = role.summary.trim();
  const description = role.description.trim();

  return (
    <div className="rounded-md border border-outline-variant/15 bg-surface-container-lowest/40 p-8">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md border border-outline-variant/20 bg-surface-container-low/80 text-primary-container">
        <MaterialIcon name={role.icon} className="text-2xl" />
      </div>
      <h1 className="font-headline text-4xl font-black leading-none tracking-tighter text-on-surface md:text-5xl">
        {role.title}
      </h1>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-outline-variant/20 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {summary ? (
        <p className="mt-6 text-lg leading-relaxed text-on-surface-variant whitespace-pre-wrap">{summary}</p>
      ) : null}
      {description ? (
        <div className="mt-6 whitespace-pre-wrap border-t border-outline-variant/15 pt-6 text-on-surface-variant">
          {description}
        </div>
      ) : null}
    </div>
  );
}
