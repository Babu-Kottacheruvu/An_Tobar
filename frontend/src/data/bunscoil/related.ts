import type { Bilingual } from "../types";

export interface RelatedItem {
  id: string;
  label: Bilingual;
}

export const relatedSearches: RelatedItem[] = [
  { id: "amhrain-ranga", label: { en: "Class songs", ga: "Amhráin ranga" } },
  { id: "cluichi-foclora", label: { en: "Vocabulary games", ga: "Cluichí foclóra" } },
  { id: "bileoga-priontala", label: { en: "Printable worksheets", ga: "Bileoga inphriontáilte" } },
  { id: "gramadach-bhunscoile", label: { en: "Primary grammar", ga: "Gramadach bhunscoile" } },
  { id: "pleananna-seachtaine", label: { en: "Weekly plans", ga: "Pleananna seachtaine" } },
];

export const relatedTopics: RelatedItem[] = [
  { id: "an-nadur", label: { en: "Nature", ga: "An Dúlra" } },
  { id: "an-teaghlach", label: { en: "The Family", ga: "An Teaghlach" } },
  { id: "ainmhithe", label: { en: "Animals", ga: "Ainmhithe" } },
  { id: "an-baile-mor", label: { en: "The Town", ga: "An Baile Mór" } },
  { id: "laethanta-saoire", label: { en: "Holidays", ga: "Laethanta Saoire" } },
];
