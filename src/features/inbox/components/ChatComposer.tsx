import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import type { Lead } from "@/types";

/**
 * Campo de resposta do chat. Envia como `autor: "atendente"` — esta tela é o
 * inbox de quem gerencia o espaço, respondendo ao lado do agente de IA.
 * Escreve via `@/store` (adicionarMensagem), sem estado paralelo.
 */
export function ChatComposer({ lead }: { lead: Lead }) {
  const [value, setValue] = useState("");
  const adicionarMensagem = useAppStore((s) => s.adicionarMensagem);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const texto = value.trim();
    if (!texto) return;
    adicionarMensagem({
      leadId: lead.id,
      autor: "atendente",
      canal: lead.canal,
      texto,
      tipo: "texto",
    });
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-demo-id={`inbox-composer-${lead.id}`}
      className="flex items-center gap-2 border-t border-border bg-card px-4 py-3"
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Responder como a atendente…"
        data-demo-id="inbox-composer-input"
        className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!value.trim()}
        data-demo-id="inbox-composer-send"
      >
        <Send className="size-4" />
      </Button>
    </form>
  );
}
