import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import {
  platformLinks,
  quickLinks,
  serviceLinks,
  siteName,
} from "@/lib/site-content";

function PlatformIcon({ icon }: { icon: (typeof platformLinks)[number]["icon"] }) {
  const strokeProps = {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "1.75",
  };
  const commonProps = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (icon) {
    case "github":
      return (
        <svg {...commonProps}>
          <path
            d="M9.35 19.35c-4.18 1.08-4.18-2.08-5.78-2.5m11.48 4.9v-3.08c0-.82-.3-1.52-.78-2.05 2.6-.3 5.28-1.28 5.28-5.78 0-1.28-.45-2.33-1.2-3.15.12-.3.52-1.58-.12-3.1 0 0-.98-.32-3.18 1.18a10.6 10.6 0 0 0-5.82 0c-2.2-1.5-3.18-1.18-3.18-1.18-.64 1.52-.24 2.8-.12 3.1a4.57 4.57 0 0 0-1.2 3.15c0 4.48 2.68 5.48 5.26 5.78-.42.38-.78 1.08-.78 2.18v2.95"
            {...strokeProps}
          />
        </svg>
      );
    case "play":
      return (
        <svg {...commonProps}>
          <path
            d="M6 4.9v14.2c0 .78.84 1.27 1.52.88l11.94-7.08a1.05 1.05 0 0 0 0-1.8L7.52 4.02A1.02 1.02 0 0 0 6 4.9Z"
            {...strokeProps}
          />
          <path d="m6.25 4.65 8.25 7.35-8.25 7.35" {...strokeProps} />
        </svg>
      );
    case "instagram":
      return (
        <svg {...commonProps}>
          <rect
            height="14.5"
            rx="4"
            width="14.5"
            x="4.75"
            y="4.75"
            {...strokeProps}
          />
          <path
            d="M15.15 11.55a3.16 3.16 0 1 1-6.3.9 3.16 3.16 0 0 1 6.3-.9Zm1.2-3.15h.01"
            {...strokeProps}
          />
        </svg>
      );
    case "facebook":
      return (
        <svg {...commonProps}>
          <path
            d="M14.35 8.25h2.05V4.7a12.1 12.1 0 0 0-2.98-.33c-2.95 0-4.97 1.8-4.97 5.08v2.8H5.25v3.88h3.2v5.5h4.02v-5.5h3.12l.52-3.88h-3.64V9.82c0-1.08.3-1.57 1.88-1.57Z"
            {...strokeProps}
          />
        </svg>
      );
    case "youtube":
      return (
        <svg {...commonProps}>
          <path
            d="M20.65 9.22a2.75 2.75 0 0 0-1.92-1.95C16.98 6.8 12 6.8 12 6.8s-4.98 0-6.73.47a2.75 2.75 0 0 0-1.92 1.95A15 15 0 0 0 2.9 12a15 15 0 0 0 .45 2.78 2.75 2.75 0 0 0 1.92 1.95c1.75.47 6.73.47 6.73.47s4.98 0 6.73-.47a2.75 2.75 0 0 0 1.92-1.95A15 15 0 0 0 21.1 12a15 15 0 0 0-.45-2.78Z"
            {...strokeProps}
          />
          <path d="m10.65 14.15 3.72-2.15-3.72-2.15v4.3Z" fill="currentColor" />
        </svg>
      );
    case "pubdev":
      return (
        <svg {...commonProps}>
          <path
            d="M5 7.1 12 3.4l7 3.7v9.8l-7 3.7-7-3.7V7.1Z"
            {...strokeProps}
          />
          <path d="M8.35 15.85V8.15h4.05c1.84 0 3.05 1.02 3.05 2.62 0 1.62-1.2 2.65-3.05 2.65h-1.72v2.43" {...strokeProps} />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...commonProps}>
          <path
            d="M6.6 10v8.6m0-11.65v.01M10.9 18.6V10m0 3.95c0-2.55 1.43-4.15 3.55-4.15 2.32 0 3.55 1.55 3.55 4.42v4.38"
            {...strokeProps}
          />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="7.75" {...strokeProps} />
        </svg>
      );
  }
}

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-300 transition duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-[#070d1a]/78">
      <div className="pointer-events-none absolute -top-24 left-8 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

      <Container className="relative py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1fr]">
          <section aria-label="OpenStair Technologies" className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              aria-label="OpenStair Technologies home"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_26px_rgba(103,232,249,0.16)]">
                <Image src="/logo.png" alt="" width={28} height={28} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-lg font-semibold leading-tight text-white">
                  {siteName}
                </span>
                <span className="mt-0.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Flutter & Full Stack Development
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
              Flutter, Android, Web and Backend development company building scalable modern applications with full stack engineering.
            </p>
          </section>

          <FooterLinkList title="Quick Links" links={quickLinks} />
          <FooterLinkList title="Services" links={serviceLinks} />

          <section aria-labelledby="platform-links">
            <h2 id="platform-links" className="text-sm font-semibold text-white">
              Social & Platforms
            </h2>
            <ul className="mt-4 grid grid-cols-4 gap-3 sm:flex sm:flex-wrap">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    title={link.label}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white hover:shadow-[0_14px_36px_rgba(8,145,178,0.14),inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    <PlatformIcon icon={link.icon} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Explore our apps, developer work, and updates across OpenStair platforms.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} OpenStair Technologies. All rights reserved.</p>
          <Link
            href="https://apps.openstair.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-300 transition duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          >
            Apps by OpenStair
          </Link>
        </div>
      </Container>
    </footer>
  );
}
