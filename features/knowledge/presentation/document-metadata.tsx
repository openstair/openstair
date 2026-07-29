import type { KnowledgeDocument } from "@/features/knowledge/domain/document";

type DocumentMetadataProps = {
  document: KnowledgeDocument;
};

export function DocumentMetadata({ document }: DocumentMetadataProps) {
  const items = [
    { label: "Collection", value: document.metadata.collection },
    { label: "Last updated", value: formatDate(document.metadata.updatedAt) },
    { label: "Reading time", value: getReadingTime(document.body) },
    { label: "Visibility", value: document.metadata.visibility },
  ];

  return (
    <dl className="mb-8 grid gap-3 border-b border-slate-200 pb-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold capitalize text-slate-700">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function getReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

