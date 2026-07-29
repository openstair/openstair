export const siteName = "OpenStair Technologies";

export const navLinks = [
  {
    href: "/services",
    label: "Services",
    match: [
      "/services",
      "/flutter-development",
      "/android-development",
      "/web-development",
      "/backend-development",
    ],
  },
  { href: "/apps", label: "Applications", match: ["/apps"] },
  { href: "/open-source", label: "Open Source" },
  { href: "/blog", label: "Blog", match: ["/blog"] },
  { href: "/docs", label: "Documentation", match: ["/docs"] },
  { href: "/about", label: "About" },
] as const;

export const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/apps", label: "Applications" },
  { href: "/docs", label: "Documentation" },
  { href: "/blog", label: "Blog" },
  { href: "/open-source", label: "Open Source" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceLinks = [
  { href: "/flutter-development", label: "Flutter Development" },
  { href: "/android-development", label: "Android Development" },
  { href: "/web-development", label: "Web Development" },
  { href: "/backend-development", label: "Backend Development" },
] as const;

export const documentationLinks = [
  { href: "/docs", label: "Company Knowledge" },
] as const;

export const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/apps", label: "Apps Portfolio" },
  { href: "/open-source", label: "Open Source" },
] as const;

export const legalLinks = [
  { href: "/docs/legal/privacy-policy-overview", label: "Privacy" },
  { href: "/docs/legal/terms-overview", label: "Terms" },
] as const;

export const platformLinks = [
  { href: "https://github.com/openstair", label: "GitHub", icon: "github" },
  {
    href: "https://play.google.com/store/apps/dev?id=8492821411434576790",
    label: "Play Store",
    icon: "play",
  },
  { href: "https://www.instagram.com/open.stair", label: "Instagram", icon: "instagram" },
  { href: "https://www.facebook.com/openstair1", label: "Facebook", icon: "facebook" },
  { href: "https://www.youtube.com/@open.stair-1", label: "YouTube", icon: "youtube" },
  { href: "https://www.linkedin.com/company/openstair", label: "LinkedIn", icon: "linkedin" },
  { href: "https://pub.dev/publishers/openstair.in", label: "pub.dev", icon: "pubdev" },
] as const;

export const featureCards = [
  {
    icon: "FL",
    title: "Flutter App Development",
    description:
      "Replace platform sprawl with one polished mobile codebase. Flutter, Dart, APIs, releases. Outcome: faster launches with maintainable app architecture.",
    assetName: "dummy_image_flutter_service.webp",
  },
  {
    icon: "AN",
    title: "Android App Development",
    description:
      "Native Android apps built for performance, reliability, Play Store readiness, and long-term scalability.",
    assetName: "dummy_image_flutter_service.webp",
  },
  {
    icon: "WB",
    title: "Web Development",
    description:
      "Turn unclear web presence into a fast product surface. Next.js, React, TypeScript, SEO. Outcome: credible pages and scalable web apps.",
    assetName: "dummy_image_web_service.webp",
  },
  {
    icon: "BE",
    title: "Backend Development",
    description:
      "Stabilize the systems behind your app. Spring Boot, databases, auth, integrations. Outcome: secure APIs ready for product growth.",
    assetName: "dummy_image_backend_service.webp",
  },
  {
    icon: "AI",
    title: "AI-Ready Product Systems",
    description:
      "Prepare workflows for intelligent features. Data flows, APIs, automation, guardrails. Outcome: practical AI capability without fragile experiments.",
    assetName: "dummy_image_ai_service.webp",
  },
] as const;

export const trustIndicators = [
  {
    value: "Mobile",
    label: "Product Frontends",
    detail: "Flutter and Android interfaces built for real release paths.",
  },
  {
    value: "Web",
    label: "Public Surfaces",
    detail: "Fast websites and applications with technical SEO foundations.",
  },
  {
    value: "Backend",
    label: "Core Systems",
    detail: "APIs, data models, integrations, and secure service layers.",
  },
  {
    value: "Launch",
    label: "Delivery Ownership",
    detail: "Planning, implementation, release support, and handover clarity.",
  },
] as const;

export const engineeringProcess = [
  {
    step: "01",
    title: "Clarify",
    description:
      "Define the product goal, operating constraints, users, and technical path before implementation begins.",
  },
  {
    step: "02",
    title: "Engineer",
    description:
      "Build with clear boundaries across presentation, business rules, data access, integrations, and deployment.",
  },
  {
    step: "03",
    title: "Handover",
    description:
      "Prepare the product for launch, documentation, maintenance, and future feature growth.",
  },
] as const;

export const featuredApps = [
  {
    title: "Memory Match King",
    description:
      "Flagship OpenStair application showcase with room for store badges, gallery assets, and future release highlights.",
    href: "/apps",
    label: "View flagship app",
    assetName: "dummy_image_memory_match_showcase.webp",
  },
] as const;

export const openSourceProjects = [
  {
    title: "Flutter UI Utilities",
    description:
      "Reusable interface patterns exist to make mobile products faster to assemble without losing consistency.",
    href: "https://pub.dev/publishers/openstair.in",
    label: "View pub.dev",
  },
  {
    title: "API Client Helpers",
    description:
      "Typed integration helpers reduce repeated networking work and make app-to-backend contracts easier to maintain.",
    href: "https://github.com/openstair",
    label: "View GitHub",
  },
  {
    title: "Reference Applications",
    description:
      "Small examples document product architecture choices so teams can inspect practical implementation patterns.",
    href: "https://github.com/openstair",
    label: "View projects",
  },
] as const;

export const whyOpenStair = [
  "Practical technical judgment",
  "Maintainability-minded decisions",
  "Clear communication and ownership",
  "Documentation as delivery discipline",
] as const;

export const engineeringExcellence = [
  {
    title: "Product-fit architecture",
    description:
      "Architecture is matched to the product stage, expected lifetime, and real operational risk.",
  },
  {
    title: "Visible trade-offs",
    description:
      "Important decisions are made explicit so the product can keep moving without hidden technical debt.",
  },
  {
    title: "Reliable handover",
    description:
      "Code, documentation, and delivery context are shaped so future work stays understandable.",
  },
] as const;

export const howItWorks = [
  {
    step: "Discover",
    description: "Clarify product goals, users, technical constraints, and the cleanest delivery path.",
  },
  {
    step: "Engineer",
    description: "Design, build, integrate, and test the application with a scalable codebase foundation.",
  },
  {
    step: "Launch",
    description: "Prepare production deployment, app store release, performance checks, and next-step support.",
  },
] as const;

export const technologies = [
  "Flutter",
  "Dart",
  "Android",
  "Kotlin",
  "Next.js",
  "React",
  "TypeScript",
  "Spring Boot",
  "REST APIs",
  "PostgreSQL",
  "Firebase",
  "Vercel",
] as const;
