import Link from "next/link";
import { ROUTES } from "@/config/routes";

const SECTIONS = [
  {
    href: ROUTES.machine.theory.root,
    title: "이론",
    titleEn: "Theory",
    description:
      "머신러닝·빅데이터 분석 이론 자료를 모읍니다. 프로그램 R 등 도구별 페이지로 확장할 수 있습니다.",
    border: "border-emerald-500/25 hover:border-emerald-500/50",
    glow: "from-emerald-500/15 to-transparent",
    accent: "#6ee7b7",
  },
  {
    href: ROUTES.machine.lab.root,
    title: "실습",
    titleEn: "Lab",
    description:
      "분석 실습·노트북 연동 공간입니다. 콘텐츠는 단계적으로 채워질 예정입니다.",
    border: "border-sky-500/25 hover:border-sky-500/50",
    glow: "from-sky-500/15 to-transparent",
    accent: "#7dd3fc",
  },
];

export default function MachineSectionPage() {
  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-2">
          <p className="text-xs text-zinc-500">
            <Link href={ROUTES.home} className="hover:text-zinc-300">
              홈
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-400">머신러닝 · 빅데이터</span>
          </p>
          <h1 className="text-3xl font-bold">머신러닝 · 빅데이터 분석</h1>
          <p className="text-sm leading-relaxed text-zinc-500">
            이 트랙은 <strong className="text-zinc-400">이론</strong>과{" "}
            <strong className="text-zinc-400">실습</strong>으로 구성됩니다. 딥러닝 트랙(
            <Link href={ROUTES.deep.root} className="text-zinc-400 underline-offset-2 hover:underline">
              /deep
            </Link>
            )과 URL 구조를 같게 두었습니다.
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
