import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function MachineLabHomePage() {
  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-3">
          <p className="text-xs text-zinc-500">
            <Link href={ROUTES.home} className="hover:text-zinc-300">
              홈
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href={ROUTES.machine.root} className="hover:text-zinc-300">
              머신러닝 · 빅데이터
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-400">실습</span>
          </p>
          <h1 className="text-3xl font-bold">실습 · 머신러닝 / 빅데이터</h1>
          <p className="text-sm leading-relaxed text-zinc-500">
            이 트랙 전용 실습 페이지입니다. 노트북 임베드·데이터셋 실험 등을 여기에 추가할 수
            있습니다.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-1">
          <Link
            href={ROUTES.machine.lab.rBasic}
            className="group rounded-2xl border border-lime-500/25 bg-zinc-900/60 p-7 text-left transition hover:border-lime-500/50 hover:bg-zinc-900"
          >
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-white">
              R 기초 데모
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              <code className="text-zinc-500">{ROUTES.machine.lab.rBasic}</code> — 정규 난수, 표본
              평균·표준편차, 히스토그램을 R 예시와 같은 해석으로 확인합니다.
            </p>
            <span className="mt-4 inline-block text-xs font-semibold text-lime-400">
              열기 →
            </span>
          </Link>
          <p className="text-center text-sm text-zinc-500">
            딥러닝 인터랙티브 실습은{" "}
            <Link
              href={ROUTES.deep.lab.root}
              className="font-medium text-sky-400 hover:text-sky-300"
            >
              /deep/lab
            </Link>
            을 이용하세요.
          </p>
        </div>
      </main>
    </div>
  );
}
