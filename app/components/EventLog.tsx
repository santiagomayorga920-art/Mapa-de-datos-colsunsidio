import { Activity, DoorOpen, Ticket, Utensils, type LucideIcon } from "lucide-react";
import { users, attractions, transactions } from "@/src/lib/mockDb";

type LogEntry = {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
  accent: string;
};

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildEntries(): LogEntry[] {
  const userById = new Map(users.map((u) => [u.id, u]));
  const attrById = new Map(attractions.map((a) => [a.id, a]));

  const entries: LogEntry[] = transactions.slice(0, 4).map((tx) => {
    const user = userById.get(tx.userId);
    const attraction = attrById.get(tx.attractionId);
    const isFood = tx.tipo === "Comida";
    return {
      id: tx.id,
      title: isFood
        ? `${user?.nombre ?? "Visitante"} en ${attraction?.nombre ?? "restaurante"}`
        : `Afiliado Cat. ${user?.categoria ?? "—"} reserva ${attraction?.nombre ?? "atracción"}`,
      detail: isFood
        ? `Consumo registrado · turno ${tx.turno}`
        : `FastPass emitido · turno ${tx.turno}`,
      time: formatTime(tx.timestamp),
      icon: isFood ? Utensils : Ticket,
      accent: isFood
        ? "bg-amber-50 text-amber-600 ring-amber-100"
        : "bg-indigo-50 text-indigo-600 ring-indigo-100",
    };
  });

  entries.unshift({
    id: "EVT-LIVE",
    title: "Nuevo ingreso físico registrado",
    detail: "Taquilla 3 · escaneo de carné categoría B",
    time: "Justo ahora",
    icon: DoorOpen,
    accent: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  });

  return entries;
}

export function EventLog() {
  const entries = buildEntries();

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-white/30 bg-white/70 shadow-lg shadow-blue-900/5 backdrop-blur-md">
      <header className="flex items-center justify-between border-b border-white/40 px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Log de eventos
          </p>
          <h2 className="text-sm font-semibold text-slate-900">Actividad reciente</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          En vivo
        </span>
      </header>

      <ul className="flex flex-1 flex-col divide-y divide-white/40 overflow-auto">
        {entries.map((entry) => {
          const Icon = entry.icon;
          return (
            <li key={entry.id} className="flex gap-3 px-5 py-4">
              <div
                className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${entry.accent}`}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {entry.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{entry.detail}</p>
              </div>
              <span className="shrink-0 text-[11px] font-mono text-slate-400">
                {entry.time}
              </span>
            </li>
          );
        })}
      </ul>

      <footer className="flex items-center gap-2 border-t border-white/40 px-5 py-3 text-[11px] text-slate-400">
        <Activity className="h-3.5 w-3.5" aria-hidden />
        Fuente: mockDb · refresco simulado
      </footer>
    </aside>
  );
}
