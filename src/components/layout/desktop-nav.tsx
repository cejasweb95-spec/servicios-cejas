"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type DesktopNavItem = {
  id: string;
  label: string;
  href: string;
};

type DesktopNavProps = {
  currentLocale: Locale;
  items: DesktopNavItem[];
  label: string;
};

export function DesktopNav({ currentLocale, items, label }: DesktopNavProps) {
  const pathname = usePathname() || `/${currentLocale}`;
  const localePrefix = `/${currentLocale}`;
  const routePath = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || "/"
    : pathname;

  return (
    <nav
      aria-label={label}
      className="hidden rounded-full border border-primary/20 bg-surface/90 p-1 shadow-soft xl:block"
    >
      <ul className="flex items-center">
        {items.map((item) => {
          const active =
            routePath === item.href ||
            (item.href !== "/" && routePath.startsWith(`${item.href}/`));

          return (
            <li key={item.id}>
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-primary-text",
                )}
                href={item.href}
              >
                {item.label}
                {active ? (
                  <motion.span
                    className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary"
                    layoutId="desktop-navigation-active"
                    transition={{ duration: 0.24 }}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
