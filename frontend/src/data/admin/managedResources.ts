import type { Bilingual } from "../types";

export type PublishStatus = "draft" | "review" | "published" | "archived";

export interface ManagedResource {
  id: string;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  schoolLevel: "primary" | "post-primary";
  yearGroup: string;
  theme: string;
  topic: string;
  resourceType: string;
  assessment: boolean;
  planning: boolean;
  author: string;
  tags: string[];
  featured: boolean;
  status: PublishStatus;
  updatedDate: string;
}

export const publishStatusOptions: { id: PublishStatus; label: Bilingual }[] = [
  { id: "draft", label: { en: "Draft", ga: "Dréacht" } },
  { id: "review", label: { en: "Review", ga: "Athbhreithniú" } },
  { id: "published", label: { en: "Published", ga: "Foilsithe" } },
  { id: "archived", label: { en: "Archived", ga: "Cartlannaithe" } },
];

/**
 * CMS-side resource records for the Resource Management page. These mirror
 * the site's real published resources (see data/bunscoil/resources.ts and
 * data/tobshaol/resources.ts) but add CMS-only fields - status, tags - that
 * the live public data doesn't track. Editing here is admin working-draft
 * state only, since this prototype has no backend to write changes back
 * into the live content files.
 */
export const initialManagedResources: ManagedResource[] = [
  {
    id: "mr1",
    titleGa: "An Aimsir",
    titleEn: "Weather Vocabulary",
    description: {
      ga: "Pacáiste foclóra iomlán ar an aimsir - focail bhunúsacha, aidiachtaí agus frásaí coitianta.",
      en: "A complete weather vocabulary pack - core words, adjectives and everyday phrases.",
    },
    schoolLevel: "primary",
    yearGroup: "Rang a hAon",
    theme: "An Aimsir",
    topic: "Cur Síos ar an Aimsir",
    resourceType: "document",
    assessment: false,
    planning: false,
    author: "An Tobar",
    tags: ["aimsir", "foclóir", "bunscoil"],
    featured: true,
    status: "published",
    updatedDate: "2026-02-27",
  },
  {
    id: "mr2",
    titleGa: "Amhrán: Conas Atá Tú?",
    titleEn: "Song: How Are You?",
    description: {
      ga: "Físeán amhránaíochta spraíúil a mhúineann frásaí do mhothúcháin.",
      en: "A fun sing-along video teaching phrases for feelings.",
    },
    schoolLevel: "primary",
    yearGroup: "Naíonáin Shinsearacha",
    theme: "Mé Féin",
    topic: "Mo Mhothúcháin",
    resourceType: "video",
    assessment: false,
    planning: false,
    author: "COGG",
    tags: ["amhrán", "mothúcháin"],
    featured: false,
    status: "published",
    updatedDate: "2026-01-09",
  },
  {
    id: "mr3",
    titleGa: "Cé Mise? Láithreoireacht Réamhrá",
    titleEn: "Who Am I? Introduction Presentation",
    description: {
      ga: "Láithreoireacht tosaigh a mhúineann frásaí bunúsacha chun tú féin a chur in aithne.",
      en: "An opening presentation teaching basic phrases for introducing yourself.",
    },
    schoolLevel: "post-primary",
    yearGroup: "Bliain 1",
    theme: "-",
    topic: "Is Gael Mé",
    resourceType: "presentation",
    assessment: false,
    planning: false,
    author: "An Tobar",
    tags: ["réamhrá", "bliain 1"],
    featured: true,
    status: "published",
    updatedDate: "2026-02-20",
  },
  {
    id: "mr4",
    titleGa: "Nodbhileoga don Mhúinteoir - Aonad 1",
    titleEn: "Teacher's Answer Sheets - Unit 1",
    description: {
      ga: "Freagraí do na bileoga oibre agus do na cleachtaí cluastuisceana san aonad.",
      en: "Answers for the unit's worksheets and listening exercises.",
    },
    schoolLevel: "post-primary",
    yearGroup: "Bliain 1",
    theme: "-",
    topic: "Is Gael Mé",
    resourceType: "document",
    assessment: true,
    planning: false,
    author: "An Tobar",
    tags: ["múinteoirí", "freagraí"],
    featured: false,
    status: "published",
    updatedDate: "2026-08-27",
  },
  {
    id: "mr5",
    titleGa: "Pleanáil Ghaeilge don Scoil Iomlán",
    titleEn: "Whole-School Irish Planning",
    description: {
      ga: "Teimpléad pleanála chun úsáid na Gaeilge a leabú tríd an scoil ar fad.",
      en: "A planning template for embedding the use of Irish across the whole school.",
    },
    schoolLevel: "post-primary",
    yearGroup: "-",
    theme: "-",
    topic: "Pacáistí Uile Scoile",
    resourceType: "document",
    assessment: false,
    planning: true,
    author: "Seán Ó Conaill",
    tags: ["pleanáil", "scoil iomlán"],
    featured: false,
    status: "review",
    updatedDate: "2025-09-19",
  },
  {
    id: "mr6",
    titleGa: "Aonad 7: Cluastuiscint Bhreise",
    titleEn: "Unit 7: Extra Listening Practice",
    description: {
      ga: "Cleachtaí cluastuisceana breise le haghaidh Bhliain 1.",
      en: "Extra listening-comprehension exercises for 1st Year.",
    },
    schoolLevel: "post-primary",
    yearGroup: "Bliain 1",
    theme: "-",
    topic: "Mo Shaol ar Scoil",
    resourceType: "audio",
    assessment: false,
    planning: false,
    author: "An Tobar",
    tags: ["cluastuiscint", "dréacht"],
    featured: false,
    status: "draft",
    updatedDate: "2026-08-31",
  },
  {
    id: "mr7",
    titleGa: "Pictiúir Lipéadaithe: Mo Chorp",
    titleEn: "Labelled Pictures: My Body",
    description: {
      ga: "Sraith pictiúr geala le lipéid do chodanna an choirp.",
      en: "A bright set of labelled pictures for body parts.",
    },
    schoolLevel: "primary",
    yearGroup: "Naíonáin Shóisearacha",
    theme: "Mé Féin",
    topic: "Mo Chorp",
    resourceType: "pictures",
    assessment: false,
    planning: false,
    author: "An Tobar",
    tags: ["pictiúir", "mé féin"],
    featured: true,
    status: "published",
    updatedDate: "2026-02-18",
  },
  {
    id: "mr8",
    titleGa: "Comórtas Ealaíne - Sean-Iontrálacha",
    titleEn: "Art Competition - Old Entries",
    description: {
      ga: "Sean-iontrálacha ó chomórtas ealaíne na bliana seo caite.",
      en: "Old entries from last year's art competition.",
    },
    schoolLevel: "primary",
    yearGroup: "-",
    theme: "Cultúr",
    topic: "Cultúr",
    resourceType: "pictures",
    assessment: false,
    planning: false,
    author: "An Tobar",
    tags: ["seaniontrálacha"],
    featured: false,
    status: "archived",
    updatedDate: "2025-05-30",
  },
];
