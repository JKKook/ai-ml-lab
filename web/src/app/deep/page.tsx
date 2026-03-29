import Link from "next/link";
import { ROUTES } from "@/config/routes";

const SECTIONS = [
  {
    href: ROUTES.deep.theory.root,
    title: "이론",
    titleEn: "Theory",
    description:
      "딥러닝 실습과 맞닿은 수학·코드 개념을 정리합니다. 수학 정리, Python/PyTorch 메모로 이어집니다.",
    border: "border-violet-500/25 hover:border-violet-500/50",
    glow: "from-violet-500/15 to-transparent",
    accent: "#c4b5fd",
  },
  {
    href: ROUTES.deep.lab.root,
    title: "실습",
    titleEn: "Lab",
    description:
      "활성화 함수 분포, 역전파 학습 과정 등 브라우저 인터랙티브 데모입니다.",
    border: "border-indigo-500/25 hover:border-indigo-500/50",
    glow: "from-indigo-500/15 to-transparent",
    accent: "#a5b4fc",
  },
];

export default function DeepSectionPage() {
  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-2">
          <p className="text-xs text-zinc-500">
            <Link href={ROUTES.home} className="hover:text-zinc-300">
              홈
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-400">AI · 딥러닝</span>
          </p>
          <h1 className="text-3xl font-bold">AI · 딥러닝</h1>
          <p className="text-sm leading-relaxed text-zinc-500">
            이 트랙 아래에서 <strong className="text-zinc-400">이론</strong>과{" "}
            <strong className="text-zinc-400">실습</strong>으로 나누어 콘텐츠를 제공합니다.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-zinc-900/60 p-6 transition hover:bg-zinc-900 ${s.border}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.glow}`}
              />
              <div className="relative">
                <h2 className="text-lg font-bold text-zinc-100">{s.title}</h2>
                <p className="text-xs font-medium text-zinc-500">{s.titleEn}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {s.description}
                </p>
              </div>
              <span
                className="relative mt-auto text-xs font-semibold"
                style={{ color: s.accent }}
              >
                이동 →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
