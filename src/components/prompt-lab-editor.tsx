"use client";

import { useRef, useState } from "react";

const promptPlaceholder = `Опиши задачу, контекст, ограничения и формат ответа.

Пример:
Нужен экран входа для онлайн-СМИ о вайб-кодинге.
Не ломать текущую навигацию.
Сделать темный минималистичный UI, добавить image-layer и проверить mobile.`;

const projectPresets = [
  {
    label: "Лендинг",
    value: `Нужен лендинг.
Цель: быстро объяснить продукт и довести пользователя до первого CTA.
Важно: сильный hero, мало шума, понятная структура секций.`,
  },
  {
    label: "Приложение",
    value: `Нужно приложение.
Цель: собрать рабочий product-flow, а не промо-страницу.
Важно: системные состояния, навигация, читаемая структура экранов.`,
  },
  {
    label: "SaaS-сервис",
    value: `Нужен SaaS-сервис.
Цель: показать продуктовую ценность, onboarding и устойчивый интерфейс.
Важно: dashboard-логика, pricing, demo-data без декоративного шума.`,
  },
  {
    label: "Контентный сайт",
    value: `Нужен контентный сайт.
Цель: собрать редакционный продукт с каталогом, рубриками и detail-страницами.
Важно: чтение, архив, ритм карточек и image-led подача.`,
  },
  {
    label: "Редизайн",
    value: `Нужен редизайн существующего проекта.
Цель: убрать AI-slop и привести интерфейс к более чистой, устойчивой системе.
Важно: не ломать текущую структуру и маршрут пользователя.`,
  },
  {
    label: "Тест / квиз",
    value: `Нужен тест или квиз.
Цель: провести пользователя через диагностический сценарий и показать итоговый профиль.
Важно: шаги, прогресс, результат и спокойный utility-UI.`,
  },
];

const quickInsertions = [
  {
    label: "Темный UI",
    value: "Визуально: темный интерфейс в спокойной editorial/dev эстетике.",
  },
  {
    label: "Минимализм",
    value: "Композиция: больше пустого пространства, меньше лишнего текста и служебного мусора.",
  },
  {
    label: "Image-first",
    value: "Пайплайн: сначала image-direction и visual anchors, потом код.",
  },
  {
    label: "Mobile-pass",
    value: "Обязательно: отдельный проход по mobile-адаптиву, без ломки desktop-логики.",
  },
  {
    label: "Не нейрослоп",
    value: "Запреты: не заполнять пустоту типографикой, не использовать generic SaaS-паттерны.",
  },
  {
    label: "Финальный QA",
    value: "В конце: проверить рабочие ссылки, состояния, адаптив и визуальные хвосты.",
  },
];

const structureHints = [
  "что строим",
  "для кого",
  "какой результат нужен",
  "какие есть ограничения",
  "что запрещено",
  "как проверить готовность",
];

export function PromptLabEditor() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const focusEditor = () => {
    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const loadPreset = (preset: string) => {
    setValue(preset);
    focusEditor();
  };

  const appendFragment = (fragment: string) => {
    setValue((current) => {
      const trimmed = current.trim();

      if (!trimmed) {
        return fragment;
      }

      if (trimmed.includes(fragment)) {
        return current;
      }

      return `${trimmed}\n${fragment}`;
    });
    focusEditor();
  };

  return (
    <section className="-mt-2 space-y-8">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,18rem)] lg:items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {projectPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => loadPreset(preset.value)}
                className="inline-flex min-h-10 items-center border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[rgba(96,135,194,0.08)]"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden border border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.014)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-[var(--color-brand-blue)]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 bg-[var(--color-brand-pink)]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 bg-[var(--color-brand-yellow)]" aria-hidden="true" />
              </div>

              <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                prompt draft
              </p>
            </div>

            <label htmlFor="prompt-draft" className="sr-only">
              Поле для написания промта
            </label>
            <textarea
              ref={textareaRef}
              id="prompt-draft"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={promptPlaceholder}
              spellCheck={false}
              className="min-h-[22rem] w-full resize-y bg-transparent px-5 py-5 text-base leading-8 text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] md:min-h-[26rem] md:px-7 md:py-7 md:text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {quickInsertions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => appendFragment(item.value)}
                className="inline-flex min-h-9 items-center border border-[var(--color-border)] px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-soft)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-4 border-t border-[var(--color-border)] pt-4 lg:border-t-0 lg:border-l lg:pl-5 lg:pt-0">
          <div className="space-y-2">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Скелет сильного промта
            </p>
            <ul className="space-y-2 text-sm leading-6 text-[var(--color-text-soft)]">
              {structureHints.map((hint) => (
                <li key={hint} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-2 w-2 flex-none bg-[var(--color-brand-green)]"
                  />
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[var(--color-border)] pt-4">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Подсказка
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
              Сначала выбери тип задачи кнопкой сверху, потом добей черновик через короткие
              вставки справа от поля. Так промт быстрее собирается в рабочий бриф, а не в
              поток пожеланий.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
