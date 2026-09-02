import type { TranslationKey } from "../i18n/translations";

export interface EntryCardConfig {
  id: "bunscoil" | "iar-bhunscoil";
  variant: "primary" | "secondary";
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  path: string;
}

export const entryCards: EntryCardConfig[] = [
  {
    id: "bunscoil",
    variant: "primary",
    titleKey: "home.entryBunscoilTitle",
    subtitleKey: "home.entryBunscoilSubtitle",
    path: "/bunscoil",
  },
  {
    id: "iar-bhunscoil",
    variant: "secondary",
    titleKey: "home.entryIarbhunscoilTitle",
    subtitleKey: "home.entryIarbhunscoilSubtitle",
    path: "/iar-bhunscoil",
  },
];
