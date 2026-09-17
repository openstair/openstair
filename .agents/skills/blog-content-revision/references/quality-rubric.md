# OpenStair Blog Content Quality Rubric

## Purpose

This rubric determines whether one revised article is ready to leave the worker as PASS.

It is a quality gate, not a word-count calculator.

---

# 1. Critical failures

The article must NOT receive PASS if it contains:

- copied or closely paraphrased substantial external content;
- fabricated facts;
- fabricated statistics or benchmarks;
- fabricated experiments;
- fabricated citations;
- fabricated first-hand experiences;
- fabricated APIs or fictional domain members presented as real;
- unsupported universal performance thresholds or timing rules;
- unsupported complexity claims (e.g. O(1) used as vague shorthand);
- materially misleading absolute claims ("guarantees", "eliminates", "solves" without official backing);
- major unresolved technical inaccuracies;
- substantial generic filler;
- artificial word-count expansion;
- excessive repetitive content;
- content that fails to address its stated topic;
- invalid MDX/frontmatter or production MDX compilation failure (Acorn expression parsing errors, malformed JSX tags, unclosed/malformed LaTeX math);
- broken required assets;
- unexpected modifications to files outside the assigned article;
- material damage to useful existing content.

---

# 2. Reader value

Ask:

> Would a real reader have a meaningful reason to read this article?

PASS indicators:

- meaningful question/problem;
- useful explanation;
- practical information;
- appropriate context;
- article-specific value;
- useful reader outcome.

FAIL indicators:

- superficial summary;
- obvious information only;
- generic content;
- repetitive explanation;
- content that could be replaced by a short definition.

---

# 3. Originality

PASS:

- independent organization;
- independent explanations;
- meaningful synthesis;
- useful reasoning;
- specific examples;
- article-specific conclusions.

FAIL:

- source-by-source paraphrasing;
- copied structure;
- generic synthesis;
- interchangeable sections;
- external information presented without meaningful added value.

---

# 4. Depth

Evaluate the article relative to its subject.

Ask:

- Are important concepts explained?
- Are necessary terms clear?
- Are difficult points unpacked?
- Are practical consequences covered?
- Are relevant tradeoffs discussed?
- Are important limitations covered?
- Does the article answer likely follow-up questions?

Do not use a universal minimum word count.

---

# 5. Specificity

Strong content contains details that belong specifically to the topic.

Look for:

- concrete examples;
- implementation details;
- realistic scenarios;
- technical distinctions;
- meaningful comparisons;
- decision criteria;
- failure modes;
- practical recommendations.

If large portions could be moved unchanged into another unrelated article, the content is too generic.

---

# 6. Accuracy

Important factual and technical claims should be trustworthy.

Check:

- current behavior;
- version sensitivity;
- technical terminology;
- numerical claims;
- security claims;
- performance claims.

Do not allow unsupported certainty.

---

# 7. Usefulness

The article should help the reader:

- understand;
- implement;
- troubleshoot;
- decide;
- compare;
- avoid mistakes;
- plan;
- evaluate tradeoffs.

---

# 8. Structure

PASS:

- introduction establishes the actual subject;
- sections follow logically;
- headings are meaningful;
- paragraphs are readable;
- examples appear where useful;
- conclusion provides a useful takeaway.

FAIL:

- formulaic sections;
- disconnected sections;
- excessive lists;
- repetitive conclusion;
- poor progression.

---

# 9. Content density

Meaningful information should dominate the article.

Avoid:

- filler;
- generic transitions;
- repetitive summaries;
- excessive adjectives;
- motivational padding;
- artificial FAQs;
- redundant bullet lists.

---

# 10. Differentiation

Check against the existing OpenStair library.

Ask:

- Is the reader intent distinct?
- Are the examples distinct?
- Is the explanation distinct?
- Does the article provide something not already covered elsewhere?

Do not automatically consolidate overlapping articles unless explicitly authorized.

---

# 11. Technical article quality

For software/engineering content, prefer:

- technical reasoning;
- implementation details;
- architecture considerations;
- tradeoffs;
- production considerations;
- realistic examples;
- limitations;
- failure modes.

Avoid:

- vague performance claims;
- unsupported benchmarks;
- generic technology lists;
- shallow tutorials missing important constraints.

---

# 12. Technical precision and evidence-backed claims

Evaluate the article against strict technical precision standards:

### A. Technical Correctness
- Are API names, signatures, method names, and framework conventions accurate?
- Does the code reflect current production practices rather than obsolete or invented patterns?

### B. Evidence-Backed Technical Claims
- Are causal performance claims supported by official platform/framework documentation?
- Does the article avoid presenting theoretical or inferred benefits as guaranteed framework behaviors?

### C. Code-Example Validity
- Are code snippets syntactically valid and runnable in principle?
- Do examples rely strictly on real framework APIs rather than fictitious project symbols (e.g. avoid invented domain prototypes or fake helper methods)?
- Are examples self-contained and clearly illustrative?

### D. Quantitative-Claim Discipline
- Do quantitative calculations (e.g., bitmap memory formulas) state their exact mathematical assumptions?
- Does the text clearly distinguish theoretical raw buffer allocation from actual runtime process memory, GC behavior, and cache overhead?
- Are benchmark numbers, timing figures, or hardware stats strictly grounded in verified sources rather than invented?

### E. Performance-Claim Discipline
- Does the article avoid converting useful heuristics into universal laws or rigid millisecond cutoffs?
- Does it prioritize profiling-driven workflows (e.g., DevTools Timeline, CPU Profiler) over arbitrary prescriptive thresholds?
- Are complexity claims (such as $O(1)$, $O(n)$) explicitly defined by operation and data structure rather than used as vague shorthand for "faster"?

### F. Appropriate Uncertainty and Qualification
- Does the article avoid sweeping absolutes ("always", "guarantees", "eliminates", "solves") unless authoritative documentation explicitly validates them?
- Are version sensitivities, platform variations, and edge cases acknowledged where relevant?

---

# 13. Production MDX compilation gate

The article MUST compile cleanly through the project's actual production MDX pipeline (`next-mdx-remote/rsc` with `@mdx-js/mdx`, `remark-math`, and `rehype-katex`).

The worker must verify compilation using `node scripts/validate-blog-article.mjs <article>`.

An article automatically FAILS this gate if:
- Acorn expression parser fails on embedded expressions or braces;
- Unescaped `<` or malformed JSX tags occur;
- Unclosed or malformed LaTeX math blocks trigger parser errors;
- Any syntax error prevents prerendering during `next build`.

---

# 14. Final human-reader test

Ask:

1. What does this article teach?
2. What can the reader do after reading it?
3. Why does this article deserve to exist?
4. What makes it useful beyond a generic summary?
5. Are important claims trustworthy and technically verified?
6. Does it feel complete for its intended purpose?
7. Did the revision genuinely improve it without introducing factual or code errors?

If the answer to these questions is not convincingly positive, use REVIEW or FAIL.

---

# 15. Result

Use exactly one quality result:

```text
PASS
REVIEW
FAIL
```

- **`PASS`**: The article satisfies all rubric criteria, adheres to technical precision rules, passed deterministic validation and production MDX compilation, and modified only the assigned file. Note: `agent_pass != human_approved`.
- **`REVIEW`**: Content is valid and improved, but contains decisions, claims, or nuances requiring human editorial discretion.
- **`FAIL`**: The article contains critical failures, technical inaccuracies, unsupported thresholds, fails deterministic validation or MDX compilation, or touched unexpected files.