import Link from "next/link";

type ContactIconButtonProps = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

const iconClassName = "h-5 w-5";
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: "1.85",
};

function ContactIcon({ id }: { id: string }) {
  switch (id) {
    case "email":
      return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden="true">
          <rect x="4" y="5.75" width="16" height="12.5" rx="3" {...strokeProps} />
          <path d="m5.25 8 6.75 5.15L18.75 8" {...strokeProps} />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden="true">
          <path
            d="M5.35 18.85 6.3 15.4a7.4 7.4 0 1 1 2.9 2.75l-3.85.7Z"
            {...strokeProps}
          />
          <path
            d="M9.15 9.05c.18-.4.34-.52.64-.52h.48c.18 0 .34.12.43.32l.58 1.36c.08.2.04.42-.1.58l-.42.48c-.13.15-.15.34-.05.52.43.78 1.06 1.4 1.88 1.84.18.1.38.07.52-.08l.5-.52c.15-.15.38-.2.58-.1l1.42.66c.2.1.32.3.3.52l-.06.48c-.04.34-.22.55-.58.72-.5.24-1.18.26-1.9.04-1.86-.58-3.52-2.18-4.18-4.02-.25-.7-.25-1.36-.04-1.84Z"
            {...strokeProps}
          />
        </svg>
      );
    case "call":
      return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden="true">
          <path
            d="M7.15 4.9h1.98c.5 0 .92.34 1.04.82l.5 2.05c.1.42-.06.86-.4 1.12l-1.05.8a11.35 11.35 0 0 0 5.08 5.08l.8-1.05c.26-.34.7-.5 1.12-.4l2.05.5c.48.12.82.54.82 1.04v1.98c0 .66-.54 1.2-1.2 1.16A13.1 13.1 0 0 1 6 6.1c-.04-.66.5-1.2 1.15-1.2Z"
            {...strokeProps}
          />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden="true">
          <path d="M12 21s6.25-5.4 6.25-10.25a6.25 6.25 0 0 0-12.5 0C5.75 15.6 12 21 12 21Z" {...strokeProps} />
          <circle cx="12" cy="10.75" r="2.15" {...strokeProps} />
        </svg>
      );
    case "responseTime":
      return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden="true">
          <circle cx="12" cy="12" r="8.25" {...strokeProps} />
          <path d="M12 7.85v4.55l2.85 1.7" {...strokeProps} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden="true">
          <circle cx="12" cy="12" r="8.25" {...strokeProps} />
        </svg>
      );
  }
}

function Content({ id, label, value }: Omit<ContactIconButtonProps, "href">) {
  return (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/18 bg-cyan-300/8 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 group-hover:border-cyan-200/40 group-hover:bg-cyan-300/14 group-hover:text-white">
        <ContactIcon id={id} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 transition duration-300 group-hover:text-cyan-100/90">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-semibold text-slate-100">
          {value}
        </span>
      </span>
    </>
  );
}

export function ContactIconButton({ id, label, value, href }: ContactIconButtonProps) {
  const className =
    "group relative flex min-h-16 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-3.5 py-3 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/32 hover:bg-white/[0.065] hover:shadow-[0_18px_42px_rgba(8,145,178,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";
  const title = `${label}: ${value}`;

  if (!href) {
    return (
      <div className={className} aria-label={title} title={title} role="img">
        <Content id={id} label={label} value={value} />
      </div>
    );
  }

  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      aria-label={title}
      title={title}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <Content id={id} label={label} value={value} />
    </Link>
  );
}
