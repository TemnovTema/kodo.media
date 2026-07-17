import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog-shell";
import { TestCard } from "@/components/test-card";
import { diagnosticTests } from "@/lib/content";

export const metadata: Metadata = {
  title: "Тесты",
  description:
    "Диагностические тесты KODO MEDIA: профиль вайб-кодера, prompt lint и рекомендации по агентному пайплайну.",
};

export default function TestsPage() {
  return (
    <CatalogShell
      rail="diagnostics"
      eyebrow="tests / route checks"
      title="Диагностики, которые работают как короткие ритуалы настройки."
      description="Тут важна не плотность интерфейса, а ясный маршрут: один крупный входной тест, затем более тихие соседние проходы без dashboard-мусора."
      stats={[
        { label: "Тестов", value: String(diagnosticTests.length).padStart(2, "0") },
        { label: "Формат", value: "short passes" },
        { label: "Выход", value: "профиль / lint / fit" },
        { label: "Режим", value: "diagnostic flow" },
      ]}
    >
      <div className="-mt-2 grid gap-x-8 gap-y-12 lg:grid-cols-2">
        {diagnosticTests.map((test, index) => (
          <div key={test.slug} className={index === 0 ? "lg:col-span-2" : ""}>
            <TestCard test={test} featured={index === 0} />
          </div>
        ))}
      </div>
    </CatalogShell>
  );
}
