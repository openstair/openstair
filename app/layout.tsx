import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openstair.in"),
  title: {
    default: "OpenStair | Clarity for modern teams",
    template: "%s | OpenStair",
  },
  icons: {
    icon: '/favicon.ico',
  },
  description:
    "OpenStair helps startups align teams, remove friction, and execute with confidence.",
  openGraph: {
    title: "OpenStair",
    description:
      "OpenStair helps startups align teams, remove friction, and execute with confidence.",
    siteName: "OpenStair",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenStair",
    description:
      "OpenStair helps startups align teams, remove friction, and execute with confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">{children}</body>
    </html>
  );
}
