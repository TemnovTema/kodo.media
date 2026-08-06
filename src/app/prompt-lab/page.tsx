import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog-shell";
import { PromptLabEditor } from "@/components/prompt-lab-editor";
import { PromptLabIntroGlyph } from "@/components/prompt-lab-intro-glyph";

export const metadata: Metadata = {
  title: "ПромтЛаб",
  description:
    "Редактор постановки задачи для AI-агента: контекст, ограничения и критерии готовности.",
};

export default function PromptLabPage() {
  return (
    <CatalogShell
      eyebrow="prompt lab / build brief"
      title="ПромтЛаб"
      description="Соберите рабочий бриф для агента: что сделать, что сохранить и как проверить результат."
      introVisual={<PromptLabIntroGlyph />}
      introVisualPosition="right"
    >
      <PromptLabEditor />
    </CatalogShell>
  );
}
