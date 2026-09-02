import type { Bilingual } from "../types";

export interface TopicOption {
  id: string;
  label: Bilingual;
}

export const tobshaolTopics: TopicOption[] = [
  { id: "is-gael-me", label: { ga: "Is Gael Mé", en: "I Am Irish" } },
  { id: "mo-shaol-ar-scoil", label: { ga: "Mo Shaol ar Scoil", en: "My School Life" } },
  { id: "mo-shaol-sosialta", label: { ga: "Mo Shaol Sóisialta", en: "My Social Life" } },
  { id: "m-ait-chonaithe", label: { ga: "M'áit chónaithe", en: "My Local Area" } },
];
