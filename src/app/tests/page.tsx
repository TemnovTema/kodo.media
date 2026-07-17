import type { Metadata } from "next";
import { TestCard } from "@/components/test-card";
import { diagnosticTests } from "@/lib/content";

export const metadata: Metadata = {
  title: "Тесты",
  description:
    "Диагностические тесты KODO MEDIA: профиль вайб-кодера, prompt lint и рекомендации по агентному пайплайну.",
};

export default function TestsPage() {
  return (
    <section className="-mt-4 grid gap-x-8 gap-y-12 pt-0 lg:grid-cols-2 xl:grid-cols-3">
      {diagnosticTests.map((test) => (
        <TestCard key={test.slug} test={test} />
      ))}
    </section>
  );
}
