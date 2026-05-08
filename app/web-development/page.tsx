import { ServiceLanding } from "@/components/ui/service-landing";
import { createSeoMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const service = servicePages.web;

export const metadata = createSeoMetadata({
  title: "Modern Web Development",
  description:
    "OpenStair Technologies builds modern web development projects, scalable web applications, and responsive websites with strong UX and SEO foundations.",
  path: service.href,
  keywords: [
    "modern web development",
    "scalable web applications",
    "responsive websites",
  ],
});

export default function WebDevelopmentPage() {
  return <ServiceLanding {...service} />;
}
