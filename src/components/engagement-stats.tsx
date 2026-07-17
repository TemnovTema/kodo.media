import type { EngagementStats as EngagementStatsType } from "@/lib/content";

type EngagementStatsProps = {
  engagement: EngagementStatsType;
  compact?: boolean;
};

type StatIconProps = {
  kind: "likes" | "views" | "comments";
};

function formatCount(value: number) {
  return value.toLocaleString("ru-RU");
}

function StatIcon({ kind }: StatIconProps) {
  const className = "h-[0.8rem] w-[0.8rem] shrink-0 text-[var(--color-text-soft)]";

  if (kind === "likes") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className={className}
      >
        <path
          d="M8 13.2 2.7 8c-1.1-1.1-1.1-2.9 0-4 .9-.9 2.4-1.1 3.5-.3L8 4.9l1.8-1.2c1.1-.8 2.6-.6 3.5.3 1.1 1.1 1.1 2.9 0 4L8 13.2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "views") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className={className}
      >
        <path
          d="M1.7 8s2.3-3.7 6.3-3.7S14.3 8 14.3 8 12 11.7 8 11.7 1.7 8 1.7 8Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8" r="1.9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M3 3.3h10v6.4H8.5L5.2 12V9.7H3V3.3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EngagementStats({
  engagement,
  compact = false,
}: EngagementStatsProps) {
  const baseClass = compact
    ? "font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
    : "font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${baseClass}`}>
      <span
        aria-label={`${formatCount(engagement.likes)} лайков`}
        className="inline-flex items-center gap-2"
      >
        <span>{formatCount(engagement.likes)}</span>
        <StatIcon kind="likes" />
      </span>
      <span
        aria-label={`${formatCount(engagement.views)} просмотров`}
        className="inline-flex items-center gap-2"
      >
        <span>{formatCount(engagement.views)}</span>
        <StatIcon kind="views" />
      </span>
      <span
        aria-label={`${formatCount(engagement.comments)} комментариев`}
        className="inline-flex items-center gap-2"
      >
        <span>{formatCount(engagement.comments)}</span>
        <StatIcon kind="comments" />
      </span>
    </div>
  );
}
