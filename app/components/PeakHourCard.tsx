"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles, TrendingUp } from "lucide-react";

const PEAK_HOUR = "1:45 PM";
const CONFIDENCE = 92;
const EXPECTED_LOAD = 4_320;

const TIMELINE = [
  { hora: "11 AM", intensity: 40 },
  { hora: "12 PM", intensity: 58 },
  { hora: "1 PM", intensity: 82 },
  { hora: "2 PM", intensity: 96 },
  { hora: "3 PM", intensity: 74 },
  { hora: "4 PM", intensity: 55 },
];

export function PeakHourCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl"
    >
      <header className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-400/25">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Predicción IA
          </p>
          <h3 className="text-sm font-semibold text-slate-50">
            Hora Pico Proyectada Hoy
          </h3>
        </div>
      </header>

      <div className="mt-5 flex items-baseline gap-2">
        <Clock className="h-5 w-5 text-fuchsia-300" aria-hidden />
        <motion.p
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="text-3xl font-semibold tabular-nums text-slate-50"
        >
          {PEAK_HOUR}
        </motion.p>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Ventana estimada: 1:30 – 2:15 PM
      </p>

      <div className="mt-4 flex h-12 items-end gap-1">
        {TIMELINE.map((slot, idx) => {
          const isPeak = slot.intensity === 96;
          return (
            <motion.div
              key={slot.hora}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${slot.intensity}%`, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.25 + idx * 0.06,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className={`flex-1 rounded-t ${
                isPeak
                  ? "bg-gradient-to-t from-fuchsia-500 to-fuchsia-300"
                  : "bg-gradient-to-t from-fuchsia-500/40 to-fuchsia-400/20"
              }`}
              title={`${slot.hora} · ${slot.intensity}%`}
            />
          );
        })}
      </div>
      <ul className="mt-1 flex justify-between text-[10px] text-slate-500">
        {TIMELINE.map((slot) => (
          <li key={slot.hora} className="tabular-nums">
            {slot.hora}
          </li>
        ))}
      </ul>

      <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
        <div>
          <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400">
            <TrendingUp className="h-3 w-3" aria-hidden />
            Carga esperada
          </dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums text-slate-50">
            {EXPECTED_LOAD.toLocaleString("es-CO")} pers.
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-slate-400">
            Confianza
          </dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums text-fuchsia-300">
            {CONFIDENCE}%
          </dd>
        </div>
      </dl>
    </motion.article>
  );
}
