"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ActivationCurveChart } from "@/components/charts/ActivationCurveChart";
import { CodeToggle } from "@/components/CodeToggle";
import {
  SNIPPET_NB_HISTOGRAM_Z,
  SNIPPET_NB_INPUTS_AND_LAYER,
  snippetNbActivationCurve,
  snippetNbPostActivationHistogram,
  snippetNbTablePreview,
} from "@/config/notebook-snippets";
import { ROUTES } from "@/config/routes";
import { HistogramChart } from "@/components/charts/HistogramChart";
import { Scatter3D } from "@/components/Scatter3D";
import { useActivationDemo } from "@/hooks/useActivationDemo";
import {
  ActivationName,
  ACTIVATION_COLORS,
  ACTIVATION_DESCRIPTIONS,
  ACTIVATION_INSIGHTS_KO,
  ACTIVATION_LABELS,
} from "@/lib/activations";

const ACTIVATION_LIST: ActivationName[] = ["none", "relu", "sigmoid", "gelu", "tanh"];

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className="font-mono text-zinc-300">{value}</span>
    </div>
  );
}

export default function ActivationPage() {
  const demo = useActivationDemo();
  const color = ACTIVATION_COLORS[demo.activation];

  const codePostHist = useMemo(
    () => snippetNbPostActivationHistogram(demo.activation),
    [demo.activation]
  );
  const codeCurve = useMemo(
    () => snippetNbActivationCurve(demo.activation),
    [demo.activation]
  );
  const codeTable = useMemo(
    () => snippetNbTablePreview(demo.activation),
    [demo.activation]
  );

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <Link href={ROUTES.deep.lab.root} className="w-fit text-xs text-zinc-500 hover:text-zinc-300">
            ← 실습
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Activation Functions</h1>
            <p className="mt-1 text-sm text-zinc-500">활성화 함수 — 입력이 선형층을 지난 뒤 비선형으로 어떻게 바뀌는지</p>
          </div>
          <p className="font-mono text-sm text-zinc-400">
            <span className="text-zinc-500">inputs</span>
            {" = torch.randn(N, 10)  →  "}
            <span className="text-indigo-400">z = Linear(10,1)(inputs)</span>
            {"  →  "}
            <span style={{ color }}>f(z)</span>
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-500">
            노트북과 같이{" "}
            <strong className="font-medium text-zinc-400">N개의 10차원 벡터</strong>를
            만든 뒤, 하나의 선형층으로 스칼라{" "}
            <code className="rounded bg-zinc-800 px-1 text-zinc-300">z</code>로
            줄입니다. 그 다음 선택한 활성화{" "}
            <code className="rounded bg-zinc-800 px-1 text-zinc-300">f</code>를
            씌우면,{" "}
            <strong className="font-medium text-zinc-400">
              같은 z인데 분포 모양만 달라지는 이유
            </strong>
            를 히스토그램으로 바로 비교할 수 있습니다.
          </p>
        </div>

        <p className="mb-4 text-[11px] leading-relaxed text-zinc-600">
          각 그래프/표 아래 <strong className="text-zinc-500">코드 보기</strong>를 펼치면 해당
          시각화와 짝이 되는 노트북(PyTorch) 코드가 나옵니다. 접어 두면 레이아웃 높이는 거의
          늘지 않아 화면이 깨지지 않습니다.
        </p>

        {/* Controls bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
          {/* Activation pills */}
          {ACTIVATION_LIST.map((name) => (
            <button
              key={name}
              onClick={() => demo.setActivation(name)}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all"
              style={
                demo.activation === name
                  ? {
                      background: ACTIVATION_COLORS[name] + "2a",
                      borderColor: ACTIVATION_COLORS[name],
                      color: ACTIVATION_COLORS[name],
                    }
                  : { borderColor: "#3f3f46", color: "#71717a", background: "transparent" }
              }
            >
              {ACTIVATION_LABELS[name]}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-3">
            <label className="text-xs text-zinc-500">샘플 수 N =</label>
            <select
              value={demo.sampleSize}
              onChange={(e) => demo.setSampleSize(Number(e.target.value))}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300"
            >
              {[500, 1000, 2000, 5000].map((n) => (
                <option key={n} value={n}>
                  {n.toLocaleString("en-US")}
                </option>
              ))}
            </select>
            <button
              onClick={demo.regenerate}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
            >
              ↺ 다시 생성
            </button>
          </div>
        </div>

        {/* Activation info banner */}
        <div
          className="mb-7 rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: color + "40", background: color + "0d" }}
        >
          <p>
            <span style={{ color }} className="font-semibold">
              {ACTIVATION_LABELS[demo.activation]}:{" "}
            </span>
            <span className="text-zinc-400">{ACTIVATION_DESCRIPTIONS[demo.activation]}</span>
          </p>
          <p className="mt-2 border-t border-zinc-800/60 pt-2 text-zinc-500 leading-relaxed">
            <span className="text-zinc-600">해설 · </span>
            {ACTIVATION_INSIGHTS_KO[demo.activation]}
          </p>
        </div>

        {/* ── Main 3-column grid (min-w-0: 코드 토글·차트가 그리드 폭을 밀어내지 않음) ── */}
        <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Col 1: 3D scatter */}
          <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs leading-relaxed text-zinc-500">
              10차원 중 앞의 세 축만 공간에 투영했습니다. 점 색은 같은 샘플의{" "}
              <code className="text-zinc-400">f(z)</code> 크기이므로, 활성화를 바꾸면
              같은 입력 공간인데 색 분포만 달라지는 것을 볼 수 있습니다.
            </p>
            <Scatter3D points={demo.scatter3DPoints} label="Input space (dims 0 · 1 · 2)" />

            {/* Weight vector preview */}
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Layer weights w (shape 10)
              </p>
              <div className="flex flex-wrap gap-1">
                {demo.weights.map((w, i) => (
                  <span
                    key={i}
                    className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px]"
                    style={{ color: w >= 0 ? "#6ee7b7" : "#f87171" }}
                  >
                    {w.toFixed(3)}
                  </span>
                ))}
              </div>
            </div>
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 이 패널 (입력 텐서·Linear·z)"
              caption="노트북에서 inputs·layer·z를 만드는 셀과 대응합니다."
              code={SNIPPET_NB_INPUTS_AND_LAYER}
            />
          </div>

          {/* Col 2: Histograms (before & after) */}
          <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            {/* Pipeline label */}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="rounded bg-indigo-900/40 px-2 py-0.5 text-indigo-300">
                z = Xw + b
              </span>
              <span>→</span>
              <span
                className="rounded px-2 py-0.5 font-semibold"
                style={{ background: color + "20", color }}
              >
                f(z)
              </span>
            </div>

            <p className="text-xs leading-relaxed text-zinc-500">
              왼쪽은 선형 변환 직후{" "}
              <code className="text-indigo-400">z</code>, 오른쪽은{" "}
              <code style={{ color }}>f(z)</code>입니다. 활성화는 “값의 범위”와
              “0 근처에 얼마나 몰리는지”를 바꿉니다.
            </p>
            <HistogramChart
              data={demo.zHistogram}
              color="#6366f1"
              label="Pre-activation  z  (linear output)"
            />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 위 히스토그램 (사전 활성화 z)"
              caption="matplotlib으로 z 분포를 그리는 노트북 셀과 동일합니다."
              code={SNIPPET_NB_HISTOGRAM_Z}
            />
            <HistogramChart
              data={demo.activatedHistogram}
              color={color}
              label={`Post-activation  f(z)  — ${ACTIVATION_LABELS[demo.activation]}`}
            />
            <CodeToggle
              variant="compact"
              summary={`코드 보기 · 위 히스토그램 (활성화 후 · ${ACTIVATION_LABELS[demo.activation]})`}
              caption="현재 UI에서 선택한 활성화에 맞춰 노트북 스타일 코드가 바뀝니다."
              code={codePostHist}
            />

            {demo.deadRatio !== null && (
              <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 px-3 py-2">
                <span className="text-xs font-semibold text-amber-400">Dead neurons: </span>
                <span className="font-mono text-sm font-bold text-amber-300">
                  {(demo.deadRatio * 100).toFixed(1)}%
                </span>
                <span className="ml-1 text-xs text-zinc-500">
                  출력이 0인 비율 (ReLU에서 음수 구간이 잘린 샘플)
                </span>
              </div>
            )}
          </div>

          {/* Col 3: Activation curve + stats */}
          <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs leading-relaxed text-zinc-500">
              곡선은 수학적 정의상의{" "}
              <code className="text-zinc-400">f(z)</code>이고, 아래 표는 실제
              샘플 집합에 대한 평균·분산 요약입니다. 히스토그램과 함께 보면
              “왜 평균이 밀리는지”가 연결됩니다.
            </p>
            <ActivationCurveChart activation={demo.activation} color={color} />
            <CodeToggle
              variant="compact"
              summary="코드 보기 · 활성화 곡선 f(z)"
              caption="노트북은 히스토그램 위주이며, 곡선은 같은 f를 z 격자에 적용한 것과 같습니다."
              code={codeCurve}
            />

            {/* Stats comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                  z (pre)
                </p>
                <StatRow label="mean" value={demo.zStats.mean} />
                <StatRow label="std" value={demo.zStats.std} />
                <StatRow label="min" value={demo.zStats.min} />
                <StatRow label="max" value={demo.zStats.max} />
                <StatRow label="n" value={demo.zStats.n.toLocaleString("en-US")} />
              </div>
              <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color }}
                >
                  f(z) (post)
                </p>
                <StatRow label="mean" value={demo.activatedStats.mean} />
                <StatRow label="std" value={demo.activatedStats.std} />
                <StatRow label="min" value={demo.activatedStats.min} />
                <StatRow label="max" value={demo.activatedStats.max} />
                <StatRow label="n" value={demo.activatedStats.n.toLocaleString("en-US")} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Input / z / f(z) table ── */}
        <div className="mt-6 min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="mb-2 text-xs text-zinc-500">
            상위 6행만 표로 보여, 한 샘플이{" "}
            <code className="text-zinc-400">10차원 입력 → 스칼라 z → f(z)</code>로
            어떻게 줄어드는지 숫자로 확인합니다.
          </p>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Sample rows — inputs[:6]  ·  shape ({demo.sampleSize.toLocaleString("en-US")},{" "}
            {demo.inputDims})
          </p>
          <CodeToggle
            variant="compact"
            className="mb-4"
            summary="코드 보기 · 아래 표 (inputs / z / f(z) 슬라이스)"
            caption="위 통계 토글과 동일 계열이며, 표에 맞춰 [:6] 등으로 잘라 봅니다."
            code={codeTable}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800">
                  {Array.from({ length: demo.inputDims }, (_, i) => (
                    <th key={i} className="pb-1.5 pr-3 text-left text-zinc-600">
                      x[{i}]
                    </th>
                  ))}
                  <th className="pb-1.5 pr-3 text-left text-indigo-400">z</th>
                  <th className="pb-1.5 text-left" style={{ color }}>
                    f(z)
                  </th>
                </tr>
              </thead>
              <tbody>
                {demo.inputSample.map((row, ri) => (
                  <tr key={ri} className="border-b border-zinc-900/60">
                    {row.map((val, ci) => (
                      <td key={ci} className="py-1 pr-3 text-zinc-400">
                        {val.toFixed(4)}
                      </td>
                    ))}
                    <td className="py-1 pr-3 text-indigo-400">
                      {demo.z[ri]?.toFixed(4) ?? "—"}
                    </td>
                    <td className="py-1 font-semibold" style={{ color }}>
                      {demo.zActivated[ri]?.toFixed(4) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
