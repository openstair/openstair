---
title: OKP Foundation Architecture
description: Records the foundation decision for building the OpenStair Knowledge Platform inside the existing website.
collection: architecture
order: 1
visibility: public
updatedAt: 2026-07-28
---

# OKP Foundation Architecture

## Decision

OpenStair Technologies will maintain company documentation in the OpenStair Knowledge Platform inside the existing website repository.

Canonical documentation lives in `docs/`. Platform implementation remains isolated in `features/knowledge`. Public documentation is rendered under `/docs`.

## Reason

The company needs a durable replacement for scattered documents and informal notes. Keeping documentation in the repository gives the team version control, review history, consistent structure, and a single source of truth.

The platform is part of the existing website because documentation and public company knowledge should be easy to publish professionally without maintaining a separate system.

## Alternatives Considered

- Continuing with external documents
- Creating a separate documentation site
- Hardcoding documentation in application routes
- Using raw MDX as the first content format

## Trade-Offs

The chosen approach keeps the platform simple and static-first. It also requires discipline around metadata, naming, review, and ownership.

Markdown V1 is intentionally limited. This reduces rendering and security risk while the knowledge base is young.

## Future Impact

The resource provider, document format, repository, validation, and rendering boundaries allow the platform to support search, exports, additional formats, and internal documentation later without changing the existing website architecture.
