import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/services",
  "/flutter-development",
  "/android-development",
  "/web-development",
  "/backend-development",
  "/open-source",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...staticEntries, ...blogEntries];
}
