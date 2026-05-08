export const siteName = "OpenStair Technologies";

export const navLinks = [
  { href: "/", label: "Home" },
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
  { href: "https://apps.openstair.in", label: "Apps", external: true },
  { href: "/open-source", label: "Open Source" },
  { href: "/blog", label: "Blog", match: ["/blog"] },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/open-source", label: "Open Source" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceLinks = [
  { href: "/flutter-development", label: "Flutter Development" },
  { href: "/android-development", label: "Android Development" },
  { href: "/web-development", label: "Web Development" },
  { href: "/backend-development", label: "Backend Development" },
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
    title: "Flutter App Development",
    description:
      "Cross-platform mobile apps with smooth UI, maintainable architecture, and production-ready release workflows.",
  },
  {
    title: "Android App Development",
    description:
      "Native Android apps built for performance, reliability, Play Store readiness, and long-term scalability.",
  },
  {
    title: "Web Development",
    description:
      "Responsive websites and modern web applications built with clean interfaces, strong SEO, and fast loading.",
  },
  {
    title: "Backend Development",
    description:
      "Secure APIs, database architecture, integrations, and backend systems that support real product growth.",
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
