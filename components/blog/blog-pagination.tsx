import Link from "next/link";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
};

export function BlogPagination({
  currentPage,
  totalPages,
  getPageHref,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Article pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link className="btn-secondary px-4 py-2" href={getPageHref(currentPage - 1)}>
          Previous
        </Link>
      ) : null}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Link
          key={page}
          href={getPageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={[
            "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition",
            page === currentPage
              ? "border-cyan-500/30 bg-cyan-50 text-cyan-800"
              : "border-slate-200 bg-white text-slate-700 hover:border-cyan-500/30 hover:text-cyan-700",
          ].join(" ")}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages ? (
        <Link className="btn-secondary px-4 py-2" href={getPageHref(currentPage + 1)}>
          Next
        </Link>
      ) : null}
    </nav>
  );
}
