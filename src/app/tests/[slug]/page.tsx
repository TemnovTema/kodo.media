import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialVisual } from "@/components/editorial-visual";
import { SectionHeading } from "@/components/section-heading";
import { diagnosticTests, getTestBySlug } from "@/lib/content";
import { getTestVisualAsset } from "@/lib/visual-assets";

type TestPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return diagnosticTests.map((test) => ({
    slug: test.slug,
  }));
}

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    return {};
  }

  return {
    title: test.title,
    description: test.summary,
  };
}

export default async function TestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    notFound();
  }

  return (
    <div className="page-stack">
      <section className="page-hero grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
        <div className="space-y-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            test / {test.mode.toLowerCase()}
          </p>
          <h1 className="text-balance text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.07em] text-[var(--color-text)]">
            {test.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
            {test.summary}
          </p>
          <div className="grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-2">
            {[
              ["Длительность", test.duration],
              ["Результат", test.outcome],
              ["Режим", test.mode],
              ["Статус", "готов к запуску"],
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
          asset={getTestVisualAsset(test.slug)}
          variant="minimal"
          className="min-h-[260px] md:min-h-[340px]"
          imageClassName="object-cover object-center"
          priority
        />
      </section>

      <section className="space-y-6">
        <SectionHeading
          label="Checkpoints / flow"
          title="Что именно проверяет этот тест"
          description="Короткий проход по точкам, которые реально влияют на стиль работы с агентом."
        />
        <div className="border-y border-[var(--color-border)]">
          {test.checkpoints.map((checkpoint, index) => (
            <div
              key={checkpoint}
              className="grid gap-3 border-b border-[var(--color-border)] py-5 last:border-b-0 md:grid-cols-[90px_1fr]"
            >
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                point 0{index + 1}
              </span>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                {checkpoint}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
