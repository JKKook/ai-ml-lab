"use client";

import { EpochResult } from "@/lib/backprop";

type Props = { result: EpochResult };

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function weightStrokeColor(w: number): string {
  return w >= 0 ? "#10b981" : "#ef4444";
}

function weightStrokeWidth(w: number): number {
  return Math.min(6, Math.max(1, Math.abs(w) * 2.5));
}

export function NetworkSvg({ result }: Props) {
  const { weightsHidden: wh, weightsOutput: wo } = result;

  const hidden0 = sigmoid(0 * wh); // x=0 → always 0.5
  const hidden1 = sigmoid(1 * wh); // x=1
  const pred0 = sigmoid(hidden0 * wo);
  const pred1 = sigmoid(hidden1 * wo);

  const whColor = weightStrokeColor(wh);
  const woColor = weightStrokeColor(wo);
  const whWidth = weightStrokeWidth(wh);
  const woWidth = weightStrokeWidth(wo);

  return (
    <svg
      viewBox="0 0 480 210"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: "ui-monospace, monospace" }}
    >
      {/* ── Input nodes ── */}
      <circle cx={52} cy={65} r={24} fill="#0f0f17" stroke="#6366f1" strokeWidth={1.5} />
      <text x={52} y={61} textAnchor="middle" fill="#a5b4fc" fontSize={10}>x = 0</text>
      <text x={52} y={75} textAnchor="middle" fill="#818cf8" fontSize={9}>→ 0</text>

      <circle cx={52} cy={145} r={24} fill="#0f0f17" stroke="#6366f1" strokeWidth={1.5} />
      <text x={52} y={141} textAnchor="middle" fill="#a5b4fc" fontSize={10}>x = 1</text>
      <text x={52} y={155} textAnchor="middle" fill="#818cf8" fontSize={9}>→ 1</text>

      {/* ── Edges: inputs → hidden ── */}
      <line x1={76} y1={65} x2={188} y2={105} stroke={whColor} strokeWidth={whWidth} opacity={0.65} />
      <line x1={76} y1={145} x2={188} y2={105} stroke={whColor} strokeWidth={whWidth} opacity={0.65} />
      <text x={128} y={76} fill={whColor} fontSize={9} textAnchor="middle">
        wh = {wh.toFixed(3)}
      </text>

      {/* ── Hidden node ── */}
      <circle cx={216} cy={105} r={28} fill="#0f0f17" stroke="#f59e0b" strokeWidth={1.5} />
      <text x={216} y={100} textAnchor="middle" fill="#fbbf24" fontSize={9}>σ(x · wh)</text>
      <text x={216} y={113} textAnchor="middle" fill="#fcd34d" fontSize={8}>
        h₁={hidden1.toFixed(3)}
      </text>

      {/* ── Edge: hidden → output ── */}
      <line x1={244} y1={105} x2={348} y2={105} stroke={woColor} strokeWidth={woWidth} opacity={0.65} />
      <text x={296} y={97} fill={woColor} fontSize={9} textAnchor="middle">
        wo = {wo.toFixed(3)}
      </text>

      {/* ── Output node ── */}
      <circle cx={376} cy={105} r={28} fill="#0f0f17" stroke="#10b981" strokeWidth={1.5} />
      <text x={376} y={100} textAnchor="middle" fill="#6ee7b7" fontSize={9}>σ(h · wo)</text>
      <text x={376} y={113} textAnchor="middle" fill="#34d399" fontSize={8}>ŷ</text>

      {/* ── Prediction callouts ── */}
      <line x1={402} y1={96} x2={432} y2={68} stroke="#3f3f46" strokeWidth={1} strokeDasharray="3 2" />
      <text x={445} y={62} fill="#6ee7b7" fontSize={9} textAnchor="middle">ŷ(0) = {pred0.toFixed(3)}</text>
      <text x={445} y={73} fill={pred0 < 0.1 ? "#34d399" : "#f87171"} fontSize={8} textAnchor="middle">
        {pred0 < 0.1 ? "✓ ≈ 0" : `✗ (want 0)`}
      </text>

      <line x1={402} y1={114} x2={432} y2={142} stroke="#3f3f46" strokeWidth={1} strokeDasharray="3 2" />
      <text x={445} y={148} fill="#6ee7b7" fontSize={9} textAnchor="middle">ŷ(1) = {pred1.toFixed(3)}</text>
      <text x={445} y={159} fill={pred1 > 0.9 ? "#34d399" : "#f87171"} fontSize={8} textAnchor="middle">
        {pred1 > 0.9 ? "✓ ≈ 1" : `✗ (want 1)`}
      </text>
    </svg>
  );
}
