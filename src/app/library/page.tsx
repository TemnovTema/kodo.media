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
      rail="library"
      eyebrow="library / open folders"
      title="Библиотека"
      description="Открытые папки с тем, чем мы реально кормим и собираем ИИ: вводные, шаблоны, гайды и системные заготовки."
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
