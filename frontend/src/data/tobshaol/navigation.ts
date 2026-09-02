import type { TranslationKey } from "../../i18n/translations";

export interface TobshaolNavItem {
  id: string;
  labelKey: TranslationKey;
  path: string;
}

export const tobshaolNavigation: TobshaolNavItem[] = [
  { id: "home", labelKey: "nav.home", path: "/iar-bhunscoil" },
  { id: "news", labelKey: "nav.news", path: "/nuacht" },
  { id: "resources", labelKey: "nav.resources", path: "/acmhainni" },
  { id: "competitions", labelKey: "nav.competitions", path: "/comortais" },
  { id: "tobghaeltacht", labelKey: "nav.tobghaeltacht", path: "/tobghaeltacht" },
];
