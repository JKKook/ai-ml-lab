import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";

const THEORY_BRANCHES = [
  {
    href: ROUTES.deep.theory.math,
    title: "수학",
    titleEn: "Math",
    description:
      "선형 함수, 다중 선형 회귀 등 실습과 연결되는 수학 개념을 토글 형태로 정리합니다.",
    border: "border-violet-500/25 hover:border-violet-500/50",
    glow: "from-violet-500/15 to-transparent",
    accent: "#c4b5fd",
  },
  {
    href: ROUTES.deep.theory.code,
    title: "코드",
    titleEn: "Code",
    description:
      "Python · PyTorch 사용 패턴, 텐서·모듈 예제를 둘 공간입니다. (준비 중)",
    border: "border-fuchsia-500/25 hover:border-fuchsia-500/50",
    glow: "from-fuchsia-500/15 to-transparent",
    accent: "#e879f9",
  },
];

export default function TheoryPage() {
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
              <Link href={ROUTES.deep.root} className="hover:text-zinc-300">
                AI · 딥러닝
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <span className="text-zinc-400">이론</span>
            </p>
            <h1 className="text-3xl font-bold">이론</h1>
            <p className="text-sm leading-relaxed text-zinc-500">
              <strong className="text-zinc-400">수학</strong>과{" "}
              <strong className="text-zinc-400">코드</strong>로 나누어 두었습니다. 상단
              서브메뉴에서도 언제든 이동할 수 있습니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {THEORY_BRANCHES.map((b) => (
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

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-xs text-zinc-500">
            경로:{" "}
            <code className="text-zinc-400">{ROUTES.deep.theory.math}</code>
            {" · "}
            <code className="text-zinc-400">{ROUTES.deep.theory.code}</code>
          </div>
        </main>
      </div>
    </TheoryShell>
  );
}
