import { useMemo, useState } from "react";
import { useAppStore } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { CalendarEvent } from "@/types";
import { MonthCalendar } from "./components/MonthCalendar";
import { UpcomingConfirmedList } from "./components/UpcomingConfirmedList";
import { EventDetailsDialog } from "./components/EventDetailsDialog";
import { toISODate } from "./lib/date";

export default function AgendaPage() {
  const calendarEvents = useAppStore((s) => s.calendarEvents);
  const leads = useAppStore((s) => s.leads);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month0, setMonth0] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const leadsPorId = useMemo(() => new Map(leads.map((lead) => [lead.id, lead])), [leads]);

  const eventosPorDia = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const evento of calendarEvents) {
      const lista = map.get(evento.data) ?? [];
      lista.push(evento);
      map.set(evento.data, lista);
    }
    return map;
  }, [calendarEvents]);

  const hojeIso = toISODate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const proximosConfirmados = useMemo(() => {
    return calendarEvents
      .filter((evento) => evento.status === "confirmado" && evento.data >= hojeIso)
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [calendarEvents, hojeIso]);

  function handleNavigate(deltaMonths: number) {
    const next = new Date(year, month0 + deltaMonths, 1);
    setYear(next.getFullYear());
    setMonth0(next.getMonth());
  }

  const eventosDoDialogo = selectedDay ? (eventosPorDia.get(selectedDay) ?? []) : [];

  return (
    <div data-demo-id="page-agenda" className="flex h-full flex-col gap-6 overflow-auto p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Agenda</h1>
        <p className="text-sm text-muted-foreground">
          Disponibilidade do espaço, reservas e confirmações.
        </p>
      </div>

      <Tabs defaultValue="mes" className="gap-4">
        <TabsList data-demo-id="agenda-toggle-visualizacao" className="w-fit">
          <TabsTrigger data-demo-id="agenda-toggle-mes" value="mes">
            Mês
          </TabsTrigger>
          <TabsTrigger data-demo-id="agenda-toggle-lista" value="lista">
            Próximos confirmados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mes">
          <MonthCalendar
            year={year}
            month0={month0}
            eventosPorDia={eventosPorDia}
            onSelectDay={setSelectedDay}
            onNavigate={handleNavigate}
          />
        </TabsContent>

        <TabsContent value="lista">
          <UpcomingConfirmedList
            eventos={proximosConfirmados}
            leadsPorId={leadsPorId}
            onSelectDay={setSelectedDay}
          />
        </TabsContent>
      </Tabs>

      <EventDetailsDialog
        iso={selectedDay}
        eventos={eventosDoDialogo}
        leadsPorId={leadsPorId}
        onOpenChange={(open) => {
          if (!open) setSelectedDay(null);
        }}
      />
    </div>
  );
}
