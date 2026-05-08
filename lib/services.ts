export type Service = {
  title: string;
  href: string;
  description: string;
  keywords: string;
};

export const services: Service[] = [
  {
    title: "Flutter Development",
    href: "/flutter-development",
    description:
      "Cross-platform mobile apps with polished interfaces, clean architecture, API integration, and release support.",
    keywords: "Flutter app development, cross-platform app development",
  },
  {
    title: "Android Development",
    href: "/android-development",
    description:
      "Native Android apps built for performance, reliability, Play Store publishing, and scalable product roadmaps.",
    keywords: "Android app development, native Android apps",
  },
  {
    title: "Web Development",
    href: "/web-development",
    description:
      "Responsive websites and scalable web applications with modern UI, technical SEO, and fast delivery.",
    keywords: "modern web development, responsive websites",
  },
  {
    title: "Backend Development",
    href: "/backend-development",
    description:
      "Secure backend systems, scalable APIs, Spring Boot services, database architecture, and integrations.",
    keywords: "backend development, scalable APIs, Spring Boot backend",
  },
  {
    title: "API Integration",
    href: "/backend-development",
    description:
      "Payment gateways, authentication, third-party services, analytics, notifications, and reliable data flows.",
    keywords: "API integration, third-party integrations",
  },
  {
    title: "Full Stack Solutions",
    href: "/services",
    description:
      "Complete product engineering across mobile, web, backend, deployment, maintenance, and iteration.",
    keywords: "full stack solutions, custom software development",
  },
];

export const servicePages = {
  flutter: {
    href: "/flutter-development",
    eyebrow: "Flutter Development",
    title: "Flutter App Development for Modern Cross-Platform Products",
    description:
      "OpenStair Technologies builds Flutter apps that feel native, scale cleanly, and help businesses launch faster across Android and iOS.",
    sections: [
      {
        title: "What Is Flutter?",
        body: "Flutter is Google's UI toolkit for building mobile, web, and desktop apps from a shared codebase. It is a strong fit when teams want high-quality interfaces, faster iteration, and consistent behavior across platforms.",
      },
      {
        title: "Flutter Development Services",
        body: "We handle app architecture, UI implementation, API integration, local storage, authentication, state management, performance tuning, testing, and release preparation.",
      },
      {
        title: "Why Choose Flutter?",
        body: "Flutter supports rapid development without giving up quality. It helps reduce duplicate code, keeps the user experience consistent, and gives product teams a practical path from MVP to production.",
      },
      {
        title: "Why Choose OpenStair?",
        body: "We bring a product-minded engineering approach to every Flutter project, with clean code, maintainable architecture, and careful attention to performance and user experience.",
      },
    ],
    benefits: [
      "One codebase for Android and iOS",
      "Fast development cycles",
      "Beautiful custom interfaces",
      "Strong app performance",
      "Maintainable architecture",
      "Lower long-term engineering overhead",
    ],
  },
  android: {
    href: "/android-development",
    eyebrow: "Android Development",
    title: "Android App Development for Scalable Mobile Products",
    description:
      "We design and build reliable Android apps with native performance, clean architecture, and production-focused engineering.",
    sections: [
      {
        title: "Native Android Apps",
        body: "OpenStair develops Android applications for businesses that need performance, platform-specific behavior, Play Store readiness, and a strong mobile foundation.",
      },
      {
        title: "Scalable Android Solutions",
        body: "From MVPs to mature apps, we structure Android codebases for features, testing, API integration, analytics, notifications, and long-term maintenance.",
      },
      {
        title: "Built for Real Users",
        body: "We focus on responsive interfaces, stable data handling, fast startup, predictable navigation, and the details that make apps feel trustworthy.",
      },
    ],
    benefits: [
      "Native Android performance",
      "Play Store release support",
      "Secure authentication flows",
      "API and payment integrations",
      "Crash-aware engineering",
      "Maintainable feature architecture",
    ],
  },
  web: {
    href: "/web-development",
    eyebrow: "Web Development",
    title: "Modern Web Development for Fast, Scalable Applications",
    description:
      "OpenStair builds responsive websites and web applications with strong UX, technical SEO, and scalable frontend architecture.",
    sections: [
      {
        title: "Responsive Websites",
        body: "We create websites that communicate clearly, load quickly, and work beautifully across mobile, tablet, and desktop screens.",
      },
      {
        title: "Scalable Web Applications",
        body: "For product teams, we build modern web applications with clean components, maintainable state, backend integration, and deployment-ready performance.",
      },
      {
        title: "SEO-Aware Engineering",
        body: "We use semantic HTML, metadata, structured data, internal linking, and performance-conscious implementation to help search engines understand your pages.",
      },
    ],
    benefits: [
      "Responsive UI development",
      "Next.js and React applications",
      "Technical SEO foundations",
      "Fast loading pages",
      "Accessible semantic markup",
      "Deployment on modern platforms",
    ],
  },
  backend: {
    href: "/backend-development",
    eyebrow: "Backend Development",
    title: "Backend Development for Secure APIs and Scalable Systems",
    description:
      "We build backend systems, scalable APIs, Spring Boot services, database architecture, and integrations for modern applications.",
    sections: [
      {
        title: "Scalable APIs",
        body: "OpenStair develops APIs that are secure, documented, maintainable, and ready to support mobile apps, websites, dashboards, and partner integrations.",
      },
      {
        title: "Spring Boot Backend",
        body: "We use Spring Boot where it fits the product need, especially for structured business logic, secure authentication, database-backed services, and enterprise-friendly APIs.",
      },
      {
        title: "Database Architecture",
        body: "We design data models, persistence layers, and integration flows with an eye toward reliability, query performance, and future product growth.",
      },
    ],
    benefits: [
      "REST API development",
      "Spring Boot services",
      "Authentication and authorization",
      "Database schema design",
      "Third-party integrations",
      "Production deployment support",
    ],
  },
} as const;
