# OpenStair Blog Revision State Architecture

## Purpose

This directory stores persistent workflow state for the sequential blog-revision process across the ~100 articles in `content/blog/`.

The state infrastructure exists to ensure the editorial workflow reliably supports:
- **Crash and restart recovery**: Survives agent session restarts, system reboots, and network timeouts.
- **Context boundary enforcement**: Allows processing articles sequentially across separate, clean worker contexts without token accumulation.
- **Auditing and human calibration**: Records worker findings, validation outcomes, and human review decisions.
- **Safe next-article selection**: Prevents duplicate processing or skipped articles.

---

## 1. Source of Truth

The actual repository is always the authoritative source of truth.

For blog discovery:
```text
content/blog/
```

- If an article exists on disk in `content/blog/`, it is a candidate for workflow management.
- If an article does not exist on disk, no entry in a workflow state file can make it exist.
- Workflow state files are progress records only and never replace the filesystem.

---

## 2. State Model

Every article in the revision workflow transitions through a well-defined lifecycle:

```
                  ┌───────────────┐
                  │    pending    │
                  └───────┬───────┘
                          │ (Worker dispatched)
                          ▼
                  ┌───────────────┐
                  │  in_progress  │
                  └───────┬───────┘
                          │
          ┌───────────────┼───────────────┐
          │ (Passes gate) │ (Needs eyes)  │ (Fails validation)
          ▼               ▼               ▼
   ┌──────────────┐ ┌───────────┐  ┌────────────┐
   │  agent_pass  │ │  review   │  │   failed   │
   └──────┬───────┘ └─────┬─────┘  └─────┬──────┘
          │               │              │
          │ (Human review)│ (Human edit) │ (Re-queue after fix)
          ▼               ▼              │
   ┌────────────────────────────┐        │
   │       human_approved       │        │
   └────────────────────────────┘        │
                  ▲                      │
                  └──────────────────────┘
```

### State Definitions

1. **`pending`**: The article exists in `content/blog/` and is eligible for processing, but no worker has been dispatched.
2. **`in_progress`**: An isolated worker is actively inspecting, researching, or modifying this specific article. Includes a timestamp and worker identifier for lock management.
3. **`agent_pass`**: The worker completed editorial revision, successfully passed single-article deterministic validation, and scored `PASS` on the [Quality Rubric](../../skills/blog-content-revision/references/quality-rubric.md).
4. **`review`**: The worker completed revision and validation, but flagged specific uncertainties, nuanced claims, or edge cases requiring human editorial discretion.
5. **`failed`**: The worker encountered unresolvable validation errors (e.g. broken frontmatter, missing images) or scored `FAIL` on the quality rubric. Requires developer or editorial attention before re-queueing.
6. **`human_approved`**: A human reviewer has explicitly inspected the git diff, validated the article, and signed off on the revision.

### Core Invariant: `agent_pass != human_approved`

A status of `agent_pass` reflects an automated assessment by an AI worker. It does **not** equal human editorial sign-off. During initial calibration (the first 5–10 articles), every article must achieve `human_approved` before the workflow proceeds autonomously.

---

## 3. State Ledger Specification (Future Initialization)

When initialized (after calibration), the workflow will record state in a deterministic JSON ledger (`manifest.json`):

```json
{
  "version": "1.0",
  "workflow": "blog-content-revision",
  "updated_at": "2026-09-14T00:00:00.000Z",
  "articles": {
    "flutter-performance-production-apps": {
      "slug": "flutter-performance-production-apps",
      "path": "content/blog/flutter-performance-production-apps.mdx",
      "status": "pending",
      "worker_id": null,
      "started_at": null,
      "completed_at": null,
      "validation_result": null,
      "quality_gate": null,
      "human_reviewed_by": null,
      "human_reviewed_at": null,
      "notes": []
    }
  }
}
```

*Note: In this architectural repair phase, `manifest.json` is NOT yet created or populated.*

---

## 4. Crash Recovery & Resilience Rules

1. **Stale Lock Clearing**: If a worker crashes or an agent session is terminated unexpectedly, an article may remain in `in_progress`. A recovery check will identify any `in_progress` entry older than a configurable threshold (e.g. 30 minutes) and safely return it to `pending`.
2. **Idempotent Re-runs**: Re-dispatching an article in `pending`, `failed`, or `review` starts a clean, fresh isolated worker session without leftover context.
3. **Git Cleanliness**: Before a worker begins, the working tree for `content/blog/<slug>.mdx` should be verified as clean.

---

## 5. Next Eligible Article Selection Protocol

When an orchestration agent or future controller requests the next task:
1. Scan the ledger for the first entry with `status: "pending"`.
2. Verify that the file actually exists at `content/blog/<slug>.mdx`.
3. Atomically transition the status to `in_progress` with `started_at` timestamp.
4. Pass the slug to the isolated worker.
5. Wait for worker completion before selecting any subsequent article.