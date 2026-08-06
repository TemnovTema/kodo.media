import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LibraryResourceCard } from "@/components/library-resource-card";
import {
  getLibraryFolderBySlug,
  getLibraryItemsBySlugs,
  libraryFolders,
} from "@/lib/content";

type LibraryFolderPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return libraryFolders.map((folder) => ({
    slug: folder.slug,
  }));
}

export async function generateMetadata({
  params,
}: LibraryFolderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const folder = getLibraryFolderBySlug(slug);

  if (!folder) {
    return {};
  }

  return {
    title: folder.title,
    description: folder.summary,
  };
}

export default async function LibraryFolderPage({
  params,
}: LibraryFolderPageProps) {
  const { slug } = await params;
  const folder = getLibraryFolderBySlug(slug);

  if (!folder) {
    notFound();
  }

  const resources = getLibraryItemsBySlugs(folder.resourceSlugs);
  const isInputStack = folder.slug === "input-stack";
  const isSingleExternalDirectory =
    resources.length === 1 && Boolean(resources[0]?.externalUrl);

  return (
    <div className="page-stack">
      <div className="detail-rail-shell">
        <div className="max-w-4xl space-y-8">
          <header className="page-hero space-y-5">
            <div className="space-y-5">
              <Link
                href="/library"
                className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1 group-active:-translate-x-0.5 motion-reduce:transform-none"
                >
                  ←
                </span>
                В библиотеку
              </Link>
              <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
                {folder.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
                {folder.summary}
              </p>
              {isInputStack ? null : (
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {folder.count}
                </p>
              )}
              {folder.sourceUrl &&
              folder.sourceLabel &&
              !isSingleExternalDirectory ? (
                <a
                  href={folder.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  Источник: {folder.sourceLabel}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </header>

          <section aria-label="Материалы папки" className="space-y-5">
            {resources.map((resource, index) => (
              <LibraryResourceCard
                key={resource.slug}
                resource={resource}
                priority={index === 0}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
