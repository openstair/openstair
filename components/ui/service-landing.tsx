import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaPanel } from "@/components/ui/cta-panel";

type ServiceLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly {
    title: string;
    body: string;
  }[];
  benefits: readonly string[];
};

export function ServiceLanding({
  eyebrow,
  title,
  description,
  sections,
  benefits,
}: ServiceLandingProps) {
  return (
    <SiteShell>
      <Section className="relative overflow-hidden pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <div className="soft-pulse absolute top-8 right-[-90px] h-52 w-52 rounded-full bg-cyan-300/15 blur-3xl md:h-72 md:w-72" />
        <div className="reveal relative max-w-3xl">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            {eyebrow}
          </p>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary text-center">
              Discuss your project
            </Link>
            <Link href="/services" className="btn-secondary text-center">
              All services
            </Link>
          </div>
        </div>
      </Section>

      <Section className="grid gap-5 py-12 md:grid-cols-2 md:py-18">
        {sections.map((section) => (
          <article
            key={section.title}
            className="reveal rounded-2xl border border-white/10 bg-[var(--color-card)] p-7 transition duration-300 hover:border-cyan-300/30 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              {section.body}
            </p>
          </article>
        ))}
      </Section>

      <Section className="py-12 md:py-18">
        <div className="reveal rounded-3xl border border-white/10 bg-[var(--color-card-2)] p-8 md:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-white">
            Benefits for your product
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaPanel />
    </SiteShell>
  );
}
