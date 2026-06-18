import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CoursePriceListItem = {
  id: string;
  market: string;
  modality: string;
  withKit: string;
  withoutKit: string;
};

type CoursePriceListProps = {
  items: CoursePriceListItem[];
  withKitLabel: string;
  withoutKitLabel: string;
  className?: string;
};

export function CoursePriceList({
  className,
  items,
  withKitLabel,
  withoutKitLabel,
}: CoursePriceListProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <article
          className="grid gap-4 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[0.9fr_1fr_1fr] sm:items-center"
          key={item.id}
        >
          <div>
            <h3 className="font-semibold text-foreground">{item.market}</h3>
            <Badge className="mt-2" variant="outline">
              {item.modality}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {withKitLabel}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {item.withKit}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {withoutKitLabel}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {item.withoutKit}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
