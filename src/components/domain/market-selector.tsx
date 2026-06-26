import { CountryFlag } from "@/components/primitives/country-flag";
import { Link } from "@/i18n/navigation";
import type { MarketId } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

type MarketSelectorItem = {
  id: MarketId;
  name: string;
  description: string;
  currency: string;
  href: string;
};

type MarketSelectorProps = {
  items: MarketSelectorItem[];
  activeId?: MarketId;
  label: string;
};

export function MarketSelector({ activeId, items, label }: MarketSelectorProps) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2.5">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground hover:border-primary hover:text-primary-text",
            )}
            href={item.href}
            key={item.id}
          >
            <CountryFlag className="h-3.5 w-5" market={item.id} />
            {item.name}
            <span
              className={cn(
                "text-xs font-normal uppercase tracking-wide",
                isActive ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {item.currency}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
