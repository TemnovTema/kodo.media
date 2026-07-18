import type { Metadata } from "next";
import { AuthorPostCard } from "@/components/author-post-card";
import { CatalogShell } from "@/components/catalog-shell";
import { CommunityArticleShelf } from "@/components/community-article-shelf";
import { CommunityFeatureArticle } from "@/components/community-feature-article";
import { CommunityIntroGlyph } from "@/components/community-intro-glyph";
import { MerchShelf } from "@/components/merch-shelf";
import { articles, authorPosts, merchItems, rubrics } from "@/lib/content";

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
    >
      <div className="-mt-2 space-y-14">
        <CommunityFeatureArticle
          article={featuredArticle}
          rubric={rubrics.find((rubric) => rubric.slug === featuredArticle.rubric)}
        />

        <section>
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

        <section>
          <MerchShelf items={merchItems} />
        </section>
      </div>
    </CatalogShell>
  );
}
