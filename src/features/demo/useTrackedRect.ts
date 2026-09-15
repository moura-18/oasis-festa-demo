import { useEffect, useState } from "react";

export interface TrackedRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Janela de tempo em que reavaliamos o rect repetidamente após o alvo mudar (cobre `scrollIntoView` suave e outras animações de layout). Depois disso, só reagimos a eventos reais de resize/scroll — nada de polling perpétuo. */
const SETTLE_WINDOW_MS = 1200;

function readRect(selector: string | null): TrackedRect | null {
  if (!selector) return null;
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function sameRect(a: TrackedRect | null, b: TrackedRect | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
}

/**
 * Acompanha a posição/tamanho do elemento correspondente a `selector` (para
 * posicionar o cursor virtual e o spotlight do overlay). Ao trocar de alvo,
 * reavalia via `requestAnimationFrame` por uma janela curta — o suficiente
 * para acompanhar `scrollIntoView` suave e outras transições de layout — e
 * depois para de agendar frames, só reagindo a scroll/resize reais. Evitar
 * polling indefinido é importante: um `setInterval` rodando para sempre
 * enquanto a demo está ativa mantém o compositor sempre "sujo" e pode
 * atrapalhar ferramentas que dependem de um frame estável (ex.: captura de
 * screenshot em automação).
 */
export function useTrackedRect(selector: string | null): TrackedRect | null {
  const [rect, setRect] = useState<TrackedRect | null>(() => readRect(selector));

  useEffect(() => {
    let rafId = 0;
    let cancelled = false;
    const start = performance.now();

    function tick(now: number) {
      if (cancelled) return;
      setRect((prev) => {
        const next = readRect(selector);
        return sameRect(prev, next) ? prev : next;
      });
      // Sem alvo (ex.: durante um passo "navigate", entre uma página e
      // outra), um único tick já basta pra limpar o rect — sem isso, o rect
      // antigo (de um elemento que já nem existe mais, de uma página
      // anterior) ficava "congelado" até o próximo highlight resolver,
      // criando um rastro visível do spotlight na posição errada durante a
      // troca de tela.
      if (selector && now - start < SETTLE_WINDOW_MS) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);

    const onLayoutEvent = () =>
      setRect((prev) => {
        const next = readRect(selector);
        return sameRect(prev, next) ? prev : next;
      });
    window.addEventListener("resize", onLayoutEvent);
    window.addEventListener("scroll", onLayoutEvent, true);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onLayoutEvent);
      window.removeEventListener("scroll", onLayoutEvent, true);
    };
  }, [selector]);

  return rect;
}
