import type { Metadata } from "next";
import { EditorialVisual } from "@/components/editorial-visual";
import { SectionHeading } from "@/components/section-heading";
import { TestCard } from "@/components/test-card";
import { diagnosticTests } from "@/lib/content";
import { visualAssets } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "Тесты",
  description:
    "Диагностические тесты KODO MEDIA: профиль вайб-кодера, prompt lint и рекомендации по агентному пайплайну.",
};

export default function TestsPage() {
  return (
    <div className="page-stack">
      <section className="page-hero grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
        <div className="space-y-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            tests / diagnostics
          </p>
          <h1 className="max-w-3xl text-balance text-[clamp(2rem,4.3vw,3.8rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-text)]">
            Диагностики помогают выбрать свой рабочий режим.
          </h1>
          <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
            Три коротких маршрута: понять свой профиль, проверить промт и
            подобрать подходящий пайплайн под задачу.
          </p>
          <div className="grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-2">
            {[
              ["Тестов", "03"],
              ["Результат", "профиль и рекомендации"],
              ["Формат", "короткий проход"],
              ["Назначение", "route signal"],
            ].map(([label, value]) => (
              <div key={label} className="space-y-2">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {label}
                </p>
                <p className="text-sm leading-7 text-[var(--color-text-soft)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <EditorialVisual
          asset={visualAssets.tests}
          variant="minimal"
          className="min-h-[260px] md:min-h-[340px]"
          imageClassName="object-cover object-center"
          priority
        />
      </section>

      <section className="space-y-6">
        <SectionHeading
          label="Catalog / tests"
          title="Набор диагностик"
          description="Больше воздуха, меньше служебного шума. Каждая карточка сразу держится на визуале."
        />
        <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {diagnosticTests.map((test) => (
            <TestCard key={test.slug} test={test} />
          ))}
        </div>
      </section>
    </div>
  );
}
