"use client";

import { Menu } from "lucide-react";
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
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button aria-label={openLabel} size="icon" variant="ghost">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={closeLabel}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{navLabel}</SheetDescription>
        </SheetHeader>
        <nav aria-label={navLabel} className="grid gap-1 px-4">
          {navItems.map((item) => (
            <Link
              className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-semibold text-foreground hover:bg-muted hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              href={item.href}
              key={item.id}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-4 px-4 pb-4">
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
