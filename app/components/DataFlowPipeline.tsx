"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Building2,
  Cloud,
  Cpu,
  Database,
  MapPinned,
  QrCode,
  Smartphone,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type NodeId =
  | "crm"
  | "ingestaApp"
  | "ingestaGate"
  | "gateway"
  | "brain"
  | "operationalDb"
  | "salidaQr"
  | "salidaHeat"
  | "nlp"
  | "dataLake";

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

const NODES: NodeDef[] = [
  {
    id: "crm",
    title: "CRM Comfenalco",
    subtitle: "Master de afiliados",
    icon: UsersRound,
    accent: "border-teal-200/60",
    iconBg: "bg-teal-50 text-teal-600 ring-teal-100",
    payload: {
      source: "CRM_Master",
      query: "validate_user",
    },
    xPct: 1,
    yPct: 37,
    widthPct: 12,
  },
  {
    id: "ingestaApp",
    title: "Ingesta · App",
    subtitle: "Registro móvil",
    icon: Smartphone,
    accent: "border-sky-200/60",
    iconBg: "bg-sky-50 text-sky-600 ring-sky-100",
    payload: {
      id: "user_123",
      cat: "B",
      action: "scan",
      src: "app",
    },
    xPct: 15,
    yPct: 8,
    widthPct: 12,
  },
  {
    id: "ingestaGate",
    title: "Ingesta · Taquilla",
    subtitle: "Lectura de carné",
    icon: Building2,
    accent: "border-emerald-200/60",
    iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    payload: {
      id: "user_456",
      cat: "A",
      action: "scan",
      src: "gate",
    },
    xPct: 15,
    yPct: 66,
    widthPct: 12,
  },
  {
    id: "gateway",
    title: "API Gateway",
    subtitle: "Enrutador de peticiones",
    icon: Waypoints,
    accent: "border-slate-200/60",
    iconBg: "bg-slate-100 text-slate-700 ring-slate-200",
    payload: {
      route_to: "fastpass_engine | guest_db",
    },
    xPct: 29,
    yPct: 37,
    widthPct: 12,
  },
  {
    id: "brain",
    title: "Motor de Reglas",
    subtitle: "FastPass · Cat. A / B / C",
    icon: Cpu,
    accent: "border-indigo-200/60",
    iconBg: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    payload: {
      engine: "rule-set v3.2",
      load: "caliente",
      latency_ms: 42,
    },
    xPct: 43,
    yPct: 8,
    widthPct: 12,
  },
  {
    id: "operationalDb",
    title: "BD Operativa",
    subtitle: "PostgreSQL · guest log",
    icon: Database,
    accent: "border-rose-200/60",
    iconBg: "bg-rose-50 text-rose-600 ring-rose-100",
    payload: {
      type: "guest_log",
      action: "store_analytics",
    },
    xPct: 43,
    yPct: 66,
    widthPct: 12,
  },
  {
    id: "salidaQr",
    title: "Salida · FastPass",
    subtitle: "Token QR firmado",
    icon: QrCode,
    accent: "border-amber-200/60",
    iconBg: "bg-amber-50 text-amber-600 ring-amber-100",
    payload: {
      status: "approved",
      token: "QR_89X",
      cooldown: "45m",
    },
    xPct: 57,
    yPct: 8,
    widthPct: 12,
  },
  {
    id: "salidaHeat",
    title: "Salida · Heatmap",
    subtitle: "Actualización de zona",
    icon: MapPinned,
    accent: "border-fuchsia-200/60",
    iconBg: "bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100",
    payload: {
      zone: "atracciones",
      delta: 1,
      ts: "live",
    },
    xPct: 57,
    yPct: 66,
    widthPct: 12,
  },
  {
    id: "nlp",
    title: "Motor NLP",
    subtitle: "API Chatbot (read-only)",
    icon: Bot,
    accent: "border-violet-200/60",
    iconBg: "bg-violet-50 text-violet-600 ring-violet-100",
    payload: {
      model: "LLM_v4",
      intent: "wait_time",
      read_only: true,
    },
    xPct: 72,
    yPct: 37,
    widthPct: 12,
  },
  {
    id: "dataLake",
    title: "Data Lake",
    subtitle: "Cold storage · analytics",
    icon: Cloud,
    accent: "border-cyan-200/60",
    iconBg: "bg-cyan-50 text-cyan-600 ring-cyan-100",
    payload: {
      bucket: "piscilago_data",
      type: "cold_storage",
    },
    xPct: 86,
    yPct: 37,
    widthPct: 13,
  },
];

const EDGES: Edge[] = [
  { from: "crm", to: "ingestaApp", color: "#14b8a6", delay: 0 },
  { from: "crm", to: "ingestaGate", color: "#14b8a6", delay: 0.4 },
  { from: "ingestaApp", to: "gateway", color: "#0ea5e9", delay: 0.8 },
  { from: "ingestaGate", to: "gateway", color: "#10b981", delay: 1.2 },
  { from: "gateway", to: "brain", color: "#6366f1", delay: 1.6 },
  { from: "gateway", to: "operationalDb", color: "#f43f5e", delay: 2.0 },
  { from: "brain", to: "salidaQr", color: "#f59e0b", delay: 2.4 },
  { from: "brain", to: "salidaHeat", color: "#a855f7", delay: 2.8 },
  { from: "operationalDb", to: "salidaHeat", color: "#ec4899", delay: 3.2 },
  { from: "operationalDb", to: "nlp", color: "#8b5cf6", delay: 3.4, dashed: true },
  { from: "salidaQr", to: "dataLake", color: "#06b6d4", delay: 3.6 },
  { from: "salidaHeat", to: "dataLake", color: "#06b6d4", delay: 4.0 },
  { from: "operationalDb", to: "dataLake", color: "#06b6d4", delay: 4.4 },
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

function Node({ node, isBrain = false }: { node: NodeDef; isBrain?: boolean }) {
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isBrain ? 0.2 : 0.05 }}
      className="absolute"
      style={{
        left: `${node.xPct}%`,
        top: `${node.yPct}%`,
        width: `${node.widthPct}%`,
      }}
    >
      <div
        className={`relative rounded-2xl border bg-white/75 p-4 shadow-lg shadow-blue-900/5 backdrop-blur-md ${node.accent}`}
      >
        {isBrain && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-indigo-400/30 blur-xl"
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
            {isBrain && (
              <motion.span
                className="ml-auto inline-flex h-2 w-2 rounded-full bg-indigo-500"
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

export function DataFlowPipeline() {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/70 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-md">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-600">
          Pipeline operacional · End-to-End
        </p>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">
          Red de nodos · CRM → decisión → Data Lake
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Cada pulso representa un evento. La línea punteada indica lectura
          analítica del chatbot (sin escritura).
        </p>
      </header>

      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <div className="relative min-w-[1600px] rounded-xl border border-white/40 bg-gradient-to-br from-slate-50/60 via-white/40 to-indigo-50/40 aspect-[16/7] shadow-inner shadow-blue-900/5">
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
                    stopOpacity={e.dashed ? 0.4 : 0.65}
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
            <Node key={node.id} node={node} isBrain={node.id === "brain"} />
          ))}
        </div>
      </div>

      <footer className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> CRM
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Ingesta App
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Taquilla
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Motor de reglas
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> BD operativa
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> FastPass emitido
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" /> Heatmap
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-4 border-t border-dashed border-violet-500" />
          Lectura chatbot (NLP)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Data Lake
        </span>
      </footer>
    </div>
  );
}
