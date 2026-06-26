"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type DesktopMoreNavItem = {
  id: string;
  label: string;
  href: string;
};

type DesktopMoreNavProps = {
  items: DesktopMoreNavItem[];
  moreLabel: string;
  routePath: string;
};

export function DesktopMoreNav({
  items,
  moreLabel,
  routePath,
}: DesktopMoreNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const hasActiveChild = items.some(
    (item) =>
      routePath === item.href ||
      (item.href !== "/" && routePath.startsWith(`${item.href}/`)),
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "relative inline-flex min-h-10 items-center gap-1 rounded-full px-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
          hasActiveChild || open
            ? "text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-primary-text",
        )}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {moreLabel}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform motion-reduce:transition-none",
            open ? "rotate-180" : undefined,
          )}
        />
        {hasActiveChild ? (
          <motion.span
            className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary"
            layoutId="desktop-navigation-active"
            transition={{ duration: 0.24 }}
          />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-[calc(100%+0.35rem)] z-50 min-w-48 overflow-hidden rounded-2xl border border-primary/20 bg-surface/98 p-1.5 shadow-soft backdrop-blur-md"
            exit={{ opacity: 0, y: -4 }}
            id={listId}
            initial={{ opacity: 0, y: -4 }}
            role="menu"
            transition={{ duration: 0.18 }}
          >
            {items.map((item) => {
              const active =
                routePath === item.href ||
                (item.href !== "/" && routePath.startsWith(`${item.href}/`));

              return (
                <li key={item.id} role="none">
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-9 items-center rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                      active
                        ? "bg-primary/10 text-primary-text"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
