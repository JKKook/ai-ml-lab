"use client";

import Link from "next/link";
import { CodeToggle } from "@/components/CodeToggle";
import { CnnTrainingChart } from "@/components/charts/CnnTrainingChart";
import { FilterHeatmap, PixelImage } from "@/components/CnnVisuals";
import { OptimizationLossChart } from "@/components/charts/OptimizationLossChart";
import { OptimizationTrajectoryChart } from "@/components/charts/OptimizationTrajectoryChart";
import {
  SNIPPET_TORCH_ADAM,
  SNIPPET_TORCH_ADAMW_NOTE,
  SNIPPET_TORCH_CNN,
  SNIPPET_TORCH_MOMENTUM,
  SNIPPET_TORCH_RMSPROP,
  SNIPPET_TORCH_SGD,
} from "@/config/optimization-snippets";
import { ROUTES } from "@/config/routes";
import { useCnnTrainingDemo } from "@/hooks/useCnnTrainingDemo";
import { useOptimizationDemo } from "@/hooks/useOptimizationDemo";
import {
  CNN_CLASS_NAMES,
  defaultCnnLearningRateFor,
  type CnnOptimizerName,
} from "@/lib/cnn";
import {
  defaultLearningRateFor,
  type OptimizerName,
} from "@/lib/optimization";

const OPT_LABELS: Record<OptimizerName, string> = {
  sgd: "SGD",
  momentum: "SGD + Momentum",
  rmsprop: "RMSprop",
  adam: "Adam",
};

function snippetForOptimizer(o: OptimizerName): string {
  switch (o) {
    case "sgd":
      return SNIPPET_TORCH_SGD;
    case "momentum":
      return SNIPPET_TORCH_MOMENTUM;
    case "rmsprop":
      return SNIPPET_TORCH_RMSPROP;
    case "adam":
      return SNIPPET_TORCH_ADAM;
    default: {
      const _: never = o;
      return String(_);
    }
  }
}

export default function OptimizationLabPage() {
  const demo = useOptimizationDemo();
  const progress =
    demo.totalSteps > 1 ? (demo.currentStep / (demo.totalSteps - 1)) * 100 : 0;
  const p = demo.currentPoint;

  const cnn = useCnnTrainingDemo();
  const cnnMaxAbs = Math.max(
    ...cnn.currentSnapshot.filters.flat(2).map((w) => Math.abs(w)),
  );

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-3">
          <Link
            href={ROUTES.deep.lab.root}
            className="w-fit text-xs text-zinc-500 hover:text-zinc-300"
          >
            ← 실습
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Optimization</h1>
            <p className="mt-1 text-sm text-zinc-500">
              지도처럼 펼쳐진 화면에서 점{" "}
              <code className="rounded bg-zinc-800 px-1 font-mono text-zinc-400">(x, y)</code>를
              조금씩 옮겨, “얼마나 틀렸는지”를 나타내는 숫자를 줄여 봅니다. 업데이트 방식만 바꿔
              어떤 차이가 나는지 비교합니다.
            </p>
          </div>
        </div>

        <div className="mb-6 max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            실습 목표
          </p>
          <ul className="mt-3 list-disc space-y-3 pl-4 text-sm leading-relaxed text-zinc-400 marker:text-zinc-600">
            <li>
              <strong className="font-medium text-zinc-300">무엇을 줄이나요?</strong> 위치 두
              개, 즉{" "}
              <code className="rounded bg-zinc-800 px-1 font-mono text-zinc-400">x</code>와{" "}
              <code className="rounded bg-zinc-800 px-1 font-mono text-zinc-400">y</code>를 마음대로
              바꿀 수 있다고 생각하면 됩니다. (나중에 배우면 이걸 신경망의 숫자 두 개에 비유할 수
              있어요.) 그 위치마다 “틀린 정도”를 숫자 하나로 재는데, 여기서는 Rosenbrock이라는
              이름의 공식{" "}
              <code className="rounded bg-zinc-800 px-1 font-mono text-[11px] text-zinc-400">
                (1−x)²+100(y−x²)²
              </code>
              를 씁니다. 이 숫자를{" "}
              <strong className="text-zinc-300">손실</strong>이라고 부릅니다. 손실이{" "}
              <strong className="text-zinc-300">작을수록 좋고</strong>, 가장 좋은 위치는{" "}
              <code className="rounded bg-zinc-800 px-1 text-zinc-400">(1, 1)</code> 근처입니다.
              그때 손실은 거의 <strong className="text-zinc-300">0</strong>에 가깝습니다.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">화면에서 무엇을 보나요?</strong> 한 번
              움직일 때마다 찍힌{" "}
              <code className="rounded bg-zinc-800 px-1 font-mono text-zinc-400">(x, y)</code>와
              그때의 손실이 쌓입니다.{" "}
              <strong className="text-zinc-300">왼쪽 그래프</strong>는 점이 지도 위를 어떤 길로
              걸어가는지(파란 선), <strong className="text-zinc-300">초록 점</strong>은 “목표
              지점”입니다. <strong className="text-zinc-300">오른쪽 그래프</strong>는 시간이 갈수록
              손실 숫자가 어떻게 줄어드는지 보여 줍니다. 재생·맨 아래 슬라이더로 중간 순간을 멈춰
              볼 수 있어요.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">한 번 움직일 때 뭐가 일어나나요?</strong>{" "}
              먼저 “지금 위치에서 어느 방향으로 가면 손실이 내려가기 쉬운지”를 계산합니다. 이 방향
              정보를 보통 <strong className="text-zinc-300">기울기(그래디언트)</strong>라고
              부릅니다. 그다음{" "}
              <strong className="text-zinc-300">업데이트 방식</strong>
              을 고릅니다. SGD는 기울기만 보고 조금 이동하고, Momentum·RMSprop·Adam은 같은
              기울기라도 “얼마나 크게·어떤 식으로” 밟을지 규칙이 달라집니다. 한 번 이렇게
              위치를 고치는 것이 <strong className="text-zinc-300">한 스텝</strong>입니다.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">무엇을 비교하나요?</strong> 출발
              위치는 항상{" "}
              <code className="rounded bg-zinc-800 px-1 text-zinc-400">(-1.2, 1)</code>로
              같습니다. 그래서 업데이트 방식·학습률·총 시도 횟수만 바꿔 보면,{" "}
              <strong className="text-zinc-300">같은 시작에서 누가 더 빨리 목표에 가까워지는지
              </strong>
              , 길이 어떻게 달라지는지 바로 비교할 수 있습니다. 이 페이지는 브라우저 안에서 그
              계산을 보여 주고, 아래 <strong className="text-zinc-300">코드 보기</strong>에는 똑같은
              일을 파이썬 PyTorch로 돌리는 예제가 있어서 복사해 연습할 수 있습니다.
            </li>
          </ul>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
          <button
            type="button"
            onClick={demo.togglePlay}
            className={`rounded-lg border px-5 py-2 text-sm font-semibold transition ${
              demo.isPlaying
                ? "border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                : "border-orange-500/50 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20"
            }`}
          >
            {demo.isPlaying ? "⏸ 일시정지" : "▶ 재생"}
          </button>
          <button
            type="button"
            onClick={demo.reset}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
          >
            ↺ 처음
          </button>
          <button
            type="button"
            onClick={demo.jumpToEnd}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
          >
            ⏭ 끝으로
          </button>

          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-500" htmlFor="opt-speed">
              속도
            </label>
            <input
              id="opt-speed"
              type="range"
              min={1}
              max={40}
              value={demo.speed}
              onChange={(e) => demo.setSpeed(Number(e.target.value))}
              className="w-28 accent-orange-500"
            />
            <span className="w-16 font-mono text-xs text-zinc-400">{demo.speed} 스텝/틱</span>
          </div>

          <div className="ml-auto text-right">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">스텝</p>
            <p className="font-mono text-2xl font-extrabold text-orange-400">
              {demo.currentStep.toLocaleString("en-US")}
            </p>
            <p className="text-[10px] text-zinc-600">
              / {(demo.totalSteps - 1).toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-6">
          <input
            type="range"
            min={0}
            max={Math.max(0, demo.totalSteps - 1)}
            value={demo.currentStep}
            onChange={(e) => demo.setCurrentStep(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <p className="mt-2 text-xs text-zinc-500">
            슬라이더로 중간 스텝의 (x, y)·손실을 확인할 수 있습니다.
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              옵티마이저
            </label>
            <select
              value={demo.optimizer}
              onChange={(e) => {
                const o = e.target.value as OptimizerName;
                demo.setOptimizer(o);
                demo.setLr(defaultLearningRateFor(o));
              }}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 text-sm text-zinc-200"
            >
              {(Object.keys(OPT_LABELS) as OptimizerName[]).map((k) => (
                <option key={k} value={k}>
                  {OPT_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              학습률 lr
            </label>
            <input
              type="number"
              step="any"
              value={demo.lr}
              onChange={(e) => demo.setLr(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm text-zinc-200"
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              최대 스텝
            </label>
            <input
              type="number"
              min={10}
              max={5000}
              step={10}
              value={demo.maxSteps}
              onChange={(e) => demo.setMaxSteps(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm text-zinc-200"
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              현재 손실
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-orange-400">
              {p.loss.toExponential(4)}
            </p>
            <p className="mt-1 font-mono text-[11px] text-zinc-500">
              x={p.x.toFixed(4)} · y={p.y.toFixed(4)}
            </p>
          </div>
        </div>

        {demo.optimizer === "momentum" && (
          <div className="mb-6 max-w-xs rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Momentum 계수
            </label>
            <input
              type="number"
              step={0.01}
              min={0}
              max={0.999}
              value={demo.momentum}
              onChange={(e) => demo.setMomentum(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm"
            />
          </div>
        )}

        {demo.optimizer === "rmsprop" && (
          <div className="mb-6 max-w-xs rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              RMSprop alpha
            </label>
            <input
              type="number"
              step={0.001}
              min={0}
              max={0.9999}
              value={demo.alpha}
              onChange={(e) => demo.setAlpha(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm"
            />
          </div>
        )}

        {demo.optimizer === "adam" && (
          <div className="mb-6 flex flex-wrap gap-3">
            <div className="w-36 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                β₁
              </label>
              <input
                type="number"
                step={0.001}
                value={demo.beta1}
                onChange={(e) => demo.setBeta1(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 font-mono text-sm"
              />
            </div>
            <div className="w-36 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                β₂
              </label>
              <input
                type="number"
                step={0.001}
                value={demo.beta2}
                onChange={(e) => demo.setBeta2(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 font-mono text-sm"
              />
            </div>
          </div>
        )}

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="min-w-0 shrink-0">
              <OptimizationTrajectoryChart data={demo.chartTrajectory} />
            </div>
            <div className="min-w-0">
              <CodeToggle
                variant="compact"
                summary={`코드 보기 · PyTorch (${OPT_LABELS[demo.optimizer]}) — 위 궤적과 동일 목표`}
                caption="로컬 또는 Colab에서 torch만 설치하면 실행됩니다. 학습률은 웹 슬라이더와 맞출 수 있습니다."
                code={snippetForOptimizer(demo.optimizer)}
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="min-w-0 shrink-0">
              <OptimizationLossChart data={demo.chartLoss} />
            </div>
            <div className="min-w-0">
              <CodeToggle
                variant="compact"
                summary="코드 보기 · AdamW (가중치 감쇠 분리) 참고"
                caption="신경망 학습에서 자주 쓰는 AdamW는 이 데모의 2D Rosenbrock과는 별개로, weight decay 개념만 정리했습니다."
                code={SNIPPET_TORCH_ADAMW_NOTE}
              />
            </div>
          </div>
        </div>

        {/* ── 미니 CNN 학습 최적화 시연 ─────────────────────────────── */}
        <section className="mt-14 border-t border-zinc-800 pt-10">
          <h2 className="text-2xl font-bold">미니 CNN 학습 최적화 시연</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500">
            위의 2차원 지도 데모를 <strong className="text-zinc-300">실제 신경망 학습</strong>
            으로 확장한 버전입니다. 8×8 합성 이미지 3클래스(세로선·가로선·대각선)를 작은
            CNN(합성곱 3×3 필터 4개 → ReLU → 2×2 풀링 → 완전연결, 파라미터 151개)으로{" "}
            <strong className="text-zinc-300">브라우저 안에서 직접 학습</strong>합니다. 데이터·
            초기값·셔플까지 시드가 고정돼 있어서,{" "}
            <strong className="text-zinc-300">옵티마이저와 학습률만 바꿨을 때</strong> 손실·
            정확도 곡선과 학습된 합성곱 필터가 어떻게 달라지는지 공정하게 비교할 수 있습니다.
          </p>

          <div className="mt-6 mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
            <button
              type="button"
              onClick={cnn.togglePlay}
              className={`rounded-lg border px-5 py-2 text-sm font-semibold transition ${
                cnn.isPlaying
                  ? "border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                  : "border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
              }`}
            >
              {cnn.isPlaying ? "⏸ 일시정지" : "▶ 재생"}
            </button>
            <button
              type="button"
              onClick={cnn.reset}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
            >
              ↺ 처음
            </button>
            <button
              type="button"
              onClick={cnn.jumpToEnd}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
            >
              ⏭ 끝으로
            </button>
            <div className="flex items-center gap-2">
              <label className="text-xs text-zinc-500" htmlFor="cnn-speed">
                속도
              </label>
              <input
                id="cnn-speed"
                type="range"
                min={1}
                max={20}
                value={cnn.speed}
                onChange={(e) => cnn.setSpeed(Number(e.target.value))}
                className="w-28 accent-cyan-500"
              />
              <span className="w-16 font-mono text-xs text-zinc-400">{cnn.speed} 스텝/틱</span>
            </div>
            <div className="ml-auto text-right">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">스텝</p>
              <p className="font-mono text-2xl font-extrabold text-cyan-400">
                {cnn.currentStep.toLocaleString("en-US")}
              </p>
              <p className="text-[10px] text-zinc-600">
                / {(cnn.totalSteps - 1).toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="range"
              min={0}
              max={Math.max(0, cnn.totalSteps - 1)}
              value={cnn.currentStep}
              onChange={(e) => cnn.setCurrentStep(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <p className="mt-2 text-xs text-zinc-500">
              슬라이더로 중간 스텝의 손실·정확도·필터·예측 상태를 확인할 수 있습니다.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                옵티마이저
              </label>
              <select
                value={cnn.optimizer}
                onChange={(e) => {
                  const o = e.target.value as CnnOptimizerName;
                  cnn.setOptimizer(o);
                  cnn.setLr(defaultCnnLearningRateFor(o));
                }}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 text-sm text-zinc-200"
              >
                {(Object.keys(OPT_LABELS) as CnnOptimizerName[]).map((k) => (
                  <option key={k} value={k}>
                    {OPT_LABELS[k]}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                학습률 lr
              </label>
              <input
                type="number"
                step="any"
                value={cnn.lr}
                onChange={(e) => cnn.setLr(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm text-zinc-200"
              />
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                에폭
              </label>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={cnn.epochs}
                onChange={(e) => cnn.setEpochs(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm text-zinc-200"
              />
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                배치 크기
              </label>
              <select
                value={cnn.batchSize}
                onChange={(e) => cnn.setBatchSize(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-2 font-mono text-sm text-zinc-200"
              >
                {[8, 16, 32].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                현재 상태
              </p>
              <p className="mt-2 font-mono text-sm font-bold text-cyan-400">
                acc {(cnn.currentPoint.testAcc * 100).toFixed(1)}%
              </p>
              <p className="mt-1 font-mono text-[11px] text-zinc-500">
                loss {cnn.currentPoint.loss.toFixed(4)} · epoch {cnn.currentPoint.epoch}
              </p>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <div className="min-w-0 shrink-0">
                <CnnTrainingChart data={cnn.chartData} />
              </div>
              <div className="min-w-0">
                <CodeToggle
                  variant="compact"
                  summary="코드 보기 · PyTorch — 같은 과제·같은 미니 CNN"
                  caption="로컬 또는 Colab에서 torch만 설치하면 실행됩니다. 주석 처리된 옵티마이저를 바꿔 가며 곡선을 비교해 보세요."
                  code={SNIPPET_TORCH_CNN}
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  학습된 합성곱 필터 (step {cnn.currentSnapshot.step})
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {cnn.currentSnapshot.filters.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <FilterHeatmap weights={f} maxAbs={cnnMaxAbs} />
                      <span className="text-[10px] text-zinc-500">filter {i + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                  3×3 필터 가중치를 색으로 나타냈습니다(
                  <span className="text-orange-400">주황=양수</span> ·{" "}
                  <span className="text-sky-400">하늘=음수</span>, 진할수록 큼). 학습이
                  진행되면 선을 감지하는 패턴 — 세로·가로·대각 방향의 대비 — 이 자라나는
                  것을 재생하면서 볼 수 있습니다.
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  현재 모델의 예측 (테스트 샘플 6장)
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {cnn.result.demoSamples.map((s, i) => {
                    const pred = cnn.currentSnapshot.preds[i];
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/50 p-2.5"
                      >
                        <PixelImage pixels={s.pixels} />
                        <p className="text-[10px] text-zinc-500">
                          정답 {CNN_CLASS_NAMES[s.label]}
                        </p>
                        <p
                          className={`text-[10px] font-semibold ${
                            pred.correct ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          예측 {CNN_CLASS_NAMES[pred.predicted]}{" "}
                          {(pred.confidence * 100).toFixed(0)}%{" "}
                          {pred.correct ? "✓" : "✗"}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                  학습에 쓰지 않은 샘플입니다. 재생하면서 초반의 오답(빨강)이 어느 스텝부터
                  정답(초록)·높은 확신으로 바뀌는지, 옵티마이저마다 그 시점이 얼마나 다른지
                  관찰해 보세요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
