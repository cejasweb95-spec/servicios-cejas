import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type WhatsAppCTAProps = {
  href: string;
  label: string;
  variant?: "default" | "whatsapp" | "secondary" | "outline";
};

export function WhatsAppCTA({
  href,
  label,
  variant = "whatsapp",
}: WhatsAppCTAProps) {
  return (
    <Button asChild variant={variant}>
      <a href={href} rel="noreferrer" target="_blank">
        <MessageCircle aria-hidden="true" data-icon="inline-start" />
        {label}
      </a>
    </Button>
  );
}
