import Link from "next/link";

type CardGridItem = {
  title: string;
  description: string;
  href?: string;
  label?: string;
};

type CardGridProps = {
  items: CardGridItem[];
};

export function CardGrid({ items }: CardGridProps) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="reveal group rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
        >
          <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-cyan-100">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {item.description}
          </p>
          {item.href ? (
            <Link
              href={item.href}
              className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] transition hover:text-white"
            >
              {item.label ?? "Explore service"}
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
