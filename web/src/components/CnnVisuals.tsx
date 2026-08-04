"use client";

import { CNN_IMG } from "@/lib/cnn";

/** 8×8 입력 이미지를 그레이스케일 격자로 렌더 */
export function PixelImage({
  pixels,
  cell = 10,
}: {
  /** 행 우선 평탄화된 0~1 픽셀 */
  pixels: number[];
  cell?: number;
}) {
  return (
    <div
      className="grid overflow-hidden rounded border border-zinc-700/70"
      style={{
        gridTemplateColumns: `repeat(${CNN_IMG}, ${cell}px)`,
        width: CNN_IMG * cell,
      }}
    >
      {pixels.map((v, i) => {
        const g = Math.round(Math.min(1, Math.max(0, v)) * 255);
        return (
          <div
            key={i}
            style={{ width: cell, height: cell, background: `rgb(${g},${g},${g})` }}
          />
        );
      })}
    </div>
  );
}

/** 3×3 합성곱 필터를 발산형(양수 주황 · 음수 하늘) 히트맵으로 렌더 */
export function FilterHeatmap({
  weights,
  maxAbs,
  cell = 18,
}: {
  weights: number[][];
  /** 필터 전체에서 공유하는 |w| 최대값 (색 스케일 통일용) */
  maxAbs: number;
  cell?: number;
}) {
  const scale = maxAbs > 0 ? maxAbs : 1;
  return (
    <div
      className="grid overflow-hidden rounded border border-zinc-700/70"
      style={{
        gridTemplateColumns: `repeat(${weights[0].length}, ${cell}px)`,
        width: weights[0].length * cell,
      }}
    >
      {weights.flat().map((w, i) => {
        const a = Math.min(1, Math.abs(w) / scale);
        const background =
          w >= 0
            ? `rgba(249, 115, 22, ${a})` // orange-500
            : `rgba(56, 189, 248, ${a})`; // sky-400
        return (
          <div key={i} style={{ width: cell, height: cell, background }} />
        );
      })}
    </div>
  );
}
