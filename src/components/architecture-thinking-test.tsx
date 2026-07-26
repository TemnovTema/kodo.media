"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { DiagnosticTestSession as DiagnosticTestSessionData } from "@/lib/test-sessions";

const relatedReading = [
  {
    href: "/articles/why-vibe-coding-needs-an-editor",
    title: "Почему вайб-кодингу нужен редактор, а не только хороший агент",
    note: "Как удерживать структуру решений, когда продукт быстро растёт вместе с агентом.",
  },
  {
    href: "/articles/prompt-pipeline-for-a-small-media",
    title: "Пайплайн промтов для небольшого онлайн-СМИ: от замысла до выпуска",
    note: "О том, как связать маршруты, сущности и интерфейс в одну систему.",
  },
  {
    href: "/articles/agents-as-layout-engineers",
    title: "Агенты как layout engineers: где заканчивается генерация и начинается композиция",
    note: "Про границы компонентов, композицию и дисциплину экрана.",
  },
] as const;

function formatStep(value: number) {
  return String(value).padStart(2, "0");
}

function resultCopy(score: number, total: number) {
  if (score === total) {
    return "Точный проход. Вы выбираете решения, которые можно проверить, объяснить команде и безопасно развивать дальше.";
  }

  if (score >= Math.ceil(total * 0.7)) {
    return "Основа есть. В следующих задачах стоит ещё внимательнее отделять сильный рабочий процесс от самого быстрого на вид решения.";
  }

  return "Есть пространство для системности: сверяйте контекст, границы изменений и способ проверки результата до начала работы.";
}

const codeTokens =
  /(\b(?:const|let|function|return|if|else|await)\b|<\/?[\w-]+(?:\s[^>]*)?\/?>(?:<\/[\w-]+>)?|\{[^}]+\}|["'][^"']+["'])/g;

function renderCodeLine(line: string) {
  return line.split(codeTokens).map((token, index) => {
    const tone =
      /^(?:const|let|function|return|if|else|await)$/.test(token)
        ? "text-[var(--color-brand-pink)]"
        : token.startsWith("<")
          ? "text-[var(--color-brand-green)]"
          : token.startsWith("{")
            ? "text-[var(--color-brand-blue)]"
            : /^['"]/.test(token)
              ? "text-[var(--color-brand-yellow)]"
              : "";

    return (
      <span key={`${token}-${index}`} className={tone}>
        {token}
      </span>
    );
  });
}

function CodeEditor({ code }: { code: string }) {
  return (
    <div className="overflow-x-auto bg-[var(--color-surface)] font-mono text-[0.65rem] leading-5 text-[var(--color-text-soft)] sm:text-xs">
      <div className="flex min-w-[34rem] items-center justify-between bg-[rgba(255,255,255,0.028)] px-4 py-1.5 text-[0.56rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 bg-[var(--color-brand-pink)]" />
          <span className="h-1.5 w-1.5 bg-[var(--color-brand-yellow)]" />
          <span className="h-1.5 w-1.5 bg-[var(--color-brand-green)]" />
        </span>
        <span>fragment.tsx</span>
        <span>tsx</span>
      </div>
      <ol className="min-w-[34rem] py-1.5" aria-label="Фрагмент кода">
        {code.split("\n").map((line, index) => (
          <li
            key={`${line}-${index}`}
            className={`grid grid-cols-[2.75rem_minmax(0,1fr)] px-4 ${
              index % 3 === 1 ? "bg-[rgba(96,135,194,0.08)]" : ""
            }`}
          >
            <span className="select-none text-right text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <code className="whitespace-pre pl-4">{renderCodeLine(line)}</code>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScenarioEditor({ prompt, step }: { prompt: string; step: number }) {
  const lines = prompt.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [prompt];

  return (
    <div className="bg-[var(--color-surface)]">
      <div className="flex items-center justify-between bg-[rgba(255,255,255,0.028)] px-4 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 bg-[var(--color-brand-pink)]" />
          <span className="h-1.5 w-1.5 bg-[var(--color-brand-yellow)]" />
          <span className="h-1.5 w-1.5 bg-[var(--color-brand-green)]" />
        </span>
        <span>сценарий-{formatStep(step)}.md</span>
        <span>text</span>
      </div>
      <ol className="py-2" aria-label="Контекст вопроса">
        {lines.map((line, index) => (
          <li
            key={`${line}-${index}`}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] px-4"
          >
            <span className="select-none text-right font-mono text-[0.6rem] leading-6 text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pl-4 text-[0.8rem] leading-6 text-[var(--color-text-soft)] sm:text-sm sm:leading-6">
              {line.trim()}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function DiagnosticTestSession({
  test,
}: {
  test: DiagnosticTestSessionData;
}) {
  const sessionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [draftAnswerIndex, setDraftAnswerIndex] = useState<number>();
  const [isComplete, setIsComplete] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const questions = test.questions;
  const currentQuestion = questions[currentIndex];
  const hasCodeQuestion = Boolean(currentQuestion.code);
  const draftAnswer =
    draftAnswerIndex === undefined
      ? undefined
      : currentQuestion.answers[draftAnswerIndex];
  const score = questions.reduce((total, question, index) => {
    return total + (answers[index] === question.correctIndex ? 1 : 0);
  }, 0);
  const incorrectAnswers = questions.flatMap((question, index) => {
    const selectedIndex = answers[index];

    if (selectedIndex === undefined || selectedIndex === question.correctIndex) {
      return [];
    }

    return [
      {
        question,
        index,
        selectedAnswer: question.answers[selectedIndex],
        correctAnswer: question.answers[question.correctIndex],
      },
    ];
  });

  useEffect(() => {
    document.body.dataset.testSession = "active";

    return () => {
      delete document.body.dataset.testSession;
    };
  }, []);

  const continueTest = () => {
    if (draftAnswerIndex === undefined) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentIndex]: draftAnswerIndex,
    }));

    if (currentIndex === questions.length - 1) {
      sessionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setIsComplete(true);
      setDraftAnswerIndex(undefined);
      return;
    }

    setCurrentIndex((value) => value + 1);
    setDraftAnswerIndex(undefined);
    setIsHintVisible(false);
  };

  const restartTest = () => {
    sessionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentIndex(0);
    setAnswers({});
    setDraftAnswerIndex(undefined);
    setIsComplete(false);
    setIsHintVisible(false);
  };

  return (
    <div
      ref={sessionRef}
      role="dialog"
      aria-modal="true"
      className="test-session fixed inset-0 z-[100] overflow-y-auto overscroll-y-contain bg-[var(--color-bg)] text-[var(--color-text)]"
      aria-label={`Тест: ${test.title}`}
    >
      <header className="sticky top-0 z-10 bg-[var(--color-bg)]">
        <div className="site-frame flex min-h-16 items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center bg-[var(--color-brand-yellow)] font-mono text-[0.72rem] tracking-[0.08em] text-[#17161a] sm:h-10 sm:w-10">
              T
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:text-[0.68rem] sm:tracking-[0.24em]">
                Тест / {test.shortLabel}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-soft)] sm:text-base">
                {isComplete ? "Результат прохода" : currentQuestion.category}
              </p>
            </div>
          </div>

          <Link
            href="/tests"
            aria-label="Завершить тест и вернуться к каталогу"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 px-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
          >
            <span className="text-2xl font-normal leading-none" aria-hidden="true">
              ×
            </span>
            <span className="hidden sm:inline">Завершить</span>
          </Link>
        </div>
      </header>

      <main className="site-frame flex min-h-[calc(100dvh-4.5rem)] flex-col pb-2 pt-5 sm:pb-3 sm:pt-5">
        {isComplete ? (
          <section className="mx-auto w-full max-w-6xl py-8 sm:py-12">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-brand-yellow)]">
              Проход завершён
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.65fr)] lg:items-end">
              <div>
                <p className="font-display text-[clamp(5.5rem,14vw,10rem)] leading-[0.72] tracking-[-0.08em] text-[var(--color-text)]">
                  {formatStep(score)}
                  <span className="ml-2 text-[0.28em] tracking-[-0.04em] text-[var(--color-text-muted)]">
                    / {formatStep(questions.length)}
                  </span>
                </p>
                <h1 className="mt-8 max-w-2xl text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.86] tracking-[-0.07em]">
                  {test.resultTitle}
                </h1>
              </div>
              <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] sm:text-lg">
                {resultCopy(score, questions.length)}
              </p>
            </div>

            {incorrectAnswers.length > 0 ? (
              <section className="mt-16">
                <div className="max-w-2xl">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-brand-yellow)]">
                    Разбор маршрута
                  </p>
                  <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3.75rem)] leading-[0.9] tracking-[-0.06em]">
                    К этим вопросам стоит вернуться.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-[var(--color-text-soft)]">
                    Здесь не оценка, а точки, где полезно сверить решение с контекстом задачи и рабочим процессом.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {incorrectAnswers.map(
                    ({ question, index, selectedAnswer, correctAnswer }) => (
                      <article
                        key={question.title}
                        className="grid gap-5 bg-[var(--color-surface)] p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-7"
                      >
                        <span className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--color-brand-yellow)]">
                          {formatStep(index + 1)}
                        </span>
                        <div>
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                            {question.category}
                          </p>
                          <h3 className="mt-3 max-w-3xl text-xl leading-tight tracking-[-0.04em] sm:text-2xl">
                            {question.title}
                          </h3>
                          <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                            Ваш ответ: {selectedAnswer}
                          </p>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                            <span className="mr-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-brand-yellow)]">
                              Рабочий ход
                            </span>
                            {correctAnswer}
                          </p>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                            Правильный вариант сохраняет контекст задачи и даёт результат, который можно проверить.
                          </p>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              </section>
            ) : (
              <section className="mt-16 max-w-2xl bg-[var(--color-surface)] p-6 sm:p-8">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-brand-green)]">
                  Точный проход
                </p>
                <h2 className="mt-4 text-balance text-2xl leading-tight tracking-[-0.05em] sm:text-3xl">
                  Ошибок в этом маршруте нет.
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-text-soft)]">
                  Сохраните этот подход для следующей задачи: сначала условия и критерии, затем скорость реализации.
                </p>
              </section>
            )}

            <section className="mt-16">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Читать дальше
              </p>
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {relatedReading.map((article, index) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group min-h-48 bg-[rgba(255,255,255,0.018)] p-5 transition-colors hover:bg-[var(--color-surface)] sm:p-6"
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      Материал {formatStep(index + 1)}
                    </span>
                    <span className="mt-7 block text-lg leading-tight tracking-[-0.04em] text-[var(--color-text)] sm:text-xl">
                      {article.title}
                    </span>
                    <span className="mt-4 block text-sm leading-6 text-[var(--color-text-soft)]">
                      {article.note}
                    </span>
                    <span className="mt-5 inline-block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-brand-yellow)] transition-transform group-hover:translate-x-1">
                      Читать →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={restartTest}
                className="inline-flex min-h-12 items-center justify-center bg-[var(--color-brand-yellow)] px-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#17161a] transition-transform hover:bg-[var(--color-text)] active:translate-y-px"
              >
                Пройти ещё раз
              </button>
              <Link
                href="/tests"
                className="inline-flex min-h-12 items-center justify-center px-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
              >
                К каталогу тестов
              </Link>
            </div>
          </section>
        ) : (
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Ход {formatStep(currentIndex + 1)} / {formatStep(questions.length)}
              </p>
              <div className="flex items-center gap-1.5" aria-label={`Вопрос ${currentIndex + 1} из ${questions.length}`}>
                {questions.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 flex-1 transition-colors ${
                      index < currentIndex
                        ? "bg-[var(--color-brand-green)]"
                        : index === currentIndex
                          ? "bg-[var(--color-brand-yellow)]"
                          : "bg-[rgba(243,238,232,0.14)]"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsHintVisible((value) => !value)}
                className="inline-flex min-h-10 w-fit items-center justify-center px-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] sm:w-auto"
              >
                {isHintVisible ? "Скрыть подсказку" : "Подсказка"}
              </button>
            </div>

            <section
              className={`grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-center ${
                hasCodeQuestion ? "py-2 lg:py-1" : "py-3 lg:py-2"
              }`}
            >
              <div className="max-w-4xl">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-brand-yellow)]">
                  {currentQuestion.category}
                </p>
                <h1 className="mt-3 text-balance text-[clamp(2rem,3.6vw,3.35rem)] leading-[0.9] tracking-[-0.07em]">
                  {currentQuestion.title}
                </h1>
                <div className="mt-3 max-w-3xl">
                  {currentQuestion.code ? (
                    <CodeEditor code={currentQuestion.code} />
                  ) : (
                    <ScenarioEditor
                      prompt={currentQuestion.prompt}
                      step={currentIndex + 1}
                    />
                  )}
                </div>

                {isHintVisible ? (
                  <div className="mt-5 max-w-3xl bg-[var(--color-surface)] px-5 py-4 sm:px-6">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-brand-yellow)]">
                      Подсказка
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                      {test.hint}
                    </p>
                  </div>
                ) : null}
              </div>

              <aside className="hidden self-end lg:block">
                <p className="font-display text-[clamp(5rem,8vw,7.5rem)] leading-[0.72] tracking-[-0.09em] text-[rgba(243,238,232,0.14)]">
                  {formatStep(currentIndex + 1)}
                </p>
                <p className="mt-5 font-mono text-[0.62rem] uppercase leading-5 tracking-[0.2em] text-[var(--color-text-muted)]">
                  Не угадывайте. Сверяйте условие и последствия решения.
                </p>
              </aside>
            </section>

            <section aria-label="Варианты ответа" className="pb-2">
              <div className="grid gap-2.5 md:grid-cols-2">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = index === draftAnswerIndex;
                  const optionState =
                    draftAnswerIndex !== undefined
                      ? isSelected
                        ? "bg-[rgba(180,159,0,0.16)] text-[var(--color-text)]"
                        : "bg-[rgba(255,255,255,0.018)] text-[var(--color-text-muted)]"
                      : "bg-[rgba(255,255,255,0.018)] text-[var(--color-text-soft)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text)]";

                  return (
                    <button
                      key={answer}
                      type="button"
                      onClick={() => setDraftAnswerIndex(index)}
                      aria-pressed={isSelected}
                      className={`group min-h-20 p-4 text-left transition-colors sm:min-h-24 sm:p-5 ${optionState}`}
                    >
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="mt-3 block text-sm leading-6 sm:text-base sm:leading-7">
                        {answer}
                      </span>
                    </button>
                  );
                })}
              </div>

              {draftAnswer ? (
                <div className="mt-3 flex flex-col gap-4 bg-[var(--color-surface)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                    <span className="mr-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-brand-yellow)]">
                      Вариант выбран
                    </span>
                    Нажмите «Дальше», чтобы зафиксировать ответ.
                  </p>
                  <button
                    type="button"
                    onClick={continueTest}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center bg-[var(--color-brand-yellow)] px-5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#17161a] transition-colors hover:bg-[var(--color-text)] active:translate-y-px"
                  >
                    {currentIndex === questions.length - 1 ? "К результату" : "Дальше →"}
                  </button>
                </div>
              ) : null}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
