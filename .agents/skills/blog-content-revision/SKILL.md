---
name: blog-content-revision
description: Revise one existing OpenStair blog article at a time for genuine usefulness, originality, depth, technical accuracy, and content quality. Use when improving, expanding, rewriting, fact-checking, strengthening, or quality-reviewing an existing article. Never use this skill to blindly rewrite the entire blog library in one generation task.
---

# OpenStair Blog Content Revision Skill

## Purpose

This skill governs the revision of existing OpenStair blog articles.

The goal is to improve the actual substance, accuracy, and usefulness of each article for human readers.

### Non-Goals
The objective is **NOT**:
- maximizing word count for the sake of length;
- generating repetitive, boilerplate, or interchangeable content;
- imposing an identical rigid structure across every article;
- fabricating personal, company, or platform experience;
- making unsupported promises about search rankings or advertising approval.

### Primary Goals
The objective **IS**:
- genuine reader value and usefulness;
- technical depth, accuracy, and verified claims;
- independent, original explanations with concrete examples;
- meaningful differentiation so articles do not read like cookie-cutter templates;
- clean structure, readability, and high information density.

---

## 1. Hard Rule: One Article Per Worker Invocation

A worker invocation processes **exactly ONE article**.

The worker must **NOT**:
- discover or process additional articles;
- attempt to rewrite or touch multiple articles;
- continue automatically to another article after completing the current one;
- modify unrelated files, application code, components, or configuration.

Each worker invocation remains completely isolated. Sequential orchestration across multiple articles must occur via external coordination or fresh subagent invocations, never by continuing an existing worker context.

---

## 2. Source of Truth

The actual repository under:

```text
content/blog/
```

is the authoritative source of truth for:
- article existence;
- current content;
- current frontmatter metadata.

Workflow state files (e.g. under `.agents/state/`) are progress tracking records only and never replace the filesystem.

---

## 3. Preserving Invariants

Unless explicitly authorized by the user:
- **Do NOT change article slugs or file paths**: Slugs define public canonical URLs.
- **Do NOT break frontmatter schema**: Preserve required fields (`title`, `description`, `slug`, `date`, `category`, `author`).
- **Do NOT invalidate assets**: If an article references hero images or diagrams in `public/`, ensure they exist and adhere to the project image guidelines.
- **Do NOT discard accurate, high-value existing content**: Improve and expand weak areas rather than blindly discarding functioning explanations.

---

## 4. Technical Precision Calibration Rules

Every revised article must strictly follow these precision principles established during editorial calibration:

1. **No Invented Thresholds or Benchmarks**:
   - Do not invent universal timing cutoffs, frame targets beyond standard refresh rates, memory quotas, or performance metrics merely to sound authoritative.
   - Do not convert useful engineering heuristics into universal laws (e.g., asserting that tasks over a specific millisecond duration must always use an isolate).
   - If a threshold is cited, clearly state whether it originates from authoritative framework documentation (e.g. 16.6ms for 60Hz frame budgets), a clearly scoped engineering convention, or a defined illustrative assumption.
2. **Profiling Over Prescriptive Rules**:
   - When discussing performance tradeoffs, advocate for profiling-based decision-making (e.g., using DevTools CPU Profiler and Timeline) rather than prescribing arbitrary numerical thresholds.
3. **Valid and Self-Contained Illustrative Code**:
   - Code examples must use real, existing framework/language APIs.
   - Never rely on fictional model members, unestablished domain types (e.g., `Account.prototype`), or placeholder symbols that look like real library features unless explicitly declared in the code snippet.
   - Prefer small, clean, self-contained examples using standard platform widgets or types.
4. **Distinguish Documented Behavior from Inferred Consequences**:
   - Clearly differentiate between what the framework/platform documentation explicitly guarantees and what is an inferred practical benefit.
   - If a source does not establish a strict causal relationship, phrase it as a possible or consequential benefit rather than a guaranteed outcome.
5. **Avoid Unsupported Absolute Claims**:
   - Avoid categorical words such as "always", "guarantees", "eliminates", or "solves" unless official platform documentation explicitly uses that standard.
   - For instance, state that a rendering engine precompiles shaders to *avoid runtime compilation hitches*, rather than claiming it *fundamentally solves all jank*.
6. **Complexity Claim Rigor**:
   - Computational complexity claims (e.g., $O(1)$, $O(n)$) must precisely define the exact data structure and operation being evaluated. Never use complexity notation as vague marketing shorthand for "faster".
7. **Quantitative and Memory Calculation Transparency**:
   - Quantitative examples (such as decoded bitmap calculations) must explicitly declare their mathematical assumptions (e.g., $\text{width} \times \text{height} \times 4\text{ bytes}$ for 32-bit RGBA).
   - Clearly distinguish raw/theoretical buffer math from total operating system process memory usage, cache behavior, and garbage collection overhead.
8. **Research Uncertainty Before Publishing**:
   - Whenever uncertain about framework behavior, API signatures, or performance implications, research authoritative primary documentation (`docs.flutter.dev`, `api.flutter.dev`, `dart.dev`) before committing the claim.

---

## 5. Revision Workflow Steps

Every single-article revision worker must execute these steps sequentially:

### Step 1: Preflight Inspection
1. Open and read the complete target article file (`content/blog/<slug>.mdx`) from start to finish.
2. Inspect its frontmatter and structure.
3. Understand its core topic, intended audience, and educational objective.

### Step 2: Diagnosis Before Rewriting
1. Evaluate the existing content against the [Quality Rubric](./references/quality-rubric.md).
2. Diagnose specific shortcomings:
   - Where is the explanation too shallow, generic, or repetitive?
   - Are there missing architectural tradeoffs, edge cases, or failure modes?
   - Is there filler, motivational padding, or fluff that should be removed?
   - Does the article provide concrete takeaways for an experienced engineer?

### Step 3: Research & Fact-Checking
1. Follow the [Research Guidelines](./references/research-guidelines.md).
2. Identify all version-dependent, numerical, architectural, or security claims.
3. Consult Tier 1 or Tier 2 authoritative sources (official framework docs, language specs, RFCs).
4. **Strict prohibition on fabrication**:
   - Never invent statistics, benchmarks, timing figures, or adoption metrics.
   - Never invent citations or customer case studies.
   - Never write "We tested this at OpenStair" or "In our production system" unless explicitly documented in the repo.

### Step 4: Editorial Revision
1. Rewrite, deepen, and restructure the article directly in the `.mdx` file.
2. Emphasize clarity, technical precision, and practical implementation context.
3. Apply the **Technical Precision Calibration Rules** to every section, code snippet, and explanation.
4. Ensure the article is differentiated from other articles in `content/blog/`.
5. Maintain proper Markdown formatting, headings, code blocks, and lists.

### Step 5: Technical Precision Check & Rereading
1. Re-read the modified article in its entirety.
2. Explicitly inspect:
   - numerical thresholds and timing claims;
   - code examples (confirm zero fictional domain members or fake APIs);
   - absolute claims ("guarantees", "eliminates");
   - mathematical assumptions in quantitative examples.
3. Confirm that no accidental filler, duplicate sections, or syntax errors were introduced.

### Step 6: Targeted Deterministic Validation
Run the single-article validation utility:

```sh
node scripts/validate-blog-article.mjs content/blog/<slug>.mdx
```

The validator checks:
- frontmatter syntax and mandatory fields;
- slug congruence with filename;
- date formats and logic;
- image existence in `public/` or approved hosts;
- route conflict avoidance;
- **Production MDX Compilation**: compiles the article content directly through the project's actual runtime MDX pipeline (`next-mdx-remote/rsc`, `@mdx-js/mdx`, `remark-math`, `rehype-katex`), verifying that Acorn parsing passes, JSX tags are valid, and math syntax compiles cleanly.

The worker must not report `agent_pass` unless the assigned article passes this deterministic MDX compilation gate.

If validation fails, resolve all diagnostic errors before proceeding.

### Step 7: Changed-File Safety Check
Run:
```sh
git diff --name-only
```
Verify that **only** `content/blog/<assigned-slug>.mdx` was modified. If any unexpected file was touched, do not report `PASS`.

### Step 8: Final Quality Gate Assessment
Evaluate the final article against the [Quality Rubric](./references/quality-rubric.md):
- Assign **`PASS`**, **`REVIEW`**, or **`FAIL`**.
- **Important**: `agent_pass != human_approved`. A `PASS` from the worker records workflow state as `agent_pass`. During calibration, human review and approval is required before any article is considered `human_approved`.

---

## 6. Completion and Reporting

Follow the [Worker Protocol](./references/worker-protocol.md) to generate the standardized execution summary.

Report:
1. Target article path and slug.
2. Deterministic validation status (`validate-blog-article.mjs`).
3. Project lint status (`npm run lint`).
4. Exact changed files (`git diff --name-only`).
5. Quality rubric verdict (`PASS` / `REVIEW` / `FAIL`).
6. Technical verification and sources consulted.
7. Specific items (if any) flagged for human editorial attention.

Upon delivering the report, the worker **terminates immediately**.