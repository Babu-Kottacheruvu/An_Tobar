import type { TranslationKey } from "../i18n/translations";
import type { socialIcons } from "../components/iconMaps";

export interface SocialLink {
  id: keyof typeof socialIcons;
  labelKey: TranslationKey;
}

export const socialLinks: SocialLink[] = [
  { id: "facebook", labelKey: "social.facebook" },
  { id: "twitter", labelKey: "social.twitter" },
  { id: "instagram", labelKey: "social.instagram" },
  { id: "youtube", labelKey: "social.youtube" },
];
