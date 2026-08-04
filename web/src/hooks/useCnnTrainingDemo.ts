"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_CNN_CONFIG,
  type CnnConfig,
  type CnnOptimizerName,
  type CnnRunResult,
  type CnnSnapshot,
  type CnnStep,
  runCnnTraining,
} from "@/lib/cnn";

const MAX_CHART_POINTS = 300;

function downsample<T>(arr: T[], maxN: number): T[] {
  if (arr.length <= maxN) return arr;
  const step = Math.ceil(arr.length / maxN);
  return arr.filter((_, i) => i % step === 0 || i === arr.length - 1);
}

export type CnnTrainingDemo = {
  optimizer: CnnOptimizerName;
  setOptimizer: (o: CnnOptimizerName) => void;
  lr: number;
  setLr: (v: number) => void;
  epochs: number;
  setEpochs: (v: number) => void;
  batchSize: number;
  setBatchSize: (v: number) => void;
  result: CnnRunResult;
  chartData: CnnStep[];
  currentStep: number;
  setCurrentStep: (s: number) => void;
  totalSteps: number;
  currentPoint: CnnStep;
  /** 현재 스텝 이하에서 가장 가까운 스냅샷 (필터·예측 시각화용) */
  currentSnapshot: CnnSnapshot;
  isPlaying: boolean;
  speed: number;
  setSpeed: (v: number) => void;
  togglePlay: () => void;
  reset: () => void;
  jumpToEnd: () => void;
};

export function useCnnTrainingDemo(): CnnTrainingDemo {
  const [optimizer, setOptimizer] = useState<CnnOptimizerName>(
    DEFAULT_CNN_CONFIG.optimizer,
  );
  const [lr, setLr] = useState(DEFAULT_CNN_CONFIG.lr);
  const [epochs, setEpochs] = useState(DEFAULT_CNN_CONFIG.epochs);
  const [batchSize, setBatchSize] = useState(DEFAULT_CNN_CONFIG.batchSize);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(4);

  const config: CnnConfig = useMemo(
    () => ({
      optimizer,
      lr,
      epochs: Math.max(1, Math.min(100, Math.round(epochs) || 1)),
      batchSize: Math.max(4, Math.min(64, Math.round(batchSize) || 4)),
      seed: DEFAULT_CNN_CONFIG.seed,
    }),
    [optimizer, lr, epochs, batchSize],
  );

  const result = useMemo(() => runCnnTraining(config), [config]);
  const totalSteps = result.history.length;

  // 설정이 바뀌면 처음부터 다시 재생 (렌더 중 상태 조정 패턴)
  const configKey = useMemo(() => JSON.stringify(config), [config]);
  const [prevConfigKey, setPrevConfigKey] = useState(configKey);
  if (prevConfigKey !== configKey) {
    setPrevConfigKey(configKey);
    setCurrentStep(0);
    setIsPlaying(false);
  }

  const safeStep = Math.min(currentStep, Math.max(0, totalSteps - 1));

  const chartData = useMemo(
    () => downsample(result.history.slice(0, safeStep + 1), MAX_CHART_POINTS),
    [result.history, safeStep],
  );

  const currentPoint = result.history[safeStep];

  const currentSnapshot = useMemo(() => {
    const snaps = result.snapshots;
    let found = snaps[0];
    for (const s of snaps) {
      if (s.step <= safeStep) found = s;
      else break;
    }
    return found;
  }, [result.snapshots, safeStep]);

  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  const jumpToEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(Math.max(0, totalSteps - 1));
  }, [totalSteps]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentStep((s) => {
        const cap = totalSteps - 1;
        const next = s + speed;
        if (next >= cap) {
          setIsPlaying(false);
          return cap;
        }
        return next;
      });
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, totalSteps]);

  return {
    optimizer,
    setOptimizer,
    lr,
    setLr,
    epochs,
    setEpochs,
    batchSize,
    setBatchSize,
    result,
    chartData,
    currentStep: safeStep,
    setCurrentStep,
    totalSteps,
    currentPoint,
    currentSnapshot,
    isPlaying,
    speed,
    setSpeed,
    togglePlay,
    reset,
    jumpToEnd,
  };
}
