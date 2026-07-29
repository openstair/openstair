import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaPanel } from "@/components/ui/cta-panel";
import { BannerAd, InArticleAd, adSlots, hasAdSlot } from "@/features/advertising/adsense";
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
            className="reveal inline-flex text-sm font-semibold text-cyan-700 transition hover:text-[var(--color-ink)]"
          >
            Back to blog
          </Link>
          <h1 className="reveal mt-7 max-w-4xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            {post.description}
          </p>
          <p className="reveal reveal-delay-2 mt-5 text-sm text-slate-500">
            {new Date(post.date).toLocaleDateString("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.readTime}
          </p>
        </Section>

        {hasAdSlot(adSlots.blogBanner) ? (
          <Section className="py-6">
            <BannerAd
              slotId={adSlots.blogBanner}
              className="mx-auto min-h-24 max-w-4xl rounded-3xl border border-slate-200 bg-white p-4"
            />
          </Section>
        ) : null}

        <Section className="mx-auto max-w-3xl py-12 md:py-18">
          <div className="surface-card reveal rounded-3xl p-7 md:p-10">
            {post.sections.map((section, index) => (
              <section key={section.heading} className="mb-10 last:mb-0">
                <h2 className="text-2xl font-semibold text-[var(--color-ink)]">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {section.body}
                </p>
                {index === 0 && hasAdSlot(adSlots.blogInArticle) ? (
                  <InArticleAd
                    slotId={adSlots.blogInArticle}
                    className="my-8 min-h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  />
                ) : null}
              </section>
            ))}
          </div>
        </Section>
      </article>

      <Section className="py-12 md:py-18">
        <h2 className="reveal text-3xl font-semibold leading-tight text-[var(--color-ink)]">
          Related articles
        </h2>
        <Link href="/docs" className="btn-secondary mt-5">
          Browse Documentation
        </Link>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="reveal rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-500/30"
            >
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">{related.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {related.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaPanel variant="blog" />
    </SiteShell>
  );
}
