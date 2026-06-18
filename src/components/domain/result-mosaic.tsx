"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ResultImage = {
  alt: string;
  id: string;
  src: string;
};

type ResultMosaicCopy = {
  closeLabel: string;
  emptyLabel: string;
  imageCountLabel: string;
  nextLabel: string;
  openLabel: string;
  previousLabel: string;
};

type ResultMosaicProps = {
  copy: ResultMosaicCopy;
  images: ResultImage[];
};

function formatCount(template: string, current: number, total: number) {
  return template
    .replace("{current}", String(current))
    .replace("{total}", String(total));
}

export function ResultMosaic({ copy, images }: ResultMosaicProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastTriggerIndex = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activeCount = useMemo(
    () =>
      activeIndex === null
        ? ""
        : formatCount(copy.imageCountLabel, activeIndex + 1, images.length),
    [activeIndex, copy.imageCountLabel, images.length],
  );

  if (images.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
        {copy.emptyLabel}
      </p>
    );
  }

  function move(direction: 1 | -1) {
    setActiveIndex((current) => {
      if (current === null) {
        return 0;
      }

      return (current + direction + images.length) % images.length;
    });
  }

  function openLightbox(index: number) {
    lastTriggerIndex.current = index;
    setActiveIndex(index);
  }

  function closeLightbox() {
    const trigger = triggerRefs.current[lastTriggerIndex.current ?? 0];
    setActiveIndex(null);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  return (
    <Dialog
      open={activeIndex !== null}
      onOpenChange={(open) => {
        if (!open) {
          closeLightbox();
        }
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <DialogTrigger asChild key={image.id}>
            <motion.button
              className={cn(
                "group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                index === 0 && images.length > 1
                  ? "sm:col-span-2 lg:row-span-2"
                  : "",
              )}
              data-slot="result-tile"
              onClick={() => openLightbox(index)}
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            >
              <Image
                alt={image.alt}
                className="object-cover transition-transform duration-200 group-hover:scale-[1.025]"
                fill
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 56vw, 92vw"
                    : "(min-width: 1024px) 26vw, 46vw"
                }
                src={image.src}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-foreground/75 p-4 text-sm font-semibold text-background">
                <span>{image.alt}</span>
                <Maximize2 aria-hidden="true" className="size-4 shrink-0" />
              </span>
              <span className="sr-only">
                {copy.openLabel}: {image.alt}
              </span>
            </motion.button>
          </DialogTrigger>
        ))}
      </div>

      <DialogContent
        className="max-w-5xl gap-0 overflow-hidden p-0 sm:max-w-5xl"
        closeLabel={copy.closeLabel}
      >
        {activeImage ? (
          <div className="grid gap-0 lg:grid-cols-[1fr_20rem]">
            <div className="relative aspect-[4/5] min-h-[320px] bg-foreground sm:aspect-[5/4] lg:min-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                  exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  key={activeImage.id}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                >
                  <Image
                    alt={activeImage.alt}
                    className="object-contain"
                    fill
                    sizes="(min-width: 1024px) 70vw, 92vw"
                    src={activeImage.src}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="grid gap-5 p-5">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl leading-tight">
                  {activeImage.alt}
                </DialogTitle>
                <DialogDescription>{activeCount}</DialogDescription>
              </DialogHeader>
              {images.length > 1 ? (
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => move(-1)} type="button" variant="outline">
                    <ChevronLeft aria-hidden="true" data-icon="inline-start" />
                    {copy.previousLabel}
                  </Button>
                  <Button onClick={() => move(1)} type="button" variant="outline">
                    {copy.nextLabel}
                    <ChevronRight aria-hidden="true" data-icon="inline-end" />
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
