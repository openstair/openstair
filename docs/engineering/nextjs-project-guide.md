---
title: Next.js Project Guide
description: Canonical engineering guidance for working in this OpenStair Next.js project.
collection: engineering
order: 2
visibility: public
updatedAt: 2026-07-28
---

# Next.js Project Guide

This OpenStair website uses a current Next.js version with App Router conventions.

Engineers working in this repository must verify framework behavior against the local Next.js documentation included in `node_modules/next/dist/docs/` before making framework-sensitive changes.

## Project Rule

Do not assume older Next.js APIs, file conventions, or behavior are still correct.

This project may use APIs and conventions that differ from older examples, tutorials, or prior experience.

## Expected Practice

- Read relevant local Next.js documentation before changing routing, metadata, rendering, caching, or build behavior.
- Prefer existing project patterns unless there is a clear reason to change them.
- Keep documentation platform changes isolated from the public website.
- Run lint and build after changes that affect routes, rendering, metadata, or documentation generation.

## Relationship To OKP

This guide is canonical engineering knowledge for this repository. It replaces informal reminders and should be updated when project conventions change.
