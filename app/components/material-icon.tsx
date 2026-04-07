export function MaterialIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined shrink-0 not-italic leading-none ${className}`.trim()}
      aria-hidden
    >
      {name}
    </span>
  );
}
