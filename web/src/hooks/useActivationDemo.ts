"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ActivationName,
  ACTIVATION_HIST_RANGE,
  applyActivation,
  deadNeuronRatio,
} from "@/lib/activations";
import {
  BinEntry,
  DataStats,
  Point3D,
  describeArray,
  histogramBins,
  linearTransform,
  mulberry32,
  randnMatrixWithRng,
} from "@/lib/math";

const INPUT_DIMS = 10;

/** Fixed seed so SSR and the browser’s first paint use identical synthetic data. */
const INITIAL_SAMPLE_SEED = 0xdec0d;

type GeneratedData = {
  inputs: number[][];
  weights: number[];
  bias: number;
};

function generateSample(n: number, k: number, uniform: () => number): GeneratedData {
  return {
    inputs: randnMatrixWithRng(n, k, uniform),
    // He initialization: σ = sqrt(2/k)
    weights: Array.from({ length: k }, () => (uniform() * 2 - 1) * Math.sqrt(2 / k)),
    bias: 0,
  };
}

export type ActivationDemoResult = {
  sampleSize: number;
  inputDims: number;
  activation: ActivationName;
  z: number[];
  zActivated: number[];
  zHistogram: BinEntry[];
  activatedHistogram: BinEntry[];
  zStats: DataStats;
  activatedStats: DataStats;
  deadRatio: number | null;
  scatter3DPoints: Point3D[];
  inputSample: number[][];
  weights: number[];
  setSampleSize: (n: number) => void;
  setActivation: (name: ActivationName) => void;
  regenerate: () => void;
};

export function useActivationDemo(): ActivationDemoResult {
  const [sampleSize, setSampleSizeRaw] = useState(1000);
  const [activation, setActivation] = useState<ActivationName>("relu");
  const [data, setData] = useState<GeneratedData>(() =>
    generateSample(1000, INPUT_DIMS, mulberry32(INITIAL_SAMPLE_SEED))
  );

  const setSampleSize = useCallback((n: number) => {
    setSampleSizeRaw(n);
    setData(generateSample(n, INPUT_DIMS, Math.random));
  }, []);

  const regenerate = useCallback(() => {
    setData((prev) => generateSample(prev.inputs.length, INPUT_DIMS, Math.random));
  }, []);

  const z = useMemo(
    () => linearTransform(data.inputs, data.weights, data.bias),
    [data]
  );

  const zActivated = useMemo(() => applyActivation(z, activation), [z, activation]);

  const [histMin, histMax] = ACTIVATION_HIST_RANGE[activation];

  const zHistogram = useMemo(() => histogramBins(z, 60, -3, 3), [z]);
  const activatedHistogram = useMemo(
    () => histogramBins(zActivated, 60, histMin, histMax),
    [zActivated, histMin, histMax]
  );

  const zStats = useMemo(() => describeArray(z), [z]);
  const activatedStats = useMemo(() => describeArray(zActivated), [zActivated]);

  const deadRatio = useMemo(
    () => (activation === "relu" ? deadNeuronRatio(zActivated) : null),
    [activation, zActivated]
  );

  const scatter3DPoints = useMemo<Point3D[]>(() => {
    const n = Math.min(500, data.inputs.length);
    return data.inputs.slice(0, n).map((row, i) => ({
      x: row[0],
      y: row[1],
      z: row[2],
      value: zActivated[i],
    }));
  }, [data.inputs, zActivated]);

  const inputSample = useMemo(() => data.inputs.slice(0, 6), [data.inputs]);

  return {
    sampleSize,
    inputDims: INPUT_DIMS,
    activation,
    z,
    zActivated,
    zHistogram,
    activatedHistogram,
    zStats,
    activatedStats,
    deadRatio,
    scatter3DPoints,
    inputSample,
    weights: data.weights,
    setSampleSize,
    setActivation,
    regenerate,
  };
}
