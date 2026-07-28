import type { Visibility } from "@/features/knowledge/domain/visibility";

export const documentFormatVersions = ["markdown-v1"] as const;

export type DocumentFormatVersion = (typeof documentFormatVersions)[number];

export type KnowledgeDocumentMetadata = {
  title: string;
  description: string;
  collection: string;
  order: number;
  visibility: Visibility;
  updatedAt: string;
  version?: string;
};

export type KnowledgeDocument = {
  slug: string;
  resourceId: string;
  format: DocumentFormatVersion;
  metadata: KnowledgeDocumentMetadata;
  body: string;
};

export type KnowledgeDocumentSummary = {
  slug: string;
  title: string;
  description: string;
  collection: string;
  order: number;
  visibility: Visibility;
  updatedAt: string;
};

export function toDocumentSummary(
  document: KnowledgeDocument,
): KnowledgeDocumentSummary {
  return {
    slug: document.slug,
    title: document.metadata.title,
    description: document.metadata.description,
    collection: document.metadata.collection,
    order: document.metadata.order,
    visibility: document.metadata.visibility,
    updatedAt: document.metadata.updatedAt,
  };
}

