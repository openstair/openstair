"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";

type BlogSearchProps = {
  posts: BlogPostSummary[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return posts
      .filter((post) => post.searchText?.includes(normalizedQuery))
      .slice(0, 8);
  }, [normalizedQuery, posts]);

  return (
    <div className="reveal reveal-delay-1 mt-8 max-w-3xl">
      <label className="sr-only" htmlFor="blog-search">
        Search articles
      </label>
      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search articles..."
        className="w-full rounded-full border border-slate-200 bg-white px-5 py-4 text-base text-[var(--color-ink)] shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition placeholder:text-slate-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-200"
      />
      {normalizedQuery ? (
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
          {results.length > 0 ? (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block border-b border-slate-100 px-5 py-4 last:border-b-0 hover:bg-slate-50"
              >
                <span className="text-sm font-semibold text-[var(--color-ink)]">
                  {post.title}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {post.category.name} · {post.readTime}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-5 py-4 text-sm text-slate-500">No matching articles found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
