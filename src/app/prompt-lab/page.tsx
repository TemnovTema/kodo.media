import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog-shell";
import { PromptLabEditor } from "@/components/prompt-lab-editor";
import { PromptLabIntroGlyph } from "@/components/prompt-lab-intro-glyph";

export const metadata: Metadata = {
  title: "ПромтЛаб",
  description:
    "ПромтЛаб KODO MEDIA: экран для сборки сильного промта с быстрыми сценариями, подсказками и черновиком.",
};

export default function PromptLabPage() {
  return (
    <CatalogShell
      rail="prompt lab"
      eyebrow="prompt lab / build brief"
      title="ПромтЛаб"
      description="Собери задачу до запуска: тип продукта, ограничения, визуальные запреты и формат результата."
      introVisual={<PromptLabIntroGlyph />}
      introVisualPosition="right"
      stats={[
        { label: "Режим", value: "working draft" },
        { label: "Быстрых сценариев", value: "06" },
        { label: "Вставок", value: "06" },
        { label: "Фокус", value: "clarity before run" },
      ]}
    >
      <PromptLabEditor />
    </CatalogShell>
  );
}
