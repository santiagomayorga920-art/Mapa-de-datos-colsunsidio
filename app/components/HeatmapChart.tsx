"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ZoneTrendPoint = {
  hora: string;
  atracciones: number;
  piscinas: number;
  restaurantes: number;
  descanso: number;
};

type HeatmapChartProps = {
  data: ZoneTrendPoint[];
};

const SERIES: {
  key: keyof Omit<ZoneTrendPoint, "hora">;
  label: string;
  color: string;
  gradientId: string;
}[] = [
  {
    key: "atracciones",
    label: "Atracciones",
    color: "#ef4444",
    gradientId: "gradAtracciones",
  },
  {
    key: "piscinas",
    label: "Piscinas",
    color: "#f97316",
    gradientId: "gradPiscinas",
  },
  {
    key: "restaurantes",
    label: "Restaurantes",
    color: "#3b82f6",
    gradientId: "gradRestaurantes",
  },
  {
    key: "descanso",
    label: "Áreas de Descanso",
    color: "#22c55e",
    gradientId: "gradDescanso",
  },
];

type TooltipPayloadItem = {
  name: string;
  value: number;
  color: string;
  dataKey: string;
};

function HeatmapTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-white/50 bg-white/90 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="font-semibold text-slate-900">{label}</p>
      <ul className="mt-1 space-y-0.5">
        {payload.map((p) => (
          <li key={p.dataKey} className="flex items-center gap-2 text-slate-600">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span>{p.name}</span>
            <span className="ml-auto font-mono text-slate-900">
              {Math.round(p.value)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeatmapChart({ data }: HeatmapChartProps) {
  return (
    <article className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-lg shadow-blue-900/5 backdrop-blur-md">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Mapa de calor lógico
          </p>
          <h2 className="mt-1 text-base font-semibold text-slate-900">
            Distribución del parque
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Evolución de la saturación por zona (últimos minutos).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SERIES.map((s) => (
            <span
              key={s.key}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-white/40 backdrop-blur"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <defs>
              {SERIES.map((s) => (
                <linearGradient
                  key={s.gradientId}
                  id={s.gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="3 6"
              vertical={false}
            />
            <XAxis
              dataKey="hora"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ stroke: "#94a3b8", strokeDasharray: "3 3" }}
              content={<HeatmapTooltip />}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#${s.gradientId})`}
                isAnimationActive
                animationDuration={800}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
