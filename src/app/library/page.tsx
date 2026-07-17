import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog-shell";
import { LibraryCard } from "@/components/library-card";
import { libraryItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Библиотека",
  description:
    "Библиотека KODO MEDIA: скиллы, шаблоны, промты и гайды для более осмысленного вайб-кодинга.",
};

export default function LibraryPage() {
  return (
    <CatalogShell
      rail="library"
      eyebrow="library / useful payloads"
      title="Скиллы, шаблоны, промты и гайды как рабочий архив, а не как витрина."
      description="Композиция здесь должна вести себя спокойно: один более весомый входной объект, потом ровный каталог полезностей, где пауза между карточками так же важна, как и сами cover-сигналы."
      stats={[
        { label: "Материалов", value: String(libraryItems.length).padStart(2, "0") },
        { label: "Категорий", value: "04" },
        { label: "Контур", value: "skills / prompts" },
        { label: "Режим", value: "resource archive" },
      ]}
    >
      <div className="-mt-2 grid gap-x-8 gap-y-12 lg:grid-cols-2">
        {libraryItems.map((item, index) => (
          <div key={item.slug} className={index === 0 ? "lg:col-span-2" : ""}>
            <LibraryCard item={item} featured={index === 0} />
          </div>
        ))}
      </div>
    </CatalogShell>
  );
}
