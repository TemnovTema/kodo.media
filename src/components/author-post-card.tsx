import type { CSSProperties } from "react";
import Link from "next/link";
import { currentProfileSlug, type AuthorPost } from "@/lib/content";
import { EngagementStats } from "@/components/engagement-stats";
import { brandPalette } from "@/lib/brand";
import { getCommunityProfileBySlug } from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

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
  const profile = getCommunityProfileBySlug(post.authorSlug);

  if (!profile) {
    return null;
  }

  const profileHref =
    profile.slug === currentProfileSlug ? "/profile" : `/profile/${profile.slug}`;

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className="flex h-full flex-col gap-5 border-t border-[var(--color-border)] pt-5"
    >
      <div className="flex items-start gap-4">
        <Link
          href={profileHref}
          aria-label={`Открыть профиль: ${profile.name}`}
          className="transition-transform duration-200 hover:-translate-y-0.5"
        >
          <ProfileAvatar profile={profile} className="h-12 w-12" sizes="48px" />
        </Link>

        <div className="space-y-1">
          <Link
            href={profileHref}
            className="text-sm leading-6 text-[var(--color-text)] transition-colors hover:text-[var(--accent)] md:text-base"
          >
            {profile.name}
          </Link>
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {profile.role} / {post.postedAt}
          </p>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
        {post.message}
      </p>

      <div className="mt-auto border-t border-[var(--color-border)] pt-4">
        <EngagementStats
          engagement={post.engagement}
          compact
          commentsHref={`/posts/${post.id}/comments`}
        />
      </div>
    </article>
  );
}
