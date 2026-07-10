"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackConsentEvent } from "@/lib/analytics/track-consent-event";

type DownloadButtonProps = {
  href: string;
  label: string;
  download?: boolean;
};

export function DownloadButton({ download = true, href, label }: DownloadButtonProps) {
  return (
    <Button asChild variant="download">
      <a
        download={download}
        href={href}
        onClick={() =>
          trackConsentEvent("catalog_download", { file_url: href })
        }
      >
        <Download aria-hidden="true" data-icon="inline-start" />
        {label}
      </a>
    </Button>
  );
}
