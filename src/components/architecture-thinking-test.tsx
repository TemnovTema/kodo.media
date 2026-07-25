"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type QuizAnswer = {
  id: string;
  label: string;
  correct?: boolean;
  note: string;
};

type QuizQuestion = {
  category: string;
  title: string;
  prompt: string;
  code?: string;
  answers: QuizAnswer[];
};

const questions: QuizQuestion[] = [
  {
    category: "Компоненты",
    title: "Пять карточек почти одинаковы. Что делать?",
    prompt:
      "Codex собрал пять карточек товаров: у них совпадают структура, кнопка и сетка, но отличаются текст, изображение и один цветной акцент.",
    answers: [
      {
        id: "a",
        label: "Оставить пять файлов: так проще менять каждую карточку отдельно.",
        note: "Похожая разметка быстро начинает расходиться и требует правок в пяти местах.",
      },
      {
        id: "b",
        label: "Сделать общую карточку и передавать отличия через данные и варианты.",
        correct: true,
        note: "Верно. Общая структура живёт в одном месте, а контент и допустимые различия приходят извне.",
      },
      {
        id: "c",
        label: "Скопировать первую карточку ещё раз, чтобы не затронуть уже готовые экраны.",
        note: "Копирование выглядит безопасно только до первой общей правки.",
      },
    ],
  },
  {
    category: "Границы файла",
    title: "Когда компонент пора разделять?",
    prompt:
      "В одном файле уже есть форма, таблица результатов, запросы к API и логика открытия модального окна. Формально он ещё компилируется.",
    answers: [
      {
        id: "a",
        label: "Только когда файл стал длиннее 500 строк.",
        note: "Количество строк само по себе ничего не говорит о границах ответственности.",
      },
      {
        id: "b",
        label: "Когда части решают разные задачи или могут жить и проверяться отдельно.",
        correct: true,
        note: "Верно. Разделение появляется по ответственности и связям, а не по произвольному лимиту строк.",
      },
      {
        id: "c",
        label: "Сразу после первой правки: один файл должен делать ровно один JSX-элемент.",
        note: "Это другая крайность. Связанные части лучше оставлять рядом, пока они образуют одну понятную задачу.",
      },
    ],
  },
  {
    category: "Композиция",
    title: "Как не копировать похожие блоки?",
    prompt:
      "В ленте есть «заметка», «разбор» и «ссылка». У всех один контейнер и метаданные, но центральная часть разная: текст, цитата или внешний ресурс.",
    answers: [
      {
        id: "a",
        label: "Сделать три почти одинаковых компонента и синхронно менять их при каждом обновлении.",
        note: "Так общая оболочка превращается в несколько независимых версий.",
      },
      {
        id: "b",
        label: "Сделать общую оболочку, а центральную часть передавать как композицию или слот.",
        correct: true,
        note: "Верно. Компонент владеет тем, что действительно общее, а различия остаются явными в содержимом.",
      },
      {
        id: "c",
        label: "Добавить один компонент со всеми возможными вариантами на десятки boolean-props.",
        note: "Большое количество переключателей скрывает смысл интерфейса и делает API компонента хрупким.",
      },
    ],
  },
  {
    category: "Структура",
    title: "Какой порядок в проекте полезнее?",
    prompt:
      "В продукте появились профиль, сообщения и тесты. Каждый раздел использует свои страницы, запросы, локальные компоненты и типы.",
    answers: [
      {
        id: "a",
        label: "Сложить все компоненты в одну папку components, а все типы в types.",
        note: "Так связь между частями одной функции продукта быстро теряется.",
      },
      {
        id: "b",
        label: "Держать рядом код, который меняется вместе: по функции продукта, с общим слоем отдельно.",
        correct: true,
        note: "Верно. Общие примитивы остаются общими, а код конкретной функции проще найти и менять рядом.",
      },
      {
        id: "c",
        label: "Создать папку misc для всего, что пока некуда положить.",
        note: "Временная папка почти всегда становится постоянной точкой потери контекста.",
      },
    ],
  },
  {
    category: "Состояния",
    title: "Какие состояния должен увидеть пользователь?",
    prompt:
      "Экран загружает список задач. Иногда данных ещё нет, иногда запрос падает, а иногда список честно пуст.",
    answers: [
      {
        id: "a",
        label: "Показывать один спиннер, пока не появится хоть что-нибудь.",
        note: "Так пользователь не отличит загрузку от ошибки или реально пустого результата.",
      },
      {
        id: "b",
        label: "Явно спроектировать загрузку, ошибку, пустое состояние и успешный список.",
        correct: true,
        note: "Верно. Состояния интерфейса являются частью продукта, а не остаточной логикой вокруг happy path.",
      },
      {
        id: "c",
        label: "Не показывать ничего, если данные не пришли: меньше интерфейса.",
        note: "Отсутствие обратной связи не делает сценарий проще, оно делает его непонятным.",
      },
    ],
  },
  {
    category: "Рефакторинг",
    title: "Где здесь граница общего?",
    prompt:
      "Два компонента повторяют семантику статьи, отступы и метаданные. Отличается только содержимое середины.",
    code: `function NoteCard({ title, text }) {\n  return <article><Meta /><h2>{title}</h2><p>{text}</p></article>;\n}\n\nfunction QuoteCard({ author, quote }) {\n  return <article><Meta /><h2>{author}</h2><blockquote>{quote}</blockquote></article>;\n}`,
    answers: [
      {
        id: "a",
        label: "Вынести общую оболочку ArticleCard и передавать в неё заголовок и содержимое.",
        correct: true,
        note: "Верно. Повторяется каркас, значит он заслуживает отдельной границы. Разное содержимое остаётся разным.",
      },
      {
        id: "b",
        label: "Ничего не менять: два компонента всегда лучше одного.",
        note: "Разделение полезно, но здесь есть явный общий каркас, который уже требует синхронных изменений.",
      },
      {
        id: "c",
        label: "Сделать один Card с props note, quote, author, text, title и семью флагами.",
        note: "Слишком широкий API маскирует разные сценарии. Здесь достаточно композиции, а не набора флагов.",
      },
    ],
  },
  {
    category: "UI Kit",
    title: "Как добавить новую кнопку без разрастания?",
    prompt:
      "Нужна кнопка удаления. В проекте уже есть обычная и вторичная кнопки с общими размерами, фокусом и поведением на мобильном.",
    answers: [
      {
        id: "a",
        label: "Собрать новую кнопку вручную на каждой странице, где есть удаление.",
        note: "Так важные состояния и размеры неизбежно начнут расходиться.",
      },
      {
        id: "b",
        label: "Добавить понятный destructive-вариант в существующий примитив Button.",
        correct: true,
        note: "Верно. UI Kit хранит общий контракт, а вариант выражает допустимое визуальное отличие.",
      },
      {
        id: "c",
        label: "Поменять обычную кнопку на красную во всём продукте.",
        note: "Опасное действие должно быть различимо, но не должно менять смысл базового действия.",
      },
    ],
  },
  {
    category: "Состояние рядом",
    title: "Где хранить открытие модального окна?",
    prompt:
      "Кнопка «Редактировать» и само окно находятся в одном блоке профиля. Больше нигде этот флаг не нужен.",
    answers: [
      {
        id: "a",
        label: "В локальном состоянии блока профиля, рядом с теми, кто им пользуется.",
        correct: true,
        note: "Верно. Состояние стоит поднимать только до ближайшего общего владельца, которому оно действительно нужно.",
      },
      {
        id: "b",
        label: "Сразу в глобальный store: вдруг пригодится позже.",
        note: "Глобальное состояние имеет цену: больше связей, сложнее тестирование и выше риск случайных зависимостей.",
      },
      {
        id: "c",
        label: "В URL, даже если на окно никто не должен ссылаться.",
        note: "URL полезен для воспроизводимого состояния и навигации, но не обязан хранить каждый локальный флаг.",
      },
    ],
  },
  {
    category: "Ответственность",
    title: "Компонент уже стал слишком общим?",
    prompt:
      "Dashboard рендерит шапку, навигацию, таблицу, модальные окна, графики и сам делает пять запросов. Любая правка ломает несколько несвязанных частей.",
    answers: [
      {
        id: "a",
        label: "Разделить по устойчивым задачам: shell, данные, таблица, график и действия пользователя.",
        correct: true,
        note: "Верно. У компонентов появляются ясные зоны изменений и более узкие контракты.",
      },
      {
        id: "b",
        label: "Оставить всё вместе: так меньше импортов.",
        note: "Количество импортов не важнее читаемости и предсказуемости изменений.",
      },
      {
        id: "c",
        label: "Разбить файл на тридцать компонентов по одной строке JSX.",
        note: "Дробление ради дробления тоже скрывает смысл. Нужны границы по задачам, а не по количеству строк.",
      },
    ],
  },
  {
    category: "Проверка сценария",
    title: "Какой дефект здесь спрятан?",
    prompt:
      "Экран показывает загрузку и список, но не содержит состояния ошибки. После неудачного запроса он перестаёт обновляться без объяснения.",
    code: `if (isLoading) return <Loading />;\n\nif (items) return <TaskList items={items} />;\n\nreturn null;`,
    answers: [
      {
        id: "a",
        label: "Добавить явное состояние ошибки с понятным действием: повторить или вернуться.",
        correct: true,
        note: "Верно. Ошибка - не исключение из интерфейса, а ожидаемая ветка пользовательского маршрута.",
      },
      {
        id: "b",
        label: "Заменить return null на ещё один Loading, чтобы экран не был пустым.",
        note: "Вечная загрузка скрывает проблему и лишает пользователя возможности продолжить работу.",
      },
      {
        id: "c",
        label: "Поставить console.log и оставить интерфейс как есть.",
        note: "Лог помогает разработчику, но не даёт пользователю понятного сценария при сбое.",
      },
    ],
  },
];

const questionHints = [
  "Ищите повторяющийся каркас, а не количество похожих файлов.",
  "Проверьте, какие части можно менять, тестировать и понимать независимо друг от друга.",
  "Общее должно жить в оболочке, а различающееся - оставаться в содержимом.",
  "Подумайте, какой код изменяется вместе, когда развивается одна функция продукта.",
  "У пользователя должна быть ясность не только в успешном сценарии.",
  "Сравните повторяющийся каркас с тем, что действительно должно отличаться между карточками.",
  "Новый сценарий не должен заново изобретать размеры, доступность и поведение базового элемента.",
  "Состояние стоит хранить у ближайшей части интерфейса, которая в нём заинтересована.",
  "Разделяйте не по количеству строк, а по устойчивым зонам ответственности.",
  "Сбой запроса - это часть пользовательского маршрута, а не только запись в консоли.",
] as const;

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

function resultCopy(score: number) {
  if (score >= 9) {
    return "Вы уже мыслите связями: отличаете общий каркас от частного случая и не прячете сценарии в копиях.";
  }

  if (score >= 7) {
    return "Основа есть. Следующий шаг - чаще проверять, где заканчивается ответственность компонента и начинается новый сценарий.";
  }

  return "Есть пространство для системности: начните с повторов, состояний и явных границ между частями интерфейса.";
}

export function ArchitectureThinkingTest() {
  const sessionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const currentQuestion = questions[currentIndex];
  const selectedId = answers[currentIndex];
  const selectedAnswer = currentQuestion.answers.find(
    (answer) => answer.id === selectedId,
  );
  const score = questions.reduce((total, question, index) => {
    const selected = question.answers.find((answer) => answer.id === answers[index]);

    return total + (selected?.correct ? 1 : 0);
  }, 0);
  const incorrectAnswers = questions.flatMap((question, index) => {
    const selectedAnswer = question.answers.find(
      (answer) => answer.id === answers[index],
    );
    const correctAnswer = question.answers.find((answer) => answer.correct);

    if (!selectedAnswer || selectedAnswer.correct || !correctAnswer) {
      return [];
    }

    return [{ question, index, selectedAnswer, correctAnswer }];
  });

  useEffect(() => {
    document.body.dataset.testSession = "active";

    return () => {
      delete document.body.dataset.testSession;
    };
  }, []);

  const selectAnswer = (answerId: string) => {
    if (selectedId) {
      return;
    }

    setAnswers((previous) => ({ ...previous, [currentIndex]: answerId }));
  };

  const continueTest = () => {
    if (!selectedAnswer) {
      return;
    }

    if (currentIndex === questions.length - 1) {
      sessionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setIsComplete(true);
      return;
    }

    setCurrentIndex((value) => value + 1);
    setIsHintVisible(false);
  };

  const restartTest = () => {
    sessionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentIndex(0);
    setAnswers({});
    setIsComplete(false);
    setIsHintVisible(false);
  };

  return (
    <div
      ref={sessionRef}
      role="dialog"
      aria-modal="true"
      className="test-session fixed inset-0 z-[100] overflow-y-auto overscroll-y-contain bg-[var(--color-bg)] text-[var(--color-text)]"
      aria-label="Тест по архитектурному мышлению"
    >
      <header className="sticky top-0 z-10 bg-[var(--color-bg)]">
        <div className="site-frame flex min-h-16 items-center justify-between gap-4 py-3 sm:min-h-20 sm:py-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center bg-[var(--color-brand-yellow)] font-mono text-[0.72rem] tracking-[0.08em] text-[#17161a] sm:h-10 sm:w-10">
              A
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:text-[0.68rem] sm:tracking-[0.24em]">
                Тест / архитектурное мышление
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

      <main className="site-frame flex min-h-[calc(100dvh-4rem)] flex-col pb-8 pt-8 sm:min-h-[calc(100dvh-5rem)] sm:pb-12 sm:pt-12">
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
                  Архитектура начинается с выбора границ.
                </h1>
              </div>
              <p className="max-w-xl text-base leading-8 text-[var(--color-text-soft)] sm:text-lg">
                {resultCopy(score)}
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
                    Здесь не оценка, а точки, где полезно уточнить собственный способ собирать интерфейсы.
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
                            Ваш ответ: {selectedAnswer.label}
                          </p>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                            <span className="mr-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-brand-yellow)]">
                              Рабочий ход
                            </span>
                            {correctAnswer.label}
                          </p>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                            {correctAnswer.note.replace(/^Верно\.\s*/, "")}
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
                  Сохраните этот принцип для следующей сборки: сначала границы и состояния, затем скорость реализации.
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
            <div className="grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
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

            <section className="grid flex-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center lg:py-16">
              <div className="max-w-4xl">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-brand-yellow)]">
                  {currentQuestion.category}
                </p>
                <h1 className="mt-5 text-balance text-[clamp(2.35rem,5.6vw,5.15rem)] leading-[0.88] tracking-[-0.07em]">
                  {currentQuestion.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-text-soft)] sm:text-lg">
                  {currentQuestion.prompt}
                </p>

                {currentQuestion.code ? (
                  <pre className="mt-8 overflow-x-auto bg-[var(--color-surface)] p-5 font-mono text-xs leading-6 text-[var(--color-text-soft)] sm:p-6 sm:text-sm">
                    <code>{currentQuestion.code}</code>
                  </pre>
                ) : null}

                {isHintVisible ? (
                  <div className="mt-7 max-w-3xl bg-[var(--color-surface)] px-5 py-4 sm:px-6">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-brand-yellow)]">
                      Подсказка
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                      {questionHints[currentIndex]}
                    </p>
                  </div>
                ) : null}
              </div>

              <aside className="hidden self-end lg:block">
                <p className="font-display text-[clamp(5rem,8vw,7.5rem)] leading-[0.72] tracking-[-0.09em] text-[rgba(243,238,232,0.14)]">
                  {formatStep(currentIndex + 1)}
                </p>
                <p className="mt-7 font-mono text-[0.62rem] uppercase leading-5 tracking-[0.2em] text-[var(--color-text-muted)]">
                  Не угадывайте. Ищите границу ответственности.
                </p>
              </aside>
            </section>

            <section aria-label="Варианты ответа" className="pb-6">
              <div className="grid gap-2.5 md:grid-cols-3">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = answer.id === selectedId;
                  const optionState = selectedId
                    ? isSelected
                      ? "bg-[rgba(180,159,0,0.16)] text-[var(--color-text)]"
                      : "bg-[rgba(255,255,255,0.018)] text-[var(--color-text-muted)]"
                    : "bg-[rgba(255,255,255,0.018)] text-[var(--color-text-soft)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text)]";

                  return (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() => selectAnswer(answer.id)}
                      disabled={Boolean(selectedId)}
                      className={`group min-h-44 p-5 text-left transition-colors disabled:cursor-default sm:min-h-48 sm:p-6 ${optionState}`}
                    >
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="mt-8 block text-sm leading-6 sm:text-base sm:leading-7">
                        {answer.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedAnswer ? (
                <div className="mt-5 flex flex-col gap-5 bg-[var(--color-surface)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                    <span className="mr-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-brand-yellow)]">
                      Ответ сохранён
                    </span>
                    Разбор появится после завершения теста.
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
