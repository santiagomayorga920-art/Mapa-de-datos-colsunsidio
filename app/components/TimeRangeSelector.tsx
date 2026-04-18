"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

const OPTIONS = ["Hoy (En Vivo)", "Últimos 7 Días", "Últimos 30 Días"] as const;
type Option = (typeof OPTIONS)[number];

export function TimeRangeSelector() {
  const [selected, setSelected] = useState<Option>("Hoy (En Vivo)");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex items-center gap-1 rounded-lg border border-white/30 bg-white/70 p-1 pl-2.5 shadow-lg shadow-blue-900/5 backdrop-blur-md"
    >
      <CalendarClock className="h-3.5 w-3.5 text-slate-400" aria-hidden />
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSelected(opt)}
          className={`relative rounded-md px-3 py-1 text-[11px] font-medium transition ${
            selected === opt
              ? "text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {selected === opt && (
            <motion.span
              layoutId="timeRangePill"
              className="absolute inset-0 rounded-md bg-indigo-600 shadow-sm"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap">{opt}</span>
          {opt === "Hoy (En Vivo)" && selected === opt && (
            <span className="relative z-10 ml-1.5 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
          )}
        </button>
      ))}
    </motion.div>
  );
}
