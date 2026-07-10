"use client";

import { ExternalLink, MessageCircle } from "lucide-react";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";
import { formatPhoneNumber } from "@/lib/format/phone";
import { trackConsentEvent } from "@/lib/analytics/track-consent-event";

type WhatsAppChooserTarget = {
  id: string;
  label: string;
  phoneE164: string;
  defaultMessage: string;
};

type WhatsAppChooserProps = {
  triggerLabel: string;
  title: string;
  description: string;
  closeLabel: string;
  targets: WhatsAppChooserTarget[];
  children?: ReactNode;
};

export function WhatsAppChooser({
  children,
  closeLabel,
  description,
  targets,
  title,
  triggerLabel,
}: WhatsAppChooserProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="default">
            <MessageCircle aria-hidden="true" data-icon="inline-start" />
            {triggerLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent closeLabel={closeLabel}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3" data-slot="whatsapp-options">
          {targets.map((target) => (
            <Button
              asChild
              className="min-h-16 w-full justify-start gap-3 whitespace-normal rounded-lg px-4 py-3 text-left"
              key={target.id}
              variant={target.id === "colombia" ? "outline" : "whatsapp"}
            >
              <a
                href={buildWhatsAppHref(target.phoneE164, target.defaultMessage)}
                onClick={() =>
                  trackConsentEvent("whatsapp_click", {
                    whatsapp_target: target.id,
                  })
                }
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" data-icon="inline-start" />
                <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span className="break-words leading-5">{target.label}</span>
                  <span className="text-sm font-medium opacity-80">
                    {formatPhoneNumber(target.phoneE164)}
                  </span>
                </span>
                <ExternalLink
                  aria-hidden="true"
                  className="ml-auto shrink-0"
                  data-icon="inline-end"
                />
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
