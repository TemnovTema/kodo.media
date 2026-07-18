import type { CSSProperties } from "react";
import Link from "next/link";
import type { LibraryFolder } from "@/lib/content";
import { brandPalette } from "@/lib/brand";

type LibraryFolderCardProps = {
  folder: LibraryFolder;
};

const accentMap = {
  blue: brandPalette.blue,
  green: brandPalette.green,
  yellow: brandPalette.yellow,
  pink: brandPalette.pink,
} as const;

export function LibraryFolderCard({
  folder,
}: LibraryFolderCardProps) {
  const accent = accentMap[folder.accent];

  return (
    <Link
      href={`/library/folder/${folder.slug}`}
      aria-label={`Открыть папку «${folder.title}»`}
      className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-text)]"
    >
      <article
        style={
          {
            "--accent": accent,
            "--accent-soft": `${accent}22`,
            "--accent-surface": `${accent}14`,
          } as CSSProperties
        }
        className="relative flex h-full flex-col pt-3 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-active:translate-y-0"
      >
        <div className="relative inline-flex min-h-[3.5rem] max-w-[18rem] items-end rounded-t-[0.85rem] border border-[var(--color-border-strong)] border-b-0 bg-[var(--accent-soft)] px-5 py-3">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text)]">
            {folder.kicker}
          </span>
        </div>

        <div className="relative -mt-px flex flex-1 flex-col border border-[var(--color-border-strong)] bg-[var(--color-panel)] px-5 py-6 transition-colors duration-200 group-hover:bg-[var(--color-panel-strong)] sm:px-6 sm:py-7">
          <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <span className="h-2.5 w-2.5 bg-[var(--accent)]" aria-hidden="true" />
            {folder.count}
          </div>

          <div className="flex h-full min-h-[18rem] flex-col gap-5">
            <div className="space-y-4 pr-16">
              <h2 className="max-w-[14ch] text-balance text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95] tracking-[-0.06em] text-[var(--color-text)]">
                {folder.title}
              </h2>

              <p className="max-w-[34rem] text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                {folder.summary}
              </p>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 border-t border-[var(--color-border)] pt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text)]">
              Открыть папку
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 group-active:translate-x-0.5 motion-reduce:transform-none"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
