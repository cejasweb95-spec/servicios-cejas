import { type ReactNode } from "react";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageHero({
  actions,
  aside,
  className,
  description,
  eyebrow,
  title,
}: PageHeroProps) {
  return (
    <header className={cn("border-b border-border bg-surface-strong", className)}>
      <Container
        className={cn(
          "grid min-h-[52dvh] content-center gap-10 py-14 sm:py-20",
          aside && "lg:grid-cols-[1.08fr_0.92fr]",
        )}
      >
        <div className="min-w-0 max-w-3xl">
          {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
          <h1 className="text-balance font-display text-4xl leading-[1.08] text-foreground sm:text-6xl sm:leading-[1.02] lg:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="min-w-0 self-end">{aside}</div> : null}
      </Container>
    </header>
  );
}
