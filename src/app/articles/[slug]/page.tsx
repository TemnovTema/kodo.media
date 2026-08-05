import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCommentSection } from "@/components/content-comment-section";
import { articles, getArticleBySlug, rubrics } from "@/lib/content";
import { getArticleVisualAsset } from "@/lib/visual-assets";

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
  const articleVisual = getArticleVisualAsset(article.slug);
  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const nextArticle = articles[(articleIndex + 1) % articles.length];

  return (
    <div className="flex flex-col gap-14 pb-8 sm:gap-20 md:pb-14">
      <article id="article-top" className="mx-auto w-full max-w-6xl">
        <header className="mx-auto max-w-5xl pt-2 sm:pt-5">
          <nav
            aria-label="Навигация по статье"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
          >
            <Link href="/articles" className="transition-colors hover:text-[var(--color-text)]">
              Статьи
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/rubrics/${article.rubric}`}
              className="transition-colors hover:text-[var(--color-text)]"
            >
              {rubric?.title ?? article.rubric}
            </Link>
          </nav>

          <div className="mt-10 sm:mt-14">
            <h1 className="max-w-[15ch] text-balance text-[clamp(2.7rem,5.8vw,5.9rem)] leading-[0.9] tracking-[-0.075em] text-[var(--color-text)]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-[clamp(1.15rem,2.1vw,1.65rem)] leading-[1.45] text-[var(--color-text-soft)]">
              {article.deck}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              <span>{article.publishedAt}</span>
              <span className="h-1 w-1 bg-[var(--color-brand-blue)]" aria-hidden="true" />
              <span>{article.readingTime}</span>
              <span className="h-1 w-1 bg-[var(--color-brand-pink)]" aria-hidden="true" />
              <span>{article.format}</span>
            </div>
          </div>
        </header>

        <figure className="relative mt-10 aspect-[16/9] overflow-hidden bg-[var(--color-surface)] sm:mt-14">
          <Image
            src={articleVisual.src.split("?")[0]}
            alt={articleVisual.alt}
            fill
            priority
            sizes="(min-width: 1280px) 72rem, 100vw"
            className="object-cover"
          />
        </figure>

        <div className="mx-auto mt-14 max-w-6xl space-y-16 sm:mt-20 sm:space-y-24">
          {article.sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-7 sm:gap-10 md:grid-cols-[minmax(13rem,0.76fr)_minmax(0,1fr)] md:gap-14 lg:gap-20"
            >
              <h2 className="max-w-[11ch] text-balance text-[clamp(2rem,3.15vw,3.7rem)] leading-[0.93] tracking-[-0.06em] text-[var(--color-brand-yellow)]">
                {section.title}
              </h2>
              <div className="max-w-[38rem] space-y-5 text-[1.05rem] leading-[1.6] text-[var(--color-text)] sm:text-[1.18rem] sm:leading-[1.55]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav
          aria-label="Продолжить чтение"
          className="mx-auto mt-14 flex max-w-3xl flex-col gap-5 sm:mt-20 sm:flex-row sm:items-end sm:justify-between"
        >
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
          >
            ← К списку статей
          </Link>
          <Link
            href={`/articles/${nextArticle.slug}`}
            className="group inline-flex min-h-11 max-w-xl items-center gap-2 text-left font-mono text-[0.64rem] uppercase leading-5 tracking-[0.16em] text-[var(--color-text)] transition-colors hover:text-[var(--color-brand-blue)] sm:justify-end"
          >
            <span className="text-[var(--color-text-muted)]">Следующая статья</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </nav>
      </article>

      <div className="mx-auto w-full max-w-6xl">
        <ContentCommentSection kind="article" slug={article.slug} layout="article" />
      </div>
    </div>
  );
}
