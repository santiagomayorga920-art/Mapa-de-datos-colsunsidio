"use client";

import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Segment = {
  name: string;
  value: number;
  color: string;
  description: string;
};

const DATA: Segment[] = [
  { name: "Cat A", value: 35, color: "#6366f1", description: "Afiliados premium" },
  { name: "Cat B", value: 28, color: "#10b981", description: "Afiliados estándar" },
  { name: "Cat C", value: 22, color: "#f59e0b", description: "Afiliados básicos" },
  { name: "No Afiliados", value: 15, color: "#64748b", description: "Visitantes ocasionales" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const legendItem = {
  hidden: { opacity: 0, x: 12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.25 + i * 0.08 },
  }),
};

export function AffiliateMixChart() {
  const total = DATA.reduce((acc, d) => acc + d.value, 0);

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-lg shadow-blue-900/5 backdrop-blur-md"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <UsersRound className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Composición de Asistentes
            </p>
            <p className="text-sm font-semibold text-slate-900">
              Mix por categoría de afiliación
            </p>
          </div>
        </div>
        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 ring-1 ring-violet-100">
          {total}% total
        </span>
      </header>

      <div className="mt-4 grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(180px,220px)_1fr]">
        <div className="relative mx-auto h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={82}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive
                animationDuration={900}
              >
                {DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(12px)",
                  fontSize: 12,
                  boxShadow: "0 10px 25px -12px rgba(30, 41, 59, 0.25)",
                }}
                formatter={(value, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
              Afiliados
            </p>
            <p className="text-2xl font-semibold tabular-nums text-slate-900">
              {DATA[0].value + DATA[1].value + DATA[2].value}%
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {DATA.map((entry, idx) => (
            <motion.li
              key={entry.name}
              custom={idx}
              variants={legendItem}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between rounded-lg border border-white/30 bg-white/60 px-3 py-2 text-xs shadow-sm backdrop-blur"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: entry.color }}
                />
                <div>
                  <p className="font-semibold text-slate-800">{entry.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {entry.description}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {entry.value}%
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
