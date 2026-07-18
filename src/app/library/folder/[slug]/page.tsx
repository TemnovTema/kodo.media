import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getLibraryAccent } from "@/lib/brand";
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

  return (
    <div className="page-stack">
      <div className="detail-rail-shell">
        <div className="detail-rail-shell__rail">
          <span className="vertical-rail-label">library</span>
        </div>

        <div className="max-w-4xl space-y-8">
          <header className="page-hero space-y-5 border-b border-[var(--color-border)] pb-10">
            <div className="space-y-5">
              <Link
                href="/library"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <span aria-hidden="true">←</span>
                В библиотеку
              </Link>
              <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
                {folder.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
                {folder.summary}
              </p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {String(resources.length).padStart(2, "0")} ресурсов
              </p>
            </div>
          </header>

          <section className="space-y-4">
            {resources.map((resource, index) => {
              const accent = getLibraryAccent(resource.kind);

              return (
                <Link
                  key={resource.slug}
                  href={`/library/${resource.slug}`}
                  style={{ "--resource-accent": accent } as CSSProperties}
                  className="group grid gap-5 rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-panel)] p-4 transition-colors hover:bg-[var(--color-panel-strong)] sm:grid-cols-[12rem_minmax(0,1fr)] sm:p-5 lg:grid-cols-[14rem_minmax(0,1fr)_auto] lg:gap-8 lg:p-7"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 sm:aspect-auto sm:min-h-full">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      KODO / {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 top-12 border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-3">
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 top-0 w-1 bg-[var(--resource-accent)]"
                      />
                      <span className="absolute right-3 top-3 h-3 w-3 border border-[var(--resource-accent)]" />
                      <div className="flex h-full flex-col justify-end gap-2 pl-2">
                        <span className="h-px w-full bg-[var(--color-border-strong)]" />
                        <span className="h-px w-4/5 bg-[var(--color-border)]" />
                        <span className="h-px w-3/5 bg-[var(--color-border)]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      {resource.kind}
                    </p>
                    <h2 className="mt-3 text-balance text-[clamp(1.7rem,3vw,2.65rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-text)]">
                      {resource.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                      {resource.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="border border-[var(--color-border)] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        {resource.format}
                      </span>
                      <span className="border border-[var(--color-border)] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        {resource.target}
                      </span>
                    </div>
                  </div>

                  <span className="hidden self-start font-mono text-[0.9rem] text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-text)] lg:block">
                    →
                  </span>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
