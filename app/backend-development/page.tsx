import { ServiceLanding } from "@/components/ui/service-landing";
import { socialAssets } from "@/lib/brand-assets";
import { createSeoMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const service = servicePages.backend;

export const metadata = createSeoMetadata({
  title: "Backend Development Services",
  description:
    "OpenStair Technologies provides backend development for scalable APIs, Spring Boot backend systems, database architecture, and secure integrations.",
  path: service.href,
  keywords: [
    "backend development",
    "scalable APIs",
    "Spring Boot backend",
    "database architecture",
  ],
  image: socialAssets.pages.services,
});

export default function BackendDevelopmentPage() {
  return <ServiceLanding {...service} />;
}
