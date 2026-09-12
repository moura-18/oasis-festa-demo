import { create } from "zustand";
import type {
  Lead,
  Message,
  CalendarEvent,
  Contract,
  DashboardData,
  LeadFunilEstado,
} from "@/types";
import {
  leads as leadsMock,
  messages as messagesMock,
  calendarEvents as calendarEventsMock,
  contracts as contractsMock,
  dashboardData as dashboardDataMock,
} from "@/lib/mock-data";

/**
 * Estado global do app (demo — tudo em memória, inicializado a partir do
 * mock data em `@/lib/mock-data`). É AQUI que as telas da Fase 1 leem e
 * escrevem dados; nenhuma feature deve manter uma cópia paralela de
 * leads/mensagens/eventos/contratos em `useState` local.
 *
 * Uso recomendado (selector específico, evita re-render desnecessário):
 * ```ts
 * const leads = useAppStore((s) => s.leads);
 * const moverLeadNoFunil = useAppStore((s) => s.moverLeadNoFunil);
 * ```
 */
export interface AppState {
  leads: Lead[];
  messages: Message[];
  calendarEvents: CalendarEvent[];
  contracts: Contract[];
  dashboardData: DashboardData;

  /** Move um lead para outro estado do funil (ex.: drag-and-drop no CRM). */
  moverLeadNoFunil: (leadId: string, novoEstado: LeadFunilEstado) => void;
  /** Atualiza campos arbitrários de um lead (merge raso). */
  atualizarLead: (leadId: string, patch: Partial<Lead>) => void;
  /**
   * Adiciona uma mensagem a uma conversa e atualiza `ultimaMensagemEm` do
   * lead correspondente. `id` e `timestamp` são opcionais — gerados
   * automaticamente quando omitidos.
   */
  adicionarMensagem: (
    mensagem: Omit<Message, "id" | "timestamp"> &
      Partial<Pick<Message, "id" | "timestamp">>,
  ) => void;
  /** Atualiza campos de um contrato (ex.: mudar `status` para "enviado"). `atualizadoEm` é sempre recalculado. */
  atualizarContrato: (contractId: string, patch: Partial<Contract>) => void;
  /** Adiciona um novo contrato (ex.: gerado pela tela de Contratos a partir de um Lead). */
  adicionarContrato: (contrato: Contract) => void;
  /** Adiciona um novo evento à agenda (ex.: reserva criada manualmente). */
  adicionarEventoAgenda: (evento: CalendarEvent) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  leads: leadsMock,
  messages: messagesMock,
  calendarEvents: calendarEventsMock,
  contracts: contractsMock,
  dashboardData: dashboardDataMock,

  moverLeadNoFunil: (leadId, novoEstado) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId ? { ...lead, estado: novoEstado } : lead,
      ),
    })),

  atualizarLead: (leadId, patch) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId ? { ...lead, ...patch } : lead,
      ),
    })),

  adicionarMensagem: (mensagem) =>
    set((state) => {
      const nova: Message = {
        ...mensagem,
        id: mensagem.id ?? crypto.randomUUID(),
        timestamp: mensagem.timestamp ?? new Date().toISOString(),
      };
      return {
        messages: [...state.messages, nova],
        leads: state.leads.map((lead) =>
          lead.id === nova.leadId
            ? { ...lead, ultimaMensagemEm: nova.timestamp }
            : lead,
        ),
      };
    }),

  atualizarContrato: (contractId, patch) =>
    set((state) => ({
      contracts: state.contracts.map((contrato) =>
        contrato.id === contractId
          ? { ...contrato, ...patch, atualizadoEm: new Date().toISOString() }
          : contrato,
      ),
    })),

  adicionarContrato: (contrato) =>
    set((state) => ({ contracts: [...state.contracts, contrato] })),

  adicionarEventoAgenda: (evento) =>
    set((state) => ({ calendarEvents: [...state.calendarEvents, evento] })),
}));
