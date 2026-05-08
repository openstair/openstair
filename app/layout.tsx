import type { Metadata } from "next";
import {
  companyName,
  organizationJsonLd,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OpenStair Technologies - Software Development Company",
    template: "%s | OpenStair Technologies",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "OpenStair Technologies is a software development company specializing in Flutter, Android, web, backend, and full stack solutions.",
  keywords: [
    "software development company",
    "Flutter development company",
    "Flutter app development",
    "Android app development",
    "web development",
    "backend development",
    "full stack development",
    "custom software development",
    "OpenStair Technologies",
  ],
  openGraph: {
    title: "OpenStair Technologies - Software Development Company",
    description:
      "Flutter, Android, web, backend, and full stack application development.",
    url: siteUrl,
    siteName: companyName,
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${companyName} logo`,
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenStair Technologies - Software Development Company",
    description:
      "Flutter, Android, web, backend, and full stack application development.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
