import Link from "next/link";

type ContactIconButtonProps = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

function ContactIcon({ id }: { id: string }) {
  const className = "h-5 w-5";

  switch (id) {
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path d="M20 11.5A8.5 8.5 0 0 1 7.2 18.8L4 20l1.2-3.2A8.5 8.5 0 1 1 20 11.5Z" />
          <path d="M9.3 9.3c.2-.3.4-.3.6-.3h.5c.2 0 .4 0 .5.3l.6 1.4c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.4 0 .6.4.8 1 1.4 1.8 1.8.2.1.4.1.6 0l.7-.5c.2-.1.4-.1.6 0l1.4.6c.3.1.3.3.3.5v.5c0 .2 0 .4-.3.6-.5.4-1.2.5-1.9.3a7 7 0 0 1-4.5-4.5c-.2-.7-.1-1.4.3-1.9Z" />
        </svg>
      );
    case "call":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path d="M6.8 4.5h2.4c.4 0 .7.2.8.6l.8 3a1 1 0 0 1-.3 1l-1.2 1a13 13 0 0 0 4.8 4.8l1-1.2a1 1 0 0 1 1-.3l3 .8c.4.1.6.4.6.8v2.4c0 .5-.4 1-.9 1A15.6 15.6 0 0 1 5.8 5.4c0-.5.5-.9 1-.9Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M6.7 8.5H3.9v11h2.8v-11Zm.2-3.4a1.7 1.7 0 1 0-3.4 0 1.7 1.7 0 0 0 3.4 0ZM20.5 13.2c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3 1.7v-1.5h-2.8v11h2.8v-6.1c0-1.6.3-3.1 2.2-3.1 1.8 0 1.8 1.7 1.8 3.2v6h2.8v-6.5Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6 0 .8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7 0-.7 0-.7 1 .1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2 1 .1-.7.4-1.2.7-1.5-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C17 4 18 4.3 18 4.3c.6 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.6A11.3 11.3 0 0 0 12 .7Z" />
        </svg>
      );
    case "pubdev":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path d="M12 3.5 4.5 7.8v8.4L12 20.5l7.5-4.3V7.8L12 3.5Z" />
          <path d="M4.5 7.8 12 12l7.5-4.2M12 12v8.5" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M13.5 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.6 1.6-1.6h1.5V4.1c-.3 0-1.2-.1-2.3-.1-2.2 0-3.8 1.4-3.8 4v2.3H8v3h2.5V21h3Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M21.6 8.3a2.9 2.9 0 0 0-2-2c-1.8-.5-7.6-.5-7.6-.5s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 10.1 2 12 2 12s0 1.9.4 3.7a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2c.4-1.8.4-3.7.4-3.7s0-1.9-.4-3.7Zm-11.5 6v-4.6L14.3 12l-4.2 2.3Z" />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.3" />
        </svg>
      );
    case "responseTime":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.8v4.7l3 1.8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
  }
}

export function ContactIconButton({ id, label, value, href }: ContactIconButtonProps) {
  const className =
    "group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.08] hover:text-cyan-100";
  const title = `${label}: ${value}`;

  if (!href) {
    return (
      <div className={className} aria-label={title} title={title} role="img">
        <ContactIcon id={id} />
        <span className="sr-only">{title}</span>
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
      <ContactIcon id={id} />
      <span className="sr-only">{title}</span>
    </Link>
  );
}
