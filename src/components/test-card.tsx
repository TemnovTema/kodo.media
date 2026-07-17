import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { DiagnosticTest } from "@/lib/content";
import { getTestAccent } from "@/lib/brand";
import { getTestVisualAsset } from "@/lib/visual-assets";

type TestCardProps = {
  test: DiagnosticTest;
};

export function TestCard({ test }: TestCardProps) {
  const accent = getTestAccent(test.slug);
  const visual = getTestVisualAsset(test.slug);

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className="group flex h-full flex-col gap-5 border-t border-[var(--color-border)] pt-5"
    >
      <div className="relative min-h-[16rem] overflow-hidden bg-[rgba(255,255,255,0.012)] sm:min-h-[18rem] lg:min-h-[19rem]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          unoptimized
          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.04),rgba(8,8,11,0.12)_56%,rgba(8,8,11,0.42)_100%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[var(--accent)]" aria-hidden="true" />
          {test.mode}
        </span>
        <span>{test.duration}</span>
      </div>

      <div className="space-y-3">
        <h3 className="max-w-2xl text-balance text-[clamp(1.7rem,2.4vw,2.45rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
          <Link
            href={`/tests/${test.slug}`}
            className="transition-colors hover:text-[var(--accent)]"
          >
            {test.title}
          </Link>
        </h3>
        <p className="max-w-2xl line-clamp-3 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
          {test.summary}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        <span>{test.outcome}</span>
        <Link
          href={`/tests/${test.slug}`}
          className="inline-flex items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--accent)]"
        >
          Открыть
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
