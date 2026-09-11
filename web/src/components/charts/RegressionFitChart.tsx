"use client";

import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PredictionRow, SamplePoint } from "@/lib/linear-regression";

type Props = {
  rows: PredictionRow[];
  slope: number;
  intercept: number;
  targetSlope: number;
  targetIntercept: number;
  showResiduals: boolean;
};

/** 직선을 양 끝 두 점으로 환산 — Scatter의 line 옵션으로 그린다. */
function linePoints(slope: number, intercept: number, x0: number, x1: number) {
  return [
    { x: x0, y: slope * x0 + intercept },
    { x: x1, y: slope * x1 + intercept },
  ];
}

export function RegressionFitChart({
  rows,
  slope,
  intercept,
  targetSlope,
  targetIntercept,
  showResiduals,
}: Props) {
  const xs = rows.map((r) => r.x);
  const ys = rows.map((r) => r.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padX = (maxX - minX) * 0.08;
  const padY = (maxY - minY) * 0.12;
  const x0 = minX - padX;
  const x1 = maxX + padX;
  const points: SamplePoint[] = rows.map((r) => ({ x: r.x, y: r.y }));

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        경력 vs 연봉 · 회귀 직선과 잔차
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 8, right: 16, bottom: 24, left: 14 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[x0, x1]}
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => v.toFixed(1)}
            label={{
              value: "YearsExperience (년)",
              position: "insideBottom",
              offset: -14,
              fill: "#52525b",
              fontSize: 10,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[minY - padY, maxY + padY]}
            tick={{ fontSize: 9, fill: "#71717a" }}
            tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload as SamplePoint;
              const row = rows.find((r) => r.x === d.x && r.y === d.y);
              if (!row) return null;
              return (
                <div className="rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-2 text-xs text-zinc-200">
                  <div className="font-medium">경력 {row.x.toFixed(1)}년</div>
                  <div className="mt-1 font-mono text-[11px] text-zinc-400">
                    실제 {Math.round(row.y).toLocaleString("en-US")}
                    <br />
                    예측 {Math.round(row.yHat).toLocaleString("en-US")}
                    <br />
                    오차 {row.error >= 0 ? "+" : ""}
                    {Math.round(row.error).toLocaleString("en-US")}
                  </div>
                </div>
              );
            }}
          />

          {/* 잔차 — 각 점에서 회귀선까지의 수직 거리. 이 길이의 제곱 합이 곧 손실이다. */}
          {showResiduals &&
            rows.map((r, i) => (
              <ReferenceLine
                key={i}
                segment={[
                  { x: r.x, y: r.y },
                  { x: r.x, y: r.yHat },
                ]}
                stroke={r.error >= 0 ? "#34d399" : "#f87171"}
                strokeWidth={1.2}
                strokeOpacity={0.7}
                ifOverflow="hidden"
              />
            ))}

          <Scatter
            name="최소 제곱 해"
            data={linePoints(targetSlope, targetIntercept, x0, x1)}
            fill="transparent"
            line={{ stroke: "#71717a", strokeWidth: 1.5, strokeDasharray: "5 4" }}
            shape={() => <g />}
            isAnimationActive={false}
          />
          <Scatter
            name="현재 직선"
            data={linePoints(slope, intercept, x0, x1)}
            fill="transparent"
            line={{ stroke: "#a78bfa", strokeWidth: 2.5 }}
            shape={() => <g />}
            isAnimationActive={false}
          />
          <Scatter
            name="데이터"
            data={points}
            fill="#f4f4f5"
            stroke="#52525b"
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-col gap-1.5 text-[11px] leading-relaxed text-zinc-500">
        <p>
          <strong className="font-medium text-zinc-400">읽는 법</strong> · 흰 점은 CSV에 담긴
          관측값 {rows.length}건입니다. <span className="text-violet-300">보라 실선</span>이 지금
          스텝의 예측선, <span className="text-zinc-400">회색 점선</span>이 최소 제곱으로 한 번에
          구한 정답선입니다. 학습이 끝나면 둘이 겹칩니다.
        </p>
        <p>
          점에서 선까지 내린 세로선이 <strong className="text-zinc-400">잔차</strong>(실제 −
          예측)입니다. <span className="text-emerald-400">초록</span>은 실제가 예측보다 높은
          경우, <span className="text-red-400">빨강</span>은 낮은 경우입니다. 이 세로선 길이를
          제곱해 모두 더한 값이 바로 회귀가 줄이려는 목표이고, 그래서{" "}
          <strong className="text-zinc-400">가장 잘 맞는 직선</strong>이란 세로선들의 제곱 합이
          가장 작아지는 직선을 말합니다.
        </p>
        <p>
          <strong className="font-medium text-zinc-400">기울기와 상관관계</strong> · 점들이 오른쪽
          위로 몰려 있으면 두 변수는 양의 상관입니다. 기울기는 “경력이 1년 늘 때 연봉이 평균
          얼마 오르는가”로 읽고, 점들이 선 주변에 얼마나 촘촘히 모였는지가 상관계수 r과 R²로
          요약됩니다.
        </p>
      </div>
    </div>
  );
}
