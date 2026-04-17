import Link from "next/link";
import { ArrowUpRight, Gauge, Users, Waves } from "lucide-react";

import { DataFlowPipeline } from "./components/DataFlowPipeline";
import { EventLog } from "./components/EventLog";
import {
  capacityData,
  getGlobalCapacity,
  attractions,
  users,
} from "@/src/lib/mockDb";

export default function Home() {
  const aforoActual = getGlobalCapacity();
  const porcentajeAforo = Math.round((aforoActual / capacityData.aforoTotal) * 100);
  const atraccionesAbiertas = attractions.filter(
    (a) => a.reservable && a.estado === "abierta",
  ).length;

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_#eef2ff_0%,_#f8fafc_55%,_#f1f5f9_100%)]">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <Waves className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                Comfenalco · Piscilago
              </p>
              <h1 className="text-base font-semibold text-slate-900">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <Gauge className="h-4 w-4 text-indigo-600" aria-hidden />
              <div className="text-xs">
                <p className="text-slate-400">Aforo global</p>
                <p className="font-semibold text-slate-900">
                  {aforoActual.toLocaleString("es-CO")} / {capacityData.aforoTotal.toLocaleString("es-CO")}
                  <span className="ml-1 text-indigo-600">({porcentajeAforo}%)</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <Users className="h-4 w-4 text-emerald-600" aria-hidden />
              <div className="text-xs">
                <p className="text-slate-400">Afiliados activos</p>
                <p className="font-semibold text-slate-900">
                  {users.filter((u) => u.categoria !== "None").length} registrados · {atraccionesAbiertas} atracciones abiertas
                </p>
              </div>
            </div>
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
