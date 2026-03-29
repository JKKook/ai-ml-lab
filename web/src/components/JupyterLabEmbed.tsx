"use client";

import { useMemo, useState } from "react";

type JupyterLabEmbedProps = {
  labBaseUrl: string;
  notebookUrl: string;
};

export function JupyterLabEmbed({ labBaseUrl, notebookUrl }: JupyterLabEmbedProps) {
  const [embed, setEmbed] = useState(false);

  const iframeSrc = useMemo(() => {
    const base = labBaseUrl.replace(/\/$/, "");
    return `${base}/tree`;
  }, [labBaseUrl]);

  return (
    <section className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <a
          href={notebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Open W3 notebook in Jupyter (new tab)
        </a>
        <a
          href={labBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Open Jupyter Lab (new tab)
        </a>
        <button
          type="button"
          onClick={() => setEmbed((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-dashed border-zinc-400 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          {embed ? "Hide embedded Lab" : "Try embedded Lab (iframe)"}
        </button>
      </div>
      {embed ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm dark:border-zinc-700">
          <p className="border-b border-zinc-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-zinc-700 dark:bg-amber-950/40 dark:text-amber-100">
            If this area is blank, Jupyter is blocking iframes. Start Lab with{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
              jupyter lab --config=jupyter_lab_frame.py
            </code>{" "}
            from the repo root, or use the new-tab buttons above.
          </p>
          <iframe
            title="JupyterLab"
            src={iframeSrc}
            className="h-[min(70vh,720px)] w-full bg-white"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      ) : null}
    </section>
  );
}
