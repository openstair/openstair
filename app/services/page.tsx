import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { createSeoMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = createSeoMetadata({
  title: "Software Development Services",
  description:
    "Explore OpenStair Technologies services for Flutter development, Android app development, web development, backend development, API integration, and full stack solutions.",
  path: "/services",
  keywords: [
    "software development services",
    "Flutter development",
    "Android app development",
    "web development",
    "backend development",
    "API integration",
    "full stack solutions",
  ],
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <p className="reveal inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Services
        </p>
        <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Software development services for mobile, web, and backend products.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          OpenStair Technologies provides focused engineering support across Flutter, Android, web, backend, API integration, and complete full stack solutions.
        </p>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="What We Do"
          title="Choose the right engineering layer for your product"
          description="Each service can stand alone or combine into a full product build, from frontend experience to backend architecture."
        />
        <CardGrid
          items={services.map((service) => ({
            title: service.title,
            description: `${service.description} ${service.keywords}.`,
            href: service.href,
          }))}
        />
      </Section>

      <Section className="py-12 md:py-18">
        <article className="reveal rounded-3xl border border-white/10 bg-[var(--color-card-2)] p-8 md:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-white">
            Full stack delivery without unnecessary complexity
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            We can build a complete product stack: Flutter or Android apps, responsive web interfaces, backend APIs, authentication, databases, integrations, deployment, and ongoing iteration.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/flutter-development" className="btn-secondary">
              Flutter
            </Link>
            <Link href="/backend-development" className="btn-secondary">
              Backend
            </Link>
            <Link href="/contact" className="btn-primary">
              Get a quote
            </Link>
          </div>
        </article>
      </Section>

      <CtaPanel />
    </SiteShell>
  );
}
