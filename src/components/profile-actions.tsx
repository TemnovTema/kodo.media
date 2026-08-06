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
      <Link href={`/messages/${profile.slug}`} className="button-primary w-full text-[0.62rem]">
        Написать
      </Link>
      <button
        type="button"
        aria-pressed={isFollowing}
        onClick={() => setIsFollowing((value) => !value)}
        className={`content-action w-full text-[0.62rem] ${
          isFollowing
            ? "content-action--accent"
            : ""
        }`}
      >
        {subscribeLabel}
        <span aria-hidden="true" className="content-action__icon">
          {isFollowing ? "✓" : "+"}
        </span>
      </button>
    </section>
  );
}
