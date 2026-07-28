import type { Visibility } from "@/features/knowledge/domain/visibility";

export type BusinessAssetCategory = "profile" | "catalogue" | "statement";

export type BusinessAsset = {
  id: string;
  title: string;
  description: string;
  purpose: string;
  intendedAudience: string;
  sourceDocumentSlug: string;
  category: BusinessAssetCategory;
  visibility: Visibility;
  supportedExportFormats: string[];
};

export const businessAssetRegistry = [
  {
    id: "company-profile",
    title: "Company Profile",
    description:
      "Official company profile for formal onboarding, registration, and partner review.",
    purpose:
      "Presents OpenStair Technologies as an official company profile built from canonical company and business knowledge.",
    intendedAudience:
      "Banks, government registrations, enterprise clients, business partners, and corporate onboarding teams.",
    sourceDocumentSlug: "business/company-profile",
    category: "profile",
    visibility: "public",
    supportedExportFormats: ["PDF", "DOCX", "Print"],
  },
  {
    id: "business-profile",
    title: "Business Profile",
    description:
      "Commercial profile focused on OpenStair service delivery, capability, and engagement model.",
    purpose:
      "Summarizes OpenStair's commercial capability for procurement, onboarding, and partnership discussions.",
    intendedAudience:
      "Prospective clients, vendor onboarding teams, enterprise procurement, banks, and partners.",
    sourceDocumentSlug: "business/business-profile",
    category: "profile",
    visibility: "public",
    supportedExportFormats: ["PDF", "DOCX", "Print"],
  },
  {
    id: "service-catalogue",
    title: "Service Catalogue",
    description:
      "Official catalogue of OpenStair service capabilities and engagement models.",
    purpose:
      "Defines the current service portfolio for proposals, partnerships, procurement, and future website reuse.",
    intendedAudience:
      "Prospective clients, enterprise procurement, proposal reviewers, and business partners.",
    sourceDocumentSlug: "business/service-catalogue",
    category: "catalogue",
    visibility: "public",
    supportedExportFormats: ["PDF", "DOCX", "Print"],
  },
  {
    id: "capability-statement",
    title: "Capability Statement",
    description:
      "Executive capability summary for enterprise, government, and vendor evaluation.",
    purpose:
      "Answers why an organization should choose OpenStair before a detailed proposal is prepared.",
    intendedAudience:
      "Enterprise clients, government procurement, GeM registration, vendor onboarding, partnerships, and proposal reviewers.",
    sourceDocumentSlug: "business/capability-statement",
    category: "statement",
    visibility: "public",
    supportedExportFormats: ["PDF", "DOCX", "Print"],
  },
] as const satisfies BusinessAsset[];

export function getBusinessAsset(assetId: string) {
  return businessAssetRegistry.find((asset) => asset.id === assetId);
}

