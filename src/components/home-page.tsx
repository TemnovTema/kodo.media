"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SymbolSphereHero } from "@/components/symbol-sphere-hero";
import {
  demoSessionEvent,
  demoSessionStorageKey,
} from "@/lib/demo-session";

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

      <section className="grid gap-8 border-t border-[var(--color-border)] pt-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:pt-8">
        <h2 className="max-w-xl text-balance text-[clamp(2rem,3.7vw,3.5rem)] leading-[0.92] tracking-[-0.06em] text-[var(--color-text)]">
          Не витрина про ИИ, а среда, в которой работа становится видимой.
        </h2>
        <ul className="grid gap-x-7 gap-y-6 sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <li key={benefit.title} className="border-t border-[var(--color-border)] pt-4">
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
              className="group grid min-h-48 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 border-t border-[var(--color-border)] py-5 transition-colors hover:border-[var(--color-border-strong)]"
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
