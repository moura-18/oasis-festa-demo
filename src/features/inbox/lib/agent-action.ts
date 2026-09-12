import type { AgentActionNome } from "@/types";

/**
 * Rótulo curto (pt-BR) exibido acima do texto da ação, no card discreto de
 * `tipo: "acao_agente"` — ver `AgentActionCard`.
 */
export const AGENT_ACTION_LABELS: Record<AgentActionNome, string> = {
  check_availability: "Consulta de disponibilidade",
  search_knowledge_base: "Base de conhecimento",
  notify_owner: "Notificação à atendente",
  generate_contract_draft: "Geração de contrato",
};
