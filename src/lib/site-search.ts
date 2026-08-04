import {
  articles,
  authorPosts,
  communityProfiles,
  diagnosticTests,
  libraryItems,
  merchItems,
  rubrics,
} from "@/lib/content";

export type SiteSearchItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  type: string;
  terms: string;
};

function searchTerms(...values: string[]) {
  return values.join(" ").toLocaleLowerCase("ru-RU").replaceAll("ё", "е");
}

export const siteSearchItems: SiteSearchItem[] = [
  {
    id: "page-articles",
    title: "Сообщество",
    summary: "Статьи, заметки авторов и обсуждения.",
    href: "/articles",
    type: "Раздел",
    terms: searchTerms("Сообщество", "Статьи", "Посты", "Авторы"),
  },
  {
    id: "page-library",
    title: "Библиотека",
    summary: "Скиллы, шаблоны, промты и открытые материалы.",
    href: "/library",
    type: "Раздел",
    terms: searchTerms("Библиотека", "Скиллы", "Шаблоны", "Промты"),
  },
  {
    id: "page-prompt-lab",
    title: "ПромтЛаб",
    summary: "Рабочее пространство для сборки промтов.",
    href: "/prompt-lab",
    type: "Раздел",
    terms: searchTerms("ПромтЛаб", "Промты", "Лаборатория"),
  },
  {
    id: "page-tests",
    title: "Тесты",
    summary: "Диагностики по агентной работе и фронтенду.",
    href: "/tests",
    type: "Раздел",
    terms: searchTerms("Тесты", "Диагностики", "Квиз"),
  },
  ...articles.map((article) => ({
    id: `article-${article.slug}`,
    title: article.title,
    summary: article.excerpt,
    href: `/articles/${article.slug}`,
    type: "Статья",
    terms: searchTerms(article.title, article.excerpt, article.deck, article.rubric),
  })),
  ...libraryItems.map((item) => ({
    id: `library-${item.slug}`,
    title: item.title,
    summary: item.summary,
    href: `/library/${item.slug}`,
    type: item.kind,
    terms: searchTerms(item.title, item.summary, item.kind, item.target, item.format),
  })),
  ...diagnosticTests.map((test) => ({
    id: `test-${test.slug}`,
    title: test.title,
    summary: test.summary,
    href: `/tests/${test.slug}`,
    type: "Тест",
    terms: searchTerms(test.title, test.summary, test.outcome, test.mode),
  })),
  ...rubrics.map((rubric) => ({
    id: `rubric-${rubric.slug}`,
    title: rubric.title,
    summary: rubric.summary,
    href: `/rubrics/${rubric.slug}`,
    type: "Рубрика",
    terms: searchTerms(rubric.title, rubric.summary, rubric.mission),
  })),
  ...authorPosts.map((post) => ({
    id: `post-${post.id}`,
    title: "Пост сообщества",
    summary: post.message,
    href: `/posts/${post.id}/comments`,
    type: "Пост",
    terms: searchTerms(post.message),
  })),
  ...communityProfiles.map((profile) => ({
    id: `profile-${profile.slug}`,
    title: profile.name,
    summary: profile.bio,
    href: profile.slug === "dennis-ritchie" ? "/profile" : `/profile/${profile.slug}`,
    type: "Профиль",
    terms: searchTerms(profile.name, profile.role, profile.bio, profile.focus.join(" ")),
  })),
  ...merchItems.map((item) => ({
    id: `merch-${item.slug}`,
    title: item.title,
    summary: item.summary,
    href: `/merch/${item.slug}`,
    type: "Мерч",
    terms: searchTerms(item.title, item.summary, item.details.map((detail) => detail.value).join(" ")),
  })),
];

export function findSiteSearchResults(query: string) {
  const words = searchTerms(query)
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return [];
  }

  return siteSearchItems
    .filter((item) => words.every((word) => item.terms.includes(word)))
    .sort((first, second) => {
      const firstTitleMatch = words.filter((word) =>
        searchTerms(first.title).includes(word),
      ).length;
      const secondTitleMatch = words.filter((word) =>
        searchTerms(second.title).includes(word),
      ).length;

      return secondTitleMatch - firstTitleMatch;
    })
    .slice(0, 6);
}
