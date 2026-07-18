"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  demoSessionEvent,
  demoSessionStorageKey,
} from "@/lib/demo-session";

type DemoAccessFormProps = {
  mode: "login" | "signup";
};

export function DemoAccessForm({ mode }: DemoAccessFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignup = mode === "signup";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.localStorage.setItem(demoSessionStorageKey, "active");
    window.dispatchEvent(new Event(demoSessionEvent));
    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup ? (
        <label className="grid gap-2">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Имя
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className="min-h-12 border border-[var(--color-border)] bg-[var(--color-panel)] px-4 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-yellow)]"
            placeholder="Как к вам обращаться"
          />
        </label>
      ) : null}

      <label className="grid gap-2">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          defaultValue={isSignup ? undefined : "demo@kodo.media"}
          className="min-h-12 border border-[var(--color-border)] bg-[var(--color-panel)] px-4 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-yellow)]"
          placeholder="you@example.com"
        />
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Пароль
        </span>
        <input
          type="password"
          name="password"
          required
          minLength={4}
          autoComplete={isSignup ? "new-password" : "current-password"}
          defaultValue={isSignup ? undefined : "kodo"}
          className="min-h-12 border border-[var(--color-border)] bg-[var(--color-panel)] px-4 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-yellow)]"
          placeholder="Минимум 4 символа"
        />
      </label>

      <button type="submit" className="button-primary w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Открываем профиль"
          : isSignup
            ? "Создать и войти"
            : "Войти в профиль"}
      </button>
    </form>
  );
}
