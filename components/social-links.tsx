"use client";

import { useTranslations } from "next-intl";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/config";
import { InstagramIcon, WhatsAppIcon } from "./icons";

type SocialLinksProps = {
  whatsappUrl: string;
  variant?: "compact" | "footer";
};

export function SocialLinks({ whatsappUrl, variant = "compact" }: SocialLinksProps) {
  const tCommon = useTranslations("common");
  const tIg = useTranslations("instagram");
  const isFooter = variant === "footer";

  return (
    <div
      className={`social-links${isFooter ? " social-links--footer" : " social-links--inline"}`}
      role="group"
      aria-label={tCommon("navSocial")}
    >
      <div className="social-links__icons">
        <a
          href={INSTAGRAM_URL}
          className="icon-link icon-link--instagram"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tIg("iconAria", { handle: INSTAGRAM_HANDLE })}
        >
          <InstagramIcon />
        </a>
        <a
          href={whatsappUrl}
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
      {isFooter ? (
        <a
          href={INSTAGRAM_URL}
          className="social-links__handle"
          target="_blank"
          rel="noopener noreferrer"
        >
          @{INSTAGRAM_HANDLE}
        </a>
      ) : null}
    </div>
  );
}
