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
  layout?: "default" | "article";
};

export function ContentCommentSection({
  kind,
  slug,
  layout = "default",
}: ContentCommentSectionProps) {
  const comments = getContentComments(kind, slug);
  const usesArticleLayout = layout === "article";

  return (
    <section aria-labelledby={`comment-heading-${kind}-${slug}`}>
      <div
        className={
          usesArticleLayout
            ? "grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(11rem,0.62fr)_minmax(0,1.38fr)] lg:gap-16 xl:gap-20"
            : "grid items-start gap-8 sm:gap-10 xl:grid-cols-[minmax(11rem,0.62fr)_minmax(0,1.38fr)] xl:gap-16"
        }
      >
        <div className="min-w-0 space-y-2">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
            community / note
          </p>
          <h2
            id={`comment-heading-${kind}-${slug}`}
            className="max-w-[13rem] text-[clamp(1.75rem,2.25vw,2.35rem)] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] [overflow-wrap:anywhere]"
          >
            Комментарий
          </h2>
        </div>

        <div className="min-w-0 space-y-8">
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
                className="grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-5"
              >
                <Link
                  href={profileHref}
                  aria-label={`Открыть профиль: ${profile.name}`}
                  className="w-fit transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ProfileAvatar profile={profile} className="h-12 w-12" sizes="48px" />
                </Link>

                <div className="min-w-0 space-y-4">
                  <div className="grid min-w-0 gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div className="min-w-0">
                      <Link
                        href={profileHref}
                        className="block w-fit text-sm leading-6 text-[var(--color-text)] transition-colors hover:text-[var(--color-brand-blue)] md:text-base"
                      >
                        {profile.name}
                      </Link>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {profile.role}
                      </p>
                    </div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)] sm:pt-1 sm:text-right">
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
