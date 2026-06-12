"use client";

import { useTranslations } from "next-intl";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/config";
import { InstagramIcon } from "./icons";

type InstagramInviteProps = {
  tone?: "light" | "dark";
  compact?: boolean;
};

export function InstagramInvite({
  tone = "light",
  compact = false,
}: InstagramInviteProps) {
  const t = useTranslations("instagram");

  return (
    <a
      href={INSTAGRAM_URL}
      className={`instagram-invite instagram-invite--${tone}${compact ? " instagram-invite--compact" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("followAria", { handle: INSTAGRAM_HANDLE })}
    >
      <span className="instagram-invite__icon" aria-hidden="true">
        <InstagramIcon size={22} />
      </span>
      <span className="instagram-invite__copy">
        <span className="instagram-invite__label">{t("follow")}</span>
        <span className="instagram-invite__handle">@{INSTAGRAM_HANDLE}</span>
      </span>
      <span className="instagram-invite__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
