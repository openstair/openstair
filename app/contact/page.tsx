import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { ContactForm } from "@/components/ui/contact-form";
import { getContactChannels } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach OpenStair through email, phone, WhatsApp, LinkedIn, or Instagram and send a message from the contact form.",
};

export default function ContactPage() {
  const channels = getContactChannels();

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
          <h2 className="text-xl font-semibold text-white">Direct channels</h2>
          <ul className="mt-6 space-y-3">
            {channels.map((channel) => (
              <li
                key={channel.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.05]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {channel.label}
                </p>
                <Link
                  href={channel.href}
                  aria-label={`${channel.label}: ${channel.value}`}
                  className="mt-2 inline-block text-sm leading-6 text-cyan-100 transition duration-300 hover:text-cyan-50"
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {channel.value}
                </Link>
              </li>
            ))}
          </ul>
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
