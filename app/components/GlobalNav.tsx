"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Gauge, Map, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavKey = "roadmap" | "pipeline" | "dashboard";

type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  icon: LucideIcon;
};

const ITEMS: NavItem[] = [
  { key: "roadmap", label: "Roadmap (Inicio)", href: "/", icon: Map },
  {
    key: "pipeline",
    label: "Arquitectura de Datos",
    href: "/pipeline",
    icon: Database,
  },
  {
    key: "dashboard",
    label: "Panel Gerencial",
    href: "/dashboard",
    icon: Gauge,
  },
];

function resolveActiveKey(pathname: string | null): NavKey {
  if (!pathname) return "roadmap";
  if (pathname.startsWith("/dashboard")) return "dashboard";
  if (pathname.startsWith("/pipeline")) return "pipeline";
  return "roadmap";
}

export function GlobalNav() {
  const pathname = usePathname();
  const active = resolveActiveKey(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 shadow-lg shadow-black/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
            <Waves className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
              Comfenalco · Piscilago
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50">
              Proyecto Fast Pass
            </h1>
          </div>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.05] p-1 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur-xl"
        >
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            const labelWithNumber = `${idx + 1}. ${item.label}`;

            if (isActive) {
              return (
                <button
                  key={item.key}
                  type="button"
                  disabled
                  aria-current="page"
                  className="relative inline-flex cursor-default items-center gap-2 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-500 to-fuchsia-500 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/40 ring-1 ring-inset ring-white/30"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  <span>{labelWithNumber}</span>
                  <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
                </button>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={undefined}
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-slate-50"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span>{labelWithNumber}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
