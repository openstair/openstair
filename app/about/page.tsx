import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the mission, vision, and story behind OpenStair and how we help modern teams execute with clarity.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <h1 className="reveal max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          We help teams scale execution without scaling chaos.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          OpenStair exists to help startups operate with precision, not noise. Great teams do their best work when priorities are clear and execution stays connected.
        </p>
      </Section>

      <Section className="grid gap-5 md:grid-cols-2">
        <article className="reveal rounded-2xl border border-white/10 bg-[var(--color-card)] p-7 md:p-8 transition duration-300 hover:border-cyan-300/30">
          <h2 className="text-2xl font-semibold text-white">Mission</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            To make high-quality execution accessible to every startup by replacing fragmented workflows with one intuitive, reliable operating layer.
          </p>
        </article>
        <article className="reveal reveal-delay-1 rounded-2xl border border-white/10 bg-[var(--color-card)] p-7 md:p-8 transition duration-300 hover:border-cyan-300/30">
          <h2 className="text-2xl font-semibold text-white">Vision</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            A future where ambitious teams scale sustainably because strategy, decisions, and delivery stay aligned from day one.
          </p>
        </article>
      </Section>

      <Section className="py-12 md:py-18">
        <article className="reveal rounded-3xl border border-white/10 bg-[var(--color-card-2)] p-8 md:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-white">Our Story</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            OpenStair started with a pattern we kept seeing across growing companies: smart teams were spending more energy coordinating than creating. Tools were everywhere, ownership was fuzzy, and strategic decisions were getting buried in day-to-day noise.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            We built OpenStair to change that. By combining planning, visibility, and execution into one clean experience, teams spend less effort on operational overhead and more effort on building what matters.
          </p>
        </article>
      </Section>
    </SiteShell>
  );
}
