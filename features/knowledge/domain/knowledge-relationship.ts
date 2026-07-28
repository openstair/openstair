import type { BusinessAsset } from "@/features/knowledge/domain/business-asset";
import type { KnowledgeDocumentSummary } from "@/features/knowledge/domain/document";

export type KnowledgeRelationshipKind =
  | "asset-source"
  | "asset-reference"
  | "collection-parent"
  | "collection-child"
  | "cross-reference"
  | "collection-neighbour";

export type KnowledgeRelationship = {
  fromSlug: string;
  toSlug: string;
  kind: KnowledgeRelationshipKind;
  assetId?: string;
};

export type RelatedDocument = KnowledgeDocumentSummary & {
  reason: KnowledgeRelationshipKind | "same-collection";
};

export type ReferencingBusinessAsset = Pick<
  BusinessAsset,
  "id" | "title" | "description" | "sourceDocumentSlug"
>;

