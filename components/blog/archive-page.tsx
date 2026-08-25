import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/layout/site-shell";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogSearch } from "@/components/blog/blog-search";
import { CategoryNav } from "@/components/blog/category-nav";
import type { BlogCategory, BlogPostSummary, PaginatedPosts } from "@/lib/blog";

type BlogArchivePageProps = {
  title: string;
  description: string;
  categories: BlogCategory[];
  paginatedPosts: PaginatedPosts;
  searchPosts: BlogPostSummary[];
  activeCategorySlug?: string;
  getPageHref: (page: number) => string;
};

export function BlogArchivePage({
  title,
  description,
  categories,
  paginatedPosts,
  searchPosts,
  activeCategorySlug,
  getPageHref,
}: BlogArchivePageProps) {
  return (
    <SiteShell>
      <Section className="pt-16 pb-10 sm:pt-20 md:pt-24 md:pb-12">
        <p className="reveal inline-flex rounded-full border border-cyan-500/25 bg-cyan-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Blog
        </p>
        <h1 className="reveal mt-7 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="reveal reveal-delay-1 mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          {description}
        </p>
        <BlogSearch posts={searchPosts} />
        <CategoryNav categories={categories} activeCategorySlug={activeCategorySlug} />
      </Section>

      <Section className="py-8 md:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Latest Articles</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-ink)]">
              {activeCategorySlug ? "Category archive" : "All articles"}
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Page {paginatedPosts.currentPage} of {paginatedPosts.totalPages}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {paginatedPosts.posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <BlogPagination
          currentPage={paginatedPosts.currentPage}
          totalPages={paginatedPosts.totalPages}
          getPageHref={getPageHref}
        />
      </Section>
    </SiteShell>
  );
}
