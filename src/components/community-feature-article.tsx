import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Article, Rubric } from "@/lib/content";
import { getRubricAccent } from "@/lib/brand";
import { getArticleVisualAsset } from "@/lib/visual-assets";
import { EngagementStats } from "@/components/engagement-stats";

type CommunityFeatureArticleProps = {
  article: Article;
  rubric?: Rubric;
};

export function CommunityFeatureArticle({
  article,
  rubric,
}: CommunityFeatureArticleProps) {
  const accent = getRubricAccent(rubric?.slug ?? article.rubric);
  const visual = getArticleVisualAsset(article.slug);

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:items-end"
    >
      <div className="relative min-h-[17rem] overflow-hidden bg-[rgba(255,255,255,0.012)] sm:min-h-[21rem] xl:min-h-full">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          unoptimized
          priority
          sizes="(min-width: 1280px) 48vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.04),rgba(8,8,11,0.12)_56%,rgba(8,8,11,0.42)_100%)]" />
      </div>

      <div className="flex min-h-full flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-2 text-[var(--color-text)]">
            <span className="h-px w-4 bg-[var(--accent)]" aria-hidden="true" />
            Закреплено
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[var(--accent)]" aria-hidden="true" />
            {rubric?.title ?? article.rubric}
          </span>
          <span>{article.format}</span>
          <span>{article.readingTime}</span>
        </div>

        <h2 className="max-w-3xl text-balance text-[clamp(2rem,3.4vw,3.3rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-text)]">
          <Link
            href={`/articles/${article.slug}`}
            className="transition-colors hover:text-[var(--accent)]"
          >
            {article.title}
          </Link>
        </h2>

        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
          {article.excerpt}
        </p>

        <div className="mt-auto space-y-4 border-t border-[var(--color-border)] pt-4">
          <EngagementStats engagement={article.engagement} />
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span>{article.publishedAt}</span>
            <Link
              href={`/articles/${article.slug}`}
              className="inline-flex min-h-11 items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--accent)] md:min-h-0"
            >
              Читать
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
