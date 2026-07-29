import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";
import { createSeoMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

const servicePresentation: Record<
  string,
  {
    icon: string;
    assetName: string;
    problem: string;
    solution: string;
    technology: string;
    outcome: string;
  }
> = {
  "Flutter Development": {
    icon: "FL",
    assetName: "dummy_image_flutter_service.webp",
    problem: "Shipping separate mobile apps slows product learning.",
    solution: "Build one polished cross-platform experience.",
    technology: "Flutter, Dart, APIs, release workflows.",
    outcome: "A launch-ready app foundation that can keep evolving.",
  },
  "Android Development": {
    icon: "AN",
    assetName: "dummy_image_flutter_service.webp",
    problem: "Platform details affect performance and trust.",
    solution: "Engineer native Android flows with release discipline.",
    technology: "Android, Kotlin-ready patterns, Play Store support.",
    outcome: "A stable app experience shaped for Android users.",
  },
  "Web Development": {
    icon: "WB",
    assetName: "dummy_image_web_service.webp",
    problem: "Generic websites weaken credibility.",
    solution: "Create fast public surfaces and scalable web apps.",
    technology: "Next.js, React, TypeScript, technical SEO.",
    outcome: "A professional web presence that supports growth.",
  },
  "Backend Development": {
    icon: "BE",
    assetName: "dummy_image_backend_service.webp",
    problem: "Products break when APIs and data are improvised.",
    solution: "Design secure services, models, and integrations.",
    technology: "Spring Boot, REST APIs, databases, auth.",
    outcome: "Backend systems that are easier to operate and extend.",
  },
  "API Integration": {
    icon: "API",
    assetName: "dummy_image_backend_service.webp",
    problem: "External services often create fragile product flows.",
    solution: "Connect payments, auth, analytics, and notifications cleanly.",
    technology: "REST APIs, webhooks, typed clients, monitoring.",
    outcome: "Integrations that users can rely on.",
  },
  "Full Stack Solutions": {
    icon: "FS",
    assetName: "dummy_image_ai_service.webp",
    problem: "Fragmented vendors create fragmented products.",
    solution: "Own the path from interface to backend to launch.",
    technology: "Mobile, web, backend, deployment, documentation.",
    outcome: "One coherent product build with fewer handoff gaps.",
  },
};

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
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="reveal inline-flex rounded-full border border-cyan-500/25 bg-cyan-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Services
            </p>
            <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Software development services for mobile, web, and backend products.
            </h1>
            <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              OpenStair Technologies provides focused engineering support across Flutter, Android, web, backend, API integration, and full stack product delivery.
            </p>
          </div>
          <VisualPlaceholder
            assetName="dummy_image_web_service.webp"
            title="Service architecture"
            description="Reserved visual for product layers, delivery flow, or service-specific artwork."
            className="reveal reveal-delay-1"
          />
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="What We Do"
          title="Every service is tied to a real product risk"
          description="The work is organized around clear problems, practical technical choices, and outcomes that matter after launch."
        />
        <CardGrid
          items={services.map((service) => ({
            title: service.title,
            description: service.description,
            href: service.href,
            label: "Explore service",
            ...servicePresentation[service.title],
          }))}
        />
      </Section>

      <Section className="py-12 md:py-18">
        <article className="reveal rounded-2xl border border-slate-200 bg-[var(--color-card-2)] p-8 md:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-[var(--color-ink)]">
            Full stack delivery without unnecessary complexity.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
            We can build a complete product stack: Flutter or Android apps, responsive web interfaces, backend APIs, authentication, databases, integrations, deployment, and ongoing iteration.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/flutter-development" className="btn-secondary">
              Flutter
            </Link>
            <Link href="/backend-development" className="btn-secondary">
              Backend
            </Link>
            <Link href="/apps" className="btn-secondary">
              Applications
            </Link>
            <Link href="/contact" className="btn-primary">
              Get a quote
            </Link>
          </div>
        </article>
      </Section>

      <CtaPanel variant="services" />
    </SiteShell>
  );
}
