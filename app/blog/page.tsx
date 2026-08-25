import { notFound } from "next/navigation";
import { BlogArchivePage } from "@/components/blog/archive-page";
import {
  getAllCategories,
  getAllPostSummaries,
  getPaginatedPosts,
} from "@/lib/blog";
import { socialAssets } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Software Development Blog",
  description:
    "Practical articles about software, technology, and engineering from OpenStair Technologies.",
  path: "/blog",
  keywords: [
    "software development blog",
    "Flutter development blog",
    "backend development",
    "software architecture",
  ],
  image: socialAssets.pages.blog,
});

export default function BlogPage() {
  const posts = getAllPostSummaries();
  const paginatedPosts = getPaginatedPosts(posts, 1);

  if (!paginatedPosts) {
    notFound();
  }

  return (
    <BlogArchivePage
      title="Practical articles about software, technology, and engineering."
      description="OpenStair engineering writing on Flutter, backend systems, documentation, product architecture, open source, and production software delivery."
      categories={getAllCategories()}
      paginatedPosts={paginatedPosts}
      searchPosts={getAllPostSummaries({ includeSearchText: true })}
      getPageHref={(page) => (page === 1 ? "/blog" : `/blog/page/${page}`)}
    />
  );
}
