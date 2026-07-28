import "server-only";

import type {
  BusinessAsset,
} from "@/features/knowledge/domain/business-asset";
import type {
  KnowledgeDocument,
  KnowledgeDocumentSummary,
} from "@/features/knowledge/domain/document";
import { toDocumentSummary } from "@/features/knowledge/domain/document";
import type {
  KnowledgeRelationship,
  RelatedDocument,
  ReferencingBusinessAsset,
} from "@/features/knowledge/domain/knowledge-relationship";
import {
  KnowledgeValidationError,
  type ValidationDiagnostic,
} from "@/features/knowledge/validation/diagnostics";

export type KnowledgeIndex = {
  getRelatedDocuments(slug: string, limit?: number): RelatedDocument[];
  getParentDocuments(slug: string): KnowledgeDocumentSummary[];
  getChildDocuments(slug: string): KnowledgeDocumentSummary[];
  getBusinessAssetsUsingDocument(slug: string): ReferencingBusinessAsset[];
  getCollectionNeighbours(slug: string): {
    previous?: KnowledgeDocumentSummary;
    next?: KnowledgeDocumentSummary;
  };
  getRelationships(): KnowledgeRelationship[];
};

export function createKnowledgeIndex(
  documents: KnowledgeDocument[],
  businessAssets: BusinessAsset[],
): KnowledgeIndex {
  const publicDocuments = documents.filter(
    (document) => document.metadata.visibility === "public",
  );
  const summaries = sortDocuments(publicDocuments.map(toDocumentSummary));
  const documentBySlug = new Map(
    publicDocuments.map((document) => [document.slug, document]),
  );
  const summaryBySlug = new Map(summaries.map((summary) => [summary.slug, summary]));
  const assetSourceByDocumentSlug = new Map<string, BusinessAsset>();
  const relationships = buildRelationships(publicDocuments, businessAssets);

  businessAssets.forEach((asset) => {
    assetSourceByDocumentSlug.set(asset.sourceDocumentSlug, asset);
  });

  validateRelationships(relationships, documentBySlug, businessAssets);

  return {
    getRelatedDocuments(slug: string, limit = 6) {
      const document = documentBySlug.get(slug);

      if (!document) {
        return [];
      }

      const weightedResults = new Map<
        string,
        { summary: KnowledgeDocumentSummary; score: number; reason: RelatedDocument["reason"] }
      >();

      const addRelatedDocument = (
        relatedSlug: string,
        score: number,
        reason: RelatedDocument["reason"],
      ) => {
        if (relatedSlug === slug) {
          return;
        }

        const summary = summaryBySlug.get(relatedSlug);

        if (!summary) {
          return;
        }

        const existing = weightedResults.get(relatedSlug);

        if (!existing || score > existing.score) {
          weightedResults.set(relatedSlug, { summary, score, reason });
        }
      };

      relationships.forEach((relationship) => {
        if (relationship.fromSlug === slug) {
          addRelatedDocument(relationship.toSlug, scoreRelationship(relationship.kind), relationship.kind);
        }

        if (relationship.toSlug === slug) {
          addRelatedDocument(relationship.fromSlug, scoreRelationship(relationship.kind), relationship.kind);
        }
      });

      summaries
        .filter((summary) => summary.collection === document.metadata.collection)
        .forEach((summary) => addRelatedDocument(summary.slug, 20, "same-collection"));

      const assetsUsingDocument = getBusinessAssetsUsingSlug(
        slug,
        relationships,
        businessAssets,
      );

      assetsUsingDocument.forEach((asset) => {
        relationships
          .filter((relationship) => relationship.assetId === asset.id)
          .forEach((relationship) => {
            addRelatedDocument(
              relationship.fromSlug,
              35,
              relationship.kind,
            );
            addRelatedDocument(
              relationship.toSlug,
              35,
              relationship.kind,
            );
          });
      });

      return Array.from(weightedResults.values())
        .sort((left, right) => {
          if (left.score !== right.score) {
            return right.score - left.score;
          }

          return left.summary.order - right.summary.order ||
            left.summary.title.localeCompare(right.summary.title);
        })
        .slice(0, limit)
        .map((result) => ({
          ...result.summary,
          reason: result.reason,
        }));
    },

    getParentDocuments(slug: string) {
      return relationships
        .filter(
          (relationship) =>
            relationship.kind === "collection-parent" &&
            relationship.toSlug === slug,
        )
        .map((relationship) => summaryBySlug.get(relationship.fromSlug))
        .filter(isDefined);
    },

    getChildDocuments(slug: string) {
      return relationships
        .filter(
          (relationship) =>
            relationship.kind === "collection-child" &&
            relationship.fromSlug === slug,
        )
        .map((relationship) => summaryBySlug.get(relationship.toSlug))
        .filter(isDefined);
    },

    getBusinessAssetsUsingDocument(slug: string) {
      return getBusinessAssetsUsingSlug(slug, relationships, businessAssets);
    },

    getCollectionNeighbours(slug: string) {
      const summary = summaryBySlug.get(slug);

      if (!summary) {
        return {};
      }

      const collectionDocuments = summaries.filter(
        (document) => document.collection === summary.collection,
      );
      const index = collectionDocuments.findIndex(
        (document) => document.slug === slug,
      );

      return {
        previous: collectionDocuments[index - 1],
        next: collectionDocuments[index + 1],
      };
    },

    getRelationships() {
      return relationships;
    },
  };
}

function buildRelationships(
  documents: KnowledgeDocument[],
  businessAssets: BusinessAsset[],
) {
  const relationships: KnowledgeRelationship[] = [];
  const documentBySlug = new Map(documents.map((document) => [document.slug, document]));

  documents.forEach((document) => {
    documents.forEach((targetDocument) => {
      if (document.slug === targetDocument.slug) {
        return;
      }

      if (referencesTitle(document.body, targetDocument.metadata.title)) {
        relationships.push({
          fromSlug: document.slug,
          toSlug: targetDocument.slug,
          kind: "cross-reference",
        });
      }
    });
  });

  groupByCollection(documents).forEach((collectionDocuments) => {
    collectionDocuments.forEach((document, index) => {
      const previous = collectionDocuments[index - 1];
      const next = collectionDocuments[index + 1];

      if (previous) {
        relationships.push({
          fromSlug: document.slug,
          toSlug: previous.slug,
          kind: "collection-neighbour",
        });
      }

      if (next) {
        relationships.push({
          fromSlug: document.slug,
          toSlug: next.slug,
          kind: "collection-neighbour",
        });
      }
    });
  });

  businessAssets.forEach((asset) => {
    relationships.push({
      fromSlug: asset.sourceDocumentSlug,
      toSlug: asset.sourceDocumentSlug,
      kind: "asset-source",
      assetId: asset.id,
    });

    const assetDocument = documentBySlug.get(asset.sourceDocumentSlug);

    if (!assetDocument) {
      return;
    }

    documents.forEach((targetDocument) => {
      if (targetDocument.slug === asset.sourceDocumentSlug) {
        return;
      }

      if (referencesTitle(assetDocument.body, targetDocument.metadata.title)) {
        relationships.push({
          fromSlug: asset.sourceDocumentSlug,
          toSlug: targetDocument.slug,
          kind: "asset-reference",
          assetId: asset.id,
        });
      }
    });
  });

  return dedupeRelationships(relationships);
}

function validateRelationships(
  relationships: KnowledgeRelationship[],
  documentBySlug: Map<string, KnowledgeDocument>,
  businessAssets: BusinessAsset[],
) {
  const diagnostics: ValidationDiagnostic[] = [];
  const assetById = new Map(businessAssets.map((asset) => [asset.id, asset]));

  businessAssets.forEach((asset) => {
    if (!documentBySlug.has(asset.sourceDocumentSlug)) {
      diagnostics.push({
        resourceId: `business-asset:${asset.id}`,
        message: `Business asset source document "${asset.sourceDocumentSlug}" does not exist.`,
      });
    }
  });

  relationships.forEach((relationship) => {
    if (!documentBySlug.has(relationship.fromSlug)) {
      diagnostics.push({
        resourceId: `relationship:${relationship.kind}`,
        message: `Relationship source document "${relationship.fromSlug}" does not exist.`,
      });
    }

    if (!documentBySlug.has(relationship.toSlug)) {
      diagnostics.push({
        resourceId: `relationship:${relationship.kind}`,
        message: `Relationship target document "${relationship.toSlug}" does not exist.`,
      });
    }

    if (relationship.assetId && !assetById.has(relationship.assetId)) {
      diagnostics.push({
        resourceId: `relationship:${relationship.kind}`,
        message: `Relationship asset "${relationship.assetId}" does not exist.`,
      });
    }
  });

  if (diagnostics.length > 0) {
    throw new KnowledgeValidationError(diagnostics);
  }
}

function getBusinessAssetsUsingSlug(
  slug: string,
  relationships: KnowledgeRelationship[],
  businessAssets: BusinessAsset[],
): ReferencingBusinessAsset[] {
  const assetIds = new Set(
    relationships
      .filter(
        (relationship) =>
          relationship.assetId &&
          (relationship.fromSlug === slug || relationship.toSlug === slug),
      )
      .map((relationship) => relationship.assetId)
      .filter(isDefined),
  );

  return businessAssets
    .filter((asset) => assetIds.has(asset.id))
    .map((asset) => ({
      id: asset.id,
      title: asset.title,
      description: asset.description,
      sourceDocumentSlug: asset.sourceDocumentSlug,
    }));
}

function referencesTitle(body: string, title: string) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^A-Za-z0-9])${escapedTitle}([^A-Za-z0-9]|$)`, "i");

  return pattern.test(body);
}

function scoreRelationship(kind: KnowledgeRelationship["kind"]) {
  if (kind === "asset-reference" || kind === "asset-source") {
    return 60;
  }

  if (kind === "cross-reference") {
    return 50;
  }

  if (kind === "collection-neighbour") {
    return 30;
  }

  return 10;
}

function sortDocuments<TDocument extends KnowledgeDocument | KnowledgeDocumentSummary>(
  documents: TDocument[],
) {
  return [...documents].sort((left, right) => {
    if ("metadata" in left && "metadata" in right) {
      if (left.metadata.collection !== right.metadata.collection) {
        return left.metadata.collection.localeCompare(right.metadata.collection);
      }

      return (
        left.metadata.order - right.metadata.order ||
        left.metadata.title.localeCompare(right.metadata.title)
      );
    }

    if ("collection" in left && "collection" in right) {
      if (left.collection !== right.collection) {
        return left.collection.localeCompare(right.collection);
      }

      return left.order - right.order || left.title.localeCompare(right.title);
    }

    return 0;
  });
}

function groupByCollection(documents: KnowledgeDocument[]) {
  const groups = documents.reduce<Map<string, KnowledgeDocument[]>>(
    (result, document) => {
      const collectionDocuments = result.get(document.metadata.collection) ?? [];
      result.set(document.metadata.collection, [...collectionDocuments, document]);

      return result;
    },
    new Map(),
  );

  return Array.from(groups.values()).map(sortDocuments);
}

function dedupeRelationships(relationships: KnowledgeRelationship[]) {
  const seen = new Set<string>();

  return relationships.filter((relationship) => {
    const key = [
      relationship.fromSlug,
      relationship.toSlug,
      relationship.kind,
      relationship.assetId ?? "",
    ].join(":");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function isDefined<TValue>(value: TValue | undefined): value is TValue {
  return value !== undefined;
}
