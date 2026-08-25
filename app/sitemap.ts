import type { MetadataRoute } from "next";
import { getKnowledgeService } from "@/features/knowledge/application/knowledge-service";
import {
  getAllCategories,
  getAllPosts,
  getPaginatedPosts,
  getPostsByCategory,
} from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/services",
  "/apps",
  "/flutter-development",
  "/android-development",
  "/web-development",
  "/backend-development",
  "/open-source",
  "/blog",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-05-08");
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.8,
  }));
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const rootPagination = getPaginatedPosts(posts, 1);
  const blogPaginationEntries: MetadataRoute.Sitemap =
    rootPagination && rootPagination.totalPages > 1
      ? Array.from({ length: rootPagination.totalPages - 1 }, (_, index) => ({
          url: `${siteUrl}/blog/page/${index + 2}`,
          lastModified,
          changeFrequency: "weekly" as const,
          priority: 0.5,
        }))
      : [];
  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().flatMap((category) => {
    const paginatedCategory = getPaginatedPosts(getPostsByCategory(category.slug), 1);
    const archiveEntries: MetadataRoute.Sitemap = [
      {
        url: `${siteUrl}/blog/${category.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      },
    ];
    const paginationEntries: MetadataRoute.Sitemap =
      paginatedCategory && paginatedCategory.totalPages > 1
        ? Array.from({ length: paginatedCategory.totalPages - 1 }, (_, index) => ({
            url: `${siteUrl}/blog/${category.slug}/page/${index + 2}`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.4,
          }))
        : [];

    return [...archiveEntries, ...paginationEntries];
  });
  const docsEntries: MetadataRoute.Sitemap = (
    await getKnowledgeService().listPublicDocuments()
  ).map((document) => ({
    url: `${siteUrl}${document.slug ? `/docs/${document.slug}` : "/docs"}`,
    lastModified: new Date(document.metadata.updatedAt),
    changeFrequency: "monthly" as const,
    priority: document.slug === "" ? 0.8 : 0.6,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...blogPaginationEntries,
    ...categoryEntries,
    ...docsEntries,
  ];
}
