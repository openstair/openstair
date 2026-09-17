# OpenStair Technologies — Gemini Project Context

This file is the primary project-level context entry point for Gemini Code Assist.

OpenStair Technologies is a production Next.js website and content platform. The repository contains application code, editorial content, documentation, assets, SEO infrastructure, and supporting configuration.

## Context hierarchy

For non-trivial work in this repository:

1. Read this file.
2. Read `.agents/AGENTS.md` for project-wide agent and engineering rules.
3. Read `.agents/PROJECT_CONTEXT.md` when project architecture, conventions, or existing implementation details are relevant.
4. Read the relevant skill under `.agents/skills/` when the task corresponds to an established workflow.
5. Inspect the actual repository before making implementation assumptions.

The `.agents/` directory contains supporting project instructions, context, skills, workflow definitions, and persistent workflow state.

These files do not replace the repository as the source of truth.

## Source of truth

The current repository implementation is authoritative.

When documentation, previous discussions, generated summaries, or assumptions conflict with the actual repository:

- prefer the current repository;
- identify the discrepancy when it materially affects the task;
- do not silently make unrelated changes to documentation.

For content discovery, use the actual filesystem and current project implementation rather than relying on stale inventories.

## General working principle

Treat every task as production engineering work.

Before making changes:

- understand the requested outcome;
- inspect the relevant implementation;
- identify the smallest appropriate scope;
- preserve unrelated behavior;
- follow established project conventions;
- validate the result.

Do not make speculative changes merely because they appear useful.

## Content quality

OpenStair publishes public-facing editorial and technical content.

Content work must prioritize:

- usefulness;
- originality;
- accuracy;
- specificity;
- sufficient depth;
- clarity;
- reader value.

Do not optimize content for word count alone.

Do not generate repetitive, generic, or boilerplate material merely to increase article length.

Existing articles are individual editorial assets and should normally be revised one at a time for substantial semantic content work.

## Change discipline

Do not:

- rewrite unrelated files;
- change public URLs or slugs without authorization;
- remove functionality without authorization;
- replace working architecture unnecessarily;
- invent project facts;
- invent company information;
- invent services or integrations;
- invent analytics or tracking behavior;
- invent legal or policy claims;
- claim validation that was not performed.

## Validation

A task is not complete merely because files were modified.

Use the repository's relevant validation commands when appropriate.

Report only validation that was actually performed.

Never fabricate test, build, browser, deployment, or quality-review results.

## Persistent workflow state

When a workflow uses `.agents/state/`, treat that state as a record of workflow progress only.

The actual repository remains authoritative for:

- which files exist;
- which articles exist;
- their current content;
- their current metadata.

Never treat workflow state as a replacement for repository inspection.