import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CardGrid } from "@/components/ui/card-grid";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";
import { createSeoMetadata } from "@/lib/seo";
import { openSourceProjects } from "@/lib/site-content";

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

export default function OpenSourcePage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="reveal inline-flex rounded-full border border-cyan-500/25 bg-cyan-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Open Source
            </p>
            <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Developer-focused projects, packages, and open-source contributions.
            </h1>
            <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              OpenStair uses open-source work to turn repeated engineering lessons into reusable packages, reference patterns, and developer-facing examples.
            </p>
          </div>
          <VisualPlaceholder
            assetName="dummy_image_open_source.webp"
            title="Open developer work"
            description="Reserved visual space for packages, repositories, and public engineering resources."
            className="reveal reveal-delay-1"
          />
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Packages"
          title="Reusable work with a reason to exist"
          description="Each public project should explain the product problem it solves, the engineering pattern it clarifies, and when another team should use it."
        />
        <CardGrid items={openSourceProjects} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="https://github.com/openstair" className="btn-secondary">
            GitHub
          </Link>
          <Link href="https://pub.dev/publishers/openstair.in" className="btn-secondary">
            pub.dev
          </Link>
        </div>
      </Section>

      <CtaPanel variant="open-source" secondaryHref="/open-source" secondaryLabel="View Projects" />
    </SiteShell>
  );
}
