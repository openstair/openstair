import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="font-semibold text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

