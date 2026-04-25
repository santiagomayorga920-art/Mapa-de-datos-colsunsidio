import { LiveDashboard } from "../components/LiveDashboard";
import { TimeRangeSelector } from "../components/TimeRangeSelector";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
            Operación · En vivo
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            Panel Gerencial
          </h2>
        </div>
        <TimeRangeSelector />
      </div>
      <LiveDashboard />
    </main>
  );
}
