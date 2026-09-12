/**
 * Helpers de formatação locais ao CRM — sem estado, sem dependência de UI.
 */

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatMoedaBRL(valor: number): string {
  return currencyFormatter.format(valor);
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Formata uma data `YYYY-MM-DD` (sem componente de hora) como `dd/mm/aaaa`. */
export function formatDataBR(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
}

/**
 * Formata o tempo decorrido desde `isoTimestamp` até agora em texto curto
 * pt-BR (ex.: "há 5 min", "há 3 h", "há 2 dias"). Usado no card do lead para
 * "tempo desde a última interação".
 */
export function formatTempoDecorrido(
  isoTimestamp: string,
  agora: Date = new Date(),
): string {
  const entao = new Date(isoTimestamp).getTime();
  const diffMs = Math.max(0, agora.getTime() - entao);
  const diffMin = Math.round(diffMs / 60_000);

  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} min`;

  const diffHoras = Math.round(diffMin / 60);
  if (diffHoras < 24) return `há ${diffHoras} h`;

  const diffDias = Math.round(diffHoras / 24);
  if (diffDias < 30) return `há ${diffDias} ${diffDias === 1 ? "dia" : "dias"}`;

  const diffMeses = Math.round(diffDias / 30);
  return `há ${diffMeses} ${diffMeses === 1 ? "mês" : "meses"}`;
}
