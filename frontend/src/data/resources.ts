import type { AudienceId, Bilingual, Level } from "./types";

export interface FilterOption {
  id: string;
  label: Bilingual;
}

/** Configurable filter definitions - the sidebar renders whatever is listed here. */
export const levelOptions: FilterOption[] = [
  { id: "primary", label: { en: "Primary", ga: "Bunscoil" } },
  { id: "post-primary", label: { en: "Post-primary", ga: "Iarbhunscoil" } },
];

export const subjectOptions: FilterOption[] = [
  { id: "gramadach", label: { en: "Grammar", ga: "Gramadach" } },
  { id: "leitheoireacht", label: { en: "Reading", ga: "Léitheoireacht" } },
  { id: "cluastuiscint", label: { en: "Listening comprehension", ga: "Cluastuiscint" } },
  { id: "scribhneoireacht", label: { en: "Writing", ga: "Scríbhneoireacht" } },
  { id: "comhra", label: { en: "Oral Irish", ga: "Comhrá" } },
  { id: "filiocht", label: { en: "Poetry", ga: "Filíocht" } },
  { id: "amhrain", label: { en: "Songs", ga: "Amhráin" } },
  { id: "cultur", label: { en: "Culture", ga: "Cultúr" } },
];

export const resourceTypeOptions: FilterOption[] = [
  { id: "bileog", label: { en: "Worksheet", ga: "Bileog Oibre" } },
  { id: "plean-ceachta", label: { en: "Lesson plan", ga: "Plean Ceachta" } },
  { id: "fisean", label: { en: "Video", ga: "Físeán" } },
  { id: "cluiche", label: { en: "Game", ga: "Cluiche" } },
  { id: "postaer", label: { en: "Poster", ga: "Postaer" } },
];

export const audienceOptions: { id: AudienceId; label: Bilingual }[] = [
  { id: "students", label: { en: "Students", ga: "Daltaí" } },
  { id: "teachers", label: { en: "Teachers", ga: "Múinteoirí" } },
  { id: "parents", label: { en: "Parents / Guardians", ga: "Tuismitheoirí" } },
  { id: "professionals", label: { en: "Education professionals", ga: "Gairmithe Oideachais" } },
];

export interface Resource {
  id: string;
  slug: string;
  title: Bilingual;
  description: Bilingual;
  level: Level;
  subject: string;
  type: string;
  audience: AudienceId[];
  featured?: boolean;
  updated: string;
}

export const resources: Resource[] = [
  {
    id: "r1",
    slug: "aimsir-lathair-gramadach",
    title: {
      en: "Present Tense Grammar Pack",
      ga: "Pacáiste Gramadaí: An Aimsir Láithreach",
    },
    description: {
      en: "Clear explanations and practice exercises for regular and irregular verbs in the present tense.",
      ga: "Mínithe soiléire agus cleachtaí praiticiúla ar bhriathra rialta agus neamhrialta san aimsir láithreach.",
    },
    level: "primary",
    subject: "gramadach",
    type: "bileog",
    audience: ["students", "teachers"],
    featured: true,
    updated: "2026-02-10",
  },
  {
    id: "r2",
    slug: "sraith-pictiur-iarbhunscoil",
    title: { en: "Sraith Pictiúr Picture Sequence Toolkit", ga: "Uirlisí Sraith Pictiúr" },
    description: {
      en: "Vocabulary, model answers and speaking practice for the Junior Cycle sraith pictiúr.",
      ga: "Foclóir, samplaí freagraí agus cleachtadh cainte don sraith pictiúr sa tSraith Shóisearach.",
    },
    level: "post-primary",
    subject: "comhra",
    type: "plean-ceachta",
    audience: ["teachers", "students"],
    featured: true,
    updated: "2026-01-22",
  },
  {
    id: "r3",
    slug: "amhran-oro-se-do-bheatha",
    title: { en: "Class Song: Óró Sé do Bheatha Bhaile", ga: "Amhrán Ranga: Óró Sé do Bheatha Bhaile" },
    description: {
      en: "Lyrics sheet, audio guide and simple actions for a well-loved traditional song.",
      ga: "Bileog liricí, treoir fuaime agus gníomhartha simplí d'amhrán traidisiúnta a bhfuil an-tóir air.",
    },
    level: "primary",
    subject: "amhrain",
    type: "fisean",
    audience: ["students", "teachers", "parents"],
    updated: "2025-11-30",
  },
  {
    id: "r4",
    slug: "cluastuiscint-sraith-a-haon",
    title: { en: "Listening Practice: Series 1", ga: "Cluastuiscint: Sraith a hAon" },
    description: {
      en: "Short audio clips with graded questions to build listening confidence.",
      ga: "Gearrphíosaí fuaime le ceisteanna céimnithe chun muinín éisteachta a fhorbairt.",
    },
    level: "primary",
    subject: "cluastuiscint",
    type: "fisean",
    audience: ["students", "teachers"],
    updated: "2026-02-01",
  },
  {
    id: "r5",
    slug: "modh-coinniollach",
    title: { en: "The Conditional Mood Explained", ga: "An Modh Coinníollach Mínithe" },
    description: {
      en: "A step-by-step guide to the conditional mood with worked examples for exam classes.",
      ga: "Treoir chéim ar chéim ar an modh coinníollach le samplaí oibrithe do ranganna scrúdaithe.",
    },
    level: "post-primary",
    subject: "gramadach",
    type: "plean-ceachta",
    audience: ["teachers", "students"],
    featured: true,
    updated: "2026-01-05",
  },
  {
    id: "r6",
    slug: "cill-aodain-dan",
    title: { en: "Poem Study: Cill Aodáin", ga: "Staidéar Filíochta: Cill Aodáin" },
    description: {
      en: "Line-by-line notes and discussion questions on Raiftearaí's celebrated poem.",
      ga: "Nótaí líne ar líne agus ceisteanna plé ar dhán cáiliúil Raiftearaí.",
    },
    level: "post-primary",
    subject: "filiocht",
    type: "bileog",
    audience: ["teachers", "students"],
    updated: "2025-10-14",
  },
  {
    id: "r7",
    slug: "an-aimsir-foclóir-cluiche",
    title: { en: "Weather Vocabulary Game", ga: "An Aimsir: Cluiche Foclóra" },
    description: {
      en: "An interactive matching game to practise weather vocabulary and simple sentences.",
      ga: "Cluiche idirghníomhach meaitseála chun foclóir na haimsire agus abairtí simplí a chleachtadh.",
    },
    level: "primary",
    subject: "leitheoireacht",
    type: "cluiche",
    audience: ["students"],
    updated: "2026-02-18",
  },
  {
    id: "r8",
    slug: "mo-chlann-postaer",
    title: { en: "'My Family' Classroom Poster", ga: "Postaer Ranga: Mo Chlann" },
    description: {
      en: "A bright, printable poster introducing family vocabulary for early learners.",
      ga: "Postaer geal, inphriontáilte a chuireann foclóir an teaghlaigh in aithne d'fhoghlaimeoirí óga.",
    },
    level: "primary",
    subject: "leitheoireacht",
    type: "postaer",
    audience: ["students", "teachers", "parents"],
    updated: "2025-09-02",
  },
  {
    id: "r9",
    slug: "scribhneoireacht-chruthaitheach-treoir",
    title: { en: "Creative Writing Toolkit", ga: "Uirlisí Scríbhneoireachta Cruthaithí" },
    description: {
      en: "Sentence starters, story maps and self-assessment checklists for personal writing.",
      ga: "Tosaitheoirí abairte, léarscáileanna scéil agus seiclistí féinmheasúnaithe don scríbhneoireacht phearsanta.",
    },
    level: "post-primary",
    subject: "scribhneoireacht",
    type: "bileog",
    audience: ["teachers", "students"],
    updated: "2026-01-29",
  },
  {
    id: "r10",
    slug: "cultur-gaeltachta-lesson",
    title: { en: "Gaeltacht Culture Lesson Plan", ga: "Plean Ceachta: Cultúr na Gaeltachta" },
    description: {
      en: "A cross-curricular lesson exploring Gaeltacht regions, traditions and local placenames.",
      ga: "Ceacht traschuraclaim a fhiosraíonn ceantair Ghaeltachta, traidisiúin agus logainmneacha áitiúla.",
    },
    level: "primary",
    subject: "cultur",
    type: "plean-ceachta",
    audience: ["teachers"],
    updated: "2025-12-03",
  },
  {
    id: "r11",
    slug: "comhra-laethuil-cluiche-roll",
    title: { en: "Everyday Conversation Role-Play Cards", ga: "Cártaí Rólghlactha: Comhrá Laethúil" },
    description: {
      en: "Printable role-play cards for shops, school and home conversations.",
      ga: "Cártaí rólghlactha inphriontáilte le haghaidh comhráite siopa, scoile agus baile.",
    },
    level: "primary",
    subject: "comhra",
    type: "cluiche",
    audience: ["students", "teachers"],
    updated: "2026-02-05",
  },
  {
    id: "r12",
    slug: "an-chopail-gramadach",
    title: { en: "Understanding the Copula (Is)", ga: "An Chopail 'Is' a Thuiscint" },
    description: {
      en: "Worked examples and common pitfalls when using the copula in Leaving Certificate Irish.",
      ga: "Samplaí oibrithe agus deacrachtaí coitianta agus an chopail á húsáid don Ardteistiméireacht.",
    },
    level: "post-primary",
    subject: "gramadach",
    type: "bileog",
    audience: ["students", "teachers"],
    updated: "2026-01-12",
  },
  {
    id: "r13",
    slug: "laethanta-seachtaine-fisean",
    title: { en: "Days of the Week Song & Video", ga: "Laethanta na Seachtaine: Amhrán agus Físeán" },
    description: {
      en: "A catchy sing-along video to embed the days of the week for junior classes.",
      ga: "Físeán tarraingteach amhránaíochta chun laethanta na seachtaine a dhaingniú do na ranganna sóisearacha.",
    },
    level: "primary",
    subject: "amhrain",
    type: "fisean",
    audience: ["students", "parents"],
    updated: "2025-09-20",
  },
  {
    id: "r14",
    slug: "gearrsceal-nuathoghlaim",
    title: { en: "Short Story Comprehension Set", ga: "Sraith Tuisceana: Gearrscéalta" },
    description: {
      en: "Three graded short stories with comprehension questions for mixed-ability classes.",
      ga: "Trí ghearrscéal chéimnithe le ceisteanna tuisceana d'ranganna ilchumais.",
    },
    level: "post-primary",
    subject: "leitheoireacht",
    type: "bileog",
    audience: ["teachers", "students"],
    updated: "2025-11-08",
  },
  {
    id: "r15",
    slug: "gaeilge-sa-bhaile-treoir-tuismitheoiri",
    title: { en: "Supporting Irish at Home: A Parent's Guide", ga: "Ag Tacú leis an nGaeilge sa Bhaile: Treoir do Thuismitheoirí" },
    description: {
      en: "Simple, no-Irish-needed tips for encouraging your child's Irish outside school.",
      ga: "Leideanna simplí, nach dteastaíonn Gaeilge uathu, chun Gaeilge do linbh a spreagadh lasmuigh den scoil.",
    },
    level: "primary",
    subject: "cultur",
    type: "bileog",
    audience: ["parents"],
    featured: true,
    updated: "2026-02-14",
  },
  {
    id: "r16",
    slug: "pleanail-scoile-fgl",
    title: { en: "Whole-School Planning for Irish: CPD Briefing", ga: "Pleanáil Scoile don Ghaeilge: Achoimre FGL" },
    description: {
      en: "A briefing for principals and Irish co-ordinators on embedding Irish across the school plan.",
      ga: "Achoimre do phríomhoidí agus do chomhordaitheoirí Gaeilge maidir leis an nGaeilge a leabú i bplean na scoile.",
    },
    level: "post-primary",
    subject: "cultur",
    type: "plean-ceachta",
    audience: ["professionals", "teachers"],
    updated: "2026-01-19",
  },
];
