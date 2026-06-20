import Image from "next/image";

type EditorialImage = {
  alt: string;
  height?: number;
  publicPath?: string;
  width?: number;
};

type EditorialImagePairProps = {
  primary: EditorialImage;
  secondary: EditorialImage;
  priority?: boolean;
};

export function EditorialImagePair({
  primary,
  priority = false,
  secondary,
}: EditorialImagePairProps) {
  if (
    !primary.publicPath ||
    !primary.width ||
    !primary.height ||
    !secondary.publicPath ||
    !secondary.width ||
    !secondary.height
  ) {
    return null;
  }

  return (
    <div className="relative mx-auto w-full max-w-[32rem] pb-8 pr-5 sm:pb-12 sm:pr-10">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface">
        <Image
          alt={primary.alt}
          className="h-full w-full object-cover"
          height={primary.height}
          priority={priority}
          sizes="(min-width: 1024px) 34vw, 88vw"
          src={primary.publicPath}
          width={primary.width}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[42%] overflow-hidden rounded-lg border border-border bg-surface shadow-soft">
        <Image
          alt={secondary.alt}
          className="aspect-[4/5] h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none hover:scale-[1.025]"
          height={secondary.height}
          sizes="(min-width: 1024px) 14vw, 38vw"
          src={secondary.publicPath}
          width={secondary.width}
        />
      </div>
    </div>
  );
}
