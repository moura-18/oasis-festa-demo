/**
 * Resolve um seletor `data-demo-id` no DOM real. Telas construídas por outros
 * agentes podem usar IDs ligeiramente diferentes dos referenciados em
 * `script.ts` — por isso o player nunca deve quebrar quando um alvo não é
 * encontrado, apenas avisar no console e pular o passo (ver `useDemoPlayer.ts`).
 */
export function queryDemoTarget(selector: string): HTMLElement | null {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) {
    console.warn(
      `[demo] elemento não encontrado para o seletor "${selector}" — pulando este passo.`,
    );
  }
  return el;
}
