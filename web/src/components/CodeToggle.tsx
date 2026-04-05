type CodeToggleProps = {
  summary: string;
  caption?: string;
  code: string;
  language?: string;
  /** compact: 카드 안에 넣을 때 높이·패딩 축소 (그리드 레이아웃용) */
  variant?: "default" | "compact";
  className?: string;
};

/** 노트북·강의 코드를 접었다 펼칠 때 사용 (네이티브 details 요소). */
export function CodeToggle({
  summary,
  caption,
  code,
  language = "Python",
  variant = "default",
  className = "",
}: CodeToggleProps) {
  const isCompact = variant === "compact";

  return (
    <details
      className={`group w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-900/35 open:border-zinc-600/80 ${isCompact ? "mb-0" : "mb-4"} ${className}`}
    >
      <summary
        className={`flex cursor-pointer list-none items-start justify-between gap-2 border-zinc-800/80 text-zinc-200 hover:bg-zinc-800/35 [&::-webkit-details-marker]:hidden ${
          isCompact ? "px-3 py-2 text-xs font-medium" : "px-4 py-3 text-sm font-medium"
        }`}
      >
        <span className="min-w-0 flex-1 select-none break-words pr-1">{summary}</span>
        <span
          className={`mt-0.5 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180 ${isCompact ? "text-[10px]" : "text-xs"}`}
        >
          ▼
        </span>
      </summary>
      <div
        className={`min-w-0 max-w-full border-t border-zinc-800/80 ${isCompact ? "px-3 pb-3 pt-2" : "px-4 pb-4 pt-3"}`}
      >
        <div className="mb-2 flex min-w-0 flex-wrap items-start justify-between gap-2">
          {caption ? (
            <p className="min-w-0 max-w-full flex-1 text-[11px] leading-relaxed break-words text-zinc-500">
              {caption}
            </p>
          ) : (
            <span className="min-w-0 flex-1" />
          )}
          <span className="shrink-0 rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-zinc-400">
            {language}
          </span>
        </div>
        <pre
          className={`box-border w-full min-w-0 max-w-full overflow-x-auto overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono leading-relaxed text-emerald-100/90 shadow-inner [overflow-wrap:normal] ${
            isCompact
              ? "max-h-52 text-[10px] sm:max-h-64"
              : "max-h-[min(70vh,28rem)] p-4 text-[11px]"
          }`}
        >
          <code className="block min-w-0 max-w-full whitespace-pre">{code.trimEnd()}</code>
        </pre>
      </div>
    </details>
  );
}
