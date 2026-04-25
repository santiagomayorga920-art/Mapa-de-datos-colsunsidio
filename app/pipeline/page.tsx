import { Gauge, Users } from "lucide-react";

import { DataFlowPipeline } from "../components/DataFlowPipeline";
import { EventLog } from "../components/EventLog";
import {
  capacityData,
  getGlobalCapacity,
  attractions,
  users,
} from "@/src/lib/mockDb";

export default function PipelinePage() {
  const aforoActual = getGlobalCapacity();
  const porcentajeAforo = Math.round(
    (aforoActual / capacityData.aforoTotal) * 100,
  );
  const atraccionesAbiertas = attractions.filter(
    (a) => a.reservable && a.estado === "abierta",
  ).length;
  const afiliadosActivos = users.filter((u) => u.categoria !== "None").length;

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            Arquitectura · Flujo de datos
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            Pipeline de eventos en tiempo real
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
            <Gauge className="h-4 w-4 text-indigo-300" aria-hidden />
            <div className="text-xs">
              <p className="text-slate-400">Aforo global</p>
              <p className="font-semibold text-slate-50">
                {aforoActual.toLocaleString("es-CO")} /{" "}
                {capacityData.aforoTotal.toLocaleString("es-CO")}
                <span className="ml-1 text-indigo-300">
                  ({porcentajeAforo}%)
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
            <Users className="h-4 w-4 text-emerald-300" aria-hidden />
            <div className="text-xs">
              <p className="text-slate-400">Afiliados activos</p>
              <p className="font-semibold text-slate-50">
                {afiliadosActivos} registrados · {atraccionesAbiertas}{" "}
                atracciones abiertas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <DataFlowPipeline />
        </div>
        <div className="lg:col-span-1">
          <EventLog />
        </div>
      </div>
    </main>
  );
}
