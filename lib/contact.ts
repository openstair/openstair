const fallback = {
  email: "hello@openstair.com",
  mobile: "+91 87559 64418",
  whatsapp: "https://wa.me/917818899109",
  linkedin: "https://www.linkedin.com/company/openstair",
  instagram: "https://www.instagram.com/open.stair",
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
};

export function getContactChannels(): ContactChannel[] {
  const email = process.env.NEXT_PUBLIC_OPENSTAIR_EMAIL ?? fallback.email;
  const mobile = process.env.NEXT_PUBLIC_OPENSTAIR_MOBILE ?? fallback.mobile;
  const whatsapp = process.env.NEXT_PUBLIC_OPENSTAIR_WHATSAPP ?? fallback.whatsapp;
  const linkedin = process.env.NEXT_PUBLIC_OPENSTAIR_LINKEDIN ?? fallback.linkedin;
  const instagram = process.env.NEXT_PUBLIC_OPENSTAIR_INSTAGRAM ?? fallback.instagram;

  return [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      label: "Mobile",
      value: mobile,
      href: `tel:${mobile.replace(/\s+/g, "")}`,
    },
    {
      label: "WhatsApp",
      value: whatsapp,
      href: whatsapp,
    },
    {
      label: "LinkedIn",
      value: linkedin,
      href: linkedin,
    },
    {
      label: "Instagram",
      value: instagram,
      href: instagram,
    },
  ];
}
