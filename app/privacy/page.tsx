import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Privacy Policy",
  description:
    "Learn how OpenStair Technologies collects, uses, protects, and discloses information when you use our website and services.",
  path: "/privacy",
});

const lastUpdated = "August 2, 2026";

export default function PrivacyPage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-10 sm:pt-22 md:pt-28 md:pb-12">
        <div className="max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Last updated: {lastUpdated}
          </p>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            This Privacy Policy explains how information is collected, used, disclosed, and
            protected when visitors use the OpenStair Technologies website. It is intended to
            help visitors understand the information practices connected with our website,
            contact forms, published content, and advertising-supported operations.
          </p>
        </div>
      </Section>

      <Section className="pb-8 md:pb-12">
        <article className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-[var(--color-muted)]">
          <section aria-labelledby="who-we-are">
            <h2 id="who-we-are" className="text-2xl font-semibold text-[var(--color-ink)]">
              Who We Are
            </h2>
            <p className="mt-4">
              OpenStair Technologies operates and publishes the website at{" "}
              <Link href="/" className="font-semibold text-cyan-700 underline-offset-4 hover:underline">
                openstair.in
              </Link>
              . OpenStair Technologies is based in India and provides information about mobile,
              web, backend, full stack, documentation, open-source, and software engineering
              services.
            </p>
            <p className="mt-4">
              You can contact us at{" "}
              <Link
                href="mailto:hello@openstair.in"
                className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
              >
                hello@openstair.in
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="information-we-may-collect">
            <h2
              id="information-we-may-collect"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Information We May Collect
            </h2>
            <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
              Information You Voluntarily Provide
            </h3>
            <p className="mt-3">
              When you contact OpenStair through the website or by email, you may provide your
              name, email address, message, project details, inquiry information, and any optional
              attachment you choose to submit through the contact form.
            </p>
            <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
              Technical Information
            </h3>
            <p className="mt-3">
              When you access the website, technical information may be generated or processed as
              part of normal website delivery, security, logging, advertising, and request
              handling. This may include IP address, browser and device information, operating
              system, referring pages, pages requested, timestamps, and other usage or request
              information.
            </p>
          </section>

          <section aria-labelledby="how-we-use-information">
            <h2
              id="how-we-use-information"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              How We Use Information
            </h2>
            <p className="mt-4">We may use information for purposes such as:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>responding to inquiries and contact requests;</li>
              <li>providing requested information about our services;</li>
              <li>operating, maintaining, and improving the website;</li>
              <li>improving content, usability, reliability, and performance;</li>
              <li>detecting, preventing, and responding to abuse, fraud, or security issues;</li>
              <li>understanding website usage where applicable;</li>
              <li>meeting legal, compliance, or operational obligations; and</li>
              <li>supporting advertising operations where advertising services are enabled.</li>
            </ul>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className="text-2xl font-semibold text-[var(--color-ink)]">
              Cookies and Similar Technologies
            </h2>
            <p className="mt-4">
              Cookies are small files or identifiers that websites and third-party services may
              store or read through a browser or device. Cookies and similar technologies may be
              used for essential functionality, preferences, measurement, security, or advertising,
              depending on the services enabled on the website.
            </p>
            <p className="mt-4">
              Some third-party services may place or read cookies or similar technologies when
              their features are active. You can control cookies through your browser settings,
              although disabling some cookies may affect website functionality or third-party
              features.
            </p>
          </section>

          <section aria-labelledby="advertising">
            <h2 id="advertising" className="text-2xl font-semibold text-[var(--color-ink)]">
              Advertising and Google AdSense
            </h2>
            <p className="mt-4">
              The website includes an integration for Google AdSense. AdSense is configured to
              load only when advertising is enabled, a publisher client is configured, and the
              website is running in production. When enabled, third-party advertising providers,
              including Google, may use cookies, web beacons, IP addresses, device identifiers, or
              similar technologies to serve advertisements, measure advertising performance, and
              help personalize advertisements based on applicable signals and user activity.
            </p>
            <p className="mt-4">
              Google and its partners may use information about visits to this and other websites
              for advertising purposes, subject to applicable policies and user choices. You can
              review or adjust Google advertising preferences at{" "}
              <Link
                href="https://adssettings.google.com/"
                className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
              >
                Google Ads Settings
              </Link>
              . You may also review industry opt-out resources such as{" "}
              <Link
                href="https://optout.aboutads.info/"
                className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
              >
                the Digital Advertising Alliance opt-out page
              </Link>
              , where available.
            </p>
          </section>

          <section aria-labelledby="third-party-services">
            <h2
              id="third-party-services"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Third-Party Services
            </h2>
            <p className="mt-4">
              The website may use third-party services for website functionality, infrastructure,
              advertising, security, forms, email delivery, or related operational purposes.
              Current project integrations include Google AdSense for advertising when enabled and
              Resend for contact-form email delivery when configured.
            </p>
            <p className="mt-4">
              These services may process information according to their own terms and privacy
              policies. We do not control every technical practice used by third-party providers.
            </p>
          </section>

          <section aria-labelledby="third-party-links">
            <h2
              id="third-party-links"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Third-Party Links
            </h2>
            <p className="mt-4">
              The website may link to external websites, platforms, stores, open-source resources,
              or social profiles. OpenStair does not control those websites and is not responsible
              for their privacy practices, content, or policies.
            </p>
          </section>

          <section aria-labelledby="data-retention">
            <h2 id="data-retention" className="text-2xl font-semibold text-[var(--color-ink)]">
              Data Retention
            </h2>
            <p className="mt-4">
              We retain information only for as long as reasonably necessary for the purposes
              described in this policy, including responding to inquiries, maintaining business
              records, operating the website, resolving issues, and meeting legal obligations,
              unless a longer period is required or permitted by law.
            </p>
          </section>

          <section aria-labelledby="data-security">
            <h2 id="data-security" className="text-2xl font-semibold text-[var(--color-ink)]">
              Data Security
            </h2>
            <p className="mt-4">
              We use reasonable technical and organizational measures intended to protect
              information handled through the website. No website, transmission method, or
              storage system can be guaranteed to be completely secure, so we cannot promise
              absolute security.
            </p>
          </section>

          <section aria-labelledby="choices-rights">
            <h2 id="choices-rights" className="text-2xl font-semibold text-[var(--color-ink)]">
              Your Choices and Rights
            </h2>
            <p className="mt-4">
              You may contact OpenStair about personal information you have voluntarily provided.
              You can also control cookies through your browser settings and manage advertising
              preferences through Google advertising settings or applicable industry opt-out
              tools.
            </p>
            <p className="mt-4">
              Depending on your jurisdiction, you may have privacy rights regarding access,
              correction, deletion, objection, restriction, or portability of certain personal
              information. To make a request, contact us using the email address listed below.
            </p>
          </section>

          <section aria-labelledby="children">
            <h2 id="children" className="text-2xl font-semibold text-[var(--color-ink)]">
              Children&apos;s Privacy
            </h2>
            <p className="mt-4">
              The OpenStair website is not intentionally directed toward children. If you believe a
              child has provided personal information through the website, please contact us so we
              can review the concern.
            </p>
          </section>

          <section aria-labelledby="international-visitors">
            <h2
              id="international-visitors"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              International Visitors
            </h2>
            <p className="mt-4">
              Visitors may access the website from different jurisdictions. Privacy rules and user
              rights may differ depending on location. By using the website, you understand that
              information may be processed in connection with website operation and service
              providers used by OpenStair.
            </p>
          </section>

          <section aria-labelledby="policy-changes">
            <h2 id="policy-changes" className="text-2xl font-semibold text-[var(--color-ink)]">
              Changes to This Privacy Policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. The latest version will be
              published on this page with an updated date.
            </p>
          </section>

          <section aria-labelledby="contact-us">
            <h2 id="contact-us" className="text-2xl font-semibold text-[var(--color-ink)]">
              Contact Us
            </h2>
            <p className="mt-4">
              For questions about this Privacy Policy or privacy-related requests, contact
              OpenStair Technologies at{" "}
              <Link
                href="mailto:hello@openstair.in"
                className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
              >
                hello@openstair.in
              </Link>
              .
            </p>
          </section>
        </article>
      </Section>
    </SiteShell>
  );
}
