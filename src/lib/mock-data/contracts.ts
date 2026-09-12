import type { Contract, ContractDados } from "@/types";
import { NOME_ATENDENTE } from "./leads";

function textoContrato(dados: ContractDados): string {
  return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS — OÁSIS FESTAS BH

CONTRATANTE: ${dados.nomeCliente}
CONTRATADA: Oásis Festas BH, representada por ${NOME_ATENDENTE}

OBJETO: locação do espaço e prestação de serviços para evento do tipo
"${dados.tipoEvento}", a realizar-se em ${dados.data}, com estimativa de
${dados.convidados} convidados.

VALOR TOTAL: R$ ${dados.valorTotal.toLocaleString("pt-BR")}
FORMA DE PAGAMENTO: ${dados.formaPagamento}

ITENS INCLUSOS:
${dados.clausulasInclusas.map((c) => `  • ${c}`).join("\n")}

As partes declaram estar de acordo com os termos acima descritos.`;
}

const dadosContract01: ContractDados = {
  nomeCliente: "Juliana Prado & Thiago Rocha",
  tipoEvento: "casamento",
  data: "2026-10-10",
  convidados: 180,
  valorTotal: 48000,
  formaPagamento: "30% de entrada + 3x no cartão",
  clausulasInclusas: [
    "Cerimônia no jardim",
    "Recepção no salão principal",
    "Buffet completo",
    "Decoração temática inclusa",
  ],
};

const dadosContract02: ContractDados = {
  nomeCliente: "Patrícia Souza",
  tipoEvento: "aniversario",
  data: "2026-09-26",
  convidados: 60,
  valorTotal: 12000,
  formaPagamento: "50% de entrada + 2x no cartão",
  clausulasInclusas: ["Salão de recepção", "Buffet parceiro credenciado"],
};

const dadosContract03: ContractDados = {
  nomeCliente: "Larissa Fontes & Bruno Ferreira",
  tipoEvento: "casamento",
  data: "2026-09-19",
  convidados: 130,
  valorTotal: 39000,
  formaPagamento: "40% de entrada + 4x no cartão",
  clausulasInclusas: [
    "Cerimônia no jardim",
    "Recepção no salão principal",
    "Buffet completo",
    "Decoração inclusa",
    "Estrutura de som e iluminação",
  ],
};

/**
 * 3 contratos cobrindo os 3 status possíveis (`rascunho`, `enviado`,
 * `assinado`), atrelados aos leads que chegaram a essa etapa do funil em
 * `leads.ts`/`messages.ts`.
 */
export const contracts: Contract[] = [
  {
    id: "contract-01",
    leadId: "lead-06",
    dados: dadosContract01,
    status: "rascunho",
    textoPreview: textoContrato(dadosContract01),
    criadoEm: "2026-09-11T16:25:00",
    atualizadoEm: "2026-09-11T16:25:00",
  },
  {
    id: "contract-02",
    leadId: "lead-07",
    dados: dadosContract02,
    status: "enviado",
    textoPreview: textoContrato(dadosContract02),
    criadoEm: "2026-09-09T17:10:00",
    atualizadoEm: "2026-09-09T17:15:00",
  },
  {
    id: "contract-03",
    leadId: "lead-08",
    dados: dadosContract03,
    status: "assinado",
    textoPreview: textoContrato(dadosContract03),
    criadoEm: "2026-08-28T10:00:00",
    atualizadoEm: "2026-09-05T12:00:00",
  },
];
