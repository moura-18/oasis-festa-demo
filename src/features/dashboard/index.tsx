import { useMemo, useState } from "react";
import { useAppStore } from "@/store";
import type { DiaSemana, FluxoPorDiaSemana } from "@/types";
import { KpiCard } from "./components/KpiCard";
import { FunilConversaoChart } from "./components/FunilConversaoChart";
import { FluxoSemanaChart } from "./components/FluxoSemanaChart";
import { FaturamentoTrendChart } from "./components/FaturamentoTrendChart";
import { CanalBreakdownCard } from "./components/CanalBreakdownCard";
import { TimeRangeFilter } from "./components/TimeRangeFilter";
import {
  isWithinRange,
  rangeForPreset,
  type DashboardTimeRangePreset,
} from "./lib/time-filter";

/** Índice `Date#getDay()` (0 = domingo) → `DiaSemana`, na mesma ordem de `ORDEM_SEMANA`. */
const DIA_SEMANA_POR_INDICE: readonly DiaSemana[] = [
  "dom",
  "seg",
  "ter",
  "qua",
  "qui",
  "sex",
  "sab",
];

export default function DashboardPage() {
  const dashboardData = useAppStore((s) => s.dashboardData);
  const leads = useAppStore((s) => s.leads);
  const calendarEvents = useAppStore((s) => s.calendarEvents);
  const { metricas, funilConversao } = dashboardData;

  const faturamentoMedio = metricas.find((m) => m.id === "faturamento_medio");
  const taxaConversao = metricas.find((m) => m.id === "taxa_conversao_funil");

  const [preset, setPreset] = useState<DashboardTimeRangePreset>("ano");
  const [customFrom, setCustomFrom] = useState(() => rangeForPreset("mes").from);
  const [customTo, setCustomTo] = useState(() => rangeForPreset("mes").to);

  const range = useMemo(
    () =>
      preset === "personalizado"
        ? { from: customFrom || customTo || "0000-01-01", to: customTo || customFrom || "9999-12-31" }
        : rangeForPreset(preset),
    [preset, customFrom, customTo],
  );

  const leadsNoPeriodo = useMemo(
    () => leads.filter((lead) => isWithinRange(lead.criadoEm, range)),
    [leads, range],
  );

  const fluxoPorDiaSemanaNoPeriodo = useMemo<FluxoPorDiaSemana[]>(() => {
    const contagem = new Map<DiaSemana, number>();
    for (const evento of calendarEvents) {
      if (evento.status === "bloqueado") continue;
      if (!isWithinRange(evento.data, range)) continue;
      const dia = DIA_SEMANA_POR_INDICE[new Date(`${evento.data}T00:00:00`).getDay()];
      contagem.set(dia, (contagem.get(dia) ?? 0) + 1);
    }
    return DIA_SEMANA_POR_INDICE.map((diaSemana) => ({
      diaSemana,
      eventos: contagem.get(diaSemana) ?? 0,
    }));
  }, [calendarEvents, range]);

  return (
    <div
      data-demo-id="page-dashboard"
      className="flex flex-col gap-6 p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Visão geral do funil de leads, agenda e faturamento da Oásis Festas.
          </p>
        </div>
        <TimeRangeFilter
          preset={preset}
          onPresetChange={setPreset}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Indicadores gerais (todo o histórico)
        </p>
        <div
          data-demo-id="dashboard-kpi-grid"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {metricas.map((metrica) => (
            <KpiCard key={metrica.id} metrica={metrica} />
          ))}
        </div>
      </div>

      <div
        data-demo-id="dashboard-charts-grid"
        className="grid grid-cols-1 gap-4 xl:grid-cols-2"
      >
        {faturamentoMedio && (
          <FaturamentoTrendChart metrica={faturamentoMedio} />
        )}
        <CanalBreakdownCard leads={leadsNoPeriodo} />
        <FluxoSemanaChart dados={fluxoPorDiaSemanaNoPeriodo} />
        <div className="xl:col-span-2">
          <FunilConversaoChart
            dados={funilConversao}
            taxaConversao={taxaConversao?.valor ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
