"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Ticket } from "lucide-react";

import { attractions, users } from "@/src/lib/mockDb";
import type { Transaction } from "@/src/lib/types";

type FastPassTableProps = {
  rows: Transaction[];
  highlightId: string | null;
};

function formatHour(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FastPassTable({ rows, highlightId }: FastPassTableProps) {
  const userById = new Map(users.map((u) => [u.id, u]));
  const attrById = new Map(attractions.map((a) => [a.id, a]));

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/25">
            <Ticket className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Reservas activas
            </p>
            <h2 className="text-sm font-semibold text-slate-50">
              FastPass generados
            </h2>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/25">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {rows.length} activos
        </span>
      </header>

      <div className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-slate-400 backdrop-blur">
            <tr>
              <th className="px-5 py-3 font-medium">ID Usuario</th>
              <th className="px-5 py-3 font-medium">Atracción</th>
              <th className="px-5 py-3 font-medium">Turno</th>
              <th className="px-5 py-3 font-medium">Hora de redención</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-300">
            <AnimatePresence initial={false}>
              {rows.map((tx) => {
                const user = userById.get(tx.userId);
                const attraction = attrById.get(tx.attractionId);
                const isHighlighted = tx.id === highlightId;
                return (
                  <motion.tr
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      backgroundColor: isHighlighted
                        ? "rgba(16, 185, 129, 0.22)"
                        : "rgba(255, 255, 255, 0)",
                    }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      backgroundColor: { duration: 1.8, ease: "easeOut" },
                      layout: { duration: 0.35, ease: "easeOut" },
                      default: { duration: 0.35 },
                    }}
                    className="transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">
                      {tx.userId}
                      {user && (
                        <span className="ml-2 font-sans text-[11px] text-slate-500">
                          · Cat. {user.categoria}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-100">
                      {attraction?.nombre ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-slate-300">{tx.turno}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">
                      {formatHour(tx.timestamp)}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </article>
  );
}
