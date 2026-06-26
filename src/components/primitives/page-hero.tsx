import { type ReactNode } from "react";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { RoseWash } from "@/components/primitives/rose-wash";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
  /** When true (default), the aside (usually a photo) appears above copy on mobile. */
  mobileAsideFirst?: boolean;
};

export function PageHero({
  actions,
  aside,
  className,
  description,
  eyebrow,
  mobileAsideFirst = true,
  title,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={cn("border-b border-primary/20 bg-surface-strong", className)}
    >
      <RoseWash accent="corner">
        <Container
          className={cn(
            "grid min-h-0 content-center gap-8 py-10 sm:gap-10 sm:py-16 lg:min-h-[52dvh] lg:py-20",
            aside && "max-lg:grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]",
          )}
        >
          <div
            className={cn(
              "min-w-0 max-w-3xl",
              mobileAsideFirst ? "max-lg:order-last" : "max-lg:order-first",
            )}
          >
            {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
            <h1
              className="text-balance font-display text-[1.75rem] leading-[1.1] text-foreground sm:text-6xl sm:leading-[1.02] lg:text-7xl"
              id="page-hero-title"
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
                {description}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">{actions}</div>
            ) : null}
          </div>
          {aside ? (
            <div
              className={cn(
                "min-w-0 lg:self-end",
                mobileAsideFirst ? "max-lg:order-first" : "max-lg:order-last",
              )}
            >
              {aside}
            </div>
          ) : null}
        </Container>
      </RoseWash>
    </section>
  );
}
