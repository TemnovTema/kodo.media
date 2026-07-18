import Image from "next/image";
import Link from "next/link";
import type { MerchItem } from "@/lib/content";

type MerchCardProps = {
  item: MerchItem;
};

export function MerchCard({ item }: MerchCardProps) {
  return (
    <article
      data-merch-card
      className="merch-card group flex min-w-0 snap-start flex-col gap-4"
    >
      <div className="relative h-[15.5rem] overflow-hidden bg-[rgba(255,255,255,0.015)]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-balance text-[1.28rem] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)]">
          {item.title}
        </h3>
        <p className="text-[0.88rem] leading-6 text-[var(--color-text-soft)]">
          {item.summary}
        </p>
      </div>

      <Link
        href="/signup"
        className="button-secondary mt-auto w-full text-center text-[0.64rem] tracking-[0.18em]"
      >
        Заказать
      </Link>
    </article>
  );
}
