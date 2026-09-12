import type { DragEvent } from "react";
import type { Lead, LeadFunilEstado } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FUNIL_ACCENT, FUNIL_LABELS } from "../lib/constants";
import { LeadCard } from "./LeadCard";

export interface KanbanColumnProps {
  estado: LeadFunilEstado;
  leads: Lead[];
  isDragOver: boolean;
  onDragEnterColumn: (estado: LeadFunilEstado) => void;
  onDragLeaveColumn: () => void;
  onDropLead: (estado: LeadFunilEstado, event: DragEvent<HTMLDivElement>) => void;
  onSelectLead: (leadId: string) => void;
  onCardDragStart: (leadId: string) => void;
  onCardDragEnd: () => void;
}

export function KanbanColumn({
  estado,
  leads,
  isDragOver,
  onDragEnterColumn,
  onDragLeaveColumn,
  onDropLead,
  onSelectLead,
  onCardDragStart,
  onCardDragEnd,
}: KanbanColumnProps) {
  return (
    <div
      data-demo-id={`crm-coluna-${estado}`}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragEnterColumn(estado);
      }}
      onDragLeave={onDragLeaveColumn}
      onDrop={(event) => {
        event.preventDefault();
        onDropLead(estado, event);
      }}
      className={cn(
        "flex h-full w-72 shrink-0 flex-col rounded-xl border bg-muted/40 transition-colors",
        isDragOver && "border-primary bg-accent/60",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-l-4 px-3 py-2.5",
          FUNIL_ACCENT[estado],
        )}
      >
        <h2 className="text-sm font-semibold text-foreground">
          {FUNIL_LABELS[estado]}
        </h2>
        <Badge variant="secondary" data-demo-id={`crm-coluna-${estado}-contagem`}>
          {leads.length}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-3">
        {leads.length === 0 ? (
          <p className="px-1 py-4 text-center text-xs text-muted-foreground">
            Nenhum lead
          </p>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onSelect={onSelectLead}
              onDragStart={onCardDragStart}
              onDragEnd={onCardDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
}
