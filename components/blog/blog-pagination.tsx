import Link from "next/link";
import { getPaginationItems } from "@/components/blog/pagination-items";

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
    <nav aria-label="Article pagination" className="mt-10">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        getPageHref={getPageHref}
        maxVisibleNumericPages={3}
        includeBoundaryPages={false}
        className="flex sm:hidden"
        compact
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        getPageHref={getPageHref}
        maxVisibleNumericPages={5}
        className="hidden sm:flex"
      />
    </nav>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  getPageHref,
  maxVisibleNumericPages,
  includeBoundaryPages = true,
  className,
  compact = false,
}: BlogPaginationProps & {
  maxVisibleNumericPages: number;
  includeBoundaryPages?: boolean;
  className: string;
  compact?: boolean;
}) {
  const paginationItems = getPaginationItems(
    currentPage,
    totalPages,
    maxVisibleNumericPages,
    includeBoundaryPages,
  );
  const controlClassName = compact
    ? "btn-secondary h-9 shrink-0 whitespace-nowrap !px-2 !py-0 text-xs leading-none"
    : "btn-secondary px-4 py-2";
  const pageClassName = compact
    ? "inline-flex h-9 min-w-8 shrink-0 items-center justify-center rounded-full border px-2 text-xs font-semibold transition"
    : "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition";

  return (
    <div className={`${className} max-w-full flex-nowrap items-center justify-center gap-1 sm:gap-2`}>
      {currentPage > 1 ? (
        <Link className={controlClassName} href={getPageHref(currentPage - 1)}>
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${controlClassName} pointer-events-none opacity-45`}
        >
          Previous
        </span>
      )}
      {paginationItems.map((item) =>
        item.type === "ellipsis" ? (
          <span
            key={item.key}
            aria-hidden="true"
            className="inline-flex h-10 min-w-10 items-center justify-center px-2 text-sm font-semibold text-slate-400"
          >
            ...
          </span>
        ) : (
          <Link
            key={item.page}
            href={getPageHref(item.page)}
            aria-current={item.page === currentPage ? "page" : undefined}
            className={[
              pageClassName,
              item.page === currentPage
                ? "border-cyan-500/30 bg-cyan-50 text-cyan-800"
                : "border-slate-200 bg-white text-slate-700 hover:border-cyan-500/30 hover:text-cyan-700",
            ].join(" ")}
          >
            {item.page}
          </Link>
        ),
      )}
      {currentPage < totalPages ? (
        <Link className={controlClassName} href={getPageHref(currentPage + 1)}>
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${controlClassName} pointer-events-none opacity-45`}
        >
          Next
        </span>
      )}
    </div>
  );
}
