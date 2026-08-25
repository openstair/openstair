import { getAllPosts } from "@/lib/blog";
import { companyName, siteUrl } from "@/lib/seo";

export function GET() {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const items = posts
    .map(
      (post) => `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${siteUrl}/blog/${post.slug}</link>
  <guid>${siteUrl}/blog/${post.slug}</guid>
  <description>${escapeXml(post.description)}</description>
  <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
  <category>${escapeXml(post.category.name)}</category>
</item>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(companyName)} Blog</title>
  <link>${siteUrl}/blog</link>
  <description>Practical software engineering articles from OpenStair Technologies.</description>
  <lastBuildDate>${new Date(
    `${latestPost?.updated ?? latestPost?.date ?? "2026-01-01"}T00:00:00.000Z`,
  ).toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    },
  );
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
