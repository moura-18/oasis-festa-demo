/**
 * Roteiro declarativo do "Modo Demo" — um tour guiado que percorre as 5 telas
 * do sistema contando a jornada completa de um lead: do primeiro contato no
 * Instagram/WhatsApp até o evento confirmado na agenda e os KPIs no
 * Dashboard. Ver `useDemoPlayer.ts` para o player que executa este roteiro.
 *
 * O lead-guia é o `lead-06` (Juliana & Thiago), a jornada mais completa do
 * mock data — já qualificada, com disponibilidade checada e dúvidas
 * respondidas na conversa (ver `src/lib/mock-data/leads.ts` e `messages.ts`).
 * O lead começa em "pronto_para_fechar": o próprio roteiro da demo (passos
 * `aiThinking` + `moveLead`) simula a IA lendo a conversa, "analisando" e
 * movendo o card sozinha para "aguardando_dona" no CRM — sem drag manual.
 */

import type { LeadFunilEstado } from "@/types";

export type DemoStepPosition = "top" | "bottom" | "center";

export type DemoStep =
  | { type: "navigate"; to: string }
  | { type: "moveCursorTo"; target: string; duration?: number }
  | { type: "click"; target: string }
  | { type: "highlight"; target: string }
  | {
      type: "explain";
      title: string;
      text: string;
      position?: DemoStepPosition;
    }
  | { type: "wait"; ms: number }
  /** Mostra um selo flutuante "🤖 <text>" ancorado no alvo, simulando a IA lendo/analisando antes de agir (ex.: antes de um `moveLead`). */
  | { type: "aiThinking"; target: string; text: string; duration?: number }
  /** Move um lead para outro estado do funil diretamente no store (sem drag manual) — o card anima sozinho até a nova coluna do CRM. */
  | { type: "moveLead"; leadId: string; toEstado: LeadFunilEstado };

export const demoScript: DemoStep[] = [
  { type: "navigate", to: "/inbox" },
  {
    type: "explain",
    title: "Bem-vindo à Oásis Festas BH",
    text: "Esta é a jornada completa de um lead no sistema: do primeiro contato no Instagram/WhatsApp até o evento confirmado na agenda. Vamos acompanhar o casal Juliana & Thiago sendo atendido por um agente de IA, com a atendente entrando só na hora certa.",
    position: "center",
  },
  { type: "click", target: "[data-demo-id='inbox-conversation-lead-06']" },
  { type: "highlight", target: "[data-demo-id='inbox-message-acao-agente-msg-06-03']" },
  {
    type: "explain",
    title: "Disponibilidade checada na hora",
    text: "Assim que o casal pergunta pela data, o agente já consulta a agenda sozinho e responde na hora, sem esperar alguém abrir o calendário. Isso evita perder o lead para um concorrente que responde mais rápido.",
    position: "bottom",
  },
  { type: "highlight", target: "[data-demo-id='inbox-message-acao-agente-msg-06-05']" },
  {
    type: "explain",
    title: "Dúvidas resolvidas sem esforço humano",
    text: "O agente também busca sozinho as respostas sobre o pacote completo na base de conhecimento do espaço. Dúvidas repetitivas deixam de tomar tempo da equipe.",
    position: "bottom",
  },
  {
    type: "moveCursorTo",
    target: "[data-demo-id='inbox-message-escalacao-msg-06-07']",
    duration: 1100,
  },
  { type: "highlight", target: "[data-demo-id='inbox-message-escalacao-msg-06-07']" },
  {
    type: "explain",
    title: "Escalação para a atendente: o momento humano",
    text: "Quando o cliente topa fechar, o agente NUNCA negocia ou confirma sozinho: ele escala o lead para a Renata com um resumo pronto. A decisão final de fechar negócio continua sempre nas mãos de uma pessoa.",
    position: "bottom",
  },
  { type: "navigate", to: "/crm" },
  { type: "highlight", target: "[data-demo-id='crm-card-lead-06']" },
  {
    type: "explain",
    title: "O card ainda está em \"Pronto para fechar\"",
    text: "No CRM, o lead da Juliana & Thiago ainda aparece na coluna \"Pronto para fechar\" — reflexo de onde a conversa estava antes da escalação que acabamos de ver no Inbox.",
    position: "bottom",
  },
  {
    type: "aiThinking",
    target: "[data-demo-id='crm-card-lead-06']",
    text: "Analisando conversa e decidindo a próxima etapa do funil…",
    duration: 2200,
  },
  { type: "moveLead", leadId: "lead-06", toEstado: "aguardando_dona" },
  { type: "highlight", target: "[data-demo-id='crm-coluna-aguardando_dona']" },
  {
    type: "explain",
    title: "A IA move o card sozinha",
    text: "Sem nenhum arrastar manual: assim que identifica que a conversa foi escalada, a própria IA reclassifica o lead e move o card para \"Aguardando atendente\" no funil. A Renata enxerga de cara quais negociações dependem dela, sem precisar procurar em conversas.",
    position: "bottom",
  },
  { type: "click", target: "[data-demo-id='crm-card-lead-06']" },
  { type: "highlight", target: "[data-demo-id='crm-lead-detail-painel']" },
  {
    type: "explain",
    title: "Contexto completo, sem reabrir o WhatsApp",
    text: "Um clique no card mostra os dados do evento e o histórico recente da conversa. A atendente decide rápido, sem precisar sair do CRM para relembrar o contexto.",
    position: "center",
  },
  { type: "navigate", to: "/contratos" },
  { type: "highlight", target: "[data-demo-id='contrato-preview-documento']" },
  {
    type: "explain",
    title: "Contrato pronto em segundos",
    text: "Depois da aprovação, o sistema já gera o contrato com os dados do lead — nome, data, convidados e valor — pronto para revisão e envio, sem digitação manual nem risco de erro de cópia.",
    position: "top",
  },
  { type: "navigate", to: "/agenda" },
  { type: "click", target: "[data-demo-id='agenda-mes-proximo']" },
  { type: "wait", ms: 900 },
  { type: "click", target: "[data-demo-id='agenda-dia-2026-10-10']" },
  { type: "highlight", target: "[data-demo-id='agenda-detalhe-dia-dialog']" },
  {
    type: "explain",
    title: "Data segura, sem overbooking",
    text: "O dia 10/10 já aparece reservado na agenda do casal. Como conversa, aprovação e contrato passam pelo mesmo sistema, é praticamente impossível vender a mesma data duas vezes.",
    position: "center",
  },
  { type: "navigate", to: "/dashboard" },
  { type: "highlight", target: "[data-demo-id='dashboard-chart-funil']" },
  {
    type: "explain",
    title: "O resultado: mais fechamentos, menos esforço",
    text: "No Dashboard, a Renata acompanha a taxa de conversão do funil e o tempo médio até o fechamento — os números que mostram, em tempo real, se o agente está ajudando a vender mais rápido e com menos esforço da equipe.",
    position: "center",
  },
];

/**
 * Numeração exibida ao público ("Passo X de Y") conta só os passos `explain`
 * (os "capítulos" narrados) — não os passos mecânicos entre eles
 * (moveCursorTo/highlight/click/aiThinking/moveLead/wait). Numerar pelo
 * índice bruto do array fazia o contador pular de forma confusa (ex.: "7 de
 * 32" pulando pra "11 de 32") sempre que vários passos mecânicos rodavam
 * entre dois `explain`. Aqui, cada passo mecânico "aponta" para o número do
 * próximo `explain` à frente — o contador fica parado durante a preparação
 * (cursor se movendo, destaque aparecendo) e só avança quando o próximo
 * capítulo realmente começa.
 */
function buildCheckpoints(script: DemoStep[]) {
  const startIndexByCheckpoint: number[] = [];
  const seqAtIndex = new Array<number | undefined>(script.length);
  let seq = 0;
  script.forEach((step, i) => {
    if (step.type === "explain") {
      seq += 1;
      seqAtIndex[i] = seq;
      startIndexByCheckpoint.push(i);
    }
  });
  const total = seq;
  const checkpointOfStep = new Array<number>(script.length);
  let current = total;
  for (let i = script.length - 1; i >= 0; i--) {
    if (seqAtIndex[i] !== undefined) current = seqAtIndex[i]!;
    checkpointOfStep[i] = current;
  }
  return { checkpointOfStep, startIndexByCheckpoint, total };
}

const { checkpointOfStep, startIndexByCheckpoint, total: demoCheckpointCount_ } =
  buildCheckpoints(demoScript);

/** `demoCheckpointOfStep[stepIndex]` → número do capítulo (1-based) que esse passo pertence/está construindo. */
export const demoCheckpointOfStep: readonly number[] = checkpointOfStep;
/** `demoCheckpointStartIndex[checkpointNumber - 1]` → índice no `demoScript` onde aquele capítulo (`explain`) começa. */
export const demoCheckpointStartIndex: readonly number[] = startIndexByCheckpoint;
/** Total de capítulos narrados (passos `explain`) — é o "Y" em "Passo X de Y". */
export const demoCheckpointCount = demoCheckpointCount_;
