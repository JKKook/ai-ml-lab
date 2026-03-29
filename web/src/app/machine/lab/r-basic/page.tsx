import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";
import { RMathDemo } from "@/components/machine/RMathDemo";

export default function MachineLabRBasicPage() {
  return (
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
            <Link href={ROUTES.machine.lab.root} className="hover:text-zinc-300">
              실습
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-400">R 기초</span>
          </p>
          <h1 className="text-3xl font-bold">R 기초 · 정규 표본 데모</h1>
          <p className="text-sm text-zinc-500">
            프로그램 R 예시(<code className="text-zinc-400">rnorm</code>,{" "}
            <code className="text-zinc-400">mean</code>, <code className="text-zinc-400">sd</code>,{" "}
            <code className="text-zinc-400">hist</code>)와 같은 통계량을 브라우저에서 재계산합니다.
          </p>
        </header>

        <TheoryTopicAccordion
          title="데모: 정규 표본 · 요약 · 히스토그램"
          subtitle="set.seed, rnorm, mean, sd"
          defaultOpen
        >
          <div className="space-y-3 text-sm text-zinc-400">
            <p>
              R 콘솔에서 실행하는 코드와{" "}
              <strong className="text-zinc-300">동일한 해석</strong>을 갖도록, 표본 표준편차는
              분모 <span className="font-mono text-zinc-300">n−1</span>을 씁니다(
              <code className="text-zinc-300">sd()</code>와 같음).
            </p>
            <RMathDemo />
            <p className="text-xs text-zinc-600">
              난수는 브라우저용 결정적 생성기로 시드에 고정됩니다. R과 숫자를 완전히 일치시키려면
              같은 알고리즘이어야 하므로, 여기서는 &quot;역할 동일&quot; 데모에 초점을 둡니다.
            </p>
          </div>
        </TheoryTopicAccordion>

        <TheoryTopicAccordion
          title="이론 메모: 왜 정규 가정인가"
          subtitle="중심극한정리와 잔차"
        >
          <div className="space-y-2 text-sm text-zinc-400">
            <p>
              많은 고전적 모형에서 오차항이 정규분포라 가정되거나, 표본 평균의 분포가 정규에
              가까워지는(중심극한정리) 상황을 시각화할 때 히스토그램·Q-Q plot이 표준입니다.
            </p>
            <p>
              R에서는 <code className="text-zinc-300">qqnorm(x); qqline(x)</code>로 정규성을
              눈으로 검사합니다. 이 데모는 그 전 단계인 &quot;무엇이 생성되고 요약되는가&quot;에 맞춰
              있습니다.
            </p>
          </div>
        </TheoryTopicAccordion>

        <p className="mt-6 text-xs text-zinc-600">
          관련 이론 코드 요약:{" "}
          <Link
            href={ROUTES.machine.theory.code}
            className="text-emerald-500 hover:text-emerald-400"
          >
            {ROUTES.machine.theory.code}
          </Link>
        </p>
      </main>
    </div>
  );
}
