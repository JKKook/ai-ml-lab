/**
 * 미니 CNN 학습 시연 — 전부 TypeScript로 브라우저에서 실행
 *
 * 과제: 8×8 합성 이미지 3클래스(세로선·가로선·대각선) 분류
 * 모델: Conv 3×3 ×4필터 → ReLU → MaxPool 2×2 → Flatten(36) → Dense(3) → Softmax CE
 * 시드 고정 난수를 사용해 같은 설정이면 항상 같은 결과가 나옵니다(SSR 안전).
 */

export type CnnOptimizerName = "sgd" | "momentum" | "rmsprop" | "adam";

export const CNN_IMG = 8; // 입력 한 변
export const CNN_KERNEL = 3; // 커널 한 변
export const CNN_CONV_OUT = CNN_IMG - CNN_KERNEL + 1; // 6
export const CNN_POOL_OUT = CNN_CONV_OUT / 2; // 3
export const CNN_FILTERS = 4;
export const CNN_CLASSES = 3;
export const CNN_CLASS_NAMES = ["세로선", "가로선", "대각선"] as const;

const FLAT = CNN_FILTERS * CNN_POOL_OUT * CNN_POOL_OUT; // 36
const OFF_CONV_W = 0; // 4×3×3 = 36
const OFF_CONV_B = OFF_CONV_W + CNN_FILTERS * CNN_KERNEL * CNN_KERNEL; // 36
const OFF_FC_W = OFF_CONV_B + CNN_FILTERS; // 40
const OFF_FC_B = OFF_FC_W + CNN_CLASSES * FLAT; // 148
const N_PARAMS = OFF_FC_B + CNN_CLASSES; // 151

export type CnnSample = {
  /** 8×8 픽셀 (0~1), 행 우선 평탄화 */
  pixels: number[];
  label: number;
};

export type CnnConfig = {
  optimizer: CnnOptimizerName;
  lr: number;
  epochs: number;
  batchSize: number;
  seed: number;
};

export type CnnStep = {
  step: number;
  epoch: number;
  /** 해당 스텝 미니배치의 평균 CE 손실 (step 0은 테스트셋 평균) */
  loss: number;
  /** 고정 테스트셋(36장) 정확도 0~1 */
  testAcc: number;
};

export type CnnDemoPred = {
  predicted: number;
  correct: boolean;
  /** 예측 클래스 확률 */
  confidence: number;
};

export type CnnSnapshot = {
  step: number;
  /** 합성곱 필터 가중치 [filter][row][col] */
  filters: number[][][];
  /** 고정 시연 샘플 6장에 대한 현재 모델의 예측 */
  preds: CnnDemoPred[];
};

export type CnnRunResult = {
  history: CnnStep[];
  snapshots: CnnSnapshot[];
  /** 시연용 고정 샘플 6장 (클래스당 2장) */
  demoSamples: CnnSample[];
};

/** 시드 고정 난수 (mulberry32) */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genImage(cls: number, rng: () => number): number[] {
  const px = new Array<number>(CNN_IMG * CNN_IMG);
  for (let i = 0; i < px.length; i += 1) px[i] = rng() * 0.2; // 배경 노이즈
  const ink = () => 0.75 + rng() * 0.25;
  if (cls === 0) {
    const c = 1 + Math.floor(rng() * (CNN_IMG - 2));
    for (let r = 0; r < CNN_IMG; r += 1) px[r * CNN_IMG + c] = ink();
  } else if (cls === 1) {
    const r = 1 + Math.floor(rng() * (CNN_IMG - 2));
    for (let c = 0; c < CNN_IMG; c += 1) px[r * CNN_IMG + c] = ink();
  } else {
    const off = -2 + Math.floor(rng() * 5);
    for (let r = 0; r < CNN_IMG; r += 1) {
      const c = r + off;
      if (c >= 0 && c < CNN_IMG) px[r * CNN_IMG + c] = ink();
    }
  }
  return px;
}

function makeDataset(rng: () => number) {
  const train: CnnSample[] = [];
  const test: CnnSample[] = [];
  for (let cls = 0; cls < CNN_CLASSES; cls += 1) {
    for (let i = 0; i < 60; i += 1) train.push({ pixels: genImage(cls, rng), label: cls });
    for (let i = 0; i < 12; i += 1) test.push({ pixels: genImage(cls, rng), label: cls });
  }
  // 시연 샘플: 클래스당 테스트 앞 2장
  const demo: CnnSample[] = [];
  for (let cls = 0; cls < CNN_CLASSES; cls += 1) {
    demo.push(...test.filter((s) => s.label === cls).slice(0, 2));
  }
  return { train, test, demo };
}

function initParams(rng: () => number): Float64Array {
  const p = new Float64Array(N_PARAMS);
  const convScale = Math.sqrt(2 / (CNN_KERNEL * CNN_KERNEL));
  for (let i = OFF_CONV_W; i < OFF_CONV_B; i += 1) p[i] = (rng() * 2 - 1) * convScale;
  const fcScale = Math.sqrt(2 / FLAT);
  for (let i = OFF_FC_W; i < OFF_FC_B; i += 1) p[i] = (rng() * 2 - 1) * fcScale;
  return p;
}

type ForwardPass = {
  /** conv 결과(활성화 전) [f*36 + y*6 + x] */
  convPre: Float64Array;
  /** 풀링을 통과한 값(=flatten 입력) */
  flat: Float64Array;
  /** 풀링 셀마다 최댓값 위치 (convPre 절대 인덱스) */
  argmax: Int32Array;
  probs: number[];
  loss: number;
};

function forward(p: Float64Array, img: number[], label: number): ForwardPass {
  const convArea = CNN_CONV_OUT * CNN_CONV_OUT;
  const convPre = new Float64Array(CNN_FILTERS * convArea);
  for (let f = 0; f < CNN_FILTERS; f += 1) {
    const wOff = OFF_CONV_W + f * CNN_KERNEL * CNN_KERNEL;
    const b = p[OFF_CONV_B + f];
    for (let y = 0; y < CNN_CONV_OUT; y += 1) {
      for (let x = 0; x < CNN_CONV_OUT; x += 1) {
        let s = b;
        for (let u = 0; u < CNN_KERNEL; u += 1) {
          for (let v = 0; v < CNN_KERNEL; v += 1) {
            s += p[wOff + u * CNN_KERNEL + v] * img[(y + u) * CNN_IMG + (x + v)];
          }
        }
        convPre[f * convArea + y * CNN_CONV_OUT + x] = s;
      }
    }
  }

  // ReLU → 2×2 MaxPool
  const flat = new Float64Array(FLAT);
  const argmax = new Int32Array(FLAT);
  for (let f = 0; f < CNN_FILTERS; f += 1) {
    for (let py = 0; py < CNN_POOL_OUT; py += 1) {
      for (let px = 0; px < CNN_POOL_OUT; px += 1) {
        let best = -Infinity;
        let bestIdx = -1;
        for (let u = 0; u < 2; u += 1) {
          for (let v = 0; v < 2; v += 1) {
            const idx =
              f * convArea + (py * 2 + u) * CNN_CONV_OUT + (px * 2 + v);
            const a = Math.max(0, convPre[idx]);
            if (a > best) {
              best = a;
              bestIdx = idx;
            }
          }
        }
        const n = f * CNN_POOL_OUT * CNN_POOL_OUT + py * CNN_POOL_OUT + px;
        flat[n] = best;
        argmax[n] = bestIdx;
      }
    }
  }

  // Dense → Softmax CE
  const logits = new Array<number>(CNN_CLASSES);
  for (let k = 0; k < CNN_CLASSES; k += 1) {
    let s = p[OFF_FC_B + k];
    const wOff = OFF_FC_W + k * FLAT;
    for (let n = 0; n < FLAT; n += 1) s += p[wOff + n] * flat[n];
    logits[k] = s;
  }
  const maxLogit = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxLogit));
  const sumExp = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => e / sumExp);
  const loss = -Math.log(Math.max(probs[label], 1e-12));

  return { convPre, flat, argmax, probs, loss };
}

function backward(
  p: Float64Array,
  img: number[],
  label: number,
  fwd: ForwardPass,
  grad: Float64Array,
): void {
  const convArea = CNN_CONV_OUT * CNN_CONV_OUT;
  const dflat = new Float64Array(FLAT);
  for (let k = 0; k < CNN_CLASSES; k += 1) {
    const dlogit = fwd.probs[k] - (k === label ? 1 : 0);
    grad[OFF_FC_B + k] += dlogit;
    const wOff = OFF_FC_W + k * FLAT;
    for (let n = 0; n < FLAT; n += 1) {
      grad[wOff + n] += dlogit * fwd.flat[n];
      dflat[n] += p[wOff + n] * dlogit;
    }
  }

  // 풀링 역전파(최댓값 위치로만) + ReLU 마스크 → conv 가중치
  for (let n = 0; n < FLAT; n += 1) {
    const idx = fwd.argmax[n];
    if (idx < 0 || fwd.convPre[idx] <= 0) continue;
    const d = dflat[n];
    if (d === 0) continue;
    const f = Math.floor(idx / convArea);
    const rest = idx - f * convArea;
    const y = Math.floor(rest / CNN_CONV_OUT);
    const x = rest - y * CNN_CONV_OUT;
    const wOff = OFF_CONV_W + f * CNN_KERNEL * CNN_KERNEL;
    grad[OFF_CONV_B + f] += d;
    for (let u = 0; u < CNN_KERNEL; u += 1) {
      for (let v = 0; v < CNN_KERNEL; v += 1) {
        grad[wOff + u * CNN_KERNEL + v] += d * img[(y + u) * CNN_IMG + (x + v)];
      }
    }
  }
}

function predict(p: Float64Array, img: number[]): { cls: number; prob: number } {
  const fwd = forward(p, img, 0);
  let best = 0;
  for (let k = 1; k < CNN_CLASSES; k += 1) if (fwd.probs[k] > fwd.probs[best]) best = k;
  return { cls: best, prob: fwd.probs[best] };
}

function testAccuracy(p: Float64Array, test: CnnSample[]): number {
  let hit = 0;
  for (const s of test) if (predict(p, s.pixels).cls === s.label) hit += 1;
  return hit / test.length;
}

function meanTestLoss(p: Float64Array, test: CnnSample[]): number {
  let sum = 0;
  for (const s of test) sum += forward(p, s.pixels, s.label).loss;
  return sum / test.length;
}

function extractFilters(p: Float64Array): number[][][] {
  const filters: number[][][] = [];
  for (let f = 0; f < CNN_FILTERS; f += 1) {
    const rows: number[][] = [];
    for (let u = 0; u < CNN_KERNEL; u += 1) {
      const row: number[] = [];
      for (let v = 0; v < CNN_KERNEL; v += 1) {
        row.push(p[OFF_CONV_W + f * CNN_KERNEL * CNN_KERNEL + u * CNN_KERNEL + v]);
      }
      rows.push(row);
    }
    filters.push(rows);
  }
  return filters;
}

function takeSnapshot(
  step: number,
  p: Float64Array,
  demo: CnnSample[],
): CnnSnapshot {
  return {
    step,
    filters: extractFilters(p),
    preds: demo.map((s) => {
      const { cls, prob } = predict(p, s.pixels);
      return { predicted: cls, correct: cls === s.label, confidence: prob };
    }),
  };
}

/** PyTorch 기본식에 맞춘 옵티마이저 한 스텝 (optimization.ts 와 동일 규칙) */
type OptimizerState = {
  v: Float64Array;
  avgSq: Float64Array;
  m: Float64Array;
  v2: Float64Array;
  t: number;
};

function applyUpdate(
  cfg: CnnConfig,
  p: Float64Array,
  g: Float64Array,
  st: OptimizerState,
): void {
  const lr = cfg.lr;
  const eps = 1e-8;
  switch (cfg.optimizer) {
    case "sgd": {
      for (let i = 0; i < p.length; i += 1) p[i] -= lr * g[i];
      break;
    }
    case "momentum": {
      for (let i = 0; i < p.length; i += 1) {
        st.v[i] = 0.9 * st.v[i] + g[i];
        p[i] -= lr * st.v[i];
      }
      break;
    }
    case "rmsprop": {
      for (let i = 0; i < p.length; i += 1) {
        st.avgSq[i] = 0.99 * st.avgSq[i] + 0.01 * g[i] * g[i];
        p[i] -= (lr * g[i]) / (Math.sqrt(st.avgSq[i]) + eps);
      }
      break;
    }
    case "adam": {
      st.t += 1;
      const b1t = 1 - 0.9 ** st.t;
      const b2t = 1 - 0.999 ** st.t;
      for (let i = 0; i < p.length; i += 1) {
        st.m[i] = 0.9 * st.m[i] + 0.1 * g[i];
        st.v2[i] = 0.999 * st.v2[i] + 0.001 * g[i] * g[i];
        p[i] -= (lr * (st.m[i] / b1t)) / (Math.sqrt(st.v2[i] / b2t) + eps);
      }
      break;
    }
    default: {
      const _: never = cfg.optimizer;
      throw new Error(`unknown optimizer ${String(_)}`);
    }
  }
}

export function runCnnTraining(cfg: CnnConfig): CnnRunResult {
  const rng = mulberry32(cfg.seed);
  const { train, test, demo } = makeDataset(rng);
  const p = initParams(rng);

  const stepsPerEpoch = Math.ceil(train.length / cfg.batchSize);
  const totalSteps = cfg.epochs * stepsPerEpoch;
  const snapEvery = Math.max(1, Math.round(totalSteps / 60));

  const history: CnnStep[] = [
    { step: 0, epoch: 0, loss: meanTestLoss(p, test), testAcc: testAccuracy(p, test) },
  ];
  const snapshots: CnnSnapshot[] = [takeSnapshot(0, p, demo)];

  const st: OptimizerState = {
    v: new Float64Array(N_PARAMS),
    avgSq: new Float64Array(N_PARAMS),
    m: new Float64Array(N_PARAMS),
    v2: new Float64Array(N_PARAMS),
    t: 0,
  };

  const indices = train.map((_, i) => i);
  const grad = new Float64Array(N_PARAMS);
  let step = 0;

  for (let epoch = 1; epoch <= cfg.epochs; epoch += 1) {
    // 시드 고정 셔플 (Fisher–Yates)
    for (let i = indices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    for (let b = 0; b < train.length; b += cfg.batchSize) {
      const batch = indices.slice(b, b + cfg.batchSize);
      grad.fill(0);
      let batchLoss = 0;
      for (const idx of batch) {
        const s = train[idx];
        const fwd = forward(p, s.pixels, s.label);
        batchLoss += fwd.loss;
        backward(p, s.pixels, s.label, fwd, grad);
      }
      for (let i = 0; i < grad.length; i += 1) grad[i] /= batch.length;
      applyUpdate(cfg, p, grad, st);

      step += 1;
      history.push({
        step,
        epoch,
        loss: batchLoss / batch.length,
        testAcc: testAccuracy(p, test),
      });
      if (step % snapEvery === 0 || step === totalSteps) {
        snapshots.push(takeSnapshot(step, p, demo));
      }
    }
  }

  return { history, snapshots, demoSamples: demo };
}

export const DEFAULT_CNN_CONFIG: CnnConfig = {
  optimizer: "adam",
  lr: 0.01,
  epochs: 30,
  batchSize: 16,
  seed: 42,
};

/** 옵티마이저 바꿀 때 쓸 대략적인 기본 학습률 (이 미니 CNN 과제용) */
export function defaultCnnLearningRateFor(o: CnnOptimizerName): number {
  switch (o) {
    case "sgd":
      return 0.1;
    case "momentum":
      return 0.02;
    case "rmsprop":
      return 0.005;
    case "adam":
      return 0.01;
  }
}
