import type { KnowledgeGovernanceReport } from "@/features/knowledge/application/knowledge-governance";

type GovernanceDashboardProps = {
  report: KnowledgeGovernanceReport;
};

export function GovernanceDashboard({ report }: GovernanceDashboardProps) {
  const summaryItems = [
    { label: "Documents", value: report.totalDocuments },
    { label: "Collections", value: report.totalCollections },
    { label: "Business Assets", value: report.totalBusinessAssets },
    { label: "Relationships", value: report.relationshipCount },
    { label: "Orphaned", value: report.orphanedDocuments.length },
    { label: "Status", value: report.validationStatus },
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-semibold capitalize text-[var(--color-ink)]">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Diagnostics</h2>
        {report.diagnostics.length === 0 ? (
          <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
            No governance diagnostics were found.
          </p>
        ) : (
          <div className="mt-5 grid gap-3">
            {report.diagnostics.map((diagnostic) => (
              <div
                key={`${diagnostic.scope}-${diagnostic.subject}-${diagnostic.message}`}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {diagnostic.severity} / {diagnostic.scope}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
                  {diagnostic.subject}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  {diagnostic.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Collection Health</h2>
        <div className="mt-5 grid gap-4">
          {report.collectionHealth.map((collection) => (
            <article
              key={collection.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                    {collection.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {collection.documentCount} documents
                  </p>
                </div>
                {collection.lastUpdatedDocument ? (
                  <p className="text-sm font-semibold text-[var(--color-muted)]">
                    Last updated: {collection.lastUpdatedDocument.title}
                  </p>
                ) : null}
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Metric
                  label="Missing metadata"
                  value={collection.documentsMissingMetadata.length}
                />
                <Metric
                  label="Orphaned"
                  value={collection.orphanedDocuments.length}
                />
                <Metric
                  label="No relationships"
                  value={collection.documentsWithoutRelationships.length}
                />
                <Metric
                  label="Dependent assets"
                  value={collection.dependentBusinessAssets.length}
                />
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Coverage</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {report.coverage.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-[var(--color-muted)]">{item.label}</span>
                    <span
                      className={
                        item.satisfied
                          ? "font-semibold text-cyan-700"
                          : "font-semibold text-slate-500"
                      }
                    >
                      {item.satisfied ? "Present" : "Missing"}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-semibold text-[var(--color-ink)]">{value}</dd>
    </div>
  );
}

