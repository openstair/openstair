import type { Metadata } from "next";
import { brandLogos, socialAssets } from "@/lib/brand-assets";
import { toAbsoluteBlogImageUrl } from "@/lib/blog-images";

export const siteUrl = "https://openstair.in";
export const companyName = "OpenStair Technologies";

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createSeoMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SeoMetadataInput): Metadata {
  const url = new URL(path, siteUrl).toString();
  const openGraphImage = image
    ? toAbsoluteBlogImageUrl(image, siteUrl)
    : socialAssets.defaultOpenGraph;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: companyName,
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: `${companyName} social sharing image`,
      },
    ],
      type,
      publishedTime,
      modifiedTime,
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyName,
  url: siteUrl,
  logo: `${siteUrl}${brandLogos.mark.src}`,
  description:
    "OpenStair Technologies is a software development company specializing in Flutter, Android, web, backend, and full stack application development. Every step matters.",
  sameAs: [
    "https://apps.openstair.in",
    "https://github.com/openstair",
    "https://pub.dev/publishers/openstair.in",
    "https://www.instagram.com/openstair.in",
    "https://www.facebook.com/openstair1",
    "https://www.youtube.com/@openstair1",
    "https://play.google.com/store/apps/dev?id=8492821411434576790",
    "https://www.linkedin.com/company/openstair"
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: companyName,
  url: siteUrl,
  publisher: {
    "@type": "Organization",
    name: companyName,
  },
};
