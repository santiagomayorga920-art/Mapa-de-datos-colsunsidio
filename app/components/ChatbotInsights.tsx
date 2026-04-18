"use client";

import { motion } from "framer-motion";
import {
  Bot,
  HelpCircle,
  MapPin,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Intent = {
  rank: number;
  label: string;
  volume: number;
  share: number;
  tone: "indigo" | "amber" | "emerald";
  icon: LucideIcon;
  summary: string;
};

const INTENTS: Intent[] = [
  {
    rank: 1,
    label: "Tiempos de Espera",
    volume: 342,
    share: 78,
    tone: "indigo",
    icon: HelpCircle,
    summary: "Consultas sobre filas en atracciones",
  },
  {
    rank: 2,
    label: "Restaurante El Rancho",
    volume: 218,
    share: 54,
    tone: "amber",
    icon: UtensilsCrossed,
    summary: "Menú, reservas y disponibilidad",
  },
  {
    rank: 3,
    label: "Lost & Found",
    volume: 96,
    share: 32,
    tone: "emerald",
    icon: MapPin,
    summary: "Objetos perdidos en el parque",
  },
];

const TONES: Record<Intent["tone"], { bar: string; dot: string; chip: string }> = {
  indigo: {
    bar: "from-indigo-400 to-indigo-600",
    dot: "bg-indigo-400",
    chip: "bg-indigo-500/10 text-indigo-300 ring-indigo-400/25",
  },
  amber: {
    bar: "from-amber-400 to-amber-600",
    dot: "bg-amber-400",
    chip: "bg-amber-500/10 text-amber-300 ring-amber-400/25",
  },
  emerald: {
    bar: "from-emerald-400 to-emerald-600",
    dot: "bg-emerald-400",
    chip: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/25",
  },
};

export function ChatbotInsights() {
  const totalVolume = INTENTS.reduce((acc, i) => acc + i.volume, 0);

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
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-400/25">
            <Bot className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              La Voz del Cliente
            </p>
            <h3 className="mt-0.5 text-sm font-semibold text-slate-50">
              Temas Populares en Chatbot (NLP)
            </h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-300 ring-1 ring-fuchsia-400/25">
          <Sparkles className="h-3 w-3" aria-hidden />
          Live IA
        </span>
      </header>

      <ul className="mt-5 flex flex-1 flex-col gap-3">
        {INTENTS.map((intent, idx) => {
          const tone = TONES[intent.tone];
          const Icon = intent.icon;
          return (
            <motion.li
              key={intent.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.25 + idx * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur transition hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-[11px] font-semibold tabular-nums text-slate-300 ring-1 ring-white/10">
                    {intent.rank}
                  </span>
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-slate-100">
                        {intent.label}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {intent.summary}
                      </p>
                    </div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${tone.chip}`}
                >
                  {intent.volume} msgs
                </span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${intent.share}%` }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4 + idx * 0.1,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
                />
              </div>
            </motion.li>
          );
        })}
      </ul>

      <footer className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
        <span>Total consultas IA hoy</span>
        <span className="font-semibold tabular-nums text-slate-100">
          {totalVolume.toLocaleString("es-CO")}
        </span>
      </footer>
    </motion.article>
  );
}
