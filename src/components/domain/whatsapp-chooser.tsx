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
        <div className="grid gap-3">
          {targets.map((target) => (
            <Button
              asChild
              className="min-h-14 w-full justify-start whitespace-normal rounded-lg px-4 py-3"
              key={target.id}
              variant={target.id === "colombia" ? "outline" : "whatsapp"}
            >
              <a
                href={buildWhatsAppHref(target.phoneE164, target.defaultMessage)}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" data-icon="inline-start" />
                <span className="flex flex-col items-start gap-0.5">
                  <span>{target.label}</span>
                  <span className="text-xs font-medium opacity-80">
                    +{target.phoneE164}
                  </span>
                </span>
                <ExternalLink aria-hidden="true" data-icon="inline-end" />
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
