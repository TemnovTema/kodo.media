import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog-shell";
import { LibraryFolderCard } from "@/components/library-folder-card";
import { LibraryIntroGlyph } from "@/components/library-intro-glyph";
import { libraryFolders } from "@/lib/content";

export const metadata: Metadata = {
  title: "Библиотека",
  description:
    "Библиотека KODO MEDIA: открытые папки со skills, шаблонами, гайдами и системными заготовками для вайб-кодинга.",
};

export default function LibraryPage() {
  return (
    <CatalogShell
      eyebrow="библиотека / открытые папки"
      title="Библиотека"
      description="Ресурсы для работы с агентами: skills, шаблоны, внешние каталоги и системные материалы."
      introVisual={<LibraryIntroGlyph />}
      introVisualPosition="right"
    >
      <div className="-mt-2 grid gap-8 xl:gap-10 lg:grid-cols-2">
        {libraryFolders.map((folder) => (
          <LibraryFolderCard key={folder.slug} folder={folder} />
        ))}
      </div>
    </CatalogShell>
  );
}
