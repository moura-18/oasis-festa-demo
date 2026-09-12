import { Bell } from "lucide-react";
import type { Message } from "@/types";

/**
 * Card de forte destaque para `tipo: "escalacao"` — o momento-chave de
 * human-in-the-loop (agente aciona a atendente). Laranja da marca, borda grossa,
 * ícone de sino, propositalmente contrastante com o resto da conversa.
 */
export function EscalationCard({ message }: { message: Message }) {
  return (
    <div
      className="flex justify-center py-1"
      data-demo-id={`inbox-message-escalacao-${message.id}`}
    >
      <div className="flex w-full max-w-[85%] items-start gap-3 rounded-xl border-2 border-brand-orange-500 bg-brand-orange-50 px-4 py-3 shadow-sm">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-orange-500 text-white">
          <Bell className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-wide text-brand-orange-700 uppercase">
            Escalação para a atendente
          </p>
          <p className="mt-0.5 text-sm font-medium text-brand-orange-950">
            {message.texto}
          </p>
        </div>
      </div>
    </div>
  );
}
