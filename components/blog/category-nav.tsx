import Link from "next/link";
import type { BlogCategory } from "@/lib/blog";

type CategoryNavProps = {
  categories: BlogCategory[];
  activeCategorySlug?: string;
};

export function CategoryNav({ categories, activeCategorySlug }: CategoryNavProps) {
  return (
    <nav aria-label="Blog categories" className="mt-8 flex flex-wrap gap-3">
      <Link
        href="/blog"
        aria-current={activeCategorySlug ? undefined : "page"}
        className={categoryClassName(!activeCategorySlug)}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/${category.slug}`}
          aria-current={activeCategorySlug === category.slug ? "page" : undefined}
          className={categoryClassName(activeCategorySlug === category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

function categoryClassName(isActive: boolean) {
  return [
    "rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-cyan-500/30 hover:text-cyan-700",
    isActive
      ? "border-cyan-500/30 bg-cyan-50 text-cyan-800"
      : "border-slate-200 bg-white text-slate-700",
  ].join(" ");
}
