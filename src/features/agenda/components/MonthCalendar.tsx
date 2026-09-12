import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildMonthGrid, DIAS_SEMANA_ABREV, NOMES_MES } from "../lib/date";
import { STATUS_INFO } from "../lib/status";

interface MonthCalendarProps {
  year: number;
  /** Mês 0-indexado. */
  month0: number;
  eventosPorDia: Map<string, CalendarEvent[]>;
  onSelectDay: (iso: string) => void;
  onNavigate: (deltaMonths: number) => void;
}

/** Grade de calendário mensal com indicador colorido por status nos dias com evento. */
export function MonthCalendar({
  year,
  month0,
  eventosPorDia,
  onSelectDay,
  onNavigate,
}: MonthCalendarProps) {
  const weeks = buildMonthGrid(year, month0);

  return (
    <div data-demo-id="agenda-calendario-mes" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground capitalize">
          {NOMES_MES[month0]} {year}
        </h2>
        <div className="flex items-center gap-1">
          <Button
            data-demo-id="agenda-mes-anterior"
            variant="outline"
            size="icon-sm"
            onClick={() => onNavigate(-1)}
            aria-label="Mês anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            data-demo-id="agenda-mes-proximo"
            variant="outline"
            size="icon-sm"
            onClick={() => onNavigate(1)}
            aria-label="Próximo mês"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border bg-border">
        {DIAS_SEMANA_ABREV.map((dia) => (
          <div
            key={dia}
            className="bg-muted py-2 text-center text-xs font-medium uppercase text-muted-foreground"
          >
            {dia}
          </div>
        ))}

        {weeks.map((week) =>
          week.map((cell) => {
            const eventos = eventosPorDia.get(cell.iso) ?? [];
            const temEventos = eventos.length > 0;
            const statusesUnicos = Array.from(new Set(eventos.map((e) => e.status)));

            return (
              <button
                key={cell.iso}
                type="button"
                data-demo-id={`agenda-dia-${cell.iso}`}
                disabled={!temEventos}
                onClick={() => onSelectDay(cell.iso)}
                aria-label={
                  temEventos
                    ? `${cell.day}: ${eventos.length} evento(s), ver detalhes`
                    : `${cell.day}: sem eventos`
                }
                className={cn(
                  "flex min-h-20 flex-col items-start gap-1.5 bg-background p-2 text-left transition-colors",
                  cell.isCurrentMonth ? "text-foreground" : "text-muted-foreground/50",
                  temEventos && "cursor-pointer hover:bg-accent",
                  !temEventos && "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-sm",
                    cell.isToday && "bg-primary font-semibold text-primary-foreground",
                  )}
                >
                  {cell.day}
                </span>

                {temEventos && (
                  <div className="flex flex-wrap gap-1">
                    {statusesUnicos.map((status) => (
                      <span
                        key={status}
                        className={cn("size-2 rounded-full", STATUS_INFO[status].dot)}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          }),
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {(Object.keys(STATUS_INFO) as Array<keyof typeof STATUS_INFO>).map((status) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", STATUS_INFO[status].dot)} />
            {STATUS_INFO[status].label}
          </div>
        ))}
      </div>
    </div>
  );
}
