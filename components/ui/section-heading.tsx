type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center reveal" : "max-w-2xl reveal"}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>
    </div>
  );
}
