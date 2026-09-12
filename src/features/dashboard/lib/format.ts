import type { DashboardMetricUnidade } from "@/types";

/** Formata o valor de uma métrica de acordo com sua unidade (pt-BR). */
export function formatMetricValue(
  valor: number,
  unidade: DashboardMetricUnidade,
): string {
  switch (unidade) {
    case "BRL":
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      });
    case "percentual":
      return `${valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
    case "dias":
      return `${valor.toLocaleString("pt-BR")} dias`;
    case "numero":
      return valor.toLocaleString("pt-BR");
  }
}

/** Compacta um valor BRL para exibição em espaços apertados (ex.: gráficos). */
export function formatCompactBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  });
}
