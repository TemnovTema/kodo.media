"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { CommunityMemberCounter } from "@/components/community-member-counter";
import { SymbolSphereHero } from "@/components/symbol-sphere-hero";
import {
  demoSessionEvent,
  demoSessionStorageKey,
} from "@/lib/demo-session";
import { articles, rubrics } from "@/lib/content";

const routes = [
  {
    href: "/articles",
    index: "01",
    title: "Сообщество",
    description: "Заметки, статьи и голоса людей, которые собирают продукты вместе с агентами.",
    color: "var(--color-brand-yellow)",
  },
  {
    href: "/library",
    index: "02",
    title: "Библиотека",
    description: "Шаблоны, вводные для ИИ, открытые курсы и рабочие ориентиры.",
    color: "var(--color-brand-blue)",
  },
  {
    href: "/prompt-lab",
    index: "03",
    title: "ПромтЛаб",
    description: "Место, чтобы собрать постановку задачи и проверить её до запуска.",
    color: "var(--color-brand-pink)",
  },
  {
    href: "/tests",
    index: "04",
    title: "Тесты",
    description: "Короткие диагностики для процесса, команды и следующего шага.",
    color: "var(--color-brand-green)",
  },
] as const;

const benefits = [
  {
    title: "Контекст не теряется",
    description: "Материалы, профили и обсуждения связаны между собой, а не живут отдельными вкладками.",
  },
  {
    title: "Меньше случайных решений",
    description: "ПромтЛаб и тесты помогают увидеть слабое место до того, как оно попадёт в интерфейс.",
  },
  {
    title: "Есть к кому вернуться",
    description: "В сообществе остаются авторы, их заметки и разговор вокруг конкретной работы.",
  },
] as const;

const homeArticles = articles.slice(0, 3);

export function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      setIsAuthenticated(
        window.localStorage.getItem(demoSessionStorageKey) === "active",
      );
    };

    syncSession();
    window.addEventListener(demoSessionEvent, syncSession);

    return () => window.removeEventListener(demoSessionEvent, syncSession);
  }, []);

  const headline = isAuthenticated
    ? "Ваш маршрут в KODO уже собран."
    : "KODO — среда для агентной сборки.";
  const description = isAuthenticated
    ? "Сообщество, библиотека, промты и диагностики остаются в одном рабочем контексте."
    : "Контекст, промты, тесты и живые заметки собираются в один маршрут, а не расходятся по вкладкам.";

  return (
    <div className="page-stack pb-8 md:pb-14">
      <section className="grid items-center gap-8 py-6 md:min-h-[calc(100dvh-8rem)] md:py-3 lg:grid-cols-[minmax(0,0.84fr)_minmax(24rem,1.16fr)] lg:gap-12 lg:py-6">
        <div className="order-2 space-y-6 lg:order-1 lg:pb-4">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            KODO MEDIA
          </p>
          <h1 className="max-w-3xl text-balance text-[clamp(3rem,5.4vw,5.7rem)] leading-[0.88] tracking-[-0.075em] text-[var(--color-text)]">
            {headline}
          </h1>
          <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            {description}
          </p>
          <div className="flex flex-col gap-3 pt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] sm:flex-row">
            {isAuthenticated ? (
              <>
                <Link href="/articles" className="button-primary w-full sm:w-auto">
                  Открыть сообщество
                </Link>
                <Link href="/profile" className="button-secondary w-full sm:w-auto">
                  Мой профиль
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="button-primary w-full sm:w-auto">
                  Создать аккаунт
                </Link>
                <a href="#routes" className="button-secondary w-full sm:w-auto">
                  Смотреть разделы
                </a>
              </>
            )}
          </div>
        </div>

        <div className="order-1 min-w-0 lg:order-2 lg:translate-x-[clamp(0rem,3vw,3rem)]">
          <SymbolSphereHero
            showOverlay={false}
            className="mx-auto aspect-square w-full max-w-[280px] sm:max-w-[430px] sm:min-h-[330px] lg:ml-auto lg:max-w-[650px] lg:min-h-[480px]"
          />
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.28fr)] xl:gap-12">
        <CommunityMemberCounter />

        <div className="flex min-w-0 flex-col justify-between gap-10 py-2 sm:py-5">
          <h2 className="max-w-2xl text-balance text-[clamp(2.2rem,4vw,4rem)] leading-[0.9] tracking-[-0.065em] text-[var(--color-text)]">
            Не витрина про ИИ, а среда, в которой работа становится видимой.
          </h2>
          <ul className="grid gap-x-7 gap-y-7 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <li key={benefit.title} className="pt-1">
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg leading-tight text-[var(--color-text)]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-8" aria-labelledby="home-reading">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-brand-pink)]">
              reading now
            </p>
            <h2
              id="home-reading"
              className="mt-3 text-balance text-[clamp(2.2rem,4vw,4rem)] leading-[0.9] tracking-[-0.065em] text-[var(--color-text)]"
            >
              Из сообщества, в которое можно войти прямо сейчас.
            </h2>
          </div>
          <Link
            href="/articles"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-colors hover:text-[var(--color-brand-pink)] sm:min-h-0"
          >
            Все материалы
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
            >
              →
            </span>
          </Link>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-3">
          {homeArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              rubric={rubrics.find((rubric) => rubric.slug === article.rubric)}
            />
          ))}
        </div>
      </section>

      <section id="routes" className="scroll-mt-8">
        <div className="max-w-3xl">
          <h2 className="text-balance text-[clamp(2.15rem,4.2vw,4rem)] leading-[0.92] tracking-[-0.065em] text-[var(--color-text)]">
            Четыре раздела. Один рабочий маршрут.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
            Выбирайте точку входа по задаче и переходите дальше без потери контекста.
          </p>
        </div>

        <div className="mt-8 grid gap-x-8 md:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group grid min-h-48 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 py-5 transition-colors hover:bg-[rgba(255,255,255,0.018)]"
            >
              <span
                className="mt-1 h-3 w-3"
                style={{ backgroundColor: route.color }}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-[var(--color-text-muted)]">
                  {route.index}
                </span>
                <span className="mt-3 block text-[clamp(1.8rem,3.1vw,2.8rem)] leading-[0.9] tracking-[-0.055em] text-[var(--color-text)]">
                  {route.title}
                </span>
                <span className="mt-3 block max-w-md text-sm leading-6 text-[var(--color-text-soft)]">
                  {route.description}
                </span>
              </span>
              <span
                className="mt-1 font-mono text-lg text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-text)]"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
