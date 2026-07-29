import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BrandImage } from "@/components/ui/brand-image";
import { BannerAd, InArticleAd, adSlots, hasAdSlot } from "@/features/advertising/adsense";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog";
import { brandLogos, socialAssets } from "@/lib/brand-assets";
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
    image: socialAssets.pages.articles,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const contextualLinks = [
    ...post.internalLinks,
    { href: "/apps", label: "Applications" },
    { href: "/services", label: "Services" },
    { href: "/docs", label: "Documentation" },
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.href === link.href) === index,
  );
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
        url: `${siteUrl}${brandLogos.mark.src}`,
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
        <Section className="pt-16 pb-10 sm:pt-20 md:pt-24 md:pb-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <div>
              <Link
                href="/blog"
                className="reveal inline-flex text-sm font-semibold text-cyan-700 transition hover:text-[var(--color-ink)]"
              >
                Back to blog
              </Link>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="reveal mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
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
            </div>
            <BrandImage
              asset={post.heroAsset}
              caption={post.tags[0]}
              description="OpenStair engineering notes connect product decisions with maintainable systems."
              className="reveal reveal-delay-1"
              priority
            />
          </div>
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
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-[var(--color-ink)]">
                Continue with OpenStair
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contextualLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500/30 hover:text-cyan-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </Section>
      </article>

      <Section className="py-12 md:py-18">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="reveal text-3xl font-semibold leading-tight text-[var(--color-ink)]">
            Related articles
          </h2>
          <Link href="/docs" className="btn-secondary">
            Browse Documentation
          </Link>
        </div>
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
    </SiteShell>
  );
}
