import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BrandImage } from "@/components/ui/brand-image";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { socialAssets } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";
import {
  featureCards,
  featuredApps,
  trustIndicators,
} from "@/lib/site-content";

const capabilities = [
  {
    icon: "FL",
    title: "Flutter Engineering",
    description:
      "Cross-platform mobile apps built with stable architecture, polished UI behavior, and release-aware delivery.",
  },
  {
    icon: "FS",
    title: "Full Stack Development",
    description:
      "Product surfaces, APIs, data models, and deployment paths planned together so the system works as one product.",
  },
  {
    icon: "CA",
    title: "Clean Architecture",
    description:
      "Readable boundaries between interface, business rules, data access, and integrations keep future changes safer.",
  },
  {
    icon: "BE",
    title: "Scalable Backend Systems",
    description:
      "Secure APIs, authentication, databases, and integrations designed for maintainability beyond the first release.",
  },
  {
    icon: "KT",
    title: "Documentation & Knowledge Transfer",
    description:
      "Architecture notes, handover material, and operating context make the product easier to understand, maintain, and extend.",
  },
  {
    icon: "LP",
    title: "Long-term Product Partnership",
    description:
      "OpenStair stays oriented around product risk, helping teams make practical technical choices before and after launch.",
  },
] as const;

export const metadata = createSeoMetadata({
  title: "Software Development Company",
  description:
    "OpenStair Technologies is a software development company for Flutter development, Android app development, web development, backend development, and full stack solutions.",
  path: "/",
  keywords: [
    "software development company",
    "Flutter development company",
    "Android app development",
    "web development",
    "backend development",
    "full stack solutions",
  ],
  image: socialAssets.pages.home,
});

export default function HomePage() {
  return (
    <SiteShell>
      <Section className="relative overflow-hidden pt-16 pb-14 sm:pt-20 md:pt-24 md:pb-20">
        <div className="relative grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="reveal max-w-3xl">
            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Premium software engineering for products that need to feel reliable from day one.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              OpenStair Technologies designs and builds mobile apps, web platforms, backend systems, and launch-ready product foundations with clear architecture and careful delivery ownership.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary reveal-delay-1 text-center">
                Book consultation
              </Link>
              <Link href="/services" className="btn-secondary reveal-delay-2 text-center">
                Explore services
              </Link>
            </div>
          </div>
          <BrandImage
            asset="homeHero"
            caption="Mobile, web, and backend systems moving as one product."
            description="A visual summary of OpenStair's connected product engineering work."
            className="reveal reveal-delay-1"
            priority
          />
        </div>
      </Section>

      <Section className="py-10 md:py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.label}
              className="surface-card reveal rounded-2xl px-5 py-5"
            >
              <p className="text-2xl font-semibold text-[var(--color-ink)]">
                {indicator.value}
              </p>
              <h2 className="mt-2 text-sm font-bold text-cyan-700">
                {indicator.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {indicator.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-10 md:py-14">
        <SectionHeading
          eyebrow="Services"
          title="Focused services for real product delivery"
          description="Each engagement starts with the product problem, then maps to the right interface, system, and release path."
        />
        <CardGrid
          items={featureCards.map((service) => ({
            ...service,
            href:
              service.title === "Flutter App Development"
                ? "/flutter-development"
                : service.title === "Android App Development"
                  ? "/android-development"
                  : service.title === "Web Development"
                    ? "/web-development"
                    : "/backend-development",
            label: "Explore service",
          }))}
        />
      </Section>

      <Section className="py-12 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <BrandImage
            asset={featuredApps[0].asset}
            caption={featuredApps[0].title}
            description="A shipped product showcase connected to OpenStair's broader application portfolio."
            className="reveal"
          />
          <div>
            <SectionHeading
              eyebrow="Portfolio"
              title="Published applications show the engineering standard in practice"
              description="Memory Match King anchors the application portfolio with a real shipped product, release-ready presentation, and reusable lessons for future builds."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/apps" className="btn-primary">
                View Applications
              </Link>
              <Link href="https://apps.openstair.in" className="btn-secondary">
                Apps platform
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="capabilities" className="py-10 md:py-12">
        <SectionHeading
          eyebrow="Why OpenStair"
          title="Engineering capability you can evaluate quickly"
          description="OpenStair combines mobile, web, backend, architecture, and documentation discipline so product work remains dependable after launch."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="surface-card reveal rounded-xl p-5 transition duration-300 hover:border-cyan-500/30"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-100 text-xs font-black text-cyan-700">
                {capability.icon}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">
                {capability.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className="btn-primary">
            Explore Services
          </Link>
          <Link href="/blog" className="btn-secondary">
            Read Engineering Notes
          </Link>
          <Link href="/open-source" className="btn-secondary">
            Open Source
          </Link>
        </div>
      </Section>

      <CtaPanel variant="home" illustrationAsset="consultation" />
    </SiteShell>
  );
}
