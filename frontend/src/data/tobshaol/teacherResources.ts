import type { Bilingual } from "../types";

export interface TeacherResource {
  id: string;
  slug: string;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  category: string;
  resourceType: string;
  author: string;
  updatedDate: string;
  fileSize: string;
  featured?: boolean;
}

export const teacherResources: TeacherResource[] = [
  {
    id: "tr1",
    slug: "seomra-ranga-postaeir-tacaiochta",
    titleGa: "Póstaeir Tacaíochta don Seomra Ranga",
    titleEn: "Support Posters for the Classroom",
    description: {
      ga: "Sraith póstaeir a chuireann frásaí ranga coitianta ar taispeáint an bhliain ar fad.",
      en: "A set of posters keeping common classroom phrases on display all year.",
    },
    category: "classroom-resources",
    resourceType: "pdf",
    author: "An Tobar",
    updatedDate: "2026-02-24",
    fileSize: "2.1 MB",
    featured: true,
  },
  {
    id: "tr2",
    slug: "banc-lathreoireachtai-ranga",
    titleGa: "Banc Láithreoireachtaí Ranga",
    titleEn: "Bank of Classroom Presentations",
    description: {
      ga: "Cnuasach láithreoireachtaí réidh le húsáid do na téamaí is coitianta.",
      en: "A ready-to-use collection of presentations for the most common themes.",
    },
    category: "classroom-resources",
    resourceType: "ppt",
    author: "COGG",
    updatedDate: "2026-01-11",
    fileSize: "8.6 MB",
  },
  {
    id: "tr3",
    slug: "treoir-eirim-teanga",
    titleGa: "Treoir: Ag Cothú Éirim Teanga",
    titleEn: "Guide: Building Language Confidence",
    description: {
      ga: "Treoir phraiticiúil ar bhealaí chun daltaí a spreagadh Gaeilge a labhairt go nádúrtha.",
      en: "A practical guide to encouraging students to speak Irish naturally.",
    },
    category: "guidance-support",
    resourceType: "word",
    author: "Aoife Nic Cárthaigh",
    updatedDate: "2025-11-27",
    fileSize: "740 KB",
    featured: true,
  },
  {
    id: "tr4",
    slug: "tacaiocht-daltai-riachtanais-breise",
    titleGa: "Tacaíocht do Dhaltaí a bhfuil Riachtanais Bhreise Acu",
    titleEn: "Support for Students with Additional Needs",
    description: {
      ga: "Moltaí praiticiúla chun ranganna Gaeilge a dhéanamh níos ionchuimsithí.",
      en: "Practical suggestions for making Irish classes more inclusive.",
    },
    category: "guidance-support",
    resourceType: "pdf",
    author: "COGG",
    updatedDate: "2025-10-08",
    fileSize: "610 KB",
  },
  {
    id: "tr5",
    slug: "pacaiste-sechtain-na-gaeilge-scoile",
    titleGa: "Pacáiste Scoile: Seachtain na Gaeilge",
    titleEn: "Whole-School Pack: Seachtain na Gaeilge",
    description: {
      ga: "Pacáiste pleanála iomlán scoile le himeachtaí do gach rang le linn Sheachtain na Gaeilge.",
      en: "A complete whole-school planning pack with activities for every class during Seachtain na Gaeilge.",
    },
    category: "whole-school-packages",
    resourceType: "word",
    author: "An Tobar",
    updatedDate: "2026-02-12",
    fileSize: "3.4 MB",
    featured: true,
  },
  {
    id: "tr6",
    slug: "pleanail-gaeilge-scoile-iomlan",
    titleGa: "Pleanáil Ghaeilge don Scoil Iomlán",
    titleEn: "Whole-School Irish Planning",
    description: {
      ga: "Teimpléad pleanála chun úsáid na Gaeilge a leabú tríd an scoil ar fad.",
      en: "A planning template for embedding the use of Irish across the whole school.",
    },
    category: "whole-school-packages",
    resourceType: "pdf",
    author: "Seán Ó Conaill",
    updatedDate: "2025-09-19",
    fileSize: "520 KB",
  },
  {
    id: "tr7",
    slug: "fgl-modheolaiocht-bheo",
    titleGa: "FGL: Modheolaíocht na Gaeilge Beo",
    titleEn: "CPD: Living-Language Methodology",
    description: {
      ga: "Ábhar FGL féinstiúrtha ar mhodhanna teagaisc chumarsáideacha.",
      en: "Self-directed CPD material on communicative teaching methods.",
    },
    category: "professional-learning",
    resourceType: "video",
    author: "COGG",
    updatedDate: "2026-01-05",
    fileSize: "68 MB",
    featured: true,
  },
  {
    id: "tr8",
    slug: "fgl-measunu-foirmitheach",
    titleGa: "FGL: Measúnú Foirmitheach sa Ghaeilge",
    titleEn: "CPD: Formative Assessment in Irish",
    description: {
      ga: "Seisiún FGL gairid ar theicnící measúnaithe foirmithigh sa seomra ranga Gaeilge.",
      en: "A short CPD session on formative assessment techniques in the Irish classroom.",
    },
    category: "professional-learning",
    resourceType: "ppt",
    author: "Máire Ní Bhriain",
    updatedDate: "2025-12-02",
    fileSize: "6.9 MB",
  },
  {
    id: "tr9",
    slug: "curam-gaeilge-do-mhuinteoiri",
    titleGa: "Cúrsa Athnuachana Gaeilge do Mhúinteoirí",
    titleEn: "Irish Refresher Course for Teachers",
    description: {
      ga: "Cúrsa féin-luais chun do chuid Gaeilge labhartha a athnuachan sula dtosaíonn an scoilbhliain.",
      en: "A self-paced course to refresh your spoken Irish before the school year begins.",
    },
    category: "irish-courses",
    resourceType: "audio",
    author: "An Tobar",
    updatedDate: "2025-08-25",
    fileSize: "24 MB",
  },
  {
    id: "tr10",
    slug: "gaeilge-do-thosaitheoiri-foireann",
    titleGa: "Gaeilge do Thosaitheoirí - Foireann Scoile",
    titleEn: "Irish for Beginners - School Staff",
    description: {
      ga: "Cúrsa réamhrá do bhaill foirne nach bhfuil ach beagán Gaeilge acu.",
      en: "An introductory course for staff members with only a little Irish.",
    },
    category: "irish-courses",
    resourceType: "word",
    author: "COGG",
    updatedDate: "2026-02-01",
    fileSize: "1.2 MB",
  },
];
