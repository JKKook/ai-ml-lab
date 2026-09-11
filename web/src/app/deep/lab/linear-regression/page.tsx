import Link from "next/link";
import { LinearRegressionLab } from "@/components/LinearRegressionLab";
import { ROUTES } from "@/config/routes";
import { SALARY_DATA } from "@/config/salary-data";
import { closedFormFit, describeDataset } from "@/lib/linear-regression";

export default function LinearRegressionPage() {
  const points = SALARY_DATA;
  const stats = describeDataset(points);
  const fit = closedFormFit(points);

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <Link
            href={ROUTES.deep.lab.root}
            className="w-fit text-xs text-zinc-500 hover:text-zinc-300"
          >
            ← 실습
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Linear Regression</h1>
            <p className="mt-1 text-sm text-zinc-500">
              CSV 데이터(경력 vs 연봉 {stats.n}건, 실습용 합성 데이터)에 직선 하나를 맞춰 가는 과정을 스텝마다
              되감아 봅니다. 가장 작은 신경망 — 선형층 한 장이 하는 일과 같습니다.
            </p>
          </div>
          <p className="font-mono text-sm text-zinc-400">
            ŷ = w · x + b{" "}
            <span className="text-zinc-600">
              · 합성 데이터 {stats.n}건 · 경력 {stats.x.mean.toFixed(2)}년 평균 · 연봉{" "}
              {Math.round(stats.y.mean).toLocaleString("en-US")} 평균
            </span>
          </p>
        </div>

        <div className="mb-6 max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            실습 목표
          </p>
          <ul className="mt-3 list-disc space-y-3 pl-4 text-sm leading-relaxed text-zinc-400 marker:text-zinc-600">
            <li>
              <strong className="font-medium text-zinc-300">선형 회귀가 하는 두 가지</strong> ·
              데이터에 가장 잘 맞는 직선을 찾아 ① 새로운 x에 대한 y를{" "}
              <strong className="text-zinc-300">예측</strong>하고, ② 그 직선의 기울기·상관계수로
              두 변수의 <strong className="text-zinc-300">관계를 해석</strong>합니다. 여기서는 경력
              연수 <code className="rounded bg-zinc-800 px-1 font-mono text-zinc-400">x</code>로
              연봉 <code className="rounded bg-zinc-800 px-1 font-mono text-zinc-400">y</code>를
              설명합니다.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">&lsquo;가장 잘 맞는&rsquo;의 기준</strong>{" "}
              · 각 점에서 직선까지의 세로 거리(잔차)를 제곱해 모두 더한 값이 가장 작아지는
              직선입니다. 고를 수 있는 숫자는 기울기{" "}
              <code className="rounded bg-zinc-800 px-1 text-zinc-400">w</code>와 절편{" "}
              <code className="rounded bg-zinc-800 px-1 text-zinc-400">b</code> 두 개뿐이고, 아래
              예측 표에서 그 제곱오차가 실제로 줄어드는 과정을 숫자로 확인할 수 있습니다.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">왜 표준화하나요?</strong> 경력은
              1~10 남짓인데 연봉은 4만~12만이라 스케일 차이가 큽니다. 원 스케일에서 경사하강을
              돌리면 기울기 갱신량이 과해져 바로 발산합니다. 그래서 두 축을 평균 0·표준편차
              1로 맞춰 학습하고, 계수만 원 단위로 되돌려 화면에 표시합니다.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">정답을 이미 아는 실습입니다.</strong>{" "}
              단순 선형 회귀는 최소 제곱 공식으로 한 번에 풀립니다(slope ={" "}
              {fit.slope.toFixed(1)}, intercept = {fit.intercept.toFixed(1)}). 반복해서 찾아가는
              경사하강이 그 정답에 실제로 도달하는지 두 값을 나란히 확인해 보세요.
            </li>
            <li>
              <strong className="font-medium text-zinc-300">학습률을 바꿔 보세요.</strong> LR을
              0.005로 낮추면 300스텝으로도 다 못 가고, 1.05로 올리면 발산합니다. 손실 곡선 모양이
              어떻게 달라지는지가 관찰 포인트입니다.
            </li>
          </ul>
        </div>

        <LinearRegressionLab points={points} />

        <p className="mt-10 text-xs text-zinc-600">
          다른 실습:{" "}
          <Link
            href={ROUTES.deep.lab.activationFunction}
            className="text-zinc-400 hover:text-zinc-200"
          >
            활성 함수
          </Link>
          {" · "}
          <Link
            href={ROUTES.deep.lab.backPropagation}
            className="text-zinc-400 hover:text-zinc-200"
          >
            역전파
          </Link>
          {" · "}
          <Link
            href={ROUTES.deep.lab.optimization}
            className="text-zinc-400 hover:text-zinc-200"
          >
            최적화
          </Link>
        </p>
      </div>
    </div>
  );
}
