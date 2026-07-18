import type { Metadata } from "next";
import Link from "next/link";
import { DemoAccessForm } from "@/components/demo-access-form";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в демонстрационный профиль KODO MEDIA.",
};

export default function LoginPage() {
  return (
    <section className="grid gap-10 border-t border-[var(--color-border)] pt-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(24rem,0.72fr)] xl:items-start">
      <div className="space-y-7 py-2 xl:pt-8">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-brand-yellow)]">
          account / sign in
        </p>
        <div className="space-y-5">
          <h1 className="max-w-4xl text-balance text-[clamp(2.7rem,5.7vw,5.6rem)] leading-[0.9] tracking-[-0.075em] text-[var(--color-text)]">
            Войти в KODO
          </h1>
          <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            Сейчас это демонстрационный вход: поля не отправляются и не
            сохраняются. После входа откроется готовый профиль и появится
            доступ к его маршруту из шапки.
          </p>
        </div>

        <div className="max-w-xl border-t border-[var(--color-border)] pt-5 text-sm leading-7 text-[var(--color-text-soft)]">
          Нет аккаунта?{" "}
          <Link
            href="/signup"
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-text)] underline decoration-[var(--color-brand-yellow)] underline-offset-4 transition-colors hover:text-[var(--color-brand-yellow)]"
          >
            Создать его
          </Link>
        </div>
      </div>

      <div className="border border-[var(--color-border-strong)] bg-[var(--color-panel)] p-5 sm:p-7">
        <DemoAccessForm mode="login" />
      </div>
    </section>
  );
}
