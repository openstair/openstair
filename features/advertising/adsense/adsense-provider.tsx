import Script from "next/script";
import {
  adsenseConfig,
  GOOGLE_ADSENSE_SCRIPT_ID,
  getAdsenseScriptUrl,
  isAdsenseEnabled,
} from "@/features/advertising/adsense/config";

export function AdsenseProvider() {
  const scriptUrl = getAdsenseScriptUrl();

  if (!isAdsenseEnabled() || !scriptUrl) {
    return null;
  }

  return (
    <Script
      id={GOOGLE_ADSENSE_SCRIPT_ID}
      src={scriptUrl}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      data-ad-client={adsenseConfig.client}
    />
  );
}
