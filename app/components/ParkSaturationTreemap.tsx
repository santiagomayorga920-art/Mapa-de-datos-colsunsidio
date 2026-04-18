"use client";

import type React from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

type ZoneNode = {
  name: string;
  category: string;
  size: number;
  saturation: number;
};

const ZONES: ZoneNode[] = [
  { name: "Piscina de Olas", category: "Piscinas", size: 300, saturation: 91 },
  { name: "Piscina Olímpica", category: "Piscinas", size: 200, saturation: 58 },
  { name: "Piscina Infantil", category: "Piscinas", size: 150, saturation: 42 },
  { name: "Olas del Pacífico", category: "Atracciones", size: 150, saturation: 75 },
  { name: "Río Lento", category: "Atracciones", size: 120, saturation: 62 },
  { name: "Montaña Rusa Acuática", category: "Atracciones", size: 32, saturation: 88 },
  { name: "Splash Tower", category: "Atracciones", size: 45, saturation: 82 },
  { name: "Tobogán Kamikaze", category: "Atracciones", size: 40, saturation: 70 },
  { name: "Laberinto Acuático", category: "Atracciones", size: 50, saturation: 36 },
  { name: "Restaurante Central", category: "Restaurantes", size: 180, saturation: 54 },
  { name: "Zona de Comidas Rápidas", category: "Restaurantes", size: 220, saturation: 67 },
  { name: "Restaurante La Palma", category: "Restaurantes", size: 120, saturation: 48 },
  { name: "Pizzería del Parque", category: "Restaurantes", size: 90, saturation: 44 },
  { name: "Zona de Picnic Norte", category: "Descanso", size: 150, saturation: 32 },
  { name: "Zona de Picnic Sur", category: "Descanso", size: 150, saturation: 28 },
  { name: "Mirador Panorámico", category: "Descanso", size: 40, saturation: 22 },
];

type SaturationBucket = {
  fill: string;
  stroke: string;
  text: string;
  label: string;
};

function bucketFor(saturation: number): SaturationBucket {
  if (saturation >= 80) {
    return {
      fill: "rgba(244, 63, 94, 0.22)",
      stroke: "rgba(244, 63, 94, 0.55)",
      text: "#9f1239",
      label: "Crítico",
    };
  }
  if (saturation >= 50) {
    return {
      fill: "rgba(245, 158, 11, 0.22)",
      stroke: "rgba(245, 158, 11, 0.55)",
      text: "#92400e",
      label: "Moderado",
    };
  }
  return {
    fill: "rgba(16, 185, 129, 0.22)",
    stroke: "rgba(16, 185, 129, 0.5)",
    text: "#065f46",
    label: "Saludable",
  };
}

type TreemapContentProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  saturation?: number;
  category?: string;
};

function TreemapCell(props: TreemapContentProps): React.ReactElement {
  const { x = 0, y = 0, width = 0, height = 0, name = "", saturation = 0 } = props;
  const bucket = bucketFor(saturation);
  const isLarge = width > 90 && height > 60;
  const isMedium = width > 60 && height > 40;

  return (
    <g>
      <rect
        x={x + 1}
        y={y + 1}
        width={Math.max(width - 2, 0)}
        height={Math.max(height - 2, 0)}
        rx={10}
        ry={10}
        fill={bucket.fill}
        stroke={bucket.stroke}
        strokeWidth={1}
      />
      {isLarge && (
        <>
          <text
            x={x + 10}
            y={y + 20}
            fill={bucket.text}
            fontSize={11}
            fontWeight={600}
          >
            {name}
          </text>
          <text
            x={x + 10}
            y={y + 36}
            fill={bucket.text}
            fontSize={10}
            opacity={0.75}
          >
            {saturation}% · {bucket.label}
          </text>
        </>
      )}
      {!isLarge && isMedium && (
        <text
          x={x + 8}
          y={y + 18}
          fill={bucket.text}
          fontSize={10}
          fontWeight={600}
        >
          {saturation}%
        </text>
      )}
    </g>
  );
}

type TooltipItem = {
  payload: ZoneNode;
};

function TreemapTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipItem[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const node = payload[0].payload;
  if (!node?.name) return null;
  const bucket = bucketFor(node.saturation);
  return (
    <div className="rounded-lg border border-white/50 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="font-semibold text-slate-900">{node.name}</p>
      <p className="text-[11px] text-slate-500">{node.category}</p>
      <p className="mt-1 flex items-center gap-1.5 text-slate-700">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: bucket.stroke }}
        />
        <span className="font-semibold tabular-nums">{node.saturation}%</span>
        <span className="text-slate-500">· {bucket.label}</span>
      </p>
    </div>
  );
}

export function ParkSaturationTreemap() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-lg shadow-blue-900/5 backdrop-blur-md"
    >
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 ring-1 ring-sky-100">
            <LayoutGrid className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Mapa operativo
            </p>
            <h2 className="mt-0.5 text-base font-semibold text-slate-900">
              Saturación del Parque por Zona
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Tamaño proporcional a la capacidad; color según aforo actual.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            &lt;50%
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-700 ring-1 ring-amber-100">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            50-80%
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-1 text-[10px] font-medium text-rose-700 ring-1 ring-rose-100">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            &gt;80%
          </span>
        </div>
      </header>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={ZONES}
            dataKey="size"
            stroke="transparent"
            fill="transparent"
            isAnimationActive
            animationDuration={900}
            content={<TreemapCell />}
          >
            <Tooltip content={<TreemapTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </motion.article>
  );
}
