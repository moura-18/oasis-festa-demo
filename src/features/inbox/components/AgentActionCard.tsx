import type { Message } from "@/types";
import { AGENT_ACTION_LABELS } from "../lib/agent-action";

/**
 * Card discreto para `tipo: "acao_agente"` — mostra o "trabalho" do agente
 * (tool call) sem competir visualmente com as bolhas de conversa normais.
 * Centralizado, borda tracejada, tom verde suave.
 */
export function AgentActionCard({ message }: { message: Message }) {
  const acao = message.acao;
  return (
    <div
      className="flex justify-center py-0.5"
      data-demo-id={`inbox-message-acao-agente-${message.id}`}
    >
      <div className="max-w-[80%] rounded-lg border border-dashed border-brand-green-300 bg-brand-green-50 px-3 py-2 text-xs text-brand-green-900">
        {acao && (
          <p className="text-[10px] font-semibold tracking-wide text-brand-green-700 uppercase">
            {AGENT_ACTION_LABELS[acao.nome]}
          </p>
        )}
        <p className="mt-0.5 leading-snug">{message.texto}</p>
      </div>
    </div>
  );
}
