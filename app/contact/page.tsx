import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
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
        <h1 className="reveal text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Let&apos;s build your next software product.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Share your mobile, web, backend, or full stack development requirements. We usually reply within one business day.
        </p>
      </Section>

      <Section className="grid gap-6 pb-2 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <article className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,25,45,0.96),rgba(11,18,34,0.92))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Contact Channels
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Direct Contact</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Reach us through the channel that works best for your Flutter, Android, web, backend, or full stack project.
            </p>
          </div>
          <div className="relative mt-7 space-y-7">
            {groups.map((group) => (
              <section key={group.title} aria-label={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
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
        </article>

        <article className="reveal reveal-delay-1 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(14,23,41,0.96),rgba(9,15,28,0.92))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.16)] md:p-8">
          <h2 className="text-xl font-semibold text-white">Send a message</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Share your project goal, target platforms, and timeline so we can route your request faster.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </article>
      </Section>
    </SiteShell>
  );
}
