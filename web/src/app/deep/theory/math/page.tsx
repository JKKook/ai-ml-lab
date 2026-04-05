import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";

export default function TheoryMathPage() {
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
              <span className="text-zinc-400">수학</span>
            </p>
            <h1 className="text-3xl font-bold">수학 · 개념 정리</h1>
            <p className="text-sm text-zinc-500">
              딥러닝 실습(선형층·회귀·손실)과 직결되는 개념을{" "}
              <strong className="text-zinc-400">말로만</strong> 정리합니다. 수식 기호는 쓰지
              않고, 코드에서 보이는 shape·연산과 연결해 읽을 수 있게 했습니다.
            </p>
          </header>

          <TheoryTopicAccordion
            title="텐서와 차원: 스칼라, 벡터, 행렬"
            subtitle="0·1·2차원 · PyTorch에서의 동일 개념"
            defaultOpen
          >
            <div className="space-y-4 text-zinc-400">
              <p>
                <strong className="text-zinc-300">텐서</strong>는 숫자들을 격자 형태로 담은
                객체이며, <strong className="text-zinc-300">차원 수</strong>에 따라 익숙한
                이름이 붙습니다.
              </p>
              <ul className="list-inside list-disc space-y-2 marker:text-zinc-600">
                <li>
                  <strong className="text-zinc-300">스칼라</strong> (0차원): 숫자 하나. 실수
                  하나라고 보면 됩니다. PyTorch에서는{" "}
                  <code className="text-zinc-300">torch.tensor(3.14)</code>처럼 shape이 빈
                  튜플인 텐서로 표현합니다.
                </li>
                <li>
                  <strong className="text-zinc-300">벡터</strong> (1차원): 순서 있는 수의 나열.
                  길이가 몇인지가 shape의 첫 번째 축으로 나옵니다. 열·행 벡터처럼 해석하려면
                  shape을{" "}
                  <code className="text-zinc-300">(d, 1)</code> 또는{" "}
                  <code className="text-zinc-300">(1, d)</code>로 두기도 합니다.
                </li>
                <li>
                  <strong className="text-zinc-300">행렬</strong> (2차원): 행과 열. shape은{" "}
                  <code className="text-zinc-300">(행 개수, 열 개수)</code>입니다. 선형층 한
                  배치는 보통 “샘플 수 × 입력 차원” 형태의 입력을 “샘플 수 × 출력 차원”으로
                  바꿉니다.
                </li>
                <li>
                  <strong className="text-zinc-300">3차원 이상</strong>: 예를 들어 이미지
                  미니배치는 배치 크기, 채널, 높이, 너비 순의 네 축으로 표현합니다.{" "}
                  <strong className="text-zinc-300">브로드캐스팅</strong>으로 모양이 다른
                  텐서끼리 연산이 맞춰지기도 합니다.
                </li>
              </ul>
              <p>
                선형 모델을 행렬·벡터로 한꺼번에 쓰면, 여러 샘플의 예측을 “입력 행렬과 가중치
                벡터의 곱에 편향을 더한 것”으로 묶어서 표현할 수 있습니다. 노트북의{" "}
                <code className="text-zinc-300">torch.randn(1000, 10)</code>는{" "}
                <strong className="text-zinc-300">행렬 텐서</strong>이고, 각 행이 하나의
                10차원 샘플입니다.{" "}
                <code className="text-zinc-300">np.dot(inputs, weights_hidden)</code>는 행렬
                곱으로 은닉층의 선형 결합에 대응합니다.
              </p>
              <p className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-500">
                코드에서 쓰는 API 해설은{" "}
                <Link
                  href={ROUTES.deep.theory.code}
                  className="text-violet-400 hover:text-violet-300"
                >
                  이론 · 코드
                </Link>
                페이지를 참고하세요.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="선형 함수 (Linear function)"
            subtitle="한 실수 입력에서의 1차 관계 · 뉴런의 선형 변환과 같은 구조"
          >
            <div className="space-y-4 text-zinc-400">
              <p>
                입력에 대해 <strong className="font-medium text-zinc-300">최고 차수가 한 번만
                나오는</strong> 관계를 선형이라고 부릅니다. 한 입력만 있을 때는 “입력에 어떤
                비율을 곱하고, 고정된 값을 더한 형태”로 생각하면 됩니다.
              </p>

              <ul className="list-inside list-disc space-y-3 marker:text-zinc-600">
                <li>
                  <span className="text-zinc-300">기울기</span>: 입력이 조금 변할 때 출력이
                  얼마나 변하는지를 나타냅니다. 그래프에서는 직선의 가파름이고, 딥러닝에서는
                  보통 <strong className="text-zinc-300">가중치</strong>라고 부릅니다. 한
                  뉴런·한 차원이면 숫자 하나, 여러 입력이면 각 입력마다 따로 둡니다.
                </li>
                <li>
                  <span className="text-zinc-300">절편(편향)</span>: 입력이 모두 0일 때 출력이
                  얼마인지에 해당합니다. 그래프에서는 세로축과 만나는 높이입니다. 이 값만 바꾸면
                  직선 전체가 위·아래로 <strong className="text-zinc-300">평행 이동</strong>
                  합니다.
                </li>
              </ul>

              <p>
                가중치의 크기가 클수록 같은 입력 변화에 출력 변화가 커져 직선이 가파르고,
                부호에 따라 증가·감소 방향이 바뀝니다. 신경망에서 입력이 한 차원인 뉴런의
                선형 부분은 이 구조와 같습니다.
              </p>

              <p className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-500">
                실습의 <code className="text-zinc-400">z = Linear(10, 1)(inputs)</code>는 입력이
                10차원이므로 가중치는 숫자 하나가 아니라{" "}
                <strong className="text-zinc-400">길이 10인 벡터</strong>이고, 선형 부분은 각
                입력 성분에 대응하는 가중치를 곱해 모두 더한 뒤 편향을 더하는{" "}
                <strong className="text-zinc-400">다중 선형 회귀</strong>와 같은 구조로
                일반화됩니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="다중 선형 회귀 (Multiple linear regression)"
            subtitle="여러 특성·벡터 입력 · 내적과 행렬로 한 번에 쓰기"
          >
            <div className="space-y-4 text-zinc-400">
              <p>
                특성이 여러 개면, 각 특성마다 가중치를 두고{" "}
                <strong className="text-zinc-300">특성값과 가중치를 곱한 것들을 전부 더한 뒤
                편향을 더한 값</strong>이 예측이 됩니다. 이 “곱해서 더하기”가 벡터끼리 할 때는{" "}
                <strong className="text-zinc-300">내적</strong>이라고 부릅니다.
              </p>

              <p>
                데이터가 여러 샘플이면, 각 샘플의 특성을 한 행에 모은{" "}
                <strong className="text-zinc-300">입력 행렬</strong>과 가중치 벡터를 곱해 모든
                샘플의 선형 예측을 한 번에 쓸 수 있습니다. 마지막에 각 행마다 같은 편향을 더하는
                것은 브로드캐스팅으로 처리합니다.
              </p>

              <p>
                회귀에서는 <strong className="text-zinc-300">정답과 예측의 차이를 제곱해
                데이터 전체에 대해 평균낸 값</strong>을 자주 손실로 씁니다. 이것이{" "}
                <strong className="text-zinc-300">평균 제곱 오차</strong>입니다. 차이가 클수록
                손실이 커집니다.
              </p>

              <p>
                선형 회귀의 해를 한 번에 구하는 정규방정식 방식은 차원이 크면 비용이 커져
                딥러닝 규모에는 잘 쓰이지 않고, 대신 <strong className="text-zinc-300">경사
                하강법</strong>이나 역전파로 가중치와 편향을 반복해서 갱신합니다. 실습
                노트북의 손실·backward와 같은 계열입니다.
              </p>

              <p className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-500">
                완전연결층의 한 뉴런도 “내적 + 편향”이므로 위와 같은 읽기를 그대로 쓸 수
                있습니다. 출력 뉴런이 여러 개이면 가중치가 벡터가 아니라{" "}
                <strong className="text-zinc-400">행렬</strong>이 되어, 한 번에 여러 뉴런의
                선형 출력을 만듭니다.
              </p>
            </div>
          </TheoryTopicAccordion>
        </main>
      </div>
    </TheoryShell>
  );
}
