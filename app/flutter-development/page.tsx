import { ServiceLanding } from "@/components/ui/service-landing";
import { createSeoMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const service = servicePages.flutter;

export const metadata = createSeoMetadata({
  title: "Flutter App Development Company",
  description:
    "OpenStair Technologies is a Flutter development company building cross-platform app development solutions with scalable architecture and polished mobile UX.",
  path: service.href,
  keywords: [
    "Flutter app development",
    "Flutter development company",
    "cross-platform app development",
  ],
});

export default function FlutterDevelopmentPage() {
  return <ServiceLanding {...service} />;
}
