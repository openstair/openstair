type ExportFormatListProps = {
  formats: string[];
};

export function ExportFormatList({ formats }: ExportFormatListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold text-[var(--color-ink)]">Export Formats</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {formats.map((format) => (
          <button
            key={format}
            type="button"
            disabled
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-500"
          >
            {format} Coming Soon
          </button>
        ))}
      </div>
    </div>
  );
}

