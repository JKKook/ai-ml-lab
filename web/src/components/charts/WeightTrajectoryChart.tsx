"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EpochResult } from "@/lib/backprop";

type WeightKey = "weightsHidden" | "weightsOutput";

type ChartPoint = { weight: number; loss: number; color: string };

type DotProps = {
  cx?: number;
  cy?: number;
  payload?: ChartPoint;
};

function ColoredDot({ cx = 0, cy = 0, payload }: DotProps) {
  return (
    <circle cx={cx} cy={cy} r={2} fill={payload?.color ?? "#6366f1"} opacity={0.8} />
  );
}

function buildChartData(data: EpochResult[], key: WeightKey): ChartPoint[] {
  const total = Math.max(data.length - 1, 1);
  return data.map((d, i) => ({
    weight: parseFloat(d[key].toFixed(5)),
    loss: parseFloat(d.loss.toFixed(6)),
    color: `hsl(${Math.round((1 - i / total) * 240)}, 80%, 65%)`,
  }));
}

type Props = {
  data: EpochResult[];
  weightKey: WeightKey;
  label: string;
};

export function WeightTrajectoryChart({ data, weightKey, label }: Props) {
  const chartData = buildChartData(data, weightKey);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label} trajectory vs loss{" "}
        <span className="text-blue-400 font-normal">blue=early</span>
        {" · "}
        <span className="text-red-400 font-normal">red=late</span>
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 4, right: 8, bottom: 24, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="weight"
            name={label}
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => Number(v).toFixed(2)}
            label={{
              value: label,
              position: "insideBottom",
              offset: -14,
              fill: "#52525b",
              fontSize: 10,
            }}
          />
          <YAxis
            dataKey="loss"
            name="Loss"
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => Number(v).toFixed(3)}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v, name) => [Number(v).toFixed(5), String(name)]}
          />
          <Scatter
            data={chartData}
            shape={(props: DotProps) => <ColoredDot {...props} />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
