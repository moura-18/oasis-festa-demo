import { useMemo, useState, type DragEvent } from "react";
import { ORDEM_FUNIL, type LeadFunilEstado } from "@/types";
import { useAppStore } from "@/store";
import { KanbanColumn } from "./components/KanbanColumn";
import { PerdidoSection } from "./components/PerdidoSection";
import { LeadDetailPanel } from "./components/LeadDetailPanel";

type DropAlvo = LeadFunilEstado | "perdido";

export default function CrmPage() {
  const leads = useAppStore((state) => state.leads);
  const moverLeadNoFunil = useAppStore((state) => state.moverLeadNoFunil);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [perdidoAberto, setPerdidoAberto] = useState(false);
  const [dragOverAlvo, setDragOverAlvo] = useState<DropAlvo | null>(null);

  const leadsPorEstado = useMemo(() => {
    const mapa = new Map<LeadFunilEstado, typeof leads>();
    for (const estado of ORDEM_FUNIL) mapa.set(estado, []);
    for (const lead of leads) {
      if (lead.estado === "perdido") continue;
      mapa.get(lead.estado)?.push(lead);
    }
    return mapa;
  }, [leads]);

  const leadsPerdidos = useMemo(
    () => leads.filter((lead) => lead.estado === "perdido"),
    [leads],
  );

  function handleDrop(event: DragEvent<HTMLDivElement>, alvo: DropAlvo) {
    const leadId = event.dataTransfer.getData("text/plain");
    if (leadId) moverLeadNoFunil(leadId, alvo);
    setDragOverAlvo(null);
  }

  return (
    <div
      data-demo-id="page-crm"
      className="flex h-full flex-col gap-4 overflow-hidden p-6"
    >
      <header className="shrink-0">
        <h1 className="text-xl font-semibold text-foreground">
          CRM — Funil de leads
        </h1>
        <p className="text-sm text-muted-foreground">
          Arraste os cards entre as colunas para atualizar o estágio de cada
          lead no funil.
        </p>
      </header>

      <div className="flex flex-1 gap-3 overflow-x-auto overflow-y-hidden pb-1">
        {ORDEM_FUNIL.map((estado) => (
          <KanbanColumn
            key={estado}
            estado={estado}
            leads={leadsPorEstado.get(estado) ?? []}
            isDragOver={dragOverAlvo === estado}
            onDragEnterColumn={setDragOverAlvo}
            onDragLeaveColumn={() => setDragOverAlvo(null)}
            onDropLead={(alvo, event) => handleDrop(event, alvo)}
            onSelectLead={setSelectedLeadId}
            onCardDragStart={() => {}}
            onCardDragEnd={() => setDragOverAlvo(null)}
          />
        ))}
      </div>

      <PerdidoSection
        leads={leadsPerdidos}
        open={perdidoAberto}
        onToggle={() => setPerdidoAberto((atual) => !atual)}
        isDragOver={dragOverAlvo === "perdido"}
        onDragEnter={() => setDragOverAlvo("perdido")}
        onDragLeave={() => setDragOverAlvo(null)}
        onDropLead={(event) => handleDrop(event, "perdido")}
        onSelectLead={setSelectedLeadId}
        onCardDragStart={() => {}}
        onCardDragEnd={() => setDragOverAlvo(null)}
      />

      <LeadDetailPanel
        leadId={selectedLeadId}
        onOpenChange={(open) => {
          if (!open) setSelectedLeadId(null);
        }}
      />
    </div>
  );
}
