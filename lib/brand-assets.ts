export type LogoVariant = "horizontal" | "mark" | "light" | "dark" | "monochrome";

export type BrandImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const brandLogos: Record<LogoVariant, BrandImageAsset> = {
  horizontal: {
    src: "/branding/logo/logo-horizontal.svg",
    alt: "OpenStair Technologies",
    width: 260,
    height: 64,
  },
  mark: {
    src: "/branding/logo/logo-mark.svg",
    alt: "OpenStair Technologies mark",
    width: 64,
    height: 64,
  },
  light: {
    src: "/branding/logo/logo-light.svg",
    alt: "OpenStair Technologies",
    width: 260,
    height: 64,
  },
  dark: {
    src: "/branding/logo/logo-dark.svg",
    alt: "OpenStair Technologies",
    width: 260,
    height: 64,
  },
  monochrome: {
    src: "/branding/logo/logo-monochrome.svg",
    alt: "OpenStair Technologies",
    width: 260,
    height: 64,
  },
};

export const socialAssets = {
  defaultOpenGraph: "/branding/social/opengraph-image.png",
  socialCard: "/branding/social/social-card.png",
  pages: {
    home: "/branding/social/opengraph-image.png",
    applications: "/branding/social/social-card.png",
    blog: "/branding/social/social-card.png",
    documentation: "/branding/social/social-card.png",
    articles: "/branding/social/social-card.png",
    services: "/branding/social/social-card.png",
  },
} as const;

export const brandImages = {
  homeHero: {
    src: "/branding/illustrations/home/hero.svg",
    alt: "OpenStair mobile, web, and backend systems artwork",
    width: 1600,
    height: 1000,
  },
  homePortfolio: {
    src: "/branding/illustrations/applications/memory-match-king/hero.svg",
    alt: "Memory Match King product showcase artwork",
    width: 1600,
    height: 1000,
  },
  aboutHero: {
    src: "/branding/illustrations/company/about-hero.svg",
    alt: "OpenStair Technologies company artwork",
    width: 1600,
    height: 1000,
  },
  documentationHero: {
    src: "/branding/illustrations/documentation/hero.svg",
    alt: "OpenStair documentation artwork",
    width: 1600,
    height: 1000,
  },
  contactHero: {
    src: "/branding/illustrations/company/contact.svg",
    alt: "OpenStair consultation contact artwork",
    width: 1600,
    height: 1000,
  },
  consultation: {
    src: "/branding/illustrations/company/consultation.svg",
    alt: "OpenStair project consultation artwork",
    width: 1600,
    height: 1000,
  },
  openSourceHero: {
    src: "/branding/illustrations/documentation/open-source.svg",
    alt: "OpenStair open-source engineering artwork",
    width: 1600,
    height: 1000,
  },
  applicationsHero: {
    src: "/branding/illustrations/applications/hero.svg",
    alt: "OpenStair applications portfolio artwork",
    width: 1600,
    height: 1000,
  },
  servicesHero: {
    src: "/branding/illustrations/services/services-hero.svg",
    alt: "OpenStair services architecture artwork",
    width: 1600,
    height: 1000,
  },
  serviceFlutter: {
    src: "/branding/illustrations/services/flutter.svg",
    alt: "Flutter service illustration",
    width: 1200,
    height: 900,
  },
  serviceAndroid: {
    src: "/branding/illustrations/services/android.svg",
    alt: "Android service illustration",
    width: 1200,
    height: 900,
  },
  serviceWeb: {
    src: "/branding/illustrations/services/web.svg",
    alt: "Web service illustration",
    width: 1200,
    height: 900,
  },
  serviceBackend: {
    src: "/branding/illustrations/services/backend.svg",
    alt: "Backend service illustration",
    width: 1200,
    height: 900,
  },
  serviceAi: {
    src: "/branding/illustrations/services/ai.svg",
    alt: "AI service illustration",
    width: 1200,
    height: 900,
  },
  serviceCloud: {
    src: "/branding/illustrations/services/cloud.svg",
    alt: "Cloud service illustration",
    width: 1200,
    height: 900,
  },
  memoryMatchKingHero: {
    src: "/branding/illustrations/applications/memory-match-king/hero.svg",
    alt: "Memory Match King hero artwork",
    width: 1600,
    height: 1000,
  },
  memoryMatchKingDeviceMockup: {
    src: "/branding/illustrations/applications/memory-match-king/device-mockup.svg",
    alt: "Memory Match King device mockup",
    width: 1200,
    height: 900,
  },
  memoryMatchKingFeature: {
    src: "/branding/illustrations/applications/memory-match-king/feature.svg",
    alt: "Memory Match King feature illustration",
    width: 1200,
    height: 900,
  },
  memoryMatchKingGallery01: {
    src: "/branding/illustrations/applications/memory-match-king/gallery-01.svg",
    alt: "Memory Match King gameplay preview",
    width: 900,
    height: 1200,
  },
  memoryMatchKingGallery02: {
    src: "/branding/illustrations/applications/memory-match-king/gallery-02.svg",
    alt: "Memory Match King progress moment",
    width: 900,
    height: 1200,
  },
  memoryMatchKingGallery03: {
    src: "/branding/illustrations/applications/memory-match-king/gallery-03.svg",
    alt: "Memory Match King mobile showcase",
    width: 900,
    height: 1200,
  },
  memoryMatchKingAppIcon: {
    src: "/branding/illustrations/applications/memory-match-king/app-icon.svg",
    alt: "Memory Match King app icon",
    width: 512,
    height: 512,
  },
  memoryMatchKingPlayStoreBadge: {
    src: "/branding/illustrations/applications/memory-match-king/play-store-badge.svg",
    alt: "Get Memory Match King on Google Play",
    width: 646,
    height: 192,
  },
  memoryMatchKingAppStoreBadge: {
    src: "/branding/illustrations/applications/memory-match-king/app-store-badge.svg",
    alt: "Download Memory Match King on the App Store",
    width: 646,
    height: 192,
  },
  astroGuruHero: {
    src: "/branding/illustrations/applications/astroguru/hero.svg",
    alt: "AstroGuru hero artwork",
    width: 1600,
    height: 1000,
  },
  astroGuruDeviceMockup: {
    src: "/branding/illustrations/applications/astroguru/device-mockup.svg",
    alt: "AstroGuru device mockup",
    width: 1200,
    height: 900,
  },
  astroGuruFeature: {
    src: "/branding/illustrations/applications/astroguru/feature.svg",
    alt: "AstroGuru feature illustration",
    width: 1200,
    height: 900,
  },
  astroGuruGallery01: {
    src: "/branding/illustrations/applications/astroguru/gallery-01.svg",
    alt: "AstroGuru home experience",
    width: 900,
    height: 1200,
  },
  astroGuruGallery02: {
    src: "/branding/illustrations/applications/astroguru/gallery-02.svg",
    alt: "AstroGuru guidance flow",
    width: 900,
    height: 1200,
  },
  astroGuruGallery03: {
    src: "/branding/illustrations/applications/astroguru/gallery-03.svg",
    alt: "AstroGuru mobile showcase",
    width: 900,
    height: 1200,
  },
  astroGuruAppIcon: {
    src: "/branding/illustrations/applications/astroguru/app-icon.svg",
    alt: "AstroGuru app icon",
    width: 512,
    height: 512,
  },
  astroGuruPlayStoreBadge: {
    src: "/branding/illustrations/applications/astroguru/play-store-badge.svg",
    alt: "Get AstroGuru on Google Play",
    width: 646,
    height: 192,
  },
  astroGuruAppStoreBadge: {
    src: "/branding/illustrations/applications/astroguru/app-store-badge.svg",
    alt: "Download AstroGuru on the App Store",
    width: 646,
    height: 192,
  },
} as const satisfies Record<string, BrandImageAsset>;

export type BrandImageKey = keyof typeof brandImages;
