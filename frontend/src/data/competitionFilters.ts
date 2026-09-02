import type { Bilingual } from "./types";
import type { EntryType } from "./competitions";

export interface LevelFilterOption {
  id: "primary" | "post-primary";
  label: Bilingual;
}

export const competitionLevelOptions: LevelFilterOption[] = [
  { id: "primary", label: { en: "Primary", ga: "Bunscoil" } },
  { id: "post-primary", label: { en: "Secondary", ga: "Iar-bhunscoil" } },
];

export interface EntryTypeOption {
  id: EntryType;
  label: Bilingual;
}

export const entryTypeOptions: EntryTypeOption[] = [
  { id: "individual", label: { en: "Individual", ga: "Aonair" } },
  { id: "school", label: { en: "School", ga: "Scoil" } },
  { id: "class", label: { en: "Class", ga: "Rang" } },
];
