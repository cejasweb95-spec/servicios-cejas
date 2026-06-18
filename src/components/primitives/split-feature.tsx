import { type ReactNode } from "react";

import { Container } from "@/components/primitives/container";
import { cn } from "@/lib/utils";

type SplitFeatureProps = {
  media: ReactNode;
  children: ReactNode;
  reverse?: boolean;
  className?: string;
};

export function SplitFeature({
  children,
  className,
  media,
  reverse = false,
}: SplitFeatureProps) {
  return (
    <Container
      className={cn(
        "grid items-center gap-8 lg:grid-cols-2 lg:gap-12",
        reverse && "lg:[&>*:first-child]:order-2",
        className,
      )}
    >
      <div>{media}</div>
      <div>{children}</div>
    </Container>
  );
}
