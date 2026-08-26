import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BrandImage } from "@/components/ui/brand-image";
import { ContactForm } from "@/components/ui/contact-form";
import { ContactIconButton } from "@/components/ui/contact-icon-button";
import { getContactGroups } from "@/lib/contact";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Contact OpenStair Technologies",
  description:
    "Contact OpenStair Technologies for Flutter development, Android app development, web development, backend development, and full stack software projects.",
  path: "/contact",
});

export default function ContactPage() {
  const groups = getContactGroups();

  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <h1 className="reveal mt-7 text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
              Let&apos;s build your next software product.
            </h1>
            <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Share your mobile, web, backend, or full stack development requirements. We usually reply within one business day.
            </p>
          </div>
          <BrandImage
            asset="contactHero"
            caption="Consultation"
            description="Project planning, technical clarity, and delivery coordination from the first conversation."
            className="reveal reveal-delay-1"
            priority
          />
        </div>
      </Section>

      <Section className="grid gap-6 pb-2 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <article className="surface-card reveal relative overflow-hidden rounded-3xl p-6 md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-100 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Contact Channels
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">Direct Contact</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              Reach us through the channel that works best for your Flutter, Android, web, backend, or full stack project.
            </p>
          </div>
          <div className="relative mt-7 space-y-7">
            {groups.map((group) => (
              <section key={group.title} aria-label={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {group.title}
                </h3>
                <div className="mt-3 grid gap-3">
                  {group.items.map((item) => (
                    <ContactIconButton
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      value={item.value}
                      href={item.href}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="relative mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Office Information</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              OpenStair Technologies is based in India and works with clients through clear remote consultation, planning, and delivery communication.
            </p>
          </div>
        </article>

        <article className="surface-card reveal reveal-delay-1 rounded-3xl p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Consultation
          </p>
          <h2 className="mt-3 text-xl font-semibold text-[var(--color-ink)]">Send a message</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            Share your project goal, target platforms, and timeline so we can route your request faster.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </article>
      </Section>

      <Section className="py-12 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <BrandImage
            asset="consultation"
            caption="Project consultation"
            description="Discovery calls, technical planning, and delivery alignment for serious product work."
            className="reveal"
          />
          <article className="surface-card reveal rounded-3xl p-7 md:p-8">
            <p className="eyebrow">Trust</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-ink)]">
              Consultation focused on practical next steps.
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              We clarify the product goal, target platforms, core risks, and the cleanest delivery path before recommending the next engineering step.
            </p>
          </article>
        </div>
      </Section>
    </SiteShell>
  );
}
