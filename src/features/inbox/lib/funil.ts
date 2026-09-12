import type { LeadFunilEstado } from "@/types";

/**
 * Rótulo curto (pt-BR) de cada estado do funil, para exibir em badges no
 * Inbox (lista de conversas e cabeçalho do chat).
 */
const FUNIL_LABELS: Record<LeadFunilEstado, string> = {
  novo: "Novo",
  qualificando: "Qualificando",
  aguardando_disponibilidade: "Aguard. disponibilidade",
  tirando_duvidas: "Tirando dúvidas",
  pronto_para_fechar: "Pronto para fechar",
  aguardando_dona: "Aguardando atendente",
  contrato_enviado: "Contrato enviado",
  confirmado: "Confirmado",
  perdido: "Perdido",
};

/**
 * Classes Tailwind (tokens de marca, nunca hex cru) por estado do funil.
 * Estados mais "quentes" (perto do fechamento / aguardando decisão humana)
 * usam laranja, coerente com o racional de BRAND.md.
 */
const FUNIL_BADGE_CLASSES: Record<LeadFunilEstado, string> = {
  novo: "bg-muted text-muted-foreground",
  qualificando: "bg-secondary text-secondary-foreground",
  aguardando_disponibilidade: "bg-accent text-accent-foreground",
  tirando_duvidas: "bg-accent text-accent-foreground",
  pronto_para_fechar: "bg-warning text-warning-foreground",
  aguardando_dona: "bg-primary text-primary-foreground",
  contrato_enviado: "bg-brand-green-700 text-white",
  confirmado: "bg-success text-success-foreground",
  perdido: "border border-destructive/30 bg-destructive/10 text-destructive",
};

export function funilLabel(estado: LeadFunilEstado): string {
  return FUNIL_LABELS[estado];
}

export function funilBadgeClass(estado: LeadFunilEstado): string {
  return FUNIL_BADGE_CLASSES[estado];
}
