import Link from "next/link";
import {
  currentProfileSlug,
  getProfileConnections,
  type CommunityProfile,
} from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

type ConnectionKind = "followers" | "following";

type ProfileConnectionsProps = {
  profile: CommunityProfile;
};

const labels: Record<ConnectionKind, string> = {
  followers: "Подписчики",
  following: "Подписки",
};

export function ProfileConnections({ profile }: ProfileConnectionsProps) {
  return (
    <section className="grid gap-2 sm:grid-cols-2" aria-label={`Связи профиля: ${profile.name}`}>
      {(["followers", "following"] as const).map((kind) => {
        const connections = getProfileConnections(profile, kind);
        const count = kind === "followers" ? profile.followersCount : profile.followingCount;

        return (
          <details
            key={kind}
            className="group border border-[var(--color-border)] bg-[var(--color-panel)] open:border-[var(--accent)]/60"
          >
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-4 [&::-webkit-details-marker]:hidden">
              <span className="space-y-1">
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                  {labels[kind]}
                </span>
                <span className="block text-lg leading-none text-[var(--color-text)]">{count}</span>
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-base text-[var(--accent)] transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>

            <div className="border-t border-[var(--color-border)] px-4 py-1">
              {connections.map((connection) => {
                const href =
                  connection.slug === currentProfileSlug
                    ? "/profile"
                    : `/profile/${connection.slug}`;

                return (
                  <Link
                    key={connection.slug}
                    href={href}
                    className="group/connection flex min-h-14 items-center gap-3 border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <ProfileAvatar
                      profile={connection}
                      className="h-8 w-8"
                      sizes="32px"
                    />
                    <span className="min-w-0 truncate text-sm text-[var(--color-text-soft)] transition-colors group-hover/connection:text-[var(--color-text)]">
                      {connection.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto font-mono text-[0.72rem] text-[var(--color-text-muted)] transition-transform duration-200 group-hover/connection:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </section>
  );
}
