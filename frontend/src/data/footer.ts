import type { TranslationKey } from "../i18n/translations";

export interface FooterLink {
  id: string;
  labelKey: TranslationKey;
  path: string;
}

export interface FooterColumn {
  id: string;
  headingKey: TranslationKey;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    id: "explore",
    headingKey: "footer.usefulLinks",
    links: [
      { id: "home", labelKey: "nav.home", path: "/" },
      { id: "news", labelKey: "nav.news", path: "/nuacht" },
      { id: "resources", labelKey: "nav.resources", path: "/acmhainni" },
      { id: "competitions", labelKey: "nav.competitions", path: "/comortais" },
    ],
  },
  {
    id: "community",
    headingKey: "nav.tobghaeltacht",
    links: [
      { id: "tobghaeltacht", labelKey: "nav.tobghaeltacht", path: "/tobghaeltacht" },
      { id: "padlet", labelKey: "nav.padlet", path: "/padlet-cogg" },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { id: "accessibility", labelKey: "footer.accessibility", path: "/inrochtaineacht" },
  { id: "privacy", labelKey: "footer.privacy", path: "/priobhaideacht" },
  { id: "cookies", labelKey: "footer.cookies", path: "/fianain" },
];
