import type { Metadata } from "next";

export const siteUrl = "https://openstair.in";
export const companyName = "OpenStair Technologies";

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createSeoMetadata({
  title,
  description,
  path,
  keywords,
}: SeoMetadataInput): Metadata {
  const url = new URL(path, siteUrl).toString();

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
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${companyName} social sharing image`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
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
