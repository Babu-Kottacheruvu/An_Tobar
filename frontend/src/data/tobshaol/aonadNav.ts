import type { ReactElement } from "react";
import {
  BookIcon,
  ChatIcon,
  DocumentIcon,
  ExternalLinkIcon,
  GridIcon,
  TrophyIcon,
  type IconProps,
} from "../../components/icons";

export type AonadNavAction = { type: "scroll"; targetId: string } | { type: "link"; path: string };

export interface AonadNavItem {
  id: string;
  titleGa: string;
  titleEn: string;
  icon: (props: IconProps) => ReactElement;
  action: AonadNavAction;
}

/**
 * The navigation card grid for a unit page, keyed by unit id. Every card
 * here - including the six lesson cards - is plain configuration data, so
 * an administrator can rename, reorder, add or remove one without touching
 * component code.
 */
export const aonadNavByUnit: Record<string, AonadNavItem[]> = {
  "aonad-1": [
    { id: "ceacht-1", titleGa: "Ceacht 1", titleEn: "Lesson 1", icon: ChatIcon, action: { type: "scroll", targetId: "ceacht-1" } },
    { id: "ceacht-2", titleGa: "Ceacht 2", titleEn: "Lesson 2", icon: ChatIcon, action: { type: "scroll", targetId: "ceacht-2" } },
    { id: "ceacht-3", titleGa: "Ceacht 3", titleEn: "Lesson 3", icon: ChatIcon, action: { type: "scroll", targetId: "ceacht-3" } },
    { id: "ceacht-4", titleGa: "Ceacht 4", titleEn: "Lesson 4", icon: ChatIcon, action: { type: "scroll", targetId: "ceacht-4" } },
    { id: "ceacht-5", titleGa: "Ceacht 5", titleEn: "Lesson 5", icon: ChatIcon, action: { type: "scroll", targetId: "ceacht-5" } },
    { id: "ceacht-6", titleGa: "Ceacht 6", titleEn: "Lesson 6", icon: ChatIcon, action: { type: "scroll", targetId: "ceacht-6" } },
    {
      id: "aonad-iomlan",
      titleGa: "Aonad Iomlán",
      titleEn: "Full Unit",
      icon: TrophyIcon,
      action: { type: "scroll", targetId: "aonad-iomlan" },
    },
    {
      id: "treoir-muinteora",
      titleGa: "Treoir don Mhúinteoir",
      titleEn: "Teacher's Guide",
      icon: BookIcon,
      action: { type: "scroll", targetId: "treoir-muinteora" },
    },
    {
      id: "nodbhileoga",
      titleGa: "Nodbhileoga don Mhúinteoir",
      titleEn: "Teacher's Answer Sheets",
      icon: DocumentIcon,
      action: { type: "scroll", targetId: "nodbhileoga" },
    },
    {
      id: "pacaiste-tacaiochta",
      titleGa: "Pacáiste Tacaíochta",
      titleEn: "Support Package",
      icon: GridIcon,
      action: { type: "scroll", targetId: "pacaiste-tacaiochta" },
    },
    {
      id: "naisc-eile",
      titleGa: "Naisc Eile",
      titleEn: "Other Links",
      icon: ExternalLinkIcon,
      action: { type: "link", path: "/#naisc-sheachtracha" },
    },
  ],
};
