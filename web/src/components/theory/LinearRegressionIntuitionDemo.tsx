"use client";

import { useMemo, useState } from "react";

/** 고정된 소표본 — R에서 `plot(x,y); abline(lm(y~x))` 로 설명할 때와 비슷한 스케일 */
const DEMO_POINTS: { x: number; y: number }[] = [
  { x: 0.5, y: 0.35 },
  { x: 1.0, y: 1.1 },
  { x: 1.5, y: 1.25 },
  { x: 2.0, y: 2.0 },
  { x: 2.5, y: 2.15 },
  { x: 3.0, y: 2.9 },
];

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function LinearRegressionIntuitionDemo() {
  const [w, setW] = useState(0.85);
  const [b, setB] = useState(0.12);

  const mse = useMemo(() => {
    const n = DEMO_POINTS.length;
    const sum = DEMO_POINTS.reduce(
      (s, p) => s + (p.y - (w * p.x + b)) ** 2,
      0
    );
    return sum / n;
  }, [w, b]);

  const pad = 36;
  const wSvg = 320;
  const hSvg = 220;
  const xMax = 3.5;
  const yMax = 3.5;

  const sx = (x: number) => pad + (x / xMax) * (wSvg - pad * 2);
  const sy = (y: number) => hSvg - pad - (y / yMax) * (hSvg - pad * 2);

  const x0 = 0;
  const x1 = xMax;
  const lineY0 = w * x0 + b;
  const lineY1 = w * x1 + b;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <p className="mb-3 text-xs leading-relaxed text-zinc-500">
        R에서 <code className="text-zinc-400">plot(y ~ x)</code>와{" "}
        <code className="text-zinc-400">abline(lm(y ~ x))</code>으로 보여 주는 것과 같은
        구조입니다. 슬라이더로 기울기·절편을 바꾸며 MSE(평균 제곱 오차)가 어떻게 달라지는지
        확인해 보세요.
      </p>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="flex min-w-[200px] flex-col gap-1 text-xs text-zinc-500">
          기울기 w (가중치에 해당)
          <input
            type="range"
            min={-0.25}
            max={1.6}
            step={0.01}
            value={w}
            onChange={(e) => setW(Number(e.target.value))}
            className="accent-violet-500"
          />
          <span className="font-mono text-zinc-300">{w.toFixed(2)}</span>
        </label>
        <label className="flex min-w-[200px] flex-col gap-1 text-xs text-zinc-500">
          절편 b (편향에 해당)
          <input
            type="range"
            min={-0.5}
            max={1.2}
            step={0.02}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="accent-violet-500"
          />
          <span className="font-mono text-zinc-300">{b.toFixed(2)}</span>
        </label>
        <button
          type="button"
          onClick={() => {
            const n = DEMO_POINTS.length;
            const mx =
              DEMO_POINTS.reduce((s, p) => s + p.x, 0) / n;
            const my =
              DEMO_POINTS.reduce((s, p) => s + p.y, 0) / n;
            let num = 0;
            let den = 0;
            for (const p of DEMO_POINTS) {
              num += (p.x - mx) * (p.y - my);
              den += (p.x - mx) ** 2;
            }
            const wHat = den > 1e-9 ? num / den : 0;
            const bHat = my - wHat * mx;
            setW(clamp(wHat, -0.25, 1.6));
            setB(clamp(bHat, -0.5, 1.2));
          }}
          className="rounded-lg border border-violet-600/50 bg-violet-950/40 px-3 py-2 text-xs font-medium text-violet-200 hover:bg-violet-950/70"
        >
          최소 제곱 직선에 맞추기 (lm(y~x)와 같은 기울기·절편)
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={wSvg}
          height={hSvg}
          className="mx-auto text-zinc-500"
          aria-label="선형 회귀 직관 그래프"
        >
          <rect
            width="100%"
            height="100%"
            fill="rgb(9 9 11 / 0.5)"
            rx={8}
            className="stroke-zinc-800"
            strokeWidth={1}
          />
          {[0, 1, 2, 3].map((t) => (
            <g key={t}>
              <line
                x1={sx(t)}
                y1={sy(0)}
                x2={sx(t)}
                y2={sy(yMax)}
                stroke="currentColor"
                strokeOpacity={0.15}
              />
              <line
                x1={sx(0)}
                y1={sy(t)}
                x2={sx(xMax)}
                y2={sy(t)}
                stroke="currentColor"
                strokeOpacity={0.15}
              />
            </g>
          ))}
          <line
            x1={sx(x0)}
            y1={sy(clamp(lineY0, 0, yMax))}
            x2={sx(x1)}
            y2={sy(clamp(lineY1, 0, yMax))}
            stroke="rgb(167 139 250)"
            strokeWidth={2}
          />
          {DEMO_POINTS.map((p, i) => (
            <g key={i}>
              <line
                x1={sx(p.x)}
                y1={sy(p.y)}
                x2={sx(p.x)}
                y2={sy(w * p.x + b)}
                stroke="rgb(113 113 122)"
                strokeDasharray="4 3"
                strokeOpacity={0.7}
              />
              <circle
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={5}
                fill="rgb(244 244 245)"
                className="stroke-zinc-600"
                strokeWidth={1}
              />
            </g>
          ))}
          <text x={sx(0.2)} y={hSvg - 10} className="fill-zinc-500 text-[10px]">
            x
          </text>
          <text x={8} y={sy(yMax - 0.2)} className="fill-zinc-500 text-[10px]">
            y
          </text>
        </svg>
      </div>

      <p className="mt-3 font-mono text-xs text-zinc-400">
        MSE = {mse.toFixed(4)} · 모형: ŷ = {w.toFixed(2)}x + {b.toFixed(2)}
      </p>
    </div>
  );
}
