"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_INIT,
  DEFAULT_OPT_CONFIG,
  type OptConfig,
  type OptStepResult,
  type OptimizerName,
  runOptimization,
} from "@/lib/optimization";

const MAX_CHART_POINTS = 400;

function downsample<T>(arr: T[], maxN: number): T[] {
  if (arr.length <= maxN) return arr;
  const step = Math.ceil(arr.length / maxN);
  return arr.filter((_, i) => i % step === 0 || i === arr.length - 1);
}

export type OptimizationDemo = {
  optimizer: OptimizerName;
  setOptimizer: (o: OptimizerName) => void;
  lr: number;
  setLr: (v: number) => void;
  momentum: number;
  setMomentum: (v: number) => void;
  beta1: number;
  setBeta1: (v: number) => void;
  beta2: number;
  setBeta2: (v: number) => void;
  alpha: number;
  setAlpha: (v: number) => void;
  maxSteps: number;
  setMaxSteps: (v: number) => void;
  fullTrajectory: OptStepResult[];
  chartTrajectory: OptStepResult[];
  chartLoss: { step: number; loss: number }[];
  currentStep: number;
  setCurrentStep: (s: number) => void;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  setSpeed: (v: number) => void;
  togglePlay: () => void;
  reset: () => void;
  jumpToEnd: () => void;
  currentPoint: OptStepResult;
};

export function useOptimizationDemo(): OptimizationDemo {
  const [optimizer, setOptimizerRaw] = useState<OptimizerName>("adam");
  const [lr, setLrRaw] = useState(DEFAULT_OPT_CONFIG.lr);
  const [momentum, setMomentum] = useState(DEFAULT_OPT_CONFIG.momentum);
  const [beta1, setBeta1] = useState(DEFAULT_OPT_CONFIG.beta1);
  const [beta2, setBeta2] = useState(DEFAULT_OPT_CONFIG.beta2);
  const [alpha, setAlpha] = useState(DEFAULT_OPT_CONFIG.alpha);
  const [maxSteps, setMaxStepsRaw] = useState(DEFAULT_OPT_CONFIG.maxSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(8);

  const setOptimizer = useCallback((o: OptimizerName) => {
    setOptimizerRaw(o);
  }, []);

  const setLr = useCallback((v: number) => {
    setLrRaw(v);
  }, []);

  const setMaxSteps = useCallback((v: number) => {
    setMaxStepsRaw(v);
  }, []);

  const config: OptConfig = useMemo(
    () => ({
      optimizer,
      lr,
      momentum,
      beta1,
      beta2,
      eps: DEFAULT_OPT_CONFIG.eps,
      alpha,
      maxSteps,
      init: DEFAULT_INIT,
    }),
    [optimizer, lr, momentum, beta1, beta2, alpha, maxSteps]
  );

  const fullTrajectory = useMemo(() => runOptimization(config), [config]);

  const totalSteps = fullTrajectory.length;

  const configKey = useMemo(
    () =>
      JSON.stringify({
        optimizer: config.optimizer,
        lr: config.lr,
        momentum: config.momentum,
        beta1: config.beta1,
        beta2: config.beta2,
        alpha: config.alpha,
        maxSteps: config.maxSteps,
      }),
    [config]
  );

  const prevConfigKey = useRef(configKey);
  useEffect(() => {
    if (prevConfigKey.current !== configKey) {
      prevConfigKey.current = configKey;
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [configKey]);

  useEffect(() => {
    setCurrentStep((s) => Math.min(s, Math.max(0, totalSteps - 1)));
  }, [totalSteps]);

  const safeStep = Math.min(currentStep, Math.max(0, totalSteps - 1));

  const visibleTrajectory = useMemo(
    () => fullTrajectory.slice(0, safeStep + 1),
    [fullTrajectory, safeStep]
  );

  const chartTrajectory = useMemo(
    () => downsample(visibleTrajectory, MAX_CHART_POINTS),
    [visibleTrajectory]
  );

  const chartLoss = useMemo(
    () =>
      downsample(
        visibleTrajectory.map((p) => ({ step: p.step, loss: p.loss })),
        MAX_CHART_POINTS
      ),
    [visibleTrajectory]
  );

  const currentPoint = fullTrajectory[safeStep];

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
    momentum,
    setMomentum,
    beta1,
    setBeta1,
    beta2,
    setBeta2,
    alpha,
    setAlpha,
    maxSteps,
    setMaxSteps,
    fullTrajectory,
    chartTrajectory,
    chartLoss,
    currentStep: safeStep,
    setCurrentStep,
    totalSteps,
    isPlaying,
    speed,
    setSpeed,
    togglePlay,
    reset,
    jumpToEnd,
    currentPoint,
  };
}
