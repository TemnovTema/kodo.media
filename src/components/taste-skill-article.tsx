const principles = [
  {
    title: "Скилл добавляет дизайн-контекст",
    text: "Taste Skill хранится в SKILL.md рядом с проектом. Агент читает его вместе с задачей и получает не только команду собрать экран, но и правила для композиции, типографики, отступов и движения.",
  },
  {
    title: "Он убирает типовые решения до вёрстки",
    text: "Вместо универсального шаблона скилл просит сначала разобрать бриф, определить дизайн-язык и проверить результат. Это уменьшает количество случайных карточек, дефолтных шрифтов и декоративного движения.",
  },
  {
    title: "Набор стоит собирать по роли",
    text: "Базовый скилл подходит для общего направления. Отдельные модули помогают с редизайном существующего продукта или работой от визуального референса. Пересекающиеся стили лучше не включать одновременно.",
  },
  {
    title: "Качество всё равно начинается с брифа",
    text: "Скилл не принимает продуктовые решения за вас и не гарантирует сильный интерфейс сам по себе. Чем точнее описаны контекст, ограничения и критерии готовности, тем полезнее он для агента.",
  },
];

type TasteSkillArticleProps = {
  sourceUrl?: string;
  repositoryUrl?: string;
};

export function TasteSkillArticle({
  sourceUrl,
  repositoryUrl,
}: TasteSkillArticleProps) {
  return (
    <article className="max-w-4xl space-y-14">
      <section id="overview" className="scroll-mt-32 space-y-6">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Короткий разбор
        </p>
        <h2 className="max-w-3xl text-balance text-[clamp(2rem,4vw,3.6rem)] leading-[0.94] tracking-[-0.065em] text-[var(--color-text)]">
          Инструкция, которая помогает агенту держать форму
        </h2>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
          <p>
            Taste Skill - открытый набор инструкций для Codex, Cursor и Claude Code. Он
            переводит визуальные требования из размытых пожеланий в рабочие правила,
            которые агент может применять прямо во время сборки интерфейса.
          </p>
          <p>
            Это не библиотека компонентов и не команда «сделай красиво». Его задача -
            сделать ход работы последовательным: сначала бриф и направление, затем
            вёрстка, потом проверка на визуальный шум и случайные решения.
          </p>
        </div>
      </section>

      <section id="principles" className="scroll-mt-32 space-y-7">
        <div className="space-y-3">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Как это работает
          </p>
          <h2 className="text-balance text-[clamp(1.8rem,3vw,2.7rem)] leading-[0.98] tracking-[-0.06em] text-[var(--color-text)]">
            Четыре опорных принципа
          </h2>
        </div>
        <ol className="space-y-8">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="grid gap-4 border-l border-[var(--color-border-strong)] pl-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
            >
              <span className="font-mono text-[0.66rem] tracking-[0.16em] text-[var(--color-text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl space-y-2">
                <h3 className="text-[1.15rem] leading-tight tracking-[-0.03em] text-[var(--color-text)] sm:text-[1.28rem]">
                  {principle.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
                  {principle.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="install"
        className="scroll-mt-32 border border-[var(--color-border-strong)] bg-[var(--color-panel)] p-6 sm:p-8"
      >
        <div className="max-w-2xl space-y-5">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Как взять в работу
          </p>
          <h2 className="text-balance text-[clamp(1.7rem,3vw,2.45rem)] leading-[0.98] tracking-[-0.055em] text-[var(--color-text)]">
            Начните с одного скилла под текущую задачу
          </h2>
          <p className="text-base leading-8 text-[var(--color-text-soft)]">
            Установите набор через Agent Skills CLI или возьмите нужный SKILL.md в
            репозиторий проекта. После установки назовите скилл в задаче, если агент не
            подхватил его автоматически.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {repositoryUrl ? (
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="button-primary group gap-2"
              >
                Скачать с GitHub
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </a>
            ) : null}
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="button-secondary group gap-2"
              >
                Читать источник
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
