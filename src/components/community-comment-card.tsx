import Link from "next/link";
import type { CommunityComment } from "@/lib/content";
import {
  currentProfileSlug,
  getCommunityProfileBySlug,
} from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

type CommunityCommentCardProps = {
  comment: CommunityComment;
};

export function CommunityCommentCard({ comment }: CommunityCommentCardProps) {
  const profile = getCommunityProfileBySlug(comment.authorSlug);

  if (!profile) {
    return null;
  }

  const profileHref =
    profile.slug === currentProfileSlug ? "/profile" : `/profile/${profile.slug}`;

  return (
    <article className="grid gap-4 py-2 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-5">
      <Link
        href={profileHref}
        aria-label={`Открыть профиль: ${profile.name}`}
        className="w-fit transition-transform duration-200 hover:-translate-y-0.5"
      >
        <ProfileAvatar profile={profile} className="h-12 w-12" sizes="48px" />
      </Link>

      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <div>
            <Link
              href={profileHref}
              className="text-sm leading-6 text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] md:text-base"
            >
              {profile.name}
            </Link>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {profile.role}
            </p>
          </div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {comment.postedAt}
          </span>
        </div>

        <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base md:leading-8">
          {comment.message}
        </p>

        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {comment.likes} отметок
        </p>
      </div>
    </article>
  );
}
