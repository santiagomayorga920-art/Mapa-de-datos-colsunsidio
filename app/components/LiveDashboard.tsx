"use client";

import { useEffect, useMemo, useState } from "react";

import {
  attractions,
  capacityData,
  transactions,
  users,
} from "@/src/lib/mockDb";
import type { Transaction } from "@/src/lib/types";

import { AffiliateMixChart } from "./AffiliateMixChart";
import { FastPassTable } from "./FastPassTable";
import { KpiCards } from "./KpiCards";
import { ParkSaturationTreemap } from "./ParkSaturationTreemap";
import { PeakHourCard } from "./PeakHourCard";

const INITIAL_INGRESOS_COP = 12_500_000;
const MAX_ROWS = 5;

function nowLabel(offsetSeconds = 0): string {
  const d = new Date(Date.now() + offsetSeconds * 1000);
  return d.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function LiveDashboard() {
  const reservables = useMemo(
    () => attractions.filter((a) => a.reservable && a.estado === "abierta"),
    [],
  );
  const affiliates = useMemo(
    () => users.filter((u) => u.categoria !== "None"),
    [],
  );

  const [aforoFisico, setAforoFisico] = useState(capacityData.ingresosFisicos);
  const [aforoApp, setAforoApp] = useState(capacityData.ingresosApp);
  const [ingresosInApp, setIngresosInApp] = useState(INITIAL_INGRESOS_COP);
  const [rows, setRows] = useState<Transaction[]>(() =>
    transactions.filter((tx) => tx.tipo === "FastPass").slice(0, MAX_ROWS),
  );
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAforoFisico((prev) =>
        clamp(
          prev + (Math.floor(Math.random() * 5) - 1),
          0,
          capacityData.aforoTotal,
        ),
      );
      setAforoApp((prev) =>
        clamp(
          prev + Math.floor(Math.random() * 4),
          0,
          capacityData.aforoTotal,
        ),
      );
      setIngresosInApp(
        (prev) => prev + 15_000 + Math.floor(Math.random() * 85_000),
      );

      if (Math.random() < 0.6) {
        const user = pickRandom(affiliates);
        const attraction = pickRandom(reservables);
        const newTx: Transaction = {
          id: `TX-LIVE-${Date.now()}`,
          userId: user.id,
          attractionId: attraction.id,
          turno: nowLabel(15 * 60),
          timestamp: Date.now(),
          tipo: "FastPass",
        };
        setRows((prev) => [newTx, ...prev].slice(0, MAX_ROWS));
        setHighlightId(newTx.id);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [affiliates, reservables]);

  useEffect(() => {
    if (!highlightId) return;
    const timeout = setTimeout(() => setHighlightId(null), 1800);
    return () => clearTimeout(timeout);
  }, [highlightId]);

  return (
    <div className="flex flex-col gap-6">
      <KpiCards
        aforoFisico={aforoFisico}
        aforoApp={aforoApp}
        ingresosInApp={ingresosInApp}
      />
      <AffiliateMixChart />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ParkSaturationTreemap />
        </div>
        <div className="xl:col-span-4">
          <PeakHourCard />
        </div>
      </div>
      <FastPassTable rows={rows} highlightId={highlightId} />
    </div>
  );
}
