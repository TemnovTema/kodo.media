import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityCommentCard } from "@/components/community-comment-card";
import { ProfileAvatar } from "@/components/profile-avatar";
import {
  authorPosts,
  currentProfileSlug,
  getAuthorPostById,
  getCommunityCommentsByPost,
  getCommunityProfileBySlug,
} from "@/lib/content";

type CommentsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return authorPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: CommentsPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getAuthorPostById(id);

  if (!post) {
    return {};
  }

  const profile = getCommunityProfileBySlug(post.authorSlug);

  return {
    title: `Комментарии: ${profile?.name ?? "KODO"}`,
    description: "Обсуждение заметки в сообществе KODO MEDIA.",
  };
}

export default async function CommentsPage({ params }: CommentsPageProps) {
  const { id } = await params;
  const post = getAuthorPostById(id);

  if (!post) {
    notFound();
  }

  const author = getCommunityProfileBySlug(post.authorSlug);

  if (!author) {
    notFound();
  }

  const authorHref =
    author.slug === currentProfileSlug ? "/profile" : `/profile/${author.slug}`;
  const comments = getCommunityCommentsByPost(post.id);

  return (
    <div className="page-stack">
      <section className="grid gap-9 border-t border-[var(--color-border)] pt-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <Link href="/articles" className="transition-colors hover:text-[var(--color-text)]">
              Сообщество
            </Link>
            <span>/</span>
            <span>Обсуждение</span>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-brand-blue)]">
              thread / {String(comments.length).padStart(2, "0")} replies
            </p>
            <h1 className="text-balance text-[clamp(2.5rem,5.2vw,5.1rem)] leading-[0.9] tracking-[-0.075em] text-[var(--color-text)]">
              Комментарии
            </h1>
          </div>

          <article className="space-y-5 border-y border-[var(--color-border-strong)] py-6">
            <div className="flex items-center gap-4">
              <Link
                href={authorHref}
                aria-label={`Открыть профиль: ${author.name}`}
                className="transition-transform duration-200 hover:-translate-y-0.5"
              >
                <ProfileAvatar profile={author} className="h-12 w-12" sizes="48px" />
              </Link>
              <div>
                <Link
                  href={authorHref}
                  className="text-sm leading-6 text-[var(--color-text)] transition-colors hover:text-[var(--color-brand-blue)] md:text-base"
                >
                  {author.name}
                </Link>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {author.role} / {post.postedAt}
                </p>
              </div>
            </div>
            <p className="max-w-4xl text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.08] tracking-[-0.04em] text-[var(--color-text)]">
              {post.message}
            </p>
          </article>
        </div>

        <aside className="xl:pt-[7.2rem]">
          <div className="space-y-4 border-t border-[var(--color-border)] pt-4 xl:sticky xl:top-28">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              режим
            </p>
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              Пока это чтение: реплики собраны из профилей KODO, а создание
              новых комментариев подключим вместе с серверной частью.
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="border-t border-[var(--color-border)] pt-4">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-brand-blue)]">
              replies
            </p>
            <h2 className="mt-3 text-balance text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[0.96] tracking-[-0.055em] text-[var(--color-text)]">
              Реплики участников
            </h2>
          </div>

          <div className="mt-5">
            {comments.map((comment) => (
              <CommunityCommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
