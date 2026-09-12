import type { Contract, ContractDados, Lead } from "@/types";
import { FORMAS_PAGAMENTO } from "./mock-options";
import type { ContractFormState } from "../types";

/**
 * Estado inicial do formulário a partir de um Lead — usa o contrato já
 * existente para aquele lead (se houver) como base, senão parte dos dados
 * do lead com forma de pagamento/cláusulas padrão (mockadas).
 */
export function estadoInicialDoLead(
  lead: Lead,
  contratoExistente?: Contract,
): ContractFormState {
  if (contratoExistente) {
    const { dados } = contratoExistente;
    return {
      nomeCliente: dados.nomeCliente,
      tipoEvento: dados.tipoEvento,
      data: dados.data,
      convidados: String(dados.convidados),
      valorTotal: String(dados.valorTotal),
      formaPagamento: dados.formaPagamento,
      clausulasSelecionadas: [...dados.clausulasInclusas],
    };
  }

  return {
    nomeCliente: lead.nome,
    tipoEvento: lead.evento.tipo,
    data: lead.evento.dataDesejada,
    convidados: String(lead.evento.convidados),
    valorTotal: String(lead.evento.valorEstimado),
    formaPagamento: FORMAS_PAGAMENTO[0],
    clausulasSelecionadas: [],
  };
}

/** Converte o estado do formulário (strings controladas) para `ContractDados` (tipos finais). */
export function formParaContractDados(form: ContractFormState): ContractDados {
  return {
    nomeCliente: form.nomeCliente,
    tipoEvento: form.tipoEvento,
    data: form.data,
    convidados: Number(form.convidados) || 0,
    valorTotal: Number(form.valorTotal) || 0,
    formaPagamento: form.formaPagamento,
    clausulasInclusas: form.clausulasSelecionadas,
  };
}
