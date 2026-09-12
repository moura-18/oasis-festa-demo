import type { Message } from "@/types";
import { NOME_ATENDENTE } from "./leads";

/**
 * Conversas mockadas, uma por lead (`leads.ts`), condizentes com o estado
 * atual de cada um no funil. Servem de referência de UX para o Inbox:
 * mensagens de texto normais, ações do agente (`tipo: "acao_agente"`) e a
 * escalação para a atendente (`tipo: "escalacao"`) devem ser visualmente
 * distintas — ver CONTRIBUTING.md.
 */
export const messages: Message[] = [
  // --- lead-01 · Camila Duarte · novo -------------------------------------
  {
    id: "msg-01-01",
    leadId: "lead-01",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "Oi! Vi o perfil de vocês no Instagram, é lindo o espaço 😍 Queria saber mais sobre pacotes de casamento",
    timestamp: "2026-09-11T09:12:00",
  },
  {
    id: "msg-01-02",
    leadId: "lead-01",
    autor: "agente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "Oi Camila! Que alegria seu interesse 💚 Somos a Oásis Festas, espaço para casamentos ao ar livre aqui em BH. Pode me contar um pouco: vocês já têm uma data em mente e uma ideia do número de convidados?",
    timestamp: "2026-09-11T09:15:00",
  },

  // --- lead-02 · Rafael Nogueira · qualificando ---------------------------
  {
    id: "msg-02-01",
    leadId: "lead-02",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Boa tarde, gostaria de orçar um espaço para uma festa de confraternização da empresa",
    timestamp: "2026-09-08T14:20:00",
  },
  {
    id: "msg-02-02",
    leadId: "lead-02",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Boa tarde, Rafael! Show, vamos te ajudar 🙂 Pra eu entender melhor: qual a data prevista, quantos convidados aproximadamente, e o evento é diurno ou noturno?",
    timestamp: "2026-09-08T14:26:00",
  },
  {
    id: "msg-02-03",
    leadId: "lead-02",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Pensamos em 5 de dezembro, à noite, umas 80 pessoas",
    timestamp: "2026-09-08T15:02:00",
  },
  {
    id: "msg-02-04",
    leadId: "lead-02",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Perfeito! Só mais um detalhe pra eu montar a proposta certinha: vocês já têm ideia de buffet (jantar sentado, coquetel...) ou ainda estão decidindo?",
    timestamp: "2026-09-10T11:30:00",
  },
  {
    id: "msg-02-05",
    leadId: "lead-02",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Ainda decidindo, pode sugerir?",
    timestamp: "2026-09-10T11:47:00",
  },

  // --- lead-03 · Beatriz & Lucas · aguardando_disponibilidade -------------
  {
    id: "msg-03-01",
    leadId: "lead-03",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "Oi! Estamos procurando espaço pro nosso casamento, seria dia 14/11 ou 21/11 (temos flexibilidade), umas 150 pessoas",
    timestamp: "2026-09-05T16:00:00",
  },
  {
    id: "msg-03-02",
    leadId: "lead-03",
    autor: "agente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "Que demais, parabéns pelo noivado! 💍 Vou verificar a disponibilidade das duas datas pra vocês, só um instante",
    timestamp: "2026-09-05T16:03:00",
  },
  {
    id: "msg-03-03",
    leadId: "lead-03",
    autor: "agente",
    canal: "instagram",
    tipo: "acao_agente",
    texto: "🔍 Agente verificou disponibilidade para 14/11 → Indisponível",
    timestamp: "2026-09-05T16:04:00",
    acao: {
      id: "action-03-01",
      nome: "check_availability",
      parametros: { data: "2026-11-14" },
      resultado: "Indisponível — data já reservada",
      timestamp: "2026-09-05T16:04:00",
    },
  },
  {
    id: "msg-03-04",
    leadId: "lead-03",
    autor: "agente",
    canal: "instagram",
    tipo: "acao_agente",
    texto: "🔍 Agente verificou disponibilidade para 21/11 → Disponível",
    timestamp: "2026-09-05T16:05:00",
    acao: {
      id: "action-03-02",
      nome: "check_availability",
      parametros: { data: "2026-11-21" },
      resultado: "Disponível (sujeito à confirmação de bloqueios internos)",
      timestamp: "2026-09-05T16:05:00",
    },
  },
  {
    id: "msg-03-05",
    leadId: "lead-03",
    autor: "agente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "O dia 14/11 já está reservado, mas o dia 21/11 aparece disponível no nosso calendário! Só preciso confirmar com a equipe se não há nenhum bloqueio de manutenção agendado pra essa data — te aviso assim que confirmar, ok?",
    timestamp: "2026-09-09T10:30:00",
  },

  // --- lead-04 · Fernanda Lima · tirando_duvidas --------------------------
  {
    id: "msg-04-01",
    leadId: "lead-04",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Oi, queria saber se o espaço já vem com estrutura de som e iluminação ou precisamos contratar à parte",
    timestamp: "2026-08-30T13:10:00",
  },
  {
    id: "msg-04-02",
    leadId: "lead-04",
    autor: "agente",
    canal: "whatsapp",
    tipo: "acao_agente",
    texto: "📋 Agente consultou a base de conhecimento sobre som e iluminação",
    timestamp: "2026-08-30T13:11:00",
    acao: {
      id: "action-04-01",
      nome: "search_knowledge_base",
      parametros: { termo: "som e iluminação" },
      resultado: "3 artigos encontrados",
      timestamp: "2026-08-30T13:11:00",
    },
  },
  {
    id: "msg-04-03",
    leadId: "lead-04",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Ótima pergunta! O espaço já conta com estrutura básica de som ambiente e iluminação de jardim inclusas no pacote. Pra pista de dança com efeitos e som profissional de festa, indicamos parceiros externos — posso te passar os contatos se quiser 🙂",
    timestamp: "2026-08-30T13:13:00",
  },
  {
    id: "msg-04-04",
    leadId: "lead-04",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Perfeito! E sobre buffet, é obrigatório ser de vocês ou podemos levar buffet próprio?",
    timestamp: "2026-09-10T19:00:00",
  },
  {
    id: "msg-04-05",
    leadId: "lead-04",
    autor: "agente",
    canal: "whatsapp",
    tipo: "acao_agente",
    texto: "📋 Agente consultou a base de conhecimento sobre buffet externo",
    timestamp: "2026-09-10T19:02:00",
    acao: {
      id: "action-04-02",
      nome: "search_knowledge_base",
      parametros: { termo: "buffet externo" },
      resultado: "2 artigos encontrados",
      timestamp: "2026-09-10T19:02:00",
    },
  },
  {
    id: "msg-04-06",
    leadId: "lead-04",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Trabalhamos com uma lista de buffets parceiros já credenciados no espaço, mas buffet externo também é permitido mediante uma taxa de utilização da cozinha. Quer que eu te envie a lista de parceiros?",
    timestamp: "2026-09-10T19:04:00",
  },
  {
    id: "msg-04-07",
    leadId: "lead-04",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Sim, por favor!",
    timestamp: "2026-09-10T19:05:00",
  },

  // --- lead-05 · Marcos Antunes · pronto_para_fechar ----------------------
  {
    id: "msg-05-01",
    leadId: "lead-05",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto: "Gostaria de fechar a formatura pro dia 28/11! Confirmam a disponibilidade?",
    timestamp: "2026-09-11T15:30:00",
  },
  {
    id: "msg-05-02",
    leadId: "lead-05",
    autor: "agente",
    canal: "instagram",
    tipo: "acao_agente",
    texto: "🔍 Agente verificou disponibilidade para 28/11 → Disponível",
    timestamp: "2026-09-11T15:32:00",
    acao: {
      id: "action-05-01",
      nome: "check_availability",
      parametros: { data: "2026-11-28" },
      resultado: "Disponível",
      timestamp: "2026-09-11T15:32:00",
    },
  },
  {
    id: "msg-05-03",
    leadId: "lead-05",
    autor: "agente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "Disponível sim! 🎉 Com 200 convidados e o pacote completo que conversamos, o valor fica em R$ 55.000, com 30% de entrada. Posso encaminhar para nossa equipe finalizar os detalhes e te enviar o contrato?",
    timestamp: "2026-09-11T15:35:00",
  },
  {
    id: "msg-05-04",
    leadId: "lead-05",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto: "Pode sim, quero fechar!",
    timestamp: "2026-09-11T15:40:00",
  },

  // --- lead-06 · Juliana & Thiago · pronto_para_fechar → aguardando_dona
  // (a conversa já qualifica, checa disponibilidade e escala; o Modo Demo
  // move o card no CRM ao vivo depois da escalação — ver features/demo/script.ts) ----
  {
    id: "msg-06-01",
    leadId: "lead-06",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Oi! Vimos o espaço de vocês e amamos 😍 Queremos casar dia 10/10, somos em torno de 180 convidados",
    timestamp: "2026-08-15T09:30:00",
  },
  {
    id: "msg-06-02",
    leadId: "lead-06",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Que alegria, Juliana! 💚 Vou verificar a disponibilidade do dia 10/10 pra vocês",
    timestamp: "2026-08-15T09:33:00",
  },
  {
    id: "msg-06-03",
    leadId: "lead-06",
    autor: "agente",
    canal: "whatsapp",
    tipo: "acao_agente",
    texto: "🔍 Agente verificou disponibilidade para 10/10 → Disponível",
    timestamp: "2026-08-15T09:34:00",
    acao: {
      id: "action-06-01",
      nome: "check_availability",
      parametros: { data: "2026-10-10" },
      resultado: "Disponível",
      timestamp: "2026-08-15T09:34:00",
    },
  },
  {
    id: "msg-06-04",
    leadId: "lead-06",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Disponível! Baseado no número de convidados e no pacote completo (cerimônia + recepção + buffet), o investimento fica em torno de R$ 48.000. Ficaram com alguma dúvida sobre o que está incluso?",
    timestamp: "2026-08-15T09:36:00",
  },
  {
    id: "msg-06-05",
    leadId: "lead-06",
    autor: "agente",
    canal: "whatsapp",
    tipo: "acao_agente",
    texto: "📋 Agente consultou a base de conhecimento sobre o pacote completo de casamento",
    timestamp: "2026-08-20T18:10:00",
    acao: {
      id: "action-06-02",
      nome: "search_knowledge_base",
      parametros: { termo: "pacote completo casamento" },
      resultado: "4 artigos encontrados",
      timestamp: "2026-08-20T18:10:00",
    },
  },
  {
    id: "msg-06-06",
    leadId: "lead-06",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Perfeito, já amamos tudo! Como fazemos pra fechar?",
    timestamp: "2026-09-11T16:15:00",
  },
  {
    id: "msg-06-07",
    leadId: "lead-06",
    autor: "agente",
    canal: "whatsapp",
    tipo: "escalacao",
    texto: `🔔 Agente escalou para ${NOME_ATENDENTE}: lead pronto para fechar, casamento em 10/10, 180 convidados, R$ 48.000`,
    timestamp: "2026-09-11T16:20:00",
    acao: {
      id: "action-06-03",
      nome: "notify_owner",
      parametros: {
        leadId: "lead-06",
        resumo: "Casamento 10/10, 180 convidados, R$ 48.000",
      },
      resultado: `Notificação enviada para ${NOME_ATENDENTE}`,
      timestamp: "2026-09-11T16:20:00",
    },
  },

  // --- lead-07 · Patrícia Souza · contrato_enviado ------------------------
  {
    id: "msg-07-01",
    leadId: "lead-07",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto: "Oi, sou eu de novo! Já dá pra confirmar que fechamos pro dia 26/09?",
    timestamp: "2026-09-09T17:00:00",
  },
  {
    id: "msg-07-02",
    leadId: "lead-07",
    autor: "atendente",
    canal: "instagram",
    tipo: "texto",
    texto: "Oi Patrícia! Confirmadíssimo 🎉 Já vou preparar o contrato de vocês para assinatura",
    timestamp: "2026-09-09T17:08:00",
  },
  {
    id: "msg-07-03",
    leadId: "lead-07",
    autor: "agente",
    canal: "instagram",
    tipo: "acao_agente",
    texto: "📄 Agente gerou o rascunho do contrato",
    timestamp: "2026-09-09T17:10:00",
    acao: {
      id: "action-07-01",
      nome: "generate_contract_draft",
      parametros: { leadId: "lead-07", tipoEvento: "aniversario" },
      resultado: "Rascunho de contrato gerado",
      timestamp: "2026-09-09T17:10:00",
    },
  },
  {
    id: "msg-07-04",
    leadId: "lead-07",
    autor: "atendente",
    canal: "instagram",
    tipo: "texto",
    texto: "Segue o contrato para assinatura! Qualquer dúvida me chama por aqui mesmo 💚",
    timestamp: "2026-09-09T17:15:00",
  },

  // --- lead-08 · Larissa & Bruno · confirmado -----------------------------
  {
    id: "msg-08-01",
    leadId: "lead-08",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Oi Renata! Passando só pra confirmar que já assinamos o contrato e está tudo certo pro dia 19/09 😊",
    timestamp: "2026-09-05T11:50:00",
  },
  {
    id: "msg-08-02",
    leadId: "lead-08",
    autor: "atendente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Isso mesmo, Larissa! Contrato assinado, data confirmada só para vocês 💚",
    timestamp: "2026-09-05T11:55:00",
  },
  {
    id: "msg-08-03",
    leadId: "lead-08",
    autor: "agente",
    canal: "whatsapp",
    tipo: "acao_agente",
    texto: "📄 Contrato assinado — evento confirmado e bloqueado na agenda para 19/09",
    timestamp: "2026-09-05T12:00:00",
    acao: {
      id: "action-08-01",
      nome: "generate_contract_draft",
      parametros: { leadId: "lead-08", status: "assinado" },
      resultado: "Contrato finalizado — evento confirmado na agenda",
      timestamp: "2026-09-05T12:00:00",
    },
  },

  // --- lead-09 · Diego Ramos · perdido -------------------------------------
  {
    id: "msg-09-01",
    leadId: "lead-09",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Oi, gostaria de orçar um espaço pra um evento corporativo dia 01/10, uns 50 convidados",
    timestamp: "2026-08-25T15:30:00",
  },
  {
    id: "msg-09-02",
    leadId: "lead-09",
    autor: "agente",
    canal: "whatsapp",
    tipo: "acao_agente",
    texto: "🔍 Agente verificou disponibilidade para 01/10 → Disponível",
    timestamp: "2026-08-25T15:32:00",
    acao: {
      id: "action-09-01",
      nome: "check_availability",
      parametros: { data: "2026-10-01" },
      resultado: "Disponível",
      timestamp: "2026-08-25T15:32:00",
    },
  },
  {
    id: "msg-09-03",
    leadId: "lead-09",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Disponível! Pra 50 convidados com o pacote corporativo, o valor fica em torno de R$ 9.000. Quer que eu já adiante os próximos passos?",
    timestamp: "2026-08-25T15:34:00",
  },
  {
    id: "msg-09-04",
    leadId: "lead-09",
    autor: "cliente",
    canal: "whatsapp",
    tipo: "texto",
    texto: "Poxa, tá acima do nosso orçamento, vamos ver outras opções. Obrigado!",
    timestamp: "2026-09-02T09:45:00",
  },
  {
    id: "msg-09-05",
    leadId: "lead-09",
    autor: "agente",
    canal: "whatsapp",
    tipo: "texto",
    texto:
      "Sem problemas, Diego! Se quiser repensar o formato do evento pra caber no orçamento, é só chamar 💚",
    timestamp: "2026-09-02T09:50:00",
  },

  // --- lead-10 · Isabela Martins · qualificando ---------------------------
  {
    id: "msg-10-01",
    leadId: "lead-10",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto: "Boa noite! Vi vocês no Instagram, queria saber sobre disponibilidade pra 2027",
    timestamp: "2026-09-09T20:00:00",
  },
  {
    id: "msg-10-02",
    leadId: "lead-10",
    autor: "agente",
    canal: "instagram",
    tipo: "texto",
    texto:
      "Boa noite, Isabela! Que legal 💚 Vocês já têm uma data em mente pra 2027, e mais ou menos quantos convidados estão pensando?",
    timestamp: "2026-09-09T20:05:00",
  },
  {
    id: "msg-10-03",
    leadId: "lead-10",
    autor: "cliente",
    canal: "instagram",
    tipo: "texto",
    texto: "Pensamos em junho de 2027, talvez uns 90 convidados",
    timestamp: "2026-09-11T08:05:00",
  },
];
