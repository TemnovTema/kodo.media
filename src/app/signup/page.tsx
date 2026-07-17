import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Создать аккаунт",
  description: "Маршрут создания аккаунта KODO MEDIA.",
};

export default function SignUpPage() {
  return (
    <section className="panel mx-auto max-w-3xl space-y-6">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-brand-green)]">
        account / signup
      </p>
      <h1 className="text-balance text-[clamp(2.4rem,5vw,4.6rem)] uppercase leading-[0.94] tracking-[-0.08em] text-[var(--color-text)]">
        Создание аккаунта будет следующим шагом продукта.
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
        Экран регистрации пока оставлен как точка входа в будущий личный кабинет.
        Когда подключим реальную авторизацию, этот маршрут станет первым шагом
        для сохранения материалов, тестов и истории работы с промтами.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em]">
        <Link href="/articles" className="button-primary">
          Открыть сообщество
        </Link>
        <Link href="/" className="button-secondary">
          На главную
        </Link>
      </div>
    </section>
  );
}
