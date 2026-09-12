import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ORDEM_FUNIL } from "@/types";
import type { FunilConversaoPonto } from "@/types";
import { FUNIL_ESTADO_LABEL } from "../lib/metric-meta";

interface FunilConversaoChartProps {
  dados: FunilConversaoPonto[];
  taxaConversao: number;
}

/**
 * Rampa ordinal (uma só cor, luminosidade decrescente) da escala verde da
 * marca — cada estágio do funil fica um degrau mais escuro que o anterior,
 * reforçando visualmente a progressão novo → confirmado.
 */
const RAMPA_ORDINAL = [
  "bg-brand-green-300",
  "bg-brand-green-400",
  "bg-brand-green-500",
  "bg-brand-green-600",
  "bg-brand-green-700",
  "bg-brand-green-800",
  "bg-brand-green-800",
  "bg-brand-green-900",
];

export function FunilConversaoChart({
  dados,
  taxaConversao,
}: FunilConversaoChartProps) {
  const porEstado = new Map(dados.map((p) => [p.estado, p.quantidade]));
  const estagios = ORDEM_FUNIL.map((estado, i) => ({
    estado,
    quantidade: porEstado.get(estado) ?? 0,
    cor: RAMPA_ORDINAL[i] ?? RAMPA_ORDINAL[RAMPA_ORDINAL.length - 1],
  }));
  const maxQuantidade = Math.max(1, ...estagios.map((e) => e.quantidade));

  return (
    <Card data-demo-id="dashboard-chart-funil">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Funil de conversão</CardTitle>
          <CardDescription>
            Leads por estágio, de &ldquo;novo&rdquo; até &ldquo;confirmado&rdquo;
          </CardDescription>
        </div>
        <div
          data-demo-id="dashboard-funil-taxa-conversao"
          className="text-right"
        >
          <div className="text-2xl font-semibold text-foreground">
            {taxaConversao.toLocaleString("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </div>
          <div className="text-xs text-muted-foreground">
            taxa de conversão geral
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {estagios.map(({ estado, quantidade, cor }) => {
          const larguraPct = Math.max(
            12,
            Math.round((quantidade / maxQuantidade) * 100),
          );
          return (
            <div
              key={estado}
              data-demo-id={`dashboard-funil-estagio-${estado}`}
              className="grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3 sm:grid-cols-[10rem_1fr_2.5rem]"
            >
              <span className="truncate text-sm text-muted-foreground">
                {FUNIL_ESTADO_LABEL[estado]}
              </span>
              <div className="h-6 w-full rounded-md bg-muted">
                <div
                  className={`h-6 rounded-md ${cor}`}
                  style={{ width: `${larguraPct}%` }}
                />
              </div>
              <span className="text-right text-sm font-medium tabular-nums text-foreground">
                {quantidade}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
