import { ButtonLink } from "@/components/primitives/button-link";
import { ServicePriceBlock } from "@/components/domain/service-price-block";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  description: string;
  price?: string;
  duration?: string;
  resultDuration?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  variant?: "default" | "featured" | "compact";
};

export function ServiceCard({
  actionHref,
  actionLabel,
  className,
  description,
  duration,
  price,
  resultDuration,
  title,
  variant = "default",
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-surface p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft focus-within:border-primary/50 focus-within:shadow-soft motion-reduce:transform-none",
        variant === "featured" && "shadow-soft",
        variant === "compact" && "p-4",
        className,
      )}
      data-slot="service-card"
    >
      <h3 className="font-display text-2xl leading-tight text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-4">
        <ServicePriceBlock
          duration={duration}
          price={price}
          resultDuration={resultDuration}
        />
      </div>
      {actionHref && actionLabel ? (
        <div className="mt-5">
          <ButtonLink href={actionHref} size="sm" variant="outline">
            {actionLabel}
          </ButtonLink>
        </div>
      ) : null}
    </article>
  );
}
