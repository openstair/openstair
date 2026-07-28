import "server-only";

import type {
  KnowledgeDocument,
  KnowledgeDocumentSummary,
} from "@/features/knowledge/domain/document";
import {
  toDocumentSummary,
} from "@/features/knowledge/domain/document";
import type { DocumentFormat } from "@/features/knowledge/formats/document-format";
import { MarkdownV1DocumentFormat } from "@/features/knowledge/formats/markdown-v1";
import { FilesystemResourceProvider } from "@/features/knowledge/resources/filesystem-resource-provider";
import type { ResourceProvider } from "@/features/knowledge/resources/resource-provider";
import { assertRenderableMarkdown } from "@/features/knowledge/security/rendering-policy";
import { validateKnowledgeDocuments } from "@/features/knowledge/validation/document-validation";

export type KnowledgeRepository = {
  listDocuments(): Promise<KnowledgeDocument[]>;
  listPublicDocumentSummaries(): Promise<KnowledgeDocumentSummary[]>;
  getDocumentBySlug(slug: string): Promise<KnowledgeDocument | undefined>;
};

export class ResourceKnowledgeRepository implements KnowledgeRepository {
  private documentsPromise: Promise<KnowledgeDocument[]> | undefined;

  constructor(
    private readonly resourceProvider: ResourceProvider =
      new FilesystemResourceProvider(),
    private readonly documentFormat: DocumentFormat =
      new MarkdownV1DocumentFormat(),
  ) {}

  async listDocuments(): Promise<KnowledgeDocument[]> {
    this.documentsPromise ??= this.loadDocuments();

    return this.documentsPromise;
  }

  private async loadDocuments(): Promise<KnowledgeDocument[]> {
    const resources = await this.resourceProvider.listResources();
    const documents = resources.map((resource) => {
      const document = this.documentFormat.parse(resource);
      assertRenderableMarkdown(document.body, document.resourceId);

      return document;
    });

    validateKnowledgeDocuments(documents);

    return documents.sort((left, right) => {
      if (left.metadata.collection !== right.metadata.collection) {
        return left.metadata.collection.localeCompare(right.metadata.collection);
      }

      return (
        left.metadata.order - right.metadata.order ||
        left.metadata.title.localeCompare(right.metadata.title)
      );
    });
  }

  async listPublicDocumentSummaries(): Promise<KnowledgeDocumentSummary[]> {
    const documents = await this.listDocuments();

    return documents
      .filter((document) => document.metadata.visibility === "public")
      .map(toDocumentSummary);
  }

  async getDocumentBySlug(slug: string): Promise<KnowledgeDocument | undefined> {
    const documents = await this.listDocuments();

    return documents.find(
      (document) =>
        document.slug === slug && document.metadata.visibility === "public",
    );
  }
}
