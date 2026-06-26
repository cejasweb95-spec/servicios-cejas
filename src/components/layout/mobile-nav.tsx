"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type ShellNavItem = {
  id: string;
  label: string;
  href: string;
};

type WhatsAppTarget = {
  id: string;
  label: string;
  phoneE164: string;
  defaultMessage: string;
};

type MobileNavProps = {
  closeLabel: string;
  contactLabel: string;
  currentLocale: Locale;
  languageLabel: string;
  navLabel: string;
  navItems: ShellNavItem[];
  openLabel: string;
  title: string;
  whatsapp: {
    closeLabel: string;
    description: string;
    targets: WhatsAppTarget[];
    title: string;
  };
};

export function MobileNav({
  closeLabel,
  contactLabel,
  currentLocale,
  languageLabel,
  navLabel,
  navItems,
  openLabel,
  title,
  whatsapp,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button aria-label={openLabel} size="icon" variant="ghost">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="gap-0 bg-surface-strong"
        closeLabel={closeLabel}
      >
        <SheetHeader className="px-6 pt-6 pr-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-text">
            Cejas Internacionales
          </p>
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          <SheetDescription className="sr-only">{navLabel}</SheetDescription>
        </SheetHeader>

        <nav
          aria-label={navLabel}
          className="mt-4 flex flex-col px-6"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center justify-between gap-4 border-b border-primary/12 py-4 font-display text-2xl leading-tight transition-colors last:border-b-0 hover:text-primary-text focus-visible:text-primary-text focus-visible:outline-none",
                  active ? "text-primary-text" : "text-foreground",
                )}
                href={item.href}
                key={item.id}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 -translate-x-1 transition",
                    active
                      ? "translate-x-0 text-primary opacity-100"
                      : "opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto grid gap-4 border-t border-primary/15 px-6 pb-7 pt-6">
          <LocaleSwitcher
            currentLocale={currentLocale}
            label={languageLabel}
            onNavigate={() => setOpen(false)}
          />
          <WhatsAppChooser
            closeLabel={whatsapp.closeLabel}
            description={whatsapp.description}
            targets={whatsapp.targets}
            title={whatsapp.title}
            triggerLabel={contactLabel}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
