import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CommunityProfile } from "@/lib/content";
import { AuthorPostCard } from "@/components/author-post-card";
import {
  defaultProfileAvatarSrc,
  ProfileAvatar,
} from "@/components/profile-avatar";
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
        className="border-t border-[var(--color-border)] pt-5"
      >
        <div className="grid gap-7 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] xl:gap-12">
          <div className="relative min-h-[22rem] overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-panel)] sm:min-h-[28rem]">
            <Image
              src={portraitSrc}
              alt={hasProfilePhoto ? `Портрет: ${profile.name}` : "Стандартный аватар KODO"}
              fill
              priority
              sizes="(min-width: 1280px) 34vw, 100vw"
              className={
                hasProfilePhoto
                  ? "object-cover saturate-[0.82]"
                  : "object-contain p-8 saturate-[0.82]"
              }
              style={hasProfilePhoto ? { objectPosition: profile.photoPosition } : undefined}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,11,0.02),rgba(8,8,11,0.78))]" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <ProfileAvatar profile={profile} className="h-16 w-16" sizes="64px" />
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                {profile.joined}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-7 xl:py-4">
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

            <dl className="grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-3">
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
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-7">
          <div className="border-t border-[var(--color-border)] pt-4">
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
          <div className="space-y-4 border-t border-[var(--color-border)] pt-4 xl:sticky xl:top-28">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              маршрут
            </p>
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              Профили связаны с заметками в сообществе: можно перейти к автору,
              увидеть его контекст и продолжить чтение без потери нити.
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
