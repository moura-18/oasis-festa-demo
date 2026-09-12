import { Bot } from "lucide-react";
import { NOME_ATENDENTE } from "@/lib/mock-data";
import type { Message } from "@/types";
import { formatTime } from "../lib/format";

/**
 * Bolha de mensagem de texto (`tipo: "texto"`), com visual diferente por
 * autor: cliente à esquerda em tom neutro; agente à direita em verde sólido
 * com ícone de robô; atendente à direita, mas com card claro/contornado e nome
 * identificado — deixa claro que ali é um humano respondendo, não o agente.
 */
export function MessageBubble({ message }: { message: Message }) {
  if (message.autor === "cliente") {
    return (
      <div
        className="flex justify-start"
        data-demo-id={`inbox-message-cliente-${message.id}`}
      >
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm">
          <p className="leading-snug whitespace-pre-line">{message.texto}</p>
          <p className="mt-1 text-right text-[10px] text-muted-foreground">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  if (message.autor === "agente") {
    return (
      <div
        className="flex justify-end"
        data-demo-id={`inbox-message-agente-${message.id}`}
      >
        <div className="flex max-w-[75%] items-end gap-2">
          <div className="rounded-2xl rounded-br-sm bg-brand-green-800 px-3.5 py-2.5 text-sm text-white shadow-sm">
            <p className="leading-snug whitespace-pre-line">{message.texto}</p>
            <p className="mt-1 text-right text-[10px] text-brand-green-200">
              {formatTime(message.timestamp)}
            </p>
          </div>
          <span className="mb-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-white">
            <Bot className="size-3.5" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-end"
      data-demo-id={`inbox-message-atendente-${message.id}`}
    >
      <div className="max-w-[75%] rounded-2xl rounded-br-sm border-2 border-brand-green-300 bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm">
        <p className="text-[10px] font-semibold tracking-wide text-brand-green-700 uppercase">
          {NOME_ATENDENTE}
        </p>
        <p className="mt-0.5 leading-snug whitespace-pre-line">{message.texto}</p>
        <p className="mt-1 text-right text-[10px] text-muted-foreground">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
