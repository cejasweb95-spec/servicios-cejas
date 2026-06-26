import { ArrowUpRight } from "lucide-react";

import { brandIcons } from "@/components/icons/brand-icons";

type SocialLink = {
  id: string;
  label: string;
  href: string;
};

type FooterSocialLinksProps = {
  links: SocialLink[];
};

export function FooterSocialLinks({ links }: FooterSocialLinksProps) {
  return (
    <ul className="grid gap-2">
      {links.map((item) => {
        const Icon = brandIcons[item.id as keyof typeof brandIcons];

        return (
          <li key={item.id}>
            <a
              aria-label={item.label}
              className="group/social inline-flex min-h-9 w-full max-w-xs items-center gap-2.5 rounded-xl border border-primary/12 bg-surface/90 px-3 py-2 shadow-soft transition-[border-color,background-color,transform] hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 motion-reduce:transition-none lg:hover:-translate-y-px"
              href={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary-text ring-1 ring-inset ring-primary/15 transition-colors group-hover/social:bg-primary group-hover/social:text-primary-foreground group-hover/social:ring-primary/35">
                {Icon ? (
                  <Icon className="size-4" />
                ) : (
                  <span className="text-[0.625rem] font-bold">{item.label.slice(0, 2)}</span>
                )}
              </span>
              <span className="min-w-0 flex-1 text-xs font-semibold text-foreground sm:text-sm">
                {item.label}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover/social:-translate-y-px group-hover/social:translate-x-px group-hover/social:text-primary-text motion-reduce:transform-none"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
