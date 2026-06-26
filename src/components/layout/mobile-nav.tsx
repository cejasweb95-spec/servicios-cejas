"use client";

import { ArrowUpRight, Menu, MessageCircle } from "lucide-react";
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
  secondaryItems: ShellNavItem[];
  secondaryNavLabel: string;
  title: string;
  whatsapp: {
    closeLabel: string;
    description: string;
    targets: WhatsAppTarget[];
    title: string;
  };
};

function MobileNavLink({
  active,
  href,
  label,
  onNavigate,
  size = "primary",
}: {
  active: boolean;
  href: string;
  label: string;
  onNavigate: () => void;
  size?: "primary" | "secondary";
}) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex min-h-10 items-center justify-between gap-3 border-b border-border/80 py-2.5 pl-2.5 pr-1 transition-colors hover:text-primary-text focus-visible:text-primary-text focus-visible:outline-none",
        size === "primary"
          ? "font-display text-lg leading-snug"
          : "text-sm font-medium",
        active
          ? "border-l-2 border-l-primary text-primary-text"
          : "border-l-2 border-l-transparent text-foreground",
      )}
      href={href}
      onClick={onNavigate}
    >
      <span>{label}</span>
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 text-muted-foreground transition-opacity motion-reduce:transition-none",
          active
            ? "text-primary opacity-100"
            : "opacity-35 group-hover:opacity-70",
        )}
      />
    </Link>
  );
}

export function MobileNav({
  closeLabel,
  contactLabel,
  currentLocale,
  languageLabel,
  navLabel,
  navItems,
  openLabel,
  secondaryItems,
  secondaryNavLabel,
  title,
  whatsapp,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setOpen(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button aria-label={openLabel} size="icon" variant="ghost">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full max-h-dvh flex-col gap-0 overflow-hidden bg-surface-strong p-0 sm:max-w-sm"
        closeLabel={closeLabel}
      >
        <SheetHeader className="shrink-0 border-b border-border/80 px-5 pt-5 pr-14">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          <SheetDescription className="sr-only">{navLabel}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5">
          <nav aria-label={navLabel} className="pt-1">
            {navItems.map((item) => (
              <MobileNavLink
                active={isActive(item.href)}
                href={item.href}
                key={item.id}
                label={item.label}
                onNavigate={closeMenu}
              />
            ))}
          </nav>

          {secondaryItems.length > 0 ? (
            <nav aria-label={secondaryNavLabel} className="mt-4 pb-1">
              <p className="mb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {secondaryNavLabel}
              </p>
              {secondaryItems.map((item) => (
                <MobileNavLink
                  active={isActive(item.href)}
                  href={item.href}
                  key={item.id}
                  label={item.label}
                  onNavigate={closeMenu}
                  size="secondary"
                />
              ))}
            </nav>
          ) : null}
        </div>

        <div className="shrink-0 space-y-3 border-t border-border/80 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <LocaleSwitcher
            compact
            currentLocale={currentLocale}
            label={languageLabel}
            onNavigate={closeMenu}
          />
          <WhatsAppChooser
            closeLabel={whatsapp.closeLabel}
            description={whatsapp.description}
            targets={whatsapp.targets}
            title={whatsapp.title}
            triggerLabel={contactLabel}
          >
            <Button size="sm" variant="default">
              <MessageCircle aria-hidden="true" data-icon="inline-start" />
              {contactLabel}
            </Button>
          </WhatsAppChooser>
        </div>
      </SheetContent>
    </Sheet>
  );
}
