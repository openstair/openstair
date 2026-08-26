import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BrandImage } from "@/components/ui/brand-image";
import { CardGrid } from "@/components/ui/card-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { socialAssets } from "@/lib/brand-assets";
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
  image: socialAssets.pages.blog,
});

export default function OpenSourcePage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Developer-focused projects, packages, and open-source contributions.
            </h1>
            <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              OpenStair turns repeated engineering lessons into reusable packages, reference patterns, and documentation that other builders can inspect and adapt.
            </p>
          </div>
          <BrandImage
            asset="openSourceHero"
            caption="Open developer work"
            description="Packages, repositories, and public engineering resources shaped by real product work."
            className="reveal reveal-delay-1"
            priority
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

      <Section className="py-10 md:py-12">
        <div className="grid gap-7 rounded-xl border border-slate-200 bg-white/78 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:p-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="reveal">
            <p className="eyebrow">Open Source Commitment</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-ink)] md:text-4xl">
              Reusable engineering should become useful community work.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              OpenStair contributes reusable Flutter packages, engineering tools, documentation, and libraries back to the community whenever a pattern is mature enough to help teams build with more confidence.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="https://github.com/openstair"
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub
              </Link>
              <Link
                href="https://pub.dev/publishers/openstair.in"
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Browse pub.dev
              </Link>
            </div>
          </div>
          <div className="reveal reveal-delay-1 grid gap-4">
            <BrandImage
              asset="openSourceHero"
              caption="Packages, tools, and documentation"
              aspect="wide"
              className="max-h-64"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-[var(--color-ink)]">
                Repository summary
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Public work focuses on Flutter utilities, integration helpers, reference applications, and documentation that comes from production delivery patterns.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Repositories", "Public engineering work"],
                ["Packages", "Flutter-ready utilities"],
                ["Docs", "Examples and standards"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
