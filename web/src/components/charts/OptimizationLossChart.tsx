"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { step: number; loss: number };

type Props = {
  data: Point[];
  title?: string;
};

export function OptimizationLossChart({ data, title = "Loss f(x, y)" }: Props) {
  return (
    <div className="flex w-full min-w-0 shrink-0 flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {title}
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 24, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="step"
            tick={{ fontSize: 9, fill: "#71717a" }}
            label={{
              value: "Step",
              position: "insideBottom",
              offset: -14,
              fill: "#52525b",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) =>
              v >= 1000 || (v > 0 && v < 0.01) ? v.toExponential(1) : v.toFixed(2)
            }
          />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v) => [Number(v).toExponential(4), "loss"]}
            labelFormatter={(l) => `step ${l}`}
          />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="#f97316"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
        <strong className="font-medium text-zinc-400">읽는 법</strong>: 세로축은 손실{" "}
        <code className="rounded bg-zinc-800 px-1 font-mono text-[10px] text-zinc-400">f(x,y)</code>
        — <strong className="text-zinc-400">위쪽일수록 아직 크게 틀린 상태</strong>입니다. 처음
        구간에서 <strong className="text-zinc-400">아래로 빠르게 내려가면</strong> 같은 스텝 수
        안에 손실을 많이 줄인 것이고, 뒤쪽에서{" "}
        <strong className="text-zinc-400">거의 수평에 가깝게 낮게 붙으면</strong> 목표에 가깝게
        맞춘 편입니다. 다만 위아래로 크게 출렁이거나 계속 높게 유지되면 수렴이 더딘·불안정할 수
        있습니다.
      </p>
    </div>
  );
}
