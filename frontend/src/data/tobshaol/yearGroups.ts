import type { Bilingual } from "../types";

export interface YearGroupOption {
  id: string;
  label: Bilingual;
}

/**
 * Configurable year-group filter/button data. An administrator renaming,
 * adding or removing an entry here changes both the homepage button grid
 * and the search filters - no component code needs to change.
 */
export const tobshaolYearGroups: YearGroupOption[] = [
  { id: "bliain-1", label: { ga: "Bliain 1", en: "1st Year" } },
  { id: "bliain-2-3", label: { ga: "Bliain 2/3", en: "2nd/3rd Year" } },
  { id: "idirbhliain", label: { ga: "Idirbhliain", en: "Transition Year" } },
  { id: "bliain-5-6", label: { ga: "Bliain 5/6", en: "5th/6th Year" } },
];
