"use client";

import Link from "next/link";
import { CodeToggle } from "@/components/CodeToggle";
import { OptimizationLossChart } from "@/components/charts/OptimizationLossChart";
import { OptimizationTrajectoryChart } from "@/components/charts/OptimizationTrajectoryChart";
import {
  SNIPPET_TORCH_ADAM,
  SNIPPET_TORCH_ADAMW_NOTE,
  SNIPPET_TORCH_MOMENTUM,
  SNIPPET_TORCH_RMSPROP,
  SNIPPET_TORCH_SGD,
} from "@/config/optimization-snippets";
import { ROUTES } from "@/config/routes";
import { useOptimizationDemo } from "@/hooks/useOptimizationDemo";
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
      </div>
    </div>
  );
}
