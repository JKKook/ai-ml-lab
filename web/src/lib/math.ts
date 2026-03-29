/** Box-Muller transform using a uniform source (e.g. `Math.random` or a seeded PRNG). */
export function randnWithRng(uniform: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = uniform();
  while (v === 0) v = uniform();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/** Box-Muller transform for standard normal random number. */
export function randn(): number {
  return randnWithRng(Math.random);
}

export function randnMatrixWithRng(
  rows: number,
  cols: number,
  uniform: () => number
): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => randnWithRng(uniform))
  );
}

export function randnMatrix(rows: number, cols: number): number[][] {
  return randnMatrixWithRng(rows, cols, Math.random);
}

/**
 * Deterministic uniform draws in [0, 1). Same seed ⇒ same stream on server and client
 * (avoids React hydration mismatches when sampling initial state).
 */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function linearTransform(
  inputs: number[][],
  weights: number[],
  bias: number
): number[] {
  return inputs.map((row) =>
    row.reduce((sum, val, j) => sum + val * weights[j], bias)
  );
}

export type BinEntry = { bin: number; count: number };

export function histogramBins(
  data: number[],
  numBins: number,
  min: number,
  max: number
): BinEntry[] {
  const width = (max - min) / numBins;
  if (width <= 0) return [];

  const counts = new Array<number>(numBins).fill(0);
  for (const v of data) {
    const idx = Math.floor((v - min) / width);
    const clamped = Math.max(0, Math.min(numBins - 1, idx));
    counts[clamped]++;
  }

  return counts.map((count, i) => ({
    bin: parseFloat((min + (i + 0.5) * width).toFixed(3)),
    count,
  }));
}

export function linspace(start: number, stop: number, n: number): number[] {
  const step = (stop - start) / (n - 1);
  return Array.from({ length: n }, (_, i) => start + i * step);
}

export type DataStats = {
  n: number;
  mean: string;
  std: string;
  min: string;
  max: string;
};

export function describeArray(data: number[]): DataStats {
  const n = data.length;
  if (n === 0) return { n: 0, mean: "—", std: "—", min: "—", max: "—" };

  const mean = data.reduce((a, b) => a + b, 0) / n;
  const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  const sorted = [...data].sort((a, b) => a - b);

  return {
    n,
    mean: mean.toFixed(4),
    std: Math.sqrt(variance).toFixed(4),
    min: sorted[0].toFixed(4),
    max: sorted[n - 1].toFixed(4),
  };
}

export type Point3D = { x: number; y: number; z: number; value: number };
