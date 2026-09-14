import { create } from "zustand";
import { useAppStore } from "@/store";
import {
  demoScript,
  demoCheckpointOfStep,
  demoCheckpointStartIndex,
  type DemoStep,
} from "./script";
import { queryDemoTarget } from "./dom-utils";

/**
 * Timings do player — deliberadamente lentos (bem acima do "instantâneo") pra
 * quem está só assistindo (sem controlar o mouse) conseguir acompanhar cada
 * ação antes que a próxima comece. Ajustado a partir de feedback real: a
 * versão anterior, bem mais rápida, era difícil de acompanhar.
 */
const NAVIGATE_SETTLE_MS = 900;
const CLICK_TRAVEL_MS = 600;
const CLICK_HOLD_MS = 1500;
const HIGHLIGHT_HOLD_MS = 1900;
const MOVE_DEFAULT_MS = 1100;
const AI_THINKING_DEFAULT_MS = 2200;
/** Tempo para a animação de layout do card (Framer Motion) terminar de deslizar até a nova coluna. */
const MOVE_LEAD_HOLD_MS = 1700;

function delayForStep(step: DemoStep): number {
  switch (step.type) {
    case "navigate":
      return NAVIGATE_SETTLE_MS;
    case "moveCursorTo":
      return step.duration ?? MOVE_DEFAULT_MS;
    case "click":
      return CLICK_HOLD_MS;
    case "highlight":
      return HIGHLIGHT_HOLD_MS;
    case "wait":
      return step.ms;
    case "explain":
      return 0;
    case "aiThinking":
      return step.duration ?? AI_THINKING_DEFAULT_MS;
    case "moveLead":
      return MOVE_LEAD_HOLD_MS;
  }
}

interface DemoPlayerState {
  /** Demo ativa (overlay + cursor virtual visíveis, roteiro em execução). */
  active: boolean;
  stepIndex: number;
  /** true quando o avanço automático está parado (passo "explain" aguardando o usuário, ou pausa manual). */
  paused: boolean;
  /** Seletor `data-demo-id` atualmente destacado pelo spotlight do overlay. */
  highlightTarget: string | null;
  /** Seletor `data-demo-id` para onde o cursor virtual deve se mover. */
  cursorTarget: string | null;
  /** Incrementado a cada "click" simulado — dispara a animação de ripple no cursor. */
  clickPulse: number;
  /** Texto do selo "🤖 …" exibido durante um passo `aiThinking` (ancorado no mesmo alvo do highlight). `null` fora desse passo. */
  aiThinkingText: string | null;
  /** Função de navegação do React Router, registrada pelo DemoOverlay (sempre montado dentro do Router). */
  navigateFn: ((to: string) => void) | null;
  timeoutId: ReturnType<typeof setTimeout> | null;

  registerNavigate: (fn: (to: string) => void) => void;
  start: () => void;
  exit: () => void;
  next: () => void;
  prev: () => void;
  /** Pula para o próximo passo "navigate" (ou encerra a demo se já for a última tela). */
  skipToNextScreen: () => void;
  togglePause: () => void;
}

export const useDemoStore = create<DemoPlayerState>()((set, get) => {
  function clearScheduled() {
    const id = get().timeoutId;
    if (id) clearTimeout(id);
  }

  function scheduleAdvance(delay: number) {
    const id = setTimeout(() => get().next(), delay);
    set({ timeoutId: id, paused: false });
  }

  /** Aplica o efeito imediato do passo. Retorna `false` quando o alvo não existe no DOM (passo deve ser pulado). */
  function applyStepEffects(step: DemoStep): boolean {
    if (step.type !== "aiThinking") set({ aiThinkingText: null });

    switch (step.type) {
      case "navigate": {
        const fn = get().navigateFn;
        if (fn) fn(step.to);
        else console.warn(`[demo] navigateFn não registrada — não foi possível navegar para "${step.to}".`);
        set({ highlightTarget: null, cursorTarget: null });
        return true;
      }
      case "moveCursorTo": {
        const el = queryDemoTarget(step.target);
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        set({ cursorTarget: step.target });
        return true;
      }
      case "highlight": {
        const el = queryDemoTarget(step.target);
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        set({ cursorTarget: step.target, highlightTarget: step.target });
        return true;
      }
      case "click": {
        const el = queryDemoTarget(step.target);
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        set({ cursorTarget: step.target, highlightTarget: step.target });
        setTimeout(() => {
          queryDemoTarget(step.target)?.click();
          set({ clickPulse: get().clickPulse + 1 });
        }, CLICK_TRAVEL_MS);
        return true;
      }
      case "aiThinking": {
        const el = queryDemoTarget(step.target);
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        set({
          cursorTarget: step.target,
          highlightTarget: step.target,
          aiThinkingText: step.text,
        });
        return true;
      }
      case "moveLead": {
        useAppStore.getState().moverLeadNoFunil(step.leadId, step.toEstado);
        return true;
      }
      case "wait":
      case "explain":
        return true;
    }
  }

  function enterStep(index: number) {
    const step = demoScript[index];
    if (!step) {
      get().exit();
      return;
    }

    const ok = applyStepEffects(step);
    if (!ok) {
      // Alvo não encontrado no DOM: pula silenciosamente para o próximo passo.
      const nextIndex = index + 1;
      if (nextIndex >= demoScript.length) {
        get().exit();
        return;
      }
      set({ stepIndex: nextIndex });
      enterStep(nextIndex);
      return;
    }

    if (step.type === "explain") {
      set({ paused: true, timeoutId: null });
      return;
    }

    scheduleAdvance(delayForStep(step));
  }

  return {
    active: false,
    stepIndex: 0,
    paused: false,
    highlightTarget: null,
    cursorTarget: null,
    clickPulse: 0,
    aiThinkingText: null,
    navigateFn: null,
    timeoutId: null,

    registerNavigate: (fn) => set({ navigateFn: fn }),

    start: () => {
      clearScheduled();
      set({
        active: true,
        stepIndex: 0,
        paused: false,
        highlightTarget: null,
        cursorTarget: null,
        clickPulse: 0,
        aiThinkingText: null,
        timeoutId: null,
      });
      enterStep(0);
    },

    exit: () => {
      clearScheduled();
      set({
        active: false,
        paused: false,
        aiThinkingText: null,
        highlightTarget: null,
        cursorTarget: null,
        timeoutId: null,
      });
    },

    next: () => {
      clearScheduled();
      const nextIndex = get().stepIndex + 1;
      if (nextIndex >= demoScript.length) {
        get().exit();
        return;
      }
      set({ stepIndex: nextIndex, paused: false });
      enterStep(nextIndex);
    },

    prev: () => {
      clearScheduled();
      // "Anterior" volta para o INÍCIO do capítulo anterior (o `explain`
      // anterior), não um passo bruto do array — voltar 1 índice caía com
      // frequência num passo mecânico (highlight/moveCursorTo) que não pausa
      // e reavança sozinho, dando a impressão de que o botão não fazia nada.
      const currentCheckpoint = demoCheckpointOfStep[get().stepIndex] ?? 1;
      const targetCheckpoint = Math.max(1, currentCheckpoint - 1);
      const targetIndex = demoCheckpointStartIndex[targetCheckpoint - 1] ?? 0;
      set({ stepIndex: targetIndex, paused: false });
      enterStep(targetIndex);
    },

    skipToNextScreen: () => {
      clearScheduled();
      const current = get().stepIndex;
      const targetIndex = demoScript.findIndex(
        (step, i) => i > current && step.type === "navigate",
      );
      if (targetIndex === -1) {
        get().exit();
        return;
      }
      set({ stepIndex: targetIndex, paused: false });
      enterStep(targetIndex);
    },

    togglePause: () => {
      const { paused, stepIndex } = get();
      const step = demoScript[stepIndex];
      if (!step || step.type === "explain") return;
      if (paused) {
        scheduleAdvance(delayForStep(step));
      } else {
        clearScheduled();
        set({ paused: true, timeoutId: null });
      }
    },
  };
});
