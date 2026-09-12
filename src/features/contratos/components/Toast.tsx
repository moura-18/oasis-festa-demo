import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

/**
 * Toast simples e local à feature (o projeto não tem um sistema de toast
 * global ainda) — some sozinho após alguns segundos, simulando a confirmação
 * de envio do contrato para assinatura.
 */
export function Toast({ message, visible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(onDismiss, 3500);
    return () => clearTimeout(timeout);
  }, [visible, onDismiss]);

  return (
    <div
      data-demo-id="contrato-toast-confirmacao"
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-lg border border-success/30 bg-card px-4 py-3 text-sm text-card-foreground shadow-lg transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <CheckCircle2 className="size-5 shrink-0 text-success" />
      <span>{message}</span>
    </div>
  );
}
