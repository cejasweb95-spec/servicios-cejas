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
  height?: number;
  id: string;
  src: string;
  width?: number;
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
    setActiveIndex(null);
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
      <div className="gap-3 [column-fill:balance] columns-2 sm:gap-4 xl:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4">
        {images.map((image, index) => (
          <DialogTrigger asChild key={image.id}>
            <button
              className="group relative block min-h-11 w-full break-inside-avoid overflow-hidden rounded-2xl border border-primary/10 bg-surface-muted text-left outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              data-slot="result-tile"
              onClick={() => openLightbox(index)}
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              type="button"
            >
              <Image
                alt={image.alt}
                className="h-auto w-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.03]"
                height={image.height ?? 1000}
                sizes="(min-width: 1280px) 22vw, (min-width: 640px) 30vw, 46vw"
                src={image.src}
                width={image.width ?? 800}
              />
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-foreground/90 via-foreground/55 to-transparent p-3 pt-8 text-xs font-semibold text-background sm:p-4 sm:pt-10 sm:text-sm",
                  "translate-y-0 opacity-100",
                  "lg:translate-y-full lg:opacity-0 lg:transition lg:duration-300",
                  "lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100",
                  "motion-reduce:transition-none",
                )}
              >
                <span className="line-clamp-2">{image.alt}</span>
                <Maximize2 aria-hidden="true" className="size-4 shrink-0" />
              </span>
              <span className="sr-only">
                {copy.openLabel}: {image.alt}
              </span>
            </button>
          </DialogTrigger>
        ))}
      </div>

      <DialogContent
        className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl"
        closeLabel={copy.closeLabel}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRefs.current[lastTriggerIndex.current ?? 0]?.focus();
        }}
      >
        {activeImage ? (
          <div className="overflow-hidden rounded-xl">
            <div className="relative flex max-h-[78dvh] min-h-[280px] items-center justify-center bg-foreground">
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex max-h-[78dvh] items-center justify-center"
                  exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  key={activeImage.id}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                >
                  <Image
                    alt={activeImage.alt}
                    className="max-h-[78dvh] w-auto object-contain"
                    height={activeImage.height ?? 1200}
                    sizes="(min-width: 1024px) 70vw, 92vw"
                    src={activeImage.src}
                    width={activeImage.width ?? 900}
                  />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 ? (
                <>
                  <Button
                    aria-label={copy.previousLabel}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 shadow-soft hover:bg-background"
                    onClick={() => move(-1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </Button>
                  <Button
                    aria-label={copy.nextLabel}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 shadow-soft hover:bg-background"
                    onClick={() => move(1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ChevronRight aria-hidden="true" />
                  </Button>
                </>
              ) : null}
            </div>
            <DialogHeader className="gap-1 bg-popover px-5 py-4">
              <DialogTitle className="font-display text-lg leading-tight sm:text-xl">
                {activeImage.alt}
              </DialogTitle>
              <DialogDescription>{activeCount}</DialogDescription>
            </DialogHeader>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
