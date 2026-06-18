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
    href: "https://www.facebook.com/share/1G425xaA7s/?mibextid=wwXIfr",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@cejasinternacionales?_r=1&_t=ZS-97EwJJASFNc",
  },
] satisfies SocialLink[]);
