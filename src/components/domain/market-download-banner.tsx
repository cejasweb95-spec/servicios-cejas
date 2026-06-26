import { DownloadButton } from "@/components/domain/download-button";
import { WhatsAppCTA } from "@/components/domain/whatsapp-cta";

type MarketDownloadBannerProps = {
  title: string;
  description: string;
  downloadHref?: string;
  downloadLabel?: string;
  whatsappHref: string;
  whatsappLabel: string;
};

export function MarketDownloadBanner({
  description,
  downloadHref,
  downloadLabel,
  title,
  whatsappHref,
  whatsappLabel,
}: MarketDownloadBannerProps) {
  return (
    <aside className="rounded-2xl border border-primary/20 bg-primary-soft p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="font-display text-2xl text-foreground">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {downloadHref && downloadLabel ? (
            <DownloadButton href={downloadHref} label={downloadLabel} />
          ) : null}
          <WhatsAppCTA href={whatsappHref} label={whatsappLabel} variant="whatsapp" />
        </div>
      </div>
    </aside>
  );
}
