import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 border-t border-[var(--color-border)] bg-[var(--color-panel-strong)]/80">
      <div className="mx-auto grid w-full max-w-[1560px] gap-8 px-4 py-8 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="brand-badge" aria-hidden="true" />
            <div className="flex items-end gap-3">
              <span className="font-display text-[1.4rem] uppercase tracking-[0.14em] text-[var(--color-text)]">
                KODO
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                media / online smi about vibe coding
              </span>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
            Онлайн-СМИ про агентную сборку продуктов, промты, диагностики и
            рабочие паттерны. Язык сайта теперь опирается на реальную
            айдентику KODO, а не на абстрактную dark-tech атмосферу.
          </p>
        </div>
        <div className="grid gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          <Link href="/articles" className="hover:text-[var(--color-text)]">
            Архив статей
          </Link>
          <Link href="/prompt-lab" className="hover:text-[var(--color-text)]">
            Лаборатория промта
          </Link>
          <Link href="/tests" className="hover:text-[var(--color-text)]">
            Диагностики
          </Link>
          <Link href="/privacy" className="hover:text-[var(--color-text)]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[var(--color-text)]">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
