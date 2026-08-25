import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArchivePage } from "@/components/blog/archive-page";
import {
  getAllCategories,
  getAllPostSummaries,
  getPaginatedPosts,
} from "@/lib/blog";
import { socialAssets } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";

type BlogPageNumberProps = {
  params: Promise<{
    page: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const paginatedPosts = getPaginatedPosts(getAllPostSummaries(), 1);

  if (!paginatedPosts || paginatedPosts.totalPages <= 1) {
    return [];
  }

  return Array.from({ length: paginatedPosts.totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: BlogPageNumberProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  const paginatedPosts = getPaginatedPosts(getAllPostSummaries(), pageNumber);

  if (!paginatedPosts || pageNumber === 1) {
    return {};
  }

  return createSeoMetadata({
    title: `Software Development Blog - Page ${pageNumber}`,
    description:
      "Browse OpenStair Technologies software engineering articles by publication date.",
    path: `/blog/page/${pageNumber}`,
    keywords: ["software development blog", "software engineering articles"],
    image: socialAssets.pages.blog,
  });
}

export default async function BlogPageNumber({ params }: BlogPageNumberProps) {
  const { page } = await params;
  const pageNumber = Number(page);
  const posts = getAllPostSummaries();
  const paginatedPosts = getPaginatedPosts(posts, pageNumber);

  if (!paginatedPosts || pageNumber === 1) {
    notFound();
  }

  return (
    <BlogArchivePage
      title="Practical articles about software, technology, and engineering."
      description="OpenStair engineering writing on Flutter, backend systems, documentation, product architecture, open source, and production software delivery."
      categories={getAllCategories()}
      paginatedPosts={paginatedPosts}
      searchPosts={getAllPostSummaries({ includeSearchText: true })}
      getPageHref={(nextPage) =>
        nextPage === 1 ? "/blog" : `/blog/page/${nextPage}`
      }
    />
  );
}
