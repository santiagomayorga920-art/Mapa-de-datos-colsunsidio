"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Cpu,
  Database,
  Gauge,
  QrCode,
  Radio,
  ShieldCheck,
  Smartphone,
  UsersRound,
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
  | "salidaQr";

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
    widthPct: 14,
    tint: "bg-sky-100/25",
    border: "border-sky-200/40",
    dotColor: "bg-sky-400",
  },
  {
    step: "Capa 2",
    label: "Enrutamiento",
    xPct: 14,
    widthPct: 14,
    tint: "bg-slate-100/25",
    border: "border-slate-200/40",
    dotColor: "bg-slate-400",
  },
  {
    step: "Capa 2",
    label: "Seguridad",
    xPct: 28,
    widthPct: 14,
    tint: "bg-violet-100/25",
    border: "border-violet-200/40",
    dotColor: "bg-violet-400",
  },
  {
    step: "Capa 2",
    label: "Validación",
    xPct: 42,
    widthPct: 14,
    tint: "bg-emerald-100/25",
    border: "border-emerald-200/40",
    dotColor: "bg-emerald-400",
  },
  {
    step: "Capa 3",
    label: "Event Bus · Kafka",
    xPct: 56,
    widthPct: 14,
    tint: "bg-orange-100/25",
    border: "border-orange-200/40",
    dotColor: "bg-orange-400",
  },
  {
    step: "Capa 4",
    label: "Operaciones",
    xPct: 70,
    widthPct: 30,
    tint: "bg-indigo-100/25",
    border: "border-indigo-200/40",
    dotColor: "bg-indigo-400",
  },
];

const NODES: NodeDef[] = [
  {
    id: "ingestaApp",
    title: "Ingesta · App",
    subtitle: "Registro móvil",
    icon: Smartphone,
    accent: "border-sky-200/60",
    iconBg: "bg-sky-50 text-sky-600 ring-sky-100",
    payload: {
      topic: "ingress.app",
      user_id: "user_123",
      src: "app",
    },
    xPct: 2,
    yPct: 10,
    widthPct: 11,
  },
  {
    id: "ingestaGate",
    title: "Ingesta · Taquilla",
    subtitle: "Lectura de carné",
    icon: Building2,
    accent: "border-emerald-200/60",
    iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    payload: {
      topic: "ingress.gate",
      user_id: "user_456",
      src: "gate",
    },
    xPct: 2,
    yPct: 66,
    widthPct: 11,
  },
  {
    id: "gateway",
    title: "API Gateway",
    subtitle: "Enrutador seguro",
    icon: Waypoints,
    accent: "border-slate-200/60",
    iconBg: "bg-slate-100 text-slate-700 ring-slate-200",
    payload: {
      route: "identity_broker",
      tls: "mTLS",
      rate_limit: "420/min",
    },
    xPct: 16,
    yPct: 37,
    widthPct: 11,
  },
  {
    id: "identityBroker",
    title: "Identity Broker",
    subtitle: "Verificación de identidad",
    icon: ShieldCheck,
    accent: "border-violet-200/60",
    iconBg: "bg-violet-50 text-violet-600 ring-violet-100",
    payload: {
      verify: "jwt + carne",
      branch: "affiliate | guest",
      ttl_s: 900,
    },
    xPct: 30,
    yPct: 37,
    widthPct: 11,
  },
  {
    id: "crm",
    title: "CRM Comfenalco",
    subtitle: "Master de afiliados",
    icon: UsersRound,
    accent: "border-teal-200/60",
    iconBg: "bg-teal-50 text-teal-600 ring-teal-100",
    payload: {
      source: "CRM_Master",
      category: "A | B | C",
    },
    xPct: 44,
    yPct: 10,
    widthPct: 11,
  },
  {
    id: "coreDb",
    title: "BD Core · PostgreSQL",
    subtitle: "Registro de no afiliados",
    icon: Database,
    accent: "border-cyan-200/60",
    iconBg: "bg-cyan-50 text-cyan-600 ring-cyan-100",
    payload: {
      db: "postgres",
      action: "upsert_guest",
    },
    xPct: 44,
    yPct: 66,
    widthPct: 11,
  },
  {
    id: "eventBus",
    title: "Event Bus · Kafka",
    subtitle: "Sistema nervioso de eventos",
    icon: Radio,
    accent: "border-orange-200/60",
    iconBg: "bg-orange-50 text-orange-600 ring-orange-100",
    payload: {
      broker: "kafka",
      topic: "user.validated",
      partitions: 12,
    },
    xPct: 58,
    yPct: 37,
    widthPct: 11,
  },
  {
    id: "fastpassEngine",
    title: "Motor de FastPass",
    subtitle: "Emisión y cooldown",
    icon: Cpu,
    accent: "border-indigo-200/60",
    iconBg: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    payload: {
      topic: "fastpass.issue",
      cooldown_m: 45,
      quota: "daily",
    },
    xPct: 72,
    yPct: 10,
    widthPct: 12,
  },
  {
    id: "heatmapEngine",
    title: "Motor de Aforo",
    subtitle: "Heatmap en vivo",
    icon: Gauge,
    accent: "border-fuchsia-200/60",
    iconBg: "bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100",
    payload: {
      topic: "capacity.update",
      zone: "atracciones",
      delta: 1,
    },
    xPct: 72,
    yPct: 66,
    widthPct: 12,
  },
  {
    id: "salidaQr",
    title: "Salida · QR FastPass",
    subtitle: "Token firmado",
    icon: QrCode,
    accent: "border-amber-200/60",
    iconBg: "bg-amber-50 text-amber-600 ring-amber-100",
    payload: {
      status: "approved",
      token: "QR_89X",
      cooldown: "45m",
    },
    xPct: 86,
    yPct: 10,
    widthPct: 12,
  },
];

const EDGES: Edge[] = [
  { from: "ingestaApp", to: "gateway", color: "#0ea5e9", delay: 0 },
  { from: "ingestaGate", to: "gateway", color: "#10b981", delay: 0.4 },
  { from: "gateway", to: "identityBroker", color: "#64748b", delay: 0.8 },
  { from: "identityBroker", to: "crm", color: "#14b8a6", delay: 1.2 },
  { from: "identityBroker", to: "coreDb", color: "#06b6d4", delay: 1.6 },
  { from: "identityBroker", to: "eventBus", color: "#f97316", delay: 2.0 },
  { from: "eventBus", to: "fastpassEngine", color: "#6366f1", delay: 2.4 },
  { from: "eventBus", to: "heatmapEngine", color: "#d946ef", delay: 2.8 },
  { from: "fastpassEngine", to: "salidaQr", color: "#f59e0b", delay: 3.2 },
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
    return <span className="text-purple-300">{String(value)}</span>;
  }
  return <span className="text-emerald-300">&quot;{value}&quot;</span>;
}

function PayloadCode({
  payload,
}: {
  payload: Record<string, string | number | boolean>;
}) {
  return (
    <pre className="mt-3 overflow-hidden rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-[10.5px] leading-5 text-slate-100 shadow-inner">
      <span className="text-slate-500">{"{"}</span>
      {Object.entries(payload).map(([key, value], i, arr) => (
        <span key={key} className="block pl-3">
          <span className="text-sky-300">&quot;{key}&quot;</span>
          <span className="text-slate-400">: </span>
          {formatValue(value)}
          {i < arr.length - 1 && <span className="text-slate-400">,</span>}
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
  const glowColor = style === "bus" ? "bg-orange-400/35" : "bg-violet-400/30";
  const dotColor = style === "bus" ? "bg-orange-500" : "bg-violet-500";
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
        className={`relative rounded-2xl border bg-white/80 p-4 shadow-lg shadow-blue-900/5 backdrop-blur-md ${node.accent}`}
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
              <h3 className="truncate text-sm font-semibold text-slate-900">
                {node.title}
              </h3>
            </div>
            {isGlowing && (
              <motion.span
                className={`ml-auto inline-flex h-2 w-2 rounded-full ${dotColor}`}
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
  const duration = edge.dashed ? 3.2 : 2.8;
  return (
    <>
      <motion.circle
        r={1.2}
        fill={edge.color}
        filter={`drop-shadow(0 0 1.2px ${edge.color})`}
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
        r={0.7}
        fill={edge.color}
        opacity={edge.dashed ? 0.3 : 0.5}
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
      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-slate-600 shadow-sm shadow-blue-900/5 backdrop-blur">
        <span className={`h-1.5 w-1.5 rounded-full ${lane.dotColor}`} />
        <span className="font-mono tracking-widest text-slate-400">
          {lane.step}
        </span>
        <span>·</span>
        <span className="font-semibold text-slate-800">{lane.label}</span>
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
    <div className="rounded-2xl border border-white/30 bg-white/70 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-md">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-600">
          Pipeline operacional · arquitectura orientada a eventos
        </p>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">
          Carriles end-to-end con Kafka Event Bus y motores operativos
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Tras la validación en el Identity Broker, se emite{" "}
          <code className="font-mono text-[12px]">user.validated</code> al bus
          Kafka. Los motores de FastPass y Aforo consumen el evento en paralelo.
        </p>
      </header>

      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <div className="relative min-w-[2000px] rounded-xl border border-white/40 bg-gradient-to-br from-slate-50/60 via-white/40 to-indigo-50/40 aspect-[20/7] shadow-inner shadow-blue-900/5">
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
                  <stop offset="0%" stopColor={e.color} stopOpacity={0.15} />
                  <stop
                    offset="50%"
                    stopColor={e.color}
                    stopOpacity={e.dashed ? 0.4 : 0.7}
                  />
                  <stop offset="100%" stopColor={e.color} stopOpacity={0.15} />
                </linearGradient>
              ))}
            </defs>

            {EDGES.map((e) => (
              <path
                key={`line-${e.from}-${e.to}`}
                d={edgePath(e.from, e.to)}
                stroke={`url(#grad-${e.from}-${e.to})`}
                strokeWidth={e.dashed ? 0.35 : 0.45}
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

      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> App
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Taquilla
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> API Gateway
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Identity Broker
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> CRM afiliados
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> BD Core (guest)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Event Bus Kafka
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Motor FastPass
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" /> Motor Aforo
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> QR FastPass
        </span>
      </footer>
    </div>
  );
}
