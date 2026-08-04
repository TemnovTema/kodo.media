import type { CSSProperties } from "react";
import Link from "next/link";
import { currentProfileSlug, type AuthorPost } from "@/lib/content";
import { EngagementStats } from "@/components/engagement-stats";
import { brandPalette } from "@/lib/brand";
import { getCommunityProfileBySlug } from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

type AuthorPostCardProps = {
  post: AuthorPost;
  variant?: "default" | "community";
};

const accentMap = {
  blue: brandPalette.blue,
  green: brandPalette.green,
  yellow: brandPalette.yellow,
  pink: brandPalette.pink,
} as const;

export function AuthorPostCard({
  post,
  variant = "default",
}: AuthorPostCardProps) {
  const accent = accentMap[post.accent];
  const profile = getCommunityProfileBySlug(post.authorSlug);

  if (!profile) {
    return null;
  }

  const profileHref =
    profile.slug === currentProfileSlug ? "/profile" : `/profile/${profile.slug}`;
  const isCommunityPost = variant === "community";

  return (
    <article
      style={{ "--accent": accent } as CSSProperties}
      className={
        isCommunityPost
          ? "relative flex self-start flex-col gap-4 border-l border-[var(--accent)] pl-4 md:pl-5"
          : "flex h-full flex-col gap-5"
      }
    >
      <div className={`flex items-start ${isCommunityPost ? "gap-3" : "gap-4"}`}>
        <Link
          href={profileHref}
          aria-label={`Открыть профиль: ${profile.name}`}
          className="transition-transform duration-200 hover:-translate-y-0.5"
        >
          <ProfileAvatar
            profile={profile}
            className={isCommunityPost ? "h-10 w-10" : "h-12 w-12"}
            sizes={isCommunityPost ? "40px" : "48px"}
          />
        </Link>

        <div className="space-y-1">
          <Link
            href={profileHref}
            className={`leading-6 text-[var(--color-text)] transition-colors hover:text-[var(--accent)] ${
              isCommunityPost ? "text-sm md:text-[0.95rem]" : "text-sm md:text-base"
            }`}
          >
            {profile.name}
          </Link>
          <p
            className={`font-mono uppercase text-[var(--color-text-muted)] ${
              isCommunityPost
                ? "text-[0.6rem] tracking-[0.14em]"
                : "text-[0.64rem] tracking-[0.18em]"
            }`}
          >
            {profile.role} / {post.postedAt}
          </p>
        </div>
      </div>

      <p
        className={`max-w-2xl text-[var(--color-text-soft)] ${
          isCommunityPost
            ? "text-sm leading-7 md:text-[0.95rem]"
            : "text-sm leading-7 md:text-base"
        }`}
      >
        {post.message}
      </p>

      <div
        className={
          isCommunityPost
            ? "border-t border-[var(--color-border)] pt-3"
            : "mt-auto border-t border-[var(--color-border)] pt-4"
        }
      >
        <EngagementStats
          engagement={post.engagement}
          compact
          commentsHref={`/posts/${post.id}/comments`}
        />
      </div>
    </article>
  );
}
