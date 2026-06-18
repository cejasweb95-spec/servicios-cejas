import { Badge } from "@/components/ui/badge";

type ServicePriceBlockProps = {
  price?: string;
  duration?: string;
  resultDuration?: string;
};

export function ServicePriceBlock({
  duration,
  price,
  resultDuration,
}: ServicePriceBlockProps) {
  if (!price && !duration && !resultDuration) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {price ? <Badge>{price}</Badge> : null}
      {duration ? <Badge variant="secondary">{duration}</Badge> : null}
      {resultDuration ? <Badge variant="outline">{resultDuration}</Badge> : null}
    </div>
  );
}
