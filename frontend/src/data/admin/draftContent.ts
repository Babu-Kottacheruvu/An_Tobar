import type { Bilingual } from "../types";

export interface DraftContentItem {
  id: string;
  titleGa: string;
  titleEn: string;
  section: Bilingual;
  updatedDate: string;
}

/**
 * Content awaiting review before publication. This is admin-only demo data,
 * kept separate from the live site content (which is always shown as
 * "Published" since it's genuinely live).
 */
export const draftContent: DraftContentItem[] = [
  {
    id: "d1",
    titleGa: "Aonad 7: Cluastuiscint Bhreise",
    titleEn: "Unit 7: Extra Listening Practice",
    section: { en: "#Tobshaol - Bliain 1", ga: "#Tobshaol - Bliain 1" },
    updatedDate: "2026-08-31",
  },
  {
    id: "d2",
    titleGa: "Nuacht: Torthaí Chomórtas na Nollag",
    titleEn: "News: Christmas Competition Results",
    section: { en: "Nuacht", ga: "Nuacht" },
    updatedDate: "2026-08-29",
  },
  {
    id: "d3",
    titleGa: "Pacáiste Tacaíochta Nua don Rang 4",
    titleEn: "New Support Package for 4th Class",
    section: { en: "Bunscoil", ga: "Bunscoil" },
    updatedDate: "2026-08-26",
  },
];
