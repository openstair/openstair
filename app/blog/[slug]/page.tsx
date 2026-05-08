import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaPanel } from "@/components/ui/cta-panel";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { createSeoMetadata, siteUrl } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return createSeoMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "OpenStair Technologies",
    },
    publisher: {
      "@type": "Organization",
      name: "OpenStair Technologies",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article>
        <Section className="pt-18 pb-12 sm:pt-22 md:pt-28 md:pb-16">
          <Link
            href="/blog"
            className="reveal inline-flex text-sm font-semibold text-[var(--color-accent)] transition hover:text-white"
          >
            Back to blog
          </Link>
          <h1 className="reveal mt-7 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {post.description}
          </p>
          <p className="reveal reveal-delay-2 mt-5 text-sm text-slate-400">
            {new Date(post.date).toLocaleDateString("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.readTime}
          </p>
        </Section>

        <Section className="mx-auto max-w-3xl py-12 md:py-18">
          <div className="reveal rounded-3xl border border-white/10 bg-[var(--color-card)] p-7 md:p-10">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-10 last:mb-0">
                <h2 className="text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </Section>
      </article>

      <Section className="py-12 md:py-18">
        <h2 className="reveal text-3xl font-semibold leading-tight text-white">
          Related articles
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/30"
            >
              <h3 className="text-lg font-semibold text-white">{related.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {related.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaPanel
        title="Planning a product like this?"
        description="OpenStair Technologies can help with Flutter development, API integration, Spring Boot backend systems, and full stack product delivery."
      />
    </SiteShell>
  );
}
