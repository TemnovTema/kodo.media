import Link from "next/link";
import type { ContentCommentKind } from "@/lib/content";
import {
  currentProfileSlug,
  getCommunityProfileBySlug,
  getContentComments,
} from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

type ContentCommentSectionProps = {
  kind: ContentCommentKind;
  slug: string;
};

export function ContentCommentSection({
  kind,
  slug,
}: ContentCommentSectionProps) {
  const comments = getContentComments(kind, slug);

  return (
    <section className="border-t border-[var(--color-border)] pt-5">
      <div className="grid gap-7 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-10">
        <div className="space-y-2">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
            community / note
          </p>
          <h2 className="text-balance text-[clamp(1.8rem,3vw,2.7rem)] leading-[0.96] tracking-[-0.055em] text-[var(--color-text)]">
            Комментарий
          </h2>
        </div>

        <div>
          {comments.map((comment) => {
            const profile = getCommunityProfileBySlug(comment.authorSlug);

            if (!profile) {
              return null;
            }

            const profileHref =
              profile.slug === currentProfileSlug
                ? "/profile"
                : `/profile/${profile.slug}`;

            return (
              <article
                key={`${slug}-${profile.slug}`}
                className="grid gap-4 border-y border-[var(--color-border-strong)] py-5 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-5"
              >
                <Link
                  href={profileHref}
                  aria-label={`Открыть профиль: ${profile.name}`}
                  className="w-fit transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ProfileAvatar profile={profile} className="h-12 w-12" sizes="48px" />
                </Link>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <div>
                      <Link
                        href={profileHref}
                        className="text-sm leading-6 text-[var(--color-text)] transition-colors hover:text-[var(--color-brand-blue)] md:text-base"
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
          })}
        </div>
      </div>
    </section>
  );
}
