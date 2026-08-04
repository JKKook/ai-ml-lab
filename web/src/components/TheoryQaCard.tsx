"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { THEORY_QA_ITEMS } from "@/config/theory-qa";

const TRACK_STYLE = {
  deep: {
    label: "AI · 딥러닝",
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  },
  machine: {
    label: "머신러닝 · 빅데이터분석",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
} as const;

function randomIndex(exclude?: number): number {
  if (THEORY_QA_ITEMS.length <= 1) return 0;
  let next = Math.floor(Math.random() * THEORY_QA_ITEMS.length);
  while (next === exclude) {
    next = Math.floor(Math.random() * THEORY_QA_ITEMS.length);
  }
  return next;
}

const emptySubscribe = () => () => {};

/**
 * 홈이 렌더링될 때마다 딥러닝·머신러닝 이론 Q&A 한 문항을 랜덤으로 보여 주는 카드.
 * 서버 프리렌더 HTML과 어긋나지 않도록, 하이드레이션이 끝난 뒤에만 문항을 보여 줍니다.
 */
export function TheoryQaCard() {
  const [index, setIndex] = useState(() => randomIndex());
  const [revealed, setRevealed] = useState(false);
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const nextQuestion = useCallback(() => {
    setRevealed(false);
    setIndex((prev) => randomIndex(prev));
  }, []);

  const item = hydrated ? THEORY_QA_ITEMS[index] : null;

  return (
    <section
      aria-label="오늘의 이론 Q&A"
      className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            이론 Q&A · 랜덤 한 문제
          </p>
          {item && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TRACK_STYLE[item.track].badge}`}
            >
              {TRACK_STYLE[item.track].label} · {item.topic}
            </span>
          )}
        </div>

        {item ? (
          <>
            <p className="text-sm font-medium leading-relaxed text-zinc-100">
              Q. {item.question}
            </p>

            {revealed ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
                <p className="text-sm leading-relaxed text-zinc-400">
                  <strong className="mr-1 text-zinc-200">A.</strong>
                  {item.answer}
                </p>
                <Link
                  href={item.href}
                  className="mt-3 inline-block text-xs font-semibold text-zinc-300 underline-offset-4 hover:text-white hover:underline"
                >
                  {item.hrefLabel} →
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="self-start rounded-lg border border-zinc-700 bg-zinc-950/60 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                정답 보기
              </button>
            )}

            <button
              type="button"
              onClick={nextQuestion}
              className="self-start text-xs font-medium text-zinc-500 transition hover:text-zinc-300"
            >
              ↻ 다른 문제 보기
            </button>
          </>
        ) : (
          <div aria-hidden className="space-y-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-800" />
          </div>
        )}
      </div>
    </section>
  );
}
