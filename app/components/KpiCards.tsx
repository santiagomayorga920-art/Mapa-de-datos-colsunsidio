import { CircleDollarSign, Gauge, Users } from "lucide-react";

import { capacityData, getGlobalCapacity } from "@/src/lib/mockDb";

const INGRESOS_IN_APP_COP = 12_500_000;

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function KpiCards() {
  const aforoActual = getGlobalCapacity();
  const aforoMax = capacityData.aforoTotal;
  const restante = Math.max(aforoMax - aforoActual, 0);
  const porcentaje = Math.round((aforoActual / aforoMax) * 100);
  const enAlerta = porcentaje >= 90;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <Gauge className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Aforo global
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
              enAlerta
                ? "bg-rose-50 text-rose-700 ring-rose-100"
                : "bg-emerald-50 text-emerald-700 ring-emerald-100"
            }`}
          >
            {enAlerta ? "Crítico" : "Saludable"}
          </span>
        </header>

        <div className="mt-4 flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-slate-900">
            {aforoActual.toLocaleString("es-CO")}
          </p>
          <p className="text-sm text-slate-400">
            / {aforoMax.toLocaleString("es-CO")}
          </p>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              enAlerta ? "bg-rose-500" : "bg-indigo-500"
            }`}
            style={{ width: `${Math.min(porcentaje, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {porcentaje}% del aforo permitido.
        </p>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <header className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <Users className="h-4 w-4" aria-hidden />
          </span>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Capacidad restante
          </p>
        </header>

        <p className="mt-4 text-2xl font-semibold text-slate-900">
          {restante.toLocaleString("es-CO")}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Personas que aún pueden ingresar hoy.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              Físicos
            </dt>
            <dd className="text-sm font-semibold text-slate-900">
              {capacityData.ingresosFisicos.toLocaleString("es-CO")}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              App
            </dt>
            <dd className="text-sm font-semibold text-slate-900">
              {capacityData.ingresosApp.toLocaleString("es-CO")}
            </dd>
          </div>
        </dl>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <header className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-100">
            <CircleDollarSign className="h-4 w-4" aria-hidden />
          </span>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Ingresos In-App (Hoy)
          </p>
        </header>

        <p className="mt-4 text-2xl font-semibold text-slate-900">
          {formatCOP(INGRESOS_IN_APP_COP)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Compras de FastPass y restaurantes vía aplicación.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-600 ring-1 ring-slate-100">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          +12,4% vs. ayer
        </div>
      </article>
    </section>
  );
}
