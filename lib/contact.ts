const fallback = {
  email: "hello@openstair.in",
  mobile: "+91 78188 99109",
  whatsapp: "https://wa.me/917818899109?text=Hi",
  linkedin: "https://www.linkedin.com/company/openstair",
  github: "https://github.com/openstair",
  pubdev: "https://pub.dev/publishers/openstair.in/packages",
  instagram: "https://www.instagram.com/open.stair",
  facebook: "https://www.facebook.com/openstairtech",
  youtube: "https://www.youtube.com/@open.stair-1",
  location: "India",
  responseTime: "Within 24 hours on business days",
};

export type ContactGroup = {
  title: string;
  items: Array<{
    id: string;
    label: string;
    value: string;
    href?: string;
  }>;
};

export function getContactGroups(): ContactGroup[] {
  const email = process.env.NEXT_PUBLIC_OPENSTAIR_EMAIL ?? fallback.email;
  const call = process.env.NEXT_PUBLIC_OPENSTAIR_CALL ?? fallback.mobile;
  const whatsapp = process.env.NEXT_PUBLIC_OPENSTAIR_WHATSAPP ?? fallback.whatsapp;
  const linkedin = process.env.NEXT_PUBLIC_OPENSTAIR_LINKEDIN ?? fallback.linkedin;
  const github = process.env.NEXT_PUBLIC_OPENSTAIR_GITHUB ?? fallback.github;
  const pubdev = process.env.NEXT_PUBLIC_OPENSTAIR_PUBDEV ?? fallback.pubdev;
  const instagram = process.env.NEXT_PUBLIC_OPENSTAIR_INSTAGRAM ?? fallback.instagram;
  const facebook = process.env.NEXT_PUBLIC_OPENSTAIR_FACEBOOK ?? fallback.facebook;
  const youtube = process.env.NEXT_PUBLIC_OPENSTAIR_YOUTUBE ?? fallback.youtube;
  const location = process.env.NEXT_PUBLIC_OPENSTAIR_LOCATION ?? fallback.location;
  const responseTime =
    process.env.NEXT_PUBLIC_OPENSTAIR_RESPONSE_TIME ?? fallback.responseTime;

  return [
    {
      title: "Primary Contacts",
      items: [
        { id: "email", label: "Email", value: email, href: `mailto:${email}` },
        { id: "whatsapp", label: "WhatsApp", value: whatsapp, href: whatsapp },
        {
          id: "call",
          label: "Call",
          value: call,
          href: `tel:${call.replace(/\s+/g, "")}`,
        },
      ],
    },
    {
      title: "Presence",
      items: [
        { id: "linkedin", label: "LinkedIn", value: linkedin, href: linkedin },
        { id: "github", label: "GitHub", value: github, href: github },
        { id: "pubdev", label: "pub.dev", value: pubdev, href: pubdev },
      ],
    },
    {
      title: "Social",
      items: [
        { id: "instagram", label: "Instagram", value: instagram, href: instagram },
        { id: "facebook", label: "Facebook", value: facebook, href: facebook },
        { id: "youtube", label: "YouTube", value: youtube, href: youtube },
      ],
    },
    {
      title: "Info",
      items: [
        { id: "location", label: "Location", value: location },
        { id: "responseTime", label: "Response time", value: responseTime },
      ],
    },
  ];
}
