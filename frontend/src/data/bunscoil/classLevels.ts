import type { Bilingual } from "../types";

export interface ClassLevel {
  id: string;
  label: Bilingual;
}

export const classLevels: ClassLevel[] = [
  { id: "naionain-shoisearacha", label: { en: "Junior Infants", ga: "Naíonáin Shóisearacha" } },
  { id: "naionain-shinsearacha", label: { en: "Senior Infants", ga: "Naíonáin Shinsearacha" } },
  { id: "rang-1", label: { en: "1st Class", ga: "Rang a hAon" } },
  { id: "rang-2", label: { en: "2nd Class", ga: "Rang a Dó" } },
  { id: "rang-3", label: { en: "3rd Class", ga: "Rang a Trí" } },
  { id: "rang-4", label: { en: "4th Class", ga: "Rang a Ceathair" } },
  { id: "rang-5", label: { en: "5th Class", ga: "Rang a Cúig" } },
  { id: "rang-6", label: { en: "6th Class", ga: "Rang a Sé" } },
];
