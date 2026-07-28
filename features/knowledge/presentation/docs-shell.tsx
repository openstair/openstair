import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import type { NavigationTreeItem } from "@/features/knowledge/domain/navigation";
import { NavigationTree } from "@/features/knowledge/presentation/navigation-tree";

type DocsShellProps = {
  children: ReactNode;
  navigationItems: NavigationTreeItem[];
  currentSlug: string;
};

export function DocsShell({
  children,
  navigationItems,
  currentSlug,
}: DocsShellProps) {
  return (
    <SiteShell>
      <section className="py-12 md:py-16">
        <div className="mb-8 border-b border-white/10 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            OpenStair Knowledge Platform
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
            Documentation
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <NavigationTree
                items={navigationItems}
                currentSlug={currentSlug}
              />
            </div>
          </aside>
          <article className="min-w-0 rounded-2xl border border-white/10 bg-[var(--color-card)] p-6 md:p-9">
            {children}
          </article>
        </div>
      </section>
    </SiteShell>
  );
}

