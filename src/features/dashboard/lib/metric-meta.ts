import {
  Wallet,
  Filter,
  Clock,
  CalendarX2,
  Users,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import type { DashboardMetricId, DiaSemana, LeadFunilEstado } from "@/types";

/** Ícone de apoio de cada card de KPI. */
export const METRIC_ICON: Record<DashboardMetricId, LucideIcon> = {
  faturamento_medio: Wallet,
  taxa_conversao_funil: Filter,
  tempo_medio_fechamento: Clock,
  dias_ociosos: CalendarX2,
  leads_ativos: Users,
  ticket_medio: Receipt,
};

/**
 * Métricas em que uma tendência de "baixa" é uma boa notícia (ex.: menos dias
 * ociosos, fechamento mais rápido). Usado para colorir o indicador de
 * tendência corretamente — nas demais, "alta" é que é positiva.
 */
const METRICAS_ONDE_BAIXA_E_BOA: ReadonlySet<DashboardMetricId> = new Set([
  "tempo_medio_fechamento",
  "dias_ociosos",
]);

export function tendenciaEhPositiva(
  metricaId: DashboardMetricId,
  direcao: "alta" | "baixa" | "estavel",
): boolean | null {
  if (direcao === "estavel") return null;
  const baixaEhBoa = METRICAS_ONDE_BAIXA_E_BOA.has(metricaId);
  return baixaEhBoa ? direcao === "baixa" : direcao === "alta";
}

/** Rótulo curto (pt-BR) para cada estado do funil, usado no gráfico de funil. */
export const FUNIL_ESTADO_LABEL: Record<LeadFunilEstado, string> = {
  novo: "Novo",
  qualificando: "Qualificando",
  aguardando_disponibilidade: "Aguard. disponibilidade",
  tirando_duvidas: "Tirando dúvidas",
  pronto_para_fechar: "Pronto p/ fechar",
  aguardando_dona: "Aguard. aprovação",
  contrato_enviado: "Contrato enviado",
  confirmado: "Confirmado",
  perdido: "Perdido",
};

/** Rótulo por extenso (pt-BR) de cada dia da semana abreviado. */
export const DIA_SEMANA_LABEL: Record<DiaSemana, string> = {
  dom: "Domingo",
  seg: "Segunda",
  ter: "Terça",
  qua: "Quarta",
  qui: "Quinta",
  sex: "Sexta",
  sab: "Sábado",
};

/** Ordem canônica de exibição da semana (domingo a sábado). */
export const ORDEM_SEMANA: readonly DiaSemana[] = [
  "dom",
  "seg",
  "ter",
  "qua",
  "qui",
  "sex",
  "sab",
];
