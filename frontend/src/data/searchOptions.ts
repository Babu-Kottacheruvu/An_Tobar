import type { TranslationKey } from "../i18n/translations";
import type { Level } from "./types";

export interface OptionConfig {
  id: string;
  labelKey: TranslationKey;
}

export const userTypeOptions: OptionConfig[] = [
  { id: "parent", labelKey: "userType.parent" },
  { id: "teacher", labelKey: "userType.teacher" },
  { id: "learner", labelKey: "userType.learner" },
];

export const contentTypeOptions: OptionConfig[] = [
  { id: "resources", labelKey: "contentType.resources" },
  { id: "training", labelKey: "contentType.training" },
  { id: "languageClasses", labelKey: "contentType.languageClasses" },
];

export interface YearGroupOption {
  id: string;
  level: Level;
  label: { en: string; ga: string };
}

export const yearGroupOptions: YearGroupOption[] = [
  { id: "junior-infants", level: "primary", label: { en: "Junior Infants", ga: "Naíonáin Shóisearacha" } },
  { id: "senior-infants", level: "primary", label: { en: "Senior Infants", ga: "Naíonáin Shinsearacha" } },
  { id: "first-second", level: "primary", label: { en: "1st / 2nd Class", ga: "Rang a 1 / Rang a 2" } },
  { id: "third-fourth", level: "primary", label: { en: "3rd / 4th Class", ga: "Rang a 3 / Rang a 4" } },
  { id: "fifth-sixth", level: "primary", label: { en: "5th / 6th Class", ga: "Rang a 5 / Rang a 6" } },
  { id: "junior-cycle", level: "post-primary", label: { en: "Junior Cycle (1st-3rd Year)", ga: "Sraith Shóisearach (1ú-3ú Bliain)" } },
  { id: "transition-year", level: "post-primary", label: { en: "Transition Year", ga: "Idirbhliain" } },
  { id: "senior-cycle", level: "post-primary", label: { en: "Senior Cycle (5th-6th Year)", ga: "Sraith Shinsearach (5ú-6ú Bliain)" } },
];

export const resultsPerPageOptions = [10, 20, 100] as const;
