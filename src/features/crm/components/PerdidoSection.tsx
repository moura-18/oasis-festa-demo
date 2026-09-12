import { ChevronDown, ChevronRight } from "lucide-react";
import type { DragEvent } from "react";
import type { Lead } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LeadCard } from "./LeadCard";

export interface PerdidoSectionProps {
  leads: Lead[];
  open: boolean;
  onToggle: () => void;
  isDragOver: boolean;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDropLead: (event: DragEvent<HTMLDivElement>) => void;
  onSelectLead: (leadId: string) => void;
  onCardDragStart: (leadId: string) => void;
  onCardDragEnd: () => void;
}

/**
 * "perdido" fica fora da ordem principal do funil (ver ORDEM_FUNIL em
 * @/types) para não poluir o board — aqui vira uma seção recolhível que
 * também funciona como área de drop (arrastar um card para cá marca o lead
 * como perdido).
 */
export function PerdidoSection({
  leads,
  open,
  onToggle,
  isDragOver,
  onDragEnter,
  onDragLeave,
  onDropLead,
  onSelectLead,
  onCardDragStart,
  onCardDragEnd,
}: PerdidoSectionProps) {
  return (
    <div
      data-demo-id="crm-coluna-perdido"
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragEnter();
      }}
      onDragLeave={onDragLeave}
      onDrop={(event) => {
        event.preventDefault();
        onDropLead(event);
      }}
      className={cn(
        "shrink-0 rounded-xl border border-dashed bg-muted/20 transition-colors",
        isDragOver && "border-destructive bg-destructive/10",
      )}
    >
      <button
        type="button"
        data-demo-id="crm-perdido-toggle"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        {open ? (
          <ChevronDown className="size-4 shrink-0" />
        ) : (
          <ChevronRight className="size-4 shrink-0" />
        )}
        Perdidos
        <Badge variant="outline">{leads.length}</Badge>
        <span className="ml-auto text-xs font-normal text-muted-foreground/80">
          Arraste um card até aqui para marcar como perdido
        </span>
      </button>

      {open && (
        <div className="flex flex-wrap gap-2 border-t border-dashed px-3 py-3">
          {leads.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Nenhum lead perdido.
            </p>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="w-64">
                <LeadCard
                  lead={lead}
                  onSelect={onSelectLead}
                  onDragStart={onCardDragStart}
                  onDragEnd={onCardDragEnd}
                  dimmed
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
