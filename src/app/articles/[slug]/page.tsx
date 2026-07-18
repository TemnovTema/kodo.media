import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { ContentCommentSection } from "@/components/content-comment-section";
import { EditorialVisual } from "@/components/editorial-visual";
import { SectionHeading } from "@/components/section-heading";
import { getRubricVisualAsset } from "@/lib/visual-assets";
import { getArticleBySlug, articles, rubrics } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const rubric = rubrics.find((item) => item.slug === article.rubric);
  const related = articles
    .filter((item) => item.slug !== article.slug && item.rubric === article.rubric)
    .slice(0, 2);

  return (
    <div className="page-stack">
      <div className="detail-rail-shell">
        <article className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <header className="page-hero space-y-8 border-b border-[var(--color-border)] pb-12">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                <Link href="/articles" className="hover:text-[var(--color-text)]">
                  Архив
                </Link>
                <span>/</span>
                <Link
                  href={`/rubrics/${article.rubric}`}
                  className="hover:text-[var(--color-text)]"
                >
                  {rubric?.title ?? article.rubric}
                </Link>
              </div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {article.signal}
              </p>
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.92fr)] xl:items-end">
                <div className="space-y-6">
                  <h1 className="max-w-4xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.07em] text-[var(--color-text)]">
                    {article.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
                    {article.deck}
                  </p>
                </div>

                <EditorialVisual
                  asset={getRubricVisualAsset(article.rubric)}
                  variant="minimal"
                  className="min-h-[18rem] md:min-h-[24rem]"
                  imageClassName="object-cover object-center"
                  priority
                />
              </div>

              <dl className="grid gap-5 border-t border-[var(--color-border)] pt-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Формат", article.format],
                  ["Время", article.readingTime],
                  ["Дата", article.publishedAt],
                  ["Статус", article.status],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      {label}
                    </dt>
                    <dd className="text-sm leading-7 text-[var(--color-text)] md:text-base">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </header>

            <div className="space-y-10">
              {article.sections.map((section, index) => (
                <section
                  key={section.title}
                  className="grid gap-4 border-t border-[var(--color-border)] pt-6 md:grid-cols-[90px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    part 0{index + 1}
                  </span>
                  <div className="space-y-5">
                    <h2 className="max-w-3xl text-balance text-[clamp(1.7rem,2.6vw,2.5rem)] leading-[1] tracking-[-0.05em] text-[var(--color-text)]">
                      {section.title}
                    </h2>
                    <div className="max-w-3xl space-y-5 text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="xl:pt-[8.5rem]">
            <div className="space-y-5 xl:sticky xl:top-28">
              <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  takeaway
                </p>
                <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                  {article.takeaway}
                </p>
              </div>
              <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-terminal)]">
                  status
                </p>
                <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                  {article.status}. Маршрут чтения идет из архива в рубрику и
                  дальше в лабораторию или тесты.
                </p>
              </div>
            </div>
          </aside>
        </article>
      </div>

      {related.length > 0 ? (
        <section className="space-y-6">
          <SectionHeading
            label="Related / same rubric"
            title="Еще по этой рубрике"
            description="Соседние материалы помогают продолжить чтение в том же режиме без лишнего переключения контекста."
          />
          <div className="grid gap-6 xl:grid-cols-2">
            {related.map((item) => (
              <ArticleCard
                key={item.slug}
                article={item}
                rubric={rubrics.find((rubricItem) => rubricItem.slug === item.rubric)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ContentCommentSection kind="article" slug={article.slug} />
    </div>
  );
}
