/** Hora local curta (ex.: "16:20"), usada no rodapé das bolhas de mensagem. */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Timestamp curto e "amigável" para a lista de conversas: hora se for hoje,
 * "ontem", dia da semana se for essa semana, ou dd/mm caso contrário.
 */
export function formatRelativeShort(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) / 86_400_000,
  );

  if (diffDays === 1) return "ontem";
  if (diffDays > 1 && diffDays < 7) {
    return date.toLocaleDateString("pt-BR", { weekday: "short" });
  }
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

/** Formata uma data `YYYY-MM-DD` (sem hora) para `dd/mm/aaaa`, sem sofrer shift de timezone. */
export function formatDatePt(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

/** Valor em reais formatado como moeda BRL, sem casas decimais. */
export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
