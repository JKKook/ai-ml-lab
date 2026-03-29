"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ACTIVATIONS, ActivationName } from "@/lib/activations";
import { linspace } from "@/lib/math";

type Props = {
  activation: ActivationName;
  color: string;
};

export function ActivationCurveChart({ activation, color }: Props) {
  const fn = ACTIVATIONS[activation];
  const data = linspace(-4, 4, 200).map((x) => ({
    z: parseFloat(x.toFixed(2)),
    "f(z)": parseFloat(fn(x).toFixed(5)),
  }));

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Activation curve f(z)
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: -14 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="z"
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => Number(v).toFixed(1)}
            interval={39}
          />
          <YAxis tick={{ fontSize: 9, fill: "#71717a" }} />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v) => [Number(v).toFixed(4), "f(z)"]}
            labelFormatter={(l) => `z = ${Number(l).toFixed(2)}`}
          />
          <ReferenceLine y={0} stroke="#3f3f46" strokeDasharray="4 2" />
          <ReferenceLine x={0} stroke="#3f3f46" strokeDasharray="4 2" />
          <Line
            type="monotone"
            dataKey="f(z)"
            stroke={color}
            dot={false}
            strokeWidth={2.5}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
