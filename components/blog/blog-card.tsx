import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPostSummary;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="reveal overflow-hidden rounded-lg border border-slate-200 bg-white transition duration-300 hover:border-cyan-500/30 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      {post.image ? (
        <Link href={`/blog/${post.slug}`} className="block bg-slate-50">
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            width={1200}
            height={900}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[16/9] w-full object-contain p-5"
          />
        </Link>
      ) : null}
      <div className="p-6">
        <Link
          href={`/blog/${post.category.slug}`}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700"
        >
          {post.category.name}
        </Link>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-[var(--color-ink)]">
          <Link href={`/blog/${post.slug}`} className="hover:text-cyan-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          {formatDisplayDate(post.date)} · {post.readTime}
        </p>
        <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
          {post.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
