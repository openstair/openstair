import Link from "next/link";
import type { KnowledgeDocumentSummary } from "@/features/knowledge/domain/document";

type DocumentListProps = {
  documents: KnowledgeDocumentSummary[];
};

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="grid gap-4">
      {documents.map((document) => (
        <Link
          key={document.slug}
          href={document.slug ? `/docs/${document.slug}` : "/docs"}
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-500/35 hover:bg-white"
        >
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">{document.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {document.description}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Updated {formatDate(document.updatedAt)}
          </p>
        </Link>
      ))}
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

