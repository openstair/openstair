import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BrandImage } from "@/components/ui/brand-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandImages, socialAssets, type BrandImageKey } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Applications by OpenStair Technologies",
  description:
    "Explore applications OpenStair Technologies has built, including Memory Match King and AstroGuru.",
  path: "/apps",
  keywords: [
    "OpenStair apps",
    "Memory Match King",
    "AstroGuru",
    "mobile applications",
    "Flutter apps",
  ],
  image: socialAssets.pages.applications,
});

type Product = {
  name: string;
  status: "Published";
  platforms: readonly string[];
  overview: string;
  technology?: readonly string[];
  highlights?: readonly string[];
  heroAsset: BrandImageKey;
  appIcon: BrandImageKey;
  playStoreBadge?: BrandImageKey;
  appStoreBadge?: BrandImageKey;
  gallery?: readonly {
    asset: BrandImageKey;
    title: string;
  }[];
  ctaHref: string;
  ctaLabel: string;
};

const products: readonly Product[] = [
  {
    name: "Memory Match King",
    status: "Published",
    platforms: ["Android", "iOS"],
    overview:
      "A polished memory game shaped around quick play sessions, clear visual feedback, and a mobile-first release path.",
    technology: ["Flutter", "Dart", "Mobile UI", "Release"],
    highlights: [
      "Simple game loop",
      "Mobile-first interface",
      "Gallery-ready product story",
    ],
    heroAsset: "memoryMatchKingHero",
    appIcon: "memoryMatchKingAppIcon",
    playStoreBadge: "memoryMatchKingPlayStoreBadge",
    appStoreBadge: "memoryMatchKingAppStoreBadge",
    gallery: [
      {
        asset: "memoryMatchKingGallery01",
        title: "Gameplay Preview",
      },
      {
        asset: "memoryMatchKingGallery02",
        title: "Progress Moments",
      },
      {
        asset: "memoryMatchKingGallery03",
        title: "Mobile Showcase",
      },
    ],
    ctaHref: "https://apps.openstair.in",
    ctaLabel: "View Application",
  },
  {
    name: "AstroGuru",
    status: "Published",
    platforms: ["Android", "iOS"],
    overview:
      "A consumer astrology app built with a structured mobile experience, product artwork support, and space for store-ready presentation.",
    technology: ["Flutter", "Dart", "Mobile Product", "APIs"],
    highlights: [
      "Consumer app experience",
      "Cross-platform release path",
      "Structured product surface",
    ],
    heroAsset: "astroGuruHero",
    appIcon: "astroGuruAppIcon",
    playStoreBadge: "astroGuruPlayStoreBadge",
    appStoreBadge: "astroGuruAppStoreBadge",
    gallery: [
      {
        asset: "astroGuruGallery01",
        title: "Home Experience",
      },
      {
        asset: "astroGuruGallery02",
        title: "Guidance Flow",
      },
      {
        asset: "astroGuruGallery03",
        title: "Mobile Showcase",
      },
    ],
    ctaHref: "https://apps.openstair.in",
    ctaLabel: "View Application",
  },
] as const;

function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const technologies = product.technology ?? [];
  const highlights = product.highlights ?? [];
  const gallery = product.gallery ?? [];
  const storeBadges = [
    product.playStoreBadge
      ? {
          asset: product.playStoreBadge,
          label: "Google Play",
        }
      : null,
    product.appStoreBadge
      ? {
          asset: product.appStoreBadge,
          label: "App Store",
        }
      : null,
  ].filter(Boolean) as { asset: BrandImageKey; label: string }[];
  const hasGallery = gallery.length > 0;
  const hasHighlights = highlights.length > 0;
  const hasTechnology = technologies.length > 0;

  return (
    <article
      className={[
        "surface-card reveal overflow-hidden rounded-2xl",
        "grid gap-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,1.08fr)] lg:items-start",
        featured ? "lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)]" : "",
      ].join(" ")}
    >
      <div className="p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-cyan-500/20 bg-cyan-50">
            <Image
              src={brandImages[product.appIcon].src}
              alt=""
              fill
              sizes="3rem"
              className="object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">
              {product.status}
            </p>
            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">
              {product.name}
            </h2>
          </div>
        </div>

        <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
          {product.overview}
        </p>

        {product.platforms.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {platform}
              </span>
            ))}
          </div>
        ) : null}

        {hasTechnology ? (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">
            Technology
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-500/20 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        ) : null}

        {hasHighlights ? (
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">
              Highlights
            </h3>
            <div className="mt-3 grid gap-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold leading-6 text-slate-700"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 border-t border-slate-200 bg-slate-50/70 p-4 md:p-5 lg:border-l lg:border-t-0">
        <BrandImage
          asset={product.heroAsset}
          caption={product.name}
          description="Product presentation shaped around release-ready mobile delivery."
        />
        {hasGallery ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {gallery.map((item) => (
              <BrandImage
                key={item.asset}
                asset={item.asset}
                caption={item.title}
                aspect="portrait"
                className="rounded-2xl"
                sizes="(min-width: 1024px) 12rem, 33vw"
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-200 bg-white/70 p-5 md:p-6 lg:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href={product.ctaHref} className="btn-primary text-center">
            {product.ctaLabel}
          </Link>
          {storeBadges.map((badge) => (
            <Link
              key={badge.asset}
              href={product.ctaHref}
              aria-label={`${product.name} on ${badge.label}`}
              className="inline-flex w-full max-w-[10rem] overflow-hidden rounded-lg border border-slate-200 bg-slate-950 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 sm:w-40"
            >
              <span className="relative block aspect-[646/192] w-full">
                <Image
                  src={brandImages[badge.asset].src}
                  alt={brandImages[badge.asset].alt}
                  fill
                  sizes="10rem"
                  className="object-contain"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AppsPage() {
  const [featuredProduct, ...additionalProducts] = products;

  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal max-w-3xl">
            <h1 className="mt-7 text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Applications We&apos;ve Built
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              A focused showcase of published OpenStair applications, platform reach, store-ready presentation, and product-specific engineering decisions.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="https://apps.openstair.in" className="btn-primary">
                Open apps platform
              </Link>
              <Link href="/contact" className="btn-secondary">
                Build an app
              </Link>
            </div>
          </div>
          <BrandImage
            asset="applicationsHero"
            caption="Published OpenStair apps"
            description="A focused view of shipped products, platform reach, and product-specific storytelling."
            className="reveal reveal-delay-1"
            priority
          />
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Featured Product"
          title="Memory Match King leads the portfolio"
          description="The product story starts with a shipped mobile game and expands into reusable delivery patterns for future applications."
        />
        <div className="mt-8">
          <ProductCard product={featuredProduct} featured />
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Additional Products"
          title="AstroGuru expands the shipped product line"
          description="Each product keeps its own audience, platform story, and visual identity while sharing OpenStair's engineering standards."
        />
        <div className="mt-8 grid gap-5">
          {additionalProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Section>

      <Section className="py-10 md:py-12">
        <article className="reveal rounded-2xl border border-slate-200 bg-white/78 p-6 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">
            Open Source
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
            Product engineering also becomes reusable work.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            Public packages and examples give the product work a second life as reusable engineering patterns.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/open-source" className="btn-secondary">
              View Open Source
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Services
            </Link>
          </div>
        </article>
      </Section>

      <Section className="pt-4 pb-4 md:pt-6">
        <div className="reveal rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">
            Explore how OpenStair builds product systems.
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            The application portfolio connects directly to the services, engineering notes, reusable work, and documentation behind OpenStair delivery.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/services" className="btn-secondary">
              Services
            </Link>
            <Link href="/blog" className="btn-secondary">
              Blog
            </Link>
            <Link href="/open-source" className="btn-secondary">
              Open Source
            </Link>
            <Link href="/docs" className="btn-secondary">
              Documentation
            </Link>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
