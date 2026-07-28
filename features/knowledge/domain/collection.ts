import type { KnowledgeDocumentSummary } from "@/features/knowledge/domain/document";

export type KnowledgeCollection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  documents: KnowledgeDocumentSummary[];
};

export type KnowledgeCollectionDefinition = {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
};

export const knowledgeCollectionDefinitions = [
  {
    id: "company",
    slug: "company",
    title: "Company",
    description:
      "Canonical company identity, mission, vision, values, and engineering philosophy.",
    order: 1,
  },
  {
    id: "business",
    slug: "business",
    title: "Business",
    description:
      "Business profile, positioning, service model, and operating context.",
    order: 2,
  },
  {
    id: "services",
    slug: "services",
    title: "Services",
    description:
      "Canonical service capabilities for OpenStair mobile, web, and backend work.",
    order: 3,
  },
  {
    id: "engineering",
    slug: "engineering",
    title: "Engineering",
    description:
      "Engineering standards, project guidance, and documentation practices.",
    order: 4,
  },
  {
    id: "processes",
    slug: "processes",
    title: "Processes",
    description:
      "Repeatable workflows for documentation, delivery, review, and operations.",
    order: 5,
  },
  {
    id: "legal",
    slug: "legal",
    title: "Legal",
    description:
      "Legal and policy-oriented documentation for OpenStair operations and products.",
    order: 6,
  },
  {
    id: "architecture",
    slug: "adr",
    title: "ADR",
    description:
      "Architecture decision records explaining important technical and platform choices.",
    order: 7,
  },
] as const satisfies KnowledgeCollectionDefinition[];

export function getCollectionDefinitionById(collectionId: string) {
  return knowledgeCollectionDefinitions.find(
    (collection) => collection.id === collectionId,
  );
}

export function getCollectionDefinitionBySlug(collectionSlug: string) {
  return knowledgeCollectionDefinitions.find(
    (collection) => collection.slug === collectionSlug,
  );
}
