import type { CalendarEventStatus, TipoEvento } from "@/types";

/**
 * Mapeia cada `CalendarEventStatus` para classes Tailwind (tokens do tema —
 * nunca hex cru) usadas no indicador do dia, badge de status, etc.
 * Semântica escolhida: confirmado = sucesso (verde), reservado = atenção
 * (laranja da marca), bloqueado = indisponível (vermelho).
 */
export const STATUS_INFO: Record<
  CalendarEventStatus,
  { label: string; dot: string; badge: string }
> = {
  confirmado: {
    label: "Confirmado",
    dot: "bg-success",
    badge: "bg-success/15 text-success border-success/30",
  },
  reservado: {
    label: "Reservado",
    dot: "bg-warning",
    badge: "bg-warning/15 text-warning border-warning/30",
  },
  bloqueado: {
    label: "Bloqueado",
    dot: "bg-destructive",
    badge: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

export const TIPO_EVENTO_LABEL: Record<TipoEvento, string> = {
  casamento: "Casamento",
  aniversario: "Aniversário",
  corporativo: "Corporativo",
  formatura: "Formatura",
  outro: "Outro",
};
