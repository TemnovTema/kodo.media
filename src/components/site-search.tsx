"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
} from "react";
import { findSiteSearchResults } from "@/lib/site-search";

type SiteSearchProps = {
  className?: string;
  panelClassName?: string;
};

const searchColorFrames = [
  "var(--color-brand-blue)",
  "var(--color-brand-green)",
  "var(--color-brand-yellow)",
  "var(--color-brand-pink)",
] as const;

export function SiteSearch({
  className = "",
  panelClassName = "",
}: SiteSearchProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [triggerColorFrame, setTriggerColorFrame] = useState<number | null>(null);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerColorTimerRef = useRef<number | undefined>(undefined);
  const panelId = useId();
  const results = findSiteSearchResults(deferredQuery);
  const hasQuery = deferredQuery.trim().length > 0;

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleEscape = useEffectEvent(() => {
    closeSearch();
  });

  const stopTriggerColorCycle = () => {
    if (triggerColorTimerRef.current !== undefined) {
      window.clearInterval(triggerColorTimerRef.current);
      triggerColorTimerRef.current = undefined;
    }

    setTriggerColorFrame(null);
  };

  const startTriggerColorCycle = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    stopTriggerColorCycle();
    let frame = 0;
    setTriggerColorFrame(frame);
    triggerColorTimerRef.current = window.setInterval(() => {
      frame = (frame + 1) % searchColorFrames.length;
      setTriggerColorFrame(frame);
    }, 460);
  };

  useEffect(() => {
    return () => {
      if (triggerColorTimerRef.current !== undefined) {
        window.clearInterval(triggerColorTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusInput = window.requestAnimationFrame(() => inputRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleEscape();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.cancelAnimationFrame(focusInput);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results[0]) {
      setIsOpen(false);
      setQuery("");
      router.push(results[0].href);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Поиск"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onMouseEnter={startTriggerColorCycle}
        onMouseLeave={stopTriggerColorCycle}
        onClick={() => {
          if (isOpen) {
            closeSearch();
          } else {
            setIsOpen(true);
          }
        }}
        className="inline-flex min-h-10 min-w-10 items-center justify-center text-[var(--color-text-muted)] transition-colors duration-300 ease-out"
        style={
          triggerColorFrame === null
            ? undefined
            : { color: searchColorFrames[triggerColorFrame] }
        }
      >
        <span
          aria-hidden="true"
          className="relative block h-4 w-4 before:absolute before:left-0 before:top-0 before:h-2.5 before:w-2.5 before:rounded-full before:border before:border-current after:absolute after:bottom-0.5 after:right-0 after:h-px after:w-2 after:rotate-45 after:bg-current"
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Поиск по сайту"
          className={`absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(32rem,calc(100dvh-5rem))] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-2 ${panelClassName}`}
        >
          <form onSubmit={handleSubmit} role="search" className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="relative ml-2 block h-4 w-4 shrink-0 text-[var(--color-text-muted)] before:absolute before:left-0 before:top-0 before:h-2.5 before:w-2.5 before:rounded-full before:border before:border-current after:absolute after:bottom-0.5 after:right-0 after:h-px after:w-2 after:rotate-45 after:bg-current"
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Поиск по материалам"
              placeholder="Поиск по материалам"
              autoComplete="off"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent py-3 font-mono text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
            />
            <button
              type="button"
              onClick={closeSearch}
              className="inline-flex min-h-10 min-w-10 items-center justify-center font-mono text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              aria-label="Закрыть поиск"
            >
              ×
            </button>
          </form>

          {hasQuery ? (
            <div className="mt-1 space-y-1">
              {results.length > 0 ? (
                results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="block px-3 py-3 transition-colors hover:bg-[var(--color-panel)]"
                  >
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      {result.type}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-[var(--color-text)]">
                      {result.title}
                    </span>
                    <span className="mt-1 block overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-5 text-[var(--color-text-soft)]">
                      {result.summary}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="px-3 py-4 text-sm text-[var(--color-text-soft)]">
                  Ничего не найдено.
                </p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
