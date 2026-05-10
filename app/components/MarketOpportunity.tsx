"use client";

import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Lightbulb, Scale, Target } from "lucide-react";

type Segment = {
  name: string;
  short: string;
  value: number;
  color: string;
  description: string;
};

const SEGMENTS: Segment[] = [
  {
    name: "Parejas / Adultos",
    short: "Parejas / Adultos",
    value: 58,
    color: "#34d399",
    description: "Alta disposición de pago",
  },
  {
    name: "Familias con Niños",
    short: "Familias con Niños",
    value: 31,
    color: "#fbbf24",
    description: "Baja disposición · Requiere subsidio",
  },
  {
    name: "Grupos",
    short: "Grupos",
    value: 11,
    color: "#818cf8",
    description: "Compras colectivas y eventos",
  },
];

type TooltipPayload = {
  payload: Segment;
};

function MarketTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const seg = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/95 px-3 py-2 text-xs shadow-xl shadow-black/40 backdrop-blur-xl">
      <p className="font-semibold text-slate-50">{seg.name}</p>
      <p className="mt-0.5 text-[11px] text-slate-400">{seg.description}</p>
      <p className="mt-1 flex items-center gap-1.5 text-slate-200">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: seg.color }}
        />
        <span className="font-semibold tabular-nums">{seg.value}%</span>
      </p>
    </div>
  );
}

export function MarketOpportunity() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl lg:col-span-7"
      >
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25">
              <Target className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Validación de mercado
              </p>
              <h2 className="mt-0.5 text-lg font-semibold text-slate-50">
                Mix de Visitantes vs. Fricción Comercial
              </h2>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            n = 1.420
          </span>
        </header>

        <div className="mt-4 grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(180px,240px)_1fr]">
          <div className="relative mx-auto h-56 w-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEGMENTS}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={96}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="rgba(15, 23, 42, 0.7)"
                  strokeWidth={1}
                  isAnimationActive
                  animationDuration={900}
                >
                  {SEGMENTS.map((seg) => (
                    <Cell key={seg.name} fill={seg.color} />
                  ))}
                </Pie>
                <Tooltip content={<MarketTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Conversión potencial
              </p>
              <p className="text-3xl font-semibold tabular-nums text-slate-50">
                {SEGMENTS[0].value + SEGMENTS[2].value}%
              </p>
              <p className="text-[10px] text-slate-500">paga sin subsidio</p>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5">
            {SEGMENTS.map((seg, idx) => (
              <motion.li
                key={seg.name}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2.5 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: seg.color }}
                  />
                  <div>
                    <p className="font-semibold text-slate-100">{seg.short}</p>
                    <p className="text-[10px] text-slate-400">
                      {seg.description}
                    </p>
                  </div>
                </div>
                <span className="text-base font-semibold tabular-nums text-slate-50">
                  {seg.value}%
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.55,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="relative overflow-hidden rounded-2xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/15 via-indigo-500/10 to-fuchsia-500/15 p-6 shadow-2xl shadow-fuchsia-500/15 ring-1 ring-inset ring-fuchsia-300/15 backdrop-blur-xl lg:col-span-5"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-fuchsia-500 shadow-[0_0_12px_rgba(232,121,249,0.55)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-400/15 blur-3xl"
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-200 ring-1 ring-fuchsia-300/40 shadow-lg shadow-fuchsia-500/20">
              <Lightbulb className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
                Insight CPO
              </p>
              <h3 className="mt-0.5 text-base font-semibold text-slate-50">
                Tesis financiera del piloto
              </h3>
            </div>
          </div>

          <p className="mt-5 text-base leading-relaxed text-slate-100">
            La estrategia financiera exige{" "}
            <span className="font-semibold text-fuchsia-200">
              subsidiar a las familias
            </span>{" "}
            con el recaudo de las parejas y adultos, manteniendo la{" "}
            <span className="font-semibold text-emerald-300">
              equidad material
            </span>{" "}
            del Art. 13.
          </p>

          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5">
            <Scale
              className="h-4 w-4 flex-shrink-0 text-fuchsia-200"
              aria-hidden
            />
            <p className="text-[11px] leading-relaxed text-slate-300">
              <span className="font-semibold text-slate-100">
                Subsidio cruzado:
              </span>{" "}
              Cat. A/B financian acceso preferente para Cat. C y No Afiliados.
            </p>
          </div>
        </div>
      </motion.aside>
    </section>
  );
}
