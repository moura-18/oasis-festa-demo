import type { CalendarEvent, Lead } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { STATUS_INFO, TIPO_EVENTO_LABEL } from "../lib/status";

function formatDataLonga(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface EventDetailsDialogProps {
  iso: string | null;
  eventos: CalendarEvent[];
  leadsPorId: Map<string, Lead>;
  onOpenChange: (open: boolean) => void;
}

/** Modal com os detalhes de todos os eventos de um dia clicado na agenda. */
export function EventDetailsDialog({
  iso,
  eventos,
  leadsPorId,
  onOpenChange,
}: EventDetailsDialogProps) {
  const open = iso !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-demo-id="agenda-detalhe-dia-dialog"
        className="max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="capitalize">
            {iso ? formatDataLonga(iso) : ""}
          </DialogTitle>
          <DialogDescription>
            {eventos.length === 1
              ? "1 evento nesta data"
              : `${eventos.length} eventos nesta data`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {eventos.map((evento, index) => {
            const lead = evento.leadId ? leadsPorId.get(evento.leadId) : undefined;
            const status = STATUS_INFO[evento.status];
            return (
              <div key={evento.id} data-demo-id={`agenda-detalhe-evento-${evento.id}`}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">
                      {evento.titulo ?? TIPO_EVENTO_LABEL[evento.tipo]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {TIPO_EVENTO_LABEL[evento.tipo]}
                    </span>
                  </div>
                  <Badge variant="outline" className={status.badge}>
                    {status.label}
                  </Badge>
                </div>

                <div className="mt-3 text-sm text-muted-foreground">
                  {lead ? (
                    <span>
                      Lead vinculado:{" "}
                      <span className="font-medium text-foreground">{lead.nome}</span>{" "}
                      ({lead.contato})
                    </span>
                  ) : (
                    <span>Sem lead vinculado neste evento.</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
