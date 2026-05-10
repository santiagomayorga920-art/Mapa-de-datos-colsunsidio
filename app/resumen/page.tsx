import { Activity, Sparkles, Thermometer, TrendingUp, Waves } from "lucide-react";

import { MarketOpportunity } from "../components/MarketOpportunity";

export default function ResumenEjecutivoPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-10 px-6 py-10">
      <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/60 via-slate-950/40 to-fuchsia-950/40 p-10 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.18)_1px,transparent_0)] [background-size:24px_24px]"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo-200 ring-1 ring-inset ring-indigo-300/20">
              <Sparkles className="h-3 w-3" aria-hidden />
              Executive Pitch
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300">
              <Waves className="h-3 w-3" aria-hidden />
              Comfenalco · Piscilago
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200 ring-1 ring-inset ring-emerald-300/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
              Resumen 2026 – 2028
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
            Piscilago: Optimización Operativa y Financiera{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              (Piloto Fast Pass)
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
            Vista única para la junta directiva: tesis del proyecto, retorno
            esperado, hitos críticos y estructura financiera del piloto Fast
            Pass que transforma la operación del parque.
          </p>
        </div>
      </section>

      <section>
        <header className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo-300">
              Tier 1 · Impacto inmediato
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
              El problema y la oportunidad
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Métricas clave levantadas en estudio de campo 2025.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/25">
                  <Activity className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                  Salud de Marca
                </p>
              </div>
              <span className="rounded-full border border-rose-400/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                Crítico
              </span>
            </header>

            <p className="mt-5 text-xs font-medium uppercase tracking-widest text-slate-400">
              NPS Actual
            </p>
            <p className="mt-1 text-5xl font-semibold tabular-nums text-slate-50">
              36.8
            </p>

            <p className="mt-5 rounded-lg border border-rose-400/20 bg-rose-500/5 px-3 py-2 text-xs font-medium leading-relaxed text-rose-300">
              Peligro: 49.1% de usuarios Pasivos por filas.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25">
                  <Thermometer className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                  Dolor Operativo
                </p>
              </div>
              <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                Atender
              </span>
            </header>

            <p className="mt-5 text-xs font-medium uppercase tracking-widest text-slate-400">
              Fricción Climática
            </p>
            <p className="mt-1 text-5xl font-semibold tabular-nums text-slate-50">
              45.6%
            </p>

            <p className="mt-5 rounded-lg border border-amber-400/20 bg-amber-500/5 px-3 py-2 text-xs font-medium leading-relaxed text-amber-200">
              Menciones negativas por estrés térmico y sol.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25">
                  <TrendingUp className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                  Viabilidad Comercial
                </p>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                Capturar
              </span>
            </header>

            <p className="mt-5 text-xs font-medium uppercase tracking-widest text-slate-400">
              Intención de Pago
            </p>
            <p className="mt-1 text-5xl font-semibold tabular-nums text-slate-50">
              71.8%
            </p>

            <p className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-500/5 px-3 py-2 text-xs font-medium leading-relaxed text-emerald-300">
              Disposición alta en segmento Parejas y Adultos.
            </p>
          </article>
        </div>
      </section>

      <MarketOpportunity />
    </main>
  );
}
