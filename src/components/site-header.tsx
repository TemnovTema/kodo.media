"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  demoSessionEvent,
  demoSessionStorageKey,
} from "@/lib/demo-session";

const navItems = [
  { href: "/articles", label: "Сообщество", mobileLabel: "Статьи" },
  { href: "/library", label: "Библиотека", mobileLabel: "Архив" },
  { href: "/prompt-lab", label: "ПромтЛаб", mobileLabel: "Промт" },
  { href: "/tests", label: "Тесты", mobileLabel: "Тесты" },
];

const authItem = { href: "/login", label: "Авторизироваться" };
const profileItem = { href: "/profile", label: "Профиль" };

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accountItem = isAuthenticated ? profileItem : authItem;
  const accountActive = isActive(pathname, accountItem.href);

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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-20 bg-[var(--color-bg)]">
      <div
        className={`site-frame flex min-h-14 items-center justify-between py-2 md:hidden ${
          isMenuOpen ? "invisible" : ""
        }`}
      >
        <Link href="/" aria-label="KODO" className="group inline-flex items-center">
          {/* Use the raw PNG here to avoid the broken next/image fallback seen in the header. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logologo.png"
            alt=""
            width={1116}
            height={271}
            className="h-auto w-14"
            draggable="false"
          />
        </Link>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--color-border)] px-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-panel-strong)]"
        >
          <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
          <span className="sr-only">{isMenuOpen ? "Закрыть" : "Меню"}</span>
        </button>
      </div>

      <div className="site-frame hidden grid-cols-1 gap-1.5 py-2 md:grid md:gap-2 md:py-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex min-h-10 items-center justify-between lg:min-h-0 lg:justify-start">
          <Link href="/" aria-label="KODO" className="group inline-flex items-center">
            {/* Use the raw PNG here to avoid the broken next/image fallback seen in the header. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logologo.png"
              alt=""
              width={1116}
              height={271}
              className="h-auto w-12 md:w-[72px]"
              draggable="false"
            />
          </Link>
          <Link
            href={accountItem.href}
            aria-label={accountItem.label}
            className={`inline-flex min-h-10 items-center bg-[var(--color-brand-yellow)] px-3 font-mono text-[0.6rem] font-medium uppercase tracking-[0.08em] text-[#17161a] transition-colors hover:bg-[var(--color-text)] lg:hidden md:bg-transparent md:px-0 md:text-[0.72rem] md:font-normal md:tracking-[0.24em] md:hover:bg-transparent ${
              accountActive
                ? "md:text-[var(--color-text)]"
                : "md:text-[var(--color-text-muted)] md:hover:text-[var(--color-text-soft)]"
            }`}
          >
            {isAuthenticated ? "Профиль" : "Вход"}
          </Link>
        </div>
        <nav
          aria-label="Основная навигация"
          className="flex w-full min-w-0 items-center justify-between whitespace-nowrap md:w-auto md:flex-none md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-2"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`inline-flex min-h-10 items-center font-mono text-[0.6rem] uppercase tracking-[0.06em] transition-colors md:text-[0.72rem] md:tracking-[0.24em] ${
                  active
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]"
                }`}
              >
                <span className="relative inline-flex items-center">
                  <span className="md:hidden">{item.mobileLabel}</span>
                  <span className="hidden md:inline">{item.label}</span>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-text)] md:-bottom-2"
                    />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex lg:justify-end">
          <Link
            href={accountItem.href}
            className={`inline-flex min-h-10 items-center font-mono text-[0.72rem] uppercase tracking-[0.24em] transition-colors ${
              accountActive
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]"
            }`}
          >
            {accountItem.label}
          </Link>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильная навигация"
          className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col bg-[var(--color-bg)] md:hidden"
        >
          <div className="site-frame flex min-h-14 items-center justify-between py-2">
            <Link href="/" aria-label="KODO" className="group inline-flex items-center" onClick={() => setIsMenuOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logologo.png"
                alt=""
                width={1116}
                height={271}
                className="h-auto w-14"
                draggable="false"
              />
            </Link>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--color-border)] px-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-panel-strong)]"
            >
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
              <span className="sr-only">Закрыть</span>
            </button>
          </div>

          <div className="site-frame flex flex-1 flex-col justify-between pb-6 pt-8">
            <nav aria-label="Мобильная навигация" className="border-t border-[var(--color-border)]">
              {navItems.map((item, index) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`group flex min-h-20 items-center justify-between border-b border-[var(--color-border)] py-3 transition-colors ${
                      active
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.6rem] tracking-[0.16em] text-[var(--color-text-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[clamp(2rem,10vw,3.4rem)] leading-none">
                        {item.label}
                      </span>
                    </span>
                    <span className="font-mono text-base transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href={accountItem.href}
              onClick={() => setIsMenuOpen(false)}
              className={`mt-8 flex min-h-14 items-center justify-between px-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                accountActive
                  ? "bg-[var(--color-text)] text-[var(--color-accent-contrast)]"
                  : "bg-[var(--color-brand-yellow)] text-[#17161a] hover:bg-[var(--color-text)]"
              }`}
            >
              {accountItem.label}
              <span className="text-base" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
