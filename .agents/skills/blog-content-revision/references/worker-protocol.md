# OpenStair Blog Revision Worker Protocol

## Purpose

Defines the isolated execution lifecycle for a blog revision worker.

A worker invocation processes **exactly ONE existing article** and terminates upon completion.

---

## Hard Isolation Boundaries

Each worker invocation must strictly adhere to these boundaries:

1. **One Article Rule**: Process only the single assigned article. Do not discover, inspect, or modify other articles.
2. **No Batching**: Never attempt to loop through multiple articles in a single session.
3. **No Unrelated Changes**: Do not touch application code, configuration, assets, or other content files.
4. **Authoritative Source**: The real file at `content/blog/<slug>.mdx` is the source of truth.
5. **Human Approval Principle**: A worker verdict of `PASS` means `agent_pass`. It does **not** mean `human_approved`.

---

## Worker Lifecycle

```
[Phase 1: Preflight] ──> [Phase 2: Diagnosis & Research] ──> [Phase 3: Editorial Revision]
                                                                      │
[Phase 6: Report & Terminate] <── [Phase 5: Quality Gate] <── [Phase 4: Validation]
```

### Phase 1: Preflight Inspection

1. **Receive Target**: The worker receives the target article identifier (typically the slug or file path).
   - Example: `flutter-performance-production-apps` or `content/blog/flutter-performance-production-apps.mdx`.
2. **Read Entire File**: Inspect the complete `.mdx` file from start to finish.
3. **Inspect Frontmatter**: Verify existing fields (`title`, `description`, `slug`, `date`, `category`, `author`, `image`, `imageAlt`, `tags`, `internalLinks`).
4. **Identify Core Intent**: Determine the target audience, technical level, and key problem the article addresses.

### Phase 2: Diagnosis & Research

1. **Content Audit**: Evaluate existing content against the [Quality Rubric](./quality-rubric.md):
   - What makes this article genuinely useful?
   - What is superficial, generic, or repetitive?
   - What technical explanations are weak, outdated, or missing nuance?
2. **Fact-Checking & Research**: Follow [Research Guidelines](./research-guidelines.md):
   - Verify version-sensitive claims against official documentation.
   - Clarify architectural tradeoffs, edge cases, and failure modes.
   - **Never fabricate**: Do not invent statistics, benchmarks, citations, or OpenStair first-hand claims.
3. **Differentiation Check**: Ensure proposed enhancements provide distinct value rather than generic boilerplate.

### Phase 3: Editorial Improvement

1. **Preserve Invariants**:
   - Keep the existing `slug` and file path unchanged.
   - Preserve valid metadata and local asset links.
   - Retain accurate, useful existing explanations.
2. **Substantive Enhancement**:
   - Deepen technical reasoning with concrete code snippets or architecture explanations.
   - Add practical implementation considerations, limitations, and failure recovery.
   - Eliminate filler, promotional padding, and repetitive transitions.
   - Focus on reader value over arbitrary word count.
3. **Apply Edits**: Update the target article file using precise file modification tools.

### Phase 4: Deterministic Validation and Lint

1. **Run Targeted Validator**:
   Execute the single-article validation command:
   ```sh
   node scripts/validate-blog-article.mjs content/blog/<slug>.mdx
   ```
   Ensure frontmatter, slug congruence, date validity, routing reservation, image references, and **Production MDX Compilation** pass cleanly. The validator deterministically compiles the article through the project's real MDX pipeline (`next-mdx-remote/rsc`, `@mdx-js/mdx`, `remark-math`, `rehype-katex`). The worker must ensure that Acorn expression parsing, JSX syntax, and math compilation pass without errors.
2. **Run Project Lint**:
   Execute:
   ```sh
   npm run lint
   ```
   Ensure code blocks or configuration remain fully compliant with project standards.
3. **Correct Any Failures**: If validation, MDX compilation, or linting fails, resolve the issues immediately.

### Phase 5: Deterministic Changed-File Safety Check

1. **Inspect Modified Files**:
   Execute:
   ```sh
   git diff --name-only
   ```
2. **Verify Change Set**:
   - For a normal article worker, the **ONLY** expected production modification is:
     `content/blog/<assigned-slug>.mdx`
   - If any other file under `content/blog/`, `app/`, `components/`, `lib/`, or `public/` was modified unexpectedly, the worker **MUST NOT report PASS**.
   - Unexpected file modifications must be investigated, reverted, or classified under `REVIEW` or `FAILED`.

### Phase 6: Quality Gate Evaluation

Score the revised article against the [Quality Rubric](./quality-rubric.md) across all dimensions, including Section 12 (Technical Precision and Evidence-Backed Claims) and the **Production MDX Compilation Gate**:
- Freedom from Critical Failures (no copied content, no fabricated facts/APIs/members, no unsupported thresholds)
- Production MDX Compilation Validity (clean compilation through `next-mdx-remote/rsc` with math support)
- Reader Value and Originality
- Technical Depth and Specificity
- Code-Example Validity (real APIs, self-contained, no fictional domain types)
- Quantitative and Complexity Discipline (explicit assumptions, no vague $O(1)$ shorthand)

Assign exactly one result:
- **`PASS`**: Meets all quality rubric criteria, passes deterministic MDX compilation, passes validation and lint, and modified only the assigned file.
- **`REVIEW`**: Content is improved and valid, but contains edge cases, claims, or nuances requiring human editorial discretion.
- **`FAIL`**: Fails deterministic validation, fails MDX compilation, contains unresolved technical inaccuracies, touches unexpected files, or violates rubric standards.

### Phase 7: Structured Result Report & Termination

The worker records its workflow status as:
- `agent_pass` (if result is `PASS`)
- `review` (if result is `REVIEW`)
- `failed` (if result is `FAIL`)

> [!IMPORTANT]
> **A worker may NEVER mark an article `human_approved`**. Human approval is reserved exclusively for a human reviewer.

Output the standardized completion report:

```markdown
### Worker Execution Summary
- **Target Article**: content/blog/<slug>.mdx
- **Slug**: <slug>
- **Result**: PASS | REVIEW | FAIL
- **Workflow Status**: agent_pass | review | failed
- **Validation**: Passed (node scripts/validate-blog-article.mjs)
- **Lint**: Passed (npm run lint)
- **Exact Changed Files**:
  - content/blog/<slug>.mdx
- **Unexpected Changed Files**: None

#### Summary of Editorial Changes
- <Bullet point of substantive changes made>
- <Bullet point of sections deepened or clarified>
- <Bullet point of filler removed>

#### Technical Precision & Research
- <Authoritative documentation consulted>
- <Key technical claims verified>
- <Code examples verified as using real APIs without fictional domain members>

#### Quality Rubric Assessment
- **Reader Value**: <Brief assessment>
- **Technical Accuracy**: <Verified against official docs>
- **Originality & Depth**: <Summary of new depth added>

#### Notes for Human Reviewer
- <Any specific points requiring human attention, or "None">
```

Once the report is delivered, the worker's task is finished. **Terminate immediately. Do NOT continue to another article.**