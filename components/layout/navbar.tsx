import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/lib/site-content";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070d1b]/70 backdrop-blur-2xl">
      <Container className="mr-1.5 flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="group inline-flex items-center text-lg font-semibold text-white">
          <Image
            src="/favicon.png"
            alt="OpenStair Logo"
            width={24}
            height={24}
            priority
          />
          <span className="mr-0.5 text-[var(--color-accent)] transition group-hover:text-white">Open</span>
          Stair
        </Link>

        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1.5 sm:w-auto sm:justify-start"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition duration-300 hover:bg-white/12 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
