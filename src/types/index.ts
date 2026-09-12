/**
 * Tipos centrais do domínio — Oásis Festas BH (demo de agente de IA).
 *
 * Este arquivo é o CONTRATO entre a fundação (Fase 0) e as telas construídas
 * pelos agentes da Fase 1 (Inbox, CRM, Agenda, Contratos, Dashboard). Ele não
 * deve ser editado pelas fases seguintes — ver ARCHITECTURE.md.
 *
 * Contexto de produto: um agente de IA atende Instagram e WhatsApp de um
 * espaço de eventos. Ele qualifica o lead, checa disponibilidade, tira
 * dúvidas via base de conhecimento e, quando o cliente está pronto para
 * fechar, ESCALA para a atendente do espaço (human-in-the-loop). O agente nunca
 * fecha venda, negocia desconto fora de faixa ou cancela sozinho.
 */

// ---------------------------------------------------------------------------
// Canais e enums básicos
// ---------------------------------------------------------------------------

/** Canal de mensageria pelo qual o lead entrou em contato. */
export type Canal = "whatsapp" | "instagram";

/**
 * Tipo de evento que o lead deseja realizar no espaço. Cobre o escopo do
 * produto (festas, corporativo, casamentos) com um fallback genérico.
 */
export type TipoEvento =
  | "casamento"
  | "aniversario"
  | "corporativo"
  | "formatura"
  | "outro";

/**
 * Estado do lead no funil de atendimento/vendas. União fechada e EXATA —
 * todas as telas (CRM em especial) devem tratar estes 9 valores, nesta
 * grafia, sem adicionar nem remover estados.
 *
 * Fluxo esperado (feliz):
 * novo → qualificando → aguardando_disponibilidade → tirando_duvidas →
 * pronto_para_fechar → aguardando_dona → contrato_enviado → confirmado
 *
 * "perdido" pode ser alcançado a partir de qualquer estado intermediário.
 */
export type LeadFunilEstado =
  | "novo"
  | "qualificando"
  | "aguardando_disponibilidade"
  | "tirando_duvidas"
  | "pronto_para_fechar"
  | "aguardando_dona"
  | "contrato_enviado"
  | "confirmado"
  | "perdido";

/** Ordem canônica das colunas do Kanban de CRM (exclui "perdido" de propósito — ver LeadFunilEstado e o prompt da Fase 1/CRM, que trata "perdido" como coluna/filtro à parte para não poluir o board principal). */
export const ORDEM_FUNIL: readonly Exclude<LeadFunilEstado, "perdido">[] = [
  "novo",
  "qualificando",
  "aguardando_disponibilidade",
  "tirando_duvidas",
  "pronto_para_fechar",
  "aguardando_dona",
  "contrato_enviado",
  "confirmado",
] as const;

// ---------------------------------------------------------------------------
// Lead
// ---------------------------------------------------------------------------

/** Dados do evento desejado por um lead — usados também no merge do contrato. */
export interface LeadEvento {
  tipo: TipoEvento;
  /** Data desejada pelo cliente, ISO 8601 (`YYYY-MM-DD`). Pode ainda não ter sido confirmada como disponível. */
  dataDesejada: string;
  convidados: number;
  /** Valor estimado em reais (BRL), pode mudar até o fechamento. */
  valorEstimado: number;
}

/**
 * Um lead capturado pelo agente de IA via WhatsApp ou Instagram.
 */
export interface Lead {
  id: string;
  nome: string;
  /** Telefone (WhatsApp) ou @handle (Instagram), conforme `canal`. */
  contato: string;
  canal: Canal;
  estado: LeadFunilEstado;
  evento: LeadEvento;
  /** URL de avatar/foto de perfil, opcional — usado em Inbox/CRM para exibição. */
  avatarUrl?: string;
  /** Timestamp ISO 8601 de criação do lead (primeiro contato). */
  criadoEm: string;
  /** Timestamp ISO 8601 da última mensagem trocada (de qualquer autor) — usado para ordenar o Inbox e calcular "tempo desde a última interação" no CRM. */
  ultimaMensagemEm: string;
}

// ---------------------------------------------------------------------------
// AgentAction — "tool calls" visíveis na conversa
// ---------------------------------------------------------------------------

/**
 * Nome das ações (tool calls) que o agente de IA pode executar. Fechado de
 * propósito para o escopo da demo — refletem exatamente as capacidades
 * descritas no produto: consultar disponibilidade, consultar a base de
 * conhecimento, escalar para a atendente e gerar rascunho de contrato.
 */
export type AgentActionNome =
  | "check_availability"
  | "search_knowledge_base"
  | "notify_owner"
  | "generate_contract_draft";

/**
 * Representa uma chamada de ferramenta (tool call) feita pelo agente durante
 * a conversa. É renderizada na UI do Inbox como um card discreto (ação
 * normal) ou em destaque (quando é uma escalação via `notify_owner`) — ver
 * `Message.tipo`.
 */
export interface AgentAction {
  id: string;
  nome: AgentActionNome;
  /** Parâmetros passados à ferramenta (ex.: `{ data: "2026-12-15" }`). Valores simples o suficiente para renderizar direto na UI. */
  parametros: Record<string, string | number | boolean>;
  /** Resultado em texto curto, pronto para exibição (ex.: "Disponível", "3 artigos encontrados"). */
  resultado: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Message
// ---------------------------------------------------------------------------

/** Quem escreveu/originou a mensagem. */
export type MensagemAutor = "cliente" | "agente" | "atendente";

/**
 * Tipo de mensagem, usado para diferenciar visualmente a conversa:
 * - "texto": mensagem comum de texto (de qualquer autor).
 * - "acao_agente": o agente executou uma tool call (ver `acao`) — renderizada
 *   como um card discreto tipo "🔍 Agente verificou disponibilidade".
 * - "escalacao": o agente acionou a atendente (`notify_owner`) — renderizada com
 *   destaque visual forte, pois é o momento-chave de human-in-the-loop.
 */
export type MensagemTipo = "texto" | "acao_agente" | "escalacao";

/**
 * Uma mensagem dentro da conversa de um lead (WhatsApp ou Instagram).
 */
export interface Message {
  id: string;
  leadId: string;
  autor: MensagemAutor;
  canal: Canal;
  /** Texto exibido na bolha/card da mensagem. Para tipo "acao_agente"/"escalacao", é o resumo amigável (ex.: "🔔 Agente escalou para Renata: lead pronto para fechar..."). */
  texto: string;
  timestamp: string;
  tipo: MensagemTipo;
  /** Presente quando `tipo` é "acao_agente" ou "escalacao" — contém os detalhes estruturados da tool call por trás da mensagem. */
  acao?: AgentAction;
}

// ---------------------------------------------------------------------------
// CalendarEvent
// ---------------------------------------------------------------------------

/**
 * Status de um evento na agenda:
 * - "reservado": data segurada para um lead (ainda não confirmado/pago).
 * - "confirmado": evento fechado e confirmado (contrato assinado).
 * - "bloqueado": data indisponível por outro motivo (manutenção, evento
 *   particular fora do funil, etc.) — pode não ter `leadId`.
 */
export type CalendarEventStatus = "reservado" | "confirmado" | "bloqueado";

export interface CalendarEvent {
  id: string;
  /** `null` para bloqueios sem lead associado (ex.: manutenção do espaço). */
  leadId: string | null;
  /** Data do evento, ISO 8601 (`YYYY-MM-DD`). */
  data: string;
  tipo: TipoEvento;
  status: CalendarEventStatus;
  /** Rótulo curto opcional, útil para blocos sem lead (ex.: "Manutenção do jardim"). */
  titulo?: string;
}

// ---------------------------------------------------------------------------
// Contract
// ---------------------------------------------------------------------------

export type ContractStatus = "rascunho" | "enviado" | "assinado";

/**
 * Dados de evento usados no merge de variáveis do template de contrato.
 * Deliberadamente "achatado" (em vez de reaproveitar `LeadEvento`) porque o
 * contrato pode conter campos que não existem no lead original (forma de
 * pagamento, cláusulas escolhidas) e valores podem ter sido ajustados entre
 * a negociação e o fechamento.
 */
export interface ContractDados {
  nomeCliente: string;
  tipoEvento: TipoEvento;
  /** Data do evento, ISO 8601 (`YYYY-MM-DD`). */
  data: string;
  convidados: number;
  valorTotal: number;
  formaPagamento: string;
  /** Cláusulas/itens opcionais inclusos (ex.: "Buffet completo", "Decoração temática"). */
  clausulasInclusas: string[];
}

/**
 * Um contrato gerado a partir do template com merge de variáveis, atrelado
 * a um lead que já passou pela aprovação da atendente.
 */
export interface Contract {
  id: string;
  leadId: string;
  dados: ContractDados;
  status: ContractStatus;
  /** Texto final do contrato já com as variáveis substituídas (preview em formato de documento). */
  textoPreview: string;
  criadoEm: string;
  atualizadoEm: string;
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

/**
 * Identificador de cada métrica do dashboard. União fechada para que os
 * cards de KPI possam aplicar formatação/ícone específico por métrica.
 */
export type DashboardMetricId =
  | "faturamento_medio"
  | "taxa_conversao_funil"
  | "tempo_medio_fechamento"
  | "dias_ociosos"
  | "leads_ativos"
  | "ticket_medio";

/** Unidade de exibição de uma métrica — orienta a formatação do valor na UI. */
export type DashboardMetricUnidade = "BRL" | "percentual" | "dias" | "numero";

export interface DashboardMetricTendencia {
  direcao: "alta" | "baixa" | "estavel";
  /** Variação percentual em relação ao período anterior (ex.: 12.5 = +12,5%). */
  percentual: number;
}

/** Um KPI individual exibido como card no topo do Dashboard. */
export interface DashboardMetric {
  id: DashboardMetricId;
  label: string;
  valor: number;
  unidade: DashboardMetricUnidade;
  tendencia?: DashboardMetricTendencia;
  /** Frase curta de apoio/contexto, opcional (ex.: "Últimos 60 dias"). */
  descricao?: string;
}

/** Um ponto do funil de conversão (quantidade de leads que passaram por cada estado). */
export interface FunilConversaoPonto {
  estado: LeadFunilEstado;
  quantidade: number;
}

/** Dia da semana abreviado (pt-BR), usado no gráfico de fluxo por dia da semana. */
export type DiaSemana = "dom" | "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

export interface FluxoPorDiaSemana {
  diaSemana: DiaSemana;
  /** Quantidade de eventos (reservado + confirmado) historicamente realizados/agendados nesse dia da semana. */
  eventos: number;
}

/**
 * Agregado completo consumido pela tela de Dashboard: KPIs + dados para os
 * gráficos de funil de conversão e fluxo por dia da semana.
 */
export interface DashboardData {
  metricas: DashboardMetric[];
  funilConversao: FunilConversaoPonto[];
  fluxoPorDiaSemana: FluxoPorDiaSemana[];
}
