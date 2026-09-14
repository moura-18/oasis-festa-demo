import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Pause, Play, SkipForward } from "lucide-react";
import { useDemoStore } from "@/features/demo/useDemoPlayer";
import {
  demoScript,
  demoCheckpointOfStep,
  demoCheckpointCount,
} from "@/features/demo/script";
import { useTrackedRect } from "@/features/demo/useTrackedRect";
import { cn } from "@/lib/utils";

const SPOTLIGHT_PADDING = 10;

/**
 * Camada global do Modo Demo: escurece o fundo fora do elemento em destaque
 * (spotlight), mostra a barra de progresso da jornada e os modais de
 * explicação (com "Pausar/Continuar", "Pular" e "Anterior"). Só renderiza
 * algo quando a demo está ativa — ver `useDemoPlayer.ts`.
 */
export function DemoOverlay() {
  const active = useDemoStore((s) => s.active);
  const stepIndex = useDemoStore((s) => s.stepIndex);
  const paused = useDemoStore((s) => s.paused);
  const highlightTarget = useDemoStore((s) => s.highlightTarget);
  const aiThinkingText = useDemoStore((s) => s.aiThinkingText);
  const registerNavigate = useDemoStore((s) => s.registerNavigate);
  const next = useDemoStore((s) => s.next);
  const prev = useDemoStore((s) => s.prev);
  const skipToNextScreen = useDemoStore((s) => s.skipToNextScreen);
  const togglePause = useDemoStore((s) => s.togglePause);

  const navigate = useNavigate();
  useEffect(() => {
    registerNavigate((to) => navigate(to));
  }, [navigate, registerNavigate]);

  const rect = useTrackedRect(active ? highlightTarget : null);

  if (!active) return null;

  const step = demoScript[stepIndex];
  if (!step) return null;

  // "Passo X de Y" conta só os capítulos narrados (passos `explain`), não o
  // índice bruto do roteiro — ver o comentário em `buildCheckpoints` em
  // script.ts para o porquê (evita o contador pulando de forma confusa).
  const total = demoCheckpointCount;
  const checkpoint = demoCheckpointOfStep[stepIndex] ?? 1;
  const progressPct = Math.round((checkpoint / total) * 100);
  const isExplain = step.type === "explain";

  const spot = rect
    ? {
        top: rect.top - SPOTLIGHT_PADDING,
        left: rect.left - SPOTLIGHT_PADDING,
        width: rect.width + SPOTLIGHT_PADDING * 2,
        height: rect.height + SPOTLIGHT_PADDING * 2,
      }
    : null;

  return (
    <div className="fixed inset-0 z-[90]">
      {spot && (
        <>
          {/* Escurece o fundo em 4 tiras ao redor do alvo — mais barato para o
              compositor do que um único box-shadow gigante ("spotlight"). */}
          <div
            className="pointer-events-none fixed inset-x-0 top-0 bg-black/55"
            style={{ height: Math.max(0, spot.top) }}
          />
          <div
            className="pointer-events-none fixed inset-x-0 bottom-0 bg-black/55"
            style={{ top: spot.top + spot.height }}
          />
          <div
            className="pointer-events-none fixed bg-black/55"
            style={{ top: spot.top, height: spot.height, left: 0, width: Math.max(0, spot.left) }}
          />
          <div
            className="pointer-events-none fixed bg-black/55"
            style={{ top: spot.top, height: spot.height, left: spot.left + spot.width, right: 0 }}
          />
          <div
            className="pointer-events-none fixed rounded-lg ring-2 ring-brand-orange-500"
            style={spot}
          />
        </>
      )}

      <AnimatePresence>
        {spot && aiThinkingText && (
          <motion.div
            key="ai-thinking"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed z-[97] flex max-w-[280px] items-center gap-2 rounded-full bg-brand-green-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
            style={{ top: Math.max(8, spot.top - 42), left: spot.left }}
          >
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-brand-orange-400" />
            🤖 {aiThinkingText}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-1 bg-black/10">
        <div
          className="h-full bg-brand-orange-500 transition-[width] duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <AnimatePresence>
        {isExplain && (
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "pointer-events-auto fixed z-[96] w-[min(420px,calc(100vw-2rem))] rounded-xl border border-border bg-card p-5 shadow-xl",
              step.position === "top" && "left-1/2 top-6 -translate-x-1/2",
              step.position === "bottom" && "bottom-6 left-1/2 -translate-x-1/2",
              (!step.position || step.position === "center") &&
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            )}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-brand-orange-600">
              Passo {checkpoint} de {total}
            </p>
            <h3 className="mt-1 font-display text-lg text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand-orange-500 transition-[width] duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={prev}
                disabled={checkpoint <= 1}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Anterior
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={skipToNextScreen}
                  className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  <SkipForward className="size-4" />
                  Pular
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Continuar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExplain && (
        <div className="pointer-events-auto fixed bottom-6 left-1/2 z-[96] flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-lg">
          <span className="px-1 text-xs text-muted-foreground">
            Passo {checkpoint} de {total}
          </span>
          <button
            type="button"
            onClick={togglePause}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            {paused ? "Continuar" : "Pausar"}
          </button>
        </div>
      )}
    </div>
  );
}
