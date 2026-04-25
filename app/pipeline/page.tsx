import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Gauge, Map, Users, Waves } from "lucide-react";

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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/30 bg-white/60 shadow-sm shadow-blue-900/5 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/70 px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md transition hover:bg-white/90"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Roadmap
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <Waves className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                Comfenalco · Piscilago
              </p>
              <h1 className="text-base font-semibold text-slate-900">
                Arquitectura de Datos
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/70 px-3 py-1.5 shadow-lg shadow-blue-900/5 backdrop-blur-md">
              <Gauge className="h-4 w-4 text-indigo-600" aria-hidden />
              <div className="text-xs">
                <p className="text-slate-400">Aforo global</p>
                <p className="font-semibold text-slate-900">
                  {aforoActual.toLocaleString("es-CO")} /{" "}
                  {capacityData.aforoTotal.toLocaleString("es-CO")}
                  <span className="ml-1 text-indigo-600">
                    ({porcentajeAforo}%)
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/70 px-3 py-1.5 shadow-lg shadow-blue-900/5 backdrop-blur-md">
              <Users className="h-4 w-4 text-emerald-600" aria-hidden />
              <div className="text-xs">
                <p className="text-slate-400">Afiliados activos</p>
                <p className="font-semibold text-slate-900">
                  {users.filter((u) => u.categoria !== "None").length}{" "}
                  registrados · {atraccionesAbiertas} atracciones abiertas
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
            >
              <Map className="h-3.5 w-3.5" aria-hidden />
              Roadmap
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Panel gerencial
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <DataFlowPipeline />
          </div>
          <div className="lg:col-span-1">
            <EventLog />
          </div>
        </div>
      </main>
    </div>
  );
}
