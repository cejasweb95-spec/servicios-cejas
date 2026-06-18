import { cn } from "@/lib/utils";

type CourseModuleListProps = {
  items: string[];
  className?: string;
};

export function CourseModuleList({ className, items }: CourseModuleListProps) {
  return (
    <ol className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item, index) => (
        <li
          className="rounded-md border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground"
          key={`${item}-${index}`}
        >
          <span className="mr-2 font-semibold text-primary-text">
            {String(index + 1).padStart(2, "0")}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}
