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
      className="group block h-full rounded-[1.2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-text)]"
    >
      <article
        style={
          {
            "--accent": accent,
            "--accent-soft": `${accent}22`,
            "--accent-surface": `${accent}14`,
          } as CSSProperties
        }
        className="relative flex h-full flex-col pt-4 transition-transform duration-300 ease-out group-hover:-translate-y-1"
      >
        <div className="pointer-events-none absolute inset-x-5 bottom-0 top-[4.5rem] rounded-[1.1rem] bg-[var(--accent-surface)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative inline-flex min-h-[3.8rem] max-w-[18rem] items-end rounded-t-[1rem] border border-[var(--color-border-strong)] border-b-0 bg-[var(--accent-soft)] px-5 py-3">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text)]">
            {folder.kicker}
          </span>
        </div>

        <div className="relative -mt-px flex flex-1 flex-col overflow-hidden rounded-[1.2rem] rounded-tl-[0.4rem] border border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.018)] px-5 py-6 sm:px-6 sm:py-7">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-[var(--accent-surface)] blur-3xl" />
          <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <span className="h-2.5 w-2.5 bg-[var(--accent)]" aria-hidden="true" />
            {folder.count}
          </div>

          <div className="relative flex h-full min-h-[23rem] flex-col gap-5">
            <div className="space-y-4">
              <h2 className="max-w-[14ch] text-balance text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95] tracking-[-0.06em] text-[var(--color-text)]">
                {folder.title}
              </h2>

              <p className="max-w-[34rem] text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                {folder.summary}
              </p>
            </div>

            <ul className="space-y-3 border-t border-[var(--color-border)] pt-5">
              {folder.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-[var(--color-text)] md:text-[0.98rem]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-2.5 w-2.5 flex-none bg-[var(--accent)]"
                  />
                  <span className="text-balance">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Link>
  );
}
