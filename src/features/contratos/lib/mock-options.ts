/**
 * Opções mockadas para os selects/checkboxes do formulário de contrato.
 * Não fazem parte do mock data central (`@/lib/mock-data`) por serem
 * puramente de UI desta feature — ver regra 4 em ARCHITECTURE.md.
 */

/** Formas de pagamento oferecidas — combinam com o que já aparece nos contratos mockados. */
export const FORMAS_PAGAMENTO = [
  "30% de entrada + 3x no cartão",
  "40% de entrada + 4x no cartão",
  "50% de entrada + 2x no cartão",
  "À vista com desconto",
  "Sinal + saldo na entrega do evento",
] as const;

/** Cláusulas/itens opcionais que podem ser marcados e entram no merge do preview do contrato. */
export const CLAUSULAS_OPCIONAIS = [
  "Cerimônia no jardim",
  "Recepção no salão principal",
  "Buffet completo",
  "Buffet parceiro credenciado",
  "Decoração temática inclusa",
  "Estrutura de som e iluminação",
  "Open bar",
  "Fotografia e filmagem inclusas",
] as const;
