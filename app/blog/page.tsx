import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BrandImage } from "@/components/ui/brand-image";
import { blogPosts, getBlogTopics } from "@/lib/blog";
import { socialAssets } from "@/lib/brand-assets";
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
  image: socialAssets.pages.blog,
});

type BlogPageProps = {
  searchParams?: Promise<{
    topic?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedTopic = params?.topic;
  const [featuredArticle, ...latestArticles] = [...blogPosts].sort((left, right) =>
    right.date.localeCompare(left.date),
  );
  const topics = getBlogTopics();
  const visibleArticles = selectedTopic
    ? latestArticles.filter((post) => post.tags.includes(selectedTopic))
    : latestArticles;

  return (
    <SiteShell>
      <Section className="pt-16 pb-10 sm:pt-20 md:pt-24 md:pb-12">
        <p className="reveal inline-flex rounded-full border border-cyan-500/25 bg-cyan-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Blog
        </p>
        <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
          Engineering notes for teams building dependable software.
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          Practical writing on Flutter, backend architecture, documentation, open source, and the decisions that make products easier to maintain after launch.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className="btn-primary">
            Explore Services
          </Link>
          <Link href="/docs" className="btn-secondary">
            Browse Documentation
          </Link>
          <Link href="/apps" className="btn-secondary">
            View Applications
          </Link>
        </div>
      </Section>

      <Section className="py-8 md:py-10">
        <p className="eyebrow">Featured Article</p>
        <article className="mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <BrandImage
            asset={featuredArticle.heroAsset}
            caption={featuredArticle.tags[0]}
            aspect="wide"
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
          <div>
            <div className="flex flex-wrap gap-2">
              {featuredArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-[var(--color-ink)]">
              <Link href={`/blog/${featuredArticle.slug}`} className="hover:text-cyan-700">
                {featuredArticle.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {new Date(featuredArticle.date).toLocaleDateString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {featuredArticle.readTime}
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              {featuredArticle.description}
            </p>
            <Link href={`/blog/${featuredArticle.slug}`} className="btn-primary mt-6">
              Read Featured Article
            </Link>
          </div>
        </article>
      </Section>

      <Section className="py-8 md:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Latest Articles</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-ink)]">
              Practical engineering topics
            </h2>
          </div>
          <Link href="/open-source" className="btn-secondary">
            Open Source
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleArticles.map((post) => (
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

      <Section className="py-8 md:py-10">
        <p className="eyebrow">Browse by Topic</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {topics.map((topic) => (
            <Link
              key={topic}
              href={`/blog?topic=${encodeURIComponent(topic)}`}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-cyan-500/30 hover:text-cyan-700",
                selectedTopic === topic
                  ? "border-cyan-500/30 bg-cyan-50 text-cyan-800"
                  : "border-slate-200 bg-white text-slate-700",
              ].join(" ")}
            >
              {topic}
            </Link>
          ))}
          {selectedTopic ? (
            <Link
              href="/blog"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500/30 hover:text-cyan-700"
            >
              All Articles
            </Link>
          ) : null}
        </div>
      </Section>
    </SiteShell>
  );
}
