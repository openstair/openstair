import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKnowledgeService } from "@/features/knowledge/application/knowledge-service";
import { Breadcrumbs } from "@/features/knowledge/presentation/breadcrumbs";
import { CollectionCardGrid } from "@/features/knowledge/presentation/collection-card-grid";
import { DocsShell } from "@/features/knowledge/presentation/docs-shell";
import { DocumentRenderer } from "@/features/knowledge/presentation/document-renderer";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Documentation",
  description:
    "OpenStair Knowledge Platform documentation, company knowledge, engineering standards, and architecture decisions.",
  path: "/docs",
});

export default async function DocsIndexPage() {
  const knowledgeService = getKnowledgeService();
  const [document, navigationItems, collections] = await Promise.all([
    knowledgeService.getPublicDocument(""),
    knowledgeService.getNavigationTree(),
    knowledgeService.listPublicCollections(),
  ]);

  if (!document) {
    notFound();
  }

  return (
    <DocsShell navigationItems={navigationItems} currentSlug="">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Docs" },
        ]}
      />
      <DocumentRenderer body={document.body} />
      <section className="mt-10 border-t border-white/10 pt-8">
        <h2 className="text-2xl font-semibold text-white">
          Documentation Collections
        </h2>
        <p className="mt-3 text-base leading-8 text-slate-300">
          Browse OpenStair knowledge by collection. Counts update from the
          repository as documents are added.
        </p>
        <div className="mt-6">
          <CollectionCardGrid collections={collections} />
        </div>
      </section>
    </DocsShell>
  );
}
