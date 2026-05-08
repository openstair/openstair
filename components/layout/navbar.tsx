"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/lib/site-content";

function isActiveRoute(
  pathname: string,
  link: (typeof navLinks)[number],
) {
  if ("external" in link && link.external) {
    return false;
  }

  if (link.href === "/") {
    return pathname === "/";
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
      className="group inline-flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
      aria-label="OpenStair Technologies home"
    >
      <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_26px_rgba(103,232,249,0.18)] transition duration-300 group-hover:border-cyan-200/50 group-hover:bg-cyan-300/15">
        <Image
          src="/logo.png"
          alt=""
          width={26}
          height={26}
          priority
          aria-hidden="true"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-semibold leading-tight text-white sm:text-lg">
          <span className="text-[var(--color-accent)] transition duration-300 group-hover:text-white">
            OpenStair
          </span>{" "}
          Technologies
        </span>
        <span className="mt-0.5 block truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Flutter & Full Stack Development
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
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200",
    active
      ? "bg-cyan-300/14 text-white shadow-[inset_0_0_0_1px_rgba(103,232,249,0.28),0_0_22px_rgba(103,232,249,0.12)]"
      : "text-slate-300 hover:bg-white/10 hover:text-white",
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
        className={`absolute inset-x-4 -bottom-1 h-px rounded-full bg-cyan-200 transition duration-300 ${
          active ? "opacity-80" : "opacity-0"
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070d1b]/72 backdrop-blur-2xl">
      <Container className="py-3.5">
        <div className="flex items-center justify-between gap-4">
          <BrandMark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] lg:flex"
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
            className="hidden rounded-2xl border border-cyan-300/35 bg-cyan-300/12 px-4 py-2.5 text-sm font-bold text-cyan-50 shadow-[0_0_28px_rgba(103,232,249,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/60 hover:bg-cyan-300/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 xl:inline-flex"
          >
            Book Consultation
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] text-slate-100 transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 lg:hidden"
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
              className="mt-3 rounded-3xl border border-white/12 bg-[#0b1222]/92 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
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
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/35 bg-cyan-300/14 px-4 py-3 text-sm font-bold text-cyan-50 transition duration-300 hover:bg-cyan-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
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
