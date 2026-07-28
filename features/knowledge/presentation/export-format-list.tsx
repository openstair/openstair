type ExportFormatListProps = {
  formats: string[];
};

export function ExportFormatList({ formats }: ExportFormatListProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-xl font-semibold text-white">Export Formats</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {formats.map((format) => (
          <button
            key={format}
            type="button"
            disabled
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-400"
          >
            {format} Coming Soon
          </button>
        ))}
      </div>
    </div>
  );
}

