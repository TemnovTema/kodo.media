import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { articles, rubrics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Статьи",
  description:
    "Каталог материалов KODO MEDIA: разборы, полевые заметки, интервью, тест-драйвы и форензика промтов.",
};

export default function ArticlesPage() {
  return (
    <section className="-mt-4 grid gap-x-8 gap-y-12 pt-0 lg:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          rubric={rubrics.find((rubric) => rubric.slug === article.rubric)}
        />
      ))}
    </section>
  );
}
