import { useEffect, useMemo, useRef } from "react";
import { useAppStore } from "@/store";
import type { Lead } from "@/types";
import { AgentActionCard } from "./AgentActionCard";
import { ChatComposer } from "./ChatComposer";
import { ChatHeader } from "./ChatHeader";
import { EscalationCard } from "./EscalationCard";
import { MessageBubble } from "./MessageBubble";

/** Coluna direita do Inbox: cabeçalho + histórico da conversa + composer. */
export function ChatView({ lead }: { lead: Lead }) {
  const messages = useAppStore((s) => s.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = useMemo(
    () =>
      messages
        .filter((message) => message.leadId === lead.id)
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    [messages, lead.id],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [conversation.length, lead.id]);

  return (
    <div
      data-demo-id={`inbox-chat-view-${lead.id}`}
      className="flex h-full min-w-0 flex-1 flex-col"
    >
      <ChatHeader lead={lead} />

      <div
        ref={scrollRef}
        className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4"
      >
        {conversation.map((message) => {
          if (message.tipo === "acao_agente") {
            return <AgentActionCard key={message.id} message={message} />;
          }
          if (message.tipo === "escalacao") {
            return <EscalationCard key={message.id} message={message} />;
          }
          return <MessageBubble key={message.id} message={message} />;
        })}
      </div>

      <ChatComposer lead={lead} />
    </div>
  );
}
