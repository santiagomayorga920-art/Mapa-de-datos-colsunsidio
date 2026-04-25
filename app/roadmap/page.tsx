"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarRange,
  CircleDollarSign,
  Map,
  ShieldCheck,
  Waves,
} from "lucide-react";

type Contingencia = {
  riesgo: string;
  mitigacion: string;
};

type Phase = {
  id: number;
  shortLabel: string;
  title: string;
  subtitle: string;
  cronograma: {
    duracion: string;
    rango: string;
    detalle: string;
  };
  presupuesto: {
    monto: number;
    desglose: string;
  };
  entidades: string[];
  contingencias: Contingencia[];
};

const PHASES: Phase[] = [
  {
    id: 1,
    shortLabel: "Marco Legal",
    title: "Marco Legal & Cumplimiento",
    subtitle:
      "Habeas Data, biometría, convenios con bancos y aprobaciones regulatorias.",
    cronograma: {
      duracion: "3 meses",
      rango: "M1 – M3",
      detalle: "Trámites con SIC, MinTIC y firma de contratos marco.",
    },
    presupuesto: {
      monto: 145_000_000,
      desglose: "Honorarios legales, auditoría externa y tasas administrativas.",
    },
    entidades: [
      "Superintendencia de Industria y Comercio (SIC)",
      "MinTIC",
      "Comfenalco · Dirección Jurídica",
      "Proveedor de Identidad (IDP)",
    ],
    contingencias: [
      {
        riesgo: "Bloqueo SIC por uso de biometría facial sin consentimiento.",
        mitigacion:
          "Consentimiento explícito por capas, opt-out físico en taquilla y DPIA documentado.",
      },
      {
        riesgo: "Demoras en convenios con bancos (PSE / pasarela).",
        mitigacion:
          "Pasarela secundaria (Wompi) como fallback contractualizado antes del M2.",
      },
    ],
  },
  {
    id: 2,
    shortLabel: "Infraestructura",
    title: "Infraestructura Física & Conectividad",
    subtitle:
      "Sensores IoT, lectores QR, red mallada y energía PoE+ en todo el parque.",
    cronograma: {
      duracion: "4 meses",
      rango: "M2 – M5",
      detalle: "Instalación por zonas con cuadrillas duplicadas en ventana seca.",
    },
    presupuesto: {
      monto: 820_000_000,
      desglose:
        "Hardware IoT, switches Meraki, obra civil y certificación eléctrica.",
    },
    entidades: [
      "Comfenalco · Operaciones",
      "Proveedor LoRaWAN regional",
      "Cisco Meraki (red)",
      "Constructora autorizada",
    ],
    contingencias: [
      {
        riesgo: "Lluvias retrasan cableado exterior 4 a 6 semanas.",
        mitigacion:
          "Plan híbrido: trabajos internos primero + cuadrillas dobles en ventana seca verificada.",
      },
      {
        riesgo: "Daño a tubería hidráulica al instalar sensores subterráneos.",
        mitigacion:
          "Levantamiento BIM previo y supervisor hídrico permanente en sitio.",
      },
    ],
  },
  {
    id: 3,
    shortLabel: "Plataforma",
    title: "Plataforma de Datos & Servicios",
    subtitle:
      "API Gateway, CRM unificado, Kafka, base operacional y data lake en S3.",
    cronograma: {
      duracion: "5 meses",
      rango: "M3 – M7",
      detalle: "Migración por dominios, doble corrida del CRM legacy 90 días.",
    },
    presupuesto: {
      monto: 540_000_000,
      desglose: "Licencias CRM, créditos AWS, vendors y equipo data engineering.",
    },
    entidades: [
      "Comfenalco · Tecnología",
      "AWS Solutions Architect",
      "Vendor CRM",
      "Equipo Data Engineering interno",
    ],
    contingencias: [
      {
        riesgo:
          "Migración del CRM legacy (cliente disperso) supera 8 semanas planificadas.",
        mitigacion:
          "Doble corrida controlada de 90 días con mapping incremental por dominio.",
      },
      {
        riesgo: "Costos AWS sobrepasan presupuesto en horas pico.",
        mitigacion:
          "Reservas + Savings Plans + alertas presupuestales a 70 %, 85 % y 95 %.",
      },
    ],
  },
  {
    id: 4,
    shortLabel: "IA & Optimización",
    title: "Inteligencia Artificial & Optimización",
    subtitle:
      "Motor de aforo, NLP, modelos predictivos y recomendaciones personalizadas.",
    cronograma: {
      duracion: "4 meses",
      rango: "M5 – M8",
      detalle: "Modelos base preentrenados, curaduría manual el primer trimestre.",
    },
    presupuesto: {
      monto: 380_000_000,
      desglose:
        "Cómputo GPU, consultoría analítica y plataforma MLOps gobernada.",
    },
    entidades: [
      "Equipo ML interno",
      "Consultora analítica externa",
      "Comfenalco · Marketing",
      "Comité de Gobernanza IA",
    ],
    contingencias: [
      {
        riesgo:
          "Datos insuficientes para entrenar modelos robustos en el primer ciclo.",
        mitigacion:
          "Modelos base preentrenados + curaduría manual y data augmentation.",
      },
      {
        riesgo: "Hallucinations del NLP al interactuar con usuarios reales.",
        mitigacion:
          "Guardrails, fallback a operador humano si la confianza cae bajo 75 %.",
      },
    ],
  },
  {
    id: 5,
    shortLabel: "Go-live",
    title: "Operación & Escalamiento",
    subtitle:
      "Go-live, soporte 24/7, KPIs gerenciales y retroalimentación continua.",
    cronograma: {
      duracion: "Continuo",
      rango: "M8 – M12+",
      detalle: "Drills mensuales, ciclos quincenales de mejoras y reportes.",
    },
    presupuesto: {
      monto: 210_000_000,
      desglose: "Mesa de servicio, soporte multinivel y auditoría externa anual.",
    },
    entidades: [
      "Comfenalco · Operaciones",
      "Mesa de servicio 24/7",
      "Comité Directivo",
      "Auditoría externa",
    ],
    contingencias: [
      {
        riesgo:
          "Adopción baja por parte de afiliados Cat C y visitantes No Afiliados.",
        mitigacion:
          "Campaña educativa, kioskos asistidos e incentivos durante el primer mes.",
      },
      {
        riesgo: "Caída crítica de la plataforma en temporada alta.",
        mitigacion:
          "Failover multi-AZ, drills mensuales y plan de comunicación al usuario.",
      },
    ],
  },
];

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
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

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const phase = PHASES.find((p) => p.id === activePhase) ?? PHASES[0];
  const totalPhases = PHASES.length;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-500/15 blur-[110px]" />
      </div>

      <header className="relative border-b border-white/10 bg-white/[0.03] shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
              <Waves className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                Comfenalco · Piscilago
              </p>
              <h1 className="flex items-center gap-2 text-base font-semibold text-slate-50">
                <Map className="h-4 w-4 text-indigo-300" aria-hidden />
                Roadmap de Implementación
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-200 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Panel gerencial
            </Link>
          </div>
        </div>
      </header>

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
                    Fase {phase.id} de {totalPhases} · {phase.shortLabel}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl">
                    {phase.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm text-slate-400 md:text-base">
                    {phase.subtitle}
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
                  <p className="mt-4 text-3xl font-semibold tabular-nums text-slate-50">
                    {phase.cronograma.duracion}
                  </p>
                  <p className="mt-1 text-sm font-medium text-indigo-300">
                    {phase.cronograma.rango}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    {phase.cronograma.detalle}
                  </p>
                </motion.article>

                <motion.article
                  variants={cardItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl xl:col-span-4"
                >
                  <header className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25">
                      <CircleDollarSign className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                      Presupuesto (COP)
                    </p>
                  </header>
                  <p className="mt-4 text-3xl font-semibold tabular-nums text-slate-50">
                    {formatCOP(phase.presupuesto.monto)}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    {phase.presupuesto.desglose}
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
                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-300" aria-hidden />
                        <span>{entidad}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>

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
                      {phase.contingencias.length} riesgos
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
    </div>
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
                        transition={{ type: "spring", stiffness: 280, damping: 28 }}
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
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
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
