import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Terms of Service",
  description:
    "Terms governing access to and use of the OpenStair Technologies website, content, and services.",
  path: "/terms",
});

const lastUpdated = "August 2, 2026";

export default function TermsPage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-10 sm:pt-22 md:pt-28 md:pb-12">
        <div className="max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Last updated: {lastUpdated}
          </p>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            These Terms of Service govern access to and use of the OpenStair Technologies website.
            Please read them carefully before using the website, reading our content, submitting a
            contact request, or interacting with website features.
          </p>
        </div>
      </Section>

      <Section className="pb-8 md:pb-12">
        <article className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-[var(--color-muted)]">
          <section aria-labelledby="acceptance">
            <h2 id="acceptance" className="text-2xl font-semibold text-[var(--color-ink)]">
              Acceptance of Terms
            </h2>
            <p className="mt-4">
              By accessing or using the website, you agree to these terms, subject to applicable
              law. If you do not agree, you should not use the website.
            </p>
          </section>

          <section aria-labelledby="about-openstair">
            <h2
              id="about-openstair"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              About OpenStair
            </h2>
            <p className="mt-4">
              OpenStair Technologies is a software company based in India. The website provides
              information about OpenStair, its software development services, applications,
              documentation, open-source activity, and engineering articles.
            </p>
          </section>

          <section aria-labelledby="website-content">
            <h2
              id="website-content"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Website and Content
            </h2>
            <p className="mt-4">
              The website may include technology articles, educational material, engineering
              content, software-related information, documentation, service descriptions,
              application information, and other published material. Content is provided for
              general informational purposes and may change over time.
            </p>
          </section>

          <section aria-labelledby="permitted-use">
            <h2 id="permitted-use" className="text-2xl font-semibold text-[var(--color-ink)]">
              Permitted Use
            </h2>
            <p className="mt-4">
              You may access and use the website for lawful purposes. You must not misuse the
              website, interfere with its operation, attempt unauthorized access, introduce
              malicious code, scrape or overload systems in a harmful way, infringe rights, or use
              the website for unlawful, deceptive, or abusive activity.
            </p>
          </section>

          <section aria-labelledby="intellectual-property">
            <h2
              id="intellectual-property"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Intellectual Property
            </h2>
            <p className="mt-4">
              OpenStair-owned names, branding, text, designs, page layouts, and original website
              content are protected by applicable intellectual property laws. Some content,
              images, code examples, libraries, trademarks, open-source materials, platform
              badges, or referenced resources may belong to third parties or be distributed under
              separate licenses.
            </p>
            <p className="mt-4">
              Nothing in these terms transfers ownership of OpenStair property or third-party
              property to you. You are responsible for reviewing and complying with any applicable
              third-party or open-source license terms before using external materials.
            </p>
          </section>

          <section aria-labelledby="blog-educational-content">
            <h2
              id="blog-educational-content"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Blog and Educational Content
            </h2>
            <p className="mt-4">
              Articles and educational content are provided to share general engineering and
              software development information. They are not customized advice for your particular
              product, business, infrastructure, security posture, or legal situation.
            </p>
          </section>

          <section aria-labelledby="software-code">
            <h2 id="software-code" className="text-2xl font-semibold text-[var(--color-ink)]">
              Software, Code Examples, and Technical Information
            </h2>
            <p className="mt-4">
              Code examples, architecture notes, and technical information are provided for
              educational and informational purposes. You are responsible for evaluating, testing,
              securing, and adapting any code or technical approach before using it in production.
              Technologies, APIs, frameworks, and best practices may change, and older content may
              become outdated.
            </p>
          </section>

          <section aria-labelledby="no-professional-advice">
            <h2
              id="no-professional-advice"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              No Professional Advice
            </h2>
            <p className="mt-4">
              Website content is not a substitute for professional advice where professional
              advice is required. You should consult qualified professionals for legal, financial,
              security, compliance, or other specialized decisions.
            </p>
          </section>

          <section aria-labelledby="third-party-links">
            <h2
              id="third-party-links"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Third-Party Links and Services
            </h2>
            <p className="mt-4">
              The website may link to or reference third-party websites, services, platforms,
              libraries, stores, social profiles, or open-source projects. OpenStair is not
              responsible for their availability, content, policies, practices, or terms.
            </p>
          </section>

          <section aria-labelledby="user-submissions">
            <h2
              id="user-submissions"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              User Submissions and Contact Information
            </h2>
            <p className="mt-4">
              If you submit information through a contact form or inquiry, you are responsible for
              ensuring that the information is accurate and that you have the right to share it.
              OpenStair may use submitted information to review and respond to your request,
              provide requested information, manage communications, and operate related business
              processes.
            </p>
            <p className="mt-4">
              Do not submit confidential, sensitive, or proprietary information unless you are
              comfortable sharing it for the purpose of the inquiry. Submission of information
              through the website does not create a client relationship, partnership, employment
              relationship, or obligation to provide services.
            </p>
          </section>

          <section aria-labelledby="availability">
            <h2 id="availability" className="text-2xl font-semibold text-[var(--color-ink)]">
              Website Availability
            </h2>
            <p className="mt-4">
              We aim to keep the website useful and available, but we do not guarantee that it
              will be uninterrupted, error-free, secure, or permanently available. Access may be
              affected by maintenance, updates, outages, third-party providers, network issues, or
              events outside our control.
            </p>
          </section>

          <section aria-labelledby="changes-content-services">
            <h2
              id="changes-content-services"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Changes to Content and Services
            </h2>
            <p className="mt-4">
              OpenStair may modify, update, suspend, remove, or discontinue website content,
              features, links, service descriptions, documentation, or other materials at any
              time.
            </p>
          </section>

          <section aria-labelledby="warranties">
            <h2 id="warranties" className="text-2xl font-semibold text-[var(--color-ink)]">
              Disclaimer of Warranties
            </h2>
            <p className="mt-4">
              The website and its content are provided on an as-is and as-available basis. To the
              extent permitted by applicable law, OpenStair disclaims warranties that the website
              will meet your requirements, remain current, be free of errors, or produce any
              particular business, technical, or operational outcome.
            </p>
          </section>

          <section aria-labelledby="liability">
            <h2 id="liability" className="text-2xl font-semibold text-[var(--color-ink)]">
              Limitation of Liability
            </h2>
            <p className="mt-4">
              To the extent permitted by applicable law, OpenStair will not be liable for indirect,
              incidental, consequential, special, punitive, or similar damages arising from your
              use of or inability to use the website, reliance on website content, third-party
              links, or technical information published on the website. This limitation does not
              exclude liability that cannot be excluded under applicable law.
            </p>
          </section>

          <section aria-labelledby="indemnification">
            <h2
              id="indemnification"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Indemnification
            </h2>
            <p className="mt-4">
              You agree to take responsibility for claims, losses, liabilities, damages, costs, or
              expenses arising from your misuse of the website, violation of these terms, unlawful
              activity, or infringement of another party&apos;s rights, to the extent permitted by
              applicable law.
            </p>
          </section>

          <section aria-labelledby="governing-law">
            <h2
              id="governing-law"
              className="text-2xl font-semibold text-[var(--color-ink)]"
            >
              Governing Law and Jurisdiction
            </h2>
            <p className="mt-4">
              These terms are governed by the laws of India, except where applicable law requires
              otherwise. Disputes relating to the website will be handled by courts or authorities
              with appropriate jurisdiction under applicable law.
            </p>
          </section>

          <section aria-labelledby="terms-changes">
            <h2 id="terms-changes" className="text-2xl font-semibold text-[var(--color-ink)]">
              Changes to These Terms
            </h2>
            <p className="mt-4">
              We may update these Terms of Service from time to time. The latest version will be
              published on this page with an updated date. Continued use of the website after
              updates means you accept the revised terms where legally applicable.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-2xl font-semibold text-[var(--color-ink)]">
              Contact
            </h2>
            <p className="mt-4">
              For questions about these terms, contact OpenStair Technologies at{" "}
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
