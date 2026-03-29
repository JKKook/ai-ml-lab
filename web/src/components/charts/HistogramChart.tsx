"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BinEntry } from "@/lib/math";

type Props = {
  data: BinEntry[];
  color: string;
  label: string;
};

export function HistogramChart({ data, color, label }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -24 }}>
          <XAxis
            dataKey="bin"
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => Number(v).toFixed(1)}
            interval={Math.floor(data.length / 5)}
          />
          <YAxis tick={{ fontSize: 9, fill: "#71717a" }} />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            labelStyle={{ color: "#a1a1aa" }}
            formatter={(v) => [Number(v).toLocaleString("en-US"), "count"]}
            labelFormatter={(l) => `z ≈ ${Number(l).toFixed(3)}`}
          />
          <Bar
            dataKey="count"
            fill={color}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
