import {
  AtSign,
  Briefcase,
  Cake,
  Camera,
  GraduationCap,
  Heart,
  MessageCircle,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";
import type { Canal, LeadFunilEstado, TipoEvento } from "@/types";

/** Rótulos pt-BR das colunas do Kanban, incluindo "perdido" (coluna à parte). */
export const FUNIL_LABELS: Record<LeadFunilEstado, string> = {
  novo: "Novo",
  qualificando: "Qualificando",
  aguardando_disponibilidade: "Aguardando disponibilidade",
  tirando_duvidas: "Tirando dúvidas",
  pronto_para_fechar: "Pronto para fechar",
  aguardando_dona: "Aguardando atendente",
  contrato_enviado: "Contrato enviado",
  confirmado: "Confirmado",
  perdido: "Perdido",
};

/**
 * Classe de destaque visual do cabeçalho de cada coluna. Segue a diretriz da
 * marca (brand/BRAND.md): laranja para os estados de destaque
 * ("pronto para fechar", "aguardando atendente"), verde para o estado de sucesso
 * ("confirmado"), tom neutro/destructivo para "perdido", neutro para o resto.
 */
export const FUNIL_ACCENT: Record<LeadFunilEstado, string> = {
  novo: "border-l-muted-foreground/30",
  qualificando: "border-l-muted-foreground/30",
  aguardando_disponibilidade: "border-l-muted-foreground/30",
  tirando_duvidas: "border-l-muted-foreground/30",
  pronto_para_fechar: "border-l-brand-orange-500",
  aguardando_dona: "border-l-brand-orange-500",
  contrato_enviado: "border-l-brand-green-500",
  confirmado: "border-l-brand-green-600",
  perdido: "border-l-destructive/60",
};

export const CANAL_META: Record<Canal, { label: string; icon: LucideIcon }> = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
  instagram: { label: "Instagram", icon: Camera },
};

export const TIPO_EVENTO_META: Record<
  TipoEvento,
  { label: string; icon: LucideIcon }
> = {
  casamento: { label: "Casamento", icon: Heart },
  aniversario: { label: "Aniversário", icon: Cake },
  corporativo: { label: "Corporativo", icon: Briefcase },
  formatura: { label: "Formatura", icon: GraduationCap },
  outro: { label: "Outro evento", icon: PartyPopper },
};

/** Ícone genérico de contato, usado como fallback (não deve ser necessário com os 2 canais atuais). */
export const CONTATO_FALLBACK_ICON = AtSign;
