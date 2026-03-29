import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";

const BRANCHES = [
  {
    href: ROUTES.machine.theory.code,
    title: "코드 · R",
    titleEn: "Syntax & idioms",
    description:
      "R 정의, 벡터·데이터프레임, lm/plot, dplyr·ggplot2, 베이스 R 명령 뼈대를 정리합니다.",
    border: "border-teal-500/25 hover:border-teal-500/50",
    glow: "from-teal-500/15 to-transparent",
    accent: "#5eead4",
  },
];

export default function MachineTheoryHubPage() {
  return (
    <TheoryShell>
      <div className="min-h-full bg-zinc-950 text-zinc-100">
        <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-10">
          <header className="flex flex-col gap-2">
            <p className="text-xs text-zinc-500">
              <Link href={ROUTES.home} className="hover:text-zinc-300">
                홈
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <Link href={ROUTES.machine.root} className="hover:text-zinc-300">
                머신러닝 · 빅데이터
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <span className="text-zinc-400">이론</span>
            </p>
            <h1 className="text-3xl font-bold">이론 · 머신러닝 / 빅데이터</h1>
            <p className="text-sm leading-relaxed text-zinc-500">
              하위 주제는 상단 서브메뉴와 아래 카드에서 이동할 수 있습니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BRANCHES.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-zinc-900/60 p-6 transition hover:bg-zinc-900 ${b.border}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${b.glow}`}
                />
                <div className="relative">
                  <h2 className="text-lg font-bold text-zinc-100">{b.title}</h2>
                  <p className="text-xs font-medium text-zinc-500">{b.titleEn}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {b.description}
                  </p>
                </div>
                <span
                  className="relative mt-auto text-xs font-semibold"
                  style={{ color: b.accent }}
                >
                  이동 →
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </TheoryShell>
  );
}
