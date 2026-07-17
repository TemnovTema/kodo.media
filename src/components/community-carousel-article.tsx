import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Article, Rubric } from "@/lib/content";
import { getRubricAccent } from "@/lib/brand";
import { getArticleVisualAsset } from "@/lib/visual-assets";
import { EngagementStats } from "@/components/engagement-stats";

type CommunityCarouselArticleProps = {
  article: Article;
  rubric?: Rubric;
};

export function CommunityCarouselArticle({
  article,
  rubric,
}: CommunityCarouselArticleProps) {
  const accent = getRubricAccent(rubric?.slug ?? article.rubric);
  const visual = getArticleVisualAsset(article.slug);

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      data-community-card
      className="community-card group flex min-w-0 snap-start flex-col gap-3 border-t border-[var(--color-border)] pt-4"
    >
      <div className="relative h-[9rem] overflow-hidden bg-[rgba(255,255,255,0.012)]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          unoptimized
          sizes="280px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.04),rgba(8,8,11,0.12)_56%,rgba(8,8,11,0.42)_100%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[var(--accent)]" aria-hidden="true" />
          {rubric?.title ?? article.rubric}
        </span>
        <span>{article.readingTime}</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-balance text-[1.32rem] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
          <Link
            href={`/articles/${article.slug}`}
            className="line-clamp-4 transition-colors hover:text-[var(--accent)]"
          >
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[0.82rem] leading-6 text-[var(--color-text-soft)]">
          {article.excerpt}
        </p>
      </div>

      <EngagementStats engagement={article.engagement} compact />

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        <span>{article.publishedAt}</span>
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--accent)]"
        >
          Читать
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
