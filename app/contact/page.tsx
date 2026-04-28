import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { ContactForm } from "@/components/ui/contact-form";
import { ContactIconButton } from "@/components/ui/contact-icon-button";
import { getContactGroups } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach OpenStair through email, phone, WhatsApp, LinkedIn, or Instagram and send a message from the contact form.",
};

export default function ContactPage() {
  const groups = getContactGroups();

  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <h1 className="reveal text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Let&apos;s build better momentum together.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          We usually reply within one business day. Reach out on your preferred channel or send us a quick message.
        </p>
      </Section>

      <Section className="grid gap-6 pb-2 md:grid-cols-[1.05fr_1fr] md:items-start">
        <article className="reveal rounded-3xl border border-white/10 bg-[var(--color-card)] p-7 md:p-8">
          <h2 className="text-xl font-semibold text-white">Direct Contact</h2>
          <div className="mt-6 space-y-5">
            {groups.map((group) => (
              <section key={group.title} aria-label={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {group.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2.5">
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

        <article className="reveal reveal-delay-1 rounded-3xl border border-white/10 bg-[var(--color-card-2)] p-7 md:p-8">
          <h2 className="text-xl font-semibold text-white">Send a message</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Share your use case and team size so we can route your request faster.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </article>
      </Section>
    </SiteShell>
  );
}
