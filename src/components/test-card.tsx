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
      className="group panel panel-hover flex h-full flex-col gap-6"
    >
      <div className="relative min-h-[11rem] overflow-hidden border border-[var(--color-border)] bg-[var(--color-panel)]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.08),rgba(8,8,11,0.18)_58%,rgba(8,8,11,0.48)_100%)]" />
        <div className="absolute right-4 top-4 h-[2px] w-8 bg-[var(--accent)]" aria-hidden="true" />
      </div>

      <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        <span>{test.mode}</span>
        <span>{test.duration}</span>
      </div>

      <div className="space-y-3">
        <h3 className="text-balance text-[clamp(1.55rem,2.2vw,2.2rem)] leading-[1] tracking-[-0.05em] text-[var(--color-text)]">
          <Link
            href={`/tests/${test.slug}`}
            className="transition-colors hover:text-[var(--accent)]"
          >
            {test.title}
          </Link>
        </h3>
        <p className="line-clamp-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
          {test.summary}
        </p>
      </div>

      <ul className="space-y-2 border-t border-[var(--color-border)] pt-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        {test.checkpoints.slice(0, 2).map((checkpoint) => (
          <li key={checkpoint} className="flex items-start gap-2">
            <span className="mt-1 text-[var(--accent)]">•</span>
            <span>{checkpoint}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2 font-mono text-[0.68rem] uppercase tracking-[0.2em]">
        <span className="text-[var(--color-text-muted)]">{test.outcome}</span>
        <Link
          href={`/tests/${test.slug}`}
          className="text-[var(--color-text)] transition-colors hover:text-[var(--accent)]"
        >
          Открыть
        </Link>
      </div>
    </article>
  );
}
