import type { CSSProperties } from "react";
import type { AuthorPost } from "@/lib/content";
import { EngagementStats } from "@/components/engagement-stats";
import { brandPalette } from "@/lib/brand";

type AuthorPostCardProps = {
  post: AuthorPost;
};

const accentMap = {
  blue: brandPalette.blue,
  green: brandPalette.green,
  yellow: brandPalette.yellow,
  pink: brandPalette.pink,
} as const;

export function AuthorPostCard({ post }: AuthorPostCardProps) {
  const accent = accentMap[post.accent];

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className="flex h-full flex-col gap-5 border-t border-[var(--color-border)] pt-5"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center border border-[var(--accent)] bg-[rgba(255,255,255,0.02)] font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-text)]">
          {post.avatarLabel}
        </div>

        <div className="space-y-1">
          <p className="text-sm leading-6 text-[var(--color-text)] md:text-base">
            {post.author}
          </p>
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {post.role} / {post.postedAt}
          </p>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
        {post.message}
      </p>

      <div className="mt-auto border-t border-[var(--color-border)] pt-4">
        <EngagementStats engagement={post.engagement} compact />
      </div>
    </article>
  );
}
