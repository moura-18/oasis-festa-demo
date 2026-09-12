import { useMemo, useState } from "react";
import { useAppStore } from "@/store";
import { ChatView } from "./components/ChatView";
import { ConversationList } from "./components/ConversationList";

/**
 * Tela unificada de Inbox: lista de conversas (WhatsApp + Instagram) à
 * esquerda, conversa selecionada à direita. Ver ARCHITECTURE.md e
 * CONTRIBUTING.md para as convenções de estado (`@/store`) e `data-demo-id`.
 */
export default function InboxPage() {
  const leads = useAppStore((s) => s.leads);

  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>(
    () =>
      [...leads].sort((a, b) =>
        b.ultimaMensagemEm.localeCompare(a.ultimaMensagemEm),
      )[0]?.id,
  );

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId),
    [leads, selectedLeadId],
  );

  return (
    <div data-demo-id="page-inbox" className="flex h-full w-full overflow-hidden">
      <ConversationList
        selectedLeadId={selectedLeadId}
        onSelect={setSelectedLeadId}
      />
      {selectedLead ? (
        <ChatView lead={selectedLead} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          Selecione uma conversa para ver os detalhes
        </div>
      )}
    </div>
  );
}
