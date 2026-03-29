export type EpochResult = {
  epoch: number;
  loss: number;
  weightsHidden: number;
  weightsOutput: number;
  predInput0: number;
  predInput1: number;
};

export type TrainingConfig = {
  learningRate: number;
  epochs: number;
};

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(activated: number): number {
  return activated * (1 - activated);
}

/** LCG seeded random — gives stable initial weights across re-renders. */
function initWeights(seed: number): [number, number] {
  let s = seed >>> 0;
  const next = (): number => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  return [next(), next()];
}

/**
 * Runs full backprop training for a 1-hidden-layer network:
 *   x → σ(x · w_h) → σ(h · w_o) → ŷ
 * Task: learn identity — input 0 → output 0, input 1 → output 1.
 */
export function runTraining(config: TrainingConfig): EpochResult[] {
  const [wh0, wo0] = initWeights(99);
  let wh = wh0;
  let wo = wo0;

  const xs = [0, 1];
  const ys = [0, 1];
  const results: EpochResult[] = [];

  for (let epoch = 0; epoch < config.epochs; epoch++) {
    const hiddenOut = xs.map((x) => sigmoid(x * wh));
    const predicted = hiddenOut.map((h) => sigmoid(h * wo));

    const errors = ys.map((y, i) => y - predicted[i]);
    const loss = errors.reduce((s, e) => s + e * e, 0) / errors.length;

    const dPredicted = errors.map((e, i) => e * sigmoidDerivative(predicted[i]));
    const dHidden = dPredicted.map(
      (d, i) => d * wo * sigmoidDerivative(hiddenOut[i])
    );

    wo += hiddenOut.reduce((s, h, i) => s + h * dPredicted[i], 0) * config.learningRate;
    wh += xs.reduce((s, x, i) => s + x * dHidden[i], 0) * config.learningRate;

    results.push({
      epoch,
      loss,
      weightsHidden: wh,
      weightsOutput: wo,
      predInput0: predicted[0],
      predInput1: predicted[1],
    });
  }

  return results;
}
