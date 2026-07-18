import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { EditorialVisual } from "@/components/editorial-visual";
import { LibraryMetaTags } from "@/components/library-meta-tags";
import { TasteSkillArticle } from "@/components/taste-skill-article";
import { getLibraryAccent } from "@/lib/brand";
import { getLibraryItemBySlug, libraryItems } from "@/lib/content";
import { getLibraryVisualAsset } from "@/lib/visual-assets";

type LibraryItemPageProps = {
  params: Promise<{ slug: string }>;
};

const readingSections = [
  { id: "payload", label: "Состав" },
  { id: "when-to-use", label: "Применение" },
  { id: "outcome", label: "Результат" },
];

export async function generateStaticParams() {
  return libraryItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: LibraryItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getLibraryItemBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function LibraryItemPage({ params }: LibraryItemPageProps) {
  const { slug } = await params;
  const item = getLibraryItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const accent = getLibraryAccent(item.kind);
  const hasTasteSkillCover = item.sourceUrl?.includes(
    "pimenov.ai/knowledge/taste-skill-anti-slop-frontend",
  );
  const isTasteSkill = item.slug === "taste-skill-frontend";

  return (
    <div className="page-stack">
      <div className="detail-rail-shell">
        <div className="detail-rail-shell__rail">
          <span className="vertical-rail-label">library</span>
        </div>

        <div className="max-w-5xl space-y-10">
          <header
            className={`page-hero max-w-4xl space-y-6 ${
              isTasteSkill ? "" : "border-b border-[var(--color-border)] pb-10"
            }`}
          >
            <div className="space-y-5">
              <Link
                href={isTasteSkill ? "/library/folder/input-stack" : "/library"}
                className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1 group-active:-translate-x-0.5 motion-reduce:transform-none"
                >
                  ←
                </span>
                {isTasteSkill ? "Вводные для ИИ" : "В библиотеку"}
              </Link>
              {isTasteSkill ? null : (
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Библиотека / {item.kind}
                </p>
              )}
              <h1 className="max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
                {item.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
                {item.summary}
              </p>
              <div className="space-y-4">
                <LibraryMetaTags
                  tags={item.tags ?? [item.format, item.target]}
                  accent={accent}
                />
                {!isTasteSkill && item.sourceUrl && item.sourceLabel ? (
                  <div className="flex justify-end">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      Источник: {item.sourceLabel}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          {isTasteSkill ? (
            <TasteSkillArticle
              sourceUrl={item.sourceUrl}
              repositoryUrl={item.repositoryUrl}
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,44rem)] lg:gap-14">
            <aside className="border-y border-[var(--color-border)] py-4 lg:sticky lg:top-28 lg:self-start lg:border-y-0 lg:border-r lg:py-0 lg:pr-6">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                В материале
              </p>
              <nav
                aria-label="Разделы материала"
                className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-3"
              >
                {readingSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {String(index + 1).padStart(2, "0")} {section.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="space-y-14 lg:pt-1">
              <EditorialVisual
                asset={getLibraryVisualAsset(item.slug)}
                variant="minimal"
                className="min-h-[220px] md:min-h-[300px]"
                imageClassName={
                  hasTasteSkillCover
                    ? "object-cover object-center grayscale brightness-[0.52] contrast-125 opacity-80"
                    : "object-cover object-center"
                }
                priority
              />

              <section id="payload" className="scroll-mt-32 space-y-6">
                <div className="space-y-3">
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    01 / состав
                  </p>
                  <h2 className="text-balance text-[clamp(1.8rem,3vw,2.7rem)] leading-[0.98] tracking-[-0.06em] text-[var(--color-text)]">
                    Что входит в ресурс
                  </h2>
                </div>
                <ol className="border-y border-[var(--color-border)]">
                  {item.includes.map((entry, index) => (
                    <li
                      key={entry}
                      className="grid gap-4 border-b border-[var(--color-border)] py-5 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)]"
                    >
                      <span className="font-mono text-[0.66rem] tracking-[0.16em] text-[var(--color-text-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base leading-8 text-[var(--color-text-soft)]">{entry}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="when-to-use" className="scroll-mt-32 space-y-6">
                <div className="space-y-3">
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    02 / применение
                  </p>
                  <h2 className="text-balance text-[clamp(1.8rem,3vw,2.7rem)] leading-[0.98] tracking-[-0.06em] text-[var(--color-text)]">
                    Когда использовать
                  </h2>
                </div>
                <div className="space-y-4">
                  {item.whenToUse.map((entry) => (
                    <p
                      key={entry}
                      className="border-l border-[var(--color-border-strong)] pl-5 text-base leading-8 text-[var(--color-text-soft)]"
                    >
                      {entry}
                    </p>
                  ))}
                </div>
              </section>

              <section
                id="outcome"
                className="scroll-mt-32 border border-[var(--color-border-strong)] p-6 sm:p-8"
                style={{ "--accent": accent } as CSSProperties}
              >
                <div className="space-y-5 border-l-2 border-[var(--accent)] pl-5">
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    03 / результат
                  </p>
                  <p className="max-w-2xl text-xl leading-8 tracking-[-0.025em] text-[var(--color-text)] md:text-2xl">
                    {item.outcome}
                  </p>
                </div>
              </section>
            </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
