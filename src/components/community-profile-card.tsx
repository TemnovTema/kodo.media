import Link from "next/link";
import { currentProfileSlug, type CommunityProfile } from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

type CommunityProfileCardProps = {
  profile: CommunityProfile;
  postCount: number;
};

export function CommunityProfileCard({
  profile,
  postCount,
}: CommunityProfileCardProps) {
  const href = profile.slug === currentProfileSlug ? "/profile" : `/profile/${profile.slug}`;

  return (
    <Link
      href={href}
      className="group flex min-h-24 items-center gap-3 py-4 transition-colors hover:bg-[rgba(255,255,255,0.018)]"
    >
      <ProfileAvatar profile={profile} className="h-11 w-11" sizes="44px" />
      <span className="min-w-0 space-y-1">
        <span className="block truncate text-sm leading-5 text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
          {profile.name}
        </span>
        <span className="block truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
          {postCount} {postCount === 1 ? "пост" : "поста"}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="ml-auto font-mono text-[0.76rem] text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
