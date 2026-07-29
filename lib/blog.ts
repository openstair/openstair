import type { BrandImageKey } from "@/lib/brand-assets";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  heroAsset: BrandImageKey;
  internalLinks: {
    href: string;
    label: string;
  }[];
  sections: {
    heading: string;
    body: string;
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "flutter-clean-architecture",
    title: "Flutter Clean Architecture for Maintainable Mobile Apps",
    description:
      "How feature boundaries, domain rules, and disciplined state management keep Flutter apps ready for real product growth.",
    date: "2026-01-15",
    readTime: "6 min read",
    tags: ["Flutter", "Architecture", "Engineering"],
    heroAsset: "serviceFlutter",
    internalLinks: [
      { href: "/flutter-development", label: "Flutter Development" },
      { href: "/docs/company/engineering-philosophy", label: "Engineering Philosophy" },
    ],
    sections: [
      {
        heading: "Architecture Protects Product Speed",
        body: "Flutter helps teams move quickly, but speed only compounds when the codebase stays understandable. Clear feature boundaries keep UI, business decisions, data access, and platform services from collapsing into one hard-to-change layer.",
      },
      {
        heading: "A Practical Layering Model",
        body: "OpenStair favors presentation, domain, and data layers where the product needs them. Smaller releases stay lightweight, while systems with authentication, payments, offline behavior, or role-based workflows get stronger boundaries and testable use cases.",
      },
      {
        heading: "What Businesses Gain",
        body: "Clean architecture reduces regression risk, makes onboarding easier, and lets future features attach to known seams in the product. That matters when a mobile app becomes a long-term channel rather than a launch experiment.",
      },
    ],
  },
  {
    slug: "flutter-performance-production-apps",
    title: "Flutter Performance Habits for Production Apps",
    description:
      "Performance work in Flutter is less about tricks and more about build discipline, rendering awareness, and predictable data flow.",
    date: "2026-02-03",
    readTime: "5 min read",
    tags: ["Flutter", "Performance", "Mobile"],
    heroAsset: "memoryMatchKingDeviceMockup",
    internalLinks: [
      { href: "/apps", label: "Applications" },
      { href: "/flutter-development", label: "Flutter Development" },
    ],
    sections: [
      {
        heading: "Performance Starts Before Profiling",
        body: "A fast app usually begins with simple widget trees, controlled rebuilds, clear loading states, and data models that do not force the interface to guess. Profiling is important, but it works best after the structure is already clean.",
      },
      {
        heading: "Design for Real Devices",
        body: "Production Flutter apps should be checked on mid-range devices, slow networks, and dense content screens. Smooth animation on a developer machine is not enough evidence for a reliable customer experience.",
      },
      {
        heading: "Keep Measurement Close",
        body: "OpenStair treats performance as a release habit. We watch image sizes, app startup, API latency, rebuild hot spots, and navigation flow so quality remains visible throughout development.",
      },
    ],
  },
  {
    slug: "building-production-mobile-apps",
    title: "Building Production Apps Beyond the First Release",
    description:
      "A production app needs release planning, observability, support paths, and technical choices that keep the product operable after launch.",
    date: "2026-02-18",
    readTime: "6 min read",
    tags: ["Mobile", "Engineering", "Company"],
    heroAsset: "applicationsHero",
    internalLinks: [
      { href: "/apps", label: "Applications" },
      { href: "/services", label: "Services" },
    ],
    sections: [
      {
        heading: "Launch Is a System",
        body: "The first store release is only one part of production readiness. Teams need versioning, error handling, analytics, support workflows, and a clear plan for how changes reach users without creating avoidable risk.",
      },
      {
        heading: "Product Decisions Become Engineering Decisions",
        body: "Authentication, onboarding, notifications, payments, and content updates all affect architecture. Treating them as isolated features creates brittle apps; planning them as product systems creates room to grow.",
      },
      {
        heading: "How OpenStair Works",
        body: "OpenStair builds mobile products with release ownership in mind: stable foundations, documented decisions, and handover notes that help the product remain understandable after delivery.",
      },
    ],
  },
  {
    slug: "backend-architecture-mobile-web",
    title: "Backend Architecture for Mobile and Web Products",
    description:
      "Strong backend architecture gives apps stable data, clear permissions, reliable integrations, and room for future product workflows.",
    date: "2026-03-05",
    readTime: "7 min read",
    tags: ["Backend", "Architecture", "Security"],
    heroAsset: "serviceBackend",
    internalLinks: [
      { href: "/backend-development", label: "Backend Development" },
      { href: "/services", label: "Services" },
    ],
    sections: [
      {
        heading: "The Backend Carries Product Rules",
        body: "Mobile and web interfaces should not be forced to reconstruct business logic from scattered endpoints. A dependable backend gives the product a single place for rules, permissions, validation, and long-running workflow decisions.",
      },
      {
        heading: "Design Around Boundaries",
        body: "Good backend systems separate API contracts, domain behavior, persistence, integrations, and operational concerns. That separation makes change safer when the product adds new clients, user roles, or partner systems.",
      },
      {
        heading: "Build for Operation",
        body: "A backend is not finished when endpoints return data. It needs logs, meaningful errors, deployment clarity, migration discipline, and documentation that lets the system be maintained with confidence.",
      },
    ],
  },
  {
    slug: "software-documentation-that-ships",
    title: "Software Documentation That Actually Ships With the Product",
    description:
      "Documentation should capture decisions, constraints, and operating knowledge without slowing the engineering team down.",
    date: "2026-03-22",
    readTime: "5 min read",
    tags: ["Documentation", "Engineering", "Architecture"],
    heroAsset: "documentationHero",
    internalLinks: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/processes/documentation-authoring", label: "Authoring Process" },
    ],
    sections: [
      {
        heading: "Documentation Is Product Infrastructure",
        body: "Useful documentation explains why the system exists, how key decisions were made, and where future changes should happen. It reduces dependency on memory and makes the product easier to operate.",
      },
      {
        heading: "Write the Right Level",
        body: "Teams do not need endless documents. They need concise architecture notes, service references, onboarding guides, API behavior, and release decisions that stay close to the code and product workflow.",
      },
      {
        heading: "Knowledge Transfer Is Delivery",
        body: "OpenStair treats handover as part of engineering quality. A product is stronger when the client can understand its structure, risks, and next steps without reverse-engineering every decision.",
      },
    ],
  },
  {
    slug: "knowledge-platform-for-engineering-teams",
    title: "Why Engineering Teams Need a Knowledge Platform",
    description:
      "A lightweight knowledge platform helps companies keep service thinking, product decisions, and reusable business assets aligned.",
    date: "2026-04-08",
    readTime: "6 min read",
    tags: ["Documentation", "Knowledge Platform", "Company"],
    heroAsset: "documentationHero",
    internalLinks: [
      { href: "/docs", label: "Knowledge Platform" },
      { href: "/docs/engineering/documentation-guidelines", label: "Documentation Guidelines" },
    ],
    sections: [
      {
        heading: "Knowledge Gets Fragmented Quickly",
        body: "As products grow, important decisions spread across chat, documents, tickets, and code comments. A knowledge platform gives teams a maintained place for business context, engineering standards, and reusable material.",
      },
      {
        heading: "Governance Keeps It Useful",
        body: "Documentation only works when it is searchable, current, and clearly owned. OpenStair’s Knowledge Platform keeps public company material, service references, and governance checks connected.",
      },
      {
        heading: "Better Context Improves Delivery",
        body: "When teams can find the right background quickly, they make better technical decisions. That is especially valuable for long-term partnerships where product context matters as much as implementation detail.",
      },
    ],
  },
  {
    slug: "open-source-engineering-principles",
    title: "Open Source Engineering as a Product Discipline",
    description:
      "Reusable packages and public engineering notes turn repeated product lessons into tools that benefit future projects.",
    date: "2026-04-26",
    readTime: "5 min read",
    tags: ["Open Source", "Engineering", "Flutter"],
    heroAsset: "openSourceHero",
    internalLinks: [
      { href: "/open-source", label: "Open Source" },
      { href: "https://github.com/openstair", label: "GitHub" },
    ],
    sections: [
      {
        heading: "Reuse Should Be Earned",
        body: "Open source work is strongest when it comes from real repeated needs. A package, tool, or reference pattern should clarify a problem instead of adding abstraction for its own sake.",
      },
      {
        heading: "Good Public Work Raises Internal Quality",
        body: "Preparing code or documentation for public use forces cleaner naming, sharper boundaries, and better examples. Those habits improve private client work as well.",
      },
      {
        heading: "OpenStair's Commitment",
        body: "OpenStair contributes Flutter packages, engineering tools, documentation, and libraries back to the community whenever a reusable pattern can help other builders without compromising client trust.",
      },
    ],
  },
  {
    slug: "why-flutter-for-businesses",
    title: "Why Flutter Works for Business Mobile Products",
    description:
      "Flutter is a strong choice when a business needs polished mobile UX, consistent behavior, and a practical path across platforms.",
    date: "2026-05-14",
    readTime: "6 min read",
    tags: ["Flutter", "Business", "Mobile"],
    heroAsset: "serviceFlutter",
    internalLinks: [
      { href: "/flutter-development", label: "Flutter Services" },
      { href: "/contact", label: "Book Consultation" },
    ],
    sections: [
      {
        heading: "One Product Experience Across Platforms",
        body: "Businesses often need Android and iOS experiences that feel consistent without paying for two disconnected product efforts. Flutter can support that goal while still leaving room for platform-specific polish.",
      },
      {
        heading: "Fast Iteration With Strong UI Control",
        body: "Flutter gives teams a productive development loop and a precise interface toolkit. That combination is useful when a product needs to learn from users quickly without sacrificing visual quality.",
      },
      {
        heading: "The Right Fit Still Matters",
        body: "Flutter is not a magic answer for every application. OpenStair evaluates product requirements, native integrations, release plans, and long-term maintenance before recommending the stack.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return blogPosts
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      post: item,
      score: item.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((left, right) => right.score - left.score || right.post.date.localeCompare(left.post.date))
    .slice(0, limit)
    .map((item) => item.post);
}

export function getBlogTopics() {
  return ["Flutter", "Architecture", "Backend", "Engineering", "Open Source", "Documentation", "Company"];
}
