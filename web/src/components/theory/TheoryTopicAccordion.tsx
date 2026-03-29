import type { ReactNode } from "react";

type TheoryTopicAccordionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function TheoryTopicAccordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: TheoryTopicAccordionProps) {
  return (
    <details
      className="group mb-3 rounded-xl border border-zinc-700/70 bg-zinc-900/40 open:border-violet-500/30"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left hover:bg-zinc-800/40 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-zinc-100">{title}</span>
          {subtitle ? (
            <span className="mt-0.5 block text-xs text-zinc-500">{subtitle}</span>
          ) : null}
        </div>
        <span className="shrink-0 text-xs text-violet-400/80 transition-transform duration-200 group-open:rotate-180">
          ▼
        </span>
      </summary>
      <div className="border-t border-zinc-800/80 px-4 py-4 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
    </details>
  );
}
