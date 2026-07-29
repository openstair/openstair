import Link from "next/link";
import { VisualPlaceholder } from "@/components/ui/visual-placeholder";

type CtaVariant = "home" | "services" | "about" | "blog" | "open-source";
type CtaTone = "light" | "dark";

const ctaVariants: Record<
  CtaVariant,
  {
    eyebrow: string;
    title: string;
    description?: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    tone?: CtaTone;
  }
> = {
  home: {
    eyebrow: "Next Step",
    title: "Have a product idea that needs careful engineering?",
    description: "Start with a focused conversation about the product, users, risks, and cleanest delivery path.",
    primaryHref: "/contact",
    primaryLabel: "Book Consultation",
    secondaryHref: "/services",
    secondaryLabel: "View Services",
  },
  services: {
    eyebrow: "Services",
    title: "Let's build your next software product.",
    primaryHref: "/contact",
    primaryLabel: "Book Consultation",
    secondaryHref: "/#process",
    secondaryLabel: "View Process",
  },
  about: {
    eyebrow: "Engineering Approach",
    title: "Learn how OpenStair approaches software engineering.",
    primaryHref: "/contact",
    primaryLabel: "Book Consultation",
    secondaryHref: "/services",
    secondaryLabel: "Explore Services",
  },
  blog: {
    eyebrow: "Related Work",
    title: "Need help building something similar?",
    primaryHref: "/contact",
    primaryLabel: "Book Consultation",
    secondaryHref: "/services",
    secondaryLabel: "View Services",
  },
  "open-source": {
    eyebrow: "Engineering Partner",
    title: "Want product engineering with reusable thinking built in?",
    primaryHref: "/contact",
    primaryLabel: "Book Consultation",
    secondaryHref: "/services",
    secondaryLabel: "Explore Services",
    tone: "dark",
  },
};

type CtaPanelProps = {
  variant?: CtaVariant;
  tone?: CtaTone;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string | null;
  secondaryLabel?: string;
  illustrationAssetName?: string;
  illustrationTitle?: string;
};

export function CtaPanel({
  variant = "home",
  tone,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  illustrationAssetName,
  illustrationTitle = "Project planning",
}: CtaPanelProps) {
  const preset = ctaVariants[variant];
  const resolvedTone = tone ?? preset.tone ?? "light";
  const isDark = resolvedTone === "dark";
  const resolvedSecondaryHref =
    secondaryHref === undefined ? preset.secondaryHref : secondaryHref;
  const resolvedSecondaryLabel = secondaryLabel ?? preset.secondaryLabel;

  return (
    <section className="py-8 md:py-10">
      <div
        className={[
          "reveal border px-5 py-5 sm:px-6 md:px-7",
          "rounded-2xl",
          isDark
            ? "border-white/10 bg-[#07111f] text-white shadow-[0_18px_54px_rgba(7,17,31,0.18)]"
            : "border-slate-200 bg-white/78 shadow-[0_16px_50px_rgba(15,23,42,0.06)]",
        ].join(" ")}
      >
        <div
          className={[
            "grid gap-5",
            illustrationAssetName
              ? "lg:grid-cols-[1fr_16rem] lg:items-center"
              : "lg:grid-cols-[1fr_auto] lg:items-center",
          ].join(" ")}
        >
          <div className="max-w-3xl">
            <p
              className={[
                "text-xs font-black uppercase tracking-[0.16em]",
                isDark ? "text-cyan-200" : "text-cyan-700",
              ].join(" ")}
            >
              {preset.eyebrow}
            </p>
            <h2
              className={[
                "mt-2 text-2xl font-semibold leading-tight md:text-3xl",
                isDark ? "text-white" : "text-[var(--color-ink)]",
              ].join(" ")}
            >
              {title ?? preset.title}
            </h2>
            {description ?? preset.description ? (
              <p
                className={[
                  "mt-3 max-w-2xl text-sm leading-7",
                  isDark ? "text-slate-300" : "text-[var(--color-muted)]",
                ].join(" ")}
              >
                {description ?? preset.description}
              </p>
            ) : null}
          </div>
          {illustrationAssetName ? (
            <VisualPlaceholder
              assetName={illustrationAssetName}
              title={illustrationTitle}
              aspect="wide"
              className="hidden max-h-44 lg:block"
            />
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={primaryHref ?? preset.primaryHref}
              className={isDark ? "btn-secondary border-white bg-white text-slate-900 hover:bg-slate-100" : "btn-primary"}
            >
              {primaryLabel ?? preset.primaryLabel}
            </Link>
            {resolvedSecondaryHref && resolvedSecondaryLabel ? (
              <Link
                href={resolvedSecondaryHref}
                className={isDark ? "btn-secondary border-white/[0.18] bg-white/[0.08] text-white hover:bg-white/[0.14]" : "btn-secondary"}
              >
                {resolvedSecondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
