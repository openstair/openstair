import Link from "next/link";
import type { KnowledgeDocumentSummary } from "@/features/knowledge/domain/document";

type PreviousNextNavigationProps = {
  previous?: KnowledgeDocumentSummary;
  next?: KnowledgeDocumentSummary;
};

export function PreviousNextNavigation({
  previous,
  next,
}: PreviousNextNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Previous and next documents"
      className="mt-10 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-2"
    >
      <NavigationLink direction="Previous" document={previous} />
      <NavigationLink direction="Next" document={next} alignEnd />
    </nav>
  );
}

function NavigationLink({
  direction,
  document,
  alignEnd = false,
}: {
  direction: "Previous" | "Next";
  document?: KnowledgeDocumentSummary;
  alignEnd?: boolean;
}) {
  if (!document) {
    return <span aria-hidden="true" />;
  }

  return (
    <Link
      href={document.slug ? `/docs/${document.slug}` : "/docs"}
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.05]",
        alignEnd ? "md:text-right" : "",
      ].join(" ")}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {direction}
      </span>
      <span className="mt-2 block text-base font-semibold text-white">
        {document.title}
      </span>
    </Link>
  );
}

