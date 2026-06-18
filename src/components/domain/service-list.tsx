import { ServiceCard } from "@/components/domain/service-card";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";

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
    <div className="grid gap-12">
      {groups.map((group) => (
        <section aria-labelledby={`${group.id}-title`} key={group.id}>
          <div className="max-w-3xl">
            <h2
              className="font-display text-3xl leading-tight text-foreground"
              id={`${group.id}-title`}
            >
              {group.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {group.description}
            </p>
          </div>
          <StaggerList className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.services.map((service) => (
              <StaggerListItem key={service.id}>
                <ServiceCard
                  actionHref={service.actionHref}
                  actionLabel={service.actionLabel}
                  description={service.description}
                  duration={service.duration}
                  price={service.price}
                  resultDuration={service.resultDuration}
                  title={service.title}
                  variant={service.featured ? "featured" : "default"}
                />
              </StaggerListItem>
            ))}
          </StaggerList>
        </section>
      ))}
    </div>
  );
}
