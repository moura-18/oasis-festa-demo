import type { ContractStatus, Lead, TipoEvento } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CLAUSULAS_OPCIONAIS, FORMAS_PAGAMENTO } from "../lib/mock-options";
import { slugify } from "../lib/slug";
import { TIPO_EVENTO_LABELS, type ContractFormState } from "../types";

const TIPOS_EVENTO = Object.keys(TIPO_EVENTO_LABELS) as TipoEvento[];

const STATUS_BADGE: Record<
  ContractStatus,
  { label: string; variant: "outline" | "default" | "secondary" }
> = {
  rascunho: { label: "Rascunho", variant: "outline" },
  enviado: { label: "Enviado para assinatura", variant: "default" },
  assinado: { label: "Assinado", variant: "secondary" },
};

interface ContractFormProps {
  leads: Lead[];
  selectedLeadId: string;
  onSelectLead: (leadId: string) => void;
  form: ContractFormState;
  onChange: (patch: Partial<ContractFormState>) => void;
  onToggleClausula: (clausula: string) => void;
  status: ContractStatus;
  onEnviarParaAssinatura: () => void;
}

export function ContractForm({
  leads,
  selectedLeadId,
  onSelectLead,
  form,
  onChange,
  onToggleClausula,
  status,
  onEnviarParaAssinatura,
}: ContractFormProps) {
  const statusBadge = STATUS_BADGE[status];
  const jaAssinado = status === "assinado";

  return (
    <Card data-demo-id="contrato-form-card" className="h-fit">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="font-display text-xl">
            Gerar contrato
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecione um lead e ajuste os dados do evento.
          </p>
        </div>
        <Badge
          data-demo-id="contrato-badge-status"
          variant={statusBadge.variant}
        >
          {statusBadge.label}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contrato-select-lead">Lead</Label>
          <Select value={selectedLeadId} onValueChange={onSelectLead}>
            <SelectTrigger
              id="contrato-select-lead"
              data-demo-id="contrato-select-lead"
            >
              <SelectValue placeholder="Selecione um lead" />
            </SelectTrigger>
            <SelectContent>
              {leads.map((lead) => (
                <SelectItem
                  key={lead.id}
                  value={lead.id}
                  data-demo-id={`contrato-select-lead-option-${lead.id}`}
                >
                  {lead.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="contrato-input-nome-cliente">
              Nome do cliente
            </Label>
            <Input
              id="contrato-input-nome-cliente"
              data-demo-id="contrato-input-nome-cliente"
              value={form.nomeCliente}
              onChange={(e) => onChange({ nomeCliente: e.target.value })}
              placeholder="Nome do(a) contratante"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contrato-select-tipo-evento">
              Tipo de evento
            </Label>
            <Select
              value={form.tipoEvento}
              onValueChange={(value) =>
                onChange({ tipoEvento: value as TipoEvento })
              }
            >
              <SelectTrigger
                id="contrato-select-tipo-evento"
                data-demo-id="contrato-select-tipo-evento"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_EVENTO.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {TIPO_EVENTO_LABELS[tipo]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contrato-input-data">Data do evento</Label>
            <Input
              id="contrato-input-data"
              data-demo-id="contrato-input-data"
              type="date"
              value={form.data}
              onChange={(e) => onChange({ data: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contrato-input-convidados">Convidados</Label>
            <Input
              id="contrato-input-convidados"
              data-demo-id="contrato-input-convidados"
              type="number"
              min={0}
              value={form.convidados}
              onChange={(e) => onChange({ convidados: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contrato-input-valor">Valor total (R$)</Label>
            <Input
              id="contrato-input-valor"
              data-demo-id="contrato-input-valor"
              type="number"
              min={0}
              step={100}
              value={form.valorTotal}
              onChange={(e) => onChange({ valorTotal: e.target.value })}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="contrato-select-pagamento">
              Forma de pagamento
            </Label>
            <Select
              value={form.formaPagamento}
              onValueChange={(value) => onChange({ formaPagamento: value })}
            >
              <SelectTrigger
                id="contrato-select-pagamento"
                data-demo-id="contrato-select-pagamento"
              >
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                {FORMAS_PAGAMENTO.map((forma) => (
                  <SelectItem key={forma} value={forma}>
                    {forma}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="mb-1">Cláusulas opcionais inclusas</Label>
          <div
            data-demo-id="contrato-clausulas-lista"
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            {CLAUSULAS_OPCIONAIS.map((clausula) => {
              const checked = form.clausulasSelecionadas.includes(clausula);
              const slug = slugify(clausula);
              return (
                <div key={clausula} className="flex items-center gap-2">
                  <Checkbox
                    id={`contrato-checkbox-${slug}`}
                    data-demo-id={`contrato-checkbox-${slug}`}
                    checked={checked}
                    onCheckedChange={() => onToggleClausula(clausula)}
                  />
                  <Label
                    htmlFor={`contrato-checkbox-${slug}`}
                    className="cursor-pointer text-sm font-normal text-foreground"
                  >
                    {clausula}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          data-demo-id="contrato-btn-enviar-assinatura"
          size="lg"
          className="mt-2 w-full"
          disabled={jaAssinado || !selectedLeadId}
          onClick={onEnviarParaAssinatura}
        >
          {jaAssinado ? "Contrato já assinado" : "Enviar para assinatura"}
        </Button>
      </CardContent>
    </Card>
  );
}
