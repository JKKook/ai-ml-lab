import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";

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

const TRAINING_STEPS = [
  {
    step: 1,
    nameKo: "순전파",
    nameEn: "Forward propagation",
    phrase: "데이터 입력 / 예측하기",
    border: "border-violet-500/20",
    accent: "text-violet-400",
    openBorderClassName: "open:border-violet-500/35",
    chevronClassName: "text-violet-400/80",
    concept:
      "입력 데이터를 네트워크에 앞에서부터 통과시켜, 각 층의 선형 변환과 활성화를 거쳐 최종 출력(예측값 ŷ)을 만드는 과정입니다. 이 단계에서는 아직 가중치를 바꾸지 않고, “지금 파라미터로 모델이 내는 답”만 계산합니다.",
    role:
      "학습의 출발점입니다. 역전파에서 미분을 계산할 때 필요한 중간 값(각 층의 출력 등)을 함께 저장해 두면, 뒤 단계에서 효율적으로 그래디언트를 구할 수 있습니다.",
  },
  {
    step: 2,
    nameKo: "손실 계산",
    nameEn: "Loss",
    phrase: "평가 및 채점하기",
    border: "border-fuchsia-500/20",
    accent: "text-fuchsia-400",
    openBorderClassName: "open:border-fuchsia-500/35",
    chevronClassName: "text-fuchsia-400/80",
    concept:
      "정답(또는 기대 출력) y와 모델 예측 ŷ를 손실 함수 L로 비교해, “얼마나 틀렸는지”를 하나의 스칼라 값으로 만드는 단계입니다. 회귀에는 MSE, 분류에는 교차 엔트로피 등 문제에 맞는 손실을 씁니다.",
    role:
      "모델이 개선해야 할 목표를 수치로 정의합니다. 손실이 크면 채점이 나쁜 것이고, 학습은 이 값을 줄이는 방향으로 파라미터를 조정하게 됩니다.",
  },
  {
    step: 3,
    nameKo: "역전파",
    nameEn: "Backpropagation",
    phrase: "원인 분석하기",
    border: "border-amber-500/20",
    accent: "text-amber-400",
    openBorderClassName: "open:border-amber-500/35",
    chevronClassName: "text-amber-400/80",
    concept:
      "손실 L를 각 가중치·편향에 대해 미분해 그래디언트(∂L/∂w 등)를 구하는 과정입니다. 연쇄 법칙을 층마다 뒤에서 앞으로 전달하며, “어느 파라미터가 손실을 얼마나 밀어 올렸는지”를 계산합니다.",
    role:
      "단순히 “틀렸다”에서 끝나지 않고, 오차의 원인이 어느 방향의 파라미터 조정에 있는지 분석합니다. 다음 단계 최적화가 따라갈 갱신 방향(기울기)을 제공합니다.",
  },
  {
    step: 4,
    nameKo: "최적화",
    nameEn: "Optimization",
    phrase: "실제 수정하기",
    border: "border-emerald-500/20",
    accent: "text-emerald-400",
    openBorderClassName: "open:border-emerald-500/35",
    chevronClassName: "text-emerald-400/80",
    concept:
      "역전파로 얻은 그래디언트를 사용해, 학습률 η 등의 규칙에 따라 가중치를 갱신하는 단계입니다. 예를 들어 SGD는 w ← w − η∇L 형태로 한 스텝 움직입니다. Adam 등은 같은 그래디언트를 다르게 스케일링합니다.",
    role:
      "분석 결과를 실제 파라미터 변경으로 반영합니다. 이 갱신이 끝나면 한 번의 “학습 스텝(배치/미니배치 기준)”이 완료되고, 다시 1단계 순전파로 돌아가 반복합니다.",
  },
] as const;

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

        <section
          aria-labelledby="deep-learning-loop-heading"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
        >
          <h2
            id="deep-learning-loop-heading"
            className="text-lg font-semibold text-zinc-100"
          >
            딥러닝 학습의 한 사이클
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            딥러닝 학습은{" "}
            <strong className="text-zinc-300">
              [데이터 입력 및 예측 → 평가 및 채점 → 원인 분석 → 수정]
            </strong>
            의 무한 반복입니다. 아래에서는 각 단계를{" "}
            <strong className="text-zinc-300">순전파 → 손실 → 역전파 → 최적화</strong>로
            짝지어, 무엇을 하는 단계인지와 학습 전체에서의 역할을 나누어 설명합니다.
          </p>

          <ol className="mt-4 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
            {TRAINING_STEPS.map((s) => (
              <li
                key={s.step}
                className={`flex flex-col gap-0.5 rounded-lg border bg-zinc-950/40 px-3 py-2 ${s.border}`}
              >
                <span className={`text-xs font-semibold ${s.accent}`}>
                  {s.step}단계 · {s.nameKo}
                </span>
                <span className="text-xs text-zinc-500">「{s.phrase}」</span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-zinc-300">단계별 개념과 역할</h3>
            <p className="mt-1 text-xs text-zinc-500">
              제목 줄을 눌러 접거나 펼칠 수 있습니다.
            </p>
            <div className="mt-3 space-y-0">
              {TRAINING_STEPS.map((s) => (
                <TheoryTopicAccordion
                  key={s.step}
                  defaultOpen={s.step === 1}
                  openBorderClassName={s.openBorderClassName}
                  chevronClassName={s.chevronClassName}
                  detailsClassName={`bg-zinc-950/50 ${s.border}`}
                  title={
                    <>
                      <span className={s.accent}>{s.step}.</span> {s.nameKo}
                      <span className="font-normal text-zinc-500"> ({s.nameEn})</span>
                    </>
                  }
                  subtitle={`「${s.phrase}」`}
                >
                  <dl className="space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        개념
                      </dt>
                      <dd className="mt-1 text-zinc-400">{s.concept}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        이 단계의 역할
                      </dt>
                      <dd className="mt-1 text-zinc-400">{s.role}</dd>
                    </div>
                  </dl>
                </TheoryTopicAccordion>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-4 text-xs leading-relaxed text-zinc-500">
            <p>
              <strong className="text-zinc-400">배치(batch)</strong>는 한 번에 모델에 넣어
              1~4단계를 도는 샘플 묶음이고, 그 안의 샘플 수가{" "}
              <strong className="text-zinc-400">배치 크기</strong>입니다. 배치마다 가중치가
              한 번씩 갱신되는데, 이 한 번을 <strong className="text-zinc-400">스텝(step)</strong>
              이라고도 부릅니다.
            </p>
            <p className="mt-3">
              <strong className="text-zinc-400">에폭(epoch)</strong>은 보통{" "}
              <strong className="text-zinc-400">전체 훈련 데이터를 한 바퀴</strong> 본 뒤
              끝나는 큰 주기입니다. 배치를 여러 번 돌린 뒤 데이터 전체를 다 쓰면 1 에폭이
              지난다고 이해하면 됩니다. (입문 설명에서는 “1~4를 한 번”과 에폭을 섞어 쓰기도
              하지만, 실무에서는 <strong className="text-zinc-400">배치 단위 스텝</strong>이
              더 자잘한 눈금입니다.)
            </p>
            <p className="mt-3">
              더 자세한 정리는{" "}
              <Link
                href={ROUTES.deep.theory.detail}
                className="text-violet-400 hover:text-violet-300"
              >
                이론 · 상세 이론
              </Link>
              의 「에폭과 배치」를 참고하세요.
            </p>
          </div>
        </section>

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
