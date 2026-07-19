"use client";

import { useEffect, useRef, useState } from "react";

const initialCount = 1260;
const launchCount = 1284;

function formatMemberCount(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function CommunityMemberCounter() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [members, setMembers] = useState(initialCount);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let revealTimer: number | undefined;
    let liveTimer: number | undefined;

    const beginCount = () => {
      let currentCount = initialCount;

      revealTimer = window.setInterval(() => {
        currentCount = Math.min(currentCount + 3, launchCount);
        setMembers(currentCount);

        if (currentCount === launchCount && revealTimer) {
          window.clearInterval(revealTimer);
          liveTimer = window.setInterval(() => {
            setMembers((current) => current + 1);
          }, 5000);
        }
      }, 180);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        beginCount();
      },
      { threshold: 0.35 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (revealTimer) {
        window.clearInterval(revealTimer);
      }
      if (liveTimer) {
        window.clearInterval(liveTimer);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[19rem] flex-col justify-between overflow-hidden bg-[var(--color-surface)] p-6 sm:min-h-[22rem] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          KODO / live network
        </p>
        <span className="inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
          <span className="h-2 w-2 bg-[var(--color-brand-green)]" aria-hidden="true" />
          сейчас
        </span>
      </div>

      <div className="relative z-10">
        <output
          aria-live="polite"
          className="block text-[clamp(4.4rem,10vw,8.2rem)] leading-[0.78] tracking-[-0.09em] text-[var(--color-text)]"
        >
          {formatMemberCount(members)}
        </output>
        <p className="mt-5 max-w-sm text-base leading-7 text-[var(--color-text-soft)] md:text-lg md:leading-8">
          участников уже собирают, обсуждают и проверяют работу в KODO.
        </p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <span className="brand-swatch-bar" aria-hidden="true" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          +42 за неделю
        </span>
      </div>
    </div>
  );
}
