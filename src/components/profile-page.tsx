import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CommunityProfile } from "@/lib/content";
import { AuthorPostCard } from "@/components/author-post-card";
import { ProfileActions } from "@/components/profile-actions";
import { ProfileConnections } from "@/components/profile-connections";
import {
  defaultProfileAvatarSrc,
  ProfileAvatar,
} from "@/components/profile-avatar";
import { ProfileSocialLinks } from "@/components/profile-social-links";
import { brandPalette } from "@/lib/brand";
import { getAuthorPostsByProfile } from "@/lib/content";

type ProfilePageProps = {
  profile: CommunityProfile;
  isCurrentUser?: boolean;
};

const accentMap = {
  blue: brandPalette.blue,
  green: brandPalette.green,
  yellow: brandPalette.yellow,
  pink: brandPalette.pink,
} as const;

export function ProfilePage({ profile, isCurrentUser = false }: ProfilePageProps) {
  const accent = accentMap[profile.accent];
  const posts = getAuthorPostsByProfile(profile.slug);
  const hasProfilePhoto = Boolean(profile.photoSrc);
  const portraitSrc = profile.photoSrc ?? defaultProfileAvatarSrc;

  return (
    <div className="page-stack">
      <section
        style={{ "--accent": accent } as CSSProperties}
        className="pt-2"
      >
        <div className="grid gap-8 xl:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.2fr)] xl:items-start xl:gap-14">
          <div className="relative aspect-square overflow-hidden bg-[var(--color-panel)]">
            <Image
              src={portraitSrc}
              alt={hasProfilePhoto ? `Портрет: ${profile.name}` : "Стандартный аватар KODO"}
              fill
              loading="eager"
              sizes="(min-width: 1280px) 36vw, 100vw"
              className="object-cover saturate-[0.82]"
              style={hasProfilePhoto ? { objectPosition: profile.photoPosition } : undefined}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.04),rgba(8,8,11,0.7))]" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <ProfileAvatar profile={profile} className="h-16 w-16" sizes="64px" />
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                {profile.joined}
              </span>
            </div>
          </div>

          <div className="grid content-start gap-8 xl:py-2">
            <div className="space-y-4">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                {isCurrentUser ? "profile / active" : "community / profile"}
              </p>
              <div className="space-y-3">
                <h1 className="text-balance text-[clamp(2.6rem,5.5vw,5.4rem)] leading-[0.9] tracking-[-0.075em] text-[var(--color-text)]">
                  {profile.name}
                </h1>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_12rem] 2xl:gap-10">
              <div className="space-y-7">
                <p className="max-w-3xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg md:leading-9">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {profile.focus.map((item) => (
                    <span
                      key={item}
                      className="border border-[var(--accent)]/55 bg-[var(--color-panel)] px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-text)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {!isCurrentUser ? <ProfileActions profile={profile} /> : null}

                <ProfileSocialLinks profile={profile} />
              </div>

              <dl className="grid gap-5 border-t border-[var(--color-border)] pt-5 sm:grid-cols-3 2xl:grid-cols-1 2xl:border-l 2xl:border-t-0 2xl:pl-8 2xl:pt-0">
                {[
                  ["Постов", String(posts.length).padStart(2, "0")],
                  ["Локация", profile.location],
                  ["Статус", isCurrentUser ? "в сети" : "участник"],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      {label}
                    </dt>
                    <dd className="text-sm leading-6 text-[var(--color-text)]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ProfileConnections profile={profile} />
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-7">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--accent)]">
              posts / {String(posts.length).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-balance text-[clamp(2rem,3.6vw,3.5rem)] leading-[0.95] tracking-[-0.06em] text-[var(--color-text)]">
              Заметки автора
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
            {posts.map((post) => (
              <AuthorPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <aside className="xl:pt-4">
          <div className="space-y-4 xl:sticky xl:top-28">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              маршрут
            </p>
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              Откройте заметки автора или вернитесь к общей ленте сообщества.
            </p>
            <Link
              href="/articles"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-colors hover:text-[var(--accent)] md:min-h-0"
            >
              В сообщество <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
