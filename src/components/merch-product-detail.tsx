"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { MerchItem } from "@/lib/content";

type MerchProductDetailProps = {
  item: MerchItem;
};

export function MerchProductDetail({ item }: MerchProductDetailProps) {
  const [selectedOption, setSelectedOption] = useState(item.options[0]);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const gallery = [
    { src: item.imageSrc, alt: item.imageAlt },
    ...(item.gallery ?? []),
  ];

  return (
    <div className="page-stack pb-8 md:pb-14">
      <section className="grid gap-8 border-t border-[var(--color-border)] pt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] lg:gap-14 lg:pt-8">
        <div className="min-w-0">
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] md:min-h-0"
          >
            <span aria-hidden="true">←</span> К мерчу
          </Link>

          <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_5rem]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface)] sm:order-2">
              <Image
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            {gallery.length > 1 ? (
              <div className="flex gap-3 sm:order-1 sm:flex-col">
                {gallery.map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-square w-16 overflow-hidden bg-[var(--color-surface)] sm:w-full"
                  >
                    <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center lg:sticky lg:top-8 lg:self-start">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Мерч KODO
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.88] tracking-[-0.075em] text-[var(--color-text)]">
            {item.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
            {item.summary}
          </p>

          <div className="mt-8 border-t border-[var(--color-border)] pt-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {item.optionLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.options.map((option) => {
                const isSelected = option === selectedOption;

                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedOption(option)}
                    className={`min-h-11 border px-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors ${
                      isSelected
                        ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-accent-contrast)]"
                        : "border-[var(--color-border)] text-[var(--color-text-soft)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <p className="font-mono text-[1.15rem] tracking-[0.06em] text-[var(--color-text)]">
              {item.price}
            </p>
            <p className="max-w-[16rem] text-right text-xs leading-5 text-[var(--color-text-muted)]">
              Оплата подтверждается после связи с менеджером.
            </p>
          </div>

          {isOrderCreated ? (
            <div className="mt-4 border-l-2 border-[var(--color-brand-green)] bg-[var(--color-surface)] px-4 py-4 text-sm leading-6 text-[var(--color-text-soft)]" role="status">
              Заказ создан. Менеджер KODO свяжется с вами и пришлёт ссылку на оплату.
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsOrderCreated(true)}
              className="button-primary mt-4 w-full text-[0.68rem]"
            >
              Заказать и оплатить <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </section>

      <section className="grid gap-8 border-t border-[var(--color-border)] pt-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:pt-8">
        <h2 className="max-w-lg text-balance text-[clamp(2rem,3.5vw,3.4rem)] leading-[0.92] tracking-[-0.06em] text-[var(--color-text)]">
          Вещь для длинного рабочего маршрута.
        </h2>
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {item.details.map((detail) => (
            <div key={detail.label} className="border-t border-[var(--color-border)] pt-4">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {detail.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
