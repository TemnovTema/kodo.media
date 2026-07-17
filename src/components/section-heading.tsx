type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

export function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[150px_1fr] md:items-start">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
        {label}
      </p>
      <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
        <h2 className="max-w-4xl text-balance text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
