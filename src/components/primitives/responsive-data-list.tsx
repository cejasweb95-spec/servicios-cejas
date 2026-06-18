import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type DataListItem = {
  label: string;
  value: ReactNode;
};

type ResponsiveDataListProps = {
  items: DataListItem[];
  className?: string;
};

export function ResponsiveDataList({ className, items }: ResponsiveDataListProps) {
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <div
          className="rounded-md border border-border bg-surface px-4 py-3"
          key={item.label}
        >
          <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 text-base font-semibold text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
