"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  CalendarRange,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  ShieldCheck,
  Target,
} from "lucide-react";

type Contingencia = {
  riesgo: string;
  mitigacion: string;
};

type Phase = {
  id: number;
  shortLabel: string;
  title: string;
  cronograma: {
    mesInicio: number;
    mesFin: number;
    duracion: number;
    textoOverlap: string;
  };
  presupuesto: number | string;
  budgetPercentage: number;
  justificacionPresupuesto: string;
  entidades: string[];
  contingencias: Contingencia[];
  hitos: string[];
  entregables: string[];
  kpi: string;
};

const PHASES: Phase[] = [
  {
    id: 1,
    shortLabel: "Aval Legal",
    title: "Aval Legal",
    cronograma: {
      mesInicio: 1,
      mesFin: 12,
      duracion: 12,
      textoOverlap: "Ejecución lineal inicial.",
    },
    presupuesto: 35_000_000,
    budgetPercentage: 9,
    justificacionPresupuesto:
      "Auditoría externa de protección de datos (Habeas Data) y consultoría legal especializada. El trámite base lo asume el equipo jurídico interno.",
    entidades: ["SSF", "SIC", "Sindicato"],
    contingencias: [
      {
        riesgo: "Riesgo de bloqueo por percepción de inequidad.",
        mitigacion:
          "Piloto de bienestar y auditoría de protección de datos (Ley 1581).",
      },
    ],
    hitos: [
      "Radicación ante SSF",
      "Auditoría de Habeas Data",
      "Alineación sindical",
    ],
    entregables: ["Resolución de aprobación SSF", "Concepto favorable SIC"],
    kpi: "Aprobación legal sin restricciones",
  },
  {
    id: 2,
    shortLabel: "Dev & Arquitectura",
    title: "Dev & Arquitectura",
    cronograma: {
      mesInicio: 6,
      mesFin: 16,
      duracion: 11,
      textoOverlap: "Inicia en el mes 6. Trabajo en paralelo con F1 y F3.",
    },
    presupuesto: 180_000_000,
    budgetPercentage: 46,
    justificacionPresupuesto:
      "Licencias empresariales, infraestructura Cloud (AWS/GCP) y Arquitecto Cloud temporal. El desarrollo se hará con equipo in-house.",
    entidades: ["TI", "Proveedores Cloud"],
    contingencias: [
      {
        riesgo: "Colapso del CRM legacy.",
        mitigacion: "Migración a caché distribuida paralela (Redis / Kafka).",
      },
    ],
    hitos: [
      "Setup infraestructura Cloud",
      "Integración API CRM Comfenalco",
      "Desarrollo Motor NLP y App",
    ],
    entregables: ["Repositorio v1.0", "Clúster Kafka operativo"],
    kpi: "Carga de 5,000 req/sec sin caídas",
  },
  {
    id: 3,
    shortLabel: "Despliegue Parque",
    title: "Despliegue Parque",
    cronograma: {
      mesInicio: 12,
      mesFin: 18,
      duracion: 7,
      textoOverlap: "Inicia al finalizar la Fase 1. Paralelo con Dev.",
    },
    presupuesto: 150_000_000,
    budgetPercentage: 38,
    justificacionPresupuesto:
      "Adquisición de 40 PDAs industriales IP67 y cableado de extensores Wi-Fi Mesh para zonas de atracciones sin cobertura 4G.",
    entidades: ["Operaciones", "Infraestructura"],
    contingencias: [
      {
        riesgo: "Hardware dañado por humedad o sol.",
        mitigacion: "PDA industriales IP67 con encapsulado certificado.",
      },
      {
        riesgo: "Cero señal 4G en zonas internas del parque.",
        mitigacion:
          "Despliegue de fibra óptica local con redundancia perimetral.",
      },
    ],
    hitos: [
      "Instalación de fibra óptica",
      "Despliegue de escáneres en parque",
      "Pruebas de latencia",
    ],
    entregables: ["Red Mesh local", "50 PDA IP67 configuradas"],
    kpi: "Latencia de red < 50ms en atracciones",
  },
  {
    id: 4,
    shortLabel: "Marcha Blanca",
    title: "Marcha Blanca",
    cronograma: {
      mesInicio: 18,
      mesFin: 21,
      duracion: 4,
      textoOverlap: "Fase de pruebas tras finalizar despliegue físico.",
    },
    presupuesto: 25_000_000,
    budgetPercentage: 7,
    justificacionPresupuesto:
      "Instalación de 2 Kioscos de auto-servicio físicos y material POP para la capacitación operativa.",
    entidades: ["Staff Piscilago", "Marketing"],
    contingencias: [
      {
        riesgo: "Fricción social en filas durante la adopción.",
        mitigacion:
          "Kioscos de auto-servicio y capacitación en resolución de conflictos.",
      },
    ],
    hitos: [
      "Pruebas Alpha con empleados",
      "Instalación de Kioscos SOS",
      "Capacitación a operarios",
    ],
    entregables: ["Manual de contingencias", "Campaña de expectativa"],
    kpi: "100% del staff certificado en el uso",
  },
  {
    id: 5,
    shortLabel: "Go-Live",
    title: "Go-Live",
    cronograma: {
      mesInicio: 22,
      mesFin: 24,
      duracion: 3,
      textoOverlap: "Operación continua tras el mes 22.",
    },
    presupuesto: "$ 12.000.000 / mes",
    budgetPercentage: 0,
    justificacionPresupuesto:
      "OPEX continuo: Consumo real de servidores escalables, bases de datos en la nube y llamadas a la API de inteligencia artificial (NLP).",
    entidades: ["Gerencia", "Soporte"],
    contingencias: [
      {
        riesgo: "Demandas judiciales (tutelas) por acceso desigual.",
        mitigacion:
          "Motor de reglas programado con 30 % del aforo reservado a fila física.",
      },
    ],
    hitos: [
      "Lanzamiento al público",
      "Monitoreo de aforo en vivo",
      "Soporte N1/N2",
    ],
    entregables: ["Dashboards Gerenciales activos", "Data Lake alimentándose"],
    kpi: "SLA de disponibilidad del 99.9%",
  },
];

function formatCOP(value: number): string {
  return `$ ${value.toLocaleString("es-CO")}`;
}

const TOTAL_MONTHS = 24;

function rangoLabel(mesInicio: number, mesFin: number): string {
  return `Meses ${mesInicio} – ${mesFin}`;
}

const detailVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function RoadmapHome() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const phase = PHASES.find((p) => p.id === activePhase) ?? PHASES[0];
  const totalPhases = PHASES.length;

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <PhaseTimeline
          phases={PHASES}
          activePhase={activePhase}
          onSelect={setActivePhase}
        />

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.section
              key={phase.id}
              variants={detailVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-indigo-300">
                    Fase {phase.id} de {totalPhases}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl">
                    {phase.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium text-slate-300">
                    {rangoLabel(
                      phase.cronograma.mesInicio,
                      phase.cronograma.mesFin,
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-slate-300 ring-1 ring-inset ring-white/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                  Plan vigente
                </div>
              </div>

              <motion.div
                variants={cardStagger}
                initial="hidden"
                animate="visible"
                className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12"
              >
                <motion.article
                  variants={cardItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl xl:col-span-4"
                >
                  <header className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/25">
                      <CalendarRange className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                      Cronograma (Meses)
                    </p>
                  </header>
                  <p className="mt-4 flex items-baseline gap-1 text-3xl font-semibold tabular-nums text-slate-50">
                    {phase.cronograma.duracion}
                    <span className="text-base font-medium text-slate-400">
                      meses
                    </span>
                  </p>
                  <p className="mt-1 text-sm font-medium text-indigo-300">
                    {"Mes " +
                      phase.cronograma.mesInicio +
                      " al " +
                      phase.cronograma.mesFin}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-blue-400">
                    {phase.cronograma.textoOverlap}
                  </p>
                  <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      key={`gantt-${phase.id}`}
                      initial={{ opacity: 0, scaleX: 0.6 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      className="absolute h-full origin-left rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.55)]"
                      style={{
                        left: `${((phase.cronograma.mesInicio - 1) / TOTAL_MONTHS) * 100}%`,
                        width: `${(phase.cronograma.duracion / TOTAL_MONTHS) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] font-mono tabular-nums text-slate-500">
                    <span>0</span>
                    <span>6</span>
                    <span>12</span>
                    <span>18</span>
                    <span>24</span>
                  </div>
                </motion.article>

                <motion.article
                  variants={cardItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl xl:col-span-4"
                >
                  <header className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25">
                        <CircleDollarSign className="h-4 w-4" aria-hidden />
                      </span>
                      <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                        Presupuesto (COP)
                      </p>
                    </div>
                    {phase.budgetPercentage > 0 && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-amber-200 ring-1 ring-amber-400/25">
                        {phase.budgetPercentage}% del CAPEX
                      </span>
                    )}
                  </header>
                  <p className="mt-4 text-3xl font-semibold tabular-nums leading-tight text-slate-50">
                    {typeof phase.presupuesto === "number"
                      ? formatCOP(phase.presupuesto)
                      : phase.presupuesto}
                  </p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      key={`bar-${phase.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.budgetPercentage}%` }}
                      transition={{
                        duration: 0.9,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      className="h-full rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.55)]"
                    />
                  </div>
                  <p className="mt-3 text-sm italic leading-relaxed text-slate-400">
                    {phase.justificacionPresupuesto}
                  </p>
                </motion.article>

                <motion.article
                  variants={cardItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl xl:col-span-4"
                >
                  <header className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/25">
                      <Building2 className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                      Entidades Involucradas
                    </p>
                  </header>
                  <ul className="mt-4 flex flex-col gap-2">
                    {phase.entidades.map((entidad) => (
                      <li
                        key={entidad}
                        className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-200"
                      >
                        <ShieldCheck
                          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-300"
                          aria-hidden
                        />
                        <span>{entidad}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </motion.div>

              <motion.div
                variants={cardStagger}
                initial="hidden"
                animate="visible"
                className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12"
              >
                <motion.article
                  variants={cardItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl xl:col-span-4"
                >
                  <header className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                      Hitos Clave
                    </p>
                  </header>
                  <ul className="mt-4 flex flex-col gap-2">
                    {phase.hitos.map((hito, idx) => (
                      <li
                        key={hito}
                        className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-200"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300"
                          aria-hidden
                        />
                        <span className="flex-1">{hito}</span>
                        <span className="ml-auto rounded-full bg-emerald-500/10 px-1.5 text-[10px] font-semibold tabular-nums text-emerald-300 ring-1 ring-emerald-400/20">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>

                <motion.article
                  variants={cardItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl xl:col-span-4"
                >
                  <header className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/25">
                      <FileText className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                      Entregables Finales
                    </p>
                  </header>
                  <ul className="mt-4 flex flex-col gap-2">
                    {phase.entregables.map((entregable) => (
                      <li
                        key={entregable}
                        className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-200"
                      >
                        <FileText
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-300"
                          aria-hidden
                        />
                        <span>{entregable}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>

                <motion.article
                  variants={cardItem}
                  className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-indigo-300/30 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/10 to-indigo-500/15 p-6 text-center shadow-2xl shadow-indigo-500/20 ring-1 ring-inset ring-indigo-300/20 backdrop-blur-xl xl:col-span-4"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-400/15 blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl"
                  />
                  <div className="relative flex flex-col items-center gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo-200">
                      Métrica de Éxito · KPI
                    </p>
                    <KpiRadial />
                    <p className="text-lg font-semibold leading-snug text-slate-50">
                      {phase.kpi}
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-300/30 bg-indigo-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-100">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
                      Indicador objetivo
                    </span>
                  </div>
                </motion.article>
              </motion.div>

              <motion.div
                variants={cardStagger}
                initial="hidden"
                animate="visible"
                className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12"
              >
                <motion.article
                  variants={cardItem}
                  className="relative overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-rose-500/10 p-5 shadow-2xl shadow-amber-500/10 ring-1 ring-inset ring-amber-300/20 backdrop-blur-xl xl:col-span-12"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl"
                  />
                  <header className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-200 ring-1 ring-amber-300/40 shadow-lg shadow-amber-500/20">
                        <AlertTriangle className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                          Riesgo Crítico
                        </p>
                        <h3 className="mt-0.5 text-lg font-semibold text-slate-50">
                          Contingencias Reales y Mitigación
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-full border border-amber-300/30 bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                      {phase.contingencias.length} riesgo
                      {phase.contingencias.length === 1 ? "" : "s"}
                    </span>
                  </header>

                  <ul className="relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {phase.contingencias.map((c, idx) => (
                      <li
                        key={c.riesgo}
                        className="rounded-xl border border-white/10 bg-slate-950/40 p-4 shadow-inner shadow-black/30 backdrop-blur"
                      >
                        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-amber-200">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-100 ring-1 ring-amber-300/40">
                            {idx + 1}
                          </span>
                          Riesgo
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-slate-100">
                          {c.riesgo}
                        </p>
                        <div className="mt-3 rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-3">
                          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                            <ShieldCheck className="h-3 w-3" aria-hidden />
                            Mitigación
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            {c.mitigacion}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </motion.div>
            </motion.section>
          </AnimatePresence>
        </div>
      </main>
  );
}

type PhaseTimelineProps = {
  phases: Phase[];
  activePhase: number;
  onSelect: (id: number) => void;
};

function PhaseTimeline({ phases, activePhase, onSelect }: PhaseTimelineProps) {
  return (
    <nav
      aria-label="Línea de tiempo del roadmap"
      className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
        Línea de tiempo · Implementación
      </p>

      <ol className="relative mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 right-4 top-[calc(50%+10px)] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
        />
        {phases.map((p) => {
          const isActive = activePhase === p.id;
          const isPast = activePhase > p.id;
          return (
            <li key={p.id} className="relative">
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                aria-pressed={isActive}
                className={`group relative flex w-full flex-col items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "border-indigo-300/40 bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-fuchsia-500/15 shadow-[0_0_30px_-4px_rgba(129,140,248,0.45)] ring-1 ring-inset ring-indigo-300/30"
                    : "border-white/10 bg-white/[0.03] opacity-60 hover:opacity-100 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex w-full items-center gap-3">
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold tabular-nums transition ${
                      isActive
                        ? "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-2 ring-indigo-300/40"
                        : isPast
                          ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30"
                          : "bg-white/[0.05] text-slate-300 ring-1 ring-white/10"
                    }`}
                  >
                    {p.id}
                    {isActive && (
                      <motion.span
                        aria-hidden
                        layoutId="activePhaseHalo"
                        className="absolute -inset-1 rounded-full bg-indigo-400/30 blur-md"
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 28,
                        }}
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[10px] font-medium uppercase tracking-widest ${
                        isActive ? "text-indigo-200" : "text-slate-400"
                      }`}
                    >
                      Fase {p.id}
                    </p>
                    <p
                      className={`truncate text-sm font-semibold ${
                        isActive ? "text-slate-50" : "text-slate-200"
                      }`}
                    >
                      {p.shortLabel}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <motion.span
                    layoutId="activePhaseUnderline"
                    className="block h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 shadow-[0_0_10px_rgba(165,180,252,0.6)]"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function KpiRadial() {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="kpiRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.18)"
          strokeWidth={4}
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#kpiRingGrad)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(165,180,252,0.55))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/25 text-indigo-100 ring-1 ring-indigo-300/40 shadow-lg shadow-indigo-500/30">
          <Target className="h-6 w-6" aria-hidden />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-200">
          100%
        </span>
      </div>
    </div>
  );
}
