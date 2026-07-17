import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Маршрут авторизации KODO MEDIA.",
};

export default function LoginPage() {
  return (
    <section className="panel mx-auto max-w-3xl space-y-6">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-brand-blue)]">
        account / login
      </p>
      <h1 className="text-balance text-[clamp(2.4rem,5vw,4.6rem)] uppercase leading-[0.94] tracking-[-0.08em] text-[var(--color-text)]">
        Авторизация появится вместе с личным кабинетом.
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
        Этот маршрут уже подготовлен под будущий вход в KODO MEDIA. Здесь
        появится сохранение материалов, результаты тестов и история работы с
        промтами.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em]">
        <Link href="/signup" className="button-primary">
          Создать аккаунт
        </Link>
        <Link href="/" className="button-secondary">
          На главную
        </Link>
      </div>
    </section>
  );
}
