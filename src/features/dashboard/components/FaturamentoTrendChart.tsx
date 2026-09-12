import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "@/types";
import { formatCompactBRL } from "../lib/format";

interface FaturamentoTrendChartProps {
  metrica: DashboardMetric;
}

/** Deriva o valor do período anterior a partir do valor atual + variação percentual. */
function valorPeriodoAnterior(valorAtual: number, tendencia: DashboardMetric["tendencia"]) {
  if (!tendencia || tendencia.direcao === "estavel") return valorAtual;
  const fator = tendencia.percentual / 100;
  return tendencia.direcao === "alta"
    ? valorAtual / (1 + fator)
    : valorAtual / (1 - fator);
}

export function FaturamentoTrendChart({ metrica }: FaturamentoTrendChartProps) {
  const anterior = valorPeriodoAnterior(metrica.valor, metrica.tendencia);
  const maxValor = Math.max(anterior, metrica.valor, 1);
  const direcao = metrica.tendencia?.direcao ?? "estavel";
  const TrendIcon =
    direcao === "alta" ? TrendingUp : direcao === "baixa" ? TrendingDown : Minus;

  const barras = [
    { label: "Período anterior", valor: anterior, cor: "bg-chart-2" },
    { label: "Período atual", valor: metrica.valor, cor: "bg-primary" },
  ];

  return (
    <Card data-demo-id="dashboard-chart-faturamento-trend">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Faturamento médio por evento</CardTitle>
          <CardDescription>{metrica.descricao}</CardDescription>
        </div>
        {metrica.tendencia && (
          <span
            data-demo-id="dashboard-faturamento-trend-badge"
            className={cn(
              "inline-flex items-center gap-1 text-sm font-medium",
              direcao === "alta" && "text-success",
              direcao === "baixa" && "text-destructive",
              direcao === "estavel" && "text-muted-foreground",
            )}
          >
            <TrendIcon className="size-4" aria-hidden="true" />
            {metrica.tendencia.percentual.toLocaleString("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex h-40 items-end justify-center gap-8 sm:gap-16">
          {barras.map(({ label, valor, cor }) => {
            const alturaPct = Math.max(6, Math.round((valor / maxValor) * 100));
            return (
              <div
                key={label}
                data-demo-id={`dashboard-faturamento-barra-${label === "Período atual" ? "atual" : "anterior"}`}
                className="flex h-full w-24 flex-col items-center justify-end gap-1.5"
              >
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {formatCompactBRL(valor)}
                </span>
                <div className="flex h-full w-full items-end">
                  <div
                    className={`w-full rounded-t-md ${cor}`}
                    style={{ height: `${alturaPct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
