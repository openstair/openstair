import type { KnowledgeDocument } from "@/features/knowledge/domain/document";

export type SearchIndex = {
  index(documents: KnowledgeDocument[]): Promise<void>;
};

