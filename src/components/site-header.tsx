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

  return (
    <header className="relative z-20 bg-[var(--color-bg)]">
      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 gap-1.5 px-3 py-2 md:gap-2 md:px-8 md:py-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
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
    </header>
  );
}
