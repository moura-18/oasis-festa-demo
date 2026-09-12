import type { TipoEvento } from "@/types";

/**
 * Estado local do formulário de geração de contrato. Espelha `ContractDados`
 * (ver `@/types`) mas mantém os campos como string nos inputs numéricos/data
 * para não brigar com o `<input>` controlado — a conversão para os tipos
 * finais (`number`, etc.) acontece no merge para `ContractDados`.
 */
export interface ContractFormState {
  nomeCliente: string;
  tipoEvento: TipoEvento;
  data: string;
  convidados: string;
  valorTotal: string;
  formaPagamento: string;
  clausulasSelecionadas: string[];
}

/** Rótulos amigáveis por `TipoEvento`, usados no select do formulário e no preview. */
export const TIPO_EVENTO_LABELS: Record<TipoEvento, string> = {
  casamento: "Casamento",
  aniversario: "Aniversário",
  corporativo: "Evento corporativo",
  formatura: "Formatura",
  outro: "Outro",
};
