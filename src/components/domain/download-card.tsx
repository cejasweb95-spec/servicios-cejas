import { Badge } from "@/components/ui/badge";
import { DownloadButton } from "@/components/domain/download-button";
import { cn } from "@/lib/utils";

type DownloadCardProps = {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  meta?: string;
  className?: string;
};

export function DownloadCard({
  actionLabel,
  className,
  description,
  href,
  meta,
  title,
}: DownloadCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-surface p-5 shadow-soft transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 focus-within:border-primary/50 motion-reduce:transform-none",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl leading-tight text-foreground">{title}</h3>
        {meta ? <Badge variant="outline">{meta}</Badge> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-5">
        <DownloadButton href={href} label={actionLabel} />
      </div>
    </article>
  );
}
