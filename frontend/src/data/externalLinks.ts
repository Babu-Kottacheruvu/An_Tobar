import type { Bilingual } from "./types";

export interface ExternalOrg {
  id: string;
  name: Bilingual;
  description: Bilingual;
}

/**
 * Real partner organisations in Irish-language education. Live outbound
 * links are intentionally omitted from this prototype - each card is
 * marked "coming soon" rather than pointing at a guessed URL.
 */
export const externalOrgs: ExternalOrg[] = [
  {
    id: "cogg",
    name: { en: "COGG", ga: "COGG" },
    description: {
      en: "An Chomhairle um Oideachas Gaeltachta agus Gaelscolaíochta - national support for Irish-medium education.",
      ga: "An Chomhairle um Oideachas Gaeltachta agus Gaelscolaíochta - tacaíocht náisiúnta don oideachas lán-Ghaeilge.",
    },
  },
  {
    id: "foras-na-gaeilge",
    name: { en: "Foras na Gaeilge", ga: "Foras na Gaeilge" },
    description: {
      en: "The all-island body responsible for promoting the Irish language.",
      ga: "An comhlacht uile-oileánda atá freagrach as an nGaeilge a chur chun cinn.",
    },
  },
  {
    id: "conradh-na-gaeilge",
    name: { en: "Conradh na Gaeilge", ga: "Conradh na Gaeilge" },
    description: {
      en: "A grassroots organisation promoting the use of Irish in daily life.",
      ga: "Eagraíocht phobail a chuireann úsáid na Gaeilge chun cinn sa ghnáthshaol.",
    },
  },
  {
    id: "gaelscoileanna",
    name: { en: "Gaelscoileanna Teo.", ga: "Gaelscoileanna Teo." },
    description: {
      en: "Support organisation for Irish-medium schools outside the Gaeltacht.",
      ga: "Eagraíocht tacaíochta do scoileanna lán-Ghaeilge lasmuigh den Ghaeltacht.",
    },
  },
  {
    id: "ncca",
    name: { en: "NCCA", ga: "NCCA" },
    description: {
      en: "National Council for Curriculum and Assessment - curriculum guidance for Irish.",
      ga: "An Chomhairle Náisiúnta Curaclaim agus Measúnachta - treoir churaclaim don Ghaeilge.",
    },
  },
  {
    id: "pdst",
    name: { en: "PDST", ga: "PDST" },
    description: {
      en: "Professional Development Service for Teachers - CPD for Irish teaching methods.",
      ga: "An tSeirbhís um Fhorbairt Ghairmiúil do Mhúinteoirí - FGL do mhodhanna múinte Gaeilge.",
    },
  },
];
