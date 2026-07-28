import type {
  KnowledgeDocument,
  KnowledgeDocumentMetadata,
} from "@/features/knowledge/domain/document";
import { visibilityValues } from "@/features/knowledge/domain/visibility";
import {
  KnowledgeValidationError,
  type ValidationDiagnostic,
} from "@/features/knowledge/validation/diagnostics";

const requiredStringFields = [
  "title",
  "description",
  "collection",
  "updatedAt",
] satisfies (keyof KnowledgeDocumentMetadata)[];

export function validateKnowledgeDocuments(documents: KnowledgeDocument[]) {
  const diagnostics = documents.flatMap(validateKnowledgeDocument);
  const seenSlugs = new Map<string, string>();

  documents.forEach((document) => {
    const existingResourceId = seenSlugs.get(document.slug);

    if (existingResourceId) {
      diagnostics.push({
        resourceId: document.resourceId,
        message: `Duplicate slug "${document.slug}" also used by ${existingResourceId}.`,
      });
    }

    seenSlugs.set(document.slug, document.resourceId);
  });

  if (diagnostics.length > 0) {
    throw new KnowledgeValidationError(diagnostics);
  }
}

function validateKnowledgeDocument(
  document: KnowledgeDocument,
): ValidationDiagnostic[] {
  const diagnostics: ValidationDiagnostic[] = [];

  requiredStringFields.forEach((field) => {
    if (!isNonEmptyString(document.metadata[field])) {
      diagnostics.push({
        resourceId: document.resourceId,
        message: `Missing required metadata field "${field}".`,
      });
    }
  });

  if (!Number.isInteger(document.metadata.order) || document.metadata.order < 0) {
    diagnostics.push({
      resourceId: document.resourceId,
      message: "Metadata field \"order\" must be a non-negative integer.",
    });
  }

  if (!visibilityValues.includes(document.metadata.visibility)) {
    diagnostics.push({
      resourceId: document.resourceId,
      message: `Metadata field "visibility" must be one of: ${visibilityValues.join(", ")}.`,
    });
  }

  if (!isIsoDate(document.metadata.updatedAt)) {
    diagnostics.push({
      resourceId: document.resourceId,
      message: "Metadata field \"updatedAt\" must use YYYY-MM-DD format.",
    });
  }

  if (!document.body.trim()) {
    diagnostics.push({
      resourceId: document.resourceId,
      message: "Document body must not be empty.",
    });
  }

  return diagnostics;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

