import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { DownloadButton } from "@/components/domain/download-button";
import { ButtonLink } from "@/components/primitives/button-link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CourseEditorialFeatureProps = {
  certification: string;
  duration: string;
  image: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  modules: string[];
  modulesTitle: string;
  summary: string;
  title: string;
  className?: string;
  detailHref?: string;
  detailLabel?: string;
  downloadHref?: string;
  downloadLabel?: string;
  featured?: boolean;
  reverse?: boolean;
  variant?: "showcase" | "compact";
};

export function CourseEditorialFeature({
  certification,
  className,
  detailHref,
  detailLabel,
  downloadHref,
  downloadLabel,
  duration,
  featured = false,
  image,
  modules,
  modulesTitle,
  reverse = false,
  summary,
  title,
  variant = "showcase",
}: CourseEditorialFeatureProps) {
  const isCompact = variant === "compact";
  const previewModules = modules.slice(0, isCompact ? 3 : 5);

  return (
    <article
      data-slot="course-editorial"
      className={cn(
        "grid items-center gap-8",
        isCompact
          ? "gap-6 lg:grid-cols-[minmax(0,0.38fr)_1fr] lg:gap-10"
          : "lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-12",
        reverse && "lg:[&>*:first-child]:order-2",
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0">
        {featured ? (
          <span
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-3xl bg-primary-soft/70 motion-reduce:transition-none md:-inset-4"
          />
        ) : null}
        <div
          className={cn(
            "relative mx-auto w-full overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-soft",
            image.width / image.height <= 1 ? "max-w-sm" : "max-w-md",
          )}
          data-slot="course-image"
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
          }}
        >
          <Image
            alt={image.alt}
            className="object-contain"
            fill
            sizes={
              isCompact
                ? "(min-width: 1024px) 28vw, 92vw"
                : "(min-width: 1024px) 42vw, 92vw"
            }
            src={image.src}
          />
        </div>
      </div>

      <div className={cn(featured && "lg:pl-1")}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{duration}</Badge>
          <Badge variant="outline">{certification}</Badge>
        </div>
        <h3
          className={cn(
            "mt-4 text-balance font-display leading-tight text-foreground",
            isCompact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 text-muted-foreground",
            isCompact ? "text-sm leading-6" : "text-base leading-7",
          )}
        >
          {summary}
        </p>

        {previewModules.length > 0 ? (
          <div className="mt-6 border-l-2 border-primary/45 pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-text">
              {modulesTitle}
            </p>
            <ul className="mt-3 grid gap-2">
              {previewModules.map((module) => (
                <li
                  className="flex items-start gap-2.5 text-sm leading-6 text-foreground/85"
                  key={module}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          {detailHref && detailLabel ? (
            <ButtonLink href={detailHref}>
              {detailLabel}
              <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
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
