import { ServiceLanding } from "@/components/ui/service-landing";
import { createSeoMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const service = servicePages.android;

export const metadata = createSeoMetadata({
  title: "Android App Development",
  description:
    "OpenStair Technologies builds native Android apps and scalable Android solutions for businesses launching reliable mobile products.",
  path: service.href,
  keywords: [
    "Android app development",
    "native Android apps",
    "scalable Android solutions",
  ],
});

export default function AndroidDevelopmentPage() {
  return <ServiceLanding {...service} />;
}
