import type { Bilingual } from "../types";

export interface HeroSlide {
  id: string;
  art: "welcome" | "playful" | "teacher";
  title: Bilingual;
  description: Bilingual;
  ctaLabel: Bilingual;
  ctaPath: string;
}

export const bunscoilHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    art: "welcome",
    title: { en: "Welcome to Bunscoil", ga: "Fáilte go Bunscoil" },
    description: {
      en: "Everything a primary school needs to bring Irish to life, from Naíonáin to Rang a Sé.",
      ga: "Gach a dteastaíonn ó bhunscoil chun an Ghaeilge a bheochtú, ó na Naíonáin go Rang a Sé.",
    },
    ctaLabel: { en: "Explore resources", ga: "Féach ar na hacmhainní" },
    ctaPath: "#acmhainni",
  },
  {
    id: "slide-2",
    art: "playful",
    title: { en: "Learn Irish in a fun way", ga: "Foghlaim Gaeilge ar bhealach spraíúil" },
    description: {
      en: "Games, songs and colourful activities that make Irish part of everyday classroom life.",
      ga: "Cluichí, amhráin agus gníomhaíochtaí dathannacha a fhágann an Ghaeilge mar chuid de shaol laethúil an ranga.",
    },
    ctaLabel: { en: "Visit Children's Corner", ga: "Tabhair cuairt ar Chúinne na bPáistí" },
    ctaPath: "/bunscoil/cuinne-na-bpaisti",
  },
  {
    id: "slide-3",
    art: "teacher",
    title: { en: "New resources for teachers", ga: "Acmhainní nua do mhúinteoirí" },
    description: {
      en: "Fresh worksheets, planning supports and assessment tools added every month.",
      ga: "Bileoga oibre úra, tacaíochtaí pleanála agus uirlisí measúnaithe á gcur leis gach mí.",
    },
    ctaLabel: { en: "Read the Teacher's Guide", ga: "Léigh Treoir an Mhúinteora" },
    ctaPath: "/bunscoil/treoir-an-muinteora",
  },
];
