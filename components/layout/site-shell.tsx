import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-2">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}
