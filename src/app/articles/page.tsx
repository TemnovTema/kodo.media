import type { Metadata } from "next";
import { AuthorPostCard } from "@/components/author-post-card";
import { CatalogShell } from "@/components/catalog-shell";
import { CommunityArticleShelf } from "@/components/community-article-shelf";
import { CommunityFeatureArticle } from "@/components/community-feature-article";
import { CommunityIntroGlyph } from "@/components/community-intro-glyph";
import { MerchShelf } from "@/components/merch-shelf";
import {
  articles,
  authorPosts,
  communityProfiles,
  merchItems,
  rubrics,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Сообщество",
  description:
    "Сообщество KODO MEDIA: закрепленные материалы, лента статей и посты авторов о вайб-кодинге.",
};

export default function ArticlesPage() {
  const featuredArticle = articles.find(
    (article) => article.slug === "why-vibe-coding-needs-an-editor",
  );
  const carouselArticles = articles.filter(
    (article) => article.slug !== "why-vibe-coding-needs-an-editor",
  );
  const communityStats = [
    { label: "Материалов", value: String(articles.length).padStart(2, "0") },
    { label: "В ленте", value: String(carouselArticles.length).padStart(2, "0") },
    { label: "Авторов", value: String(communityProfiles.length).padStart(2, "0") },
    { label: "Режим", value: "community" },
  ];

  if (!featuredArticle) {
    return null;
  }

  return (
    <CatalogShell
      rail="community"
      eyebrow="community / feed"
      title="Сообщество"
      description="Один закреплённый материал, лента остальных статей и короткие посты авторов."
      introVisual={<CommunityIntroGlyph />}
      stats={communityStats}
    >
      <div className="-mt-2 space-y-14">
        <CommunityFeatureArticle
          article={featuredArticle}
          rubric={rubrics.find((rubric) => rubric.slug === featuredArticle.rubric)}
        />

        <section className="space-y-6">
          <div>
            <h2 className="max-w-3xl text-balance text-[clamp(1.9rem,3.2vw,3rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
              Остальные статьи
            </h2>
          </div>

          <CommunityArticleShelf articles={carouselArticles} rubrics={rubrics} />
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="max-w-3xl text-balance text-[clamp(1.9rem,3.2vw,3rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
              Популярные посты
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
            {authorPosts.map((post) => (
              <AuthorPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="border-t border-[var(--color-border)] pt-4">
            <h2 className="max-w-3xl text-balance text-[clamp(1.9rem,3.2vw,3rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
              Мерч KODO
            </h2>
          </div>

          <MerchShelf items={merchItems} />
        </section>
      </div>
    </CatalogShell>
  );
}
