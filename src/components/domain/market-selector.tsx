"use client";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { MarketId } from "@/lib/content/schema";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "motion/react";

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
    <nav aria-label={label} className="grid gap-3 md:grid-cols-3">
      <LayoutGroup id={`market-selector-${label}`}>
        {items.map((item) => (
          <Link
            aria-current={item.id === activeId ? "page" : undefined}
            className={cn(
              "relative isolate rounded-lg border border-border bg-surface p-4 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-surface-muted hover:shadow-soft focus-visible:border-primary focus-visible:shadow-soft motion-reduce:transform-none",
              item.id === activeId && "border-primary bg-surface-muted",
            )}
            href={item.href}
            key={item.id}
          >
            {item.id === activeId ? (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg border border-primary bg-surface-muted shadow-soft"
                layoutId="active-market"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative z-10 block">
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold text-foreground">{item.name}</span>
                <Badge variant="outline">{item.currency}</Badge>
              </span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                {item.description}
              </span>
            </span>
          </Link>
        ))}
      </LayoutGroup>
    </nav>
  );
}
