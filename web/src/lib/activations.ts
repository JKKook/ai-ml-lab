export type ActivationName = "none" | "relu" | "sigmoid" | "gelu" | "tanh";

export const ACTIVATION_COLORS: Record<ActivationName, string> = {
  none: "#6366f1",
  relu: "#f59e0b",
  sigmoid: "#10b981",
  gelu: "#ef4444",
  tanh: "#8b5cf6",
};

export const ACTIVATION_LABELS: Record<ActivationName, string> = {
  none: "Linear (no act.)",
  relu: "ReLU",
  sigmoid: "Sigmoid",
  gelu: "GELU",
  tanh: "Tanh",
};

export const ACTIVATION_DESCRIPTIONS: Record<ActivationName, string> = {
  none: "f(z) = z — identity, no non-linearity",
  relu: "f(z) = max(0, z) — kills negatives; dead neurons if z always < 0",
  sigmoid: "f(z) = 1/(1+e⁻ᶻ) — squashes to (0, 1), used in binary classification",
  gelu: "f(z) ≈ z·Φ(z) — smooth gating, default in GPT/BERT Transformers",
  tanh: "f(z) = tanh(z) — squashes to (−1, 1), zero-centered",
};

/** 한국어 해설 — 활성화가 출력 분포·학습에 주는 직관 */
export const ACTIVATION_INSIGHTS_KO: Record<ActivationName, string> = {
  none:
    "선형만 쌓으면 전체가 하나의 큰 선형 변환과 같아져서, 층을 깊게 쌓아도 표현력이 늘지 않습니다. 비선형을 넣어야 ‘곡면’을 근사할 수 있습니다.",
  relu:
    "음수는 0으로 잘라내어 희소(sparse)한 활성을 만듭니다. ReLU 뒤 히스토그램이 0 근처에 쌓이면 ‘죽은 뉴런’이 많다는 뜻으로, 그래디언트가 끊길 수 있습니다.",
  sigmoid:
    "값을 (0, 1)로 눌러 확률처럼 해석하기 쉽지만, |z|가 크면 기울기가 거의 0이 되어 역전파 시 신호가 약해질 수 있습니다(포화).",
  gelu:
    "부드럽게 0 근처를 통과·차단하는 형태라 ReLU보다 미분이 매끄럽고, 최근 트랜스포머에서 자주 쓰입니다. 분포 모양이 sigmoid/ReLU와 어떻게 다른지 히스토그램으로 비교해 보세요.",
  tanh:
    "출력이 0을 중심으로 대칭이라 sigmoid보다 은닉층에서 스케일이 안정되는 경우가 있습니다. 여전히 큰 |z|에서는 포화 구간이 있습니다.",
};

export const ACTIVATION_HIST_RANGE: Record<ActivationName, [number, number]> = {
  none: [-3, 3],
  relu: [0, 3],
  sigmoid: [0, 1],
  gelu: [-1, 3],
  tanh: [-1, 1],
};

function relu(x: number): number {
  return Math.max(0, x);
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function gelu(x: number): number {
  return (
    0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)))
  );
}

export const ACTIVATIONS: Record<ActivationName, (x: number) => number> = {
  none: (x) => x,
  relu,
  sigmoid,
  gelu,
  tanh: Math.tanh,
};

export function applyActivation(data: number[], name: ActivationName): number[] {
  const fn = ACTIVATIONS[name];
  return data.map(fn);
}

export function deadNeuronRatio(activated: number[]): number {
  if (activated.length === 0) return 0;
  return activated.filter((v) => v === 0).length / activated.length;
}
