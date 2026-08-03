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
    <header className="relative z-20 bg-[var(--color-bg)] pt-2 md:pt-4">
      <div
        className={`site-frame flex min-h-16 items-center justify-between py-2 md:hidden ${
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
            className="h-auto w-[4.7rem]"
            draggable="false"
          />
        </Link>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center bg-[rgba(17,21,31,0.62)] px-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors hover:bg-[rgba(96,135,194,0.2)]"
        >
          <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
          <span className="sr-only">{isMenuOpen ? "Закрыть" : "Меню"}</span>
        </button>
      </div>

      <div className="site-frame hidden grid-cols-[clamp(11rem,18vw,17.5rem)_minmax(0,1fr)_auto] items-center gap-4 md:grid">
        <Link
          href="/"
          aria-label="KODO"
          className="group relative z-10 inline-flex min-h-16 items-center lg:min-h-[4.25rem]"
        >
          {/* Use the raw PNG here to avoid the broken next/image fallback seen in the header. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logologo.png"
            alt=""
            width={1116}
            height={271}
            className="h-auto w-[10.5rem] transition-transform duration-200 group-hover:translate-x-0.5 lg:w-[15.5rem]"
            draggable="false"
          />
        </Link>

        <nav
          aria-label="Основная навигация"
          className="grid min-w-0 grid-cols-4 gap-2"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`group relative flex min-h-14 min-w-0 items-center justify-center gap-1.5 bg-[rgba(96,135,194,0.3)] px-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] shadow-[0_10px_28px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-colors lg:min-h-[4.25rem] lg:px-2 lg:text-[0.78rem] lg:tracking-[0.12em] ${
                  active
                    ? "bg-[rgba(96,135,194,0.48)] text-[#f7f5ed]"
                    : "text-[rgba(238,246,241,0.82)] hover:bg-[rgba(96,135,194,0.44)] hover:text-[#ffffff]"
                }`}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full border transition-colors ${
                      active
                        ? "border-[#f7f5ed] bg-[#f7f5ed]"
                        : "border-current"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <Link
          href={accountItem.href}
          aria-label={accountItem.label}
          className={`inline-flex min-h-14 items-center justify-center bg-[#050608] px-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-colors lg:min-h-[4.25rem] lg:px-4 lg:text-[0.78rem] lg:tracking-[0.16em] ${
            accountActive
              ? "bg-[var(--color-text)] text-[var(--color-accent-contrast)]"
              : "text-[#f7f5ed] hover:bg-[rgba(5,25,30,0.78)]"
          }`}
        >
          <span>{isAuthenticated ? "Профиль" : "Войти"}</span>
        </Link>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильная навигация"
          className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col bg-[var(--color-bg)] md:hidden"
        >
          <div className="site-frame flex min-h-16 items-center justify-between py-2">
            <Link href="/" aria-label="KODO" className="group inline-flex items-center" onClick={() => setIsMenuOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logologo.png"
                alt=""
                width={1116}
                height={271}
                className="h-auto w-[4.7rem]"
                draggable="false"
              />
            </Link>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center bg-[rgba(17,21,31,0.62)] px-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors hover:bg-[rgba(96,135,194,0.2)]"
            >
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
              <span className="sr-only">Закрыть</span>
            </button>
          </div>

          <div className="site-frame flex flex-1 flex-col justify-between pb-6 pt-8">
            <nav aria-label="Мобильная навигация" className="grid gap-1.5">
              {navItems.map((item, index) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`group flex min-h-20 items-center justify-between px-3 py-3 transition-colors ${
                      active
                        ? "bg-[rgba(96,135,194,0.13)] text-[var(--color-text)]"
                        : "text-[var(--color-text-soft)] hover:bg-[var(--color-panel-strong)] hover:text-[var(--color-text)]"
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
