import Link from "next/link";

type CtaPanelProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CtaPanel({
  title = "Ready to build a scalable software product?",
  description = "Talk to OpenStair Technologies about Flutter, Android, web, backend, or full stack development for your next application.",
  primaryHref = "/contact",
  primaryLabel = "Start a project",
  secondaryHref = "/services",
  secondaryLabel = "View services",
}: CtaPanelProps) {
  return (
    <section className="py-12 pb-2 md:py-18">
      <div className="reveal rounded-3xl border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(103,232,249,0.16),rgba(103,232,249,0.06))] p-8 sm:p-10 md:p-12">
        <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100/90">
          {description}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="btn-secondary border-white bg-white text-slate-900 hover:bg-slate-100"
          >
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="btn-secondary">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
