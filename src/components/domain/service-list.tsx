import { ArrowUpRight } from "lucide-react";

import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Link } from "@/i18n/navigation";

export type ServiceListItem = {
  id: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  resultDuration?: string;
  actionHref?: string;
  actionLabel?: string;
  featured?: boolean;
};

export type ServiceListGroup = {
  id: string;
  title: string;
  description: string;
  services: ServiceListItem[];
};

type ServiceListProps = {
  groups: ServiceListGroup[];
};

export function ServiceList({ groups }: ServiceListProps) {
  return (
    <div className="grid gap-14">
      {groups.map((group) => (
        <section aria-labelledby={`${group.id}-title`} key={group.id}>
          <div className="max-w-3xl border-b border-primary/30 pb-4">
            <h2
              className="font-display text-3xl leading-tight text-foreground"
              id={`${group.id}-title`}
            >
              {group.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {group.description}
            </p>
          </div>
          <StaggerList className="mt-1">
            {group.services.map((service) => {
              const meta = [service.duration, service.resultDuration]
                .filter(Boolean)
                .join(" · ");

              return (
                <StaggerListItem key={service.id}>
                  <article className="group border-b border-primary/15" data-slot="service-row">
                    <div className="flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                      <div className="md:flex-1">
                        <h3 className="font-display text-xl leading-snug text-foreground">
                          {service.actionHref ? (
                            <Link
                              aria-label={
                                service.actionLabel
                                  ? `${service.title} – ${service.actionLabel}`
                                  : service.title
                              }
                              className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-primary-text focus-visible:text-primary-text focus-visible:underline focus-visible:outline-none"
                              href={service.actionHref}
                            >
                              {service.title}
                              {service.featured ? (
                                <span
                                  aria-hidden="true"
                                  className="text-base text-primary"
                                >
                                  ★
                                </span>
                              ) : null}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 shrink-0 opacity-70 transition group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none md:-translate-x-1 md:opacity-0"
                              />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center gap-1.5">
                              {service.title}
                              {service.featured ? (
                                <span
                                  aria-hidden="true"
                                  className="text-base text-primary"
                                >
                                  ★
                                </span>
                              ) : null}
                            </span>
                          )}
                        </h3>
                        <p className="mt-1.5 max-w-prose text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-baseline gap-3 md:flex-col md:items-end md:gap-1 md:text-right">
                        {service.price ? (
                          <span className="font-display text-lg leading-none text-foreground">
                            {service.price}
                          </span>
                        ) : null}
                        {meta ? (
                          <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
                            {meta}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </StaggerListItem>
              );
            })}
          </StaggerList>
        </section>
      ))}
    </div>
  );
}
