export const adSlots = {
  blogBanner: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_BLOG_BANNER_SLOT ?? "",
  blogInArticle: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_BLOG_IN_ARTICLE_SLOT ?? "",
  docsInArticle: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_DOCS_IN_ARTICLE_SLOT ?? "",
  docsMultiplex: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_DOCS_MULTIPLEX_SLOT ?? "",
} as const;

export function hasAdSlot(slotId: string) {
  return slotId.trim().length > 0;
}
