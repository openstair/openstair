import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";
import { createSeoMetadata } from "@/lib/seo";
import {
  engineeringProcess,
  featureCards,
  featuredApps,
  trustIndicators,
} from "@/lib/site-content";

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

export default function HomePage() {
  return (
    <SiteShell>
      <Section className="relative overflow-hidden pt-16 pb-14 sm:pt-20 md:pt-24 md:pb-20">
        <div className="relative grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="reveal max-w-3xl">
            <p className="eyebrow">Software Engineering Company</p>
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
          <VisualPlaceholder
            assetName="dummy_image_home_hero.webp"
            title="Mobile, web, and backend systems moving as one product."
            description="Reserved hero illustration slot for future animated product architecture artwork."
            className="reveal reveal-delay-1"
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

      <Section id="process" className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Services"
          title="Focused engineering services, not a menu of buzzwords"
          description="Each engagement starts with the product problem, then maps to the right interface, system, and launch path."
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
          <VisualPlaceholder
            assetName={featuredApps[0].assetName}
            title={featuredApps[0].title}
            description="Flagship shipped product showcase with room for screenshots, metrics, and store assets."
            className="reveal"
          />
          <div>
            <SectionHeading
              eyebrow="Portfolio"
              title="Apps are presented where they belong: the official OpenStair product portfolio"
              description="Memory Match King anchors the Apps page as a shipped product showcase, keeping portfolio storytelling focused instead of scattered across the website."
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

      <Section className="py-12 md:py-18">
        <div className="dark-panel rounded-[1.75rem] p-7 md:p-10">
          <div className="max-w-2xl reveal">
            <p className="eyebrow border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
              Engineering Process
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
              A delivery system shaped around product risk.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              OpenStair keeps planning, implementation, and handover visible so decisions remain understandable after launch.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {engineeringProcess.map((item) => (
              <article
                key={item.step}
              className="reveal rounded-2xl border border-white/10 bg-white/[0.06] p-6"
            >
                <p className="text-sm font-black text-cyan-200">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <CtaPanel variant="home" illustrationAssetName="dummy_image_consultation.webp" />
    </SiteShell>
  );
}
