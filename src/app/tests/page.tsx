import type { Metadata } from "next";
import { TestCard } from "@/components/test-card";
import { diagnosticTests } from "@/lib/content";

export const metadata: Metadata = {
  title: "Тесты",
  description:
    "Практические тесты по постановке задач AI-агентам, работе с кодом, интерфейсам и релизу.",
};

export default function TestsPage() {
  return (
    <section className="page-stack pt-2">
      <header className="max-w-3xl space-y-5 pb-1 sm:space-y-6">
        <h1 className="text-balance text-[clamp(2.65rem,5.6vw,5rem)] leading-[0.92] tracking-[-0.07em] text-[var(--color-text)]">
          Тесты
        </h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
          Десять вопросов по одной рабочей теме. В конце получите разбор
          ошибок и список действий для следующего прохода.
        </p>
      </header>

      <section aria-label="Каталог тестов">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:gap-7">
          {diagnosticTests.map((test, index) => (
            <TestCard key={test.slug} test={test} index={index} />
          ))}
        </div>
      </section>
    </section>
  );
}
