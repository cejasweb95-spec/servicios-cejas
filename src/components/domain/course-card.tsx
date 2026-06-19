import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/primitives/button-link";
import { DownloadButton } from "@/components/domain/download-button";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  title: string;
  summary: string;
  duration: string;
  image: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
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
  image,
  summary,
  title,
}: CourseCardProps) {
  return (
    <article
      data-slot="course-card"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-primary focus-within:border-primary",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          data-slot="course-image"
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
          height={image.height}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
          src={image.src}
          width={image.width}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{duration}</Badge>
          <Badge variant="outline">{certification}</Badge>
        </div>
        <h3 className="mt-4 text-balance font-display text-2xl leading-tight text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{summary}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          {detailHref && detailLabel ? (
            <ButtonLink href={detailHref} size="sm" variant="outline">
              {detailLabel}
            </ButtonLink>
          ) : null}
          {downloadHref && downloadLabel ? (
            <DownloadButton href={downloadHref} label={downloadLabel} />
          ) : null}
        </div>
      </div>
    </article>
  );
}
