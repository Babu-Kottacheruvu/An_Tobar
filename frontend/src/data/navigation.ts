import type { TranslationKey } from "../i18n/translations";

export interface NavItem {
  id: string;
  labelKey: TranslationKey;
  path: string;
  /** External links open in a new tab and carry rel=noopener */
  external?: boolean;
}

/**
 * Primary site navigation. Adding, removing or reordering an entry here is
 * all that is needed to change the rendered header/mobile navigation - no
 * component code needs to change.
 */
export const mainNavigation: NavItem[] = [
  { id: "home", labelKey: "nav.home", path: "/" },
  { id: "news", labelKey: "nav.news", path: "/nuacht" },
  { id: "resources", labelKey: "nav.resources", path: "/acmhainni" },
  { id: "competitions", labelKey: "nav.competitions", path: "/comortais" },
  { id: "tobghaeltacht", labelKey: "nav.tobghaeltacht", path: "/tobghaeltacht" },
  { id: "padlet", labelKey: "nav.padlet", path: "/padlet-cogg" },
];
