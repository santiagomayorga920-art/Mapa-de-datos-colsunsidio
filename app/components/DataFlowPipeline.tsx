import {
  ArrowRight,
  Building2,
  Cpu,
  QrCode,
  Smartphone,
  Ticket,
  Timer,
  MapPinned,
  type LucideIcon,
} from "lucide-react";

type PipelineCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type PipelineStage = {
  label: string;
  step: string;
  cards: PipelineCard[];
};

const stages: PipelineStage[] = [
  {
    step: "01",
    label: "Entrada",
    cards: [
      {
        title: "Registro en App",
        description: "Afiliados ingresan vía aplicación móvil con credenciales Comfenalco.",
        icon: Smartphone,
        accent: "bg-sky-50 text-sky-600 ring-sky-100",
      },
      {
        title: "Taquilla Física",
        description: "Registro presencial con lectura de código de barras del carné.",
        icon: Building2,
        accent: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      },
    ],
  },
  {
    step: "02",
    label: "Procesamiento",
    cards: [
      {
        title: "Motor de Reglas",
        description: "Validación de Categoría A / B / C y asignación de beneficios.",
        icon: Cpu,
        accent: "bg-indigo-50 text-indigo-600 ring-indigo-100",
      },
    ],
  },
  {
    step: "03",
    label: "Transacción",
    cards: [
      {
        title: "Generación FastPass",
        description: "Asignación de turno y cooldown para próxima reserva.",
        icon: Ticket,
        accent: "bg-amber-50 text-amber-600 ring-amber-100",
      },
      {
        title: "Cooldown Activo",
        description: "Bloqueo temporal configurable por atracción (en minutos).",
        icon: Timer,
        accent: "bg-rose-50 text-rose-600 ring-rose-100",
      },
    ],
  },
  {
    step: "04",
    label: "Salida",
    cards: [
      {
        title: "Emisión de QR",
        description: "Token único entregado al usuario para validar acceso.",
        icon: QrCode,
        accent: "bg-slate-100 text-slate-700 ring-slate-200",
      },
      {
        title: "Actualización Heatmap",
        description: "Refresco del mapa de calor de aforo y puntos de interés.",
        icon: MapPinned,
        accent: "bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100",
      },
    ],
  },
];

function StageCard({ card }: { card: PipelineCard }) {
  const Icon = card.icon;
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ${card.accent}`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-900">{card.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        {card.description}
      </p>
    </article>
  );
}

function StageColumn({ stage }: { stage: PipelineStage }) {
  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <header className="mb-3 flex items-baseline gap-2">
        <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-400">
          {stage.step}
        </span>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          {stage.label}
        </h2>
      </header>
      <div className="flex flex-1 flex-col gap-3">
        {stage.cards.map((card) => (
          <StageCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

export function DataFlowPipeline() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-600">
          Pipeline operacional
        </p>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">
          Flujo de datos en tiempo real
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Del ingreso al parque hasta la emisión del FastPass y actualización del
          heatmap de aforo.
        </p>
      </header>

      <div className="flex items-stretch gap-3">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex min-w-0 flex-1 items-stretch gap-3">
            <StageColumn stage={stage} />
            {index < stages.length - 1 && (
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
