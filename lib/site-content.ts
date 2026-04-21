export const siteName = "OpenStair";

export const navLinks = [
  { href: "/", label: "OpenStair" },
  { href: "/about", label: "OpenStair" },
  { href: "/contact", label: "OpenStair - Contact Us" },
] as const;

export const featureCards = [
  {
    title: "Unified Execution Layer",
    description:
      "Connect product, ops, and engineering in one living flow so teams stop losing context across tools.",
  },
  {
    title: "Signal-First Dashboards",
    description:
      "Prioritize what matters with sharp, real-time visibility into blockers, momentum, and customer impact.",
  },
  {
    title: "Automation Without Fragility",
    description:
      "Ship reliable workflows with guardrails built in, so your team can move fast without cleanup cycles.",
  },
  {
    title: "Collaborative Decision Trails",
    description:
      "Keep rationale, approvals, and outcomes linked to every initiative for faster alignment and accountability.",
  },
] as const;

export const howItWorks = [
  {
    step: "Connect",
    description: "Bring your projects, docs, and delivery signals into one structured operating surface.",
  },
  {
    step: "Prioritize",
    description: "Use clear focus lanes to decide what moves the business forward right now.",
  },
  {
    step: "Execute",
    description: "Run work with shared context, predictable handoffs, and measurable outcomes.",
  },
] as const;
