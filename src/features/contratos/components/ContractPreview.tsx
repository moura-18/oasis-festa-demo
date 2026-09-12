import { FileText } from "lucide-react";
import type { ContractDados, ContractStatus } from "@/types";
import { cn } from "@/lib/utils";
import { gerarTextoContrato } from "../lib/contract-template";

interface ContractPreviewProps {
  dados: ContractDados;
  status: ContractStatus;
}

/**
 * Preview do contrato em formato "documento impresso": fonte serifada,
 * papel creme, sombra suave — visualmente distinto do resto do painel (que
 * usa a paleta neutra + verde/laranja da marca), reforçando a metáfora de
 * "isto é o PDF que vai sair daqui".
 */
export function ContractPreview({ dados, status }: ContractPreviewProps) {
  const texto = gerarTextoContrato(dados);

  return (
    <div
      data-demo-id="contrato-preview-card"
      className="flex h-fit flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="size-4" />
        Pré-visualização do contrato
        {status !== "rascunho" && (
          <span
            data-demo-id="contrato-preview-status-inline"
            className={cn(
              "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
              status === "enviado" && "bg-accent text-accent-foreground",
              status === "assinado" && "bg-success/15 text-success",
            )}
          >
            {status === "enviado" ? "Enviado para assinatura" : "Assinado"}
          </span>
        )}
      </div>

      <div
        data-demo-id="contrato-preview-documento"
        className="relative mx-auto w-full max-w-2xl rounded-sm bg-amber-50 p-10 shadow-lg ring-1 ring-stone-900/10"
      >
        <div
          data-demo-id="contrato-preview-texto"
          className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-stone-800"
        >
          {texto}
        </div>
      </div>
    </div>
  );
}
