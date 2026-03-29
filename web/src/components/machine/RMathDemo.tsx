"use client";

import { useMemo, useState } from "react";

function mulberry32(seed: number) {
  return function () {
    let a = seed >>> 0;
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normalRandom(rng: () => number) {
  let u1 = rng();
  let u2 = rng();
  while (u1 <= Number.EPSILON) u1 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

type Bin = { count: number; lo: number; hi: number; normH: number };

export function RMathDemo() {
  const [n, setN] = useState(400);
  const [mu, setMu] = useState(50);
  const [sigma, setSigma] = useState(10);
  const [seed, setSeed] = useState(42);

  const { mean, sd, bins } = useMemo(() => {
    const rng = mulberry32(seed);
    const samples: number[] = [];
    for (let i = 0; i < n; i++) {
      samples.push(mu + sigma * normalRandom(rng));
    }
    const meanV = samples.reduce((a, b) => a + b, 0) / n;
    const varSum = samples.reduce((acc, x) => acc + (x - meanV) ** 2, 0);
    const sdV = Math.sqrt(varSum / Math.max(1, n - 1));

    const min = Math.min(...samples);
    const max = Math.max(...samples);
    const span = max - min || 1;
    const binCount = Math.min(28, Math.max(10, Math.round(Math.sqrt(n))));
    const width = span / binCount;
    const counts = new Array(binCount).fill(0) as number[];
    for (const x of samples) {
      const idx = Math.min(binCount - 1, Math.floor((x - min) / width));
      counts[idx]++;
    }
    const maxC = Math.max(...counts, 1);
    const binObjs: Bin[] = counts.map((count, i) => ({
      count,
      lo: min + i * width,
      hi: min + (i + 1) * width,
      normH: count / maxC,
    }));
    return { mean: meanV, sd: sdV, bins: binObjs };
  }, [n, mu, sigma, seed]);

  return (
    <div className="space-y-4 rounded-xl border border-emerald-800/50 bg-zinc-900/50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="flex flex-col gap-1 text-xs text-zinc-500">
          표본 크기 n
          <input
            type="range"
            min={50}
            max={2000}
            step={50}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full sm:w-48"
          />
          <span className="font-mono text-zinc-300">{n}</span>
        </label>
        <label className="flex flex-col gap-1 text-xs text-zinc-500">
          기대값 μ
          <input
            type="number"
            value={mu}
            onChange={(e) => setMu(Number(e.target.value))}
            className="w-24 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 font-mono text-zinc-200"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-zinc-500">
          표준편차 σ
          <input
            type="number"
            min={1}
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-24 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 font-mono text-zinc-200"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-zinc-500">
          시드 (재현성)
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) >>> 0)}
            className="w-28 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 font-mono text-zinc-200"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 font-mono text-sm text-zinc-300">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            R에서 대응하는 코드
          </p>
          <code className="block whitespace-pre-wrap text-xs leading-relaxed text-emerald-200/90">
            {`set.seed(${seed})
x <- rnorm(${n}, mean = ${mu}, sd = ${sigma})
mean(x)    # ${mean.toFixed(4)}
sd(x)      # ${sd.toFixed(4)}
hist(x, breaks = "FD", main = "", col = "steelblue")`}
          </code>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-400">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            브라우저에서 계산한 요약
          </p>
          <p>
            표본 평균:{" "}
            <span className="font-mono text-zinc-200">{mean.toFixed(4)}</span>
          </p>
          <p>
            표본 표준편차 (분모 <span className="font-mono text-zinc-500">n−1</span>, R의{" "}
            <code className="text-zinc-300">sd</code>와 동일):{" "}
            <span className="font-mono text-zinc-200">{sd.toFixed(4)}</span>
          </p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          히스토그램 (막대 높이 ∝ 도수)
        </p>
        <div className="flex h-36 items-end gap-px rounded border border-zinc-800/80 bg-zinc-950/40 px-1 pb-1 pt-2">
          {bins.map((b, i) => (
            <div
              key={i}
              title={`[${b.lo.toFixed(2)}, ${b.hi.toFixed(2)}): ${b.count}`}
              className="min-w-0 flex-1 rounded-t bg-emerald-500/70 hover:bg-emerald-400/80"
              style={{ height: `${Math.max(4, b.normH * 100)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
