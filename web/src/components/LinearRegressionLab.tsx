"use client";

import { useMemo, useState } from "react";
import { CodeToggle } from "@/components/CodeToggle";
import { RegressionFitChart } from "@/components/charts/RegressionFitChart";
import { RegressionLossChart } from "@/components/charts/RegressionLossChart";
import {
  SNIPPET_CLOSED_FORM,
  SNIPPET_NUMPY_GRADIENT_DESCENT,
  SNIPPET_PANDAS_LOAD,
  SNIPPET_SKLEARN_FIT,
  SNIPPET_TORCH_LINEAR,
} from "@/config/linear-regression-snippets";
import { useLinearRegressionDemo } from "@/hooks/useLinearRegressionDemo";
import { SamplePoint, predictionRows } from "@/lib/linear-regression";

const LEARNING_RATES = [0.005, 0.01, 0.05, 0.1, 0.5, 1.0, 1.05];

const won = (v: number) => Math.round(v).toLocaleString("en-US");
/** 제곱오차는 자릿수가 커서 백만 단위로 줄여 읽는다. */
const millions = (v: number) => (v / 1e6).toFixed(1);

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className="font-mono text-sm font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold text-zinc-200">{children}</h2>
  );
}

export function LinearRegressionLab({ points }: { points: SamplePoint[] }) {
  const demo = useLinearRegressionDemo(points);
  const [showResiduals, setShowResiduals] = useState(true);
  const [queryX, setQueryX] = useState(5);
  const r = demo.currentResult;
  const progress = (demo.currentStep / Math.max(demo.totalSteps - 1, 1)) * 100;

  const rows = useMemo(
    () => predictionRows(points, r.slope, r.intercept),
    [points, r.slope, r.intercept]
  );
  const sse = rows.reduce((s, row) => s + row.squaredError, 0);
  const predicted = r.slope * queryX + r.intercept;
  const predictedTarget = demo.target.slope * queryX + demo.target.intercept;
  const { stats } = demo;

  return (
    <>
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
        <button
          onClick={demo.togglePlay}
          className={`rounded-lg border px-5 py-2 text-sm font-semibold transition ${
            demo.isPlaying
              ? "border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
              : "border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
          }`}
        >
          {demo.isPlaying ? "⏸ 일시정지" : "▶ 재생"}
        </button>
        <button
          onClick={demo.reset}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
        >
          ↺ 처음
        </button>
        <button
          onClick={demo.jumpToEnd}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
        >
          ⏭ 끝으로
        </button>

        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">속도</label>
          <input
            type="range"
            min={1}
            max={20}
            value={demo.speed}
            onChange={(e) => demo.setSpeed(Number(e.target.value))}
            className="w-28 accent-violet-500"
          />
          <span className="w-20 font-mono text-xs text-zinc-400">
            {demo.speed} 스텝/틱
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">학습률 LR</label>
          <select
            value={demo.learningRate}
            onChange={(e) => demo.setLearningRate(Number(e.target.value))}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300"
          >
            {LEARNING_RATES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-500">
          <input
            type="checkbox"
            checked={showResiduals}
            onChange={(e) => setShowResiduals(e.target.checked)}
            className="accent-violet-500"
          />
          잔차선 표시
        </label>

        <div className="ml-auto text-right">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">스텝</p>
          <p className="font-mono text-2xl font-extrabold text-violet-400">
            {demo.currentStep}
          </p>
          <p className="text-[10px] text-zinc-600">/ {demo.totalSteps - 1}</p>
        </div>
      </div>

      {demo.diverged && (
        <div className="mb-4 rounded-xl border border-amber-700/60 bg-amber-950/30 px-4 py-3 text-xs leading-relaxed text-amber-200">
          학습률이 너무 커서 <strong>{demo.totalSteps}스텝에서 값이 발산</strong>했습니다.
          손실이 줄지 않고 치솟는 모습이 바로 &ldquo;학습률이 크면 튕긴다&rdquo;는 상황입니다.
          LR을 0.1 이하로 낮춰 비교해 보세요.
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step scrubber */}
      <p className="mb-2 text-xs text-zinc-500">
        슬라이더로 스텝을 옮기면 그 시점의 직선·손실·계수·예측표가 한 번에 갱신됩니다.
      </p>
      <div className="mb-6">
        <input
          type="range"
          min={0}
          max={Math.max(demo.totalSteps - 1, 1)}
          value={demo.currentStep}
          onChange={(e) => demo.setCurrentStep(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Left: fit */}
        <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <RegressionFitChart
            rows={rows}
            slope={r.slope}
            intercept={r.intercept}
            targetSlope={demo.target.slope}
            targetIntercept={demo.target.intercept}
            showResiduals={showResiduals}
          />
          <div className="mt-4 flex flex-col gap-2">
            <CodeToggle
              variant="compact"
              summary="코드 보기 · CSV 읽기 (pandas)"
              caption="이 페이지도 같은 파일(data/Salary_Data.csv)을 서버에서 읽어 넘겨 줍니다."
              code={SNIPPET_PANDAS_LOAD}
            />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 최소 제곱 해석해 — 회색 점선과 대응"
              caption="단순 선형 회귀는 반복 없이 공식 한 줄로 정답을 구할 수 있습니다."
              code={SNIPPET_CLOSED_FORM}
            />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · scikit-learn 한 줄 학습"
              caption="실무에서는 보통 이렇게 씁니다. 아래 지표와 값이 일치합니다."
              code={SNIPPET_SKLEARN_FIT}
            />
          </div>
        </div>

        {/* Right: loss + stats */}
        <div className="flex min-w-0 flex-col gap-5">
          <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="mb-2 text-xs leading-relaxed text-zinc-500">
              경사하강이 실제로 줄이는 값은 표준화 공간의 MSE입니다. 시작값 1.0 근처에서
              0에 가깝게 내려가면 직선이 데이터에 맞춰졌다는 뜻입니다.
            </p>
            <RegressionLossChart data={demo.chartData} />
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              <strong className="font-medium text-zinc-400">읽는 법</strong> · 곡선이 가파르게
              떨어지다 평평해지면 수렴한 것입니다. 끝까지 기울어져 있으면 스텝이 모자란
              것이고(LR 0.005), 톱니처럼 튀거나 위로 솟으면 학습률이 큰 것입니다(LR 1.0 이상).
              평평해진 뒤의 높이는 0이 아니라 <strong className="text-zinc-400">데이터 자체의
              흩어짐</strong>에서 오는 한계치입니다.
            </p>
            <CodeToggle
              variant="compact"
              className="mt-3"
              summary="코드 보기 · 표준화 + 경사하강 루프 (NumPy)"
              caption="웹 데모와 같은 순서입니다. 표준화를 빼면 원 스케일에서 발산합니다."
              code={SNIPPET_NUMPY_GRADIENT_DESCENT}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="MSE loss · 표준화 공간"
              value={r.loss.toFixed(6)}
              color="#ef4444"
            />
            <StatCard label="RMSE · 원 단위 오차" value={won(r.rmse)} color="#f59e0b" />
            <StatCard
              label="slope · 경력 1년당 연봉"
              value={won(r.slope)}
              color="#a78bfa"
            />
            <StatCard
              label="intercept · 경력 0년 추정"
              value={won(r.intercept)}
              color="#38bdf8"
            />
            <StatCard label="R² · 설명력" value={r.r2.toFixed(4)} color="#10b981" />
            <StatCard
              label="SSE · 제곱오차 합 (백만)"
              value={millions(sse)}
              color="#f472b6"
            />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              목표값 · 최소 제곱 해
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-400">
              slope = {demo.target.slope.toFixed(2)} · intercept ={" "}
              {demo.target.intercept.toFixed(2)}
              <br />
              RMSE = {won(demo.target.rmse)} · R² = {demo.target.r2.toFixed(4)}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              경사하강이 수렴하면 위 지표가 이 값에 거의 같아집니다. 두 수치를 나란히 보는 것이
              이 실습의 확인 지점입니다.
            </p>
            <CodeToggle
              variant="compact"
              className="mt-3"
              summary="코드 보기 · 같은 문제를 PyTorch nn.Linear로"
              caption="입력 1 → 출력 1짜리 선형층 한 장이 바로 이 회귀 모델입니다."
              code={SNIPPET_TORCH_LINEAR}
            />
          </div>
        </div>
      </div>

      {/* ── 변수와 상관관계 ── */}
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <SectionTitle>변수 · 두 변수는 얼마나 함께 움직이나</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard
            label="x · 경력 (년)"
            value={`평균 ${stats.x.mean.toFixed(2)} ± ${stats.x.std.toFixed(2)}`}
            color="#e4e4e7"
          />
          <StatCard
            label="y · 연봉"
            value={`평균 ${won(stats.y.mean)} ± ${won(stats.y.std)}`}
            color="#e4e4e7"
          />
          <StatCard
            label="공분산 Cov(x, y)"
            value={won(stats.covariance)}
            color="#38bdf8"
          />
          <StatCard
            label="상관계수 r"
            value={stats.correlation.toFixed(4)}
            color="#10b981"
          />
          <StatCard
            label="r² · 상관계수의 제곱"
            value={(stats.correlation ** 2).toFixed(4)}
            color="#10b981"
          />
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-4 text-xs leading-relaxed text-zinc-400 marker:text-zinc-600">
          <li>
            <strong className="font-medium text-zinc-300">공분산</strong>은 두 변수가 같은 방향으로
            움직이는 정도입니다. 부호(＋/−)는 방향을 알려 주지만 단위가 남아 있어 크기 자체는
            비교하기 어렵습니다.
          </li>
          <li>
            <strong className="font-medium text-zinc-300">상관계수 r</strong>은 공분산을 두 변수의
            표준편차로 나눠 −1 ~ +1로 맞춘 값입니다. 여기서는 {stats.correlation.toFixed(3)} 로,
            경력이 길수록 연봉이 높아지는 뚜렷한 양의 관계입니다.
          </li>
          <li>
            <strong className="font-medium text-zinc-300">r² = R²</strong> · 단순 선형 회귀에서는
            상관계수의 제곱이 결정계수 R²와 같습니다({(stats.correlation ** 2).toFixed(4)} ={" "}
            {demo.target.r2.toFixed(4)}). 연봉의 흩어짐 중 약{" "}
            {(demo.target.r2 * 100).toFixed(1)}%를 경력만으로 설명한다는 뜻입니다.
          </li>
          <li>
            <strong className="font-medium text-zinc-300">기울기와의 관계</strong> · slope =
            Cov(x, y) / Var(x) 입니다. 상관이 강할수록 점들이 선에 가깝지만, 기울기의 크기는
            상관의 강도가 아니라 두 변수의 단위에서 나옵니다.
          </li>
          <li>
            상관은 <strong className="font-medium text-zinc-300">인과가 아닙니다</strong>. 경력이
            연봉을 올린다고 이 그래프만으로 단정할 수는 없습니다.
          </li>
        </ul>
      </div>

      {/* ── 예측 해보기 ── */}
      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <SectionTitle>예측 · 학습한 직선에 값을 넣어 보기</SectionTitle>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="flex min-w-[240px] flex-1 flex-col gap-1 text-xs text-zinc-500">
            경력 x = <span className="font-mono text-zinc-300">{queryX.toFixed(1)}년</span>
            <input
              type="range"
              min={0}
              max={15}
              step={0.1}
              value={queryX}
              onChange={(e) => setQueryX(Number(e.target.value))}
              className="accent-violet-500"
            />
          </label>
          <div className="flex flex-col gap-1 rounded-xl border border-violet-800/60 bg-violet-950/20 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              현재 직선의 예측 ŷ
            </p>
            <p className="font-mono text-lg font-bold text-violet-300">{won(predicted)}</p>
            <p className="font-mono text-[10px] text-zinc-500">
              최소 제곱 해 기준: {won(predictedTarget)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
          ŷ = {r.slope.toFixed(2)} × {queryX.toFixed(1)} + {r.intercept.toFixed(2)}. 학습이
          끝나기 전에는 두 숫자가 다르고, 수렴하면 거의 같아집니다. 다만 데이터가 다루는 경력
          범위({stats.x.mean.toFixed(1)}년 부근, 실제 {Math.min(...points.map((p) => p.x)).toFixed(1)}~
          {Math.max(...points.map((p) => p.x)).toFixed(1)}년)를 크게 벗어난 값은{" "}
          <strong className="text-zinc-400">외삽</strong>이라 신뢰하기 어렵습니다.
        </p>
      </div>

      {/* ── 예측 표 ── */}
      <details open className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <summary className="cursor-pointer text-sm font-semibold text-zinc-200">
          예측 표 · 관측값 {points.length}건의 실제 · 예측 · 오차 · 제곱오차
        </summary>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
          지금 스텝의 직선을 모든 관측치에 적용한 결과입니다. 제곱오차 열을 모두 더한 값이
          SSE이고, 회귀는 이 합이 가장 작아지는 직선을 찾는 작업입니다.
        </p>
        <div className="mt-3 max-h-80 overflow-y-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="sticky top-0 bg-zinc-900 text-zinc-500">
              <tr>
                <th className="py-1.5 pr-3 font-medium">#</th>
                <th className="py-1.5 pr-3 font-medium">경력 x</th>
                <th className="py-1.5 pr-3 font-medium">실제 y</th>
                <th className="py-1.5 pr-3 font-medium">예측 ŷ</th>
                <th className="py-1.5 pr-3 font-medium">오차 (y − ŷ)</th>
                <th className="py-1.5 font-medium">제곱오차 (백만)</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-zinc-800/60">
                  <td className="py-1 pr-3 text-zinc-600">{i + 1}</td>
                  <td className="py-1 pr-3">{row.x.toFixed(1)}</td>
                  <td className="py-1 pr-3">{won(row.y)}</td>
                  <td className="py-1 pr-3 text-violet-300/90">{won(row.yHat)}</td>
                  <td
                    className={`py-1 pr-3 ${
                      row.error >= 0 ? "text-emerald-400/80" : "text-red-400/80"
                    }`}
                  >
                    {row.error >= 0 ? "+" : ""}
                    {won(row.error)}
                  </td>
                  <td className="py-1 text-zinc-500">{millions(row.squaredError)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 bg-zinc-900 text-zinc-300">
              <tr className="border-t border-zinc-700">
                <td className="py-1.5 pr-3" colSpan={5}>
                  합계 SSE · 평균 MSE · √MSE = RMSE
                </td>
                <td className="py-1.5">
                  {millions(sse)} · {millions(sse / rows.length)} · {won(r.rmse)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </details>

      {/* ── 그래프 해석 정리 ── */}
      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <SectionTitle>그래프 해석 정리</SectionTitle>
        <div className="grid grid-cols-1 gap-4 text-xs leading-relaxed text-zinc-400 lg:grid-cols-3">
          <div>
            <p className="mb-1.5 font-semibold text-zinc-300">① 산점도 + 회귀선</p>
            <p>
              점의 전체 흐름이 오른쪽 위를 향하면 양의 관계입니다. 보라 선이 점 무리의 가운데를
              지나고 세로선(잔차)들이 위아래로 고르게 섞여 있으면 잘 맞은 것입니다. 한쪽 구간에서
              초록만, 다른 구간에서 빨강만 몰린다면 직선으로는 부족하다는 신호(곡선 관계)입니다.
            </p>
          </div>
          <div>
            <p className="mb-1.5 font-semibold text-zinc-300">② 손실 곡선</p>
            <p>
              가로축은 학습 스텝, 세로축은 표준화 공간 MSE입니다. 시작은 1.0 부근이고, 내려가다
              평평해지는 지점이 수렴입니다. 평평해진 높이 ≈ 1 − R² 로, 직선이 설명하지 못하고
              남은 몫입니다. 곡선이 튀면 학습률을 낮추세요.
            </p>
          </div>
          <div>
            <p className="mb-1.5 font-semibold text-zinc-300">③ 지표 읽는 순서</p>
            <p>
              <strong className="text-zinc-300">R²</strong>로 설명력을 먼저 보고(1에 가까울수록
              좋음), <strong className="text-zinc-300">RMSE</strong>로 “평균 몇 만큼 빗나가는가”를
              원 단위로 확인한 뒤, <strong className="text-zinc-300">slope</strong>로 변수 관계를
              해석합니다. R²가 높아도 RMSE가 실무 허용치를 넘으면 쓸 수 없는 모델입니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
