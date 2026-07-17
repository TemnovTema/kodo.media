import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <section className="panel space-y-5">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        legal / privacy
      </p>
      <h1 className="text-4xl font-extrabold uppercase tracking-[-0.06em] text-[var(--color-text)]">
        Privacy
      </h1>
      <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
        <p>
          Эта версия проекта использует демонстрационные данные и не собирает
          пользовательскую аналитику. Политика конфиденциальности оставлена в
          структуре сайта, чтобы контентный продукт был собран без мертвых
          юридических ссылок.
        </p>
        <p>
          При подключении реальной формы подписки, аналитики или личного
          кабинета этот раздел можно расширить без изменения общей
          информационной архитектуры.
        </p>
      </div>
    </section>
  );
}
