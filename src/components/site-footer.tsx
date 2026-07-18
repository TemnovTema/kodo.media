import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 border-t border-[var(--color-border)] bg-[var(--color-panel-strong)]/80">
      <div className="site-frame grid gap-8 py-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="brand-badge" aria-hidden="true" />
            <div className="flex items-end gap-3">
              <span className="font-display text-[1.4rem] uppercase tracking-[0.14em] text-[var(--color-text)]">
                KODO
              </span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:text-[0.68rem] sm:tracking-[0.28em]">
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
            Сообщество
          </Link>
          <Link href="/library" className="hover:text-[var(--color-text)]">
            Библиотека
          </Link>
          <Link href="/prompt-lab" className="hover:text-[var(--color-text)]">
            ПромтЛаб
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
