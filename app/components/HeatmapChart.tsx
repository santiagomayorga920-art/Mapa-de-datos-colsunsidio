"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ZoneData = {
  zona: string;
  porcentaje: number;
  personas: number;
  saturacion: "Baja" | "Media" | "Alta" | "Crítica";
};

const zones: ZoneData[] = [
  { zona: "Atracciones", porcentaje: 40, personas: 1336, saturacion: "Crítica" },
  { zona: "Piscinas", porcentaje: 35, personas: 1169, saturacion: "Alta" },
  { zona: "Restaurantes", porcentaje: 15, personas: 501, saturacion: "Media" },
  { zona: "Áreas de Descanso", porcentaje: 10, personas: 334, saturacion: "Baja" },
];

const SATURATION_COLOR: Record<ZoneData["saturacion"], string> = {
  Baja: "#22c55e",
  Media: "#3b82f6",
  Alta: "#f97316",
  Crítica: "#ef4444",
};

type TooltipPayload = {
  payload: ZoneData;
};

function HeatmapTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-slate-900">{data.zona}</p>
      <p className="mt-1 text-slate-600">
        {data.personas.toLocaleString("es-CO")} personas · {data.porcentaje}%
      </p>
      <p className="mt-0.5 text-slate-400">Saturación: {data.saturacion}</p>
    </div>
  );
}

export function HeatmapChart() {
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
            Porcentaje de visitantes por zona (escala de saturación).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(SATURATION_COLOR) as ZoneData["saturacion"][]).map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-white/40 backdrop-blur"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: SATURATION_COLOR[k] }}
              />
              {k}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={zones}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <XAxis
              dataKey="zona"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              unit="%"
            />
            <Tooltip
              cursor={{ fill: "rgba(99, 102, 241, 0.06)" }}
              content={<HeatmapTooltip />}
            />
            <Bar dataKey="porcentaje" radius={[6, 6, 0, 0]}>
              {zones.map((zone) => (
                <Cell
                  key={zone.zona}
                  fill={SATURATION_COLOR[zone.saturacion]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
