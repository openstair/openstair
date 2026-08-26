export type PaginationItem =
  | {
      type: "page";
      page: number;
    }
  | {
      type: "ellipsis";
      key: "start-ellipsis" | "end-ellipsis";
    };

export function getPaginationItems(
  currentPage: number,
  totalPages: number,
  numericWindowSize = 5,
  includeBoundaryPages = true,
): PaginationItem[] {
  if (!includeBoundaryPages) {
    const windowStart = Math.min(
      Math.max(currentPage - Math.floor(numericWindowSize / 2), 1),
      Math.max(totalPages - numericWindowSize + 1, 1),
    );

    return Array.from(
      { length: Math.min(numericWindowSize, totalPages) },
      (_, index) => ({
        type: "page",
        page: windowStart + index,
      }),
    );
  }

  if (totalPages <= numericWindowSize + 2) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page",
      page: index + 1,
    }));
  }

  const windowStart = Math.min(
    Math.max(currentPage - Math.floor(numericWindowSize / 2), 1),
    totalPages - numericWindowSize + 1,
  );
  const pages = new Set<number>([
    1,
    totalPages,
    ...Array.from(
      { length: numericWindowSize },
      (_, index) => windowStart + index,
    ),
  ]);

  return [...pages]
    .sort((left, right) => left - right)
    .reduce<PaginationItem[]>((items, page) => {
      const previousItem = items[items.length - 1];

      if (previousItem?.type === "page" && page - previousItem.page > 1) {
        items.push({
          type: "ellipsis",
          key: previousItem.page === 1 ? "start-ellipsis" : "end-ellipsis",
        });
      }

      items.push({ type: "page", page });

      return items;
    }, []);
}
