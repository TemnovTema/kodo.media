"use client";

import { useEffect, useRef, useState } from "react";
import type { MerchItem } from "@/lib/content";
import { MerchCard } from "@/components/merch-card";

type MerchShelfProps = {
  items: MerchItem[];
};

export function MerchShelf({ items }: MerchShelfProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const applyLayout = () => {
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.gap || styles.columnGap || "0");
      const paddingLeft = Number.parseFloat(styles.paddingLeft || "0");
      const paddingRight = Number.parseFloat(styles.paddingRight || "0");
      const cardsPerView = window.matchMedia("(min-width: 1100px)").matches
        ? 3
        : window.matchMedia("(min-width: 700px)").matches
          ? 2
          : 1;
      const availableWidth =
        track.clientWidth - paddingLeft - paddingRight - gap * (cardsPerView - 1);
      const cardWidth = availableWidth / cardsPerView;

      track.style.setProperty("--merch-card-width", `${Math.max(cardWidth, 0)}px`);
    };

    const updateScrollState = () => {
      setCanScrollPrev(track.scrollLeft > 8);
      setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
    };

    applyLayout();
    updateScrollState();

    const handleLayout = () => {
      applyLayout();
      updateScrollState();
    };

    const resizeObserver = new ResizeObserver(handleLayout);
    resizeObserver.observe(track);

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleLayout);

    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleLayout);
    };
  }, []);

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.gap || styles.columnGap || "0");
    const card = track.querySelector<HTMLElement>("[data-merch-card]");
    const cardWidth = card?.getBoundingClientRect().width ?? track.clientWidth;
    const cardsPerStep = window.matchMedia("(min-width: 1100px)").matches
      ? 3
      : window.matchMedia("(min-width: 700px)").matches
        ? 2
        : 1;

    track.scrollBy({
      left: direction * (cardWidth + gap) * cardsPerStep,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={!canScrollPrev}
          aria-label="Прокрутить мерч назад"
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] font-mono text-[0.82rem] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--color-border)] disabled:hover:bg-transparent"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={!canScrollNext}
          aria-label="Прокрутить мерч вперёд"
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] font-mono text-[0.82rem] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--color-border)] disabled:hover:bg-transparent"
        >
          →
        </button>
      </div>

      <div ref={trackRef} className="merch-strip" aria-label="Мерч KODO">
        {items.map((item) => (
          <MerchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
