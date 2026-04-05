import type { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";

function DetailBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </h3>
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

/** 한계 아래 공통 극복 방안 박스 */
function MitigationBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 rounded-lg border border-violet-500/25 bg-violet-950/20 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-300/90">
        극복 방안
      </p>
      <div className="mt-2 text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

/** 한계 섹션 안에서 소제목+본문+극복 방안 */
function LimitCard({
  title,
  children,
  mitigation,
}: {
  title: string;
  children: ReactNode;
  mitigation: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/50 p-3">
      <p className="text-sm font-medium text-zinc-300">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-zinc-400">{children}</div>
      <MitigationBox>{mitigation}</MitigationBox>
    </div>
  );
}

function TheorySectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-zinc-400">
      {children}
    </h2>
  );
}

export default function DeepTheoryDetailPage() {
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
              <Link href={ROUTES.deep.root} className="hover:text-zinc-300">
                AI · 딥러닝
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <Link href={ROUTES.deep.theory.root} className="hover:text-zinc-300">
                이론
              </Link>
              <span className="mx-2 text-zinc-700">/</span>
              <span className="text-zinc-400">상세 이론</span>
            </p>
            <h1 className="text-3xl font-bold">상세 이론 · 딥러닝</h1>
            <p className="text-sm leading-relaxed text-zinc-500">
              <Link href={ROUTES.deep.root} className="text-violet-400 hover:text-violet-300">
                /deep
              </Link>
              에서 다룬{" "}
              <strong className="text-zinc-400">
                1~4단계(순전파 → 손실 → 역전파 → 최적화)
              </strong>
              를 먼저 정리하고, 그다음{" "}
              <strong className="text-zinc-400">학습 진행 단위</strong>(에폭·배치),{" "}
              <strong className="text-zinc-400">입력 스케일링</strong>,{" "}
              <strong className="text-zinc-400">일반화(Regularization)</strong>,{" "}
              <strong className="text-zinc-400">활성화 정규화</strong> 순으로 나눴습니다. 수식
              기호 없이 말로만 풀었습니다.
            </p>
          </header>

          <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-xs leading-relaxed text-zinc-500">
            <p>
              아래{" "}
              <strong className="text-zinc-400">개념 묶음</strong> 표는 용어가 겹칠 때(특히
              「정규화」)를 줄이기 위한 안내입니다. 본문은{" "}
              <strong className="text-zinc-400">
                핵심 4단계 → 진행 단위 → 입력 스케일링 → 일반화 → 활성화 정규화
              </strong>
              순입니다. 각 토픽은{" "}
              <strong className="text-zinc-400">
                정의 · 동작 방식 · 결과 · 현실 비유 · 특징 · 한계
              </strong>
              순으로 읽을 수 있으며, <strong className="text-zinc-400">한계</strong> 뒤에{" "}
              <strong className="text-zinc-400">극복 방안</strong>을 붙였습니다.
            </p>
          </div>

          <div
            id="theory-concept-map"
            className="mb-8 scroll-mt-24 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              개념 묶음 (용어 구분)
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              한국어 <strong className="text-zinc-400">「정규화」</strong>는{" "}
              <strong className="text-zinc-400">입력을 맞추는 전처리</strong>와{" "}
              <strong className="text-zinc-400">과적합을 줄이는 Regularization</strong>에 모두
              쓰일 수 있어, 아래는 <strong className="text-zinc-400">역할</strong> 기준으로
              묶었습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-700/80">
              <table className="w-full min-w-[320px] border-collapse text-left text-xs">
                <caption className="sr-only">딥러닝 용어 개념 묶음</caption>
                <thead>
                  <tr className="border-b border-zinc-700 bg-zinc-800/70">
                    <th
                      scope="col"
                      className="w-[28%] px-3 py-2.5 font-semibold uppercase tracking-wide text-zinc-400"
                    >
                      묶음
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-semibold text-zinc-300">
                      다루는 말
                    </th>
                    <th
                      scope="col"
                      className="hidden w-[22%] px-3 py-2.5 font-semibold text-zinc-400 sm:table-cell"
                    >
                      본문
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-zinc-800/90">
                    <th scope="row" className="bg-zinc-900/50 px-3 py-2.5 font-medium text-zinc-300">
                      핵심 학습 루프
                    </th>
                    <td className="px-3 py-2.5 leading-relaxed">
                      순전파, 손실, 역전파, 최적화 — 한 스텝 안에서 도는 네 단계
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <Link
                        href="#theory-section-core"
                        className="text-white hover:text-white"
                      >
                        이동
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800/90">
                    <th scope="row" className="bg-zinc-900/50 px-3 py-2.5 font-medium text-zinc-300">
                      학습 진행 단위
                    </th>
                    <td className="px-3 py-2.5 leading-relaxed">
                      에폭, 배치(크기), 스텝·이터레이션 — 얼마나 자주·얼마나 잘게 도는지
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <Link
                        href="#theory-section-schedule"
                        className="text-white hover:text-white"
                      >
                        이동
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800/90">
                    <th scope="row" className="bg-zinc-900/50 px-3 py-2.5 font-medium text-zinc-300">
                      입력·데이터 스케일링
                    </th>
                    <td className="px-3 py-2.5 leading-relaxed">
                      표준화, 최소–최대 스케일 등 — 모델에 넣기 전 특성 크기·분포 맞추기
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <Link
                        href="#theory-section-input-scale"
                        className="text-white hover:text-white"
                      >
                        이동
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800/90">
                    <th scope="row" className="bg-zinc-900/50 px-3 py-2.5 font-medium text-zinc-300">
                      일반화 (Regularization)
                    </th>
                    <td className="px-3 py-2.5 leading-relaxed">
                      L2·L1 가중치 감쇠, 드롭아웃, 조기 종료 등 — 과적합·복잡도 제어
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <Link
                        href="#theory-section-generalization"
                        className="text-white hover:text-white"
                      >
                        이동
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-zinc-900/50 px-3 py-2.5 font-medium text-zinc-300">
                      활성화 정규화
                    </th>
                    <td className="px-3 py-2.5 leading-relaxed">
                      배치·레이어·그룹 정규화 — 층 안 활성값 분포 안정·학습 촉진
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <Link
                        href="#theory-section-activation-norm"
                        className="text-white hover:text-white"
                      >
                        이동
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <section id="theory-section-core" className="mb-12 scroll-mt-24">
            <TheorySectionHeading>핵심 학습 루프 (1~4단계)</TheorySectionHeading>
            <nav
              className="mb-4 scroll-mt-24 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              aria-label="학습 루프 1~4단계"
            >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              학습 루프
            </p>
            <ol className="mt-3 flex flex-wrap gap-2 text-xs">
              <li>
                <Link
                  href="#theory-forward"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1.5 text-white transition hover:border-zinc-500/60 hover:bg-zinc-900"
                >
                  <span className="font-mono text-[10px] text-white">1</span>
                  순전파
                </Link>
              </li>
              <li>
                <Link
                  href="#theory-loss"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1.5 text-white transition hover:border-zinc-500/60 hover:bg-zinc-900"
                >
                  <span className="font-mono text-[10px] text-white">2</span>
                  손실
                </Link>
              </li>
              <li>
                <Link
                  href="#theory-backprop"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1.5 text-white transition hover:border-zinc-500/60 hover:bg-zinc-900"
                >
                  <span className="font-mono text-[10px] text-white">3</span>
                  역전파
                </Link>
              </li>
              <li>
                <Link
                  href="#theory-optimization"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1.5 text-white transition hover:border-zinc-500/60 hover:bg-zinc-900"
                >
                  <span className="font-mono text-[10px] text-white">4</span>
                  최적화
                </Link>
              </li>
            </ol>
          </nav>

            <div className="space-y-0">
            <TheoryTopicAccordion
              id="theory-forward"
              title="순전파 (Forward propagation)"
              subtitle="1단계: 데이터 입력 / 예측 — 입력층 → 출력층으로 신호가 흐르는 과정"
              defaultOpen
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    순전파는 <strong className="text-zinc-300">학습 데이터가 입력층에서
                    출력층 방향으로</strong> 층을 거치며 변환되어, 최종적으로 모델의 예측값이
                    만들어지는 과정입니다. 이 단계에서는 가중치를 바꾸지 않고, 주어진 파라미터로
                    “지금의 답”만 계산합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    각 층에서는 <strong className="text-zinc-300">이전 층에서 넘어온 값들에
                    가중치를 곱하고 편향을 더한 뒤</strong>, 시그모이드·ReLU 같은{" "}
                    <strong className="text-zinc-300">활성화 함수</strong>를 통과시켜 다음 층으로
                    보냅니다. 한 뉴런만 보면 “입력들의 가중합에 편향을 더하고, 비선형 함수를
                    씌운 값”이 출력입니다. 층이 여러 개면 이 과정을 앞에서부터 반복합니다.
                  </p>
                  <p className="mt-2">
                    맨 앞에서는 원본 입력이 들어가고, 맨 끝 층에서는 그때까지 쌓인 변환이
                    모여 <strong className="text-zinc-300">모델의 예측</strong>이 됩니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    출력층에서 나온 예측값(필요하면 클래스별 확률 형태)이 곧{" "}
                    <strong className="text-zinc-300">현재 모델이 내는 답</strong>입니다. 그다음
                    단계에서는 이 예측을 정답과 비교해 <strong className="text-zinc-300">손실
                    </strong>을 계산합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    시험 문제지를 받은 학생이 <strong className="text-zinc-300">머릿속 지식(
                    가중치·편향)</strong>을 동원해 답안지에 답을 적어 내는 과정과 비슷합니다.
                    아직 채점이나 오답 분석은 하지 않은 상태입니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      순전파는 <strong className="text-zinc-300">구조가 단방향</strong>이라
                      흐름이 직관적이고, GPU에서 행렬 연산으로{" "}
                      <strong className="text-zinc-300">한 번에 배치 단위로</strong> 빠르게
                      계산하기 좋습니다. 추론(inference) 단계에서도 같은 경로만 쓰면 됩니다.
                    </p>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p>
                    깊이·폭이 커질수록 <strong className="text-zinc-300">연산량·메모리</strong>
                    가 커지고, 잘못된 초기화나 활성화 선택은 뒤쪽 단계(손실·역전파)에서{" "}
                    <strong className="text-zinc-300">기울기 소실·폭주</strong>로 이어질 수
                    있습니다. 순전파만으로는 “틀린 이유”를 알 수 없어 반드시 손실·역전파와
                    짝을 이뤄야 합니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">연산·메모리</strong>: 배치 크기 조절,
                        혼합 정밀도, 모델 압축·지식 증류, 더 가벼운 아키텍처나 깊이·폭 축소로
                        부담을 줄입니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">기울기 문제 예방</strong>: ReLU 계열
                        활성화, 적절한 가중치 초기화, 잔차·스킵 연결, 배치 정규화 등으로 앞쪽
                        층까지 신호가 잘 전달되게 합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">학습 루프</strong>: 순전파 뒤에는
                        항상 손실·역전파·최적화를 이어 붙여 오차를 반영합니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>

            <TheoryTopicAccordion
              id="theory-loss"
              title="손실 계산 (Loss)"
              subtitle="2단계: 평가 및 채점 — 정답과 예측의 차이를 하나의 수치로 만듦"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    손실 함수는 <strong className="text-zinc-300">정답(또는 기대 출력)</strong>과
                    순전파로 얻은 <strong className="text-zinc-300">예측</strong>을 비교해,{" "}
                    <strong className="text-zinc-300">얼마나 틀렸는지</strong>를 하나의 숫자로
                    만드는 단계입니다. 문제가 회귀인지 분류인지에 따라 쓰는 손실의 종류가
                    달라집니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    <strong className="text-zinc-300">회귀</strong>에서는 예측과 정답의 차이를
                    제곱해 크기를 재는 <strong className="text-zinc-300">평균 제곱 오차</strong>를
                    자주 씁니다. 차이가 클수록 손실이 커집니다. 구현에서는 앞에 상수를 곱해
                    미분 형태를 맞추기도 합니다.
                  </p>
                  <p className="mt-2">
                    <strong className="text-zinc-300">이진 분류</strong>에서는 예측을 0과 1
                    사이의 확률로 두고, 정답이 맞을 때의 로그 가능도를 높이는 방향으로 손실을
                    정의합니다. <strong className="text-zinc-300">여러 클래스</strong>일 때는
                    정답 클래스에 해당하는 예측 확률의 로그를 모아서 벌점을 줍니다.
                  </p>
                  <p className="mt-2">
                    손실은 역전파에서 미분할 수 있어야 하고, 보통은{" "}
                    <strong className="text-zinc-300">출력 쪽에서 손실이 예측에 얼마나
                    민감한지</strong>부터 역으로 전달하기 시작합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    배치 전체에 대해서는 샘플마다 낸 손실을 <strong className="text-zinc-300">평균
                    내거나 합쳐</strong> 하나의 목표 숫자로 정리합니다. 그 숫자가 학습이 줄여야
                    할 대상이고, 동시에 <strong className="text-zinc-300">다음 단계 역전파의
                    출발 신호</strong>가 됩니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    답안을 다 쓴 뒤 <strong className="text-zinc-300">채점기에 넣어 객관적인
                    점수</strong>를 받는 단계와 같습니다. 점수가 나쁘면 그다음에 어디를 고칠지
                    논의하게 됩니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      손실은 목표를 <strong className="text-zinc-300">스칼라 하나로 압축</strong>
                      해 주어, 여러 출력·여러 샘플을 같은 기준으로 비교할 수 있습니다. 미분
                      가능한 형태로 설계하면 역전파와 자연스럽게 연결됩니다.
                    </p>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p>
                    잘못된 손실 선택은 <strong className="text-zinc-300">업무 목표와 안 맞는
                    학습</strong>으로 이어집니다. 클래스 불균형·이상치에는 평균 제곱 오차만으로는
                    부족할 수 있고, 분류에서 확률 보정이 필요한 경우 손실만 줄였다고 실제
                    정확도·교정이 항상 좋아지지는 않습니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">문제에 맞는 손실</strong>: 회귀·분류·
                        순위·불균형에 맞는 대표 손실을 쓰고, 필요하면 클래스 가중치·포컬 손실
                        등으로 소수 클래스를 보강합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">데이터</strong>: 이상치 제거·클리핑,
                        리샘플링, 증강으로 손실이 반영하는 분포를 다듬습니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">평가와의 정렬</strong>: 검증에서 실제
                        쓰는 지표(F1, AUC 등)를 함께 보고, 확률 보정이 필요하면 학습 후
                        보정 단계를 둡니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>

                <div className="border-t border-zinc-800 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-400/90">
                    보충 · 정보 이론과 대표 손실
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    2단계(손실)를 읽을 때 자주 마주치는 용어를 짧게 정리했습니다.
                  </p>
                  <div className="mt-4 space-y-5">
                    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/40 p-4">
                      <h4 className="text-sm font-semibold text-zinc-200">
                        1. 엔트로피 (Entropy)
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        <strong className="text-zinc-300">불확실성</strong>이나{" "}
                        <strong className="text-zinc-300">정보의 양</strong>을 수치로 나타낸
                        개념입니다. 여러 결과가 나올 수 있을 때, 확률이{" "}
                        <strong className="text-zinc-300">고르게 퍼져 있을수록</strong> 엔트로피는
                        크고(덜 예측 가능), <strong className="text-zinc-300">한쪽에 몰릴수록
                        </strong> 작아집니다(거의 확실). 분류에서 모델이 낸 확률 분포가 “얼마나
                        뾰족한지”를 이야기할 때도 같은 맥락으로 이해하면 됩니다.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/40 p-4">
                      <h4 className="text-sm font-semibold text-zinc-200">
                        2. 평균 제곱 오차 (MSE)
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        <strong className="text-zinc-300">회귀</strong>에서 쓰는 대표 손실로,
                        각 샘플마다 <strong className="text-zinc-300">정답과 예측의 차이를
                        제곱</strong>한 뒤 평균(또는 합)을 냅니다. 차이가 클수록 벌점이 급격히
                        커져 <strong className="text-zinc-300">큰 오차를 강하게 줄이려는
                        성향</strong>이 있습니다. 대신 <strong className="text-zinc-300">이상치
                        </strong>에 민감해질 수 있고, 분류 문제의 “맞았다/틀렸다”를 직접 다루는
                        방식은 아닙니다.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/40 p-4">
                      <h4 className="text-sm font-semibold text-zinc-200">
                        3. 교차 엔트로피 (Cross-Entropy)
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        <strong className="text-zinc-300">분류</strong>에서 자주 쓰는 손실로,
                        <strong className="text-zinc-300">정답이 가리키는 분포</strong>(보통 한
                        클래스만 1이고 나머지는 0인 표현)과{" "}
                        <strong className="text-zinc-300">모델이 낸 확률 분포</strong>가 얼마나
                        다른지를 재는 형태입니다. 정답 클래스에 높은 확률을 줄수록 손실은
                        작아지고, 틀린 쪽에 확률을 주면 커집니다.{" "}
                        <strong className="text-zinc-300">최대 우도</strong>로 분류 모델을
                        학습할 때와 같은 방향의 목표라고 보면 됩니다.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/40 p-4">
                      <h4 className="text-sm font-semibold text-zinc-200">
                        4. 손실 함수와 엔트로피의 관계
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        아래 표로 역할을 나란히 보면 구분이 쉽습니다.{" "}
                        <strong className="text-zinc-300">교차 엔트로피</strong>는 엔트로피
                        개념에서 나온 대표적인 <strong className="text-zinc-300">분류용 손실
                        </strong>이고, <strong className="text-zinc-300">MSE</strong> 등은
                        제곱 오차 계열이라 같은 공식은 아니지만 모두 손실 함수의 예입니다.
                      </p>
                      <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-700/80">
                        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                          <caption className="sr-only">
                            손실 함수와 엔트로피 비교
                          </caption>
                          <thead>
                            <tr className="border-b border-zinc-700 bg-zinc-800/70">
                              <th
                                scope="col"
                                className="w-[22%] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-400"
                              >
                                구분
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2.5 text-xs font-semibold text-fuchsia-200/90"
                              >
                                손실 함수
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2.5 text-xs font-semibold text-violet-200/90"
                              >
                                엔트로피
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-zinc-400">
                            <tr className="border-b border-zinc-800/90">
                              <th
                                scope="row"
                                className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                              >
                                개념
                              </th>
                              <td className="px-3 py-2.5 leading-relaxed">
                                모델 예측이 정답에서 얼마나 벗어났는지를 재는{" "}
                                <strong className="text-zinc-300">오차·목표 척도</strong>입니다.
                              </td>
                              <td className="px-3 py-2.5 leading-relaxed">
                                결과 분포의{" "}
                                <strong className="text-zinc-300">불확실성·퍼짐 정도</strong>를
                                나타내는 정보 이론적 개념입니다.
                              </td>
                            </tr>
                            <tr className="border-b border-zinc-800/90">
                              <th
                                scope="row"
                                className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                              >
                                목적
                              </th>
                              <td className="px-3 py-2.5 leading-relaxed">
                                역전파·최적화에 넘길{" "}
                                <strong className="text-zinc-300">학습 기준(스칼라)</strong>을
                                정해, 가중치를 어느 방향으로 고칠지 정합니다.
                              </td>
                              <td className="px-3 py-2.5 leading-relaxed">
                                데이터·분포가 얼마나{" "}
                                <strong className="text-zinc-300">섞여 있는지·한쪽에 몰려
                                있는지</strong> 등을 수치로 요약할 때 씁니다.
                              </td>
                            </tr>
                            <tr className="border-b border-zinc-800/90">
                              <th
                                scope="row"
                                className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                              >
                                딥러닝에서의 관계
                              </th>
                              <td className="px-3 py-2.5 leading-relaxed">
                                <strong className="text-zinc-300">교차 엔트로피</strong>를
                                손실로 두는 경우가 많고, MSE·Huber 등 다른 손실도 함께
                                씁니다.
                              </td>
                              <td className="px-3 py-2.5 leading-relaxed">
                                교차 엔트로피 같은 손실을{" "}
                                <strong className="text-zinc-300">정의할 때 바탕이 되는 수학
                                원리</strong> 가운데 하나입니다. 모든 손실이 엔트로피에서만
                                나오지는 않습니다.
                              </td>
                            </tr>
                            <tr>
                              <th
                                scope="row"
                                className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                              >
                                주요 활용
                              </th>
                              <td className="px-3 py-2.5 leading-relaxed">
                                MSE, 교차 엔트로피, Huber 손실 등{" "}
                                <strong className="text-zinc-300">학습 루프에서 줄이는 값</strong>
                                으로 쓰입니다.
                              </td>
                              <td className="px-3 py-2.5 leading-relaxed">
                                의사결정 트리의{" "}
                                <strong className="text-zinc-300">정보 이득</strong> 등, 분류·
                                분할에서 분포를 보는 맥락과{" "}
                                <strong className="text-zinc-300">확률 출력 모델 해석</strong>
                                에 자주 등장합니다.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                        정리하면, <strong className="text-zinc-400">손실 함수 ⊃ (교차 엔트로피
                        등)</strong>이고 엔트로피는 그중 일부 손실의 이론적 뿌리일 뿐, 둘이
                        항상 같은 말은 아닙니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TheoryTopicAccordion>

            <TheoryTopicAccordion
              id="theory-backprop"
              title="역전파 (Backpropagation)"
              subtitle="3단계: 원인 분석 — 손실을 각 파라미터에 대해 미분"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    역전파는 손실을 네트워크의 각 가중치·편향에 대해{" "}
                    <strong className="text-zinc-300">얼마나 민감한지(그래디언트)</strong>를
                    구하는 절차입니다. 출력층 쪽에서 시작해{" "}
                    <strong className="text-zinc-300">입력층 방향으로</strong> 오차 정보를
                    넘깁니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    핵심은 <strong className="text-zinc-300">연쇄 법칙</strong>입니다. 뒤쪽
                    층에서 “손실이 이 중간값에 얼마나 민감한지”를 알면, 한 층 앞의 가중치·
                    편향에 대해서도 같은 정보를 조합해 계산할 수 있습니다. 활성화 함수를 지날
                    때는 그 구간의 기울기도 곱해 줍니다.
                  </p>
                  <p className="mt-2">
                    구현에서는 이 재귀를 <strong className="text-zinc-300">한 번의 backward
                    패스</strong>로 묶어, 모든 학습 가능한 파라미터에 대한 갱신 방향을 한꺼번에
                    구합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    각 가중치와 편향마다 <strong className="text-zinc-300">손실을 줄이려면 어느
                    방향으로, 대략 얼마나 움직여야 하는지</strong>에 해당하는 값이 준비됩니다.
                    그다음 <strong className="text-zinc-300">최적화 단계</strong>에서 실제로
                    숫자를 고칩니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    채점 후 <strong className="text-zinc-300">틀린 문항마다 어떤 단원·개념이
                    약했는지</strong>를 거슬러 올라가며 짚는 피드백과 비슷합니다. 점수만 보는
                    게 아니라, 그 점수에 기여한 경로를 따라가며 원인을 쪼갭니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p className="mb-3">
                      역전파는 손실 함수로 계산된 오차를 바탕으로,{" "}
                      <strong className="text-zinc-300">모델이 스스로 개선할 방향(그래디언트)
                      </strong>을 체계적으로 구하는 메커니즘입니다. 흐름을 세 단계로 나누면
                      다음과 같습니다.
                    </p>
                    <ol className="list-decimal space-y-2 pl-5 marker:text-zinc-500">
                      <li>
                        <strong className="text-zinc-300">손실 계산</strong>: 예측값과 실제값의
                        차이(손실)를 구합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">미분 적용</strong>: 출력층부터 거꾸로
                        올라가며, 각 파라미터에 대한 손실의 편미분(기울기)을 계산합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">가중치 업데이트</strong>: 구한
                        기울기를 이용해 경사 하강법 등으로 가중치·편향을 수정합니다. (실제
                        갱신은 보통 다음 단계 최적화에서 수행합니다.)
                      </li>
                    </ol>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p className="mb-3 text-zinc-500">
                    역전파가 만능은 아니며, 네트워크의 깊이·구조에 따라 다음과 같은 문제에
                    직면할 수 있습니다.
                  </p>
                  <div className="space-y-3">
                    <LimitCard
                      title="① 기울기 소실 및 폭주 (Vanishing & Exploding Gradient)"
                      mitigation={
                        <ul className="list-disc space-y-1.5 pl-4 marker:text-violet-400/50">
                          <li>
                            ReLU·Leaky ReLU 등 <strong className="text-zinc-300">미분 상한이
                            덜 빡빡한 활성화</strong>로 바꾸거나, 잔차 연결로 경로를 짧게
                            둡니다.
                          </li>
                          <li>
                            He·Xavier 등 <strong className="text-zinc-300">가중치 초기화</strong>
                            와 배치 정규화·레이어 정규화로 스케일을 안정화합니다.
                          </li>
                          <li>
                            <strong className="text-zinc-300">그래디언트 클리핑</strong>·적절한
                            학습률로 폭주를 억제하고, RNN이면 게이트 구조(LSTM 등)를 검토합니다.
                          </li>
                        </ul>
                      }
                    >
                      <p>
                        <strong className="text-zinc-300">소실</strong>: 시그모이드처럼 미분값이
                        0과 1 사이인 활성화를 층마다 곱하다 보면, 앞쪽 층으로 갈수록 기울기가
                        너무 작아져 학습이 거의 일어나지 않을 수 있습니다.
                      </p>
                      <p>
                        <strong className="text-zinc-300">폭주</strong>: 반대로 기울기가 계속
                        커져 가중치가 발산하는 현상입니다. 순환 신경망(RNN) 등에서 특히 잘
                        이야기됩니다.
                      </p>
                    </LimitCard>
                    <LimitCard
                      title="② 국소 최적해·안장점 (Local Minima & Saddle Points)"
                      mitigation={
                        <ul className="list-disc space-y-1.5 pl-4 marker:text-violet-400/50">
                          <li>
                            Adam·RMSprop 등 <strong className="text-zinc-300">모멘텀·적응적
                            학습률</strong>을 써서 평평한 구간에서도 관성으로 빠져나옵니다.
                          </li>
                          <li>
                            <strong className="text-zinc-300">학습률 워밍업·스케줄</strong>로
                            초반 탐색을 넓힙니다.
                          </li>
                          <li>
                            <strong className="text-zinc-300">앙상블·다른 시드</strong>로 여러
                            번 학습해 나쁜 국소해에만 갇히지 않게 합니다.
                          </li>
                        </ul>
                      }
                    >
                      <p>
                        손실 표면이 복잡하면 전역적으로 가장 낮은 지점이 아니라,{" "}
                        <strong className="text-zinc-300">국소 최적해</strong>나{" "}
                        <strong className="text-zinc-300">안장점</strong> 근처에서 학습이
                        더뎌질 수 있습니다.
                      </p>
                    </LimitCard>
                    <LimitCard
                      title="③ 학습률 (Learning Rate) 설정"
                      mitigation={
                        <ul className="list-disc space-y-1.5 pl-4 marker:text-violet-400/50">
                          <li>
                            <strong className="text-zinc-300">스케줄링</strong>(코사인·단계
                            감소 등)과 검증 손실 기반 <strong className="text-zinc-300">조기
                            감소</strong>로 보폭을 줄입니다.
                          </li>
                          <li>
                            Adam 등 <strong className="text-zinc-300">적응적 옵티마이저</strong>
                            로 차원마다 보폭을 조절합니다.
                          </li>
                          <li>
                            그리드·랜덤·베이즈 등으로 <strong className="text-zinc-300">학습률
                            탐색</strong>을 하고, 가능하면 한 사이클 큰 학습률에서 찾는
                            루틴(예: LR range test)을 참고합니다.
                          </li>
                        </ul>
                      }
                    >
                      <p>
                        기울기를 구했어도, 한 스텝에 얼마나 크게 움직일지는 학습률이
                        결정합니다. <strong className="text-zinc-300">너무 크면</strong>{" "}
                        최적점을 지나쳐 발산하거나 진동하고,{" "}
                        <strong className="text-zinc-300">너무 작으면</strong> 수렴이 매우
                        느립니다.
                      </p>
                    </LimitCard>
                  </div>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>

            <TheoryTopicAccordion
              id="theory-optimization"
              title="최적화 (Optimization)"
              subtitle="4단계: 실제 수정 — 그래디언트로 파라미터 갱신"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    최적화는 역전파로 얻은 그래디언트를 사용해{" "}
                    <strong className="text-zinc-300">가중치·편향을 실제로 고치는</strong>
                    단계입니다. SGD, Adam 등은 같은 그래디언트를 서로 다른 규칙으로 스케일링·
                    누적합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    가장 단순한 아이디어는 <strong className="text-zinc-300">손실이 내려가는
                    방향으로 파라미터를 한 걸음씩 옮기는 것</strong>입니다. 걸음의 크기는{" "}
                    <strong className="text-zinc-300">학습률</strong>로 조절합니다. 파라미터가
                    많을 때도 요소마다 같은 원리를 적용합니다.
                  </p>
                  <p className="mt-2">
                    프레임워크에서 고르는 <strong className="text-zinc-300">옵티마이저</strong>
                    는 “같은 그래디언트를 어떤 규칙으로 스텝에 반영할지”를 바꿉니다. 아래는
                    대표적인 종류입니다.
                  </p>
                </DetailBlock>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/90">
                    보충 · 대표 옵티마이저
                  </p>
                  <div className="mt-3 space-y-4 text-sm leading-relaxed text-zinc-400">
                    <div>
                      <p className="font-medium text-zinc-200">
                        SGD (Stochastic Gradient Descent, 확률적 경사 하강법)
                      </p>
                      <p className="mt-1">
                        미니배치로 구한 그래디언트에 학습률을 곱해{" "}
                        <strong className="text-zinc-300">한 스텝</strong>만큼 파라미터를
                        줄입니다. 구현이 단순하고 다른 방법의{" "}
                        <strong className="text-zinc-300">기준선</strong>이 됩니다. 배치
                        노이즈가 그래디언트 추정을 흔들 수 있어 보폭·스케줄이 중요합니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">Momentum (모멘텀)</p>
                      <p className="mt-1">
                        현재 그래디언트만 쓰지 않고, <strong className="text-zinc-300">이전
                        스텝들의 방향을 관성처럼 섞어</strong> 업데이트합니다. 손실 지형이
                        좁은 골짜기일 때 좌우로만 진동하는 현상을 줄이고, 한 방향으로 꾸준히
                        가야 할 때 수렴을 돕습니다. 계수(보통 베타)로 과거 비중을 조절합니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">RMSprop</p>
                      <p className="mt-1">
                        파라미터마다 <strong className="text-zinc-300">최근 그래디언트 제곱의
                        이동 평균</strong>을 두고, 자주 크게 요동하는 축은 보폭을 줄이고 덜
                        변한 축은 상대적으로 크게 움직이게 하는{" "}
                        <strong className="text-zinc-300">적응적 학습률</strong> 계열입니다.
                        RNN 등에서 쓰기 좋다고 알려져 있습니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">Adam / AdamW</p>
                      <p className="mt-1">
                        <strong className="text-zinc-300">모멘텀</strong>과 비슷한 1차 모멘트,
                        그래디언트 제곱의 2차 모멘트를 함께 써서{" "}
                        <strong className="text-zinc-300">축마다 보폭을 자동으로 조절</strong>
                        합니다. 많은 범용 학습에서 기본 후보로 쓰입니다.{" "}
                        <strong className="text-zinc-300">AdamW</strong>는 가중치 감쇠(정규화에
                        가까움)를 손실 그래디언트와 섞지 않고{" "}
                        <strong className="text-zinc-300">옵티마이저 단계에서 분리</strong>해
                        적용하는 방식으로, 이론·실무 모두에서 자주 권장됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                <DetailBlock label="결과">
                  <p>
                    한 번 갱신이 끝나면 파라미터가 손실을 줄이는 쪽으로 조금 움직입니다. 이후{" "}
                    <strong className="text-zinc-300">다시 순전파</strong>로 돌아가 같은 사이클을
                    반복하고, 에폭이 지날수록 예측이 나아지길 기대합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    지도를 보며 <strong className="text-zinc-300">가파른 내리막 방향으로 한
                    걸음씩</strong> 내려가 목적지에 가까워지는 등산과 비슷합니다. 학습률은 보폭,
                    Adam 류는 지형에 맞춰 보폭을 조절하는 보조 장치에 가깝습니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      같은 그래디언트라도 옵티마이저에 따라{" "}
                      <strong className="text-zinc-300">수렴 속도·안정성</strong>이 달라집니다.
                      적응적 방법은 희소한 차원과 자주 갱신되는 차원을 다르게 다루는 데 유리한
                      경우가 많습니다.
                    </p>
                  </DetailBlock>
                </div>

                <DetailBlock label="최적화 vs 정규화">
                  <p className="mb-3">
                    둘 다 학습에 쓰이지만 <strong className="text-zinc-300">역할이 다릅니다.
                    </strong> 표로 나란히 보면 구분이 쉽습니다.
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-zinc-700/80">
                    <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                      <caption className="sr-only">최적화와 정규화 비교</caption>
                      <thead>
                        <tr className="border-b border-zinc-700 bg-zinc-800/70">
                          <th
                            scope="col"
                            className="w-[24%] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-400"
                          >
                            구분
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2.5 text-xs font-semibold text-emerald-200/90"
                          >
                            최적화
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2.5 text-xs font-semibold text-sky-200/90"
                          >
                            정규화
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-zinc-400">
                        <tr className="border-b border-zinc-800/90">
                          <th
                            scope="row"
                            className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                          >
                            하는 일
                          </th>
                          <td className="px-3 py-2.5 leading-relaxed">
                            그래디언트를 받아 <strong className="text-zinc-300">파라미터를
                            어느 방향·얼마나 움직일지</strong> 정하는{" "}
                            <strong className="text-zinc-300">업데이트 규칙</strong>입니다.
                          </td>
                          <td className="px-3 py-2.5 leading-relaxed">
                            모델이 데이터에 <strong className="text-zinc-300">과하게 맞는 것
                            </strong>을 줄이기 위해 손실·구조에{" "}
                            <strong className="text-zinc-300">제약·무작위성</strong>을 겁니다.
                          </td>
                        </tr>
                        <tr className="border-b border-zinc-800/90">
                          <th
                            scope="row"
                            className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                          >
                            지향점
                          </th>
                          <td className="px-3 py-2.5 leading-relaxed">
                            손실을 <strong className="text-zinc-300">빠르고 안정적으로
                            낮추는 경로</strong> 탐색(수렴, 안장·국소 극복 등).
                          </td>
                          <td className="px-3 py-2.5 leading-relaxed">
                            훈련 오차만 말고 <strong className="text-zinc-300">검증·테스트
                            일반화</strong>를 좋게 하려는 쪽.
                          </td>
                        </tr>
                        <tr className="border-b border-zinc-800/90">
                          <th
                            scope="row"
                            className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                          >
                            예시
                          </th>
                          <td className="px-3 py-2.5 leading-relaxed">
                            SGD, Momentum, RMSprop, Adam, AdamW, 학습률 스케줄.
                          </td>
                          <td className="px-3 py-2.5 leading-relaxed">
                            L2 가중치 감쇠, 드롭아웃, 배치·레이어 정규화, 조기 종료 등.
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="bg-zinc-900/50 px-3 py-2.5 text-xs font-semibold text-zinc-300"
                          >
                            같이 쓸 때
                          </th>
                          <td className="px-3 py-2.5 leading-relaxed" colSpan={2}>
                            한 루프 안에서 <strong className="text-zinc-300">동시에</strong>{" "}
                            돌아갑니다. 예를 들어 손실에 L2 항을 넣으면 그래디언트에도 반영되어
                            최적화가 그 방향으로 당깁니다.{" "}
                            <strong className="text-zinc-300">AdamW</strong>는 감쇠를 손실 미분과
                            분리해 쓰고 싶을 때 쓰는 조합입니다. 정규화만 바꾸거나 옵티마이저만
                            바꿔도 학습 곡선이 달라질 수 있습니다.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailBlock>

                <DetailBlock label="한계">
                  <p>
                    경사 기반 방법은 <strong className="text-zinc-300">미분 가능·연속적인
                    근사</strong>를 전제로 합니다. 학습률·모멘텀 하이퍼파라미터에 민감하고,
                    배치 노이즈가 큰 환경에서는 같은 설정이라도 재현성·수렴 곡선이 들쭉날쭉할
                    수 있습니다. 전역 최적을 보장하지는 않습니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">하이퍼파라미터 탐색</strong>: 학습률·
                        배치 크기·모멘텀·가중치 감쇠 등을 검증 손실 기준으로 체계적으로
                        스윕합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">안정화</strong>: 그래디언트 클리핑,
                        학습률 워밍업, 더 큰 배치·누적 그래디언트로 노이즈를 줄입니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">재현성</strong>: 시드 고정, 결정적
                        연산 옵션, 동일 환경에서 비교 실험을 반복합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">대안</strong>: 미분이 어려운 부분은
                        다른 목표 근사·진화 알고리즘 등을 검토하되, 딥러닝에서는 보통 위
                        튜닝을 먼저 합니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>

            </div>
          </section>

          <section id="theory-section-schedule" className="mb-12 scroll-mt-24">
            <TheorySectionHeading>학습 진행 단위</TheorySectionHeading>
            <div className="space-y-0">
            <TheoryTopicAccordion
              id="theory-epoch-batch"
              title="에폭(Epoch)과 배치(Batch)"
              subtitle="학습을 얼마나 자주·얼마나 잘게 나누어 도는지"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    <strong className="text-zinc-300">배치(batch)</strong>는 한 번의{" "}
                    <strong className="text-zinc-300">순전파 → 손실 → 역전파 → 최적화</strong>에
                    함께 넣는 샘플들의 묶음입니다. 묶음 안 샘플 개수가{" "}
                    <strong className="text-zinc-300">배치 크기(batch size)</strong>입니다.
                  </p>
                  <p className="mt-2">
                    <strong className="text-zinc-300">에폭(epoch)</strong>은 보통{" "}
                    <strong className="text-zinc-300">전체 훈련 데이터를 한 번씩 다 본 뒤
                    </strong> 끝나는 주기라고 이해하면 됩니다. 구현마다 셈법은 조금 다를 수
                    있지만, “데이터 한 바퀴”에 해당하는 큰 눈금입니다. (철자는{" "}
                    <strong className="text-zinc-300">epoch</strong>이 표준입니다.)
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식 · 1~4단계와의 연결">
                  <p>
                    <strong className="text-zinc-300">배치 하나</strong>를 처리할 때마다
                    1~4단계가 한 번 돌고, 가중치가 한 번 갱신됩니다. 이 한 번을{" "}
                    <strong className="text-zinc-300">스텝(step)</strong> 또는{" "}
                    <strong className="text-zinc-300">이터레이션(iteration)</strong>이라고도
                    부릅니다.
                  </p>
                  <p className="mt-2">
                    훈련 샘플이 많으면 한 에폭 안에{" "}
                    <strong className="text-zinc-300">배치 여러 개</strong>가 순서대로
                    들어갑니다. 대략{" "}
                    <strong className="text-zinc-300">한 에폭의 스텝 수</strong>는 전체 샘플
                    수를 배치 크기로 나눈 횟수(올림)와 비슷합니다.
                  </p>
                  <p className="mt-2">
                    <strong className="text-zinc-300">배치 크기 = 전체 훈련 샘플 수</strong>이면
                    배치 하나가 곧 전체 데이터라, 스텝 한 번이 곧 한 에폭에 가깝습니다(배치
                    경사 하강). 반대로 배치를 작게 쪼개면 같은 에폭 안에서 스텝 수가 늘고,
                    각 스텝의 그래디언트는 일부 샘플만 본 <strong className="text-zinc-300">추정치
                    </strong>가 됩니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    로그에는 보통 <strong className="text-zinc-300">스텝마다 또는 배치마다
                    손실</strong>이 찍히고, 에폭이 바뀔 때마다{" "}
                    <strong className="text-zinc-300">검증 손실·정확도</strong>를 재는 식으로
                    요약합니다. 배치 크기와 에폭 수는 학습 시간·메모리·수렴 모양에 직접
                    영향을 줍니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    <strong className="text-zinc-300">배치</strong>는 두꺼운 문제집을{" "}
                    <strong className="text-zinc-300">한 번에 몇 페이지씩</strong>만 펴서 풀고
                    채점·오답 정리하는 단위와 비슷합니다.{" "}
                    <strong className="text-zinc-300">에폭</strong>은 그렇게 페이지를 넘기다가{" "}
                    <strong className="text-zinc-300">책 전체를 한 번 다 본 라운드</strong>에
                    가깝습니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      배치를 작게 하면 <strong className="text-zinc-300">그래디언트에 노이즈
                      </strong>가 섞여 지역 최적에서 빠져나오기 쉬울 수 있지만, 스텝이 많아져
                      시간이 걸립니다. 크게 하면 추정이 안정되지만{" "}
                      <strong className="text-zinc-300">메모리</strong>를 많이 쓰고, 너무 크면
                      일반화·수렴에 불리한 경우도 있습니다.
                    </p>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p>
                    <strong className="text-zinc-300">에폭</strong> 정의가 코드·도구마다 미세하게
                    다를 수 있고, <strong className="text-zinc-300">셔플(shuffle)</strong>을
                    켜면 에폭마다 배치 구성이 달라져 곡선이 조금씩 달라집니다. 작은 배치는
                    손실이 들쭉날쭉해 보일 수 있어 해석이 어렵습니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">배치 크기</strong>: 검증 지표를 보며
                        GPU 메모리 한도 안에서 조절하고, 필요하면{" "}
                        <strong className="text-zinc-300">그래디언트 누적(accumulation)</strong>
                        으로 작은 배치를 여러 번 모아 큰 배치 효과를 냅니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">에폭·조기 종료</strong>: 검증 손실이
                        더 이상 좋아지지 않으면 에폭을 줄이고 학습을 멈춥니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">로그</strong>: 스텝 단위 손실은
                        이동 평균으로 부드럽게 보거나, 에폭 평균 손실을 함께 그립니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>
            </div>
          </section>

          <section id="theory-section-input-scale" className="mb-12 scroll-mt-24">
            <TheorySectionHeading>입력·데이터 스케일링</TheorySectionHeading>
            <div className="space-y-0">
            <TheoryTopicAccordion
              id="theory-input-scaling"
              title="입력·데이터 스케일링 (전처리)"
              subtitle="모델에 넣기 전 특성의 크기·분포를 맞추기 — 표준화, 최소–최대 등"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    <strong className="text-zinc-300">입력 스케일링</strong>은 학습 루프에
                    들어가기 <strong className="text-zinc-300">전에</strong>, 각 특성(픽셀 값,
                    수치 피처 등)의 단위·크기를 비슷한 범위로 맞추는 전처리입니다. 한국어로
                    “정규화”라고 부르는 경우가 많아,{" "}
                    <strong className="text-zinc-300">Regularization(일반화)</strong>·{" "}
                    <strong className="text-zinc-300">배치 정규화</strong>와 헷갈리기 쉽습니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    <strong className="text-zinc-300">표준화</strong>에 가까운 방식은 특성마다
                    평균을 빼고 표준편차(또는 비슷한 척도)로 나누어, 값이{" "}
                    <strong className="text-zinc-300">0 근처에 모이고 스케일이 비슷해지게</strong>{" "}
                    맞춥니다. 훈련 데이터로 통계를 잡고, 같은 규칙을 검증·테스트·추론에도
                    적용합니다.
                  </p>
                  <p className="mt-2">
                    <strong className="text-zinc-300">최소–최대 스케일링</strong> 등은 값을
                    고정 구간(예: 0~1)으로 옮겨, 서로 다른 단위의 특성이 한쪽만 지배하는
                    현상을 줄입니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    스케일이 맞으면 경사 기반 학습에서{" "}
                    <strong className="text-zinc-300">같은 학습률이라도 차원마다 덜 불공평하게
                    </strong> 갱신되는 경우가 많고, 수렴이 안정되거나 빨라지는 경우가
                    있습니다. 다만 문제·모델마다 꼭 필요하지는 않습니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    여러 과목 점수를 비교할 때 <strong className="text-zinc-300">만점이 다른
                    시험을 같은 척도로 환산</strong>해 보는 것과 비슷합니다. 그대로 더하면 한
                    과목이 전체를 지배하기 쉽습니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      전처리 파이프라인에서 한 번 정해 두면, 이후 학습 루프는{" "}
                      <strong className="text-zinc-300">이미 맞춰진 입력</strong>을 받습니다.
                      도메인 지식(이상치, 의미 있는 스케일)과 함께 설계하는 경우가 많습니다.
                    </p>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p>
                    훈련에만 맞춘 통계를 쓰면 <strong className="text-zinc-300">검증·실서비스
                    분포</strong>와 어긋날 수 있고, 이상치가 크면 평균·분산이 흔들립니다.
                    테스트 데이터 정보가 전처리에 섞이면 <strong className="text-zinc-300">누수
                    </strong>가 됩니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">파이프라인 분리</strong>: 훈련으로만
                        평균·분산·최소·최대를 추정하고, 동일 변환을 검증·테스트에 적용합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">이상치·결측</strong>: 클리핑, 대체,
                        로그 변환 등으로 스케일링 전에 분포를 다듬습니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">분포 이동</strong>: 시간에 따라
                        입력 분포가 바뀌면 주기적으로 통계를 갱신하거나 모니터링합니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>
            </div>
          </section>

          <section id="theory-section-generalization" className="mb-12 scroll-mt-24">
            <TheorySectionHeading>일반화 (Regularization)</TheorySectionHeading>
            <div className="space-y-0">
            <TheoryTopicAccordion
              id="theory-regularization"
              title="일반화 (Regularization)"
              subtitle="가중치 감쇠·드롭아웃·조기 종료 — 과적합을 줄이는 Regularization (입력 스케일링과 구분)"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    여기서 말하는 <strong className="text-zinc-300">정규화(Regularization)</strong>는{" "}
                    <strong className="text-zinc-300">입력·데이터 스케일링</strong>이 아니라,{" "}
                    <strong className="text-zinc-300">학습 데이터에만 과하게 맞는 것</strong>을 줄이고
                    보지 못한 데이터에서도 잘 동작하도록 <strong className="text-zinc-300">일반화</strong>
                    를 돕는 기법입니다. 손실에 벌점을 더하거나 네트워크에 무작위성·제약을 넣는 식으로
                    <strong className="text-zinc-300"> 모델 복잡도·과적합</strong>을 다룹니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    <strong className="text-zinc-300">가중치 감쇠</strong>는 손실에 “가중치가
                    너무 크면 벌점”을 더해, 파라미터가 과하게 튀지 않게 합니다. 벌점의 세기는
                    하이퍼파라미터로 조절합니다.
                  </p>
                  <p className="mt-2">
                    <strong className="text-zinc-300">드롭아웃</strong>은 학습할 때 일부
                    뉴런을 임의로 끄어, 특정 뉴런들만 맞춰 암기하는 현상을 줄입니다.
                  </p>
                  <p className="mt-2">
                    <strong className="text-zinc-300">조기 종료(early stopping)</strong>는
                    검증 손실이 더 이상 좋아지지 않을 때 학습을 멈춰, 훈련 데이터에만 과하게
                    맞는 구간을 줄입니다.
                  </p>
                  <p className="mt-2">
                    층 안에서 활성값 분포를 다루는{" "}
                    <strong className="text-zinc-300">배치·레이어 정규화</strong> 등은 이
                    묶음과 겹쳐 보일 수 있지만, 역할이 달라{" "}
                    <strong className="text-zinc-300">아래 활성화 정규화</strong> 절에서 따로
                    정리합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    검증·테스트에서 오차가 줄거나, 같은 데이터로도 더 안정적인 결정 경계를
                    얻는 등 <strong className="text-zinc-300">훈련 점수만 좋은 상태</strong>를
                    완화하는 방향으로 기대합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    한 권만 달달 외우는 대신 <strong className="text-zinc-300">다른 변형
                    문제도 풀게 하는 복습 루틴</strong>을 넣는 것과 비슷합니다. 암기에만 치우치지
                    않게 합니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      정규화는 <strong className="text-zinc-300">과적합을 직접 겨냥</strong>할
                      수 있어, 검증·테스트 성능을 끌어올리는 데 자주 쓰입니다. 손실에 벌점을
                      더하는 방식은 구현이 단순하고 해석도 쉬운 편입니다.
                    </p>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p>
                    벌점 세기를 잘못 잡으면 <strong className="text-zinc-300">과소적합</strong>이 나와 훈련 자체가 부족해질 수 있습니다. 드롭아웃은 추론 시 보정이 필요하고, 감쇠·드롭아웃 강도를 맞추지 못하면 검증 성능이 오히려 떨어질 수 있습니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">강도 튜닝</strong>: 검증 곡선을 보며
                        가중치 감쇠 계수·드롭아웃 비율을 조절하고, 과소적합이면 약하게
                        줄입니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">드롭아웃 추론</strong>: 학습과
                        추론 시 스케일을 맞추는 공식(가중치 스케일링 등)을 프레임워크 가이드에
                        맞게 적용합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">조합</strong>: 데이터 증강, 다른
                        감쇠 계열, 드롭아웃 비율 조정 등과 맞물려 검증 곡선을 보며 조합합니다.
                        층 내부 정규화는 <strong className="text-zinc-300">활성화 정규화</strong>{" "}
                        절을 참고합니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>
            </div>
          </section>

          <section id="theory-section-activation-norm" className="mb-12 scroll-mt-24">
            <TheorySectionHeading>활성화 정규화</TheorySectionHeading>
            <div className="space-y-0">
            <TheoryTopicAccordion
              id="theory-activation-norm"
              title="활성화 정규화 (배치·레이어·그룹)"
              subtitle="층 사이 활성값 분포를 안정시키는 정규화 층 — 학습 촉진·간접 일반화"
              openBorderClassName="open:border-zinc-500/35"
              chevronClassName="text-white"
              detailsClassName="border-zinc-700/40"
            >
              <div className="space-y-5">
                <DetailBlock label="정의">
                  <p>
                    <strong className="text-zinc-300">활성화 정규화</strong>는 가중치가 아니라
                    <strong className="text-zinc-300"> 층을 통과한 중간 값(활성화)</strong>의
                    평균·분산을 조정해, 깊은 네트워크에서 신호가 너무 커지거나 작아지는
                    현상을 줄이는 층·연산입니다. <strong className="text-zinc-300">배치
                    정규화(BatchNorm)</strong>, <strong className="text-zinc-300">레이어
                    정규화(LayerNorm)</strong>, <strong className="text-zinc-300">그룹
                    정규화</strong> 등이 대표적입니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="동작 방식">
                  <p>
                    보통 미니배치나 시퀀스 단위로 채널·위치별 평균·분산을 구해{" "}
                    <strong className="text-zinc-300">정해진 분포에 가깝게 다시 맞춘 뒤</strong>,
                    학습 가능한 스케일·이동 파라미터로 표현력을 일부 되살립니다. 구현마다
                    어떤 축으로 평균을 낼지가 달라 <strong className="text-zinc-300">배치
                    정규화</strong>는 배치 통계에 의존하고, <strong className="text-zinc-300">레이어
                    정규화</strong>는 배치 크기에 덜 민감한 편이라 트랜스포머 등에서 자주
                    씁니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="결과">
                  <p>
                    학습이 <strong className="text-zinc-300">더 안정되거나 빨라지는</strong>{" "}
                    경우가 많고, 때로는 <strong className="text-zinc-300">약한 정규화 효과
                    </strong>로 검증 성능에도 도움이 됩니다. 다른 하이퍼파라미터(학습률 등)에
                    대한 여유가 생기기도 합니다.
                  </p>
                </DetailBlock>
                <DetailBlock label="현실 비유">
                  <p>
                    여러 층을 거치며 신호가 흐를 때마다 <strong className="text-zinc-300">볼륨을
                    자동으로 맞춰 주는 이퀄라이저</strong>에 가깝습니다. 한 단계가 너무 크게
                    울리면 다음 단계가 망가지기 쉬워서, 중간에서 분포를 고정에 가깝게
                    유지합니다.
                  </p>
                </DetailBlock>
                <div className="border-t border-zinc-800 pt-5">
                  <DetailBlock label="특징">
                    <p>
                      <strong className="text-zinc-300">일반화(Regularization)</strong> 절의
                      L2·드롭아웃과는 목적이 겹치지 않습니다. 여기서는 주로{" "}
                      <strong className="text-zinc-300">전방 전파 시그널·그래디언트 흐름
                      </strong>을 다룹니다. 표와 함께 보면 구분이 쉽습니다.
                    </p>
                  </DetailBlock>
                </div>
                <DetailBlock label="한계">
                  <p>
                    배치 정규화는 <strong className="text-zinc-300">배치 크기가 너무 작으면
                    </strong> 통계 추정이 불안정해질 수 있고, 배치 간 분포 차이가 큰 추론
                    환경에서는 맞지 않을 수 있습니다. 추론 시에는 학습 중 통계를 고정해 쓰는
                    식으로 동작이 달라지므로, 프레임워크 기본 동작을 확인하는 것이 좋습니다.
                  </p>
                  <MitigationBox>
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-zinc-600">
                      <li>
                        <strong className="text-zinc-300">배치 크기</strong>: 너무 작으면
                        배치 정규화 대신 레이어·그룹 정규화 등을 검토합니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">도메인</strong>: 배치 통계가 의미
                        없는 설정(배치 1 추론 등)이면 다른 정규화 층으로 바꿉니다.
                      </li>
                      <li>
                        <strong className="text-zinc-300">튜닝</strong>: 정규화 층 유무·위치를
                        바꿔 검증 손실을 비교합니다.
                      </li>
                    </ul>
                  </MitigationBox>
                </DetailBlock>
              </div>
            </TheoryTopicAccordion>
            </div>
          </section>

          <p className="mt-8 text-xs text-zinc-600">
            손실·가중치 흐름은{" "}
            <Link
              href={ROUTES.deep.lab.backPropagation}
              className="text-zinc-100 hover:text-white"
            >
              역전파 실습
            </Link>
            , 옵티마이저 비교는{" "}
            <Link
              href={ROUTES.deep.lab.optimization}
              className="text-zinc-100 hover:text-white"
            >
              최적화 실습
            </Link>
            과 함께 보면 이해에 도움이 됩니다.
          </p>
        </main>
      </div>
    </TheoryShell>
  );
}
