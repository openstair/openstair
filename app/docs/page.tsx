import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKnowledgeService } from "@/features/knowledge/application/knowledge-service";
import { Breadcrumbs } from "@/features/knowledge/presentation/breadcrumbs";
import { CollectionCardGrid } from "@/features/knowledge/presentation/collection-card-grid";
import { DocsShell } from "@/features/knowledge/presentation/docs-shell";
import { DocumentRenderer } from "@/features/knowledge/presentation/document-renderer";
import { socialAssets } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Documentation",
  description:
    "OpenStair Knowledge Platform documentation, company knowledge, engineering standards, and architecture decisions.",
  path: "/docs",
  image: socialAssets.pages.documentation,
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
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">
          Knowledge Collections
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
          Browse company knowledge, service references, business material, and public documentation in one readable place.
        </p>
        <div className="mt-6">
          <CollectionCardGrid collections={collections} />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className="btn-secondary">
            Explore Services
          </Link>
          <Link href="/blog" className="btn-secondary">
            Read Blog
          </Link>
        </div>
      </section>
    </DocsShell>
  );
}
