import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/config";
import { InstagramIcon } from "./icons";

type InstagramInviteProps = {
  /** Sobre fondo claro (secciones) u oscuro (CTA) */
  tone?: "light" | "dark";
  /** Una línea, para el hero */
  compact?: boolean;
};

export function InstagramInvite({
  tone = "light",
  compact = false,
}: InstagramInviteProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      className={`instagram-invite instagram-invite--${tone}${compact ? " instagram-invite--compact" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Seguir a Cejas Internacionales en Instagram, @${INSTAGRAM_HANDLE}`}
    >
      <span className="instagram-invite__icon" aria-hidden="true">
        <InstagramIcon size={22} />
      </span>
      <span className="instagram-invite__copy">
        <span className="instagram-invite__label">Síguenos en Instagram</span>
        <span className="instagram-invite__handle">@{INSTAGRAM_HANDLE}</span>
      </span>
      <span className="instagram-invite__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
