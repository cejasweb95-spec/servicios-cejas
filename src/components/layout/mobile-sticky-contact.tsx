"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WhatsAppTarget = {
  id: string;
  label: string;
  phoneE164: string;
  defaultMessage: string;
};

type MobileStickyContactProps = {
  contactLabel: string;
  whatsapp: {
    closeLabel: string;
    description: string;
    targets: WhatsAppTarget[];
    title: string;
  };
};

const CONSENT_STORAGE_KEY = "cejas_cookie_consent_v1";

function hasCookieDecision() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return Boolean(localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return false;
  }
}

export function MobileStickyContact({
  contactLabel,
  whatsapp,
}: MobileStickyContactProps) {
  const [visible, setVisible] = useState(false);
  const [cookiesResolved, setCookiesResolved] = useState(false);

  useEffect(() => {
    const sync = () => {
      setCookiesResolved(hasCookieDecision());
      setVisible(window.scrollY > 520);
    };

    sync();

    const onScroll = () => {
      setVisible(window.scrollY > 520);
    };

    const onConsent = () => {
      setCookiesResolved(hasCookieDecision());
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("cejas:cookie-consent-changed", onConsent);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("cejas:cookie-consent-changed", onConsent);
    };
  }, []);

  if (!visible || !cookiesResolved) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-primary/25 bg-surface-strong/95 shadow-elevated backdrop-blur-xl",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 xl:hidden",
      )}
    >
      <div className="mx-auto flex max-w-7xl px-5">
        <WhatsAppChooser
          closeLabel={whatsapp.closeLabel}
          description={whatsapp.description}
          targets={whatsapp.targets}
          title={whatsapp.title}
          triggerLabel={contactLabel}
        >
          <Button className="min-h-12 w-full shadow-soft" variant="default">
            <MessageCircle aria-hidden="true" data-icon="inline-start" />
            {contactLabel}
          </Button>
        </WhatsAppChooser>
      </div>
    </div>
  );
}
