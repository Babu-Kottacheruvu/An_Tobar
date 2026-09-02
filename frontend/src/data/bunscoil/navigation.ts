import type { TranslationKey } from "../../i18n/translations";

export interface BunscoilNavItem {
  id: string;
  labelKey: TranslationKey;
  path: string;
}

export const bunscoilNavigation: BunscoilNavItem[] = [
  { id: "home", labelKey: "nav.home", path: "/bunscoil" },
  { id: "teacher-guide", labelKey: "bunscoil.nav.teacherGuide", path: "/bunscoil/treoir-an-muinteora" },
  { id: "resources", labelKey: "bunscoil.nav.resources", path: "/bunscoil/acmhainni" },
  { id: "badges", labelKey: "bunscoil.nav.badges", path: "/bunscoil/suaitheantais" },
  { id: "kids-corner", labelKey: "bunscoil.nav.kidsCorner", path: "/bunscoil/cuinne-na-bpaisti" },
];
