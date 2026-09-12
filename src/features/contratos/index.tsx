import { useMemo, useState } from "react";
import { useAppStore } from "@/store";
import type { Contract } from "@/types";
import { ContractForm } from "./components/ContractForm";
import { ContractPreview } from "./components/ContractPreview";
import { Toast } from "./components/Toast";
import { estadoInicialDoLead, formParaContractDados } from "./lib/form-state";
import { gerarTextoContrato } from "./lib/contract-template";
import type { ContractFormState } from "./types";

export default function ContratosPage() {
  const leads = useAppStore((s) => s.leads);
  const contracts = useAppStore((s) => s.contracts);
  const atualizarContrato = useAppStore((s) => s.atualizarContrato);
  const adicionarContrato = useAppStore((s) => s.adicionarContrato);

  const [selectedLeadId, setSelectedLeadId] = useState(
    () => leads.find((lead) => lead.id === "lead-06")?.id ?? leads[0]?.id ?? "",
  );

  const contratoExistente = useMemo(
    () => contracts.find((c) => c.leadId === selectedLeadId),
    [contracts, selectedLeadId],
  );

  const [form, setForm] = useState<ContractFormState>(() => {
    const lead = leads.find((l) => l.id === selectedLeadId);
    return lead
      ? estadoInicialDoLead(lead, contratoExistente)
      : {
          nomeCliente: "",
          tipoEvento: "outro",
          data: "",
          convidados: "0",
          valorTotal: "0",
          formaPagamento: "",
          clausulasSelecionadas: [],
        };
  });

  const [toastVisible, setToastVisible] = useState(false);

  function handleSelectLead(leadId: string) {
    setSelectedLeadId(leadId);
    const lead = leads.find((l) => l.id === leadId);
    const contrato = contracts.find((c) => c.leadId === leadId);
    if (lead) {
      setForm(estadoInicialDoLead(lead, contrato));
    }
  }

  function handleChange(patch: Partial<ContractFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function handleToggleClausula(clausula: string) {
    setForm((prev) => ({
      ...prev,
      clausulasSelecionadas: prev.clausulasSelecionadas.includes(clausula)
        ? prev.clausulasSelecionadas.filter((c) => c !== clausula)
        : [...prev.clausulasSelecionadas, clausula],
    }));
  }

  function handleEnviarParaAssinatura() {
    if (!selectedLeadId) return;
    const dados = formParaContractDados(form);
    const textoPreview = gerarTextoContrato(dados);

    if (contratoExistente) {
      atualizarContrato(contratoExistente.id, {
        dados,
        textoPreview,
        status: "enviado",
      });
    } else {
      const agora = new Date().toISOString();
      const novoContrato: Contract = {
        id: crypto.randomUUID(),
        leadId: selectedLeadId,
        dados,
        status: "enviado",
        textoPreview,
        criadoEm: agora,
        atualizadoEm: agora,
      };
      adicionarContrato(novoContrato);
    }

    setToastVisible(true);
  }

  const dadosPreview = formParaContractDados(form);
  const status = contratoExistente?.status ?? "rascunho";

  return (
    <div
      data-demo-id="page-contratos"
      className="grid h-full grid-cols-1 gap-6 overflow-auto p-6 lg:grid-cols-2 lg:items-start"
    >
      <ContractForm
        leads={leads}
        selectedLeadId={selectedLeadId}
        onSelectLead={handleSelectLead}
        form={form}
        onChange={handleChange}
        onToggleClausula={handleToggleClausula}
        status={status}
        onEnviarParaAssinatura={handleEnviarParaAssinatura}
      />

      <ContractPreview dados={dadosPreview} status={status} />

      <Toast
        message="Contrato enviado para assinatura com sucesso!"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </div>
  );
}
