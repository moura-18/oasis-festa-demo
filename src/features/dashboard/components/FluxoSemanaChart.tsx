import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { FluxoPorDiaSemana } from "@/types";
import { DIA_SEMANA_LABEL, ORDEM_SEMANA } from "../lib/metric-meta";

interface FluxoSemanaChartProps {
  dados: FluxoPorDiaSemana[];
}

export function FluxoSemanaChart({ dados }: FluxoSemanaChartProps) {
  const porDia = new Map(dados.map((p) => [p.diaSemana, p.eventos]));
  const dias = ORDEM_SEMANA.map((diaSemana) => ({
    diaSemana,
    eventos: porDia.get(diaSemana) ?? 0,
  }));
  const maxEventos = Math.max(1, ...dias.map((d) => d.eventos));
  const diasDePico = dias
    .filter((d) => d.eventos === maxEventos && d.eventos > 0)
    .map((d) => DIA_SEMANA_LABEL[d.diaSemana]);

  return (
    <Card data-demo-id="dashboard-chart-fluxo-semana">
      <CardHeader>
        <CardTitle>Fluxo de eventos por dia da semana</CardTitle>
        <CardDescription>
          {diasDePico.length > 0
            ? `Maior movimento aos ${diasDePico.join(" e ")}`
            : "Eventos reservados e confirmados, por dia"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
          {dias.map(({ diaSemana, eventos }) => {
            const alturaPct = Math.round((eventos / maxEventos) * 100);
            const emDestaque = eventos === maxEventos && eventos > 0;
            return (
              <div
                key={diaSemana}
                data-demo-id={`dashboard-fluxo-dia-${diaSemana}`}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
              >
                <span className="text-xs font-medium tabular-nums text-foreground">
                  {eventos}
                </span>
                <div className="flex h-full w-full max-w-10 items-end">
                  <div
                    className={`w-full rounded-t-md ${
                      emDestaque ? "bg-primary" : "bg-chart-2"
                    }`}
                    style={{ height: `${Math.max(4, alturaPct)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {DIA_SEMANA_LABEL[diaSemana].slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
