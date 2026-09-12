import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Lead, Message } from "@/types";
import { funilBadgeClass, funilLabel } from "../lib/funil";
import { formatRelativeShort } from "../lib/format";
import { ChannelIcon } from "./ChannelIcon";

function initials(nome: string): string {
  return nome
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

interface ConversationListItemProps {
  lead: Lead;
  lastMessage: Message | undefined;
  isSelected: boolean;
  onSelect: (leadId: string) => void;
}

export function ConversationListItem({
  lead,
  lastMessage,
  isSelected,
  onSelect,
}: ConversationListItemProps) {
  return (
    <button
      type="button"
      data-demo-id={`inbox-conversation-${lead.id}`}
      onClick={() => onSelect(lead.id)}
      aria-current={isSelected || undefined}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
        isSelected ? "bg-accent" : "hover:bg-muted",
      )}
    >
      <div className="relative shrink-0">
        <Avatar size="lg">
          <AvatarImage src={lead.avatarUrl} alt={lead.nome} />
          <AvatarFallback>{initials(lead.nome)}</AvatarFallback>
        </Avatar>
        <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-card bg-background">
          <ChannelIcon canal={lead.canal} className="size-3" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-foreground">
            {lead.nome}
          </span>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {formatRelativeShort(lead.ultimaMensagemEm)}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {lastMessage?.texto ?? "Sem mensagens ainda"}
        </p>
        <div className="mt-1.5">
          <Badge
            data-demo-id={`inbox-badge-funil-${lead.id}`}
            className={cn("pointer-events-none", funilBadgeClass(lead.estado))}
          >
            {funilLabel(lead.estado)}
          </Badge>
        </div>
      </div>
    </button>
  );
}
