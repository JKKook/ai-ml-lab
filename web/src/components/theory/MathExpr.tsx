import "katex/dist/katex.min.css";
import katex from "katex";

type MathExprProps = {
  tex: string;
  display?: boolean;
  className?: string;
};

export function MathExpr({ tex, display = false, className }: MathExprProps) {
  const html = katex.renderToString(tex.trim(), {
    displayMode: display,
    throwOnError: false,
    strict: false,
  });

  if (display) {
    return (
      <div
        className={`my-4 overflow-x-auto py-1 text-center [&_.katex-display]:my-0 ${className ?? ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`mx-0.5 inline align-baseline text-zinc-200 ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
