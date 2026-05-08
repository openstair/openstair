const fallback = {
  email: "hello@openstair.in",
  call: "+91 78188 99109",
  whatsapp: "https://wa.me/917818899109?text=Hi&lang=en",
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
  const call = process.env.NEXT_PUBLIC_OPENSTAIR_CALL ?? fallback.call;
  const whatsapp = process.env.NEXT_PUBLIC_OPENSTAIR_WHATSAPP ?? fallback.whatsapp;
  const location = process.env.NEXT_PUBLIC_OPENSTAIR_LOCATION ?? fallback.location;
  const responseTime =
    process.env.NEXT_PUBLIC_OPENSTAIR_RESPONSE_TIME ?? fallback.responseTime;

  return [
    {
      title: "Primary Contacts",
      items: [
        { id: "email", label: "Email", value: email, href: `mailto:${email}` },
        { id: "whatsapp", label: "WhatsApp", value: "Chat on WhatsApp", href: whatsapp },
        {
          id: "call",
          label: "Call",
          value: call,
          href: `tel:${call.replace(/\s+/g, "")}`,
        },
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
