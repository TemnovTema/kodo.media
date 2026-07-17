import Image from "next/image";
import type { CSSProperties } from "react";
import type { VisualAsset } from "@/lib/visual-assets";

type EditorialVisualProps = {
  asset: VisualAsset;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  variant?: "full" | "minimal";
};

export function EditorialVisual({
  asset,
  className = "",
  imageClassName = "",
  priority = false,
  variant = "full",
}: EditorialVisualProps) {
  const minimal = variant === "minimal";

  return (
    <figure
      style={{ "--accent": asset.tone } as CSSProperties}
      className={`group relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-panel)] ${className}`}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
        className={`transition-transform duration-700 ease-out group-hover:scale-[1.015] ${
          minimal ? "object-cover" : "object-contain p-4 md:p-5"
        } ${imageClassName}`}
      />
      <div
        className={`absolute inset-0 ${
          minimal
            ? "bg-[linear-gradient(180deg,rgba(8,8,11,0.06),rgba(8,8,11,0.22)_52%,rgba(8,8,11,0.72)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(24,22,27,0.03),rgba(24,22,27,0.22)_46%,rgba(24,22,27,0.76)_100%)]"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          minimal
            ? "opacity-14 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
            : "opacity-28 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        } [background-size:32px_32px]`}
      />
      {minimal ? (
        <div className="absolute right-4 top-4 z-10 h-[2px] w-12 bg-[var(--accent)] opacity-95" />
      ) : (
        <>
          <div className="absolute left-4 top-4 z-10 flex items-center gap-3 border border-[var(--color-border)] bg-[rgba(24,22,27,0.74)] px-3 py-2 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 bg-[var(--accent)]" aria-hidden="true" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text)]">
              {asset.label}
            </span>
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 z-10 grid gap-2 p-4 md:p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--accent)]">
              {asset.title}
            </p>
            <p className="max-w-lg text-sm leading-6 text-[var(--color-text-soft)]">
              {asset.description}
            </p>
          </figcaption>
        </>
      )}
    </figure>
  );
}
