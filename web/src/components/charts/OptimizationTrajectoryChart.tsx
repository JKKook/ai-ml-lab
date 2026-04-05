"use client";

import {
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { x: number; y: number; step: number };

type Props = {
  data: Point[];
};

export function OptimizationTrajectoryChart({ data }: Props) {
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs, 1);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, 1);
  const maxY = Math.max(...ys, 1);
  const padX = Math.max(0.3, (maxX - minX) * 0.08);
  const padY = Math.max(0.3, (maxY - minY) * 0.08);

  return (
    <div className="flex w-full min-w-0 shrink-0 flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        (x, y) 궤적 — Rosenbrock
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 8, right: 12, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[minX - padX, maxX + padX]}
            tick={{ fontSize: 9, fill: "#71717a" }}
            name="x"
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[minY - padY, maxY + padY]}
            tick={{ fontSize: 9, fill: "#71717a" }}
            name="y"
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload as Point;
              return (
                <div className="rounded-md border border-zinc-600 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-200">
                  <div>step {d.step}</div>
                  <div className="font-mono text-zinc-400">
                    x={d.x.toFixed(4)} y={d.y.toFixed(4)}
                  </div>
                </div>
              );
            }}
          />
          <ReferenceDot
            x={1}
            y={1}
            r={5}
            fill="#22c55e"
            stroke="#86efac"
            strokeWidth={1}
            label={{ value: "min", fill: "#86efac", fontSize: 10 }}
          />
          <Scatter
            name="path"
            data={data}
            fill="#38bdf8"
            line={{ stroke: "#38bdf8", strokeWidth: 1.5 }}
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
        <strong className="font-medium text-zinc-400">읽는 법</strong>: 초록 점{" "}
        <span className="text-zinc-400">(1, 1)</span>이 손실이 가장 작은 목표입니다. 파란 선이
        시간이 지나며 그 근처로 <strong className="text-zinc-400">모이면</strong> 잘 수렴한
        편입니다. Rosenbrock은 굽은 골짜기라서{" "}
        <strong className="text-zinc-400">직선으로 가는 것이 항상 최선은 아닙니다</strong>. 목표
        주변을 맴돌거나 멀리 튕겨 나가면 학습률·옵티마이저 설정을 바꿔 보세요.
      </p>
    </div>
  );
}
