import { socialLinkSchema, type SocialLink } from "@/lib/content/schema";

export const socialLinks = socialLinkSchema.array().parse([
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/cejasinternacionales/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100040191503345",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@cejasinternacionales",
  },
] satisfies SocialLink[]);
