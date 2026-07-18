import type { CSSProperties } from "react";

type LibraryMetaTagsProps = {
  tags: string[];
  accent: string;
  className?: string;
};

export function LibraryMetaTags({
  tags,
  accent,
  className = "",
}: LibraryMetaTagsProps) {
  const visibleTags = tags.filter(Boolean);

  if (visibleTags.length === 0) {
    return null;
  }

  return (
    <div
      style={{ "--tag-accent": accent } as CSSProperties}
      className={`flex flex-wrap justify-end gap-2 ${className}`}
    >
      {visibleTags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="max-w-full border border-[var(--tag-accent)] bg-[var(--tag-accent)] px-3 py-2 text-right font-mono text-[0.62rem] uppercase leading-5 tracking-[0.16em] text-[var(--color-accent-contrast)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
