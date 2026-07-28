import "server-only";

import { cache } from "react";
import type { BusinessAsset } from "@/features/knowledge/domain/business-asset";
import {
  businessAssetRegistry,
  getBusinessAsset,
} from "@/features/knowledge/domain/business-asset";
import {
  createKnowledgeIndex,
  type KnowledgeIndex,
} from "@/features/knowledge/application/knowledge-index";
import {
  analyzeKnowledgeHealth,
  assertGovernanceReportIsValid,
  type KnowledgeGovernanceReport,
} from "@/features/knowledge/application/knowledge-governance";
import type { KnowledgeCollection } from "@/features/knowledge/domain/collection";
import {
  getCollectionDefinitionBySlug,
  knowledgeCollectionDefinitions,
} from "@/features/knowledge/domain/collection";
import type { KnowledgeDocument } from "@/features/knowledge/domain/document";
import type { KnowledgeDocumentSummary } from "@/features/knowledge/domain/document";
import { toDocumentSummary } from "@/features/knowledge/domain/document";
import type {
  RelatedDocument,
  ReferencingBusinessAsset,
} from "@/features/knowledge/domain/knowledge-relationship";
import type { NavigationTreeItem } from "@/features/knowledge/domain/navigation";
import { createNavigationTree } from "@/features/knowledge/domain/navigation";
import {
  ResourceKnowledgeRepository,
  type KnowledgeRepository,
} from "@/features/knowledge/repositories/knowledge-repository";
import { validateSlug } from "@/features/knowledge/security/path-policy";

export type KnowledgeService = {
  listPublicDocuments(): Promise<KnowledgeDocument[]>;
  listPublicBusinessAssets(): Promise<BusinessAsset[]>;
  getPublicBusinessAsset(
    assetId: string,
  ): Promise<BusinessAsset | undefined>;
  getPublicBusinessAssetDocument(
    assetId: string,
  ): Promise<KnowledgeDocument | undefined>;
  getRelatedDocuments(slug: string): Promise<RelatedDocument[]>;
  getParentDocuments(slug: string): Promise<KnowledgeDocumentSummary[]>;
  getChildDocuments(slug: string): Promise<KnowledgeDocumentSummary[]>;
  getBusinessAssetsUsingDocument(
    slug: string,
  ): Promise<ReferencingBusinessAsset[]>;
  getCollectionNeighbours(slug: string): Promise<{
    previous?: KnowledgeDocumentSummary;
    next?: KnowledgeDocumentSummary;
  }>;
  getGovernanceReport(): Promise<KnowledgeGovernanceReport>;
  listPublicCollections(): Promise<KnowledgeCollection[]>;
  getPublicCollection(
    collectionSlug: string,
  ): Promise<KnowledgeCollection | undefined>;
  getPublicDocument(slug: string): Promise<KnowledgeDocument | undefined>;
  getAdjacentPublicDocuments(slug: string): Promise<{
    previous?: KnowledgeDocumentSummary;
    next?: KnowledgeDocumentSummary;
  }>;
  getNavigationTree(): Promise<NavigationTreeItem[]>;
};

class RepositoryKnowledgeService implements KnowledgeService {
  private knowledgeIndexPromise: Promise<KnowledgeIndex> | undefined;

  constructor(private readonly repository: KnowledgeRepository) {}

  async listPublicDocuments(): Promise<KnowledgeDocument[]> {
    const documents = await this.repository.listDocuments();

    return documents.filter(
      (document) => document.metadata.visibility === "public",
    );
  }

  async listPublicBusinessAssets(): Promise<BusinessAsset[]> {
    return businessAssetRegistry.filter((asset) => asset.visibility === "public");
  }

  async getPublicBusinessAsset(
    assetId: string,
  ): Promise<BusinessAsset | undefined> {
    const asset = getBusinessAsset(assetId);

    if (!asset || asset.visibility !== "public") {
      return undefined;
    }

    return asset;
  }

  async getPublicBusinessAssetDocument(
    assetId: string,
  ): Promise<KnowledgeDocument | undefined> {
    const asset = await this.getPublicBusinessAsset(assetId);

    if (!asset) {
      return undefined;
    }

    return this.getPublicDocument(asset.sourceDocumentSlug);
  }

  async getRelatedDocuments(slug: string): Promise<RelatedDocument[]> {
    validateSlug(slug);

    return (await this.getKnowledgeIndex()).getRelatedDocuments(slug);
  }

  async getParentDocuments(slug: string): Promise<KnowledgeDocumentSummary[]> {
    validateSlug(slug);

    return (await this.getKnowledgeIndex()).getParentDocuments(slug);
  }

  async getChildDocuments(slug: string): Promise<KnowledgeDocumentSummary[]> {
    validateSlug(slug);

    return (await this.getKnowledgeIndex()).getChildDocuments(slug);
  }

  async getBusinessAssetsUsingDocument(
    slug: string,
  ): Promise<ReferencingBusinessAsset[]> {
    validateSlug(slug);

    return (await this.getKnowledgeIndex()).getBusinessAssetsUsingDocument(slug);
  }

  async getCollectionNeighbours(slug: string): Promise<{
    previous?: KnowledgeDocumentSummary;
    next?: KnowledgeDocumentSummary;
  }> {
    validateSlug(slug);

    return (await this.getKnowledgeIndex()).getCollectionNeighbours(slug);
  }

  async getGovernanceReport(): Promise<KnowledgeGovernanceReport> {
    const [documents, collections, businessAssets, knowledgeIndex] =
      await Promise.all([
        this.repository.listDocuments(),
        this.listPublicCollections(),
        this.listPublicBusinessAssets(),
        this.getKnowledgeIndex(),
      ]);
    const report = analyzeKnowledgeHealth({
      documents,
      collections,
      collectionDefinitions: knowledgeCollectionDefinitions,
      businessAssets,
      knowledgeIndex,
    });

    assertGovernanceReportIsValid(report);

    return report;
  }

  async listPublicCollections(): Promise<KnowledgeCollection[]> {
    const documents = await this.repository.listPublicDocumentSummaries();

    return knowledgeCollectionDefinitions
      .map((collection) => ({
        id: collection.id,
        slug: collection.slug,
        title: collection.title,
        description: collection.description,
        documents: sortDocuments(
          documents.filter((document) => document.collection === collection.id),
        ),
      }))
      .filter((collection) => collection.documents.length > 0);
  }

  async getPublicCollection(
    collectionSlug: string,
  ): Promise<KnowledgeCollection | undefined> {
    validateSlug(collectionSlug);

    const collectionDefinition = getCollectionDefinitionBySlug(collectionSlug);

    if (!collectionDefinition) {
      return undefined;
    }

    const collections = await this.listPublicCollections();

    return collections.find(
      (collection) => collection.id === collectionDefinition.id,
    );
  }

  async getPublicDocument(slug: string): Promise<KnowledgeDocument | undefined> {
    validateSlug(slug);

    return this.repository.getDocumentBySlug(slug);
  }

  async getAdjacentPublicDocuments(slug: string): Promise<{
    previous?: KnowledgeDocumentSummary;
    next?: KnowledgeDocumentSummary;
  }> {
    validateSlug(slug);

    const documents = sortDocuments(
      (await this.listPublicDocuments()).map(toDocumentSummary),
    );
    const currentIndex = documents.findIndex((document) => document.slug === slug);

    if (currentIndex === -1) {
      return {};
    }

    return {
      previous: documents[currentIndex - 1],
      next: documents[currentIndex + 1],
    };
  }

  async getNavigationTree(): Promise<NavigationTreeItem[]> {
    const summaries = await this.repository.listPublicDocumentSummaries();

    return createNavigationTree(summaries);
  }

  private async getKnowledgeIndex(): Promise<KnowledgeIndex> {
    this.knowledgeIndexPromise ??= this.createKnowledgeIndex();

    return this.knowledgeIndexPromise;
  }

  private async createKnowledgeIndex(): Promise<KnowledgeIndex> {
    const documents = await this.repository.listDocuments();

    return createKnowledgeIndex(documents, await this.listPublicBusinessAssets());
  }
}

export const getKnowledgeService = cache((): KnowledgeService => {
  return new RepositoryKnowledgeService(new ResourceKnowledgeRepository());
});

function sortDocuments<TDocument extends KnowledgeDocumentSummary>(
  documents: TDocument[],
) {
  return [...documents].sort((left, right) => {
    if (left.collection !== right.collection) {
      return left.collection.localeCompare(right.collection);
    }

    return left.order - right.order || left.title.localeCompare(right.title);
  });
}
