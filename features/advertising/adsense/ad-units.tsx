"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import {
  adsenseConfig,
  isAdsenseEnabled,
} from "@/features/advertising/adsense/config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type BaseAdProps = {
  slotId: string;
  className?: string;
  style?: CSSProperties;
};

type AdsenseAdProps = BaseAdProps & {
  format: string;
  layout?: string;
  responsive?: boolean;
};

export function BannerAd({ slotId, className, style }: BaseAdProps) {
  return (
    <AdsenseAd
      slotId={slotId}
      className={className}
      style={style}
      format="auto"
      responsive
    />
  );
}

export function InArticleAd({ slotId, className, style }: BaseAdProps) {
  return (
    <AdsenseAd
      slotId={slotId}
      className={className}
      style={style}
      format="fluid"
      layout="in-article"
    />
  );
}

export function MultiplexAd({ slotId, className, style }: BaseAdProps) {
  return (
    <AdsenseAd
      slotId={slotId}
      className={className}
      style={style}
      format="autorelaxed"
      responsive
    />
  );
}

function AdsenseAd({
  slotId,
  className,
  style,
  format,
  layout,
  responsive = false,
}: AdsenseAdProps) {
  const enabled = isAdsenseEnabled();

  useEffect(() => {
    if (!enabled || !slotId.trim()) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense can throw if an extension blocks the script or a slot is filled twice.
    }
  }, [enabled, slotId]);

  if (!enabled || !slotId.trim()) {
    return null;
  }

  return (
    <ins
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{ display: "block", ...style }}
      data-ad-client={adsenseConfig.client}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-ad-layout={layout}
      data-full-width-responsive={responsive ? "true" : undefined}
    />
  );
}
