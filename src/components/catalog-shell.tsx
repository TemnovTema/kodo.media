import type { ReactNode } from "react";

type CatalogShellProps = {
  rail: string;
  eyebrow: string;
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  introVisual?: ReactNode;
  introVisualPosition?: "left" | "right";
  children: ReactNode;
};

export function CatalogShell({
  rail,
  eyebrow,
  title,
  description,
  stats,
  introVisual,
  introVisualPosition = "left",
  children,
}: CatalogShellProps) {
  const introText = (
    <div className="flex min-h-[16rem] min-w-0 flex-col justify-center space-y-5 md:min-h-[18rem] xl:min-h-[24rem]">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
        {eyebrow}
      </p>
      <h1 className="max-w-4xl text-balance text-[clamp(2.15rem,4.8vw,4.5rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
        {description}
      </p>
    </div>
  );

  const introGraphic = introVisual ? (
    <div className="relative min-h-[16rem] min-w-0 max-w-full overflow-hidden md:min-h-[18rem] xl:min-h-[24rem]">
      {introVisual}
    </div>
  ) : null;

  return (
    <section className="catalog-shell">
      <div className="catalog-shell__rail">
        <span className="vertical-rail-label">{rail}</span>
      </div>

      <div className="catalog-shell__body min-w-0">
        <header className="catalog-intro min-w-0">
          <div
            className={
              introVisual
                ? "grid min-w-0 gap-6 overflow-hidden md:grid-cols-[minmax(15rem,0.82fr)_minmax(0,1.18fr)] md:items-stretch md:gap-8 xl:grid-cols-[minmax(19rem,0.88fr)_minmax(0,1.12fr)] xl:gap-10"
                : "grid min-w-0 gap-6"
            }
          >
            {introVisualPosition === "right" ? (
              <>
                {introText}
                {introGraphic}
              </>
            ) : (
              <>
                {introGraphic}
                {introText}
              </>
            )}
          </div>

          {stats?.length ? (
            <dl className="catalog-intro__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="text-sm leading-7 text-[var(--color-text)] md:text-base">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
