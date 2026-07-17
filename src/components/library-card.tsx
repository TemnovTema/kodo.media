import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { LibraryItem } from "@/lib/content";
import { getLibraryAccent } from "@/lib/brand";
import { getLibraryVisualAsset } from "@/lib/visual-assets";

type LibraryCardProps = {
  item: LibraryItem;
  featured?: boolean;
};

export function LibraryCard({ item, featured = false }: LibraryCardProps) {
  const accent = getLibraryAccent(item.kind);
  const visual = getLibraryVisualAsset(item.slug);

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className={`group ${
        featured
          ? "grid gap-6 border-t border-[var(--color-border)] pt-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:items-end"
          : "flex h-full flex-col gap-5 border-t border-[var(--color-border)] pt-5"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[rgba(255,255,255,0.012)] ${
          featured ? "min-h-[20rem] xl:min-h-full" : "min-h-[16rem] sm:min-h-[18rem] lg:min-h-[19rem]"
        }`}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          unoptimized
          sizes={
            featured
              ? "(min-width: 1280px) 48vw, 100vw"
              : "(min-width: 1280px) 44vw, (min-width: 1024px) 46vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.04),rgba(8,8,11,0.12)_56%,rgba(8,8,11,0.42)_100%)]" />
      </div>

      <div className="flex min-h-full flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[var(--accent)]" aria-hidden="true" />
            {item.kind}
          </span>
          <span>{item.target}</span>
        </div>

        <div className="space-y-3">
          <h3 className="max-w-2xl text-balance text-[clamp(1.7rem,2.6vw,2.55rem)] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
            <Link
              href={`/library/${item.slug}`}
              className="transition-colors hover:text-[var(--accent)]"
            >
              {item.title}
            </Link>
          </h3>

          <p className="max-w-2xl line-clamp-3 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
            {item.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span>{item.format}</span>
          <Link
            href={`/library/${item.slug}`}
            className="inline-flex items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--accent)]"
          >
            Открыть
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
