import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BlogArchivePage } from "@/components/blog/archive-page";
import { BlogCard, formatDisplayDate } from "@/components/blog/blog-card";
import { blogMdxComponents } from "@/components/blog/mdx-components";
import {
  BannerAd,
  InArticleAd,
  adSlots,
  hasAdSlot,
} from "@/features/advertising/adsense";
import {
  getAdjacentPosts,
  getAllCategories,
  getAllPostSummaries,
  getAllPosts,
  getArticleJsonLd,
  getBlogPost,
  getCategoryBySlug,
  getPaginatedPosts,
  getPostsByCategory,
  getRelatedPosts,
} from "@/lib/blog";
import { socialAssets } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";

type BlogSegmentsPageProps = {
  params: Promise<{
    segments: string[];
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const articleParams = getAllPosts().map((post) => ({
    segments: [post.slug],
  }));
  const categoryParams = getAllCategories().flatMap((category) => {
    const paginatedPosts = getPaginatedPosts(getPostsByCategory(category.slug), 1);
    const categoryRoot = { segments: [category.slug] };
    const pageParams =
      paginatedPosts && paginatedPosts.totalPages > 1
        ? Array.from({ length: paginatedPosts.totalPages - 1 }, (_, index) => ({
            segments: [category.slug, "page", String(index + 2)],
          }))
        : [];

    return [categoryRoot, ...pageParams];
  });

  return [...articleParams, ...categoryParams];
}

export async function generateMetadata({
  params,
}: BlogSegmentsPageProps): Promise<Metadata> {
  const { segments } = await params;

  if (segments.length === 1) {
    const [slug] = segments;
    const post = getBlogPost(slug);

    if (post) {
      return createSeoMetadata({
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        keywords: [post.category.name, ...post.tags],
        image: post.image ?? socialAssets.pages.articles,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.updated ?? post.date,
        authors: [post.author],
      });
    }

    const category = getCategoryBySlug(slug);

    if (category) {
      return createSeoMetadata({
        title: `${category.name} Articles`,
        description: category.description,
        path: `/blog/${category.slug}`,
        keywords: [category.name, "software engineering articles"],
        image: socialAssets.pages.blog,
      });
    }
  }

  if (segments.length === 3 && segments[1] === "page") {
    const [categorySlug, , page] = segments;
    const category = getCategoryBySlug(categorySlug);
    const pageNumber = Number(page);
    const paginatedPosts = category
      ? getPaginatedPosts(getPostsByCategory(category.slug), pageNumber)
      : undefined;

    if (category && paginatedPosts && pageNumber > 1) {
      return createSeoMetadata({
        title: `${category.name} Articles - Page ${pageNumber}`,
        description: category.description,
        path: `/blog/${category.slug}/page/${pageNumber}`,
        keywords: [category.name, "software engineering articles"],
        image: socialAssets.pages.blog,
      });
    }
  }

  return {};
}

export default async function BlogSegmentsPage({ params }: BlogSegmentsPageProps) {
  const { segments } = await params;

  if (segments.length === 1) {
    const [slug] = segments;
    const post = getBlogPost(slug);

    if (post) {
      return <ArticlePage slug={slug} />;
    }

    return <CategoryArchivePage categorySlug={slug} page={1} />;
  }

  if (segments.length === 3 && segments[1] === "page") {
    return (
      <CategoryArchivePage categorySlug={segments[0]} page={Number(segments[2])} />
    );
  }

  notFound();
}

function CategoryArchivePage({
  categorySlug,
  page,
}: {
  categorySlug: string;
  page: number;
}) {
  const category = getCategoryBySlug(categorySlug);

  if (!category || !Number.isInteger(page)) {
    notFound();
  }

  const posts = getPostsByCategory(category.slug);
  const paginatedPosts = getPaginatedPosts(posts, page);

  if (!paginatedPosts) {
    notFound();
  }

  return (
    <BlogArchivePage
      title={category.name}
      description={category.description}
      categories={getAllCategories()}
      paginatedPosts={paginatedPosts}
      searchPosts={getAllPostSummaries({ includeSearchText: true })}
      activeCategorySlug={category.slug}
      getPageHref={(nextPage) =>
        nextPage === 1
          ? `/blog/${category.slug}`
          : `/blog/${category.slug}/page/${nextPage}`
      }
    />
  );
}

function ArticlePage({ slug }: { slug: string }) {
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const adjacentPosts = getAdjacentPosts(post);
  const contextualLinks = [
    ...post.internalLinks,
    { href: "/blog", label: "Blog" },
    { href: `/blog/${post.category.slug}`, label: `${post.category.name} Articles` },
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.href === link.href) === index,
  );
  const articleJsonLd = getArticleJsonLd(post);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article>
        <Section className="pt-14 pb-8 sm:pt-18 md:pt-22">
          <nav
            aria-label="Breadcrumb"
            className="reveal flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500"
          >
            <Link href="/" className="hover:text-cyan-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-cyan-700">
              Blog
            </Link>
            <span>/</span>
            <Link href={`/blog/${post.category.slug}`} className="hover:text-cyan-700">
              {post.category.name}
            </Link>
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.74fr] lg:items-center">
            <div>
              <h1 className="reveal mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
                {post.title}
              </h1>
              <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                {post.description}
              </p>
              <div className="reveal reveal-delay-2 mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm text-slate-500">
                <span>{formatDisplayDate(post.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
                {post.updated ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Updated {formatDisplayDate(post.updated)}</span>
                  </>
                ) : null}
              </div>
            </div>
            {post.image ? (
              <Image
                src={post.image}
                alt={post.imageAlt ?? ""}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 38vw, 100vw"
                priority
                className="reveal reveal-delay-1 aspect-[4/3] w-full rounded-lg border border-slate-200 bg-white object-contain p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              />
            ) : null}
          </div>
        </Section>

        {hasAdSlot(adSlots.blogBanner) ? (
          <Section className="py-6">
            <BannerAd
              slotId={adSlots.blogBanner}
              className="mx-auto min-h-24 max-w-4xl rounded-lg border border-slate-200 bg-white p-4"
            />
          </Section>
        ) : null}

        <Section className="mx-auto max-w-3xl py-10 md:py-14">
          <div className="reveal rounded-lg border border-slate-200 bg-white p-7 shadow-[0_18px_54px_rgba(15,23,42,0.06)] md:p-10">
            <div className="blog-prose">
              <MDXRemote source={post.content} components={blogMdxComponents} />
            </div>
            {hasAdSlot(adSlots.blogInArticle) ? (
              <InArticleAd
                slotId={adSlots.blogInArticle}
                className="my-10 min-h-32 rounded-lg border border-slate-200 bg-slate-50 p-4"
              />
            ) : null}
            <footer className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-8 text-2xl font-semibold text-[var(--color-ink)]">
                Continue with OpenStair
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contextualLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500/30 hover:text-cyan-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </footer>
          </div>
        </Section>
      </article>

      <Section className="py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {adjacentPosts.previous ? (
            <Link
              href={`/blog/${adjacentPosts.previous.slug}`}
              className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-cyan-500/30"
            >
              <span className="text-sm font-semibold text-slate-500">Previous Article</span>
              <span className="mt-2 block text-lg font-semibold text-[var(--color-ink)]">
                {adjacentPosts.previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {adjacentPosts.next ? (
            <Link
              href={`/blog/${adjacentPosts.next.slug}`}
              className="rounded-lg border border-slate-200 bg-white p-5 text-right transition hover:border-cyan-500/30"
            >
              <span className="text-sm font-semibold text-slate-500">Next Article</span>
              <span className="mt-2 block text-lg font-semibold text-[var(--color-ink)]">
                {adjacentPosts.next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </Section>

      {relatedPosts.length > 0 ? (
        <Section className="py-10 md:py-14">
          <h2 className="reveal text-3xl font-semibold leading-tight text-[var(--color-ink)]">
            Related articles
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </Section>
      ) : null}
    </SiteShell>
  );
}
