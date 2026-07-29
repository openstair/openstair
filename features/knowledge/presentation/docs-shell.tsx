import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";
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
        <div className="mb-8 grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[1fr_0.6fr] lg:items-center">
          <div>
            <p className="eyebrow">Company Knowledge</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-ink)] md:text-5xl">
              Documentation
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              A curated view of OpenStair company knowledge, service thinking, and public business documentation.
            </p>
          </div>
          <VisualPlaceholder
            assetName="dummy_image_docs_hero.webp"
            title="Readable company knowledge for clients and collaborators."
            description="Reserved documentation visual for future editorial artwork."
            className="hidden lg:block"
          />
        </div>
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card rounded-2xl p-3">
              <NavigationTree
                items={navigationItems}
                currentSlug={currentSlug}
              />
            </div>
          </aside>
          <article className="surface-card min-w-0 rounded-2xl p-6 md:p-9">
            {children}
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
