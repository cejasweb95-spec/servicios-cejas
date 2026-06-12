import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/config";
import { InstagramIcon, WhatsAppIcon } from "./icons";

type SocialLinksProps = {
  whatsappUrl: string;
  /** Iconos compactos (header) o fila con @handle (footer) */
  variant?: "compact" | "footer";
};

export function SocialLinks({ whatsappUrl, variant = "compact" }: SocialLinksProps) {
  return (
    <div
      className={
        variant === "footer" ? "social-links social-links--footer" : "header__social"
      }
      role={variant === "footer" ? undefined : "group"}
      aria-label={variant === "footer" ? undefined : "Redes sociales"}
    >
      <a
        href={INSTAGRAM_URL}
        className="icon-link icon-link--instagram"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram @${INSTAGRAM_HANDLE}`}
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
      {variant === "footer" ? (
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
