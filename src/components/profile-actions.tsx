"use client";

import Link from "next/link";
import { useState } from "react";
import { currentProfileSlug, type CommunityProfile } from "@/lib/content";

type ProfileActionsProps = {
  profile: CommunityProfile;
};

export function ProfileActions({ profile }: ProfileActionsProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const followsCurrentProfile = profile.followerSlugs.includes(currentProfileSlug);
  const subscribeLabel = isFollowing
    ? "Вы подписаны"
    : followsCurrentProfile
      ? "Подписаться в ответ"
      : "Подписаться";

  return (
    <section className="grid gap-2 sm:grid-cols-2" aria-label={`Действия с профилем: ${profile.name}`}>
      <Link href={`/messages/${profile.slug}`} className="button-primary min-h-12 px-3 text-center text-[0.62rem]">
        Написать
      </Link>
      <button
        type="button"
        aria-pressed={isFollowing}
        onClick={() => setIsFollowing((value) => !value)}
        className={`min-h-12 border px-3 font-mono text-[0.62rem] uppercase tracking-[0.15em] transition-colors ${
          isFollowing
            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--color-accent-contrast)]"
            : "border-[var(--accent)]/70 bg-transparent text-[var(--color-text)] hover:bg-[var(--accent)]/15"
        }`}
      >
        {subscribeLabel}
      </button>
    </section>
  );
}
