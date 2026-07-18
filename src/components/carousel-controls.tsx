type CarouselControlsProps = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  label: string;
};

export function CarouselControls({
  canScrollPrev,
  canScrollNext,
  onScrollPrev,
  onScrollNext,
  label,
}: CarouselControlsProps) {
  return (
    <div className="flex shrink-0 items-center gap-2" aria-label={label}>
      <button
        type="button"
        onClick={onScrollPrev}
        disabled={!canScrollPrev}
        aria-label="Прокрутить назад"
        className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] font-mono text-[0.82rem] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--color-border)] disabled:hover:bg-transparent"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onScrollNext}
        disabled={!canScrollNext}
        aria-label="Прокрутить вперёд"
        className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] font-mono text-[0.82rem] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--color-border)] disabled:hover:bg-transparent"
      >
        →
      </button>
    </div>
  );
}
