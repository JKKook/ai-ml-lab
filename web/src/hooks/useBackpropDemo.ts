"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EpochResult, TrainingConfig, runTraining } from "@/lib/backprop";

const TOTAL_EPOCHS = 10000;

export type BackpropDemoResult = {
  currentEpoch: number;
  currentResult: EpochResult;
  isPlaying: boolean;
  speed: number;
  learningRate: number;
  chartData: EpochResult[];
  totalEpochs: number;
  setSpeed: (v: number) => void;
  setLearningRate: (v: number) => void;
  setCurrentEpoch: (e: number) => void;
  togglePlay: () => void;
  reset: () => void;
  jumpToEnd: () => void;
};

function downsample(data: EpochResult[], maxPoints: number): EpochResult[] {
  if (data.length <= maxPoints) return data;
  const step = Math.floor(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0 || i === data.length - 1);
}

export function useBackpropDemo(): BackpropDemoResult {
  const [learningRate, setLearningRateRaw] = useState(0.1);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);

  const config: TrainingConfig = useMemo(
    () => ({ learningRate, epochs: TOTAL_EPOCHS }),
    [learningRate]
  );

  const allResults = useMemo(() => runTraining(config), [config]);

  const setLearningRate = useCallback((v: number) => {
    setLearningRateRaw(v);
    setCurrentEpoch(0);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentEpoch(0);
  }, []);

  const jumpToEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentEpoch(TOTAL_EPOCHS - 1);
  }, []);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentEpoch((e) => {
        const next = e + speed;
        if (next >= TOTAL_EPOCHS - 1) {
          setIsPlaying(false);
          return TOTAL_EPOCHS - 1;
        }
        return next;
      });
    }, 60);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed]);

  const visibleResults = useMemo(
    () => allResults.slice(0, currentEpoch + 1),
    [allResults, currentEpoch]
  );

  const chartData = useMemo(() => downsample(visibleResults, 300), [visibleResults]);
  const currentResult = allResults[currentEpoch];

  return {
    currentEpoch,
    currentResult,
    isPlaying,
    speed,
    learningRate,
    chartData,
    totalEpochs: TOTAL_EPOCHS,
    setSpeed,
    setLearningRate,
    setCurrentEpoch,
    togglePlay,
    reset,
    jumpToEnd,
  };
}
