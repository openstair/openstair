import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { brandLogos } from "@/lib/brand-assets";
import { companyName, siteUrl } from "@/lib/seo";

export const BLOG_POSTS_PER_PAGE = 6;

const blogContentDirectory = path.join(process.cwd(), "content", "blog");
const reservedBlogSegments = new Set(["page", "rss.xml"]);

type FrontmatterLink = {
  href: string;
  label: string;
};

type BlogFrontmatter = {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  category: string;
  tags?: string[];
  author: string;
  image?: string;
  imageAlt?: string;
  internalLinks?: FrontmatterLink[];
};

export type BlogCategory = {
  name: string;
  slug: string;
  description: string;
  count: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  image?: string;
  imageAlt?: string;
  internalLinks: FrontmatterLink[];
  content: string;
  excerpt: string;
  readTime: string;
  sourcePath: string;
  searchText: string;
};

export type BlogPostSummary = Omit<
  BlogPost,
  "content" | "sourcePath" | "searchText"
> & {
  searchText?: string;
};

export type PaginatedPosts = {
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  previousPage: number | undefined;
  nextPage: number | undefined;
};

export type AdjacentBlogPosts = {
  previous: BlogPostSummary | undefined;
  next: BlogPostSummary | undefined;
};

type ParsedBlogPost = Omit<BlogPost, "category"> & {
  categoryName: string;
};

export const getAllPosts = cache((): BlogPost[] => {
  const files = listBlogContentFiles();
  const parsedPosts = files.map(parseBlogFile);
  const duplicateSlugDiagnostics = findDuplicateValues(
    parsedPosts.map((post) => ({
      value: post.slug,
      sourcePath: post.sourcePath,
      label: "slug",
    })),
  );

  if (duplicateSlugDiagnostics.length > 0) {
    throw new Error(formatBlogValidationError(duplicateSlugDiagnostics));
  }

  const categoryCounts = countCategories(parsedPosts);
  const categories = new Map(
    [...categoryCounts.entries()].map(([name, count]) => [
      name,
      {
        name,
        slug: slugifyCategory(name),
        description: getCategoryDescription(name),
        count,
      },
    ]),
  );
  const categorySlugDiagnostics = findDuplicateValues(
    [...categories.values()].map((category) => ({
      value: category.slug,
      sourcePath: `category:${category.name}`,
      label: "category slug",
    })),
  );
  const routeConflictDiagnostics = parsedPosts
    .filter((post) => reservedBlogSegments.has(post.slug))
    .map(
      (post) =>
        `${post.sourcePath}\nInvalid slug: "${post.slug}" is reserved by the Blog router`,
    );
  const categoryRouteConflictDiagnostics = [...categories.values()]
    .filter((category) => reservedBlogSegments.has(category.slug))
    .map(
      (category) =>
        `category:${category.name}\nInvalid category: "${category.name}" resolves to reserved route segment "${category.slug}"`,
    );
  const articleCategoryConflictDiagnostics = parsedPosts.flatMap((post) => {
    const category = categories.get(post.categoryName);

    if (!category || category.slug !== post.slug) {
      return [];
    }

    return [
      `${post.sourcePath}\nRoute conflict: article slug "${post.slug}" conflicts with category route /blog/${category.slug}`,
    ];
  });

  const diagnostics = [
    ...categorySlugDiagnostics,
    ...routeConflictDiagnostics,
    ...categoryRouteConflictDiagnostics,
    ...articleCategoryConflictDiagnostics,
  ];

  if (diagnostics.length > 0) {
    throw new Error(formatBlogValidationError(diagnostics));
  }

  return parsedPosts
    .map<BlogPost>((post) => {
      const category = categories.get(post.categoryName);

      if (!category) {
        throw new Error(
          formatBlogValidationError([
            `${post.sourcePath}\nInvalid category: "${post.categoryName}"`,
          ]),
        );
      }

      return {
        ...post,
        category,
      };
    })
    .sort(comparePostsNewestFirst);
});

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllPostSummaries({
  includeSearchText = false,
} = {}): BlogPostSummary[] {
  return getAllPosts().map((post) => toPostSummary(post, includeSearchText));
}

export function getAllCategories(): BlogCategory[] {
  return [
    ...new Map(
      getAllPosts().map((post) => [post.category.slug, post.category]),
    ).values(),
  ].sort((left, right) => left.name.localeCompare(right.name));
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return getAllCategories().find((category) => category.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPostSummary[] {
  return getAllPosts()
    .filter((post) => post.category.slug === categorySlug)
    .map((post) => toPostSummary(post));
}

export function getPaginatedPosts(
  posts: BlogPostSummary[],
  page: number,
  pageSize = BLOG_POSTS_PER_PAGE,
): PaginatedPosts | undefined {
  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / pageSize));

  if (!Number.isInteger(page) || page < 1 || page > totalPages || totalPosts === 0) {
    return undefined;
  }

  const startIndex = (page - 1) * pageSize;

  return {
    posts: posts.slice(startIndex, startIndex + pageSize),
    currentPage: page,
    totalPages,
    totalPosts,
    previousPage: page > 1 ? page - 1 : undefined,
    nextPage: page < totalPages ? page + 1 : undefined,
  };
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPostSummary[] {
  return getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      post: item,
      score:
        (item.category.slug === post.category.slug ? 4 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score || comparePostsNewestFirst(left.post, right.post),
    )
    .slice(0, limit)
    .map((item) => toPostSummary(item.post));
}

export function getAdjacentPosts(post: BlogPost): AdjacentBlogPosts {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);

  return {
    previous: currentIndex > 0 ? toPostSummary(posts[currentIndex - 1]) : undefined,
    next:
      currentIndex >= 0 && currentIndex < posts.length - 1
        ? toPostSummary(posts[currentIndex + 1])
        : undefined,
  };
}

export function getBlogSearchIndex() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: post.tags,
    author: post.author,
    readTime: post.readTime,
    excerpt: post.excerpt,
    searchText: post.searchText,
  }));
}

export function getArticleJsonLd(post: BlogPost) {
  return removeUndefinedValues({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: companyName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${brandLogos.mark.src}`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  });
}

function listBlogContentFiles() {
  if (!fs.existsSync(blogContentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogContentDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .sort()
    .map((fileName) => path.join(blogContentDirectory, fileName));
}

function parseBlogFile(filePath: string): ParsedBlogPost {
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = matter(content);
  const sourcePath = path.relative(process.cwd(), filePath);
  const frontmatter = validateFrontmatter(parsed.data, sourcePath);
  const plainText = markdownToPlainText(parsed.content);

  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    internalLinks: frontmatter.internalLinks ?? [],
    content: parsed.content.trim(),
    excerpt: plainText.slice(0, 220),
    readTime: calculateReadTime(plainText),
    sourcePath,
    searchText: [
      frontmatter.title,
      frontmatter.description,
      frontmatter.category,
      ...(frontmatter.tags ?? []),
      plainText,
    ]
      .join(" ")
      .toLowerCase(),
    categoryName: frontmatter.category,
  };
}

function validateFrontmatter(
  value: Record<string, unknown>,
  sourcePath: string,
): BlogFrontmatter {
  const diagnostics: string[] = [];
  const title = requireString(value.title, "title", sourcePath, diagnostics);
  const description = requireString(value.description, "description", sourcePath, diagnostics);
  const slug = requireString(value.slug, "slug", sourcePath, diagnostics);
  const date = requireDate(value.date, "date", sourcePath, diagnostics);
  const updated = optionalDate(value.updated, "updated", sourcePath, diagnostics);
  const category = requireString(value.category, "category", sourcePath, diagnostics);
  const author = requireString(value.author, "author", sourcePath, diagnostics);
  const image = optionalPublicPath(value.image, "image", sourcePath, diagnostics);
  const imageAlt = optionalString(value.imageAlt, "imageAlt", sourcePath, diagnostics);
  const tags = optionalStringArray(value.tags, "tags", sourcePath, diagnostics);
  const internalLinks = optionalLinks(value.internalLinks, sourcePath, diagnostics);

  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    diagnostics.push(
      `${sourcePath}\nInvalid slug: "${slug}" must be lowercase kebab-case`,
    );
  }

  if (category && !slugifyCategory(category)) {
    diagnostics.push(`${sourcePath}\nInvalid category: category must contain letters or numbers`);
  }

  if (updated && date && updated < date) {
    diagnostics.push(
      `${sourcePath}\nInvalid updated date: updated cannot be earlier than date`,
    );
  }

  if (image && !fs.existsSync(path.join(process.cwd(), "public", image))) {
    diagnostics.push(`${sourcePath}\nInvalid image: public asset not found at ${image}`);
  }

  if (image && !imageAlt) {
    diagnostics.push(
      `${sourcePath}\nMissing required field: imageAlt is required when image is set`,
    );
  }

  if (diagnostics.length > 0) {
    throw new Error(formatBlogValidationError(diagnostics));
  }

  return {
    title,
    description,
    slug,
    date,
    updated,
    category,
    author,
    image,
    imageAlt,
    tags,
    internalLinks,
  };
}

function requireString(
  value: unknown,
  fieldName: string,
  sourcePath: string,
  diagnostics: string[],
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    diagnostics.push(`${sourcePath}\nMissing required field: ${fieldName}`);
    return "";
  }

  return value.trim();
}

function optionalString(
  value: unknown,
  fieldName: string,
  sourcePath: string,
  diagnostics: string[],
) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    diagnostics.push(`${sourcePath}\nInvalid field: ${fieldName} must be a non-empty string`);
    return undefined;
  }

  return value.trim();
}

function requireDate(
  value: unknown,
  fieldName: string,
  sourcePath: string,
  diagnostics: string[],
) {
  const parsed = optionalDate(value, fieldName, sourcePath, diagnostics);

  if (!parsed) {
    diagnostics.push(`${sourcePath}\nMissing required field: ${fieldName}`);
  }

  return parsed ?? "";
}

function optionalDate(
  value: unknown,
  fieldName: string,
  sourcePath: string,
  diagnostics: string[],
) {
  if (value === undefined) {
    return undefined;
  }

  if (value instanceof Date) {
    return formatDate(value);
  }

  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    diagnostics.push(`${sourcePath}\nInvalid field: ${fieldName} must be YYYY-MM-DD`);
    return undefined;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime()) || formatDate(parsedDate) !== value) {
    diagnostics.push(`${sourcePath}\nInvalid date: ${fieldName} is not a real calendar date`);
    return undefined;
  }

  return value;
}

function optionalPublicPath(
  value: unknown,
  fieldName: string,
  sourcePath: string,
  diagnostics: string[],
) {
  const publicPath = optionalString(value, fieldName, sourcePath, diagnostics);

  if (publicPath && !publicPath.startsWith("/")) {
    diagnostics.push(`${sourcePath}\nInvalid field: ${fieldName} must start with "/"`);
  }

  return publicPath;
}

function optionalStringArray(
  value: unknown,
  fieldName: string,
  sourcePath: string,
  diagnostics: string[],
) {
  if (value === undefined) {
    return undefined;
  }

  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    diagnostics.push(`${sourcePath}\nInvalid field: ${fieldName} must be a list of strings`);
    return undefined;
  }

  return value.map((item) => item.trim());
}

function optionalLinks(
  value: unknown,
  sourcePath: string,
  diagnostics: string[],
): FrontmatterLink[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (
    !Array.isArray(value) ||
    value.some(
      (item) =>
        typeof item !== "object" ||
        item === null ||
        typeof (item as FrontmatterLink).href !== "string" ||
        typeof (item as FrontmatterLink).label !== "string" ||
        !(item as FrontmatterLink).href.trim() ||
        !(item as FrontmatterLink).label.trim(),
    )
  ) {
    diagnostics.push(
      `${sourcePath}\nInvalid field: internalLinks must be a list of { href, label } objects`,
    );
    return undefined;
  }

  return value.map((item) => ({
    href: (item as FrontmatterLink).href.trim(),
    label: (item as FrontmatterLink).label.trim(),
  }));
}

function countCategories(posts: ParsedBlogPost[]) {
  return posts.reduce<Map<string, number>>((counts, post) => {
    counts.set(post.categoryName, (counts.get(post.categoryName) ?? 0) + 1);

    return counts;
  }, new Map());
}

function findDuplicateValues(
  values: { value: string; sourcePath: string; label: string }[],
) {
  const byValue = values.reduce<Map<string, typeof values>>((map, item) => {
    map.set(item.value, [...(map.get(item.value) ?? []), item]);

    return map;
  }, new Map());

  return [...byValue.entries()].flatMap(([value, entries]) => {
    if (entries.length < 2) {
      return [];
    }

    return entries.map(
      (entry) => `${entry.sourcePath}\nDuplicate ${entry.label}: "${value}"`,
    );
  });
}

function comparePostsNewestFirst(
  left: Pick<BlogPost, "date" | "title">,
  right: Pick<BlogPost, "date" | "title">,
) {
  return right.date.localeCompare(left.date) || left.title.localeCompare(right.title);
}

function toPostSummary(post: BlogPost, includeSearchText = false): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    category: post.category,
    tags: post.tags,
    author: post.author,
    image: post.image,
    imageAlt: post.imageAlt,
    internalLinks: post.internalLinks,
    excerpt: post.excerpt,
    readTime: post.readTime,
    ...(includeSearchText ? { searchText: post.searchText } : {}),
  };
}

export function slugifyCategory(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryDescription(category: string) {
  const descriptions: Record<string, string> = {
    Backend:
      "Backend architecture, APIs, security, and operations for dependable software products.",
    Documentation:
      "Practical documentation and knowledge platform guidance for engineering teams.",
    Flutter:
      "Flutter architecture, performance, and product engineering guidance for production apps.",
    Mobile: "Mobile product delivery, release readiness, and maintainable app engineering.",
    "Open Source": "Open source practices, reusable engineering assets, and public product discipline.",
  };

  return descriptions[category] ?? `Practical ${category} articles from OpenStair Engineering.`;
}

function calculateReadTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatBlogValidationError(diagnostics: string[]) {
  return `Blog validation error:\n${diagnostics.join("\n\n")}`;
}

function removeUndefinedValues(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  );
}
