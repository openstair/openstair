"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { navLinks } from "@/lib/site-content";

function isActiveRoute(
  pathname: string,
  link: (typeof navLinks)[number],
) {
  if ("external" in link && link.external) {
    return false;
  }

  if ("match" in link && link.match) {
    return link.match.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
  }

  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

function BrandMark() {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
      aria-label="OpenStair Technologies home"
    >
      <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-white shadow-[0_14px_34px_rgba(8,145,178,0.12)] transition duration-300 group-hover:border-cyan-500/40">
        <BrandLogo markOnly className="h-8 w-8" priority />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-tight text-[var(--color-ink)] sm:text-lg">
          <span className="text-cyan-700 transition duration-300 group-hover:text-[var(--color-ink)]">
            OpenStair
          </span>{" "}
          Technologies
        </span>
        <span className="mt-0.5 block whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
          EVERY STEP MATTERS
        </span>
      </span>
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative h-5 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          open ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function NavLinkItem({
  link,
  active,
  onClick,
}: {
  link: (typeof navLinks)[number];
  active: boolean;
  onClick?: () => void;
}) {
  const className = [
    "relative inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500",
    active
      ? "bg-slate-950 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)]"
      : "text-slate-600 hover:bg-white hover:text-[var(--color-ink)]",
  ].join(" ");

  return (
    <Link
      href={link.href}
      className={className}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      target={"external" in link && link.external ? "_blank" : undefined}
      rel={"external" in link && link.external ? "noreferrer" : undefined}
    >
      <span
        className={`absolute inset-x-4 -bottom-1 h-px rounded-full bg-cyan-600 transition duration-300 ${
          active ? "opacity-0" : "opacity-0"
        }`}
      />
      {link.label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/82 backdrop-blur-2xl">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <BrandMark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/72 p-1.5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] lg:flex"
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.href}
                link={link}
                active={isActiveRoute(pathname, link)}
              />
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-full border border-cyan-500/40 bg-cyan-50 px-4 py-2.5 text-sm font-bold text-cyan-900 shadow-[0_14px_34px_rgba(8,145,178,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 xl:inline-flex"
          >
            Book consultation
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_10px_26px_rgba(15,23,42,0.08)] transition duration-300 hover:border-cyan-500/35 hover:bg-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls={menuId}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <MenuIcon open={isOpen} />
          </button>
        </div>

        <div
          id={menuId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Mobile primary"
              className="surface-card mt-3 rounded-3xl p-2"
            >
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <NavLinkItem
                    key={link.href}
                    link={link}
                    active={isActiveRoute(pathname, link)}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-4 py-3 text-sm font-bold text-white transition duration-300 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
