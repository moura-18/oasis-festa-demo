import { useMemo } from "react";
import { useAppStore } from "@/store";
import type { Message } from "@/types";
import { ConversationListItem } from "./ConversationListItem";

interface ConversationListProps {
  selectedLeadId: string | undefined;
  onSelect: (leadId: string) => void;
}

function lastMessageByLead(messages: Message[]): Record<string, Message> {
  const map: Record<string, Message> = {};
  for (const message of messages) {
    const current = map[message.leadId];
    if (!current || message.timestamp > current.timestamp) {
      map[message.leadId] = message;
    }
  }
  return map;
}

/** Coluna esquerda do Inbox: lista de conversas, ordenada pela mais recente. */
export function ConversationList({
  selectedLeadId,
  onSelect,
}: ConversationListProps) {
  const leads = useAppStore((s) => s.leads);
  const messages = useAppStore((s) => s.messages);

  const lastByLead = useMemo(() => lastMessageByLead(messages), [messages]);

  const sortedLeads = useMemo(
    () =>
      [...leads].sort((a, b) =>
        b.ultimaMensagemEm.localeCompare(a.ultimaMensagemEm),
      ),
    [leads],
  );

  return (
    <div
      data-demo-id="inbox-conversation-list"
      className="flex h-full w-[340px] shrink-0 flex-col border-r border-border bg-card"
    >
      <div className="border-b border-border px-4 py-4">
        <h1 className="font-display text-xl text-foreground">Inbox</h1>
        <p className="text-xs text-muted-foreground">
          {leads.length} conversas
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {sortedLeads.map((lead) => (
          <ConversationListItem
            key={lead.id}
            lead={lead}
            lastMessage={lastByLead[lead.id]}
            isSelected={lead.id === selectedLeadId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
