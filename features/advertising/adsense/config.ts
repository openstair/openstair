const adsenseClient = (
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT ?? ""
).trim();
const adsenseEnabled =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === "true";

export const GOOGLE_ADSENSE_SCRIPT_ID = "google-adsense-script";

export const adsenseConfig = {
  client: adsenseClient,
  enabled: adsenseEnabled,
  isProduction: process.env.NODE_ENV === "production",
};

export function isAdsenseEnabled() {
  return (
    adsenseConfig.enabled &&
    adsenseConfig.isProduction &&
    adsenseConfig.client.length > 0
  );
}

export function getAdsenseScriptUrl() {
  if (!isAdsenseEnabled()) {
    return null;
  }

  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    adsenseConfig.client,
  )}`;
}
