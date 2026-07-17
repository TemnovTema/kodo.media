import Link from "next/link";

export default function NotFound() {
  return (
    <section className="panel space-y-6">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        error / 404
      </p>
      <h1 className="text-balance text-[clamp(2.8rem,7vw,5.6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.08em] text-[var(--color-text)]">
        Сигнал не найден.
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
        Маршрут не существует или уже был перемещен в другой блок редакционной
        системы.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em]">
        <Link href="/" className="button-primary">
          На главную
        </Link>
        <Link href="/articles" className="button-secondary">
          Перейти в архив
        </Link>
      </div>
    </section>
  );
}
