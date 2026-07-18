"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { CommunityProfile, DirectMessage } from "@/lib/content";
import { ProfileAvatar } from "@/components/profile-avatar";

type MessageThreadProps = {
  currentProfile: CommunityProfile;
  participant: CommunityProfile;
  initialMessages: DirectMessage[];
};

export function MessageThread({
  currentProfile,
  participant,
  initialMessages,
}: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();

    if (!message) {
      return;
    }

    setMessages((items) => [
      ...items,
      {
        id: `local-${Date.now()}`,
        authorSlug: currentProfile.slug,
        message,
        sentAt: "сейчас",
      },
    ]);
    setDraft("");
  }

  return (
    <div className="page-stack">
      <section className="border-t border-[var(--color-border)] pt-5">
        <div className="grid gap-8 xl:grid-cols-[minmax(15rem,0.42fr)_minmax(0,1fr)] xl:gap-12">
          <aside className="space-y-5 xl:pt-2">
            <Link
              href={`/profile/${participant.slug}`}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] md:min-h-0"
            >
              <span aria-hidden="true">←</span> В профиль
            </Link>

            <div className="flex items-center gap-4 border-y border-[var(--color-border)] py-5">
              <ProfileAvatar profile={participant} className="h-14 w-14" sizes="56px" />
              <div className="min-w-0">
                <h1 className="text-balance text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.92] tracking-[-0.07em] text-[var(--color-text)]">
                  {participant.name}
                </h1>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {participant.role}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[var(--color-text-soft)]">
              Личный диалог в KODO. Сообщения остаются в этом контексте и не попадают в общую ленту.
            </p>
          </aside>

          <section className="border border-[var(--color-border-strong)] bg-[var(--color-panel)]" aria-label={`Диалог с ${participant.name}`}>
            <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4 sm:px-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                личные сообщения
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                <span className="h-1.5 w-1.5 bg-[var(--color-brand-green)]" aria-hidden="true" />
                в сети
              </span>
            </div>

            <ol className="space-y-1 px-5 py-5 sm:px-6 sm:py-6" aria-live="polite">
              {messages.map((item) => {
                const isOwn = item.authorSlug === currentProfile.slug;
                const author = isOwn ? currentProfile : participant;

                return (
                  <li
                    key={item.id}
                    className={`grid gap-3 border-b border-[var(--color-border)] py-5 last:border-b-0 sm:grid-cols-[2.5rem_minmax(0,1fr)] ${
                      isOwn ? "sm:ml-10" : "sm:mr-10"
                    }`}
                  >
                    <ProfileAvatar profile={author} className="h-10 w-10" sizes="40px" />
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <Link
                          href={isOwn ? "/profile" : `/profile/${participant.slug}`}
                          className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                        >
                          {author.name}
                        </Link>
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                          {item.sentAt}
                        </span>
                      </div>
                      <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                        {item.message}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <form onSubmit={sendMessage} className="border-t border-[var(--color-border)] p-5 sm:p-6">
              <label
                htmlFor="message-draft"
                className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]"
              >
                Новое сообщение
              </label>
              <textarea
                id="message-draft"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={`Написать ${participant.name}…`}
                rows={3}
                className="mt-3 w-full resize-y border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm leading-6 text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs leading-5 text-[var(--color-text-muted)]">
                  Enter создаёт новую строку. Отправка работает локально в этом прототипе.
                </p>
                <button type="submit" className="button-primary min-h-11 px-5 text-[0.62rem]">
                  Отправить <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}
