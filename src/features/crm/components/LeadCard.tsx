import { motion } from "framer-motion";
import { Banknote, CalendarDays, Clock } from "lucide-react";
import type { Lead } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CANAL_META, FUNIL_ACCENT, TIPO_EVENTO_META } from "../lib/constants";
import { formatDataBR, formatMoedaBRL, formatTempoDecorrido } from "../lib/format";

function iniciais(nome: string): string {
  const partes = nome.split(/[\s&]+/).filter(Boolean);
  const primeiras = partes.slice(0, 2).map((parte) => parte[0]);
  return primeiras.join("").toUpperCase();
}

export interface LeadCardProps {
  lead: Lead;
  onSelect: (leadId: string) => void;
  onDragStart: (leadId: string) => void;
  onDragEnd: () => void;
  dimmed?: boolean;
}

export function LeadCard({
  lead,
  onSelect,
  onDragStart,
  onDragEnd,
  dimmed = false,
}: LeadCardProps) {
  const canal = CANAL_META[lead.canal];
  const tipoEvento = TIPO_EVENTO_META[lead.evento.tipo];
  const CanalIcon = canal.icon;
  const TipoIcon = tipoEvento.icon;

  return (
    <div
      data-demo-id={`crm-card-${lead.id}`}
      draggable
      role="button"
      tabIndex={0}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", lead.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(lead.id);
      }}
      onDragEnd={onDragEnd}
      onClick={() => onSelect(lead.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(lead.id);
        }
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      {/* `layout`/`layoutId` aqui (não no wrapper acima) para não colidir com os
          handlers nativos de drag-and-drop HTML5 — o Framer Motion redefine
          onDragStart/onDragEnd para seu próprio sistema de gestos de pan quando
          aplicados diretamente num motion.*, com uma assinatura incompatível
          com `DataTransfer`. Isolar a animação de layout num filho evita o
          conflito e ainda anima o card inteiro ao mudar de coluna (ver
          `moveLead` em features/demo/useDemoPlayer.ts). */}
      <motion.div
        layout
        layoutId={`crm-card-layout-${lead.id}`}
        transition={{ type: "spring", stiffness: 350, damping: 32 }}
        className={cn(
          "flex flex-col gap-2 rounded-lg border border-l-4 bg-card p-3 text-left shadow-sm transition hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          FUNIL_ACCENT[lead.estado],
          dimmed && "opacity-70",
        )}
      >
        <div className="flex items-start gap-2">
          <Avatar size="sm">
            <AvatarImage src={lead.avatarUrl} alt={lead.nome} />
            <AvatarFallback>{iniciais(lead.nome)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-card-foreground">
              {lead.nome}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CanalIcon className="size-3.5 shrink-0" />
              <span className="truncate">{lead.contato}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <TipoIcon className="size-3.5 shrink-0" />
            {tipoEvento.label}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5 shrink-0" />
            {formatDataBR(lead.evento.dataDesejada)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="flex items-center gap-1 text-sm font-semibold text-success">
            <Banknote className="size-3.5 shrink-0" />
            {formatMoedaBRL(lead.evento.valorEstimado)}
          </span>
          <span
            className="flex items-center gap-1 text-xs text-muted-foreground"
            title="Tempo desde a última interação"
          >
            <Clock className="size-3.5 shrink-0" />
            {formatTempoDecorrido(lead.ultimaMensagemEm)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
