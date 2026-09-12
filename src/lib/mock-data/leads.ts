import type { Lead } from "@/types";

/**
 * Nome da atendente/gerente do espaço — usado consistentemente como autora das
 * mensagens `autor: "atendente"` e nas menções de escalação em todo o mock data.
 */
export const NOME_ATENDENTE = "Renata Oliveira";

/**
 * 10 leads cobrindo os 9 estados do funil (2 em "qualificando" de propósito,
 * para o Inbox/CRM terem mais de uma conversa "quente" nesse estágio).
 * Os IDs (`lead-01`..`lead-10`) são referenciados por mensagens, eventos de
 * agenda e contratos nos outros arquivos deste diretório — mantenha a
 * coerência se editar algo aqui.
 */
export const leads: Lead[] = [
  {
    id: "lead-01",
    nome: "Camila Duarte",
    contato: "@camiladuarte_oficial",
    canal: "instagram",
    estado: "novo",
    evento: {
      tipo: "casamento",
      dataDesejada: "2027-03-20",
      convidados: 120,
      valorEstimado: 35000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-01",
    criadoEm: "2026-09-11T09:12:00",
    ultimaMensagemEm: "2026-09-11T09:15:00",
  },
  {
    id: "lead-02",
    nome: "Rafael Nogueira",
    contato: "+55 31 99811-2345",
    canal: "whatsapp",
    estado: "qualificando",
    evento: {
      tipo: "corporativo",
      dataDesejada: "2026-12-05",
      convidados: 80,
      valorEstimado: 18000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-02",
    criadoEm: "2026-09-08T14:20:00",
    ultimaMensagemEm: "2026-09-10T11:47:00",
  },
  {
    id: "lead-03",
    nome: "Beatriz Andrade & Lucas Prado",
    contato: "@beatrizelucas.wed",
    canal: "instagram",
    estado: "aguardando_disponibilidade",
    evento: {
      tipo: "casamento",
      dataDesejada: "2026-11-21",
      convidados: 150,
      valorEstimado: 42000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-03",
    criadoEm: "2026-09-05T16:00:00",
    ultimaMensagemEm: "2026-09-09T10:30:00",
  },
  {
    id: "lead-04",
    nome: "Fernanda Lima",
    contato: "+55 31 99722-8890",
    canal: "whatsapp",
    estado: "tirando_duvidas",
    evento: {
      tipo: "aniversario",
      dataDesejada: "2026-10-24",
      convidados: 100,
      valorEstimado: 15000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-04",
    criadoEm: "2026-08-30T13:10:00",
    ultimaMensagemEm: "2026-09-10T19:05:00",
  },
  {
    id: "lead-05",
    nome: "Marcos Antunes",
    contato: "@marcosantunes_",
    canal: "instagram",
    estado: "pronto_para_fechar",
    evento: {
      tipo: "formatura",
      dataDesejada: "2026-11-28",
      convidados: 200,
      valorEstimado: 55000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-05",
    criadoEm: "2026-08-20T10:00:00",
    ultimaMensagemEm: "2026-09-11T15:40:00",
  },
  {
    id: "lead-06",
    nome: "Juliana Prado & Thiago Rocha",
    contato: "+55 31 99654-3210",
    canal: "whatsapp",
    estado: "pronto_para_fechar",
    evento: {
      tipo: "casamento",
      dataDesejada: "2026-10-10",
      convidados: 180,
      valorEstimado: 48000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-06",
    criadoEm: "2026-08-15T09:30:00",
    ultimaMensagemEm: "2026-09-11T16:20:00",
  },
  {
    id: "lead-07",
    nome: "Patrícia Souza",
    contato: "@patriciasouza50",
    canal: "instagram",
    estado: "contrato_enviado",
    evento: {
      tipo: "aniversario",
      dataDesejada: "2026-09-26",
      convidados: 60,
      valorEstimado: 12000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-07",
    criadoEm: "2026-08-10T11:00:00",
    ultimaMensagemEm: "2026-09-09T17:15:00",
  },
  {
    id: "lead-08",
    nome: "Larissa Fontes & Bruno Ferreira",
    contato: "+55 31 99543-1122",
    canal: "whatsapp",
    estado: "confirmado",
    evento: {
      tipo: "casamento",
      dataDesejada: "2026-09-19",
      convidados: 130,
      valorEstimado: 39000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-08",
    criadoEm: "2026-07-20T08:45:00",
    ultimaMensagemEm: "2026-09-05T12:00:00",
  },
  {
    id: "lead-09",
    nome: "Diego Ramos",
    contato: "+55 31 99432-7766",
    canal: "whatsapp",
    estado: "perdido",
    evento: {
      tipo: "corporativo",
      dataDesejada: "2026-10-01",
      convidados: 50,
      valorEstimado: 9000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-09",
    criadoEm: "2026-08-25T15:30:00",
    ultimaMensagemEm: "2026-09-02T09:50:00",
  },
  {
    id: "lead-10",
    nome: "Isabela Martins",
    contato: "@isamartins.noiva",
    canal: "instagram",
    estado: "qualificando",
    evento: {
      tipo: "casamento",
      dataDesejada: "2027-06-12",
      convidados: 90,
      valorEstimado: 28000,
    },
    avatarUrl: "https://i.pravatar.cc/150?u=lead-10",
    criadoEm: "2026-09-09T20:00:00",
    ultimaMensagemEm: "2026-09-11T08:05:00",
  },
];
