import { Sparkles, Waves } from "lucide-react";

export default function ResumenEjecutivoPage() {
  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-10">
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
    </main>
  );
}
