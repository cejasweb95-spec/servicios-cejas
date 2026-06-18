import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/primitives/button-link";
import { DownloadButton } from "@/components/domain/download-button";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  title: string;
  summary: string;
  duration: string;
  certification: string;
  detailHref?: string;
  detailLabel?: string;
  downloadHref?: string;
  downloadLabel?: string;
  className?: string;
};

export function CourseCard({
  certification,
  className,
  detailHref,
  detailLabel,
  downloadHref,
  downloadLabel,
  duration,
  summary,
  title,
}: CourseCardProps) {
  return (
    <article className={cn("rounded-lg border border-border bg-surface p-5", className)}>
      <div className="flex flex-wrap gap-2">
        <Badge>{duration}</Badge>
        <Badge variant="outline">{certification}</Badge>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-tight text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {detailHref && detailLabel ? (
          <ButtonLink href={detailHref} size="sm" variant="outline">
            {detailLabel}
          </ButtonLink>
        ) : null}
        {downloadHref && downloadLabel ? (
          <DownloadButton href={downloadHref} label={downloadLabel} />
        ) : null}
      </div>
    </article>
  );
}
