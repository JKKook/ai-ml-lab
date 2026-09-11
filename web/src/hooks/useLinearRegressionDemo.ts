"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ClosedFormFit,
  DatasetStats,
  SamplePoint,
  StepResult,
  closedFormFit,
  describeDataset,
  runTraining,
} from "@/lib/linear-regression";

const TOTAL_STEPS = 300;

export type LinearRegressionDemoResult = {
  currentStep: number;
  currentResult: StepResult;
  chartData: StepResult[];
  stats: DatasetStats;
  target: ClosedFormFit;
  totalSteps: number;
  /** 학습률이 너무 커서 발산한 경우 기록이 중간에 끊긴다 */
  diverged: boolean;
  isPlaying: boolean;
  speed: number;
  learningRate: number;
  setSpeed: (v: number) => void;
  setLearningRate: (v: number) => void;
  setCurrentStep: (v: number) => void;
  togglePlay: () => void;
  reset: () => void;
  jumpToEnd: () => void;
};

export function useLinearRegressionDemo(
  points: SamplePoint[]
): LinearRegressionDemoResult {
  const [learningRate, setLearningRateRaw] = useState(0.05);
  const [currentStep, setCurrentStepRaw] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);

  const allResults = useMemo(
    () => runTraining(points, { learningRate, steps: TOTAL_STEPS }),
    [points, learningRate]
  );
  const stats = useMemo(() => describeDataset(points), [points]);
  const target = useMemo(() => closedFormFit(points), [points]);

  const lastStep = allResults.length - 1;
  const diverged = allResults.length < TOTAL_STEPS;

  const setCurrentStep = useCallback(
    (v: number) => setCurrentStepRaw(Math.min(Math.max(v, 0), lastStep)),
    [lastStep]
  );

  const setLearningRate = useCallback((v: number) => {
    setLearningRateRaw(v);
    setCurrentStepRaw(0);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepRaw(0);
  }, []);

  const jumpToEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepRaw(lastStep);
  }, [lastStep]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentStepRaw((s) => {
        const next = s + speed;
        if (next >= lastStep) {
          setIsPlaying(false);
          return lastStep;
        }
        return next;
      });
    }, 60);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, lastStep]);

  const safeStep = Math.min(currentStep, lastStep);
  const chartData = useMemo(
    () => allResults.slice(0, safeStep + 1),
    [allResults, safeStep]
  );

  return {
    currentStep: safeStep,
    currentResult: allResults[safeStep],
    chartData,
    stats,
    target,
    totalSteps: allResults.length,
    diverged,
    isPlaying,
    speed,
    learningRate,
    setSpeed,
    setLearningRate,
    setCurrentStep,
    togglePlay,
    reset,
    jumpToEnd,
  };
}
