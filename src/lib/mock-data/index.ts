/**
 * Ponto único de acesso ao mock data. Não importe os arquivos individuais
 * (`leads.ts`, `messages.ts`, ...) diretamente fora desta pasta — importe
 * daqui (`@/lib/mock-data`) ou, preferencialmente, leia o estado via
 * `@/store` (que inicializa a partir destes mocks).
 */
export { leads, NOME_ATENDENTE } from "./leads";
export { messages } from "./messages";
export { calendarEvents } from "./calendar-events";
export { contracts } from "./contracts";
export { dashboardData } from "./dashboard";
