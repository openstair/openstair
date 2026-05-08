import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaPanel } from "@/components/ui/cta-panel";
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
        <h1 className="reveal max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          We are a software company for modern mobile, web, and backend products.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          OpenStair Technologies builds scalable applications for businesses that need dependable engineering, thoughtful interfaces, and clean technical foundations.
        </p>
      </Section>

      <Section className="grid gap-5 md:grid-cols-2">
        <article className="reveal rounded-2xl border border-white/10 bg-[var(--color-card)] p-7 transition duration-300 hover:border-cyan-300/30 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Mission</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            To help companies turn product ideas into reliable software through Flutter development, Android app development, web development, backend systems, and full stack engineering.
          </p>
        </article>
        <article className="reveal reveal-delay-1 rounded-2xl border border-white/10 bg-[var(--color-card)] p-7 transition duration-300 hover:border-cyan-300/30 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Engineering Mindset</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            We care about readable code, practical architecture, fast user experiences, secure APIs, and product decisions that make future development easier.
          </p>
        </article>
      </Section>

      <Section className="py-12 md:py-18">
        <article className="reveal rounded-3xl border border-white/10 bg-[var(--color-card-2)] p-8 md:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-white">
            What We Build
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            OpenStair works across mobile app development, responsive web development, backend development, and full stack solutions. We build Flutter apps, native Android experiences, SEO-friendly websites, scalable APIs, database-backed systems, and integrations that connect products to the services they depend on.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Our goal is not only to ship features. We help shape software that is maintainable, performant, and understandable for the teams who will grow it after launch.
          </p>
        </article>
      </Section>

      <CtaPanel
        title="Looking for a practical software development partner?"
        description="OpenStair Technologies can help plan, build, launch, and improve your next mobile, web, or backend application."
      />
    </SiteShell>
  );
}
