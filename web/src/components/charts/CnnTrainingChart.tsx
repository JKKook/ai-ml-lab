"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { step: number; loss: number; testAcc: number };

export function CnnTrainingChart({ data }: { data: Point[] }) {
  return (
    <div className="flex w-full min-w-0 shrink-0 flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Training loss · Test accuracy
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
            yAxisId="loss"
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => v.toFixed(2)}
          />
          <YAxis
            yAxisId="acc"
            orientation="right"
            domain={[0, 1]}
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
          />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v, name) =>
              name === "테스트 정확도"
                ? [`${(Number(v) * 100).toFixed(1)}%`, name]
                : [Number(v).toFixed(4), name]
            }
            labelFormatter={(l) => `step ${l}`}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Line
            yAxisId="loss"
            type="monotone"
            dataKey="loss"
            name="배치 손실 (CE)"
            stroke="#f97316"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Line
            yAxisId="acc"
            type="monotone"
            dataKey="testAcc"
            name="테스트 정확도"
            stroke="#22d3ee"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
        <strong className="font-medium text-zinc-400">읽는 법</strong>: 주황선은 미니배치의
        교차 엔트로피 손실(왼쪽 축), 하늘색선은 학습에 쓰지 않은{" "}
        <strong className="text-zinc-400">테스트 36장 정확도</strong>(오른쪽 축)입니다. 손실이
        내려가면서 정확도가 100%에 붙으면 이 과제를 다 배운 것입니다. 옵티마이저·학습률을
        바꾸면 같은 데이터·같은 초기값에서 곡선 모양이 어떻게 달라지는지 비교해 보세요.
      </p>
    </div>
  );
}
