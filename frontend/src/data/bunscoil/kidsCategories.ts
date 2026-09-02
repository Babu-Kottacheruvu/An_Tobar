import type { Bilingual } from "../types";

export interface KidsCategory {
  id: string;
  label: Bilingual;
  emoji: string;
  colorClass: string;
  targetId: string;
}

export const kidsCategories: KidsCategory[] = [
  {
    id: "games",
    label: { ga: "Cluichí", en: "Games" },
    emoji: "🎲",
    colorClass: "bg-brand-green-700",
    targetId: "kids-games",
  },
  {
    id: "videos",
    label: { ga: "Físeáin", en: "Videos" },
    emoji: "🎬",
    colorClass: "bg-brand-navy-700",
    targetId: "kids-videos",
  },
  {
    id: "songs",
    label: { ga: "Amhráin", en: "Songs" },
    emoji: "🎵",
    colorClass: "bg-brand-gold-500",
    targetId: "kids-songs",
  },
  {
    id: "stories",
    label: { ga: "Scéalta", en: "Stories" },
    emoji: "📚",
    colorClass: "bg-brand-green-800",
    targetId: "kids-stories",
  },
  {
    id: "new-words",
    label: { ga: "Focail Nua", en: "New Words" },
    emoji: "🔤",
    colorClass: "bg-brand-navy-800",
    targetId: "kids-new-words",
  },
  {
    id: "challenges",
    label: { ga: "Dúshláin", en: "Challenges" },
    emoji: "🏆",
    colorClass: "bg-brand-gold-600",
    targetId: "kids-try-it",
  },
];
