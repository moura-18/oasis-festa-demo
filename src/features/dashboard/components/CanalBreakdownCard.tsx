import { Camera, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Lead } from "@/types";

interface CanalBreakdownCardProps {
  leads: Lead[];
}

/**
 * Indicador de origem dos leads no período selecionado (WhatsApp vs.
 * Instagram) — ver `dashboard/index.tsx` para o filtro de tempo que alimenta
 * a lista `leads` já recortada pelo período.
 */
export function CanalBreakdownCard({ leads }: CanalBreakdownCardProps) {
  const total = leads.length;
  const whatsapp = leads.filter((lead) => lead.canal === "whatsapp").length;
  const instagram = total - whatsapp;
  const pctWhatsapp = total > 0 ? Math.round((whatsapp / total) * 100) : 0;
  const pctInstagram = total > 0 ? 100 - pctWhatsapp : 0;

  return (
    <Card data-demo-id="dashboard-canal-breakdown">
      <CardHeader>
        <CardTitle>Origem dos leads</CardTitle>
        <CardDescription>
          {total > 0
            ? `${total} lead${total === 1 ? "" : "s"} no período selecionado`
            : "Nenhum lead no período selecionado"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div
          data-demo-id="dashboard-canal-whatsapp"
          className="flex items-center gap-3"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
            <MessageCircle className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>WhatsApp</span>
              <span className="tabular-nums">
                {whatsapp} · {pctWhatsapp}%
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success transition-[width] duration-300"
                style={{ width: `${pctWhatsapp}%` }}
              />
            </div>
          </div>
        </div>

        <div
          data-demo-id="dashboard-canal-instagram"
          className="flex items-center gap-3"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange-500/15 text-brand-orange-600">
            <Camera className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Instagram</span>
              <span className="tabular-nums">
                {instagram} · {pctInstagram}%
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand-orange-500 transition-[width] duration-300"
                style={{ width: `${pctInstagram}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
