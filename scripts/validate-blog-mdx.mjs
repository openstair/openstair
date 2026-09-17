#!/usr/bin/env node

/**
 * OpenStair Technologies — Deterministic Read-Only Blog MDX Audit
 *
 * Audits all `.mdx` files under `content/blog/` using the real runtime
 * MDX compilation pipeline (`next-mdx-remote/rsc` + `@mdx-js/mdx` with
 * `remark-math` and `rehype-katex`).
 *
 * This script is strictly READ-ONLY. It never modifies any article file.
 *
 * Usage:
 *   node scripts/validate-blog-mdx.mjs
 *   node scripts/validate-blog-mdx.mjs <optional-slug-or-file>
 *   node scripts/validate-blog-mdx.mjs --json
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { compile } from "@mdx-js/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export const mdxCompilationOptions = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
};

/**
 * Deterministically compiles MDX content using the project's production pipeline.
 * Returns an object with { valid, error, reason, line, column }.
 */
export async function compileArticleMdx(content) {
  try {
    await compileMDX({
      source: content,
      options: mdxCompilationOptions,
    });
    return {
      valid: true,
      error: null,
      reason: null,
      line: null,
      column: null,
    };
  } catch (remoteErr) {
    let line = null;
    let column = null;
    let reason = remoteErr.message || String(remoteErr);
    let causeMessage = null;

    try {
      await compile(content, {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        development: false,
      });
    } catch (coreErr) {
      line = coreErr.line ?? null;
      column = coreErr.column ?? null;
      causeMessage = coreErr.cause?.message;
      reason = coreErr.reason || causeMessage || reason;
    }

    return {
      valid: false,
      error: remoteErr,
      reason,
      causeMessage,
      line,
      column,
    };
  }
}

export async function auditSingleArticle(filePath, rootDir = process.cwd(), validatorFn = null) {
  const relativePath = path.relative(rootDir, filePath);
  const slug = path.basename(filePath, ".mdx");
  const rawContent = fs.readFileSync(filePath, "utf-8");

  let parsed;
  try {
    parsed = matter(rawContent);
  } catch (err) {
    return {
      slug,
      filePath: relativePath,
      mdxPass: false,
      validatorPass: false,
      errorType: "FrontmatterParseError",
      errorMessage: err.message,
      line: 1,
      column: 1,
      fileLine: 1,
      snippet: "",
      isAcornError: false,
      pattern: "Malformed frontmatter",
    };
  }

  const { content, data } = parsed;

  // Count frontmatter line count to map content lines to file lines
  const frontmatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontmatterLineCount = frontmatterMatch
    ? frontmatterMatch[0].split("\n").length - 1
    : 0;

  // 1. Run article validator if provided
  let validatorPass = true;
  let validatorDiagnostics = [];
  if (validatorFn) {
    const valRes = await validatorFn(filePath, rootDir);
    validatorPass = valRes.valid;
    validatorDiagnostics = valRes.diagnostics || [];
  }

  // 2. Test actual runtime MDX compilation via next-mdx-remote/rsc with math plugins
  const mdxResult = await compileArticleMdx(content);
  const mdxPass = mdxResult.valid;
  let errorType = null;
  let errorMessage = null;
  let line = mdxResult.line;
  let column = mdxResult.column;
  let fileLine = null;
  let snippet = "";
  let isAcornError = false;
  let pattern = null;

  if (!mdxPass) {
    errorType = mdxResult.error?.name || "MdxCompileError";
    errorMessage = mdxResult.error?.message || String(mdxResult.error);
    isAcornError = errorMessage.includes("Could not parse expression with acorn");

    if (line !== null) {
      fileLine = line + frontmatterLineCount;
      const rawLines = rawContent.split("\n");
      if (fileLine <= rawLines.length) {
        snippet = rawLines[fileLine - 1].trim();
      }
    }

    if (snippet.includes("\\text{")) {
      pattern = "LaTeX math block or inline math containing \\text{...} with spaces";
    } else if (snippet.includes("$$") || snippet.includes("$")) {
      pattern = "LaTeX math syntax ($$...$$ or $...$) interpreted as JSX expression";
    } else if (snippet.includes("{") && snippet.includes("}")) {
      pattern = "Unescaped curly braces in prose or markup";
    } else if (snippet.includes("<") && snippet.includes(">")) {
      pattern = "Malformed or unescaped HTML/JSX tag";
    } else {
      pattern = mdxResult.reason || "Unclassified syntax error";
    }
  }

  return {
    slug,
    filePath: relativePath,
    title: data?.title || slug,
    category: data?.category || "",
    validatorPass,
    validatorDiagnostics,
    mdxPass,
    errorType,
    errorMessage,
    line,
    column,
    fileLine,
    snippet,
    isAcornError,
    pattern,
  };
}

export async function runFullAudit(targetSlugOrPath = null, jsonOutput = false) {
  // Dynamically import validator to avoid circular dependency
  let validatorFn = null;
  try {
    const valModule = await import("./validate-blog-article.mjs");
    validatorFn = valModule.validateSingleArticle;
  } catch {
    // Validator will be skipped if not importable
  }

  let filesToAudit = [];

  if (targetSlugOrPath && !targetSlugOrPath.startsWith("--")) {
    const targetFile = targetSlugOrPath.endsWith(".mdx")
      ? path.resolve(process.cwd(), targetSlugOrPath)
      : path.join(blogDirectory, `${targetSlugOrPath}.mdx`);
    if (!fs.existsSync(targetFile)) {
      console.error(`File not found: ${targetFile}`);
      process.exit(1);
    }
    filesToAudit = [targetFile];
  } else {
    filesToAudit = fs
      .readdirSync(blogDirectory)
      .filter((f) => f.endsWith(".mdx"))
      .sort()
      .map((f) => path.join(blogDirectory, f));
  }

  const results = [];
  for (const file of filesToAudit) {
    const res = await auditSingleArticle(file, process.cwd(), validatorFn);
    results.push(res);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(results, null, 2));
    return results;
  }

  const total = results.length;
  const passed = results.filter((r) => r.mdxPass);
  const failed = results.filter((r) => !r.mdxPass);
  const validatorDiscrepancies = results.filter(
    (r) => r.validatorPass && !r.mdxPass
  );

  console.log("============================================================");
  console.log("OPENSTAIR BLOG MDX COMPILATION AUDIT (WITH MATH SUPPORT)");
  console.log("============================================================");
  console.log(`Total Articles Audited: ${total}`);
  console.log(`MDX Compile PASS:       ${passed.length}`);
  console.log(`MDX Compile FAIL:       ${failed.length}`);
  if (validatorFn) {
    console.log(`Validator Discrepancies: ${validatorDiscrepancies.length} (Validator PASS, MDX FAIL)`);
  }
  console.log("============================================================\n");

  if (failed.length > 0) {
    console.log("FAILURES BY ARTICLE:\n");
    failed.forEach((f, idx) => {
      console.log(`${idx + 1}. [${f.slug}]`);
      console.log(`   File:        ${f.filePath}`);
      console.log(`   Location:    File Line ${f.fileLine ?? "?"} (Content Line ${f.line ?? "?"}, Col ${f.column ?? "?"})`);
      console.log(`   Snippet:     ${f.snippet}`);
      console.log(`   Pattern:     ${f.pattern}`);
      console.log(`   Acorn Error: ${f.isAcornError ? "YES" : "NO"}`);
      console.log(`   Validator:   ${f.validatorPass ? "PASS" : "FAIL"}`);
      console.log(`   Error:       ${f.errorMessage?.split("\n")[0]}`);
      console.log("");
    });

    console.log("============================================================");
    console.log("FAILURE PATTERN SUMMARY");
    console.log("============================================================");
    const patternCounts = new Map();
    for (const f of failed) {
      const p = f.pattern || "Unknown";
      patternCounts.set(p, (patternCounts.get(p) || 0) + 1);
    }
    for (const [p, count] of patternCounts.entries()) {
      console.log(`- ${p}: ${count} article(s)`);
    }
    console.log("");
  }

  console.log("============================================================");
  console.log("CALIBRATION ARTICLES STATUS");
  console.log("============================================================");
  const art1 = results.find((r) => r.slug === "flutter-performance-production-apps");
  const art2 = results.find((r) => r.slug === "flutter-large-list-performance");

  console.log(`Article #1 (flutter-performance-production-apps):`);
  console.log(`  MDX Compile: ${art1?.mdxPass ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`  Validator:   ${art1?.validatorPass ? "✅ PASS" : "❌ FAIL"}`);

  console.log(`\nArticle #2 (flutter-large-list-performance):`);
  console.log(`  MDX Compile: ${art2?.mdxPass ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`  Validator:   ${art2?.validatorPass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("============================================================\n");

  return results;
}

// CLI Execution
const args = process.argv.slice(2);
const isJson = args.includes("--json");
const targetArg = args.find((a) => !a.startsWith("--"));

runFullAudit(targetArg, isJson).catch((err) => {
  console.error("Audit execution error:", err);
  process.exit(1);
});
