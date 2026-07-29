import Image from "next/image";
import { brandLogos, type LogoVariant } from "@/lib/brand-assets";

type BrandLogoProps = {
  variant?: LogoVariant;
  background?: "light" | "dark";
  markOnly?: boolean;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant,
  background = "light",
  markOnly = false,
  className,
  priority = false,
}: BrandLogoProps) {
  const resolvedVariant =
    variant ?? (markOnly ? "mark" : background === "dark" ? "light" : "dark");
  const logo = brandLogos[resolvedVariant];

  return (
    <Image
      src={logo.src}
      alt={markOnly ? "" : logo.alt}
      width={logo.width}
      height={logo.height}
      className={className}
      priority={priority}
      aria-hidden={markOnly ? "true" : undefined}
    />
  );
}
