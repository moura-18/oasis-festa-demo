import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Canal } from "@/types";

/**
 * Ícone de câmera estilizado (quadrado arredondado + lente + flash) usado
 * para representar o Instagram — lucide-react não traz ícones de marca.
 */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const CHANNEL_LABEL: Record<Canal, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
};

/** Ícone do canal (WhatsApp/Instagram), colorido com os tokens de marca. */
export function ChannelIcon({
  canal,
  className,
}: {
  canal: Canal;
  className?: string;
}) {
  if (canal === "whatsapp") {
    return (
      <MessageCircle
        className={cn("fill-success text-success", className)}
        aria-label={CHANNEL_LABEL.whatsapp}
      />
    );
  }
  return (
    <InstagramGlyph className={cn("text-brand-orange-500", className)} />
  );
}
