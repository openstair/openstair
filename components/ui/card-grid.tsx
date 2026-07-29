import Image from "next/image";
import Link from "next/link";
import { brandImages, type BrandImageKey } from "@/lib/brand-assets";

type CardGridItem = {
  title: string;
  description: string;
  href?: string;
  label?: string;
  icon?: string;
  asset?: BrandImageKey;
  problem?: string;
  solution?: string;
  technology?: string;
  outcome?: string;
};

type CardGridProps = {
  items: readonly CardGridItem[];
};

export function CardGrid({ items }: CardGridProps) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="surface-card reveal group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_26px_80px_rgba(8,145,178,0.12)]"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            {item.icon ? (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-100 text-sm font-black text-cyan-700 shadow-[0_12px_30px_rgba(8,145,178,0.1)]">
                {item.icon}
              </span>
            ) : (
              <span className="h-1.5 w-8 rounded-full bg-cyan-500/60" />
            )}
            {item.asset ? (
              <span className="relative h-12 w-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image
                  src={brandImages[item.asset].src}
                  alt=""
                  fill
                  sizes="4rem"
                  className="object-cover"
                  aria-hidden="true"
                />
              </span>
            ) : null}
          </div>
          <h3 className="text-xl font-semibold text-[var(--color-ink)] transition duration-300 group-hover:text-cyan-700">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {item.description}
          </p>
          {item.problem || item.solution || item.technology || item.outcome ? (
            <dl className="mt-5 grid gap-3 text-sm">
              {[
                ["Problem", item.problem],
                ["Solution", item.solution],
                ["Technology", item.technology],
                ["Outcome", item.outcome],
              ].map(([label, value]) =>
                value ? (
                  <div key={label} className="border-t border-slate-200 pt-3">
                    <dt className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-cyan-700">
                      {label}
                    </dt>
                    <dd className="mt-1 leading-6 text-[var(--color-muted)]">
                      {value}
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          ) : null}
          {item.href ? (
            <Link
              href={item.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-[var(--color-ink)]"
            >
              {item.label ?? "Explore service"}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
