import type { ReactElement } from "react";
import type { Bilingual } from "./types";
import {
  BookIcon,
  ChatIcon,
  DocumentIcon,
  GridIcon,
  PlayIcon,
  SoundIcon,
  TrophyIcon,
  type IconProps,
} from "../components/icons";

export interface TobghaeltachtCategory {
  id: string;
  label: Bilingual;
  icon: (props: IconProps) => ReactElement;
}

export const tobghaeltachtCategories: TobghaeltachtCategory[] = [
  { id: "saol-laethuil", label: { ga: "Gaeilge sa Saol Laethúil", en: "Irish in Daily Life" }, icon: ChatIcon },
  { id: "gniomhaiochtai", label: { ga: "Gníomhaíochtaí", en: "Activities" }, icon: GridIcon },
  { id: "fisean", label: { ga: "Físeáin", en: "Videos" }, icon: PlayIcon },
  { id: "fuaim", label: { ga: "Fuaim", en: "Audio" }, icon: SoundIcon },
  { id: "cultur", label: { ga: "Cultúr", en: "Culture" }, icon: BookIcon },
  { id: "dushlan", label: { ga: "Dúshláin", en: "Challenges" }, icon: TrophyIcon },
  { id: "acmhainni", label: { ga: "Acmhainní", en: "Resources" }, icon: DocumentIcon },
];
