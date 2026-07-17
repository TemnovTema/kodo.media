import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { EditorialVisual } from "@/components/editorial-visual";
import { SectionHeading } from "@/components/section-heading";
import { getLibraryAccent } from "@/lib/brand";
import { getLibraryItemBySlug, libraryItems } from "@/lib/content";
import { getLibraryVisualAsset } from "@/lib/visual-assets";

type LibraryItemPageProps = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <div className="page-stack">
      <div className="detail-rail-shell">
        <div className="detail-rail-shell__rail">
          <span className="vertical-rail-label">library</span>
        </div>

        <div className="space-y-10">
          <section className="page-hero grid gap-8 border-b border-[var(--color-border)] pb-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
            <div className="space-y-6">
              <Link
                href="/library"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <span aria-hidden="true">←</span>
                В библиотеку
              </Link>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                library / {item.kind.toLowerCase()}
              </p>
              <h1 className="text-balance text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
                {item.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
                {item.summary}
              </p>
              <div className="grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-2">
                {[
                  ["Тип", item.kind],
                  ["Контур", item.target],
                  ["Формат", item.format],
                  ["Эффект", item.outcome],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      {label}
                    </p>
                    <p className="text-sm leading-7 text-[var(--color-text-soft)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <EditorialVisual
              asset={getLibraryVisualAsset(item.slug)}
              variant="minimal"
              className="min-h-[260px] md:min-h-[340px]"
              imageClassName="object-cover object-center"
              priority
            />
          </section>

          <section className="space-y-6">
            <SectionHeading
              label="Inside / payload"
              title="Что лежит внутри"
              description="Короткий состав ресурса: какие сигналы, ограничения и рабочие куски он приносит в пайплайн."
            />
            <div className="border-y border-[var(--color-border)]">
              {item.includes.map((entry, index) => (
                <div
                  key={entry}
                  className="grid gap-3 border-b border-[var(--color-border)] py-5 last:border-b-0 md:grid-cols-[90px_1fr]"
                >
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    item 0{index + 1}
                  </span>
                  <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                    {entry}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                when to use
              </p>
              <div className="space-y-4">
                {item.whenToUse.map((entry) => (
                  <p key={entry} className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                    {entry}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="space-y-4 border-t border-[var(--color-border)] pt-4"
              style={{ "--accent": accent } as CSSProperties}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                expected effect
              </p>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                {item.outcome}. Этот ресурс полезен не как абстрактная теория, а как
                конкретный проход, который можно встроить в реальную работу с
                агентом уже на следующей итерации.
              </p>
              <div className="h-px w-24 bg-[var(--accent)]" aria-hidden="true" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
