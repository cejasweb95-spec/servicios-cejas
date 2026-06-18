import { type ComponentPropsWithoutRef, type ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
};

export function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonLinkProps) {
  return (
    <Button asChild className={className} size={size} variant={variant}>
      <Link {...props} />
    </Button>
  );
}
