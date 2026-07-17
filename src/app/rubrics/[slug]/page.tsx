import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { EditorialVisual } from "@/components/editorial-visual";
import { SectionHeading } from "@/components/section-heading";
import {
  getArticlesByRubric,
  getRubricBySlug,
  rubrics,
} from "@/lib/content";
import { getRubricVisualAsset } from "@/lib/visual-assets";

type RubricPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return rubrics.map((rubric) => ({
    slug: rubric.slug,
  }));
}

export async function generateMetadata({
  params,
}: RubricPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rubric = getRubricBySlug(slug);

  if (!rubric) {
    return {};
  }

  return {
    title: rubric.title,
    description: rubric.summary,
  };
}

export default async function RubricPage({ params }: RubricPageProps) {
  const { slug } = await params;
  const rubric = getRubricBySlug(slug);

  if (!rubric) {
    notFound();
  }

  const rubricArticles = getArticlesByRubric(slug);

  return (
    <div className="page-stack">
      <section className="page-hero grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
        <div className="space-y-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            rubric / {rubric.slug}
          </p>
          <h1 className="text-balance text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
            {rubric.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
            {rubric.mission}
          </p>
          <div className="grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-2">
            {[
              ["Сигнал", rubric.signal],
              ["Ритм", rubric.cadence],
              ["Материалов", String(rubricArticles.length).padStart(2, "0")],
              ["Статус", "активная рубрика"],
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
          asset={getRubricVisualAsset(rubric.slug)}
          variant="minimal"
          className="min-h-[260px] md:min-h-[340px]"
          imageClassName="object-cover object-center"
          priority
        />
      </section>

      <section className="space-y-6">
        <SectionHeading
          label="Archive / rubric"
          title={`Материалы рубрики ${rubric.title}`}
          description="Та же тихая сетка, но теперь с реальными cover-визуалами вместо пустых заглушек."
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {rubricArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} rubric={rubric} />
          ))}
        </div>
      </section>
    </div>
  );
}
