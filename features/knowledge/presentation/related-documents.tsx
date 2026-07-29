import Link from "next/link";
import type {
  RelatedDocument,
  ReferencingBusinessAsset,
} from "@/features/knowledge/domain/knowledge-relationship";

type RelatedDocumentsProps = {
  documents: RelatedDocument[];
};

export function RelatedDocuments({ documents }: RelatedDocumentsProps) {
  if (documents.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-slate-200 pt-6">
      <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Related Documents</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {documents.map((document) => (
          <Link
            key={document.slug}
            href={document.slug ? `/docs/${document.slug}` : "/docs"}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-500/35 hover:bg-white"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {formatReason(document.reason)}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              {document.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {document.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

type UsedInAssetsProps = {
  assets: ReferencingBusinessAsset[];
};

export function UsedInAssets({ assets }: UsedInAssetsProps) {
  if (assets.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-slate-200 pt-6">
      <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Used In</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {assets.map((asset) => (
          <Link
            key={asset.id}
            href={`/docs/assets/${asset.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-500/35 hover:bg-white"
          >
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">{asset.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {asset.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function formatReason(reason: RelatedDocument["reason"]) {
  return reason.replaceAll("-", " ");
}

