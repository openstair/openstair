import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";
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
});

type Product = {
  name: string;
  status: "Published";
  platforms: readonly string[];
  overview: string;
  technology: readonly string[];
  highlights: readonly string[];
  showcaseAsset: string;
  gallery: readonly {
    assetName: string;
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
      "A polished memory game built as a focused mobile product with clear gameplay moments, visual progression, and release-ready portfolio presentation.",
    technology: ["Flutter", "Dart", "Mobile UI", "Release"],
    highlights: [
      "Simple game loop",
      "Mobile-first interface",
      "Gallery-ready product story",
    ],
    showcaseAsset: "dummy_image_memory_match_showcase.webp",
    gallery: [
      {
        assetName: "dummy_image_memory_match_gallery_01.webp",
        title: "Gameplay Preview",
      },
      {
        assetName: "dummy_image_memory_match_gallery_02.webp",
        title: "Progress Moments",
      },
      {
        assetName: "dummy_image_memory_match_gallery_03.webp",
        title: "Mobile Showcase",
      },
    ],
    ctaHref: "https://apps.openstair.in",
    ctaLabel: "View product",
  },
  {
    name: "AstroGuru",
    status: "Published",
    platforms: ["Android", "iOS"],
    overview:
      "A shipped astrology product presented with dedicated space for product artwork, app screenshots, platform distribution, and future release details.",
    technology: ["Flutter", "Dart", "Mobile Product", "APIs"],
    highlights: [
      "Consumer app experience",
      "Cross-platform release path",
      "Structured product surface",
    ],
    showcaseAsset: "dummy_image_astroguru_showcase.webp",
    gallery: [
      {
        assetName: "dummy_image_astroguru_gallery_01.webp",
        title: "Home Experience",
      },
      {
        assetName: "dummy_image_astroguru_gallery_02.webp",
        title: "Guidance Flow",
      },
      {
        assetName: "dummy_image_astroguru_gallery_03.webp",
        title: "Mobile Showcase",
      },
    ],
    ctaHref: "https://apps.openstair.in",
    ctaLabel: "View app",
  },
] as const;

function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <article
      className={[
        "surface-card reveal overflow-hidden rounded-2xl",
        featured ? "grid gap-0 lg:grid-cols-[1.05fr_0.95fr]" : "",
      ].join(" ")}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-500/20 bg-cyan-50 text-sm font-black text-cyan-800">
            {product.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 3)}
          </div>
          <div>
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

        <div className="mt-6 flex flex-wrap gap-2">
          {product.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {platform}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">
            Technology
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.technology.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-500/20 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-2">
          {product.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
            >
              {highlight}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
            App Store badge
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
            Play Store badge
          </div>
        </div>

        <Link href={product.ctaHref} className="btn-primary mt-6">
          {product.ctaLabel}
        </Link>
      </div>

      <div className="grid gap-4 border-t border-slate-200 bg-slate-50/70 p-4 md:p-5 lg:border-l lg:border-t-0">
        <VisualPlaceholder
          assetName={product.showcaseAsset}
          title={product.name}
          description="Reserved product hero placeholder for launch artwork and store visuals."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {product.gallery.map((item) => (
            <VisualPlaceholder
              key={item.assetName}
              assetName={item.assetName}
              title={item.title}
              aspect="portrait"
              className="rounded-2xl"
            />
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
            <p className="eyebrow">Applications</p>
            <h1 className="mt-7 text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Applications We&apos;ve Built
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              The Apps page is the official product showcase: a curated view of published applications, platform reach, store-ready presentation, and product-specific storytelling.
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
          <VisualPlaceholder
            assetName={featuredProduct.showcaseAsset}
            title="Published OpenStair apps"
            description="Reserved showcase media for Memory Match King, AstroGuru, and future shipped products."
            className="reveal reveal-delay-1"
          />
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Featured Product"
          title="Memory Match King leads the portfolio"
          description="The showcase starts with the most visual product story, then expands into the broader OpenStair product catalog."
        />
        <div className="mt-8">
          <ProductCard product={featuredProduct} featured />
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Additional Products"
          title="AstroGuru expands the shipped product line"
          description="The page now tells a broader product story while keeping each app distinct."
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

      <Section className="pt-4 pb-2 md:pt-6">
        <div className="reveal rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">
            More products coming
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            New OpenStair products can be added here without changing the portfolio structure.
          </p>
        </div>
      </Section>
    </SiteShell>
  );
}
