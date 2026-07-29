import type { MetadataRoute } from "next";
import { getKnowledgeService } from "@/features/knowledge/application/knowledge-service";
import { blogPosts } from "@/lib/blog";
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
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const docsEntries: MetadataRoute.Sitemap = (
    await getKnowledgeService().listPublicDocuments()
  ).map((document) => ({
    url: `${siteUrl}${document.slug ? `/docs/${document.slug}` : "/docs"}`,
    lastModified: new Date(document.metadata.updatedAt),
    changeFrequency: "monthly" as const,
    priority: document.slug === "" ? 0.8 : 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...docsEntries];
}
