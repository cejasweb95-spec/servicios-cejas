type HeaderWordmarkProps = {
  brandLine: string;
  byline: string;
};

export function HeaderWordmark({ brandLine, byline }: HeaderWordmarkProps) {
  return (
    <span
      className="inline-flex max-w-[min(18rem,calc(100vw-8rem))] flex-wrap items-baseline gap-x-1.5 sm:max-w-[min(20rem,calc(100vw-9.5rem))] xl:max-w-none xl:flex-nowrap"
      data-slot="site-wordmark"
    >
      <span className="font-header-brand text-xs font-semibold uppercase leading-none tracking-[0.1em] text-foreground sm:text-sm sm:tracking-[0.12em] xl:text-sm xl:tracking-[0.13em]">
        {brandLine}
      </span>
      <span className="font-header-brand text-[0.5625rem] font-medium uppercase leading-none tracking-[0.16em] text-foreground sm:text-[0.625rem] sm:tracking-[0.18em]">
        {byline}
      </span>
    </span>
  );
}
