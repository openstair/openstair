import type { Resource } from "@/features/knowledge/resources/resource-provider";
import type { KnowledgeDocument } from "@/features/knowledge/domain/document";

export type DocumentFormat = {
  readonly id: KnowledgeDocument["format"];
  parse(resource: Resource): KnowledgeDocument;
};

