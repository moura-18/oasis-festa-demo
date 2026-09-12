import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Lead, TipoEvento } from "@/types";
import { formatCurrencyBRL, formatDatePt } from "../lib/format";
import { funilBadgeClass, funilLabel } from "../lib/funil";
import { ChannelIcon } from "./ChannelIcon";

const TIPO_EVENTO_LABEL: Record<TipoEvento, string> = {
  casamento: "Casamento",
  aniversario: "Aniversário",
  corporativo: "Corporativo",
  formatura: "Formatura",
  outro: "Evento",
};

/** Cabeçalho do chat: identidade do lead + resumo do evento desejado + badge do funil. */
export function ChatHeader({ lead }: { lead: Lead }) {
  return (
    <div
      data-demo-id={`inbox-chat-header-${lead.id}`}
      className="flex items-center justify-between gap-4 border-b border-border bg-card px-5 py-3.5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar size="lg">
          <AvatarImage src={lead.avatarUrl} alt={lead.nome} />
          <AvatarFallback>{lead.nome.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-sm font-semibold text-foreground">
              {lead.nome}
            </h2>
            <ChannelIcon canal={lead.canal} className="size-3.5 shrink-0" />
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {lead.contato}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right text-xs text-muted-foreground sm:block">
          <p>
            {TIPO_EVENTO_LABEL[lead.evento.tipo]} ·{" "}
            {formatDatePt(lead.evento.dataDesejada)}
          </p>
          <p>
            {lead.evento.convidados} convidados ·{" "}
            {formatCurrencyBRL(lead.evento.valorEstimado)}
          </p>
        </div>
        <Badge
          data-demo-id={`inbox-chat-header-badge-${lead.id}`}
          className={funilBadgeClass(lead.estado)}
        >
          {funilLabel(lead.estado)}
        </Badge>
      </div>
    </div>
  );
}
