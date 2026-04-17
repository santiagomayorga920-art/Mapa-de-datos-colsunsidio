import Link from "next/link";
import { ArrowLeft, Waves } from "lucide-react";

import { FastPassTable } from "../components/FastPassTable";
import { HeatmapChart } from "../components/HeatmapChart";
import { KpiCards } from "../components/KpiCards";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/30 bg-white/60 shadow-sm shadow-blue-900/5 backdrop-blur-md">
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
                Panel Gerencial
              </h1>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-lg shadow-blue-900/5 backdrop-blur-md transition hover:bg-white/90"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Flujo de datos
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
        <div className="flex flex-col gap-6">
          <KpiCards />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <HeatmapChart />
            <FastPassTable />
          </div>
        </div>
      </main>
    </div>
  );
}
