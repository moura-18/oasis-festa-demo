import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useDemoStore } from "@/features/demo/useDemoPlayer";
import { useTrackedRect } from "@/features/demo/useTrackedRect";

/**
 * Cursor virtual do Modo Demo: um elemento `position: fixed` que se move até
 * o alvo do passo atual (`cursorTarget`) e faz um pequeno "ripple" quando o
 * player simula um clique (`clickPulse`).
 */
export function VirtualCursor() {
  const active = useDemoStore((s) => s.active);
  const cursorTarget = useDemoStore((s) => s.cursorTarget);
  const clickPulse = useDemoStore((s) => s.clickPulse);
  const rect = useTrackedRect(active ? cursorTarget : null);

  if (!active || !rect) return null;

  const x = rect.left + rect.width / 2 - 12;
  const y = rect.top + rect.height / 2 - 12;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      animate={{ x, y }}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
    >
      <div className="relative flex size-6 items-center justify-center">
        {clickPulse > 0 && (
          <motion.span
            key={clickPulse}
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inline-block size-6 rounded-full bg-brand-orange-400"
          />
        )}
        <MousePointer2
          className="size-6 fill-brand-orange-500 text-brand-orange-700 drop-shadow-md"
          strokeWidth={1.5}
        />
      </div>
    </motion.div>
  );
}
