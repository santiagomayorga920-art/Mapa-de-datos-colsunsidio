import Link from "next/link";
import { ArrowLeft, Map, Waves } from "lucide-react";

import { LiveDashboard } from "../components/LiveDashboard";
import { TimeRangeSelector } from "../components/TimeRangeSelector";

export default function DashboardPage() {
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
              <h1 className="text-base font-semibold text-slate-50">
                Panel Gerencial
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TimeRangeSelector />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/30 bg-indigo-500/15 px-3 py-1.5 text-xs font-medium text-indigo-100 shadow-xl shadow-indigo-500/20 ring-1 ring-inset ring-indigo-300/20 backdrop-blur-xl transition hover:bg-indigo-500/25"
            >
              <Map className="h-3.5 w-3.5" aria-hidden />
              Roadmap (Inicio)
            </Link>
            <Link
              href="/pipeline"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-200 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Arquitectura de Datos
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
        <LiveDashboard />
      </main>
    </div>
  );
}
