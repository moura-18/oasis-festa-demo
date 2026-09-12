import type { CalendarEvent } from "@/types";

/**
 * Agenda mockada cobrindo ~2 meses (11/set a 28/nov de 2026). Datas ligadas
 * a um `leadId` são coerentes com as conversas em `messages.ts` (ex.: o
 * bloqueio em 14/11 é o motivo do lead-03 não ter conseguido essa data — ver
 * `action-03-01`). Os demais eventos representam o restante da operação do
 * espaço (clientes fora do escopo dos 10 leads modelados), e existem para
 * dar volume realista à visão de calendário e às métricas de fluxo por dia
 * da semana do Dashboard.
 *
 * Nota de coerência proposital: quase todos os eventos caem em sábado ou
 * domingo, como é típico de um espaço de casamentos/festas — isso é o que
 * sustenta o insight de "dias de maior fluxo" no Dashboard.
 */
export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-01",
    leadId: null,
    data: "2026-09-13",
    tipo: "casamento",
    status: "confirmado",
    titulo: "Casamento Almeida & Rocha",
  },
  {
    id: "event-02",
    leadId: null,
    data: "2026-09-14",
    tipo: "outro",
    status: "bloqueado",
    titulo: "Manutenção do jardim",
  },
  {
    id: "event-03",
    leadId: "lead-08",
    data: "2026-09-19",
    tipo: "casamento",
    status: "confirmado",
    titulo: "Casamento Larissa & Bruno",
  },
  {
    id: "event-04",
    leadId: null,
    data: "2026-09-20",
    tipo: "corporativo",
    status: "confirmado",
    titulo: "Confraternização TechBH",
  },
  {
    id: "event-05",
    leadId: "lead-07",
    data: "2026-09-26",
    tipo: "aniversario",
    status: "reservado",
    titulo: "Aniversário 50 anos — Patrícia Souza",
  },
  {
    id: "event-06",
    leadId: null,
    data: "2026-09-27",
    tipo: "casamento",
    status: "confirmado",
    titulo: "Casamento Ferreira & Lopes",
  },
  {
    id: "event-07",
    leadId: null,
    data: "2026-10-03",
    tipo: "aniversario",
    status: "confirmado",
    titulo: "Bodas de Prata — Família Martins",
  },
  {
    id: "event-08",
    leadId: null,
    data: "2026-10-04",
    tipo: "casamento",
    status: "reservado",
    titulo: "Casamento Vieira & Souza",
  },
  {
    id: "event-09",
    leadId: "lead-06",
    data: "2026-10-10",
    tipo: "casamento",
    status: "reservado",
    titulo: "Casamento Juliana & Thiago",
  },
  {
    id: "event-10",
    leadId: null,
    data: "2026-10-11",
    tipo: "formatura",
    status: "confirmado",
    titulo: "Formatura Direito UFMG",
  },
  {
    id: "event-11",
    leadId: null,
    data: "2026-10-17",
    tipo: "casamento",
    status: "confirmado",
    titulo: "Casamento Barros & Teixeira",
  },
  {
    id: "event-12",
    leadId: null,
    data: "2026-10-18",
    tipo: "outro",
    status: "bloqueado",
    titulo: "Bloqueio — evento particular da proprietária",
  },
  {
    id: "event-13",
    leadId: null,
    data: "2026-10-24",
    tipo: "aniversario",
    status: "confirmado",
    titulo: "15 anos — Manuela",
  },
  {
    id: "event-14",
    leadId: null,
    data: "2026-10-25",
    tipo: "casamento",
    status: "reservado",
    titulo: "Casamento Pinto & Cardoso",
  },
  {
    id: "event-15",
    leadId: null,
    data: "2026-10-31",
    tipo: "corporativo",
    status: "reservado",
    titulo: "Evento Corporativo XP",
  },
  {
    id: "event-16",
    leadId: null,
    data: "2026-11-01",
    tipo: "casamento",
    status: "confirmado",
    titulo: "Casamento Azevedo & Lima",
  },
  {
    id: "event-17",
    leadId: null,
    data: "2026-11-07",
    tipo: "casamento",
    status: "reservado",
    titulo: "Casamento Cunha & Rezende",
  },
  {
    id: "event-18",
    leadId: null,
    data: "2026-11-08",
    tipo: "aniversario",
    status: "confirmado",
    titulo: "Debutante — Sophia",
  },
  {
    id: "event-19",
    leadId: null,
    data: "2026-11-14",
    tipo: "casamento",
    status: "confirmado",
    titulo: "Casamento Rangel & Matos",
  },
  {
    id: "event-20",
    leadId: "lead-05",
    data: "2026-11-28",
    tipo: "formatura",
    status: "reservado",
    titulo: "Formatura — Marcos Antunes",
  },
];
