import type { Bilingual, Level } from "./types";

export type CompetitionStatus = "open" | "closing-soon" | "closed";
export type EntryType = "individual" | "school" | "class";

export interface Competition {
  id: string;
  slug: string;
  title: Bilingual;
  description: Bilingual;
  levels: Level[];
  ageGroup: Bilingual;
  entryTypes: EntryType[];
  deadline: string;
  eligibility: Bilingual;
  rules: Bilingual;
  howToEnter: Bilingual;
  featured?: boolean;
}

const DAY_MS = 86_400_000;

/**
 * Status is computed from the real closing date rather than stored as a
 * static flag, so it never goes stale as time passes.
 */
export function getCompetitionStatus(deadline: string, now: Date = new Date()): CompetitionStatus {
  const daysRemaining = (new Date(deadline).getTime() - now.getTime()) / DAY_MS;
  if (daysRemaining < 0) return "closed";
  if (daysRemaining <= 14) return "closing-soon";
  return "open";
}

export const competitions: Competition[] = [
  {
    id: "c1",
    slug: "comortas-scribhneoireachta-cruthaithi",
    title: {
      en: "Creative Writing Competition — 'Mo Dhomhan'",
      ga: "Comórtas Scríbhneoireachta Cruthaithí — 'Mo Dhomhan'",
    },
    description: {
      en: "Write a short story or poem in Irish inspired by the theme 'My World'.",
      ga: "Scríobh gearrscéal nó dán i nGaeilge spreagtha ag an téama 'Mo Dhomhan'.",
    },
    levels: ["primary", "post-primary"],
    ageGroup: { en: "Ages 8-18 (Primary & Secondary)", ga: "Aois 8-18 (Bunscoil agus Iar-bhunscoil)" },
    entryTypes: ["individual", "class"],
    deadline: "2026-09-10",
    eligibility: {
      en: "Open to all students in Irish primary and post-primary schools, entering individually or as a class.",
      ga: "Oscailte do gach dalta i mbunscoileanna agus in iarbhunscoileanna na hÉireann, ag iontráil go haonair nó mar rang.",
    },
    rules: {
      en: "Entries must be the student's own original work, in Irish, and no longer than 500 words (poems: no more than 40 lines). One entry per student.",
      ga: "Caithfidh gach iontráil a bheith mar shaothar bunaidh de chuid an dalta féin, i nGaeilge, agus gan a bheith níos faide ná 500 focal (dánta: gan níos mó ná 40 líne). Iontráil amháin in aghaidh an dalta.",
    },
    howToEnter: {
      en: "Submit entries through your school using the online entry form. One entry per student.",
      ga: "Cuir iontrálacha isteach trí do scoil ag baint úsáide as an bhfoirm iontrála ar líne. Iontráil amháin in aghaidh an dalta.",
    },
    featured: true,
  },
  {
    id: "c2",
    slug: "slam-filiochta",
    title: { en: "Poetry Slam", ga: "Slam Filíochta" },
    description: {
      en: "Perform an original or well-known Irish poem for a chance to represent your region at the national final.",
      ga: "Léirigh dán bunaidh nó dán aitheanta i nGaeilge agus bí san áireamh chun d'réigiún a ionadú sa chraobh náisiúnta.",
    },
    levels: ["post-primary"],
    ageGroup: { en: "Ages 12-18 (Secondary)", ga: "Aois 12-18 (Iar-bhunscoil)" },
    entryTypes: ["individual"],
    deadline: "2026-10-15",
    eligibility: {
      en: "Open to post-primary students. Regional heats are held in advance of the national final.",
      ga: "Oscailte do dhaltaí iarbhunscoile. Reáchtáiltear babhtaí réigiúnacha roimh an gcraobh náisiúnta.",
    },
    rules: {
      en: "Performances must be 2-3 minutes long and delivered from memory, without written notes. Regional heat winners advance to the national final.",
      ga: "Caithfidh na léirithe a bheith idir 2-3 nóiméad ar fad agus a bheith curtha i láthair as cuimhne, gan nótaí scríofa. Téann buaiteoirí na mbabhtaí réigiúnacha ar aghaidh chuig an gcraobh náisiúnta.",
    },
    howToEnter: {
      en: "Register your school's participants through your regional education support centre.",
      ga: "Cláraigh rannpháirtithe do scoile trí d'ionad tacaíochta oideachais réigiúnach.",
    },
  },
  {
    id: "c3",
    slug: "comortas-ealaine-gaeilge",
    title: { en: "Irish-Language Art Competition", ga: "Comórtas Ealaíne trí Ghaeilge" },
    description: {
      en: "Create a piece of art with an Irish-language caption or title celebrating your local area.",
      ga: "Cruthaigh saothar ealaíne le fotheideal nó teideal Gaeilge a cheiliúrann do cheantar féin.",
    },
    levels: ["primary"],
    ageGroup: { en: "Ages 5-12 (Primary)", ga: "Aois 5-12 (Bunscoil)" },
    entryTypes: ["individual", "class"],
    deadline: "2026-08-20",
    eligibility: {
      en: "Open to all primary school classes. Group and individual entries both welcome.",
      ga: "Oscailte do gach rang bunscoile. Fáiltítear roimh iontrálacha grúpa agus aonair araon.",
    },
    rules: {
      en: "Any medium is welcome (drawing, painting, collage). The Irish-language caption or title must be clearly visible on the artwork.",
      ga: "Fáiltítear roimh aon mheán (líníocht, péintéireacht, greamachán). Caithfidh an fotheideal nó an teideal Gaeilge a bheith le feiceáil go soiléir ar an saothar ealaíne.",
    },
    howToEnter: {
      en: "Photograph the artwork and upload it with the entry form before the deadline.",
      ga: "Tóg grianghraf den saothar ealaíne agus uaslódáil é leis an bhfoirm iontrála roimh an spriocdháta.",
    },
  },
  {
    id: "c4",
    slug: "gaeilge-25-tionscadal-scoile",
    title: { en: "Gaeilge 25 School Project Challenge", ga: "Dúshlán Tionscadail Scoile Gaeilge 25" },
    description: {
      en: "A whole-school project challenge marking 25 years of An Tobar, celebrating everyday Irish in the community.",
      ga: "Dúshlán tionscadail don scoil ar fad ag comóradh 25 bliain de An Tobar, ag ceiliúradh na Gaeilge laethúla sa phobal.",
    },
    levels: ["primary", "post-primary"],
    ageGroup: { en: "All ages (Whole-school)", ga: "Gach aois (Scoil Iomlán)" },
    entryTypes: ["school", "class"],
    deadline: "2027-01-16",
    eligibility: {
      en: "Open to whole classes or year groups; a dedicated resource pack supports project planning.",
      ga: "Oscailte do ranganna iomlána nó do ghrúpaí bliana; tacaíonn pacáiste acmhainní tiomnaithe le pleanáil an tionscadail.",
    },
    rules: {
      en: "Projects should show evidence of everyday Irish use across at least three different settings in the community, presented as a short video or display board.",
      ga: "Ba cheart go léireodh tionscadail fianaise ar úsáid laethúil na Gaeilge i dtrí shuíomh dhifriúla ar a laghad sa phobal, curtha i láthair mar ghearrfhíseán nó clár taispeána.",
    },
    howToEnter: {
      en: "Download the project pack and submit your finished project via your school's online account.",
      ga: "Íoslódáil an pacáiste tionscadail agus cuir isteach do thionscadal críochnaithe trí chuntas ar líne do scoile.",
    },
    featured: true,
  },
];
