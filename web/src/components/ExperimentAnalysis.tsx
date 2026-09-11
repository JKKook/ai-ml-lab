import { LabAnalysis } from "@/config/lab-analysis";

type Props = {
  analysis: LabAnalysis;
  /** 한 페이지에 실험이 둘 이상일 때 구분용 */
  title?: string;
  accent?: string;
};

function PointList({ points }: { points: readonly { term: string; detail: string }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {points.map((p) => (
        <li key={p.term} className="flex flex-col gap-0.5">
          <span className="font-mono text-[11px] font-semibold text-zinc-300">
            {p.term}
          </span>
          <span className="text-xs leading-relaxed text-zinc-400">{p.detail}</span>
        </li>
      ))}
    </ul>
  );
}

/** 실습 페이지 하단의 실험 분석 — 목적 · 파생 이론 · 그래프 읽는 법 · 결과 */
export function ExperimentAnalysis({
  analysis,
  title = "실험 분석",
  accent = "#a78bfa",
}: Props) {
  return (
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
      <h2 className="text-sm font-semibold" style={{ color: accent }}>
        {title}
      </h2>

      <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          무엇을 위한 실험인가
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{analysis.purpose}</p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            검사에 쓰이는 이론
          </p>
          <PointList points={analysis.theories} />
        </div>
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            그래프 읽는 법
          </p>
          <PointList points={analysis.readings} />
        </div>
      </div>

      <div
        className="mt-4 rounded-xl border p-4"
        style={{ borderColor: accent + "40", background: accent + "0d" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: accent }}>
          결과
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">{analysis.outcome}</p>
      </div>
    </section>
  );
}
