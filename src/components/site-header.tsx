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
      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 gap-2 px-4 py-3 md:px-8 md:py-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex items-center justify-between lg:justify-start">
          <Link href="/" aria-label="KODO" className="group inline-flex items-center">
            {/* Use the raw PNG here to avoid the broken next/image fallback seen in the header. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logologo.png"
              alt=""
              width={1116}
              height={271}
              className="h-auto w-[58px] sm:w-[64px] md:w-[72px]"
              draggable="false"
            />
          </Link>
          <Link
            href={authItem.href}
            className={`inline-flex min-h-8 items-center font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors lg:hidden md:min-h-10 md:text-[0.72rem] md:tracking-[0.24em] ${
              authActive
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)]"
            }`}
          >
            Авторизироваться
          </Link>
        </div>
        <nav
          aria-label="Основная навигация"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-8"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-8 items-center font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors md:min-h-10 md:text-[0.72rem] md:tracking-[0.24em] ${
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
