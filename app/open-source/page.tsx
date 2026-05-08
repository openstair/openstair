import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Open Source Projects",
  description:
    "Explore OpenStair Technologies open-source work, GitHub projects, pub.dev packages, and developer-focused contributions.",
  path: "/open-source",
  keywords: [
    "OpenStair open source",
    "GitHub projects",
    "pub.dev packages",
    "Flutter packages",
  ],
});

const packages = [
  {
    title: "Flutter UI Utilities",
    description:
      "Placeholder for reusable Flutter widgets, app UI helpers, and design-system friendly mobile components.",
    href: "https://pub.dev/publishers/openstair.in",
    label: "View pub.dev",
  },
  {
    title: "API Client Helpers",
    description:
      "Placeholder for typed networking helpers, error handling patterns, and app integration utilities.",
    href: "https://github.com/openstair",
    label: "View GitHub",
  },
  {
    title: "Developer Examples",
    description:
      "Placeholder for sample apps, architecture references, and implementation notes from OpenStair projects.",
    href: "https://github.com/openstair",
    label: "View projects",
  },
];

export default function OpenSourcePage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <p className="reveal inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Open Source
        </p>
        <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Developer-focused projects, packages, and open-source contributions.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          OpenStair Technologies uses open-source thinking to make software more maintainable, reusable, and helpful for the wider developer community.
        </p>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Packages"
          title="GitHub projects and pub.dev package placeholders"
          description="This page is ready to showcase production packages, sample repositories, Flutter utilities, and backend examples as they are published."
        />
        <CardGrid items={packages} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="https://github.com/openstair" className="btn-secondary">
            GitHub
          </Link>
          <Link href="https://pub.dev/publishers/openstair.in" className="btn-secondary">
            pub.dev
          </Link>
        </div>
      </Section>

      <CtaPanel
        title="Need developer-friendly product engineering?"
        description="We build clean mobile, web, and backend systems with the same care we expect from reusable open-source software."
      />
    </SiteShell>
  );
}
