import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "About OpenStair Technologies",
  description:
    "OpenStair Technologies is a software company focused on Flutter development, web development, backend systems, mobile app development, and scalable modern applications.",
  path: "/about",
  keywords: [
    "Flutter development company",
    "web development",
    "backend systems",
    "mobile app development",
    "software company",
  ],
});

export default function AboutPage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              We are a software company for modern mobile, web, and backend products.
            </h1>
            <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              OpenStair Technologies builds scalable applications for businesses that need dependable engineering, thoughtful interfaces, and clean technical foundations.
            </p>
          </div>
          <VisualPlaceholder
            assetName="dummy_image_about_company.webp"
            title="OpenStair Technologies"
            description="Reserved company visual sourced from the OpenStair Knowledge Platform."
            className="reveal reveal-delay-1"
          />
        </div>
      </Section>

      <Section className="grid gap-5 py-8 md:grid-cols-2 md:py-10">
        <article className="surface-card reveal rounded-3xl p-7 transition duration-300 hover:border-cyan-500/30 md:p-8">
          <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Mission</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            To help companies turn product ideas into reliable software through Flutter development, Android app development, web development, backend systems, and full stack engineering.
          </p>
        </article>
        <article className="surface-card reveal reveal-delay-1 rounded-3xl p-7 transition duration-300 hover:border-cyan-500/30 md:p-8">
          <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Engineering Mindset</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            We care about readable code, practical architecture, fast user experiences, secure APIs, and product decisions that make future development easier.
          </p>
        </article>
      </Section>

      <Section className="py-12 md:py-18">
        <article className="surface-card reveal rounded-3xl p-8 md:p-10">
          <SectionHeading
            eyebrow="Company Role"
            title="What We Build"
            description="OpenStair acts as a technical partner for organizations that need product planning, implementation, integration, and launch support."
          />
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
            OpenStair works across mobile app development, responsive web development, backend development, and full stack solutions. We build Flutter apps, native Android experiences, SEO-friendly websites, scalable APIs, database-backed systems, and integrations that connect products to the services they depend on.
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
            Our goal is not only to ship features. We help shape software that is maintainable, performant, and understandable for the teams who will grow it after launch.
          </p>
          <Link href="/docs" className="btn-secondary mt-7">
            Read Documentation
          </Link>
        </article>
      </Section>

      <Section className="py-12 md:py-18">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "Based in India",
            "Service-oriented software delivery",
            "Documentation-backed standards",
          ].map((item) => (
            <div
              key={item}
              className="surface-muted reveal rounded-3xl p-6 text-sm font-semibold text-[var(--color-ink)]"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CtaPanel variant="about" />
    </SiteShell>
  );
}
