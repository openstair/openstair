export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
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
      "A practical look at structuring Flutter apps with feature boundaries, testable layers, and scalable state management.",
    date: "2026-01-15",
    readTime: "5 min read",
    tags: ["Flutter", "Architecture", "Mobile"],
    sections: [
      {
        heading: "Why Architecture Matters",
        body: "Flutter makes it easy to build quickly, but production apps need more than fast UI work. Clean architecture keeps business rules, data access, and presentation code separated so teams can add features without creating a fragile codebase.",
      },
      {
        heading: "Recommended Layers",
        body: "A practical Flutter structure usually includes presentation, domain, and data layers. The presentation layer owns widgets and state, the domain layer models use cases, and the data layer handles APIs, storage, and external services.",
      },
      {
        heading: "How OpenStair Applies It",
        body: "For client apps, OpenStair uses architecture patterns that match the product stage. Smaller MVPs stay lightweight, while larger applications receive stronger boundaries, testing support, and clear feature modules.",
      },
    ],
  },
  {
    slug: "flutter-api-integration",
    title: "Flutter API Integration: Building Reliable Data Flows",
    description:
      "How to plan Flutter API integration with authentication, error handling, loading states, and maintainable service boundaries.",
    date: "2026-02-10",
    readTime: "4 min read",
    tags: ["Flutter", "API Integration", "Backend"],
    sections: [
      {
        heading: "Start with the Contract",
        body: "Reliable Flutter API integration starts with a clear contract between the app and backend. Endpoints, request models, response models, errors, pagination, and authentication behavior should be agreed before UI work depends on them.",
      },
      {
        heading: "Handle Real-World States",
        body: "Production apps need predictable handling for loading, empty, success, offline, unauthorized, and error states. Treating these states as part of the user experience prevents confusing screens and support-heavy releases.",
      },
      {
        heading: "Keep Services Maintainable",
        body: "A clean API layer keeps networking details away from widgets. This makes the app easier to test, easier to refactor, and safer when backend contracts evolve.",
      },
    ],
  },
  {
    slug: "spring-boot-authentication",
    title: "Spring Boot Authentication for Mobile and Web Applications",
    description:
      "Core decisions for building secure authentication with Spring Boot backends that serve mobile apps and web applications.",
    date: "2026-03-05",
    readTime: "6 min read",
    tags: ["Spring Boot", "Backend", "Security"],
    sections: [
      {
        heading: "Authentication Is a Product Foundation",
        body: "Authentication affects onboarding, security, data access, support, and trust. A Spring Boot backend should treat login, token refresh, password reset, and authorization as first-class product workflows.",
      },
      {
        heading: "Design Token Flows Carefully",
        body: "Mobile and web clients often need different token storage and refresh strategies. Backend APIs should keep token lifetimes, refresh behavior, and invalidation rules explicit and easy to reason about.",
      },
      {
        heading: "Plan Authorization Early",
        body: "Role and permission models become harder to retrofit after launch. OpenStair designs backend systems with clear ownership rules so APIs expose only the data a user should access.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
