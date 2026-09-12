import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "@/types";
import { formatMetricValue } from "../lib/format";
import { METRIC_ICON, tendenciaEhPositiva } from "../lib/metric-meta";

interface KpiCardProps {
  metrica: DashboardMetric;
}

export function KpiCard({ metrica }: KpiCardProps) {
  const Icon = METRIC_ICON[metrica.id];
  const positiva = metrica.tendencia
    ? tendenciaEhPositiva(metrica.id, metrica.tendencia.direcao)
    : null;

  const TrendIcon =
    positiva === null
      ? Minus
      : metrica.tendencia?.direcao === "estavel"
        ? Minus
        : metrica.tendencia?.direcao === "alta"
          ? TrendingUp
          : TrendingDown;

  return (
    <Card
      data-demo-id={`dashboard-kpi-${metrica.id}`}
      className="gap-3 py-5"
    >
      <CardContent className="flex items-start justify-between gap-4 px-5">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {metrica.label}
          </span>
          <span
            className="text-2xl font-semibold text-foreground"
            style={{ fontVariantNumeric: "proportional-nums" }}
          >
            {formatMetricValue(metrica.valor, metrica.unidade)}
          </span>
          {metrica.tendencia && (
            <span
              data-demo-id={`dashboard-kpi-${metrica.id}-tendencia`}
              className={cn(
                "mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium",
                positiva === true && "text-success",
                positiva === false && "text-destructive",
                positiva === null && "text-muted-foreground",
              )}
            >
              <TrendIcon className="size-3.5" aria-hidden="true" />
              {metrica.tendencia.percentual.toLocaleString("pt-BR", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
          )}
          {metrica.descricao && (
            <span className="text-xs text-muted-foreground">
              {metrica.descricao}
            </span>
          )}
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}
