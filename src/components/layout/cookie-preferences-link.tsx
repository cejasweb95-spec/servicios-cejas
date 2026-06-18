"use client";

import { Button } from "@/components/ui/button";

type CookiePreferencesLinkProps = {
  label: string;
};

export function CookiePreferencesLink({ label }: CookiePreferencesLinkProps) {
  return (
    <Button
      className="px-0"
      data-cookie-preferences-trigger
      onClick={() => {
        document.dispatchEvent(new Event("cejas:open-cookie-preferences"));
      }}
      type="button"
      variant="link"
    >
      {label}
    </Button>
  );
}
