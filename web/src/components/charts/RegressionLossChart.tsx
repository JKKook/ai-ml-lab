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
import { StepResult } from "@/lib/linear-regression";

type Props = { data: StepResult[] };

export function RegressionLossChart({ data }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Training loss (표준화 공간 MSE)
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 24, left: -6 }}>
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
            tickFormatter={(v: number) => v.toFixed(2)}
          />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v) => [Number(v).toFixed(6), "loss"]}
            labelFormatter={(l) => `step ${l}`}
          />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="#ef4444"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
