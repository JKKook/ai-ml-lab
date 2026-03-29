import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";
import { MathExpr } from "@/components/theory/MathExpr";

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
              딥러닝 실습(선형층·회귀·손실)과 직결되는 선형 함수·다중 선형 회귀·텐서 기초를 정리합니다.
              항목을 눌러 펼치세요.
            </p>
          </header>

          <TheoryTopicAccordion
            title="텐서와 차원: 스칼라, 벡터, 행렬"
            subtitle="0·1·2차원 · PyTorch에서의 동일 개념"
            defaultOpen
          >
            <div className="space-y-4 text-zinc-400">
              <p>
                <strong className="text-zinc-300">텐서(tensor)</strong>는 숫자들을 격자 형태로
                담은 객체이며, <strong className="text-zinc-300">차원 수(rank)</strong>에 따라
                익숙한 이름이 붙습니다.
              </p>
              <ul className="list-inside list-disc space-y-2 marker:text-zinc-600">
                <li>
                  <strong className="text-zinc-300">스칼라</strong> (0차원): 숫자 하나.{" "}
                  <MathExpr tex="a \in \mathbb{R}" />, PyTorch에서는{" "}
                  <code className="text-zinc-300">torch.tensor(3.14)</code>처럼 shape{" "}
                  <code className="text-zinc-300">()</code>.
                </li>
                <li>
                  <strong className="text-zinc-300">벡터</strong> (1차원): 순서 있는 수의 나열.{" "}
                  <MathExpr tex="\mathbf{x} \in \mathbb{R}^d" />, shape{" "}
                  <code className="text-zinc-300">(d,)</code> 또는{" "}
                  <code className="text-zinc-300">(d, 1)</code>·
                  <code className="text-zinc-300">(1, d)</code>로 열/행 벡터를 표현하기도 합니다.
                </li>
                <li>
                  <strong className="text-zinc-300">행렬</strong> (2차원): 행과 열.{" "}
                  <MathExpr tex="\mathbf{A} \in \mathbb{R}^{m \times n}" />, shape{" "}
                  <code className="text-zinc-300">(m, n)</code>. 선형층 한 배치는{" "}
                  <code className="text-zinc-300">(N, d_in)</code> 입력을{" "}
                  <code className="text-zinc-300">(N, d_out)</code>로 바꿉니다.
                </li>
                <li>
                  <strong className="text-zinc-300">3차원 이상</strong>: 예를 들어 이미지 미니배치{" "}
                  <code className="text-zinc-300">(N, C, H, W)</code>는 RGB 채널·높이·너비가
                  추가된 텐서입니다. <strong className="text-zinc-300">broadcasting</strong>으로
                  모양이 다른 텐서 간 연산이 맞춰지기도 합니다.
                </li>
              </ul>
              <MathExpr display tex="\mathbf{y} = \mathbf{X}\mathbf{w} + b\,\mathbf{1} \quad\text{(행렬·벡터 형태의 선형 모델)}" />
              <p>
                노트북의 <code className="text-zinc-300">torch.randn(1000, 10)</code>는{" "}
                <strong className="text-zinc-300">랭크-2 텐서</strong>(행렬)이고, 각 행이 하나의
                10차원 샘플입니다. <code className="text-zinc-300">np.dot(inputs,
                weights_hidden)</code>는 행렬 곱으로 은닉층 선형결합에 대응합니다.
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
            subtitle="한 실수 입력에서의 1차 다항식 · 뉴런의 선형 변환과 같은 구조"
          >
            <div className="space-y-4 text-zinc-400">
              <p>
                변수 <MathExpr tex="x" />에 대하여{" "}
                <strong className="font-medium text-zinc-300">차수가 1인 함수</strong>란,{" "}
                <MathExpr tex="x" />의 거듭제곱이 최대 1제곱까지만 나타나는 함수를 말합니다. 가장
                일반적인 형태는 다음과 같습니다.
              </p>

              <MathExpr display tex="f(x) = ax + b" />

              <ul className="list-inside list-disc space-y-3 marker:text-zinc-600">
                <li>
                  <MathExpr tex="a" />{" "}
                  <span className="text-zinc-300">(기울기, Gradient / Slope)</span>:{" "}
                  <MathExpr tex="x" />가 조금 변할 때 <MathExpr tex="f(x)" />가 얼마나 변하는지를
                  나타냅니다. 그래프에서는 직선의 기울기이고, 딥러닝에서는 보통 같은 역할을 하는
                  스칼라를 <strong className="text-zinc-300">가중치(Weight, </strong>
                  <MathExpr tex="w" />
                  <strong className="text-zinc-300">)</strong>라고 부릅니다. 즉{" "}
                  <MathExpr tex="f(x) = wx + b" />와 동일한 구조입니다.
                </li>
                <li>
                  <MathExpr tex="b" /> <span className="text-zinc-300">(절편, Intercept)</span>:{" "}
                  <MathExpr tex="x = 0" />일 때의 함수값 <MathExpr tex="f(0) = b" />입니다. 그래프에서는{" "}
                  <MathExpr tex="y" />축과 만나는 높이이며, 딥러닝에서는{" "}
                  <strong className="text-zinc-300">편향(Bias, </strong>
                  <MathExpr tex="b" />
                  <strong className="text-zinc-300">)</strong>라고 부릅니다.{" "}
                  <MathExpr tex="b" />를 바꾸면 직선 전체가 위·아래로{" "}
                  <strong className="text-zinc-300">평행 이동</strong>합니다.
                </li>
              </ul>

              <p>
                <MathExpr tex="w" />의 절대값이 클수록 같은 입력 변화에 대해 출력 변화가 커져
                직선이 가파르고, 부호에 따라 증가/감소 방향이 바뀝니다. 신경망에서 입력이
                1차원인 한 뉴런의 선형 부분은 곧 이{" "}
                <MathExpr tex="wx + b" />와 같은 형태입니다.
              </p>

              <p className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-500">
                실습의 <code className="text-zinc-400">z = Linear(10, 1)(inputs)</code>는 입력이
                10차원이므로 <MathExpr tex="w" />가 스칼라가 아니라 길이 10인{" "}
                <strong className="text-zinc-400">가중치 벡터</strong>이고, 선형 부분은{" "}
                <MathExpr tex="\mathbf{w}^{\mathsf{T}}\mathbf{x} + b" />로 쓰는{" "}
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
                특성이 <MathExpr tex="d" />개이면 입력을 열벡터{" "}
                <MathExpr tex="\mathbf{x} = (x_1, \ldots, x_d)^{\mathsf{T}}" />로 두고, 각 특성에
                대한 가중치를{" "}
                <MathExpr tex="\mathbf{w} = (w_1, \ldots, w_d)^{\mathsf{T}}" />로 둡니다. (
                <MathExpr tex="x_j, w_j \in \mathbb{R}" />) 예측값{" "}
                <MathExpr tex="\hat{y}" />는 다음과 같습니다.
              </p>

              <MathExpr display tex="\hat{y} = w_1 x_1 + w_2 x_2 + \cdots + w_d x_d + b = \mathbf{w}^{\mathsf{T}}\mathbf{x} + b" />

              <p>
                여기서 <MathExpr tex="\mathbf{w}^{\mathsf{T}}\mathbf{x}" />는 벡터{" "}
                <MathExpr tex="\mathbf{w}" />와 <MathExpr tex="\mathbf{x}" />의{" "}
                <strong className="text-zinc-300">내적(inner product)</strong>이며, 같은 위치
                성분끼리 곱한 뒤 모두 더한 값입니다.
              </p>

              <MathExpr display tex="\mathbf{w}^{\mathsf{T}}\mathbf{x} = \sum_{j=1}^{d} w_j x_j" />

              <p>
                데이터가 <MathExpr tex="N" />개 있고, <MathExpr tex="i" />번째 샘플의 입력·정답을{" "}
                <MathExpr tex="\mathbf{x}^{(i)}, y^{(i)}" />라 하면, 모든 샘플의 선형 예측을
                행렬로 묶어 쓸 수 있습니다. 입력 행렬{" "}
                <MathExpr tex="\mathbf{X} \in \mathbb{R}^{N \times d}" />의{" "}
                <MathExpr tex="i" />번째 행이 <MathExpr tex="(\mathbf{x}^{(i)})^{\mathsf{T}}" />일
                때,
              </p>

              <MathExpr display tex="\hat{\mathbf{y}} = \mathbf{X}\mathbf{w} + b\,\mathbf{1}_N" />

              <p>
                처럼 쓸 수 있습니다. 여기서 <MathExpr tex="\mathbf{1}_N" />은 길이{" "}
                <MathExpr tex="N" />인 1로만 채운 열벡터이고, 마지막 항은 브로드캐스트로 각
                행에 같은 편향 <MathExpr tex="b" />를 더하는 것과 같습니다.
              </p>

              <p>
                회귀에서는 정답 <MathExpr tex="y" />와 예측 <MathExpr tex="\hat{y}" />의 차이를
                제곱해 데이터 전체에 대해 평균낸 값을 자주 손실로 씁니다. 이것이{" "}
                <strong className="text-zinc-300">평균 제곱 오차(MSE)</strong>입니다.
              </p>

              <MathExpr display tex="\mathrm{MSE} = \frac{1}{N}\sum_{i=1}^{N} \bigl(y^{(i)} - \hat{y}^{(i)}\bigr)^2,\quad \hat{y}^{(i)} = \mathbf{w}^{\mathsf{T}}\mathbf{x}^{(i)} + b" />

              <p>
                선형 회귀의 해를 한 번에 구하는 <strong className="text-zinc-300">정규방정식(normal equation)</strong>
                은 차원이 크면 비용이 커져 딥러닝 규모에는 잘 쓰이지 않고, 대신{" "}
                <strong className="text-zinc-300">경사하강법</strong>이나 역전파로{" "}
                <MathExpr tex="\mathbf{w}" />, <MathExpr tex="b" />를 반복해서 갱신합니다. 실습
                노트북의 loss·backward와 같은 계열입니다.
              </p>

              <p className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-500">
                완전연결층의 한 뉴런도 “내적 + 편향”이므로, 위{" "}
                <MathExpr tex="\mathbf{w}^{\mathsf{T}}\mathbf{x} + b" />와 같은 수식으로 읽을 수
                있습니다. 출력 뉴런이 여러 개이면 <MathExpr tex="\mathbf{W}" />가 행렬이 되어{" "}
                <MathExpr tex="\mathbf{W}\mathbf{x} + \mathbf{b}" /> 형태로 확장됩니다.
              </p>
            </div>
          </TheoryTopicAccordion>
        </main>
      </div>
    </TheoryShell>
  );
}
