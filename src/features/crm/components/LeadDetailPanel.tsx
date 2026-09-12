import { useMemo } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MessageSquareText,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CANAL_META, FUNIL_LABELS, TIPO_EVENTO_META } from "../lib/constants";
import { formatDataBR, formatMoedaBRL, formatTempoDecorrido } from "../lib/format";

function iniciais(nome: string): string {
  const partes = nome.split(/[\s&]+/).filter(Boolean);
  return partes
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export interface LeadDetailPanelProps {
  leadId: string | null;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailPanel({ leadId, onOpenChange }: LeadDetailPanelProps) {
  const lead = useAppStore((state) =>
    leadId ? state.leads.find((item) => item.id === leadId) : undefined,
  );
  const messages = useAppStore((state) => state.messages);
  const historico = useMemo(() => {
    if (!leadId) return [];
    return messages
      .filter((message) => message.leadId === leadId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 4)
      .reverse();
  }, [messages, leadId]);

  const open = Boolean(lead);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-demo-id="crm-lead-detail-painel"
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-md flex-col border-l bg-background shadow-lg outline-none",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right duration-200",
          )}
        >
          {lead && (
            <>
              <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarImage src={lead.avatarUrl} alt={lead.nome} />
                    <AvatarFallback>{iniciais(lead.nome)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogPrimitive.Title className="text-base font-semibold text-foreground">
                      {lead.nome}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="flex items-center gap-1 text-xs text-muted-foreground">
                      {(() => {
                        const CanalIcon = CANAL_META[lead.canal].icon;
                        return <CanalIcon className="size-3.5 shrink-0" />;
                      })()}
                      {lead.contato}
                    </DialogPrimitive.Description>
                  </div>
                </div>
                <DialogPrimitive.Close
                  data-demo-id="crm-lead-detail-fechar"
                  className="rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="size-5" />
                  <span className="sr-only">Fechar</span>
                </DialogPrimitive.Close>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <Badge
                  variant="outline"
                  data-demo-id="crm-lead-detail-estado"
                  className="mb-4"
                >
                  {FUNIL_LABELS[lead.estado]}
                </Badge>

                <section className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Dados do evento
                  </h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      {(() => {
                        const TipoIcon = TIPO_EVENTO_META[lead.evento.tipo].icon;
                        return (
                          <TipoIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        );
                      })()}
                      <div>
                        <dt className="text-xs text-muted-foreground">Tipo</dt>
                        <dd className="font-medium text-foreground">
                          {TIPO_EVENTO_META[lead.evento.tipo].label}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Data desejada
                        </dt>
                        <dd className="font-medium text-foreground">
                          {formatDataBR(lead.evento.dataDesejada)}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Convidados
                        </dt>
                        <dd className="font-medium text-foreground">
                          {lead.evento.convidados}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wallet className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Valor estimado
                        </dt>
                        <dd className="font-medium text-success">
                          {formatMoedaBRL(lead.evento.valorEstimado)}
                        </dd>
                      </div>
                    </div>
                  </dl>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5 shrink-0" />
                    Última interação {formatTempoDecorrido(lead.ultimaMensagemEm)}
                  </p>
                </section>

                <Separator className="my-4" />

                <section className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Histórico recente
                  </h3>
                  {historico.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Nenhuma mensagem registrada ainda.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {historico.map((mensagem) => (
                        <li
                          key={mensagem.id}
                          className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"
                        >
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="text-xs font-medium capitalize text-muted-foreground">
                              {mensagem.autor}
                            </span>
                            <span className="text-[11px] text-muted-foreground/70">
                              {formatTempoDecorrido(mensagem.timestamp)}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-foreground/90">
                            {mensagem.texto}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>

              <div className="border-t border-border px-5 py-4">
                <Button asChild className="w-full">
                  <Link
                    to={`/inbox?leadId=${lead.id}`}
                    data-demo-id="crm-detail-btn-ver-conversa"
                    onClick={() => onOpenChange(false)}
                  >
                    <MessageSquareText className="size-4" />
                    Ver conversa
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
