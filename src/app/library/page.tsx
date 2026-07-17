import type { Metadata } from "next";
import { LibraryCard } from "@/components/library-card";
import { libraryItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Библиотека",
  description:
    "Библиотека KODO MEDIA: скиллы, шаблоны, промты и гайды для более осмысленного вайб-кодинга.",
};

export default function LibraryPage() {
  return (
    <section className="-mt-4 grid gap-x-8 gap-y-12 pt-0 lg:grid-cols-2">
      {libraryItems.map((item) => (
        <LibraryCard key={item.slug} item={item} />
      ))}
    </section>
  );
}
