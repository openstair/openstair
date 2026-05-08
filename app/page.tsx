import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { createSeoMetadata } from "@/lib/seo";
import { featureCards, howItWorks, technologies } from "@/lib/site-content";

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
});

const projectHighlights = [
  {
    title: "Mobile Apps",
    description:
      "Flutter and Android apps for consumer products, business tools, internal operations, and public launches.",
  },
  {
    title: "Web Platforms",
    description:
      "SEO-ready company websites, responsive web applications, dashboards, and product interfaces.",
  },
  {
    title: "Backend Systems",
    description:
      "APIs, authentication, database architecture, admin workflows, integrations, and deployment support.",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <Section className="relative overflow-hidden pt-18 pb-16 sm:pt-22 md:pt-28 md:pb-24">
        <div className="soft-pulse absolute top-8 right-[-90px] h-52 w-52 rounded-full bg-cyan-300/15 blur-3xl md:h-72 md:w-72" />
        <div className="reveal relative max-w-3xl">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Software Development Company
          </p>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            We build scalable Flutter, Android, web, and backend applications.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            OpenStair Technologies helps businesses design, develop, and launch modern software products with clean engineering, strong user experience, and production-ready architecture.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary reveal-delay-1 text-center">
              Start a project
            </Link>
            <Link href="/services" className="btn-secondary reveal-delay-2 text-center">
              Explore services
            </Link>
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Services"
          title="Product engineering across mobile, web, and backend"
          description="From idea validation to production launch, we build the core software layers your product needs to scale."
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
          }))}
        />
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Technologies"
          title="Modern tools for reliable application delivery"
          description="We choose practical technologies that support speed, maintainability, performance, and clean handover."
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="reveal rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200"
            >
              {technology}
            </span>
          ))}
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Process"
          title="A focused path from concept to production"
          description="Our delivery style keeps communication clear, engineering decisions visible, and every build aligned with the product goal."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <article
              key={item.step}
              className="reveal rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6 transition duration-300 hover:border-cyan-300/30"
            >
              <p className="text-sm font-semibold text-[var(--color-accent)]">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.step}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Featured Work"
          title="Apps and systems built for real product use"
          description="Our work spans mobile apps, web platforms, backend services, and full stack solutions for businesses that need dependable software."
        />
        <CardGrid items={projectHighlights} />
        <div className="mt-8">
          <Link href="https://apps.openstair.in" className="btn-secondary">
            View OpenStair apps
          </Link>
        </div>
      </Section>

      <CtaPanel />
    </SiteShell>
  );
}
