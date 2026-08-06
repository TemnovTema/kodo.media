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
        Конфиденциальность
      </h1>
      <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
        <p>
          KODO использует демонстрационные профили и не собирает
          пользовательскую аналитику. Данные из форм входа и регистрации не
          отправляются на сервер и остаются только в вашем браузере.
        </p>
        <p>
          На страницах библиотеки есть ссылки на внешние сайты. Их правила
          обработки данных действуют после перехода с KODO.
        </p>
      </div>
    </section>
  );
}
