import Link from "next/link";
import type { NavigationTreeItem } from "@/features/knowledge/domain/navigation";

type NavigationTreeProps = {
  items: NavigationTreeItem[];
  currentSlug: string;
};

export function NavigationTree({ items, currentSlug }: NavigationTreeProps) {
  return (
    <nav aria-label="Documentation" className="grid gap-1">
      {items.map((item) => {
        const isActive = item.slug === currentSlug;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-xl px-3 py-2 text-sm font-semibold transition",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200",
              isActive
                ? "bg-cyan-300/14 text-white"
                : "text-slate-300 hover:bg-white/[0.06] hover:text-white",
            ].join(" ")}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

