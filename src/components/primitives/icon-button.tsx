import { type ComponentProps, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type IconButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  label: string;
  icon: ReactNode;
};

export function IconButton({
  icon,
  label,
  size = "icon",
  variant = "ghost",
  ...props
}: IconButtonProps) {
  return (
    <Button aria-label={label} size={size} variant={variant} {...props}>
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}
