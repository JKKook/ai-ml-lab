import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { TheoryShell } from "@/components/theory/TheoryShell";
import { TheoryTopicAccordion } from "@/components/theory/TheoryTopicAccordion";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 text-xs leading-relaxed text-violet-100/90">
      {children}
    </pre>
  );
}

export default function TheoryCodePage() {
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
              <span className="text-zinc-400">코드</span>
            </p>
            <h1 className="text-3xl font-bold">코드 · Python / PyTorch</h1>
            <p className="text-sm text-zinc-500">
              노트북 <code className="text-zinc-400">[W3]ActivationBackProp</code>에서 쓰는
              구문을 줄 단위로 짚습니다. 실습 페이지와 같은 흐름입니다.
            </p>
          </header>

          <TheoryTopicAccordion
            title="가져오기: torch, matplotlib"
            subtitle="Activation 섹션에서의 import"
            defaultOpen
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`import torch
import matplotlib.pyplot as plt`}</CodeBlock>
              <p>
                <strong className="text-zinc-300">torch</strong>: 텐서 연산·자동 미분·
                <code className="text-zinc-300">nn</code> 모듈.{" "}
                <strong className="text-zinc-300">matplotlib.pyplot</strong>으로 히스토그램 등
                도표를 그립니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="무작위 입력 · 크기 확인"
            subtitle="torch.randn, Tensor.size"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`inputs = torch.randn(1000, 10)  # 표준정규분포, shape (1000, 10)
inputs.size()                   # torch.Size([1000, 10])`}</CodeBlock>
              <ul className="list-inside list-disc space-y-1 marker:text-zinc-600">
                <li>
                  <code className="text-zinc-300">torch.randn(*size)</code>: 평균 0, 분산 1인
                  정규분포에서 난수 텐서 생성.
                </li>
                <li>
                  <code className="text-zinc-300">(n, k)</code>는{" "}
                  <strong className="text-zinc-300">n개 행 × k차원</strong> 샘플 묶음을 의미합니다.
                </li>
                <li>
                  <code className="text-zinc-300">.size()</code> 또는{" "}
                  <code className="text-zinc-300">.shape</code>로 각 축 길이를 확인합니다.
                </li>
              </ul>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="선형층과 순전파"
            subtitle="torch.nn.Linear"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`layer = torch.nn.Linear(10, 1)   # 입력특성 10 → 출력 1
z = layer(inputs)               # (1000, 10) @ W^T + b  → (1000, 1)
z[:10]                          # 앞부분만 미리보기`}</CodeBlock>
              <p>
                <code className="text-zinc-300">Linear(in_features, out_features)</code>는 학습
                가능한 가중치·편향을 가진 선형 변환 모듈입니다.{" "}
                <code className="text-zinc-300">layer(inputs)</code>가 한 배치에 대한{" "}
                <strong className="text-zinc-300">순전파</strong>입니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="NumPy로 옮겨 그리기"
            subtitle=".detach(), .numpy(), hist"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`plt.figure(figsize=(4, 3))
plt.hist(z.detach().numpy(), bins=100)
plt.xlim(-2, 2)
plt.show()`}</CodeBlock>
              <ul className="list-inside list-disc space-y-1 marker:text-zinc-600">
                <li>
                  계산 그래프에 붙어 있는 텐서는{" "}
                  <code className="text-zinc-300">.detach()</code>로 기록에서 떼어낸 뒤
                  <code className="text-zinc-300">.numpy()</code>로 변환하는 패턴이 흔합니다.
                </li>
                <li>
                  <code className="text-zinc-300">plt.hist</code>: 1차원 배열의 분포를 막대
                  빈도로 표시합니다.
                </li>
              </ul>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="활성화 함수 (함수형 API)"
            subtitle="torch.nn.functional"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`import torch.nn.functional as F

act_fn = F.relu
z1 = act_fn(z)

act_fn = F.sigmoid
z2 = act_fn(z)

act_fn = F.gelu
z3 = act_fn(z)`}</CodeBlock>
              <p>
                <code className="text-zinc-300">torch.nn.functional</code>은 모듈이 아닌{" "}
                <strong className="text-zinc-300">함수</strong> 형태의 활성화입니다. 같은{" "}
                <code className="text-zinc-300">z</code>에 다른 <code className="text-zinc-300">act_fn</code>을
                적용하면 분포가 달라집니다(실습 히스토그램과 연결).
              </p>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="역전파 셀: NumPy, 시그모이드, np.dot"
            subtitle="Back Propagation 섹션"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <p className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2 text-xs text-zinc-500">
                노트북 후반은 PyTorch가 아니라 <strong className="text-zinc-400">NumPy</strong>로
                작은 MLP를 직접 학습합니다.
              </p>
              <CodeBlock>{`import numpy as np

results = {"weights_hidden": [], "weights_output": [], "loss": []}

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)`}</CodeBlock>
              <ul className="list-inside list-disc space-y-1 marker:text-zinc-600">
                <li>
                  <code className="text-zinc-300">np.exp</code>: 지수함수, 시그모이드 정의에 사용.
                </li>
                <li>
                  <code className="text-zinc-300">sigmoid_derivative</code>는 출력 변수에 대한
                  미분을 <strong className="text-zinc-300">출력값만</strong>으로 쓴 형태입니다(체인
                  규칙과 맞물림).
                </li>
              </ul>
              <CodeBlock>{`inputs = np.array([[0], [1]])
expected_output = np.array([[0], [1]])

np.random.seed(99)
weights_hidden = np.random.rand(1, 1)
weights_output = np.random.rand(1, 1)

learning_rate = 0.1

for epoch in range(10000):
    hidden_layer_input = np.dot(inputs, weights_hidden)
    hidden_layer_output = sigmoid(hidden_layer_input)
    final_output = np.dot(hidden_layer_output, weights_output)
    predicted_output = sigmoid(final_output)`}</CodeBlock>
              <ul className="list-inside list-disc space-y-1 marker:text-zinc-600">
                <li>
                  <code className="text-zinc-300">np.array</code>: 리스트를 다차원 배열로.
                </li>
                <li>
                  <code className="text-zinc-300">np.random.seed</code> /{" "}
                  <code className="text-zinc-300">np.random.rand</code>: 재현 가능한 난수.
                </li>
                <li>
                  <code className="text-zinc-300">np.dot(A, B)</code>: 행렬·벡터 곱(순전파의
                  선형 결합).
                </li>
              </ul>
              <CodeBlock>{`    error = expected_output - predicted_output
    d_predicted_output = error * sigmoid_derivative(predicted_output)
    error_hidden_layer = d_predicted_output.dot(weights_output.T)
    d_hidden_layer = error_hidden_layer * sigmoid_derivative(hidden_layer_output)

    weights_output += hidden_layer_output.T.dot(d_predicted_output) * learning_rate
    weights_hidden += inputs.T.dot(d_hidden_layer) * learning_rate

    loss = np.mean(np.square(expected_output - predicted_output))
    results["loss"].append(loss)`}</CodeBlock>
              <ul className="list-inside list-disc space-y-1 marker:text-zinc-600">
                <li>
                  <code className="text-zinc-300">error * sigmoid_derivative(·)</code>: 출력층
                  오차와 활성화 미분의 성분별 곱(델타).
                </li>
                <li>
                  <code className="text-zinc-300">.T</code>: 전치, 역방향으로 가중치를 넘길 때
                  씁니다.
                </li>
                <li>
                  <code className="text-zinc-300">np.mean(np.square(·))</code>: MSE(배치 전체
                  평균 제곱 오차).
                </li>
                <li>
                  가중치에 <code className="text-zinc-300">+= … * learning_rate</code>를 더하는
                  부분이 <strong className="text-zinc-300">경사 상승 방향 업데이트</strong>(오차를
                  줄이려면 부호·식 설계와 맞춰야 함; 노트북 식과 동일하게 이해하면 됩니다).
                </li>
              </ul>
            </div>
          </TheoryTopicAccordion>

          <TheoryTopicAccordion
            title="학습 곡선 산점도"
            subtitle="plt.scatter, colorbar"
          >
            <div className="space-y-2 text-sm text-zinc-400">
              <CodeBlock>{`plt.scatter(results["weights_hidden"], results["loss"], c=range(10000))
plt.colorbar()
plt.show()`}</CodeBlock>
              <p>
                가중치 궤적과 손실을 동시에 보면 학습이 진행되며 점들이 어디로 모이는지 직관적으로
                파악할 수 있습니다.
              </p>
            </div>
          </TheoryTopicAccordion>

          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-500">
            <p>
              텐서의 <strong className="text-zinc-400">모양·차원</strong>은{" "}
              <Link
                href={ROUTES.deep.theory.math}
                className="text-violet-400 hover:text-violet-300"
              >
                수학 · 텐서와 스칼라·벡터·행렬
              </Link>
              에서 정리합니다.
            </p>
            <Link
              href={ROUTES.deep.lab.root}
              className="w-fit font-medium text-indigo-400 hover:text-indigo-300"
            >
              실습(/deep/lab)으로 이동 →
            </Link>
          </div>
        </main>
      </div>
    </TheoryShell>
  );
}
