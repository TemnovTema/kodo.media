import Image from "next/image";
import Link from "next/link";
import { LibraryMetaTags } from "@/components/library-meta-tags";
import { getLibraryAccent } from "@/lib/brand";
import type { LibraryItem } from "@/lib/content";

type LibraryResourceCardProps = {
  resource: LibraryItem;
  priority?: boolean;
};

export function LibraryResourceCard({
  resource,
  priority = false,
}: LibraryResourceCardProps) {
  const isExternal = Boolean(resource.externalUrl);
  const accent = getLibraryAccent(resource.kind);

  return (
    <article className="group grid overflow-hidden bg-[var(--color-panel)] transition-colors duration-200 hover:bg-[var(--color-panel-strong)] md:grid-cols-2">
      <div className="relative flex min-h-[13rem] overflow-hidden bg-[var(--color-surface-soft)] p-5 sm:p-6 md:min-h-[29rem] md:p-8">
        {resource.coverSrc && resource.coverAlt ? (
          <>
            <Image
              src={resource.coverSrc}
              alt={resource.coverAlt}
              fill
              sizes="(min-width: 768px) 28rem, 100vw"
              priority={priority}
              style={{ objectPosition: resource.coverPosition }}
              className="object-cover grayscale brightness-[0.7] contrast-125 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.04),rgba(8,8,11,0.18)_45%,rgba(8,8,11,0.82)_100%)]" />
            <p className="relative mt-auto font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text)]">
              {resource.kind} / {resource.format}
            </p>
          </>
        ) : (
          <>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {resource.externalKicker ?? resource.format}
            </span>
            <span className="my-auto whitespace-pre-line text-[clamp(2.8rem,6.4vw,5.8rem)] leading-[0.8] tracking-[-0.08em] text-[var(--color-text)]">
              {resource.externalWordmark ?? resource.title}
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {resource.externalHost}
            </span>
          </>
        )}
      </div>

      <div className="flex min-h-0 flex-col p-5 sm:p-6 md:min-h-[29rem] md:p-8">
        <LibraryMetaTags
          tags={resource.tags ?? [resource.format, resource.target]}
          accent={accent}
        />
        <div className="mt-7 max-w-xl space-y-4 md:mt-8 md:space-y-5">
          <h2 className="text-balance text-[clamp(2rem,3.7vw,3.5rem)] leading-[0.94] tracking-[-0.065em] text-[var(--color-text)]">
            {resource.title}
          </h2>
          <p className="text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            {resource.summary}
          </p>
        </div>
        <div className="mt-8 font-mono text-[0.64rem] uppercase tracking-[0.16em] md:mt-auto">
          {isExternal && resource.externalUrl ? (
            <a
              href={resource.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="group/action inline-flex min-h-11 items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--color-text-soft)] md:min-h-0"
            >
              {resource.externalCta ?? "Открыть сайт"}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-out group-hover/action:-translate-y-1 group-hover/action:translate-x-1 motion-reduce:transform-none"
              >
                ↗
              </span>
            </a>
          ) : (
            <Link
              href={`/library/${resource.slug}`}
              className="group/action inline-flex min-h-11 items-center gap-2 text-[var(--color-text)] transition-colors hover:text-[var(--color-text-soft)] md:min-h-0"
            >
              Открыть материал
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-out group-hover/action:translate-x-1 group-active/action:translate-x-0.5 motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
