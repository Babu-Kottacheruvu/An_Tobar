import type { Bilingual } from "./types";

export interface NewsFilterTag {
  id: string;
  label: Bilingual;
}

/**
 * The audience/type filter chips shown on the News page. Configurable data -
 * add, remove or rename a filter here without touching the page component.
 */
export const newsFilterTags: NewsFilterTag[] = [
  { id: "primary", label: { en: "Primary", ga: "Bunscoil" } },
  { id: "secondary", label: { en: "Secondary", ga: "Iar-bhunscoil" } },
  { id: "teachers", label: { en: "Teachers", ga: "Múinteoirí" } },
  { id: "parents", label: { en: "Parents", ga: "Tuismitheoirí" } },
  { id: "learners", label: { en: "Learners", ga: "Foghlaimeoirí" } },
  { id: "events", label: { en: "Events", ga: "Imeachtaí" } },
  { id: "resources", label: { en: "Resources", ga: "Acmhainní" } },
  { id: "announcements", label: { en: "Announcements", ga: "Fógraí" } },
];
