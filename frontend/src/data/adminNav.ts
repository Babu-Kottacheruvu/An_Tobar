import type { TranslationKey } from "../i18n/translations";

export interface AdminNavItem {
  id: string;
  labelKey: TranslationKey;
  path: string;
}

export const adminNavigation: AdminNavItem[] = [
  { id: "dashboard", labelKey: "admin.dashboard", path: "/admin" },
  { id: "content", labelKey: "admin.content", path: "/admin/abhar" },
  { id: "resources", labelKey: "admin.resources", path: "/admin/acmhainni" },
  { id: "navigation", labelKey: "admin.navigation", path: "/admin/nascleanuint" },
  { id: "filters", labelKey: "admin.filters", path: "/admin/scagairi" },
  { id: "news", labelKey: "admin.news", path: "/admin/nuacht" },
  { id: "competitions", labelKey: "admin.competitions", path: "/admin/comortais" },
  { id: "featured", labelKey: "admin.featuredContent", path: "/admin/ar-barr" },
  { id: "media", labelKey: "admin.mediaLibrary", path: "/admin/meain" },
  { id: "users", labelKey: "admin.users", path: "/admin/usaideoiri" },
  { id: "settings", labelKey: "admin.settings", path: "/admin/socruithe" },
];
