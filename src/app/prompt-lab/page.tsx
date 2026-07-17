import type { Metadata } from "next";
import { PromptLabEditor } from "@/components/prompt-lab-editor";

export const metadata: Metadata = {
  title: "ПромтЛаб",
  description:
    "Минималистичный экран для сборки сильного промта: только одно поле ввода.",
};

export default function PromptLabPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-8.75rem)] max-w-[1280px] items-center py-0">
      <PromptLabEditor />
    </section>
  );
}
