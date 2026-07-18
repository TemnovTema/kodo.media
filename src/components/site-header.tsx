"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/articles", label: "Сообщество" },
  { href: "/library", label: "Библиотека" },
  { href: "/prompt-lab", label: "ПромтЛаб" },
  { href: "/tests", label: "Тесты" },
];

const authItem = { href: "/login", label: "Авторизироваться" };

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const authActive = isActive(pathname, authItem.href);

  return (
    <header className="relative z-20 bg-[var(--color-bg)]">
      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 gap-1 px-3 py-2.5 md:gap-2 md:px-8 md:py-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex min-h-10 items-center justify-between lg:min-h-0 lg:justify-start">
          <Link href="/" aria-label="KODO" className="group inline-flex items-center">
            {/* Use the raw PNG here to avoid the broken next/image fallback seen in the header. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logologo.png"
              alt=""
              width={1116}
              height={271}
              className="h-auto w-12 sm:w-[64px] md:w-[72px]"
              draggable="false"
            />
          </Link>
          <Link
            href={authItem.href}
            aria-label={authItem.label}
            className={`inline-flex min-h-10 items-center font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-colors lg:hidden md:text-[0.72rem] md:tracking-[0.24em] ${
              authActive
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]"
            }`}
          >
            <span className="sm:hidden">Войти</span>
            <span className="hidden sm:inline">Авторизироваться</span>
          </Link>
        </div>
        <nav
          aria-label="Основная навигация"
          className="grid grid-cols-2 border-y border-[var(--color-border)] md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-8 md:gap-y-2 md:border-0"
        >
          {navItems.map((item, index) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-10 items-center px-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors md:min-h-10 md:px-0 md:text-[0.72rem] md:tracking-[0.24em] ${
                  index % 2 === 1
                    ? "border-l border-[var(--color-border)] md:border-l-0"
                    : ""
                } ${
                  active
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]"
                }`}
              >
                <span className="relative inline-flex items-center">
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-[var(--color-text)] md:-bottom-2"
                    />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex lg:justify-end">
          <Link
            href={authItem.href}
            className={`inline-flex min-h-10 items-center font-mono text-[0.72rem] uppercase tracking-[0.24em] transition-colors ${
              authActive
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]"
            }`}
          >
            Авторизироваться
          </Link>
        </div>
      </div>
    </header>
  );
}
