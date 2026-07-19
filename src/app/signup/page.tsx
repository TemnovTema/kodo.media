import type { Metadata } from "next";
import Link from "next/link";
import { DemoAccessForm } from "@/components/demo-access-form";

export const metadata: Metadata = {
  title: "Создать аккаунт",
  description: "Создание демонстрационного доступа KODO MEDIA.",
};

export default function SignUpPage() {
  return (
    <section className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(24rem,0.72fr)] xl:items-start">
      <div className="space-y-7 py-2 xl:pt-8">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-brand-green)]">
          account / create
        </p>
        <div className="space-y-5">
          <h1 className="max-w-4xl text-balance text-[clamp(2.7rem,5.7vw,5.6rem)] leading-[0.9] tracking-[-0.075em] text-[var(--color-text)]">
            Создать аккаунт
          </h1>
          <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            Настоящую регистрацию подключим вместе с серверной частью. Пока
            форма создаёт только локальный демонстрационный доступ и переводит
            в профиль, не сохраняя введённые данные.
          </p>
        </div>

        <div className="max-w-xl pt-1 text-sm leading-7 text-[var(--color-text-soft)]">
          Уже есть аккаунт?{" "}
          <Link
            href="/login"
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-text)] underline decoration-[var(--color-brand-green)] underline-offset-4 transition-colors hover:text-[var(--color-brand-green)]"
          >
            Войти
          </Link>
        </div>
      </div>

      <div className="border border-[var(--color-border-strong)] bg-[var(--color-panel)] p-5 sm:p-7">
        <DemoAccessForm mode="signup" />
      </div>
    </section>
  );
}
