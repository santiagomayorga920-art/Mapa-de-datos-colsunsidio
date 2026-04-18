"use client";

import { motion } from "framer-motion";
import { LineChart as LineChartIcon, TrendingUp } from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TrendPoint = {
  hora: string;
  inApp: number;
  taquilla: number;
  total: number;
};

const DATA: TrendPoint[] = [
  { hora: "08", inApp: 320_000, taquilla: 180_000, total: 500_000 },
  { hora: "09", inApp: 540_000, taquilla: 320_000, total: 860_000 },
  { hora: "10", inApp: 820_000, taquilla: 450_000, total: 1_270_000 },
  { hora: "11", inApp: 1_120_000, taquilla: 620_000, total: 1_740_000 },
  { hora: "12", inApp: 1_540_000, taquilla: 780_000, total: 2_320_000 },
  { hora: "13", inApp: 2_050_000, taquilla: 940_000, total: 2_990_000 },
  { hora: "14", inApp: 2_480_000, taquilla: 1_120_000, total: 3_600_000 },
  { hora: "15", inApp: 2_820_000, taquilla: 1_280_000, total: 4_100_000 },
  { hora: "16", inApp: 3_100_000, taquilla: 1_420_000, total: 4_520_000 },
  { hora: "17", inApp: 3_320_000, taquilla: 1_540_000, total: 4_860_000 },
];

function formatCompactCOP(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

function formatFullCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

type TooltipItem = {
  dataKey: string;
  name: string;
  value: number;
  color: string;
};

function TrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const totalItem = payload.find((p) => p.dataKey === "total");
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/90 px-3 py-2 text-xs shadow-xl shadow-black/40 backdrop-blur-xl">
      <p className="font-semibold text-slate-100">{label}:00 h</p>
      {totalItem && (
        <p className="mt-1 text-[11px] text-slate-400">
          Total:{" "}
          <span className="font-semibold text-indigo-300">
            {formatFullCOP(totalItem.value)}
          </span>
        </p>
      )}
    </div>
  );
}

export function IngresosTrendChart() {
  const ultimo = DATA[DATA.length - 1].total;
  const penultimo = DATA[DATA.length - 2].total;
  const delta = ((ultimo - penultimo) / penultimo) * 100;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl"
    >
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/25">
            <LineChartIcon className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Analytics · Ingresos
            </p>
            <h2 className="mt-0.5 text-base font-semibold text-slate-50">
              Tendencia de Ingresos
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Acumulado por hora (COP) · canal in-app + taquilla.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Última hora
          </p>
          <p className="text-lg font-semibold tabular-nums text-slate-50">
            {formatCompactCOP(ultimo)}
          </p>
          <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
            <TrendingUp className="h-3 w-3" aria-hidden />+{delta.toFixed(1)}%
          </span>
        </div>
      </header>

      <div className="mt-5 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={DATA}
            margin={{ top: 10, right: 12, left: 0, bottom: 4 }}
          >
            <defs>
              <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="trendStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a5b4fc" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(148, 163, 184, 0.12)"
              strokeDasharray="3 6"
              vertical={false}
            />
            <XAxis
              dataKey="hora"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(v) => `${v}h`}
              axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
              tickLine={false}
              dy={4}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
              tickLine={false}
              tickFormatter={formatCompactCOP}
              width={56}
            />
            <Tooltip
              cursor={{ stroke: "rgba(165, 180, 252, 0.35)", strokeDasharray: "3 3" }}
              content={<TrendTooltip />}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="transparent"
              fill="url(#trendArea)"
              isAnimationActive
              animationDuration={900}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="url(#trendStroke)"
              strokeWidth={2.5}
              dot={{ r: 3, stroke: "#1e1b4b", strokeWidth: 2, fill: "#a5b4fc" }}
              activeDot={{
                r: 5,
                stroke: "#c7d2fe",
                strokeWidth: 2,
                fill: "#6366f1",
              }}
              isAnimationActive
              animationDuration={900}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.article>
  );
}
