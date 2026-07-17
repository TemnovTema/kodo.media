import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <section className="panel space-y-5">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        legal / terms
      </p>
      <h1 className="text-4xl font-extrabold uppercase tracking-[-0.06em] text-[var(--color-text)]">
        Terms
      </h1>
      <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
        <p>
          Контент на этом сайте служит редакционным и образовательным целям.
          Тесты и лаборатория промта дают ориентиры, а не юридические или
          технические гарантии результата.
        </p>
        <p>
          Страница включена в первую итерацию как часть полноценной структуры
          медиа-продукта: даже демонстрационный каркас не должен вести
          пользователя в тупик.
        </p>
      </div>
    </section>
  );
}
