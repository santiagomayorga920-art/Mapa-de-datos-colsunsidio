"use client";

import { motion } from "framer-motion";
import { CircleDollarSign, Gauge, Ticket, TrendingUp } from "lucide-react";

import { capacityData } from "@/src/lib/mockDb";

type KpiCardsProps = {
  aforoFisico: number;
  aforoApp: number;
  ingresosInApp: number;
};

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardBase =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl";

const TAQUILLA_INGRESO_HOY = 6_700_000;
const FASTPASS_EMITIDOS = 412;
const FASTPASS_TASA_USO = 88;
const PROYECCION_AFORO = 150;

export function KpiCards({ aforoFisico, aforoApp, ingresosInApp }: KpiCardsProps) {
  const aforoActual = aforoFisico + aforoApp;
  const aforoMax = capacityData.aforoTotal;
  const porcentaje = Math.round((aforoActual / aforoMax) * 100);
  const enAlerta = porcentaje >= 90;

  const ingresosTotal = ingresosInApp + TAQUILLA_INGRESO_HOY;
  const pctInApp = Math.round((ingresosInApp / ingresosTotal) * 100);
  const pctTaquilla = 100 - pctInApp;

  return (
    <motion.section
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.article
        variants={itemVariants}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cardBase}
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/25">
              <Gauge className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Aforo global
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
              enAlerta
                ? "bg-rose-500/10 text-rose-300 ring-rose-400/25"
                : "bg-emerald-500/10 text-emerald-300 ring-emerald-400/25"
            }`}
          >
            {enAlerta ? "Crítico" : "Saludable"}
          </span>
        </header>

        <div className="mt-4 flex items-baseline gap-2">
          <p className="text-2xl font-semibold tabular-nums text-slate-50">
            {aforoActual.toLocaleString("es-CO")}
          </p>
          <p className="text-sm text-slate-400">
            / {aforoMax.toLocaleString("es-CO")}
          </p>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className={`h-full rounded-full ${
              enAlerta
                ? "bg-gradient-to-r from-rose-400 to-rose-600"
                : "bg-gradient-to-r from-indigo-400 to-indigo-600"
            }`}
            animate={{ width: `${Math.min(porcentaje, 100)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {porcentaje}% del aforo permitido.
        </p>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-1 flex items-center gap-1 text-[11px] font-medium text-indigo-300"
        >
          <TrendingUp className="h-3 w-3" aria-hidden />
          Proyección próxima hora: +{PROYECCION_AFORO} pers.
        </motion.p>
      </motion.article>

      <motion.article
        variants={itemVariants}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cardBase}
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25">
              <Ticket className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              FastPass
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
            Activo
          </span>
        </header>

        <p className="mt-4 text-2xl font-semibold tabular-nums text-slate-50">
          {FASTPASS_EMITIDOS.toLocaleString("es-CO")}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Reservas activas emitidas hoy.
        </p>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
            animate={{ width: `${FASTPASS_TASA_USO}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Tasa de uso:{" "}
          <span className="font-semibold text-emerald-300">
            {FASTPASS_TASA_USO}%
          </span>
        </p>
      </motion.article>

      <motion.article
        variants={itemVariants}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cardBase}
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25">
              <CircleDollarSign className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Ingreso Total Hoy
            </p>
          </div>
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300 ring-1 ring-amber-400/25">
            +12,4%
          </span>
        </header>

        <p className="mt-4 text-2xl font-semibold tabular-nums text-slate-50">
          {formatCOP(ingresosTotal)}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Bifurcado por canal de compra.
        </p>

        <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
            animate={{ width: `${pctInApp}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="h-full bg-slate-500/70"
            animate={{ width: `${pctTaquilla}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            In-App{" "}
            <span className="font-semibold text-slate-200">{pctInApp}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Taquilla{" "}
            <span className="font-semibold text-slate-200">{pctTaquilla}%</span>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
}
