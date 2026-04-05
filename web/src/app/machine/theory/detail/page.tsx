import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";

export default function MachineTheoryDetailPage() {
  return (
    <TheoryShell>
      <div className="min-h-full bg-zinc-950 text-zinc-100">
        <main className="mx-auto max-w-3xl px-6 py-10">
          <header className="mb-8 flex flex-col gap-2">
            <p className="text-xs text-zinc-500">
              <Link href={ROUTES.home} className="hover:text-zinc-300">
                홈
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <Link href={ROUTES.machine.root} className="hover:text-zinc-300">
                머신러닝 · 빅데이터
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <Link href={ROUTES.machine.theory.root} className="hover:text-zinc-300">
                이론
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <span className="text-zinc-400">상세 이론</span>
            </p>
            <h1 className="text-3xl font-bold">상세 이론 · 머신러닝 / 빅데이터</h1>
            <p className="text-sm leading-relaxed text-zinc-500">
              <strong className="text-zinc-400">코드</strong> 페이지가 문법·API 위주라면,
              이곳은 <strong className="text-zinc-400">모델 가정</strong>, 결과 해석,
              실무에서의 트레이드오프 등을 서술로 정리합니다.
            </p>
          </header>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm leading-relaxed text-zinc-400">
            <p>
              회귀·분류의 목적함수, 교차 검증의 의미, 편향–분산 등 주제를 장별로 추가할 수
              있습니다.
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              경로: <code className="text-zinc-400">{ROUTES.machine.theory.detail}</code>
            </p>
          </div>
        </main>
      </div>
    </TheoryShell>
  );
}
