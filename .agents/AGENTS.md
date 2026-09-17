# OpenStair Technologies — Agent Instructions

## 1. Purpose

These instructions define how an AI agent should operate inside the OpenStair Technologies repository.

They apply to code, content, documentation, configuration, debugging, maintenance, refactoring, and workflow tasks.

The objective is production-quality work with minimal unintended impact.

---

## 2. Inspect before changing

Never make substantial changes based only on the task description.

Before modifying a relevant area:

1. Locate the actual files.
2. Read the existing implementation.
3. Understand the current behavior.
4. Inspect related files when necessary.
5. Identify the smallest correct change.

Do not guess when the repository can provide the answer.

---

## 3. Preserve existing behavior

Existing behavior is intentional unless the user requests a change.

Preserve unrelated:

- functionality;
- routes;
- public URLs;
- data formats;
- APIs;
- metadata;
- assets;
- integrations;
- conventions.

Do not perform unrelated cleanup.

---

## 4. Minimal scope

Make the smallest change that correctly solves the requested problem.

Do not:

- refactor unrelated code;
- reorganize directories without a reason;
- replace libraries unnecessarily;
- introduce abstractions without a real need;
- modify unrelated content;
- change working behavior merely for stylistic preference.

---

## 5. Repository is authoritative

The actual repository is the source of truth.

Never invent:

- APIs;
- dependencies;
- environment variables;
- database structures;
- services;
- integrations;
- business claims;
- company facts;
- existing features;
- file paths;
- configuration behavior.

When external information is required, use authoritative sources.

When something cannot be verified, state the uncertainty.

---

## 6. Existing content is production content

Public editorial content must be treated as a real product asset.

When modifying existing content:

- read the complete article;
- understand its topic and intent;
- preserve useful material;
- identify genuine weaknesses;
- improve substance rather than appearance;
- avoid unnecessary rewriting;
- avoid generic filler;
- avoid repetitive explanations;
- avoid artificial word-count expansion.

---

## 7. One-article rule for semantic editorial work

Substantial AI-generated editorial work should normally be performed on exactly one article per worker invocation.

Do not process an entire editorial library as one AI-generation task.

A loop may process many articles sequentially, but each article must remain an isolated worker unit.

Each worker invocation must:

1. receive one target article;
2. load the project's persistent context;
3. inspect that article;
4. revise only that article;
5. validate that article;
6. return a result;
7. terminate.

A subsequent article must be processed by a fresh worker invocation.

### Deterministic batch operations

Batch operations are acceptable when they are mechanical and do not require editorial judgment.

Examples:

- fixed metadata replacement;
- exact path replacement;
- deterministic formatting correction;
- controlled configuration migration.

Semantic operations such as rewriting, expanding, restructuring, or improving article content should remain isolated.

---

## 8. Content quality over word count

Do not treat article length as a quality metric by itself.

A longer article is not automatically better.

Every addition should provide meaningful value.

Prefer:

- concrete explanations;
- practical examples;
- technical details;
- implementation considerations;
- tradeoffs;
- failure modes;
- useful comparisons;
- original reasoning;
- actionable guidance.

Avoid:

- filler;
- repetition;
- generic introductions;
- generic conclusions;
- keyword stuffing;
- artificial statistics;
- unsupported claims;
- unnecessary FAQs;
- boilerplate sections.

---

## 9. Originality

Originality means adding genuine value, not merely changing wording.

Do not:

- copy external articles;
- closely paraphrase external articles;
- reproduce another article's structure section by section;
- create interchangeable articles;
- assemble generic information without meaningful synthesis.

Research may inform an article, but the final explanation must be independently written and useful.

Never fabricate first-hand experience.

Never claim OpenStair performed an experiment, deployment, measurement, or observation unless that fact is established by the repository or explicitly provided by the user.

---

## 10. Technical content

For technical content:

- verify important claims;
- use current authoritative documentation when appropriate;
- distinguish facts from recommendations;
- avoid unsupported guarantees;
- avoid invented benchmarks;
- avoid invented performance figures;
- identify version-sensitive behavior;
- avoid obsolete APIs when current information is available.

---

## 11. Public URLs and identifiers

Treat existing public identifiers as stable.

Unless explicitly authorized, do not change:

- article slugs;
- public URLs;
- canonical URLs;
- IDs;
- externally referenced filenames.

Before changing one, inspect all relevant references and understand the consequences.

---

## 12. Dependencies

Before adding a dependency:

1. inspect existing dependencies;
2. determine whether equivalent functionality already exists;
3. verify the package is necessary;
4. follow existing project conventions.

Do not add dependencies for trivial functionality without justification.

---

## 13. Secrets and configuration

Never hard-code:

- API keys;
- passwords;
- access tokens;
- private credentials;
- production secrets.

Follow the repository's established environment-variable conventions.

Never expose secrets in content, source, logs, or reports.

---

## 14. Validation

Validation must match the change.

For code:

- lint;
- type checking;
- tests;
- build;
- framework-specific validation.

For content:

- frontmatter;
- MDX;
- rendering;
- links where relevant;
- metadata;
- content validation;
- project build when appropriate.

For configuration:

- affected configuration validation;
- relevant application checks.

Never claim a check passed unless it was actually executed.

---

## 15. Failure handling

If validation fails:

1. inspect the failure;
2. determine whether the current change caused it;
3. fix it if it belongs to the task;
4. rerun the relevant validation.

Do not hide failures.

Do not modify unrelated areas merely to make validation pass.

---

## 16. Destructive operations

Treat these as high-risk:

- deleting files;
- deleting articles;
- changing public URLs;
- mass rewriting content;
- overwriting user changes;
- changing production configuration.

Perform them only when explicitly authorized.

For large operations, prefer staged and recoverable workflows.

---

## 17. User changes

Do not overwrite or discard unrelated user changes.

Before broad modifications, inspect the current working tree when appropriate.

If requested work overlaps unclear uncommitted changes, stop and clarify rather than destroying them.

---

## 18. Persistent state

Persistent workflow state is a progress ledger, not a source of truth.

When using `.agents/state/`:

- verify the corresponding repository files;
- never assume state means a file currently exists;
- never mark work complete before validation;
- preserve recovery information;
- support interrupted execution.

Do not rely on conversational memory for long-running workflows.

---

## 19. Worker/controller separation

For sequential agent workflows:

### Controller responsibilities

The controller determines:

- which real repository item exists;
- which item should be processed next;
- workflow state;
- whether processing should continue;
- recovery and retry behavior.

### Worker responsibilities

The worker determines:

- how to perform the assigned task;
- how to research;
- how to modify the assigned item;
- whether the assigned item satisfies the quality gate;
- what validation was performed.

The worker must not select or process another article.

---

## 20. Completion report

Report:

1. what changed;
2. important files affected;
3. validation performed;
4. quality result;
5. unresolved concerns;
6. workflow status.

Never report speculation as fact.

---

## 21. Priority

When instructions conflict, use:

1. current user request;
2. platform and safety requirements;
3. actual repository implementation;
4. these agent instructions;
5. project context;
6. relevant skills;
7. general conventions.

When a conflict materially affects correctness, explain it instead of guessing.

---

## 22. Core principle

Optimize for:

> correctness, reader value, maintainability, and verifiability.

Do not optimize for:

> maximum generated content, maximum file changes, or maximum speed.