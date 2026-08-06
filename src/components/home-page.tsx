"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { CommunityMemberCounter } from "@/components/community-member-counter";
import { HomeRouteMap } from "@/components/home-route-map";
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
    description: "Заметки и разговоры людей, которые собирают продукты с агентами.",
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
    description: "Черновик задачи с ограничениями и проверяемым результатом.",
    color: "var(--color-brand-pink)",
  },
  {
    href: "/tests",
    index: "04",
    title: "Тесты",
    description: "Короткие проверки постановки задач, кода, интерфейсов и релиза.",
    color: "var(--color-brand-green)",
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
    ? "Ваше сообщество об ИИ и кодинге."
    : "Открытое сообщество об ИИ и кодинге.";
  const description = isAuthenticated
    ? "Читайте, обсуждайте и сохраняйте всё, что помогает собирать продукты с ИИ увереннее."
    : "Бесплатная среда для тех, кто учится, собирает и проверяет цифровые продукты с ИИ.";
  const primaryAction = isAuthenticated
    ? { href: "/articles", label: "Открыть сообщество" }
    : { href: "/signup", label: "Создать аккаунт" };

  return (
    <div className="overflow-x-clip pb-8 md:pb-14">
      <section className="relative grid min-h-[calc(100dvh-5rem)] content-end gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(25rem,0.88fr)] lg:items-end lg:gap-12 lg:py-14">
        <div className="relative z-10 order-2 max-w-5xl space-y-7 lg:order-1 lg:pb-[clamp(1rem,4vw,4rem)]">
          <h1 className="max-w-[12ch] text-pretty text-[clamp(3.25rem,5.75vw,6.75rem)] leading-[0.84] tracking-[-0.085em] text-[var(--color-text)] lg:max-w-[15ch]">
            {headline}
          </h1>
          <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            {description}
          </p>
          <div className="flex flex-col gap-3 pt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] sm:flex-row">
            <Link href={primaryAction.href} className="button-primary w-full sm:w-auto">
              {primaryAction.label}
            </Link>
            {isAuthenticated ? (
              <Link href="/profile" className="button-secondary w-full sm:w-auto">
                Мой профиль
              </Link>
            ) : (
              <a href="#route-map" className="button-secondary w-full sm:w-auto">
                Как это устроено
              </a>
            )}
          </div>
        </div>

        <div className="relative order-1 min-w-0 lg:order-2 lg:-translate-y-[clamp(0rem,2vw,2rem)] lg:translate-x-[clamp(0rem,3vw,3rem)]">
          <SymbolSphereHero
            showOverlay={false}
            className="mx-auto aspect-square w-full max-w-[340px] sm:max-w-[480px] sm:min-h-[370px] lg:ml-auto lg:max-w-[690px] lg:min-h-[540px]"
          />
        </div>

        <p className="relative z-10 order-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)] lg:col-span-2">
          Читать. Собирать. Проверять. Обсуждать.
        </p>
      </section>

      <section
        id="route-map"
        className="grid scroll-mt-8 gap-10 py-[clamp(5rem,10vw,10rem)] lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-[clamp(3rem,8vw,9rem)]"
        aria-labelledby="home-purpose"
      >
        <HomeRouteMap className="mx-auto w-full max-w-[36rem] lg:aspect-auto lg:min-h-[37rem] lg:self-stretch" />

        <div className="flex min-w-0 flex-col justify-center space-y-8 lg:py-8">
          <div className="max-w-3xl space-y-5">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
              куда вы попали
            </p>
            <h2
              id="home-purpose"
              className="max-w-[12ch] text-pretty text-[clamp(2.75rem,5vw,5.7rem)] leading-[0.86] tracking-[-0.075em] text-[var(--color-text)]"
            >
              Рабочая среда для тех, кто делает с ИИ.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
              Не витрина про искусственный интеллект, а связанный маршрут: разобраться в теме, собрать задачу, проверить решение и обсудить его с людьми, которые тоже делают продукты.
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2" aria-label="Разделы KODO">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  style={{ "--route-color": route.color } as CSSProperties}
                  className="group block min-h-28 outline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--route-color)]"
                >
                  <span className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.16em] text-[var(--route-color)]">
                    <span className="h-2 w-2 bg-[var(--route-color)]" aria-hidden="true" />
                    {route.index}
                  </span>
                  <span className="mt-3 block text-xl leading-none tracking-[-0.04em] text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--route-color)] md:text-2xl">
                    {route.title}
                  </span>
                  <span className="mt-2 block max-w-xs text-sm leading-6 text-[var(--color-text-soft)]">
                    {route.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-10 py-[clamp(3rem,7vw,7rem)] xl:grid-cols-[minmax(21rem,0.82fr)_minmax(0,1.18fr)] xl:gap-[clamp(3rem,7vw,8rem)]">
        <CommunityMemberCounter />
        <div className="flex min-w-0 flex-col justify-center gap-8 py-2 sm:py-5">
          <div className="max-w-xl space-y-5">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-[var(--color-brand-green)]">
              живая среда
            </p>
            <h2 className="max-w-[15ch] text-pretty text-[clamp(2.15rem,3.35vw,3.7rem)] leading-[0.91] tracking-[-0.065em] text-[var(--color-text)]">
              У хорошей задачи есть контекст. У сообщества есть продолжение.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            Профили, заметки, комментарии и сохранённые материалы остаются связаны между собой. Не нужно заново объяснять, откуда вы пришли и что уже проверили.
          </p>
        </div>
      </section>

      <section className="py-[clamp(4rem,9vw,9rem)]" aria-labelledby="home-reading">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-brand-pink)]">
              из сообщества
            </p>
            <h2
              id="home-reading"
              className="mt-3 text-pretty text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[0.88] tracking-[-0.07em] text-[var(--color-text)]"
            >
              Что читают и обсуждают сейчас
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

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-3">
          {homeArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              rubric={rubrics.find((rubric) => rubric.slug === article.rubric)}
            />
          ))}
        </div>
      </section>

      <section
        className="relative overflow-hidden px-6 py-10 text-[var(--color-text)] sm:px-10 sm:py-14 lg:px-[clamp(3rem,7vw,7rem)] lg:py-[clamp(4.5rem,8vw,8rem)]"
        style={{ backgroundColor: "#82507e" }}
      >
        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.58fr)] lg:items-end lg:gap-16">
          <div className="max-w-4xl space-y-6">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-[var(--color-text)]">
              ваш маршрут начинается здесь
            </p>
            <h2 className="text-pretty text-[clamp(3rem,6vw,6.8rem)] leading-[0.82] tracking-[-0.085em]">
              {isAuthenticated
                ? "Вернитесь к своему маршруту."
                : "Создайте аккаунт и работайте в контексте."}
            </h2>
          </div>
          <div className="max-w-md space-y-6">
            <p className="text-base leading-8 text-[var(--color-text)] md:text-lg">
              {isAuthenticated
                ? "Продолжайте чтение, сохраняйте материалы и держите свои задачи в одной рабочей среде."
                : "Сохраняйте материалы, проходите тесты, собирайте задачу в ПромтЛабе и возвращайтесь к своим заметкам без потери контекста."}
            </p>
            <Link
              href={isAuthenticated ? "/profile" : "/signup"}
              className="inline-flex min-h-12 items-center bg-[#17161a] px-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-transform duration-200 hover:-translate-y-1 hover:bg-[#08080b] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-text)]"
            >
              {isAuthenticated ? "Открыть профиль" : "Создать аккаунт"}
            </Link>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="absolute bottom-[-0.18em] right-[-0.06em] font-display text-[clamp(8rem,23vw,24rem)] leading-none tracking-[-0.12em] text-[rgba(243,238,232,0.07)]"
        >
          KODO
        </span>
      </section>
    </div>
  );
}
