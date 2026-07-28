import "server-only";

import type { BusinessAsset } from "@/features/knowledge/domain/business-asset";
import type {
  KnowledgeCollection,
  KnowledgeCollectionDefinition,
} from "@/features/knowledge/domain/collection";
import type { KnowledgeDocument } from "@/features/knowledge/domain/document";
import type { KnowledgeIndex } from "@/features/knowledge/application/knowledge-index";
import type { KnowledgeRelationship } from "@/features/knowledge/domain/knowledge-relationship";

export type GovernanceSeverity = "error" | "warning";

export type GovernanceDiagnostic = {
  severity: GovernanceSeverity;
  scope: "document" | "collection" | "business-asset" | "relationship";
  subject: string;
  message: string;
};

export type CollectionHealth = {
  id: string;
  title: string;
  documentCount: number;
  lastUpdatedDocument?: {
    title: string;
    slug: string;
    updatedAt: string;
  };
  documentsMissingMetadata: string[];
  orphanedDocuments: string[];
  documentsWithoutRelationships: string[];
  dependentBusinessAssets: string[];
};

export type CoverageItem = {
  label: string;
  satisfied: boolean;
  matchedSlug?: string;
};

export type CoverageSection = {
  title: string;
  items: CoverageItem[];
};

export type KnowledgeGovernanceReport = {
  totalDocuments: number;
  totalCollections: number;
  totalBusinessAssets: number;
  relationshipCount: number;
  orphanedDocuments: string[];
  validationStatus: "passing" | "failing";
  diagnostics: GovernanceDiagnostic[];
  collectionHealth: CollectionHealth[];
  coverage: CoverageSection[];
};

const requiredMetadataFields = [
  "title",
  "description",
  "collection",
  "order",
  "visibility",
  "updatedAt",
] as const;

const coverageDefinitions = [
  {
    title: "Company",
    items: [
      { label: "Mission", slug: "company/mission" },
      { label: "Vision", slug: "company/vision" },
      { label: "Values", slug: "company/core-values" },
      {
        label: "Engineering Philosophy",
        slug: "company/engineering-philosophy",
      },
      { label: "Why OpenStair", slug: "company/why-openstair" },
      { label: "Technology Expertise", slug: "company/technology-expertise" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Company Profile", slug: "business/company-profile" },
      { label: "Business Profile", slug: "business/business-profile" },
      {
        label: "Capability Statement",
        slug: "business/capability-statement",
      },
      { label: "Service Catalogue", slug: "business/service-catalogue" },
      { label: "Industries Served", slug: "business/industries-served" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Services Overview", slug: "services/index" },
      { label: "Flutter Development", slug: "services/flutter-development" },
      { label: "Web Development", slug: "services/web-development" },
      { label: "Backend Development", slug: "services/backend-development" },
    ],
  },
] as const;

export function analyzeKnowledgeHealth({
  documents,
  collections,
  collectionDefinitions,
  businessAssets,
  knowledgeIndex,
}: {
  documents: KnowledgeDocument[];
  collections: KnowledgeCollection[];
  collectionDefinitions: readonly KnowledgeCollectionDefinition[];
  businessAssets: BusinessAsset[];
  knowledgeIndex: KnowledgeIndex;
}): KnowledgeGovernanceReport {
  const diagnostics: GovernanceDiagnostic[] = [];
  const documentBySlug = new Map(
    documents.map((document) => [document.slug, document]),
  );
  const relationships = knowledgeIndex.getRelationships();
  const duplicateTitles = findDuplicates(
    documents.map((document) => document.metadata.title),
  );
  const duplicateDescriptions = findDuplicates(
    documents.map((document) => document.metadata.description),
  );
  const duplicateAssetIds = findDuplicates(
    businessAssets.map((asset) => asset.id),
  );

  duplicateTitles.forEach((title) => {
    diagnostics.push({
      severity: "error",
      scope: "document",
      subject: title,
      message: `Duplicate document title "${title}".`,
    });
  });

  duplicateDescriptions.forEach((description) => {
    diagnostics.push({
      severity: "warning",
      scope: "document",
      subject: description,
      message: "Duplicate document description detected.",
    });
  });

  duplicateAssetIds.forEach((assetId) => {
    diagnostics.push({
      severity: "error",
      scope: "business-asset",
      subject: assetId,
      message: `Duplicate business asset id "${assetId}".`,
    });
  });

  documents.forEach((document) => {
    const missingMetadata = getMissingMetadata(document);

    if (missingMetadata.length > 0) {
      diagnostics.push({
        severity: "error",
        scope: "document",
        subject: document.resourceId,
        message: `Missing required metadata: ${missingMetadata.join(", ")}.`,
      });
    }

    findEmptySections(document).forEach((sectionTitle) => {
      diagnostics.push({
        severity: "warning",
        scope: "document",
        subject: document.slug,
        message: `Section "${sectionTitle}" has no body content.`,
      });
    });

    if (
      getDocumentRelationships(document.slug, relationships).length === 0 &&
      document.slug !== ""
    ) {
      diagnostics.push({
        severity: "warning",
        scope: "relationship",
        subject: document.slug,
        message: "Document has no relationships.",
      });
    }

    const metadataWithStatus = document.metadata as { status?: string };

    if (
      metadataWithStatus.status === "deprecated" &&
      getDocumentRelationships(document.slug, relationships).length > 0
    ) {
      diagnostics.push({
        severity: "warning",
        scope: "document",
        subject: document.slug,
        message: "Deprecated document is still referenced.",
      });
    }
  });

  businessAssets.forEach((asset) => {
    if (!documentBySlug.has(asset.sourceDocumentSlug)) {
      diagnostics.push({
        severity: "error",
        scope: "business-asset",
        subject: asset.id,
        message: `Source document "${asset.sourceDocumentSlug}" does not exist.`,
      });
    }
  });

  validateRelationships(relationships, documentBySlug).forEach((diagnostic) => {
    diagnostics.push(diagnostic);
  });

  const collectionHealth = collections.map((collection) =>
    getCollectionHealth({
      collection,
      collectionDefinition: collectionDefinitions.find(
        (definition) => definition.id === collection.id,
      ),
      documents,
      businessAssets,
      relationships,
      diagnostics,
    }),
  );

  collectionHealth
    .filter((health) => health.documentCount > 0)
    .forEach((health) => {
      const hasVirtualLandingPage = collectionDefinitions.some(
        (definition) => definition.id === health.id,
      );

      if (!hasVirtualLandingPage) {
        diagnostics.push({
          severity: "error",
          scope: "collection",
          subject: health.id,
          message: "Collection does not have a landing page definition.",
        });
      }
    });

  const orphanedDocuments = documents
    .filter((document) => isOrphanedDocument(document, relationships))
    .map((document) => document.slug);

  const validationStatus = diagnostics.some(
    (diagnostic) => diagnostic.severity === "error",
  )
    ? "failing"
    : "passing";

  return {
    totalDocuments: documents.length,
    totalCollections: collections.length,
    totalBusinessAssets: businessAssets.length,
    relationshipCount: relationships.length,
    orphanedDocuments,
    validationStatus,
    diagnostics: diagnostics.sort(sortDiagnostics),
    collectionHealth,
    coverage: getCoverage(documentBySlug),
  };
}

export function assertGovernanceReportIsValid(
  report: KnowledgeGovernanceReport,
) {
  const errors = report.diagnostics.filter(
    (diagnostic) => diagnostic.severity === "error",
  );

  if (errors.length > 0) {
    throw new Error(
      errors
        .map(
          (diagnostic) =>
            `${diagnostic.scope}:${diagnostic.subject}: ${diagnostic.message}`,
        )
        .join("\n"),
    );
  }
}

function getCollectionHealth({
  collection,
  collectionDefinition,
  documents,
  businessAssets,
  relationships,
}: {
  collection: KnowledgeCollection;
  collectionDefinition?: KnowledgeCollectionDefinition;
  documents: KnowledgeDocument[];
  businessAssets: BusinessAsset[];
  relationships: KnowledgeRelationship[];
  diagnostics: GovernanceDiagnostic[];
}): CollectionHealth {
  const collectionDocuments = documents.filter(
    (document) => document.metadata.collection === collection.id,
  );
  const lastUpdatedDocument = [...collectionDocuments].sort((left, right) =>
    right.metadata.updatedAt.localeCompare(left.metadata.updatedAt),
  )[0];
  const collectionSlugs = new Set(
    collectionDocuments.map((document) => document.slug),
  );
  const dependentBusinessAssets = businessAssets
    .filter((asset) =>
      relationships.some(
        (relationship) =>
          relationship.assetId === asset.id &&
          (collectionSlugs.has(relationship.fromSlug) ||
            collectionSlugs.has(relationship.toSlug)),
      ),
    )
    .map((asset) => asset.title);

  return {
    id: collectionDefinition?.id ?? collection.id,
    title: collectionDefinition?.title ?? collection.title,
    documentCount: collectionDocuments.length,
    lastUpdatedDocument: lastUpdatedDocument
      ? {
          title: lastUpdatedDocument.metadata.title,
          slug: lastUpdatedDocument.slug,
          updatedAt: lastUpdatedDocument.metadata.updatedAt,
        }
      : undefined,
    documentsMissingMetadata: collectionDocuments
      .filter((document) => getMissingMetadata(document).length > 0)
      .map((document) => document.slug),
    orphanedDocuments: collectionDocuments
      .filter((document) => isOrphanedDocument(document, relationships))
      .map((document) => document.slug),
    documentsWithoutRelationships: collectionDocuments
      .filter(
        (document) => getDocumentRelationships(document.slug, relationships).length === 0,
      )
      .map((document) => document.slug),
    dependentBusinessAssets,
  };
}

function getCoverage(documentBySlug: Map<string, KnowledgeDocument>) {
  return coverageDefinitions.map((section) => ({
    title: section.title,
    items: section.items.map((item) => ({
      label: item.label,
      satisfied: documentBySlug.has(item.slug),
      matchedSlug: documentBySlug.has(item.slug) ? item.slug : undefined,
    })),
  }));
}

function getMissingMetadata(document: KnowledgeDocument) {
  return requiredMetadataFields.filter((field) => {
    const value = document.metadata[field];

    return value === undefined || value === null || value === "";
  });
}

function findEmptySections(document: KnowledgeDocument) {
  const lines = document.body.split("\n");
  const emptySections: string[] = [];
  let currentHeading: string | undefined;
  let hasContent = false;

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const isHeading = /^#{1,3}\s+/.test(trimmedLine);

    if (isHeading) {
      if (currentHeading && !hasContent) {
        emptySections.push(currentHeading);
      }

      currentHeading = trimmedLine.replace(/^#{1,3}\s+/, "");
      hasContent = false;
      return;
    }

    if (trimmedLine) {
      hasContent = true;
    }
  });

  if (currentHeading && !hasContent) {
    emptySections.push(currentHeading);
  }

  return emptySections;
}

function validateRelationships(
  relationships: KnowledgeRelationship[],
  documentBySlug: Map<string, KnowledgeDocument>,
) {
  return relationships.flatMap<GovernanceDiagnostic>((relationship) => {
    const diagnostics: GovernanceDiagnostic[] = [];

    if (!documentBySlug.has(relationship.fromSlug)) {
      diagnostics.push({
        severity: "error",
        scope: "relationship",
        subject: relationship.fromSlug,
        message: `Relationship source "${relationship.fromSlug}" does not exist.`,
      });
    }

    if (!documentBySlug.has(relationship.toSlug)) {
      diagnostics.push({
        severity: "error",
        scope: "relationship",
        subject: relationship.toSlug,
        message: `Relationship target "${relationship.toSlug}" does not exist.`,
      });
    }

    return diagnostics;
  });
}

function isOrphanedDocument(
  document: KnowledgeDocument,
  relationships: KnowledgeRelationship[],
) {
  if (document.slug === "") {
    return false;
  }

  return !relationships.some(
    (relationship) =>
      relationship.kind !== "collection-neighbour" &&
      (relationship.fromSlug === document.slug ||
        relationship.toSlug === document.slug),
  );
}

function getDocumentRelationships(
  slug: string,
  relationships: KnowledgeRelationship[],
) {
  return relationships.filter(
    (relationship) =>
      relationship.fromSlug === slug || relationship.toSlug === slug,
  );
}

function findDuplicates(values: string[]) {
  const counts = values.reduce<Map<string, number>>((result, value) => {
    result.set(value, (result.get(value) ?? 0) + 1);

    return result;
  }, new Map());

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
}

function sortDiagnostics(
  left: GovernanceDiagnostic,
  right: GovernanceDiagnostic,
) {
  if (left.severity !== right.severity) {
    return left.severity === "error" ? -1 : 1;
  }

  return (
    left.scope.localeCompare(right.scope) ||
    left.subject.localeCompare(right.subject) ||
    left.message.localeCompare(right.message)
  );
}

