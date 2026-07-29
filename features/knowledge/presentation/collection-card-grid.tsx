import Link from "next/link";
import type { KnowledgeCollection } from "@/features/knowledge/domain/collection";

type CollectionCardGridProps = {
  collections: KnowledgeCollection[];
};

export function CollectionCardGrid({ collections }: CollectionCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/docs/${collection.slug}`}
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-500/35 hover:bg-white"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">
              {collection.title}
            </h2>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
              {collection.documents.length}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {collection.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

