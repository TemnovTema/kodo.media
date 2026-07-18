"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/articles", label: "Сообщество", mobileLabel: "Статьи" },
  { href: "/library", label: "Библиотека", mobileLabel: "Архив" },
  { href: "/prompt-lab", label: "ПромтЛаб", mobileLabel: "Промт" },
  { href: "/tests", label: "Тесты", mobileLabel: "Тесты" },
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
      <div className="mx-auto flex w-full max-w-[1560px] items-center gap-1.5 px-3 py-2 md:grid md:grid-cols-1 md:gap-2 md:px-8 md:py-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex shrink-0 items-center gap-1.5 md:min-h-10 md:justify-between lg:min-h-0 lg:justify-start">
          <Link href="/" aria-label="KODO" className="group inline-flex items-center">
            {/* Use the raw PNG here to avoid the broken next/image fallback seen in the header. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logologo.png"
              alt=""
              width={1116}
              height={271}
              className="h-auto w-9 md:w-[72px]"
              draggable="false"
            />
          </Link>
          <Link
            href={authItem.href}
            aria-label={authItem.label}
            className={`inline-flex min-h-9 items-center bg-[var(--color-brand-yellow)] px-2.5 font-mono text-[0.55rem] font-medium uppercase tracking-[0.08em] text-[#17161a] transition-colors hover:bg-[var(--color-text)] lg:hidden md:min-h-10 md:bg-transparent md:px-0 md:text-[0.72rem] md:font-normal md:tracking-[0.24em] md:hover:bg-transparent ${
              authActive
                ? "md:text-[var(--color-text)]"
                : "md:text-[var(--color-text-muted)] md:hover:text-[var(--color-text-soft)]"
            }`}
          >
            Вход
          </Link>
        </div>
        <nav
          aria-label="Основная навигация"
          className="flex min-w-0 flex-1 items-center justify-between whitespace-nowrap md:flex-none md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-2"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`inline-flex min-h-9 items-center font-mono text-[0.55rem] uppercase tracking-[0.04em] transition-colors md:min-h-10 md:text-[0.72rem] md:tracking-[0.24em] ${
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
