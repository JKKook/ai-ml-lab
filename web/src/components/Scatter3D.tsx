"use client";

import { useEffect, useRef } from "react";
import { Point3D } from "@/lib/math";

type Props = {
  points: Point3D[];
  label?: string;
};

function valueToHsl(t: number): string {
  const hue = Math.round((1 - t) * 240); // blue (240) → red (0)
  return `hsl(${hue}, 90%, 65%)`;
}

function project3D(
  x: number,
  y: number,
  z: number,
  angle: number,
  w: number,
  h: number
): { px: number; py: number; depth: number } {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rx = cos * x + sin * z;
  const rz = -sin * x + cos * z;
  const d = 6;
  const scale = d / (d + rz + 2);
  return {
    px: w / 2 + rx * scale * w * 0.22,
    py: h / 2 - y * scale * h * 0.22,
    depth: scale,
  };
}

export function Scatter3D({ points, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const minVal = Math.min(...points.map((p) => p.value));
    const maxVal = Math.max(...points.map((p) => p.value));
    const range = maxVal - minVal || 1;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const projected = points
        .map((p) => {
          const { px, py, depth } = project3D(
            p.x, p.y, p.z, angleRef.current, width, height
          );
          const t = (p.value - minVal) / range;
          return { px, py, depth, t };
        })
        .sort((a, b) => a.depth - b.depth); // painter's algorithm: far → near

      for (const { px, py, depth, t } of projected) {
        const r = Math.max(1, depth * 3.5);
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = valueToHsl(t);
        ctx.globalAlpha = 0.75;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      angleRef.current += 0.005;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [points]);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          {label}
        </p>
      )}
      <canvas
        ref={canvasRef}
        width={360}
        height={240}
        className="w-full rounded-lg bg-zinc-950/60"
      />
      <p className="text-[10px] text-zinc-600">
        dims [0, 1, 2] of inputs · color = activation value
        <span className="ml-2 text-blue-500">■</span> low
        <span className="ml-1 text-red-500">■</span> high
      </p>
      <p className="text-[10px] text-zinc-500">
        축: 입력 벡터의 0·1·2번 성분 · 색: 해당 샘플의 f(z) (낮음 파랑 → 높음 빨강)
      </p>
    </div>
  );
}
