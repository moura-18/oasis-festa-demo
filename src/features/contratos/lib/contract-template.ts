import type { ContractDados } from "@/types";
import { NOME_ATENDENTE } from "@/lib/mock-data";
import { TIPO_EVENTO_LABELS } from "../types";

/**
 * Gera o texto do contrato com as variáveis do formulário já mescladas —
 * mesma estrutura do template usado no mock data (`@/lib/mock-data/contracts`),
 * reproduzida aqui pois aquele helper não é exportado (é interno ao mock).
 */
export function gerarTextoContrato(dados: ContractDados): string {
  const dataFormatada = formatarData(dados.data);
  const clausulas =
    dados.clausulasInclusas.length > 0
      ? dados.clausulasInclusas.map((c) => `  • ${c}`).join("\n")
      : "  • Nenhuma cláusula opcional selecionada";

  return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS — OÁSIS FESTAS BH

CONTRATANTE: ${dados.nomeCliente || "[nome do cliente]"}
CONTRATADA: Oásis Festas BH, representada por ${NOME_ATENDENTE}

OBJETO: locação do espaço e prestação de serviços para evento do tipo
"${TIPO_EVENTO_LABELS[dados.tipoEvento]}", a realizar-se em ${dataFormatada}, com
estimativa de ${dados.convidados} convidados.

VALOR TOTAL: ${formatarMoeda(dados.valorTotal)}
FORMA DE PAGAMENTO: ${dados.formaPagamento || "[a definir]"}

ITENS INCLUSOS:
${clausulas}

As partes declaram estar de acordo com os termos acima descritos.`;
}

function formatarData(iso: string): string {
  if (!iso) return "[data a definir]";
  const [ano, mes, dia] = iso.split("-");
  if (!ano || !mes || !dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

function formatarMoeda(valor: number): string {
  if (Number.isNaN(valor)) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
