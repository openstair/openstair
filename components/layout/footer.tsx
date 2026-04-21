import Link from "next/link";
import { Container } from "@/components/layout/container";
import { navLinks, siteName } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#070d1a]/70">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-white">{siteName}</p>
          <p className="text-sm text-[var(--color-muted)]">
            Build momentum with clarity, speed, and confidence.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-5 text-sm text-slate-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
