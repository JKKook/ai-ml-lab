import { ROUTES } from "@/config/routes";

/**
 * 홈(/)에서 랜덤으로 보여 주는 이론 Q&A.
 * 사이트가 실제 다루는 주제(딥러닝·머신러닝)에 한정하고,
 * 각 문항은 근거가 되는 페이지로 링크합니다.
 */
export type TheoryQaTrack = "deep" | "machine";

export interface TheoryQaItem {
  id: string;
  track: TheoryQaTrack;
  /** 문항이 속한 주제 라벨 (카드에 배지로 표시) */
  topic: string;
  question: string;
  answer: string;
  /** 근거 페이지 (앵커 포함 가능) */
  href: string;
  hrefLabel: string;
}

export const THEORY_QA_ITEMS: TheoryQaItem[] = [
  // ── 딥러닝 ──────────────────────────────────────────────
  {
    id: "deep-perceptron-xor",
    track: "deep",
    topic: "퍼셉트론",
    question: "단일 퍼셉트론이 XOR 문제를 풀 수 없는 이유는 무엇일까요?",
    answer:
      "퍼셉트론의 결정 경계는 직선(선형) 하나뿐이라, 어떤 직선으로도 두 부류를 가를 수 없는 XOR 배치는 원리적으로 분리할 수 없습니다. 은닉층을 가진 다층 퍼셉트론으로 확장하면 풀 수 있습니다.",
    href: `${ROUTES.deep.theory.detail}#theory-perceptron`,
    hrefLabel: "상세 이론 · 퍼셉트론",
  },
  {
    id: "deep-mlp-nonlinear",
    track: "deep",
    topic: "다층 퍼셉트론",
    question:
      "활성화 함수 없이 층만 깊게 쌓으면 어떤 일이 벌어질까요?",
    answer:
      "비선형 활성화가 없으면 층을 아무리 쌓아도 전체가 하나의 선형 변환과 같아져, 층을 쌓는 의미가 사라집니다. 비선형 활성화가 있어야 은닉층이 입력을 새로운 표현으로 바꿔 비선형 문제를 풀 수 있습니다.",
    href: `${ROUTES.deep.theory.detail}#theory-mlp`,
    hrefLabel: "상세 이론 · 다층 퍼셉트론",
  },
  {
    id: "deep-inductive-bias",
    track: "deep",
    topic: "유도 바이어스",
    question:
      "같은 이미지 문제를 풀 때 MLP보다 CNN이 적은 파라미터로 잘 푸는 이유는 무엇일까요?",
    answer:
      "CNN에는 “가까운 픽셀끼리 관련이 깊고, 같은 패턴은 위치가 달라도 같은 의미”라는 유도 바이어스(지역성·이동 불변성)가 구조에 심어져 있기 때문입니다. 가정이 데이터 성질과 맞으면 적은 데이터·파라미터로도 잘 일반화합니다.",
    href: `${ROUTES.deep.theory.detail}#theory-inductive-bias`,
    hrefLabel: "상세 이론 · 유도 바이어스",
  },
  {
    id: "deep-forward",
    track: "deep",
    topic: "순전파",
    question: "순전파 단계에서 가중치는 바뀔까요, 바뀌지 않을까요?",
    answer:
      "바뀌지 않습니다. 순전파는 지금의 가중치·편향으로 입력층에서 출력층 방향으로 예측만 계산하는 단계이고, 실제 수정은 역전파로 방향을 구한 뒤 최적화 단계에서 일어납니다.",
    href: `${ROUTES.deep.theory.detail}#theory-forward`,
    hrefLabel: "상세 이론 · 순전파",
  },
  {
    id: "deep-loss-choice",
    track: "deep",
    topic: "손실",
    question:
      "회귀에는 평균 제곱 오차(MSE), 분류에는 교차 엔트로피를 주로 쓰는 이유는 무엇일까요?",
    answer:
      "MSE는 예측과 정답의 수치 차이를 제곱해 재므로 연속값 회귀에 자연스럽고, 교차 엔트로피는 정답 클래스에 준 확률이 낮을수록 벌점을 키우는 구조라 확률을 내는 분류에 맞습니다. 문제 유형과 손실이 어긋나면 학습 목표 자체가 어긋납니다.",
    href: `${ROUTES.deep.theory.detail}#theory-loss`,
    hrefLabel: "상세 이론 · 손실",
  },
  {
    id: "deep-loss-huber",
    track: "deep",
    topic: "손실 함수",
    question:
      "이상치가 많은 회귀 데이터에서 MSE 대신 검토할 만한 손실은 무엇일까요?",
    answer:
      "MAE나 Huber 손실입니다. MSE는 오차를 제곱해 벌점을 주므로 이상치 몇 개가 학습을 지배할 수 있지만, MAE는 오차 크기에 비례해서만 벌점을 주고, Huber는 작은 오차엔 MSE처럼 부드럽게·큰 오차엔 MAE처럼 완만하게 벌점을 늘려 이상치 영향을 완충합니다.",
    href: `${ROUTES.deep.theory.detail}#theory-loss-regression`,
    hrefLabel: "상세 이론 · 회귀 손실",
  },
  {
    id: "deep-loss-pairing",
    track: "deep",
    topic: "손실 함수",
    question:
      "다중 클래스 분류(정답 1개)에서 출력층 활성화와 손실의 표준 조합은 무엇일까요?",
    answer:
      "소프트맥스 + 교차 엔트로피입니다. 소프트맥스가 출력들을 합이 1인 확률 분포로 만들고, 교차 엔트로피가 정답 클래스에 준 확률이 낮을수록 큰 벌점을 줍니다. 이진 분류라면 시그모이드 + BCE가 짝입니다.",
    href: `${ROUTES.deep.theory.detail}#theory-loss-classification`,
    hrefLabel: "상세 이론 · 분류 손실",
  },
  {
    id: "deep-backprop-vanish",
    track: "deep",
    topic: "역전파",
    question: "기울기 소실(Vanishing Gradient)은 왜 생기고, 어떻게 줄일 수 있을까요?",
    answer:
      "시그모이드처럼 미분값이 1보다 작은 활성화를 층마다 곱하다 보면 앞쪽 층으로 갈수록 기울기가 급격히 작아져 학습이 멈추다시피 합니다. ReLU 계열 활성화, He·Xavier 초기화, 잔차 연결, 배치 정규화 등으로 완화합니다.",
    href: `${ROUTES.deep.theory.detail}#theory-backprop`,
    hrefLabel: "상세 이론 · 역전파",
  },
  {
    id: "deep-lr",
    track: "deep",
    topic: "최적화",
    question: "학습률이 너무 크거나 너무 작으면 각각 어떤 문제가 생길까요?",
    answer:
      "너무 크면 최적점을 지나쳐 발산하거나 진동하고, 너무 작으면 수렴이 매우 느려집니다. 학습률 스케줄링이나 Adam 같은 적응적 옵티마이저로 보폭을 조절합니다.",
    href: `${ROUTES.deep.theory.detail}#theory-optimization`,
    hrefLabel: "상세 이론 · 최적화",
  },
  {
    id: "deep-adam",
    track: "deep",
    topic: "최적화",
    question: "Adam 옵티마이저는 SGD와 무엇이 다를까요?",
    answer:
      "SGD는 미니배치 그래디언트에 학습률을 곱해 그대로 한 걸음 움직이지만, Adam은 그래디언트의 1차(방향 관성)·2차(크기) 모멘트를 함께 추적해 파라미터 축마다 보폭을 자동으로 조절합니다. 그래서 범용 학습의 기본 후보로 자주 쓰입니다.",
    href: `${ROUTES.deep.theory.detail}#theory-optimization`,
    hrefLabel: "상세 이론 · 최적화",
  },
  {
    id: "deep-epoch-batch",
    track: "deep",
    topic: "에폭·배치",
    question: "에폭(epoch)과 스텝(step)의 차이는 무엇일까요?",
    answer:
      "스텝은 배치 하나로 순전파→손실→역전파→최적화가 한 번 돌아 가중치가 한 번 갱신되는 단위이고, 에폭은 전체 훈련 데이터를 한 바퀴 다 본 큰 주기입니다. 한 에폭의 스텝 수는 대략 전체 샘플 수를 배치 크기로 나눈 값입니다.",
    href: `${ROUTES.deep.theory.detail}#theory-epoch-batch`,
    hrefLabel: "상세 이론 · 에폭과 배치",
  },
  {
    id: "deep-regularization",
    track: "deep",
    topic: "일반화",
    question: "드롭아웃(Dropout)은 어떻게 과적합을 줄일까요?",
    answer:
      "학습할 때 일부 뉴런을 임의로 꺼서, 특정 뉴런 조합에만 의존해 훈련 데이터를 암기하는 현상을 막습니다. 매번 조금씩 다른 부분 네트워크로 학습하는 효과가 있어 일반화에 도움이 됩니다.",
    href: `${ROUTES.deep.theory.detail}#theory-regularization`,
    hrefLabel: "상세 이론 · 일반화",
  },
  {
    id: "deep-norm-terms",
    track: "deep",
    topic: "정규화 용어",
    question:
      "입력 스케일링, Regularization, 배치 정규화 — 셋 다 「정규화」로 불리는데 무엇이 다를까요?",
    answer:
      "입력 스케일링은 모델에 넣기 전 특성의 크기·분포를 맞추는 전처리, Regularization은 과적합을 줄여 일반화를 돕는 기법(가중치 감쇠·드롭아웃 등), 배치 정규화는 층 사이 활성값 분포를 안정시키는 층입니다. 역할이 모두 다릅니다.",
    href: `${ROUTES.deep.theory.detail}#theory-concept-map`,
    hrefLabel: "상세 이론 · 개념 묶음",
  },
  // ── 머신러닝 ────────────────────────────────────────────
  {
    id: "machine-overfit-cv",
    track: "machine",
    topic: "교차 검증",
    question: "훈련 정확도는 높은데 새 데이터에서 성능이 나쁘다면, 무엇을 의심해야 할까요?",
    answer:
      "과적합입니다. 모델이 훈련 데이터의 노이즈까지 암기한 상태로, 교차 검증으로 일반화 성능을 측정하고 모델 복잡도를 낮추거나 정규화·데이터 확충으로 대응합니다.",
    href: ROUTES.machine.theory.detail,
    hrefLabel: "머신러닝 · 상세 이론",
  },
  {
    id: "machine-bias-variance",
    track: "machine",
    topic: "편향–분산",
    question: "편향(bias)과 분산(variance)의 트레이드오프란 무엇일까요?",
    answer:
      "편향은 모델이 너무 단순해 체계적으로 틀리는 오차, 분산은 모델이 너무 유연해 데이터가 조금만 달라져도 결과가 크게 흔들리는 오차입니다. 복잡도를 높이면 편향은 줄고 분산은 커지므로, 둘의 합이 최소가 되는 지점을 찾는 것이 목표입니다.",
    href: ROUTES.machine.theory.detail,
    hrefLabel: "머신러닝 · 상세 이론",
  },
  {
    id: "machine-reg-vs-cls",
    track: "machine",
    topic: "회귀·분류",
    question: "회귀와 분류는 무엇으로 구분할까요?",
    answer:
      "예측 대상이 연속적인 수치(가격, 온도 등)면 회귀, 정해진 범주(합격/불합격, 품종 등)면 분류입니다. 이 구분에 따라 목적함수(손실)와 평가 지표가 달라집니다.",
    href: ROUTES.machine.theory.detail,
    hrefLabel: "머신러닝 · 상세 이론",
  },
  {
    id: "machine-r-lm",
    track: "machine",
    topic: "R · 선형 회귀",
    question: "R에서 lm(y ~ x, data = df)는 무엇을 하는 코드일까요?",
    answer:
      "데이터프레임 df의 x로 y를 설명하는 선형 회귀 모델을 적합합니다. y ~ x 부분이 “y를 x로 설명한다”는 formula 표기이고, summary()로 계수·유의성 등을 확인합니다.",
    href: ROUTES.machine.theory.code,
    hrefLabel: "머신러닝 · 코드(R)",
  },
  {
    id: "machine-r-dataframe",
    track: "machine",
    topic: "R · 자료 구조",
    question: "R의 벡터와 데이터프레임은 어떻게 다를까요?",
    answer:
      "벡터는 같은 타입의 값들을 한 줄로 담는 기본 단위이고, 데이터프레임은 길이가 같은 여러 벡터를 열로 묶은 표 형태 구조입니다. 분석 데이터는 대부분 행=관측치, 열=변수인 데이터프레임으로 다룹니다.",
    href: ROUTES.machine.theory.code,
    hrefLabel: "머신러닝 · 코드(R)",
  },
  {
    id: "machine-dplyr",
    track: "machine",
    topic: "R · dplyr",
    question: "dplyr 파이프라인에서 filter와 select의 역할 차이는 무엇일까요?",
    answer:
      "filter는 조건에 맞는 행(관측치)을 고르고, select는 필요한 열(변수)을 고릅니다. 파이프(|> 또는 %>%)로 이어 전처리 흐름을 읽기 쉽게 구성합니다.",
    href: ROUTES.machine.theory.code,
    hrefLabel: "머신러닝 · 코드(R)",
  },
];
