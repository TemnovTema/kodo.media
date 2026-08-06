import type { FeaturedSkill } from "@/lib/content";

type FeaturedSkillsCollectionProps = {
  skills: FeaturedSkill[];
};

export function FeaturedSkillsCollection({
  skills,
}: FeaturedSkillsCollectionProps) {
  return (
    <section aria-labelledby="featured-skills-list" className="space-y-8">
      <div className="grid gap-5 border-b border-[var(--color-border-strong)] pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="space-y-3">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-brand-yellow)]">
            curated / github
          </p>
          <h2
            id="featured-skills-list"
            className="max-w-3xl text-balance text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.98] tracking-[-0.055em] text-[var(--color-text)]"
          >
            Что взять в работу
          </h2>
        </div>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {String(skills.length).padStart(2, "0")} репозиториев
        </p>
      </div>

      <ol className="divide-y divide-[var(--color-border)]">
        {skills.map((skill, index) => (
          <li
            key={skill.repository}
            className="grid gap-5 py-8 first:pt-0 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-8 lg:grid-cols-[5rem_minmax(0,1fr)] lg:py-10"
          >
            <span className="font-mono text-[0.66rem] tracking-[0.18em] text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <article className="grid gap-6 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
              <div className="space-y-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-brand-yellow)]">
                  {skill.category}
                </p>
                <h3 className="max-w-[18ch] text-balance text-[clamp(1.55rem,2.5vw,2.35rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
                  {skill.name}
                </h3>
                <a
                  href={skill.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 font-mono text-[0.61rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] md:min-h-0"
                >
                  GitHub: {skill.repositoryLabel}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    ↗
                  </span>
                </a>
              </div>

              <div className="space-y-5">
                <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)]">
                  {skill.summary}
                </p>
                <div className="border-l border-[var(--color-brand-yellow)] pl-4">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    Лучше всего подходит
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-text)]">
                    {skill.bestFor}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  {skill.details.map((detail) => (
                    <li key={detail} className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-[var(--color-brand-yellow)]" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
