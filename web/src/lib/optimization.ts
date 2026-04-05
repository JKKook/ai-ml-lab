/** 2D Rosenbrock: f(x,y) = (1-x)² + 100(y-x²)² — 최솟값 (1, 1) */

export type Vec2 = { x: number; y: number };

export type OptimizerName = "sgd" | "momentum" | "rmsprop" | "adam";

export type OptStepResult = {
  step: number;
  x: number;
  y: number;
  loss: number;
};

export type OptConfig = {
  optimizer: OptimizerName;
  lr: number;
  momentum: number;
  beta1: number;
  beta2: number;
  eps: number;
  alpha: number;
  maxSteps: number;
  init: Vec2;
};

export function rosenbrock(p: Vec2): number {
  const t = p.y - p.x * p.x;
  return (1 - p.x) ** 2 + 100 * t * t;
}

export function rosenbrockGrad(p: Vec2): Vec2 {
  const t = p.y - p.x * p.x;
  const gx = -2 * (1 - p.x) - 400 * p.x * t;
  const gy = 200 * t;
  return { x: gx, y: gy };
}

/** PyTorch 기본식에 맞춘 한 스텝씩 궤적 생성 (step 0 = 초기점) */
export function runOptimization(cfg: OptConfig): OptStepResult[] {
  let pos: Vec2 = { ...cfg.init };
  const out: OptStepResult[] = [];

  let vx = 0;
  let vy = 0;
  let avgSqX = 0;
  let avgSqY = 0;
  let mx = 0;
  let my = 0;
  let vxAdam = 0;
  let vyAdam = 0;
  let tAdam = 0;

  for (let step = 0; step <= cfg.maxSteps; step += 1) {
    out.push({
      step,
      x: pos.x,
      y: pos.y,
      loss: rosenbrock(pos),
    });
    if (step === cfg.maxSteps) break;

    const g = rosenbrockGrad(pos);
    const gx = g.x;
    const gy = g.y;

    switch (cfg.optimizer) {
      case "sgd": {
        pos = {
          x: pos.x - cfg.lr * gx,
          y: pos.y - cfg.lr * gy,
        };
        break;
      }
      case "momentum": {
        vx = cfg.momentum * vx + gx;
        vy = cfg.momentum * vy + gy;
        pos = {
          x: pos.x - cfg.lr * vx,
          y: pos.y - cfg.lr * vy,
        };
        break;
      }
      case "rmsprop": {
        avgSqX = cfg.alpha * avgSqX + (1 - cfg.alpha) * gx * gx;
        avgSqY = cfg.alpha * avgSqY + (1 - cfg.alpha) * gy * gy;
        pos = {
          x: pos.x - (cfg.lr * gx) / (Math.sqrt(avgSqX) + cfg.eps),
          y: pos.y - (cfg.lr * gy) / (Math.sqrt(avgSqY) + cfg.eps),
        };
        break;
      }
      case "adam": {
        tAdam += 1;
        mx = cfg.beta1 * mx + (1 - cfg.beta1) * gx;
        my = cfg.beta1 * my + (1 - cfg.beta1) * gy;
        vxAdam = cfg.beta2 * vxAdam + (1 - cfg.beta2) * gx * gx;
        vyAdam = cfg.beta2 * vyAdam + (1 - cfg.beta2) * gy * gy;
        const b1t = 1 - cfg.beta1 ** tAdam;
        const b2t = 1 - cfg.beta2 ** tAdam;
        const mhx = mx / b1t;
        const mhy = my / b1t;
        const vhx = vxAdam / b2t;
        const vhy = vyAdam / b2t;
        pos = {
          x: pos.x - (cfg.lr * mhx) / (Math.sqrt(vhx) + cfg.eps),
          y: pos.y - (cfg.lr * mhy) / (Math.sqrt(vhy) + cfg.eps),
        };
        break;
      }
      default: {
        const _: never = cfg.optimizer;
        throw new Error(`unknown optimizer ${String(_)}`);
      }
    }
  }

  return out;
}

export const DEFAULT_INIT: Vec2 = { x: -1.2, y: 1 };

export const DEFAULT_OPT_CONFIG: Omit<OptConfig, "optimizer"> = {
  lr: 0.02,
  momentum: 0.9,
  beta1: 0.9,
  beta2: 0.999,
  eps: 1e-8,
  alpha: 0.99,
  maxSteps: 600,
  init: DEFAULT_INIT,
};

/** 옵티마이저 바꿀 때 쓸 대략적인 기본 학습률 (Rosenbrock용) */
export function defaultLearningRateFor(optimizer: OptimizerName): number {
  switch (optimizer) {
    case "sgd":
      return 0.00015;
    case "momentum":
      return 0.00015;
    case "rmsprop":
      return 0.001;
    case "adam":
      return 0.02;
  }
}
