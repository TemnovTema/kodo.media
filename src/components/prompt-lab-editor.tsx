"use client";

import { useRef, useState } from "react";

const promptPlaceholder = `Опишите задачу, исходные материалы, ограничения и критерии готовности.

Пример:
Нужно обновить экран входа онлайн-медиа о вайб-кодинге.
Сохранить текущую навигацию и дизайн-токены.
Проверить результат на ширине 375 и 1440 px; lint и build должны пройти.`;

const projectPresets = [
  {
    label: "Лендинг",
    value: `Нужен лендинг.
Цель: за первый экран объяснить продукт и привести к основному действию.
Проверка: оффер понятен без прокрутки, CTA один, мобильная версия не теряет смысл.`,
  },
  {
    label: "Приложение",
    value: `Нужно приложение.
Цель: собрать основной пользовательский сценарий.
Проверка: есть навигация, состояния загрузки, ошибки и пустые данные.`,
  },
  {
    label: "SaaS-сервис",
    value: `Нужен SaaS-сервис.
Цель: показать первый полезный результат после регистрации.
Проверка: онбординг, тарифы и демоданные связаны с реальным сценарием.`,
  },
  {
    label: "Контентный сайт",
    value: `Нужен контентный сайт.
Цель: собрать каталог, рубрики и страницы материалов.
Проверка: текст удобно читать, архив фильтруется, карточки не теряют данные на мобильном.`,
  },
  {
    label: "Редизайн",
    value: `Нужен редизайн существующего проекта.
Цель: убрать шаблонные AI-паттерны и выровнять визуальную иерархию.
Сохранить маршруты, данные, рабочие компоненты и поведение на мобильном.`,
  },
  {
    label: "Тест / квиз",
    value: `Нужен тест или квиз.
Цель: провести пользователя по вопросам и объяснить результат.
Проверка: виден прогресс, ответы можно изменить, итог содержит следующий шаг.`,
  },
];

const quickInsertions = [
  {
    label: "Темный UI",
    value: "Визуальное направление: тёмный editorial/dev-интерфейс, редкие акценты, без неона и глянца.",
  },
  {
    label: "Минимализм",
    value: "Композиция: больше пустого пространства, меньше лишнего текста и служебного мусора.",
  },
  {
    label: "Image-first",
    value: "Порядок работы: сначала согласовать визуальные референсы и ключевой образ, затем писать код.",
  },
  {
    label: "Mobile-pass",
    value: "Адаптив: отдельно проверить 375, 768 и 1440 px; не переносить desktop-композицию на мобильный механически.",
  },
  {
    label: "Не нейрослоп",
    value: "Запреты: не заполнять пустоту текстом, не использовать типовой SaaS-hero, стеклянные карточки и декоративные метрики.",
  },
  {
    label: "Финальный QA",
    value: "Приёмка: проверить ссылки, интерактивные состояния, клавиатурную навигацию, адаптив, lint и build.",
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
                className="inline-flex min-h-11 items-center border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[rgba(96,135,194,0.08)] sm:min-h-10"
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
                className="inline-flex min-h-11 items-center border border-[var(--color-border)] px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-soft)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] sm:min-h-9"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-6 pt-2 lg:pl-5 lg:pt-0">
          <div className="space-y-2">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Структура рабочего промта
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

          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Подсказка
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
              Выберите тип задачи, затем добавьте нужные ограничения справа.
              Удалите всё, что не влияет на результат или его проверку.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
