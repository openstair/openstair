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
    <section className="mt-10 border-t border-white/10 pt-6">
      <h2 className="text-2xl font-semibold text-white">Related Documents</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {documents.map((document) => (
          <Link
            key={document.slug}
            href={document.slug ? `/docs/${document.slug}` : "/docs"}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.05]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {formatReason(document.reason)}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {document.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
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
    <section className="mt-10 border-t border-white/10 pt-6">
      <h2 className="text-2xl font-semibold text-white">Used In</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {assets.map((asset) => (
          <Link
            key={asset.id}
            href={`/docs/assets/${asset.id}`}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.05]"
          >
            <h3 className="text-lg font-semibold text-white">{asset.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
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

