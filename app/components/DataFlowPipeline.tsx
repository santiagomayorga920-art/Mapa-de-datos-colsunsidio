"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Building2,
  Cloud,
  Cpu,
  Database,
  Gauge,
  QrCode,
  Radio,
  ShieldCheck,
  Smartphone,
  UsersRound,
  Warehouse,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type NodeId =
  | "ingestaApp"
  | "ingestaGate"
  | "gateway"
  | "identityBroker"
  | "crm"
  | "coreDb"
  | "eventBus"
  | "fastpassEngine"
  | "heatmapEngine"
  | "salidaQr"
  | "nlp"
  | "dataLake"
  | "dataWarehouse";

type NodeDef = {
  id: NodeId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
  payload: Record<string, string | number | boolean>;
  xPct: number;
  yPct: number;
  widthPct: number;
};

type Edge = {
  from: NodeId;
  to: NodeId;
  color: string;
  delay: number;
  dashed?: boolean;
};

type Lane = {
  label: string;
  step: string;
  xPct: number;
  widthPct: number;
  tint: string;
  border: string;
  dotColor: string;
};

const LANES: Lane[] = [
  {
    step: "Capa 1",
    label: "Ingesta",
    xPct: 0,
    widthPct: 10,
    tint: "bg-sky-500/[0.05]",
    border: "border-sky-400/15",
    dotColor: "bg-sky-400",
  },
  {
    step: "Capa 2",
    label: "Enrutamiento",
    xPct: 10,
    widthPct: 10,
    tint: "bg-slate-500/[0.05]",
    border: "border-slate-400/15",
    dotColor: "bg-slate-300",
  },
  {
    step: "Capa 2",
    label: "Seguridad",
    xPct: 20,
    widthPct: 10,
    tint: "bg-violet-500/[0.05]",
    border: "border-violet-400/15",
    dotColor: "bg-violet-400",
  },
  {
    step: "Capa 2",
    label: "Validación",
    xPct: 30,
    widthPct: 10,
    tint: "bg-emerald-500/[0.05]",
    border: "border-emerald-400/15",
    dotColor: "bg-emerald-400",
  },
  {
    step: "Capa 3",
    label: "Event Bus · Kafka",
    xPct: 40,
    widthPct: 10,
    tint: "bg-orange-500/[0.07]",
    border: "border-orange-400/20",
    dotColor: "bg-orange-400",
  },
  {
    step: "Capa 4",
    label: "Operaciones",
    xPct: 50,
    widthPct: 18,
    tint: "bg-indigo-500/[0.05]",
    border: "border-indigo-400/15",
    dotColor: "bg-indigo-400",
  },
  {
    step: "Capa 5",
    label: "IA paralela · Redis",
    xPct: 68,
    widthPct: 11,
    tint: "bg-purple-500/[0.05]",
    border: "border-purple-400/15",
    dotColor: "bg-purple-400",
  },
  {
    step: "Capa 6",
    label: "Data Lake · S3",
    xPct: 79,
    widthPct: 10,
    tint: "bg-cyan-500/[0.05]",
    border: "border-cyan-400/15",
    dotColor: "bg-cyan-400",
  },
  {
    step: "Capa 7",
    label: "Data Warehouse · Gerencia",
    xPct: 89,
    widthPct: 11,
    tint: "bg-blue-500/[0.05]",
    border: "border-blue-400/15",
    dotColor: "bg-blue-400",
  },
];

const NODES: NodeDef[] = [
  {
    id: "ingestaApp",
    title: "Ingesta · App",
    subtitle: "Registro móvil",
    icon: Smartphone,
    accent: "border-sky-400/30",
    iconBg: "bg-sky-500/15 text-sky-300 ring-sky-400/30",
    payload: {
      topic: "ingress.app",
      user_id: "user_123",
      src: "app",
    },
    xPct: 1,
    yPct: 10,
    widthPct: 8,
  },
  {
    id: "ingestaGate",
    title: "Ingesta · Taquilla",
    subtitle: "Lectura de carné",
    icon: Building2,
    accent: "border-emerald-400/30",
    iconBg: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
    payload: {
      topic: "ingress.gate",
      user_id: "user_456",
      src: "gate",
    },
    xPct: 1,
    yPct: 66,
    widthPct: 8,
  },
  {
    id: "gateway",
    title: "API Gateway",
    subtitle: "Enrutador seguro",
    icon: Waypoints,
    accent: "border-slate-400/30",
    iconBg: "bg-slate-500/15 text-slate-200 ring-slate-400/30",
    payload: {
      route: "identity_broker",
      tls: "mTLS",
    },
    xPct: 11,
    yPct: 37,
    widthPct: 8,
  },
  {
    id: "identityBroker",
    title: "Identity Broker",
    subtitle: "Verificación de identidad",
    icon: ShieldCheck,
    accent: "border-violet-400/40",
    iconBg: "bg-violet-500/15 text-violet-300 ring-violet-400/30",
    payload: {
      verify: "jwt + carne",
      branch: "affiliate | guest",
      ttl_s: 900,
    },
    xPct: 21,
    yPct: 37,
    widthPct: 8,
  },
  {
    id: "crm",
    title: "CRM Comfenalco",
    subtitle: "Master de afiliados",
    icon: UsersRound,
    accent: "border-teal-400/30",
    iconBg: "bg-teal-500/15 text-teal-300 ring-teal-400/30",
    payload: {
      source: "CRM_Master",
      category: "A | B | C",
    },
    xPct: 31,
    yPct: 10,
    widthPct: 8,
  },
  {
    id: "coreDb",
    title: "BD Core · Postgres",
    subtitle: "Registro no afiliados",
    icon: Database,
    accent: "border-cyan-400/30",
    iconBg: "bg-cyan-500/15 text-cyan-300 ring-cyan-400/30",
    payload: {
      db: "postgres",
      action: "upsert_guest",
    },
    xPct: 31,
    yPct: 66,
    widthPct: 8,
  },
  {
    id: "eventBus",
    title: "Event Bus · Kafka",
    subtitle: "Sistema nervioso de eventos",
    icon: Radio,
    accent: "border-orange-400/40",
    iconBg: "bg-orange-500/15 text-orange-300 ring-orange-400/30",
    payload: {
      broker: "kafka",
      topic: "user.validated",
      partitions: 12,
    },
    xPct: 41,
    yPct: 37,
    widthPct: 8,
  },
  {
    id: "fastpassEngine",
    title: "Motor FastPass",
    subtitle: "Emisión y cooldown",
    icon: Cpu,
    accent: "border-indigo-400/30",
    iconBg: "bg-indigo-500/15 text-indigo-300 ring-indigo-400/30",
    payload: {
      topic: "fastpass.issue",
      cooldown_m: 45,
    },
    xPct: 51,
    yPct: 10,
    widthPct: 8,
  },
  {
    id: "heatmapEngine",
    title: "Motor de Aforo",
    subtitle: "Redis · heatmap en vivo",
    icon: Gauge,
    accent: "border-fuchsia-400/30",
    iconBg: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-400/30",
    payload: {
      topic: "capacity.update",
      cache: "redis",
      delta: 1,
    },
    xPct: 51,
    yPct: 66,
    widthPct: 8,
  },
  {
    id: "salidaQr",
    title: "Salida · QR",
    subtitle: "Token firmado",
    icon: QrCode,
    accent: "border-amber-400/30",
    iconBg: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
    payload: {
      status: "approved",
      token: "QR_89X",
      cooldown: "45m",
    },
    xPct: 60,
    yPct: 10,
    widthPct: 7,
  },
  {
    id: "nlp",
    title: "Motor NLP",
    subtitle: "API Chatbot (read-only)",
    icon: Bot,
    accent: "border-purple-400/30",
    iconBg: "bg-purple-500/15 text-purple-300 ring-purple-400/30",
    payload: {
      model: "LLM_v4",
      intent: "wait_time",
      reads_from: "redis",
    },
    xPct: 69,
    yPct: 50,
    widthPct: 9,
  },
  {
    id: "dataLake",
    title: "Data Lake · S3",
    subtitle: "Eventos crudos · cold",
    icon: Cloud,
    accent: "border-cyan-400/30",
    iconBg: "bg-cyan-500/15 text-cyan-300 ring-cyan-400/30",
    payload: {
      bucket: "s3://piscilago",
      type: "raw_events",
      retention_d: 365,
    },
    xPct: 80,
    yPct: 37,
    widthPct: 8,
  },
  {
    id: "dataWarehouse",
    title: "Data Warehouse",
    subtitle: "Gerencia · BI",
    icon: Warehouse,
    accent: "border-blue-400/30",
    iconBg: "bg-blue-500/15 text-blue-300 ring-blue-400/30",
    payload: {
      engine: "snowflake",
      ready_for: "dashboard",
      refresh_m: 15,
    },
    xPct: 90,
    yPct: 37,
    widthPct: 9,
  },
];

const EDGES: Edge[] = [
  { from: "ingestaApp", to: "gateway", color: "#38bdf8", delay: 0 },
  { from: "ingestaGate", to: "gateway", color: "#34d399", delay: 0.4 },
  { from: "gateway", to: "identityBroker", color: "#cbd5e1", delay: 0.8 },
  { from: "identityBroker", to: "crm", color: "#2dd4bf", delay: 1.2 },
  { from: "identityBroker", to: "coreDb", color: "#22d3ee", delay: 1.6 },
  { from: "identityBroker", to: "eventBus", color: "#fb923c", delay: 2.0 },
  { from: "eventBus", to: "fastpassEngine", color: "#818cf8", delay: 2.4 },
  { from: "eventBus", to: "heatmapEngine", color: "#e879f9", delay: 2.8 },
  { from: "eventBus", to: "dataLake", color: "#22d3ee", delay: 3.2 },
  { from: "fastpassEngine", to: "salidaQr", color: "#fbbf24", delay: 3.6 },
  {
    from: "heatmapEngine",
    to: "nlp",
    color: "#c084fc",
    delay: 4.0,
    dashed: true,
  },
  { from: "dataLake", to: "dataWarehouse", color: "#60a5fa", delay: 4.4 },
];

function nodeAnchor(id: NodeId, side: "right" | "left"): { x: number; y: number } {
  const node = NODES.find((n) => n.id === id);
  if (!node) return { x: 0, y: 0 };
  const y = node.yPct + 13;
  const x = side === "right" ? node.xPct + node.widthPct : node.xPct;
  return { x, y };
}

function formatValue(value: string | number | boolean): React.ReactElement {
  if (typeof value === "number") {
    return <span className="text-amber-300">{value}</span>;
  }
  if (typeof value === "boolean") {
    return <span className="text-fuchsia-300">{String(value)}</span>;
  }
  return <span className="text-emerald-300">&quot;{value}&quot;</span>;
}

function PayloadCode({
  payload,
}: {
  payload: Record<string, string | number | boolean>;
}) {
  return (
    <pre className="mt-3 overflow-hidden rounded-lg border border-white/5 bg-black/50 px-3 py-2 font-mono text-[10px] leading-5 text-slate-100 shadow-inner shadow-black/40">
      <span className="text-slate-500">{"{"}</span>
      {Object.entries(payload).map(([key, value], i, arr) => (
        <span key={key} className="block pl-3">
          <span className="text-cyan-300">&quot;{key}&quot;</span>
          <span className="text-slate-500">: </span>
          {formatValue(value)}
          {i < arr.length - 1 && <span className="text-slate-500">,</span>}
        </span>
      ))}
      <span className="text-slate-500">{"}"}</span>
    </pre>
  );
}

type NodeStyle = "default" | "identity" | "bus";

function Node({
  node,
  style = "default",
}: {
  node: NodeDef;
  style?: NodeStyle;
}) {
  const Icon = node.icon;
  const isGlowing = style !== "default";
  const glowColor = style === "bus" ? "bg-orange-400/40" : "bg-violet-400/35";
  const dotColor = style === "bus" ? "bg-orange-400" : "bg-violet-400";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isGlowing ? 0.2 : 0.05 }}
      className="absolute"
      style={{
        left: `${node.xPct}%`,
        top: `${node.yPct}%`,
        width: `${node.widthPct}%`,
      }}
    >
      <div
        className={`relative rounded-2xl border bg-slate-900/60 p-4 shadow-xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-md ${node.accent}`}
      >
        {isGlowing && (
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute -inset-1 rounded-2xl blur-xl ${glowColor}`}
            animate={{ opacity: [0.25, 0.7, 0.25], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="relative">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${node.iconBg}`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                {node.subtitle}
              </p>
              <h3 className="truncate text-sm font-semibold text-slate-50">
                {node.title}
              </h3>
            </div>
            {isGlowing && (
              <motion.span
                className={`ml-auto inline-flex h-2 w-2 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <PayloadCode payload={node.payload} />
        </div>
      </div>
    </motion.div>
  );
}

function edgePath(fromId: NodeId, toId: NodeId): string {
  const start = nodeAnchor(fromId, "right");
  const end = nodeAnchor(toId, "left");
  const midX = (start.x + end.x) / 2;
  return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
}

function EdgePulse({ edge }: { edge: Edge }) {
  const path = edgePath(edge.from, edge.to);
  const duration = edge.dashed ? 3.4 : 2.8;
  return (
    <>
      <motion.circle
        r={1.3}
        fill={edge.color}
        filter={`drop-shadow(0 0 1.6px ${edge.color})`}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{
          offsetDistance: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: edge.delay,
          times: [0, 0.1, 0.9, 1],
        }}
        style={{
          offsetPath: `path("${path}")`,
          offsetRotate: "0deg",
        }}
      />
      <motion.circle
        r={0.8}
        fill={edge.color}
        opacity={edge.dashed ? 0.45 : 0.65}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: edge.delay + 0.25,
        }}
        style={{
          offsetPath: `path("${path}")`,
        }}
      />
    </>
  );
}

function LaneColumn({ lane }: { lane: Lane }) {
  return (
    <div
      className={`absolute inset-y-0 border-l ${lane.border} ${lane.tint}`}
      style={{ left: `${lane.xPct}%`, width: `${lane.widthPct}%` }}
    >
      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[10px] font-medium text-slate-300 shadow-lg shadow-black/40 backdrop-blur">
        <span
          className={`h-1.5 w-1.5 rounded-full ${lane.dotColor} shadow-[0_0_6px_currentColor]`}
        />
        <span className="font-mono tracking-widest text-slate-500">
          {lane.step}
        </span>
        <span className="text-slate-600">·</span>
        <span className="whitespace-nowrap font-semibold text-slate-100">
          {lane.label}
        </span>
      </div>
    </div>
  );
}

function nodeStyleFor(id: NodeId): NodeStyle {
  if (id === "identityBroker") return "identity";
  if (id === "eventBus") return "bus";
  return "default";
}

export function DataFlowPipeline() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-300">
          Pipeline E2E · arquitectura empresarial
        </p>
        <h1 className="mt-1 text-xl font-semibold text-slate-50">
          Ingesta → Kafka → Motores · IA paralela · Data Lake → Warehouse
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          El bus Kafka emite copia cruda al Data Lake (S3). El chatbot (NLP) lee
          estado del Motor de Aforo (Redis) sólo en lectura. El Data Warehouse
          entrega datos limpios a Gerencia.
        </p>
      </header>

      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <div className="relative aspect-[24/7] min-w-[2400px] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/70 via-slate-900/40 to-indigo-950/60 shadow-inner shadow-black/40 ring-1 ring-inset ring-white/5">
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            {LANES.map((lane) => (
              <LaneColumn key={lane.label} lane={lane} />
            ))}
          </div>

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              {EDGES.map((e) => (
                <linearGradient
                  key={`grad-${e.from}-${e.to}`}
                  id={`grad-${e.from}-${e.to}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={e.color} stopOpacity={0.2} />
                  <stop
                    offset="50%"
                    stopColor={e.color}
                    stopOpacity={e.dashed ? 0.55 : 0.85}
                  />
                  <stop offset="100%" stopColor={e.color} stopOpacity={0.2} />
                </linearGradient>
              ))}
            </defs>

            {EDGES.map((e) => (
              <path
                key={`line-${e.from}-${e.to}`}
                d={edgePath(e.from, e.to)}
                stroke={`url(#grad-${e.from}-${e.to})`}
                strokeWidth={e.dashed ? 0.4 : 0.55}
                strokeDasharray={e.dashed ? "0.8 1.6" : "1.2 0.8"}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {EDGES.map((e) => (
              <EdgePulse key={`pulse-${e.from}-${e.to}`} edge={e} />
            ))}
          </svg>

          {NODES.map((node) => (
            <Node key={node.id} node={node} style={nodeStyleFor(node.id)} />
          ))}
        </div>
      </div>

      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> App
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Taquilla
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" /> Gateway
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Identity
          Broker
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> CRM
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> BD Core
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Kafka
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> FastPass
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Aforo
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> QR
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-4 border-t border-dashed border-purple-400" />
          NLP (Redis, read-only)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Data Lake S3
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Warehouse
        </span>
      </footer>
    </div>
  );
}
