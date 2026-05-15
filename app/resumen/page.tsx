import {
  Activity,
  ArrowDown,
  ArrowRight,
  Coins,
  Download,
  HeartHandshake,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Sun,
  Thermometer,
  TrendingUp,
  Users,
  Waves,
  Wrench,
} from "lucide-react";

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

      <section>
        <header className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Tier 2 · Modelo financiero
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
              Modelo de Financiamiento Solidario{" "}
              <span className="text-slate-400">(Círculo Virtuoso)</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Cómo el ingreso comercial se reinvierte en bienestar del afiliado.
          </p>
        </header>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl md:p-8">
          <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            <article className="flex-1 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-orange-500/10 p-5 shadow-lg shadow-amber-500/15 ring-1 ring-inset ring-amber-300/15">
              <header className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-200 ring-1 ring-amber-300/40">
                  <Coins className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                  Origen
                </p>
              </header>
              <p className="mt-3 text-sm font-semibold text-slate-50">
                Recaudo Categoría C / No Afiliados
              </p>
              <p className="mt-1 text-xs text-amber-100/80">
                Compra de Fast Pass premium y servicios de comodidad.
              </p>
            </article>

            <div className="flex items-center justify-center text-slate-400">
              <ArrowRight
                className="hidden h-6 w-6 text-emerald-300 lg:block"
                aria-hidden
              />
              <ArrowDown
                className="block h-6 w-6 text-emerald-300 lg:hidden"
                aria-hidden
              />
            </div>

            <article className="flex-1 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-teal-500/15 p-5 shadow-[0_0_30px_-4px_rgba(52,211,153,0.45)] ring-1 ring-inset ring-emerald-300/25">
              <header className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/25 text-emerald-100 ring-1 ring-emerald-300/40 shadow-lg shadow-emerald-500/30">
                  <PiggyBank className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Pool central
                </p>
              </header>
              <p className="mt-3 text-base font-semibold text-slate-50">
                Fondo Específico de Bienestar
              </p>
              <p className="mt-1 text-xs text-emerald-100/80">
                Vehículo financiero auditable, separado del P&amp;L operativo.
              </p>
            </article>

            <div className="flex items-center justify-center text-slate-400">
              <ArrowRight
                className="hidden h-6 w-6 text-emerald-300 lg:block"
                aria-hidden
              />
              <ArrowDown
                className="block h-6 w-6 text-emerald-300 lg:hidden"
                aria-hidden
              />
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <article className="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-cyan-500/10 p-4 ring-1 ring-inset ring-sky-300/15">
                <header className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-200 ring-1 ring-sky-300/40">
                    <Sun className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-200">
                    Salida 1
                  </p>
                </header>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Infraestructura Climática
                </p>
                <p className="mt-0.5 text-[11px] text-slate-300">
                  Polisombras y aspersores en zonas críticas.
                </p>
              </article>

              <article className="rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-violet-500/10 p-4 ring-1 ring-inset ring-indigo-300/15">
                <header className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-300/40">
                    <Wrench className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-200">
                    Salida 2
                  </p>
                </header>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Hardware Operativo
                </p>
                <p className="mt-0.5 text-[11px] text-slate-300">
                  PDAs IP67 industriales y sensores IoT.
                </p>
              </article>

              <article className="rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/15 via-fuchsia-500/5 to-purple-500/10 p-4 ring-1 ring-inset ring-fuchsia-300/15">
                <header className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/20 text-fuchsia-200 ring-1 ring-fuchsia-300/40">
                    <Users className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                    Salida 3
                  </p>
                </header>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Capital Humano
                </p>
                <p className="mt-0.5 text-[11px] text-slate-300">
                  Embajadores de Experiencia certificados.
                </p>
              </article>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-200">
            <HeartHandshake className="h-4 w-4 flex-shrink-0" aria-hidden />
            <span>
              <span className="font-semibold text-emerald-100">
                Equidad material:
              </span>{" "}
              cada peso recaudado al segmento premium retorna como bienestar
              tangible para Cat. C y No Afiliados.
            </span>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/80 via-slate-950/60 to-purple-950/70 p-10 shadow-2xl shadow-indigo-500/20 ring-1 ring-inset ring-indigo-300/20 backdrop-blur-xl md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-indigo-500/25 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-purple-500/25 blur-[120px]"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 shadow-[0_0_12px_rgba(165,180,252,0.55)]"
        />

        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              Cumplimiento regulatorio
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl">
              Proyecto blindado bajo Ley 21 de 1982{" "}
              <span className="text-slate-400">(Cajas de Compensación)</span> y{" "}
              Ley 1581{" "}
              <span className="text-slate-400">(Hábeas Data)</span>.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Cada decisión técnica y comercial está sustentada en un memorando
              exhaustivo: clasificación jurídica, mitigación de riesgos
              constitucionales y blindaje del modelo de subsidios cruzados.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4">
            <a
              href="/Sustentacion_Legal_FastPass.pdf"
              download
              className="group relative inline-flex items-center justify-between gap-4 rounded-2xl border border-emerald-300/40 bg-gradient-to-br from-emerald-500/25 via-emerald-500/15 to-teal-500/20 px-6 py-5 text-left shadow-2xl shadow-emerald-500/30 ring-1 ring-inset ring-emerald-200/30 transition-all duration-300 hover:scale-[1.02] hover:from-emerald-500/35 hover:via-emerald-500/25 hover:to-teal-500/30 hover:shadow-emerald-500/50 active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/25 text-emerald-100 ring-1 ring-emerald-200/40 shadow-lg shadow-emerald-500/40 transition group-hover:scale-110">
                  <Download className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-200">
                    PDF · Documento Oficial
                  </p>
                  <p className="mt-0.5 text-lg font-semibold leading-tight text-slate-50">
                    Descargar Memorando Exhaustivo Legal
                  </p>
                </div>
              </div>
              <ArrowRight
                className="h-5 w-5 flex-shrink-0 text-emerald-100 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2.5 text-[11px] text-slate-400">
              <ShieldCheck
                className="h-3.5 w-3.5 flex-shrink-0 text-emerald-300"
                aria-hidden
              />
              Firmado por Dirección Jurídica · Auditoría externa Ley 1581.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
