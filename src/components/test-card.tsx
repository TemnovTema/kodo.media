import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getTestAccent } from "@/lib/brand";
import type { DiagnosticTest } from "@/lib/content";
import { getTestVisualAsset } from "@/lib/visual-assets";

type TestCardProps = {
  test: DiagnosticTest;
  index: number;
};

export function TestCard({ test, index }: TestCardProps) {
  const accent = getTestAccent(test.slug);
  const visual = getTestVisualAsset(test.slug);

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className="group flex h-full flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-panel)] transition-[border-color,background-color] duration-200 hover:border-[var(--accent)]/70 hover:bg-[var(--color-panel-strong)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[rgba(255,255,255,0.012)]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          unoptimized
          sizes="(min-width: 1280px) 45vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.03),rgba(8,8,11,0.13)_60%,rgba(8,8,11,0.52)_100%)]" />
        <span className="absolute left-4 top-4 grid h-9 min-w-9 place-items-center bg-[var(--accent)] px-2 font-mono text-[0.66rem] tracking-[0.1em] text-[#17161a] sm:left-5 sm:top-5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          {test.duration}
        </p>

        <div className="space-y-3">
          <h3 className="max-w-2xl text-balance text-[clamp(1.75rem,2.65vw,2.65rem)] leading-[0.96] tracking-[-0.055em] text-[var(--color-text)]">
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

        <div className="mt-auto space-y-5 pt-3">
          <p className="font-mono text-[0.62rem] uppercase leading-5 tracking-[0.16em] text-[var(--color-text-muted)]">
            Результат: {test.outcome}
          </p>
          <Link
            href={`/tests/${test.slug}`}
            aria-label={`Начать тест «${test.title}»`}
            className="inline-flex min-h-12 w-full items-center justify-center bg-[var(--accent)] px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#17161a] shadow-[inset_0_-4px_0_rgba(8,8,11,0.25)] transition-[transform,filter,box-shadow] duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[inset_0_-4px_0_rgba(8,8,11,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:translate-y-0 motion-reduce:transform-none"
          >
            Начать тест
          </Link>
        </div>
      </div>
    </article>
  );
}
