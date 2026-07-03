import { ExternalLink, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ReviewItem = {
  id: string;
  author: string;
  rating: number;
  text: string;
  dateLabel: string;
};

export type ReviewWriteAction = {
  id: string;
  label: string;
  writeReviewUrl: string;
};

type ReviewStarsProps = {
  rating: number;
  srLabel: string;
};

function ReviewStars({ rating, srLabel }: ReviewStarsProps) {
  return (
    <span aria-label={srLabel} className="flex gap-0.5" role="img">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          aria-hidden="true"
          className={cn(
            "size-4",
            index < rating
              ? "fill-primary text-primary"
              : "fill-transparent text-border",
          )}
          key={index}
        />
      ))}
    </span>
  );
}

type ReviewListProps = {
  reviews: ReviewItem[];
  sourceLabel: string;
  ratingLabel: (rating: number) => string;
  className?: string;
};

export function ReviewList({
  className,
  ratingLabel,
  reviews,
  sourceLabel,
}: ReviewListProps) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-8 md:grid-cols-2", className)}>
      {reviews.map((review) => (
        <li key={review.id}>
          <figure className="flex h-full flex-col border-l-2 border-primary/40 pl-5">
            <ReviewStars rating={review.rating} srLabel={ratingLabel(review.rating)} />
            <blockquote className="mt-3 flex-1 text-base leading-7 text-foreground/85">
              “{review.text}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{review.author}</span>
              {" · "}
              <span>{review.dateLabel}</span>
              {" · "}
              <span>{sourceLabel}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

type WriteReviewButtonsProps = {
  actions: ReviewWriteAction[];
  className?: string;
};

export function WriteReviewButtons({ actions, className }: WriteReviewButtonsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((action, index) => (
        <Button
          asChild
          key={action.id}
          variant={index === 0 ? "default" : "outline"}
        >
          <a href={action.writeReviewUrl} rel="noopener noreferrer" target="_blank">
            {action.label}
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </Button>
      ))}
    </div>
  );
}
