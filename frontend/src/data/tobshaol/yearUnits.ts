import type { ReactElement } from "react";
import type { Bilingual } from "../types";
import {
  ChatIcon,
  DocumentIcon,
  ExternalLinkIcon,
  GridIcon,
  HomeIcon,
  MapPinIcon,
  SparkleIcon,
  TrophyIcon,
  type IconProps,
} from "../../components/icons";

export type YearUnitAction =
  | { type: "topic"; topicId: string }
  | { type: "scroll" }
  | { type: "link"; path: string };

export interface YearUnit {
  id: string;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  icon: (props: IconProps) => ReactElement;
  action: YearUnitAction;
}

/**
 * The large navigation grid shown on each year-group page, keyed by year
 * group id. Only "bliain-1" is populated for now; adding another year's
 * grid is just adding another entry here.
 */
export const yearUnitsByYearGroup: Record<string, YearUnit[]> = {
  "bliain-1": [
    {
      id: "aonad-1",
      titleGa: "Aonad 1",
      titleEn: "Unit 1",
      description: {
        ga: "Cuir tú féin in aithne agus foghlaim frásaí bunúsacha.",
        en: "Introduce yourself and learn basic phrases.",
      },
      icon: ChatIcon,
      action: { type: "topic", topicId: "is-gael-me" },
    },
    {
      id: "aonad-2",
      titleGa: "Aonad 2",
      titleEn: "Unit 2",
      description: {
        ga: "Ábhair scoile, an t-amchlár agus an lá scoile.",
        en: "School subjects, the timetable and the school day.",
      },
      icon: GridIcon,
      action: { type: "topic", topicId: "mo-shaol-ar-scoil" },
    },
    {
      id: "aonad-3",
      titleGa: "Aonad 3",
      titleEn: "Unit 3",
      description: {
        ga: "Caithimh aimsire agus mo shaol sóisialta.",
        en: "Hobbies and my social life.",
      },
      icon: TrophyIcon,
      action: { type: "topic", topicId: "mo-shaol-sosialta" },
    },
    {
      id: "aonad-4",
      titleGa: "Aonad 4",
      titleEn: "Unit 4",
      description: {
        ga: "Cur síos ar m'áit chónaithe agus ar an gceantar.",
        en: "Describing my home and local area.",
      },
      icon: HomeIcon,
      action: { type: "topic", topicId: "m-ait-chonaithe" },
    },
    {
      id: "aonad-5",
      titleGa: "Aonad 5",
      titleEn: "Unit 5",
      description: {
        ga: "Bia, sláinte agus dea-nósanna laethúla.",
        en: "Food, health and everyday good habits.",
      },
      icon: SparkleIcon,
      action: { type: "scroll" },
    },
    {
      id: "aonad-6",
      titleGa: "Aonad 6",
      titleEn: "Unit 6",
      description: {
        ga: "Laethanta saoire agus am spraoi.",
        en: "Holidays and free time.",
      },
      icon: MapPinIcon,
      action: { type: "scroll" },
    },
    {
      id: "pacaisti-tacaiochta",
      titleGa: "Pacáistí Tacaíochta",
      titleEn: "Support Packages",
      description: {
        ga: "Tacaíocht bhreise do dhaltaí ar gá dóibh cabhair bhreise.",
        en: "Extra support for students who need additional help.",
      },
      icon: GridIcon,
      action: { type: "scroll" },
    },
    {
      id: "punann-teanga",
      titleGa: "Punann Teanga",
      titleEn: "Language Portfolio",
      description: {
        ga: "Coinnigh taifead ar do dhul chun cinn sa Ghaeilge i rith na bliana.",
        en: "Keep a record of your progress in Irish throughout the year.",
      },
      icon: DocumentIcon,
      action: { type: "scroll" },
    },
    {
      id: "naisc-eile",
      titleGa: "Naisc Eile",
      titleEn: "Other Links",
      description: {
        ga: "Naisc chuig eagraíochtaí agus acmhainní úsáideacha eile.",
        en: "Links to other useful organisations and resources.",
      },
      icon: ExternalLinkIcon,
      action: { type: "link", path: "/#naisc-sheachtracha" },
    },
  ],
};
