#!/usr/bin/env node

/**
 * OpenStair Technologies — Single Blog Article Validator
 *
 * Deterministically validates exactly ONE blog article without requiring
 * a full Next.js site build.
 *
 * Reuses the validation rules and schema from `lib/blog.ts` and `lib/blog-images.ts`.
 *
 * Usage:
 *   node scripts/validate-blog-article.mjs <file-path-or-slug>
 *
 * Examples:
 *   node scripts/validate-blog-article.mjs content/blog/flutter-performance-production-apps.mdx
 *   node scripts/validate-blog-article.mjs flutter-performance-production-apps
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileArticleMdx } from "./validate-blog-mdx.mjs";

// Approved hosts for external blog images (from lib/blog-images.ts)
const approvedExternalBlogImageHosts = new Set(["upload.wikimedia.org"]);

// Reserved blog segments (from lib/blog.ts)
const reservedBlogSegments = new Set(["page", "rss.xml"]);

function slugifyCategory(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseAbsoluteUrl(value) {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

function getBlogImageSourceKind(value) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return "local";
  }

  const parsedUrl = parseAbsoluteUrl(value);
  if (
    parsedUrl &&
    parsedUrl.protocol === "https:" &&
    approvedExternalBlogImageHosts.has(parsedUrl.hostname)
  ) {
    return "external";
  }

  return undefined;
}

function getBlogImageValidationDiagnostic(value, fieldName) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return undefined;
  }

  if (value.startsWith("//")) {
    return `Invalid field: ${fieldName} must be a local public path or an approved absolute HTTPS image URL; protocol-relative URLs are not allowed`;
  }

  const parsedUrl = parseAbsoluteUrl(value);
  if (!parsedUrl) {
    return `Invalid field: ${fieldName} must be a local public path starting with "/" or an approved absolute HTTPS image URL`;
  }

  if (parsedUrl.protocol !== "https:") {
    return `Invalid field: ${fieldName} external URL must use HTTPS`;
  }

  if (!approvedExternalBlogImageHosts.has(parsedUrl.hostname)) {
    return `Invalid field: ${fieldName} external URL host "${parsedUrl.hostname}" is not approved`;
  }

  return undefined;
}

function resolvePublicAssetPath(image, rootDir) {
  const publicDirectory = path.resolve(rootDir, "public");
  const publicAssetPath = path.resolve(publicDirectory, `.${image}`);
  const publicDirectoryWithSeparator = `${publicDirectory}${path.sep}`;

  if (
    publicAssetPath !== publicDirectory &&
    !publicAssetPath.startsWith(publicDirectoryWithSeparator)
  ) {
    return undefined;
  }

  return publicAssetPath;
}

export async function validateSingleArticle(inputPathOrSlug, rootDir = process.cwd()) {
  const diagnostics = [];
  const warnings = [];

  // Resolve target file path
  let targetPath;
  if (inputPathOrSlug.endsWith(".mdx") || inputPathOrSlug.includes(path.sep)) {
    targetPath = path.isAbsolute(inputPathOrSlug)
      ? inputPathOrSlug
      : path.resolve(rootDir, inputPathOrSlug);
  } else {
    targetPath = path.resolve(rootDir, "content", "blog", `${inputPathOrSlug}.mdx`);
  }

  const relativeSourcePath = path.relative(rootDir, targetPath);

  if (!fs.existsSync(targetPath)) {
    return {
      valid: false,
      sourcePath: relativeSourcePath,
      diagnostics: [`File not found: ${relativeSourcePath}`],
      warnings: [],
      metadata: null,
    };
  }

  const fileStats = fs.statSync(targetPath);
  if (!fileStats.isFile()) {
    return {
      valid: false,
      sourcePath: relativeSourcePath,
      diagnostics: [`Target is not a regular file: ${relativeSourcePath}`],
      warnings: [],
      metadata: null,
    };
  }

  const fileBaseName = path.basename(targetPath, ".mdx");

  // Read and parse file
  let rawContent;
  try {
    rawContent = fs.readFileSync(targetPath, "utf8");
  } catch (err) {
    return {
      valid: false,
      sourcePath: relativeSourcePath,
      diagnostics: [`Could not read file: ${err.message}`],
      warnings: [],
      metadata: null,
    };
  }

  let parsed;
  try {
    parsed = matter(rawContent);
  } catch (err) {
    return {
      valid: false,
      sourcePath: relativeSourcePath,
      diagnostics: [`Frontmatter parsing failed: ${err.message}`],
      warnings: [],
      metadata: null,
    };
  }

  const data = parsed.data || {};
  const content = (parsed.content || "").trim();

  // Validate Required Strings
  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) {
    diagnostics.push(`Missing required field: title`);
  }

  const description = typeof data.description === "string" ? data.description.trim() : "";
  if (!description) {
    diagnostics.push(`Missing required field: description`);
  }

  const slug = typeof data.slug === "string" ? data.slug.trim() : "";
  if (!slug) {
    diagnostics.push(`Missing required field: slug`);
  } else {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      diagnostics.push(`Invalid slug: "${slug}" must be lowercase kebab-case`);
    }
    if (fileBaseName !== slug) {
      diagnostics.push(`Slug mismatch: slug "${slug}" does not match filename "${fileBaseName}.mdx"`);
    }
    if (reservedBlogSegments.has(slug)) {
      diagnostics.push(`Invalid slug: "${slug}" is reserved by the blog router`);
    }
  }

  // Validate Date
  const dateStr = typeof data.date === "string" ? data.date.trim() : "";
  if (!dateStr) {
    diagnostics.push(`Missing required field: date`);
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    diagnostics.push(`Invalid field: date must be YYYY-MM-DD`);
  } else {
    const parsedDate = new Date(`${dateStr}T00:00:00.000Z`);
    if (Number.isNaN(parsedDate.getTime()) || formatDate(parsedDate) !== dateStr) {
      diagnostics.push(`Invalid date: date "${dateStr}" is not a real calendar date`);
    }
  }

  // Validate Updated Date (optional)
  let updatedStr = undefined;
  if (data.updated !== undefined) {
    if (typeof data.updated !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.updated.trim())) {
      diagnostics.push(`Invalid field: updated must be YYYY-MM-DD`);
    } else {
      updatedStr = data.updated.trim();
      const parsedUpdated = new Date(`${updatedStr}T00:00:00.000Z`);
      if (Number.isNaN(parsedUpdated.getTime()) || formatDate(parsedUpdated) !== updatedStr) {
        diagnostics.push(`Invalid date: updated "${updatedStr}" is not a real calendar date`);
      } else if (dateStr && updatedStr < dateStr) {
        diagnostics.push(`Invalid updated date: updated "${updatedStr}" cannot be earlier than date "${dateStr}"`);
      }
    }
  }

  // Validate Category
  const category = typeof data.category === "string" ? data.category.trim() : "";
  if (!category) {
    diagnostics.push(`Missing required field: category`);
  } else {
    const catSlug = slugifyCategory(category);
    if (!catSlug) {
      diagnostics.push(`Invalid category: category "${category}" must contain letters or numbers`);
    } else {
      if (reservedBlogSegments.has(catSlug)) {
        diagnostics.push(`Invalid category: "${category}" resolves to reserved route segment "${catSlug}"`);
      }
      if (slug && catSlug === slug) {
        diagnostics.push(`Route conflict: article slug "${slug}" conflicts with category route /blog/${catSlug}`);
      }
    }
  }

  // Validate Author
  const author = typeof data.author === "string" ? data.author.trim() : "";
  if (!author) {
    diagnostics.push(`Missing required field: author`);
  }

  // Validate Image and ImageAlt
  const image = typeof data.image === "string" ? data.image.trim() : undefined;
  const imageAlt = typeof data.imageAlt === "string" ? data.imageAlt.trim() : undefined;

  if (image) {
    if (!imageAlt) {
      diagnostics.push(`Missing required field: imageAlt is required when image is set`);
    }

    const imageDiag = getBlogImageValidationDiagnostic(image, "image");
    if (imageDiag) {
      diagnostics.push(imageDiag);
    } else if (getBlogImageSourceKind(image) === "local") {
      const publicPath = resolvePublicAssetPath(image, rootDir);
      if (!publicPath) {
        diagnostics.push(`Invalid image: local public asset path must resolve inside public/`);
      } else if (!fs.existsSync(publicPath) || !fs.statSync(publicPath).isFile()) {
        diagnostics.push(`Invalid image: public asset not found on disk at "${image}"`);
      }
    }
  }

  // Validate Tags (optional)
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags) || data.tags.some((t) => typeof t !== "string" || !t.trim())) {
      diagnostics.push(`Invalid field: tags must be a list of non-empty strings`);
    }
  }

  // Validate Internal Links (optional)
  if (data.internalLinks !== undefined) {
    if (!Array.isArray(data.internalLinks)) {
      diagnostics.push(`Invalid field: internalLinks must be an array of link objects`);
    } else {
      for (let i = 0; i < data.internalLinks.length; i++) {
        const link = data.internalLinks[i];
        if (!link || typeof link !== "object") {
          diagnostics.push(`Invalid internal link at index ${i}: must be an object`);
          continue;
        }
        if (typeof link.href !== "string" || !link.href.trim()) {
          diagnostics.push(`Invalid internal link at index ${i}: missing href`);
        }
        if (typeof link.label !== "string" || !link.label.trim()) {
          diagnostics.push(`Invalid internal link at index ${i}: missing label`);
        }
      }
    }
  }

  // Validate Content
  if (!content) {
    diagnostics.push(`Article content is empty`);
  } else {
    // Basic structural checks
    if (!content.startsWith("# ") && !content.includes("\n# ")) {
      warnings.push(`Content does not appear to contain a top-level H1 heading`);
    }

    // Deterministic MDX Compilation Check (Production Pipeline)
    const mdxResult = await compileArticleMdx(content);
    if (!mdxResult.valid) {
      const loc = mdxResult.line
        ? ` at line ${mdxResult.line}${mdxResult.column ? `:${mdxResult.column}` : ""}`
        : "";
      diagnostics.push(`MDX compilation failed${loc}: ${mdxResult.reason}`);
    }
  }

  const valid = diagnostics.length === 0;

  return {
    valid,
    sourcePath: relativeSourcePath,
    slug,
    category,
    title,
    date: dateStr,
    diagnostics,
    warnings,
    metadata: {
      title,
      slug,
      date: dateStr,
      updated: updatedStr,
      category,
      author,
      image,
      imageAlt,
      tagsCount: Array.isArray(data.tags) ? data.tags.length : 0,
      internalLinksCount: Array.isArray(data.internalLinks) ? data.internalLinks.length : 0,
      contentLengthChars: content.length,
    },
  };
}

// CLI Execution
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isMain) {
  const target = process.argv[2];
  if (!target) {
    console.error("Error: Target article path or slug is required.\nUsage: node scripts/validate-blog-article.mjs <path-or-slug>");
    process.exit(1);
  }

  const result = await validateSingleArticle(target);

  if (!result.valid) {
    console.error(`\n❌ VALIDATION FAILED: ${result.sourcePath}`);
    console.error(`Found ${result.diagnostics.length} diagnostic error(s):`);
    for (const diag of result.diagnostics) {
      console.error(`  - ${diag}`);
    }
    if (result.warnings.length > 0) {
      console.warn(`Warnings:`);
      for (const warn of result.warnings) {
        console.warn(`  - ${warn}`);
      }
    }
    process.exit(1);
  }

  console.log(`\n✅ VALIDATION PASSED: ${result.sourcePath}`);
  console.log(`  Title:       ${result.metadata.title}`);
  console.log(`  Slug:        ${result.metadata.slug}`);
  console.log(`  Date:        ${result.metadata.date}`);
  console.log(`  Category:    ${result.metadata.category}`);
  console.log(`  Author:      ${result.metadata.author}`);
  console.log(`  Image:       ${result.metadata.image || "(none)"}`);
  console.log(`  Tags:        ${result.metadata.tagsCount} tag(s)`);
  console.log(`  Links:       ${result.metadata.internalLinksCount} internal link(s)`);
  console.log(`  Body size:   ${result.metadata.contentLengthChars} chars`);

  if (result.warnings.length > 0) {
    console.warn(`\nWarnings:`);
    for (const warn of result.warnings) {
      console.warn(`  - ${warn}`);
    }
  }

  process.exit(0);
}
