import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKnowledgeService } from "@/features/knowledge/application/knowledge-service";
import { getCollectionDefinitionById } from "@/features/knowledge/domain/collection";
import { Breadcrumbs } from "@/features/knowledge/presentation/breadcrumbs";
import { BusinessAssetList } from "@/features/knowledge/presentation/business-asset-list";
import { DocsShell } from "@/features/knowledge/presentation/docs-shell";
import { DocumentList } from "@/features/knowledge/presentation/document-list";
import { DocumentMetadata } from "@/features/knowledge/presentation/document-metadata";
import { DocumentRenderer } from "@/features/knowledge/presentation/document-renderer";
import { ExportFormatList } from "@/features/knowledge/presentation/export-format-list";
import { GovernanceDashboard } from "@/features/knowledge/presentation/governance-dashboard";
import { PreviousNextNavigation } from "@/features/knowledge/presentation/previous-next-navigation";
import {
  RelatedDocuments,
  UsedInAssets,
} from "@/features/knowledge/presentation/related-documents";
import { createSeoMetadata } from "@/lib/seo";

type DocsPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const knowledgeService = getKnowledgeService();
  const [documents, collections, assets] = await Promise.all([
    knowledgeService.listPublicDocuments(),
    knowledgeService.listPublicCollections(),
    knowledgeService.listPublicBusinessAssets(),
    knowledgeService.getGovernanceReport(),
  ]);
  const documentParams = documents
    .filter((document) => document.slug !== "")
    .map((document) => ({
      slug: document.slug.split("/"),
    }));
  const collectionParams = collections.map((collection) => ({
    slug: [collection.slug],
  }));
  const assetParams = [
    { slug: ["assets"] },
    ...assets.map((asset) => ({ slug: ["assets", asset.id] })),
  ];

  return [{ slug: ["governance"] }, ...assetParams, ...collectionParams, ...documentParams];
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const slug = (await params).slug.join("/");
  const knowledgeService = getKnowledgeService();
  const assetId = getAssetIdFromSlug(slug);
  const asset = assetId
    ? await knowledgeService.getPublicBusinessAsset(assetId)
    : undefined;

  if (slug === "governance") {
    return createSeoMetadata({
      title: "Knowledge Governance",
      description:
        "Internal governance dashboard for OpenStair Knowledge Platform quality and coverage.",
      path: "/docs/governance",
    });
  }

  if (slug === "assets") {
    return createSeoMetadata({
      title: "Business Assets",
      description:
        "Reusable OpenStair business assets prepared for future PDF, DOCX, and print exports.",
      path: "/docs/assets",
    });
  }

  if (asset) {
    return createSeoMetadata({
      title: asset.title,
      description: asset.description,
      path: `/docs/assets/${asset.id}`,
    });
  }

  const [document, collection] = await Promise.all([
    knowledgeService.getPublicDocument(slug),
    knowledgeService.getPublicCollection(slug),
  ]);

  if (collection) {
    return createSeoMetadata({
      title: `${collection.title} Documentation`,
      description: collection.description,
      path: `/docs/${collection.slug}`,
    });
  }

  if (document) {
    return createSeoMetadata({
      title: document.metadata.title,
      description: document.metadata.description,
      path: `/docs/${document.slug}`,
    });
  }

  return {};
}

export default async function DocsPage({ params }: DocsPageProps) {
  const slug = (await params).slug.join("/");
  const knowledgeService = getKnowledgeService();
  const assetId = getAssetIdFromSlug(slug);
  const [
    document,
    collection,
    navigationItems,
    adjacentDocuments,
    relatedDocuments,
    usedInAssets,
  ] =
    await Promise.all([
    knowledgeService.getPublicDocument(slug),
    knowledgeService.getPublicCollection(slug),
    knowledgeService.getNavigationTree(),
    knowledgeService.getAdjacentPublicDocuments(slug),
    knowledgeService.getRelatedDocuments(slug),
    knowledgeService.getBusinessAssetsUsingDocument(slug),
  ]);

  if (slug === "assets") {
    const assets = await knowledgeService.listPublicBusinessAssets();

    return (
      <DocsShell navigationItems={navigationItems} currentSlug={slug}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs" },
            { label: "Assets" },
          ]}
        />
        <header className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Business Assets
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white">
            Business Assets
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            Reusable business assets composed from canonical OpenStair
            knowledge and prepared for future export formats.
          </p>
        </header>
        <BusinessAssetList assets={assets} />
      </DocsShell>
    );
  }

  if (slug === "governance") {
    const report = await knowledgeService.getGovernanceReport();

    return (
      <DocsShell navigationItems={navigationItems} currentSlug={slug}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs" },
            { label: "Governance" },
          ]}
        />
        <header className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Governance
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white">
            Knowledge Governance
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            Internal quality and coverage view for the OpenStair Knowledge
            Platform.
          </p>
        </header>
        <GovernanceDashboard report={report} />
      </DocsShell>
    );
  }

  if (assetId) {
    const [asset, assetDocument] = await Promise.all([
      knowledgeService.getPublicBusinessAsset(assetId),
      knowledgeService.getPublicBusinessAssetDocument(assetId),
    ]);

    if (!asset || !assetDocument) {
      notFound();
    }

    return (
      <DocsShell navigationItems={navigationItems} currentSlug={slug}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs" },
            { label: "Assets", href: "/docs/assets" },
            { label: asset.title },
          ]}
        />
        <header className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Business Asset
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white">
            {asset.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            {asset.description}
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Purpose
              </dt>
              <dd className="mt-1 text-sm leading-7 text-slate-300">
                {asset.purpose}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Intended Audience
              </dt>
              <dd className="mt-1 text-sm leading-7 text-slate-300">
                {asset.intendedAudience}
              </dd>
            </div>
          </dl>
        </header>
        <div className="mb-8">
          <ExportFormatList formats={asset.supportedExportFormats} />
        </div>
        <DocumentRenderer body={assetDocument.body} />
      </DocsShell>
    );
  }

  if (collection) {
    return (
      <DocsShell navigationItems={navigationItems} currentSlug={slug}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs" },
            { label: collection.title },
          ]}
        />
        <header className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Collection
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white">
            {collection.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            {collection.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-400">
            {collection.documents.length} documents
          </p>
        </header>
        <DocumentList documents={collection.documents} />
      </DocsShell>
    );
  }

  if (!document) {
    notFound();
  }

  const collectionDefinition = getCollectionDefinitionById(
    document.metadata.collection,
  );

  return (
    <DocsShell navigationItems={navigationItems} currentSlug={document.slug}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          collectionDefinition
            ? {
                label: collectionDefinition.title,
                href: `/docs/${collectionDefinition.slug}`,
              }
            : { label: document.metadata.collection },
          { label: document.metadata.title },
        ]}
      />
      <DocumentMetadata document={document} />
      <DocumentRenderer body={document.body} />
      <UsedInAssets assets={usedInAssets} />
      <RelatedDocuments documents={relatedDocuments} />
      <PreviousNextNavigation
        previous={adjacentDocuments.previous}
        next={adjacentDocuments.next}
      />
    </DocsShell>
  );
}

function getAssetIdFromSlug(slug: string) {
  const parts = slug.split("/");

  if (parts.length !== 2 || parts[0] !== "assets") {
    return undefined;
  }

  return parts[1];
}
