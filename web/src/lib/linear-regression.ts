/**
 * 단순 선형 회귀 — data/Salary_Data.csv (경력 vs 연봉, 실습용 합성 데이터) 기준
 *   ŷ = slope · x + intercept
 * 원 스케일(x≈1~10, y≈4만~12만)에서는 경사하강이 쉽게 발산하므로
 * z-score로 표준화한 공간에서 학습하고, 계수만 원 단위로 되돌린다.
 */

export type SamplePoint = { x: number; y: number };

export type StepResult = {
  step: number;
  /** 표준화 공간의 가중치·편향 (경사하강이 실제로 움직이는 값) */
  w: number;
  b: number;
  /** 원 단위로 되돌린 계수 — 연봉 = slope × 경력 + intercept */
  slope: number;
  intercept: number;
  /** 표준화 공간 MSE (경사하강이 줄이는 목적함수) */
  loss: number;
  /** 원 단위 RMSE — 평균적으로 몇 달러쯤 빗나가는지 */
  rmse: number;
  r2: number;
};

export type Standardization = { mean: number; std: number };

export type DatasetStats = {
  n: number;
  x: Standardization;
  y: Standardization;
  /** 공분산 — 두 변수가 같은 방향으로 움직이는 정도 (단위가 남아 크기 해석이 어렵다) */
  covariance: number;
  /** 피어슨 상관계수 r — 공분산을 -1~1로 정규화한 값 */
  correlation: number;
};

/** 한 관측치의 예측·오차·제곱오차 — 화면의 예측 표와 잔차선에서 함께 쓴다 */
export type PredictionRow = {
  x: number;
  y: number;
  yHat: number;
  /** 실제 − 예측 (잔차) */
  error: number;
  squaredError: number;
};

/** 최소 제곱 해석해 — 경사하강이 수렴해야 할 목표 */
export type ClosedFormFit = {
  slope: number;
  intercept: number;
  rmse: number;
  r2: number;
};

/** 표준화 공간 MSE가 이보다 커지면 발산으로 보고 기록을 끊는다 (시작값은 1.0). */
const DIVERGENCE_LOSS = 1e6;

export type TrainingConfig = {
  learningRate: number;
  steps: number;
};

/** 헤더 1줄 + `x,y` 숫자 2열 CSV를 읽는다 (빈 줄·공백 허용). */
export function parseCsv(text: string): SamplePoint[] {
  return text
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [x, y] = line.split(",").map(Number);
      return { x, y };
    })
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
}

function standardize(values: number[]): Standardization {
  const n = values.length;
  const mean = values.reduce((s, v) => s + v, 0) / n;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  return { mean, std: Math.sqrt(variance) };
}

export function describeDataset(points: SamplePoint[]): DatasetStats {
  const x = standardize(points.map((p) => p.x));
  const y = standardize(points.map((p) => p.y));
  const covariance =
    points.reduce((s, p) => s + (p.x - x.mean) * (p.y - y.mean), 0) /
    points.length;

  return {
    n: points.length,
    x,
    y,
    covariance,
    correlation: x.std > 0 && y.std > 0 ? covariance / (x.std * y.std) : 0,
  };
}

/** 직선 하나를 모든 관측치에 적용한 결과 — 예측값과 오차를 한 줄씩 펼친다. */
export function predictionRows(
  points: SamplePoint[],
  slope: number,
  intercept: number
): PredictionRow[] {
  return points.map((p) => {
    const yHat = slope * p.x + intercept;
    const error = p.y - yHat;
    return { x: p.x, y: p.y, yHat, error, squaredError: error ** 2 };
  });
}

function evaluate(
  points: SamplePoint[],
  slope: number,
  intercept: number
): { rmse: number; r2: number } {
  const n = points.length;
  const meanY = points.reduce((s, p) => s + p.y, 0) / n;
  const ssRes = predictionRows(points, slope, intercept).reduce(
    (s, r) => s + r.squaredError,
    0
  );
  const ssTot = points.reduce((s, p) => s + (p.y - meanY) ** 2, 0);
  return { rmse: Math.sqrt(ssRes / n), r2: ssTot > 0 ? 1 - ssRes / ssTot : 0 };
}

export function closedFormFit(points: SamplePoint[]): ClosedFormFit {
  const stats = describeDataset(points);
  let num = 0;
  let den = 0;
  for (const p of points) {
    num += (p.x - stats.x.mean) * (p.y - stats.y.mean);
    den += (p.x - stats.x.mean) ** 2;
  }
  const slope = den > 0 ? num / den : 0;
  const intercept = stats.y.mean - slope * stats.x.mean;
  return { slope, intercept, ...evaluate(points, slope, intercept) };
}

/**
 * 전체 배치 경사하강. 스텝마다 상태를 기록해 두고 화면에서 되감아 본다.
 * w, b는 표준화 공간의 값이고 slope/intercept는 원 단위 환산 결과다.
 */
export function runTraining(
  points: SamplePoint[],
  config: TrainingConfig
): StepResult[] {
  const stats = describeDataset(points);
  const xz = points.map((p) => (p.x - stats.x.mean) / stats.x.std);
  const yz = points.map((p) => (p.y - stats.y.mean) / stats.y.std);
  const n = points.length;

  let w = 0;
  let b = 0;
  const results: StepResult[] = [];

  for (let step = 0; step < config.steps; step++) {
    const errors = xz.map((x, i) => w * x + b - yz[i]);
    const loss = errors.reduce((s, e) => s + e * e, 0) / n;

    const slope = (w * stats.y.std) / stats.x.std;
    const intercept = stats.y.mean + b * stats.y.std - slope * stats.x.mean;
    const { rmse, r2 } = evaluate(points, slope, intercept);

    results.push({ step, w, b, slope, intercept, loss, rmse, r2 });

    // 학습률이 크면 값이 폭주한다. Infinity까지 가기 전에 끊어야
    // 발산 직전 모습이 차트에 남는다.
    if (!Number.isFinite(loss) || loss > DIVERGENCE_LOSS) break;

    const gradW = (2 / n) * errors.reduce((s, e, i) => s + e * xz[i], 0);
    const gradB = (2 / n) * errors.reduce((s, e) => s + e, 0);
    w -= config.learningRate * gradW;
    b -= config.learningRate * gradB;
  }

  return results;
}
