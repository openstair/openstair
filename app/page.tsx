import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { featureCards, howItWorks } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "OpenStair is the operating layer for fast-moving startup teams that need focus and execution clarity.",
};

export default function HomePage() {
  return (
    <SiteShell>
      <Section className="relative overflow-hidden pt-18 pb-16 sm:pt-22 md:pt-28 md:pb-24">
        <div className="soft-pulse absolute top-8 right-[-90px] h-52 w-52 rounded-full bg-cyan-300/15 blur-3xl md:h-72 md:w-72" />
        <div className="reveal relative max-w-3xl">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Built for high-velocity startups
          </p>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Turn scattered execution into one clear, compounding workflow.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            OpenStair gives your team a premium operating surface to plan smarter, collaborate tighter, and ship without momentum loss.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-primary reveal-delay-1 text-center"
            >
              Book a demo
            </Link>
            <Link
              href="/about"
              className="btn-secondary reveal-delay-2 text-center"
            >
              Learn about OpenStair
            </Link>
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Features"
          title="Everything your team needs to move in sync"
          description="A minimal but powerful stack designed to reduce operational drag and help teams execute with confidence."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="reveal group rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-cyan-100">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps to operational clarity"
          description="Roll out OpenStair in days, not quarters, and keep your execution model lightweight as you scale."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <article
              key={item.step}
              className="reveal rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6 transition duration-300 hover:border-cyan-300/30"
            >
              <p className="text-sm font-semibold text-[var(--color-accent)]">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.step}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="py-12 pb-2 md:py-18">
        <div className="reveal rounded-3xl border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(103,232,249,0.16),rgba(103,232,249,0.06))] p-8 sm:p-10 md:p-12">
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            Ready to climb faster with less friction?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100/90">
            OpenStair helps teams reclaim focus, reduce decision lag, and create measurable progress every week.
          </p>
          <Link
            href="/contact"
            className="btn-secondary mt-7 border-white bg-white text-slate-900 hover:bg-slate-100"
          >
            Talk to our team
          </Link>
        </div>
      </Section>
    </SiteShell>
  );
}
