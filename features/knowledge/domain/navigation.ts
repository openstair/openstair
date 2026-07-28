import type { KnowledgeDocumentSummary } from "@/features/knowledge/domain/document";

export type NavigationTreeItem = {
  title: string;
  href: string;
  slug: string;
  collection: string;
};

export function createNavigationTree(
  documents: KnowledgeDocumentSummary[],
): NavigationTreeItem[] {
  return documents
    .filter((document) => document.visibility === "public")
    .sort((left, right) => {
      if (left.collection !== right.collection) {
        return left.collection.localeCompare(right.collection);
      }

      return left.order - right.order || left.title.localeCompare(right.title);
    })
    .map((document) => ({
      title: document.title,
      href: document.slug ? `/docs/${document.slug}` : "/docs",
      slug: document.slug,
      collection: document.collection,
    }));
}

