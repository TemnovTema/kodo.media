const promptPlaceholder = `Опиши задачу, контекст, ограничения и формат ответа.

Например:
Нужен экран входа для медиа о вайб-кодинге.
Не ломать текущую навигацию.
Сделать минималистично и проверить mobile.`;

export function PromptLabEditor() {
  return (
    <div className="w-full">
      <label htmlFor="prompt-draft" className="sr-only">
        Поле для написания промта
      </label>
      <textarea
        id="prompt-draft"
        placeholder={promptPlaceholder}
        spellCheck={false}
        className="min-h-[calc(100dvh-9.5rem)] w-full resize-none border border-[var(--color-border)] bg-transparent px-5 py-5 text-base leading-8 text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] md:px-7 md:py-7 md:text-lg"
      />
    </div>
  );
}
