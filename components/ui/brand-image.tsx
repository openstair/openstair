import Image from "next/image";
import { brandImages, type BrandImageKey } from "@/lib/brand-assets";

type BrandImageProps = {
  asset: BrandImageKey;
  caption?: string;
  description?: string;
  className?: string;
  aspect?: "wide" | "square" | "portrait";
  priority?: boolean;
  sizes?: string;
};

const aspectClass = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
};

export function BrandImage({
  asset,
  caption,
  description,
  className,
  aspect = "wide",
  priority = false,
  sizes = "(min-width: 1024px) 48vw, 100vw",
}: BrandImageProps) {
  const image = brandImages[asset];

  return (
    <figure
      className={[
        "relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-[0_28px_90px_rgba(8,145,178,0.14)]",
        aspectClass[aspect],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-brand-asset={image.src}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {caption || description ? (
        <figcaption className="absolute inset-x-5 bottom-5 max-w-md rounded-2xl border border-white/20 bg-[#07111f]/88 p-4 shadow-[0_18px_50px_rgba(7,17,31,0.22)] backdrop-blur-xl">
          {caption ? (
            <span className="block text-lg font-semibold leading-tight text-white">
              {caption}
            </span>
          ) : null}
          {description ? (
            <span className="mt-2 block text-sm leading-6 text-slate-300">
              {description}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
