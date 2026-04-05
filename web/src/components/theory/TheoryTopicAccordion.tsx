import type { ReactNode } from "react";

type TheoryTopicAccordionProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** 펼쳤을 때 테두리 강조 (Tailwind `open:` 클래스) */
  openBorderClassName?: string;
  /** 화살표 색 */
  chevronClassName?: string;
  /** `<details>`에 추가할 클래스 */
  detailsClassName?: string;
  /** 앵커 링크·목차용 (예: theory-forward) */
  id?: string;
};

export function TheoryTopicAccordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
  openBorderClassName = "open:border-zinc-500/35",
  chevronClassName = "text-white",
  detailsClassName = "",
  id,
}: TheoryTopicAccordionProps) {
  return (
    <details
      id={id}
      className={`group mb-3 scroll-mt-24 rounded-xl border border-zinc-700/70 bg-zinc-900/40 ${openBorderClassName} ${detailsClassName}`.trim()}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left hover:bg-zinc-800/40 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="block text-sm font-semibold text-zinc-100">{title}</div>
          {subtitle ? (
            <div className="mt-0.5 block text-xs text-zinc-500">{subtitle}</div>
          ) : null}
        </div>
        <span
          className={`shrink-0 text-xs transition-transform duration-200 group-open:rotate-180 ${chevronClassName}`}
        >
          ▼
        </span>
      </summary>
      <div className="border-t border-zinc-800/80 px-4 py-4 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
    </details>
  );
}
