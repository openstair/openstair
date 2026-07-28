import type { KnowledgeDocument } from "@/features/knowledge/domain/document";

export type DocumentExporter = {
  export(document: KnowledgeDocument, format: string): Promise<Uint8Array>;
};

