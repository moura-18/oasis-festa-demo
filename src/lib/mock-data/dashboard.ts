import type { DashboardData } from "@/types";

/**
 * Métricas plausíveis do Dashboard. `funilConversao` reflete a distribuição
 * atual dos 10 leads de `leads.ts` entre os 9 estados; `fluxoPorDiaSemana`
 * reflete a contagem de eventos "reservado"/"confirmado" (excluindo
 * "bloqueado") por dia da semana em `calendar-events.ts`.
 */
export const dashboardData: DashboardData = {
  metricas: [
    {
      id: "faturamento_medio",
      label: "Faturamento médio por evento",
      valor: 32500,
      unidade: "BRL",
      tendencia: { direcao: "alta", percentual: 14.2 },
      descricao: "Ticket médio dos últimos 6 contratos fechados",
    },
    {
      id: "taxa_conversao_funil",
      label: "Taxa de conversão do funil",
      valor: 38.5,
      unidade: "percentual",
      tendencia: { direcao: "alta", percentual: 5.1 },
      descricao: "Leads que avançam de 'novo' até 'confirmado'",
    },
    {
      id: "tempo_medio_fechamento",
      label: "Tempo médio até o fechamento",
      valor: 18,
      unidade: "dias",
      tendencia: { direcao: "baixa", percentual: 3 },
      descricao: "Do primeiro contato até a assinatura do contrato",
    },
    {
      id: "dias_ociosos",
      label: "Dias ociosos na agenda",
      valor: 38,
      unidade: "dias",
      tendencia: { direcao: "baixa", percentual: 8 },
      descricao: "Sem evento nem bloqueio nos próximos 60 dias",
    },
    {
      id: "leads_ativos",
      label: "Leads ativos no funil",
      valor: 8,
      unidade: "numero",
      descricao: "Em andamento — exclui 'confirmado' e 'perdido'",
    },
    {
      id: "ticket_medio",
      label: "Ticket médio estimado (funil atual)",
      valor: 28000,
      unidade: "BRL",
      tendencia: { direcao: "estavel", percentual: 0.8 },
      descricao: "Valor estimado médio dos leads em andamento",
    },
  ],
  funilConversao: [
    { estado: "novo", quantidade: 1 },
    { estado: "qualificando", quantidade: 2 },
    { estado: "aguardando_disponibilidade", quantidade: 1 },
    { estado: "tirando_duvidas", quantidade: 1 },
    { estado: "pronto_para_fechar", quantidade: 1 },
    { estado: "aguardando_dona", quantidade: 1 },
    { estado: "contrato_enviado", quantidade: 1 },
    { estado: "confirmado", quantidade: 1 },
    { estado: "perdido", quantidade: 1 },
  ],
  fluxoPorDiaSemana: [
    { diaSemana: "dom", eventos: 8 },
    { diaSemana: "seg", eventos: 0 },
    { diaSemana: "ter", eventos: 0 },
    { diaSemana: "qua", eventos: 0 },
    { diaSemana: "qui", eventos: 0 },
    { diaSemana: "sex", eventos: 0 },
    { diaSemana: "sab", eventos: 10 },
  ],
};
