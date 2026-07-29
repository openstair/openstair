import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogPosts } from "@/lib/blog";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Software Development Blog",
  description:
    "Read OpenStair Technologies articles on Flutter development, API integration, Spring Boot authentication, backend systems, and modern software engineering.",
  path: "/blog",
  keywords: [
    "software development blog",
    "Flutter development blog",
    "backend development",
    "Spring Boot authentication",
  ],
});

export default function BlogPage() {
  return (
    <SiteShell>
      <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
        <p className="reveal inline-flex rounded-full border border-cyan-500/25 bg-cyan-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Blog
        </p>
        <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
          Practical notes on Flutter, APIs, backend systems, and software delivery.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          Static articles from OpenStair Technologies for teams planning mobile apps, web applications, and scalable backend systems.
        </p>
      </Section>

      <Section className="py-12 md:py-18">
        <SectionHeading
          eyebrow="Articles"
          title="Software development insights"
          description="Read practical articles, then explore OpenStair documentation for broader service and engineering knowledge."
        />
        <Link href="/docs" className="btn-secondary mt-6">
          Browse Documentation
        </Link>
        <div className="mt-10 grid gap-5">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="reveal rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-cyan-500/30 md:p-7"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
                <Link href={`/blog/${post.slug}`} className="hover:text-cyan-700">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                {new Date(post.date).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {post.readTime}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex text-sm font-semibold text-cyan-700 transition hover:text-[var(--color-ink)]"
              >
                Read article
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
