/** [W3]ActivationBackProp 노트북과 맞춘 인용용 코드 (교육용) */

import type { ActivationName } from "@/lib/activations";

/** 3D 입력 공간 / 가중치 — 데이터·선형층까지 */
export const SNIPPET_NB_INPUTS_AND_LAYER = `## 임의의 데이터 생성 (size=(n, k)) -> n개의 k차원 샘플
inputs = torch.randn(1000, 10)

layer = torch.nn.Linear(10, 1)
z = layer(inputs)
z[:10]`;

/** 선행 활성화 히스토그램 (노트북 첫 히스토그램) */
export const SNIPPET_NB_HISTOGRAM_Z = `plt.figure(figsize=(4, 3))
plt.hist(z.detach().numpy(), bins=100)
plt.xlim(-2, 2)
plt.show()`;

/** 활성화 곡선 패널 — 노트북은 히스토그램 위주; 웹 곡선과 같은 f를 텐서에 요소별 적용 */
export function snippetNbActivationCurve(act: ActivationName): string {
  const body =
    act === "none"
      ? "out = z"
      : act === "relu"
        ? "out = F.relu(z)"
        : act === "sigmoid"
          ? "out = torch.sigmoid(z)"
          : act === "gelu"
            ? "out = F.gelu(z)"
            : "out = torch.tanh(z)";
  return `# 노트북: 같은 z에 대해 act_fn을 바꿔 히스토그램으로 분포를 봅니다.
# 이 차트는 아래와 같이 z축을 촘촘히 잡아 f(z)를 그린 것과 같습니다.
import torch
import torch.nn.functional as F

${body}`;
}

/** 현재 UI에서 고른 활성화에 대응하는 노트북 스타일 히스토그램 코드 */
export function snippetNbPostActivationHistogram(act: ActivationName): string {
  if (act === "none") {
    return `# 활성화 없음: 분포는 z와 동일
plt.figure(figsize=(4, 3))
plt.hist(z.detach().numpy(), bins=100)
plt.xlim(-2, 2)
plt.show()`;
  }
  if (act === "relu") {
    return `act_fn = torch.nn.functional.relu
z1 = act_fn(z)

plt.figure(figsize=(4, 3))
plt.hist(z1.detach().numpy(), bins=100)
plt.xlim(-2, 2)
plt.show()`;
  }
  if (act === "sigmoid") {
    return `act_fn = torch.nn.functional.sigmoid
z2 = act_fn(z)

plt.figure(figsize=(4, 3))
plt.hist(z2.detach().numpy(), bins=100)
plt.xlim(0, 1)
plt.show()`;
  }
  if (act === "gelu") {
    return `act_fn = torch.nn.functional.gelu
z3 = act_fn(z)

plt.figure(figsize=(4, 3))
plt.hist(z3.detach().numpy(), bins=100)
plt.xlim(-2, 2)
plt.show()`;
  }
  /* tanh */
  return `out = torch.tanh(z)

plt.figure(figsize=(4, 3))
plt.hist(out.detach().numpy(), bins=100)
plt.xlim(-1, 1)
plt.show()`;
}

/** 표에 대응: 상위 행 + 현재 활성화 적용 후 일부 */
export function snippetNbTablePreview(act: ActivationName): string {
  const head = `inputs = torch.randn(1000, 10)
layer = torch.nn.Linear(10, 1)
z = layer(inputs)
`;
  if (act === "none") {
    return `${head}inputs[:6]
z[:6]`;
  }
  if (act === "relu") {
    return `${head}act_fn = torch.nn.functional.relu
z1 = act_fn(z)
inputs[:6]
z1[:6]`;
  }
  if (act === "sigmoid") {
    return `${head}act_fn = torch.nn.functional.sigmoid
z2 = act_fn(z)
inputs[:6]
z2[:6]`;
  }
  if (act === "gelu") {
    return `${head}act_fn = torch.nn.functional.gelu
z3 = act_fn(z)
inputs[:6]
z3[:6]`;
  }
  return `${head}out = torch.tanh(z)
inputs[:6]
out[:6]`;
}

// ─── Backprop (NumPy) ───

export const SNIPPET_NUMPY_SIGMOID_AND_DERIV = `# 시그모이드 함수와 그의 미분
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)`;

export const SNIPPET_NUMPY_LOSS_APPEND = `# 학습 루프 안에서 (매 에폭)
loss = np.mean(np.square(expected_output - predicted_output))
results["loss"].append(loss)

# 노트북은 리스트에만 쌓고, 아래 웹의 곡선은 에폭 vs loss로 그린 것과 같습니다.
# plt.plot(results["loss"])
# plt.xlabel("epoch"); plt.ylabel("MSE")`;

export const SNIPPET_NUMPY_TRAINING_LOOP_FULL = `import numpy as np

results = dict({"weights_hidden": [], "weights_output": [], "loss": []})

# 시그모이드 함수와 그의 미분
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# 입력 데이터 및 예상 출력
inputs = np.array([[0], [1]])
expected_output = np.array([[0], [1]])

# 가중치 초기화
np.random.seed(99)
weights_hidden = np.random.rand(1, 1)
weights_output = np.random.rand(1, 1)

# 학습률 설정
learning_rate = 0.1

# 학습 과정
for epoch in range(10000):
  # 순전파
  hidden_layer_input = np.dot(inputs, weights_hidden)
  hidden_layer_output = sigmoid(hidden_layer_input)

  final_output = np.dot(hidden_layer_output, weights_output)
  predicted_output = sigmoid(final_output)

  # 오차 계산
  error = expected_output - predicted_output

  # 역전파
  d_predicted_output = error * sigmoid_derivative(predicted_output)

  error_hidden_layer = d_predicted_output.dot(weights_output.T)
  d_hidden_layer = error_hidden_layer * sigmoid_derivative(hidden_layer_output)

  # 가중치 업데이트
  weights_output += hidden_layer_output.T.dot(d_predicted_output) * learning_rate
  weights_hidden += inputs.T.dot(d_hidden_layer) * learning_rate

  results["weights_hidden"].append(weights_hidden[0][0])
  results["weights_output"].append(weights_output[0][0])

  loss = np.mean(np.square(expected_output - predicted_output))
  results["loss"].append(loss)

  if epoch % 1000 == 0:
    print(f'Epoch: {epoch}, Loss: {loss:.5f}')`;

export const SNIPPET_NB_SCATTER_WEIGHT_HIDDEN = `plt.scatter(results["weights_hidden"], results["loss"], c=range(10000))
plt.colorbar()
plt.show()`;

export const SNIPPET_NB_SCATTER_WEIGHT_OUTPUT = `plt.scatter(results["weights_output"], results["loss"], c=range(10000))
plt.colorbar()
plt.show()`;
