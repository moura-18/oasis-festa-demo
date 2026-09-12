import { CalendarCheck } from "lucide-react";
import type { CalendarEvent, Lead } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATUS_INFO, TIPO_EVENTO_LABEL } from "../lib/status";

function formatDataCurta(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

interface UpcomingConfirmedListProps {
  eventos: CalendarEvent[];
  leadsPorId: Map<string, Lead>;
  onSelectDay: (iso: string) => void;
}

/**
 * Lista auxiliar dos próximos eventos confirmados (a partir de hoje),
 * ordenados por data — visão rápida para uso não-técnico, sem precisar
 * navegar mês a mês no calendário.
 */
export function UpcomingConfirmedList({
  eventos,
  leadsPorId,
  onSelectDay,
}: UpcomingConfirmedListProps) {
  if (eventos.length === 0) {
    return (
      <div
        data-demo-id="agenda-proximos-vazio"
        className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 text-center text-muted-foreground"
      >
        <CalendarCheck className="size-8" />
        <p>Nenhum evento confirmado futuro no momento.</p>
      </div>
    );
  }

  return (
    <div data-demo-id="agenda-proximos-confirmados" className="flex flex-col gap-3">
      {eventos.map((evento) => {
        const lead = evento.leadId ? leadsPorId.get(evento.leadId) : undefined;
        return (
          <Card
            key={evento.id}
            data-demo-id={`agenda-proximo-evento-${evento.id}`}
            role="button"
            tabIndex={0}
            onClick={() => onSelectDay(evento.data)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelectDay(evento.data);
            }}
            className="cursor-pointer py-4 transition-colors hover:bg-accent"
          >
            <CardContent className="flex items-center justify-between gap-4 px-4">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">
                  {evento.titulo ?? TIPO_EVENTO_LABEL[evento.tipo]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDataCurta(evento.data)} · {TIPO_EVENTO_LABEL[evento.tipo]}
                  {lead ? ` · ${lead.nome}` : ""}
                </span>
              </div>
              <Badge variant="outline" className={STATUS_INFO[evento.status].badge}>
                {STATUS_INFO[evento.status].label}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
