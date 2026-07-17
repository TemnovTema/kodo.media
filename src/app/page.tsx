import Link from "next/link";
import { SymbolSphereHero } from "@/components/symbol-sphere-hero";

export default function HomePage() {
  return (
    <div className="pb-6 md:pb-10">
      <section className="flex min-h-[calc(100dvh-8.75rem)] items-start justify-center px-4 py-2 sm:px-5 sm:py-3 md:min-h-[calc(100dvh-11rem)] md:items-center md:px-8 md:py-4">
        <div className="flex w-full max-w-[360px] flex-col items-center gap-5 pt-1 sm:max-w-[430px] sm:pt-2 md:max-w-[760px] md:gap-4 md:pt-0">
          <SymbolSphereHero
            showOverlay={false}
            className="aspect-square w-full max-w-[340px] min-h-[236px] sm:max-w-[410px] sm:min-h-[300px] md:max-w-[560px] md:min-h-[420px]"
          />
          <div className="flex w-full flex-col items-stretch justify-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] sm:flex-row sm:items-center">
            <Link href="/signup" className="button-primary w-full sm:w-auto">
              Создать аккаунт
            </Link>
            <Link href="/articles" className="button-secondary w-full sm:w-auto">
              К статьям
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
