"use client";

import Link from "next/link";
import { LossChart } from "@/components/charts/LossChart";
import { CodeToggle } from "@/components/CodeToggle";
import {
  SNIPPET_NUMPY_LOSS_APPEND,
  SNIPPET_NUMPY_SIGMOID_AND_DERIV,
  SNIPPET_NUMPY_TRAINING_LOOP_FULL,
  SNIPPET_NB_SCATTER_WEIGHT_HIDDEN,
  SNIPPET_NB_SCATTER_WEIGHT_OUTPUT,
} from "@/config/notebook-snippets";
import { ROUTES } from "@/config/routes";
import { WeightTrajectoryChart } from "@/components/charts/WeightTrajectoryChart";
import { NetworkSvg } from "@/components/NetworkSvg";
import { useBackpropDemo } from "@/hooks/useBackpropDemo";

const LEARNING_RATES = [0.01, 0.05, 0.1, 0.3, 0.5, 1.0];

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

export default function BackpropPage() {
  const demo = useBackpropDemo();
  const progress = (demo.currentEpoch / (demo.totalEpochs - 1)) * 100;
  const r = demo.currentResult;

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <Link href={ROUTES.deep.lab.root} className="w-fit text-xs text-zinc-500 hover:text-zinc-300">
            ← 실습
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Backpropagation</h1>
            <p className="mt-1 text-sm text-zinc-500">
              역전파 — 손실을 줄이도록 가중치가 갱신되는 과정을 에폭 단위로 재생
            </p>
          </div>
          <p className="font-mono text-sm text-zinc-400">
            x → σ(x · w_h) → σ(h · w_o) → ŷ{" "}
            <span className="text-zinc-600">
              · learns identity: 0 → 0, 1 → 1
            </span>
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-500">
            노트북과 같이{" "}
            <strong className="font-medium text-zinc-400">입력 0은 0, 입력 1은 1</strong>
            을 내도록 작은 네트워크를 학습시킵니다. 순전파로 예측을 만들고, 오차를
            뒤로 전파해{" "}
            <code className="rounded bg-zinc-800 px-1 text-zinc-400">w_hidden</code>·
            <code className="rounded bg-zinc-800 px-1 text-zinc-400">w_output</code>
            을 조금씩 고칩니다. 아래 슬라이더로 “어느 시점의 네트워크였는지”를
            되감아 볼 수 있습니다.
          </p>
        </div>

        <p className="mb-4 text-[11px] leading-relaxed text-zinc-600">
          각 차트·다이어그램 근처의 <strong className="text-zinc-500">코드 보기</strong>에는 그
          그래프와 직접 대응하는 노트북(matplotlib / NumPy) 코드가 들어 있습니다. 접혀 있으면
          레이아웃이 거의 늘지 않습니다.
        </p>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
          <button
            onClick={demo.togglePlay}
            className={`rounded-lg border px-5 py-2 text-sm font-semibold transition ${
              demo.isPlaying
                ? "border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                : "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
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
              max={500}
              value={demo.speed}
              onChange={(e) => demo.setSpeed(Number(e.target.value))}
              className="w-28 accent-emerald-500"
            />
            <span className="w-24 font-mono text-xs text-zinc-400">
              {demo.speed} ep/틱
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

          {/* Epoch counter */}
          <div className="ml-auto text-right">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">에폭</p>
            <p className="font-mono text-2xl font-extrabold text-emerald-400">
              {demo.currentEpoch.toLocaleString("en-US")}
            </p>
            <p className="text-[10px] text-zinc-600">
              / {demo.totalEpochs.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Epoch scrubber */}
        <div className="mb-2">
          <p className="text-xs text-zinc-500">
            슬라이더로 특정 에폭으로 이동하면, 그때의 가중치·예측·손실이 한 번에
            갱신됩니다. 재생 중에는 자동으로 앞으로 진행됩니다.
          </p>
        </div>
        <div className="mb-6">
          <input
            type="range"
            min={0}
            max={demo.totalEpochs - 1}
            value={demo.currentEpoch}
            onChange={(e) => demo.setCurrentEpoch(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Left: Network diagram + stat cards */}
          <div className="flex min-w-0 flex-col gap-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Network diagram
              </p>
              <p className="mb-3 text-xs leading-relaxed text-zinc-500">
                선 굵기·색은 가중치 크기와 부호를 대략적으로 반영합니다. 오른쪽
                콜아웃은 x=0, x=1 두 경우의 예측 ŷ가 목표(0과 1)에 얼마나
                가까워졌는지 보여 줍니다.
              </p>
              <NetworkSvg result={r} />
              <CodeToggle
                variant="compact"
                summary="코드 보기 · 시그모이드·미분 (이 다이어그램의 σ·σ′)"
                caption="역전파에서 sigmoid_derivative에는 이미 시그모이드를 통과한 값을 넣습니다."
                code={SNIPPET_NUMPY_SIGMOID_AND_DERIV}
              />
              <CodeToggle
                variant="compact"
                summary="코드 보기 · 순전파·역전파 전체 루프 (노트북 원문)"
                caption="가중치·예측이 어떻게 갱신되는지 한 셀에 모은 코드입니다. 길어서 안쪽만 스크롤됩니다."
                code={SNIPPET_NUMPY_TRAINING_LOOP_FULL}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="MSE loss · 평균 제곱 오차"
                value={r.loss.toFixed(6)}
                color="#ef4444"
              />
              <StatCard
                label="w_hidden · 입력→은닉 가중치"
                value={r.weightsHidden.toFixed(5)}
                color="#f59e0b"
              />
              <StatCard
                label="w_output · 은닉→출력 가중치"
                value={r.weightsOutput.toFixed(5)}
                color="#10b981"
              />
              <StatCard
                label="Predictions · 예측 ŷ"
                value={`ŷ(0)=${r.predInput0.toFixed(3)}  ŷ(1)=${r.predInput1.toFixed(3)}`}
                color="#8b5cf6"
              />
            </div>
          </div>

          {/* Right: Loss chart */}
          <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="mb-2 text-xs leading-relaxed text-zinc-500">
              MSE(평균 제곱 오차)는 예측과 정답 차이의 제곱 평균입니다. 역전파가
              잘 되면 곡선이 아래로 구부러지며, 후반에는 거의 수평에 가깝게
              안정됩니다.
            </p>
            <LossChart data={demo.chartData} />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 손실(loss) 기록 — 위 곡선과 대응"
              caption="노트북은 리스트에 append만 하고, 웹은 에폭별 loss를 선 그래프로 그립니다."
              code={SNIPPET_NUMPY_LOSS_APPEND}
            />
          </div>
        </div>

        {/* ── Weight trajectory charts ── */}
        <p className="mt-2 text-xs text-zinc-500">
          산점도는 “가중치 한 개의 값”과 “그때의 손실”을 묶어 본 것입니다. 파란
          점은 초기 에폭, 빨간 점은 후반 에폭에 가깝습니다. 두 축 가중치가
          어떻게 움직이며 손실 골짜기를 내려가는지 비교해 보세요.
        </p>
        <div className="mt-3 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <WeightTrajectoryChart
              data={demo.chartData}
              weightKey="weightsHidden"
              label="w_hidden"
            />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 위 산점도 (w_hidden vs loss)"
              caption="노트북과 동일한 scatter + colorbar입니다."
              code={SNIPPET_NB_SCATTER_WEIGHT_HIDDEN}
            />
          </div>
          <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <WeightTrajectoryChart
              data={demo.chartData}
              weightKey="weightsOutput"
              label="w_output"
            />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 위 산점도 (w_output vs loss)"
              caption="노트북과 동일한 scatter + colorbar입니다."
              code={SNIPPET_NB_SCATTER_WEIGHT_OUTPUT}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
