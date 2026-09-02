import type { Bilingual } from "../types";
import { classLevels } from "./classLevels";
import { themes } from "./themes";
import { bunscoilResourceTypes } from "./resourceTypes";

export interface PrimaryResource {
  id: string;
  slug: string;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  classLevel: string;
  theme: string;
  topic: string;
  resourceType: string;
  assessment: boolean;
  planning: boolean;
  author: string;
  updatedDate: string;
  language: Bilingual;
  fileSize: string;
  suitableFor: Bilingual;
  isNew?: boolean;
}

const IRISH: Bilingual = { ga: "Gaeilge", en: "Irish" };

const curatedResources: PrimaryResource[] = [
  {
    id: "p1",
    slug: "mo-chorp-pictiuir-lipeadaithe",
    titleGa: "Pictiúir Lipéadaithe: Mo Chorp",
    titleEn: "Labelled Pictures: My Body",
    description: {
      ga: "Sraith pictiúr geala le lipéid do chodanna an choirp le crochadh sa seomra ranga.",
      en: "A bright set of labelled pictures for body parts to display in the classroom.",
    },
    classLevel: "naionain-shoisearacha",
    theme: "me-fein",
    topic: "mo-chorp",
    resourceType: "pictures",
    assessment: false,
    planning: false,
    author: "An Tobar",
    updatedDate: "2026-02-18",
    language: IRISH,
    fileSize: "3.2 MB",
    suitableFor: { ga: "Taispeáint ranga nó obair bheirte", en: "Classroom display or pair work" },
    isNew: true,
  },
  {
    id: "p2",
    slug: "amhran-conas-taoi",
    titleGa: "Amhrán: Conas Atá Tú?",
    titleEn: "Song: How Are You?",
    description: {
      ga: "Físeán amhránaíochta spraíúil a mhúineann frásaí do mhothúcháin.",
      en: "A fun sing-along video teaching phrases for feelings.",
    },
    classLevel: "naionain-shinsearacha",
    theme: "me-fein",
    topic: "mo-mhothuchain",
    resourceType: "videos",
    assessment: false,
    planning: false,
    author: "COGG",
    updatedDate: "2026-01-09",
    language: IRISH,
    fileSize: "48 MB",
    suitableFor: { ga: "Obair ranga iomlán", en: "Whole-class work" },
  },
  {
    id: "p3",
    slug: "an-seomra-ranga-bileog",
    titleGa: "Bileog Oibre: An Seomra Ranga",
    titleEn: "Worksheet: The Classroom",
    description: {
      ga: "Meaitseáil focail le pictiúir d'earraí coitianta sa seomra ranga.",
      en: "Match words to pictures of common classroom items.",
    },
    classLevel: "rang-1",
    theme: "ar-scoil",
    topic: "an-seomra-ranga",
    resourceType: "worksheets",
    assessment: false,
    planning: false,
    author: "Máire Ní Bhriain",
    updatedDate: "2025-11-24",
    language: IRISH,
    fileSize: "620 KB",
    suitableFor: { ga: "Obair aonair", en: "Individual work" },
  },
  {
    id: "p4",
    slug: "plean-ceachta-abhair-scoile",
    titleGa: "Plean Ceachta: Ábhair Scoile",
    titleEn: "Lesson Plan: School Subjects",
    description: {
      ga: "Plean ceachta iomlán le haghaidh seachtaine ar fhoclóir na n-ábhar scoile.",
      en: "A full week's lesson plan covering school subject vocabulary.",
    },
    classLevel: "rang-2",
    theme: "ar-scoil",
    topic: "abhair-scoile",
    resourceType: "word",
    assessment: false,
    planning: true,
    author: "Seán Ó Conaill",
    updatedDate: "2025-10-30",
    language: IRISH,
    fileSize: "410 KB",
    suitableFor: { ga: "Pleanáil an mhúinteora", en: "Teacher planning" },
  },
  {
    id: "p5",
    slug: "cluastuiscint-an-aimsir",
    titleGa: "Comhad Fuaime: Cur Síos ar an Aimsir",
    titleEn: "Sound File: Describing the Weather",
    description: {
      ga: "Comhad fuaime gearr le cleachtaí cluastuisceana ar fhrásaí na haimsire.",
      en: "A short audio clip with listening exercises on weather phrases.",
    },
    classLevel: "rang-3",
    theme: "an-aimsir",
    topic: "cur-sios-aimsir",
    resourceType: "sound",
    assessment: false,
    planning: false,
    author: "An Tobar",
    updatedDate: "2026-02-25",
    language: IRISH,
    fileSize: "6.1 MB",
    suitableFor: { ga: "Obair ranga iomlán nó grúpa éisteachta", en: "Whole-class or listening-group work" },
    isNew: true,
  },
  {
    id: "an-aimsir-weather-vocabulary",
    slug: "an-aimsir-weather-vocabulary",
    titleGa: "An Aimsir",
    titleEn: "Weather Vocabulary",
    description: {
      ga: "Pacáiste foclóra iomlán ar an aimsir - focail bhunúsacha, aidiachtaí agus frásaí coitianta chun cur síos a dhéanamh ar an aimsir gach lá. Áirítear póstaer inphriontáilte, cárta foclóra agus liosta abairtí samplacha atá oiriúnach do chur i láthair ranga nó do obair aonair.",
      en: "A complete weather vocabulary pack - core words, adjectives and everyday phrases for describing the weather. Includes a printable poster, a vocabulary card and sample sentences suited to whole-class display or individual work.",
    },
    classLevel: "rang-1",
    theme: "an-aimsir",
    topic: "cur-sios-aimsir",
    resourceType: "pdf",
    assessment: false,
    planning: false,
    author: "An Tobar",
    updatedDate: "2026-02-27",
    language: IRISH,
    fileSize: "1.8 MB",
    suitableFor: { ga: "Taispeáint ranga nó obair aonair", en: "Classroom display or individual work" },
    isNew: true,
  },
  {
    id: "p6",
    slug: "seasuir-lathoir",
    titleGa: "Láithreoireacht: Na Séasúir",
    titleEn: "Presentation: The Seasons",
    description: {
      ga: "Láithreoireacht dhathannach a chuireann foclóir na séasúr in aithne.",
      en: "A colourful presentation introducing seasonal vocabulary.",
    },
    classLevel: "rang-2",
    theme: "an-aimsir",
    topic: "seasuir",
    resourceType: "powerpoint",
    assessment: false,
    planning: false,
    author: "Aoife Nic Cárthaigh",
    updatedDate: "2025-09-15",
    language: IRISH,
    fileSize: "5.4 MB",
    suitableFor: { ga: "Obair ranga iomlán", en: "Whole-class work" },
  },
  {
    id: "p7",
    slug: "measunu-torthai-glasrai",
    titleGa: "Measúnú: Torthaí agus Glasraí",
    titleEn: "Assessment: Fruit and Vegetables",
    description: {
      ga: "Tasc measúnaithe gearr chun foclóir bia a dhearbhú.",
      en: "A short assessment task to check food vocabulary.",
    },
    classLevel: "rang-3",
    theme: "bia",
    topic: "torthai-glasrai",
    resourceType: "pdf",
    assessment: true,
    planning: false,
    author: "COGG",
    updatedDate: "2025-12-08",
    language: IRISH,
    fileSize: "540 KB",
    suitableFor: { ga: "Measúnú aonair", en: "Individual assessment" },
  },
  {
    id: "p8",
    slug: "eadai-aimsire-pictiuir",
    titleGa: "Pictiúir: Éadaí Aimsire",
    titleEn: "Pictures: Weather Clothes",
    description: {
      ga: "Cártaí pictiúr chun éadaí a mheaitseáil leis an aimsir cheart.",
      en: "Picture cards for matching clothes to the right weather.",
    },
    classLevel: "rang-1",
    theme: "eadai",
    topic: "eadai-aimsire",
    resourceType: "pictures",
    assessment: false,
    planning: false,
    author: "Pádraig Ó Dálaigh",
    updatedDate: "2025-08-19",
    language: IRISH,
    fileSize: "2.7 MB",
    suitableFor: { ga: "Obair ghrúpa bheag", en: "Small-group work" },
  },
  {
    id: "p9",
    slug: "la-fheile-padraig-pleanail",
    titleGa: "Pacáiste Pleanála: Lá Fhéile Pádraig",
    titleEn: "Planning Pack: St Patrick's Day",
    description: {
      ga: "Pacáiste pleanála seachtaine iomlán do Lá Fhéile Pádraig, ó Naíonáin go Rang a Sé.",
      en: "A complete week-long planning pack for St Patrick's Day, from Infants to 6th Class.",
    },
    classLevel: "rang-4",
    theme: "ocaidi-speisialta",
    topic: "la-fheile-padraig",
    resourceType: "word",
    assessment: false,
    planning: true,
    author: "An Tobar",
    updatedDate: "2026-01-20",
    language: IRISH,
    fileSize: "1.1 MB",
    suitableFor: { ga: "Pleanáil scoile iomlán", en: "Whole-school planning" },
    isNew: true,
  },
  {
    id: "p10",
    slug: "carachtair-teilifise-fisean",
    titleGa: "Físeán: Carachtair Theilifíse is Fearr Linn",
    titleEn: "Video: Our Favourite TV Characters",
    description: {
      ga: "Físeán gairid a spreagann daltaí chun cur síos a dhéanamh ar charachtair theilifíse.",
      en: "A short video encouraging pupils to describe TV characters.",
    },
    classLevel: "rang-4",
    theme: "an-teilifis",
    topic: "carachtair",
    resourceType: "videos",
    assessment: false,
    planning: false,
    author: "Máire Ní Bhriain",
    updatedDate: "2025-11-02",
    language: IRISH,
    fileSize: "62 MB",
    suitableFor: { ga: "Obair ranga iomlán", en: "Whole-class work" },
  },
  {
    id: "p11",
    slug: "sa-siopa-grosaera-role-play",
    titleGa: "Bileog Rólghlactha: Sa Siopa Grósaera",
    titleEn: "Role-Play Worksheet: At the Grocery Shop",
    description: {
      ga: "Scripteanna rólghlactha simplí do chomhrá sa siopa.",
      en: "Simple role-play scripts for shop conversations.",
    },
    classLevel: "rang-5",
    theme: "ag-siopadoireacht",
    topic: "sa-siopa-grosaera",
    resourceType: "worksheets",
    assessment: false,
    planning: false,
    author: "Seán Ó Conaill",
    updatedDate: "2025-10-05",
    language: IRISH,
    fileSize: "380 KB",
    suitableFor: { ga: "Obair bheirte", en: "Pair work" },
  },
  {
    id: "p12",
    slug: "seomrai-an-ti-measunu",
    titleGa: "Measúnú: Seomraí an Tí",
    titleEn: "Assessment: Rooms of the House",
    description: {
      ga: "Tástáil ghearr scríofa agus ó bhéal ar fhoclóir an tí.",
      en: "A short written and oral test on household vocabulary.",
    },
    classLevel: "rang-6",
    theme: "sa-bhaile",
    topic: "seomrai-an-ti",
    resourceType: "pdf",
    assessment: true,
    planning: false,
    author: "COGG",
    updatedDate: "2025-09-28",
    language: IRISH,
    fileSize: "470 KB",
    suitableFor: { ga: "Measúnú aonair", en: "Individual assessment" },
  },
];

const generatorAuthors = [
  "An Tobar",
  "COGG",
  "Máire Ní Bhriain",
  "Seán Ó Conaill",
  "Aoife Nic Cárthaigh",
  "Pádraig Ó Dálaigh",
];

const resourceTypeIds = bunscoilResourceTypes.map((option) => option.id);
const classLevelIds = classLevels.map((level) => level.id);

const generatedFileSizeByType: Record<string, string[]> = {
  pictures: ["1.2 MB", "2.4 MB", "3.1 MB"],
  videos: ["35 MB", "58 MB", "72 MB"],
  sound: ["3.4 MB", "5.9 MB", "8.2 MB"],
  powerpoint: ["4.1 MB", "5.6 MB", "6.8 MB"],
  worksheets: ["310 KB", "480 KB", "640 KB"],
  word: ["290 KB", "520 KB", "710 KB"],
  pdf: ["420 KB", "690 KB", "1.1 MB"],
};

/**
 * Fills out the resource library with additional entries built from the
 * theme/topic vocabulary already defined, so the search results page has
 * enough items to demonstrate sorting and pagination realistically.
 */
function buildGeneratedResources(): PrimaryResource[] {
  const generated: PrimaryResource[] = [];
  let counter = 0;

  themes.forEach((themeItem, themeIndex) => {
    themeItem.topics.forEach((topicItem, topicIndex) => {
      [0, 1].forEach((variant) => {
        const resourceType = resourceTypeIds[(counter + variant) % resourceTypeIds.length];
        const classLevel =
          classLevelIds[(themeIndex + topicIndex + variant) % classLevelIds.length];
        const typeOption = bunscoilResourceTypes.find((option) => option.id === resourceType)!;
        const classLevelOption = classLevels.find((level) => level.id === classLevel)!;
        const author = generatorAuthors[counter % generatorAuthors.length];
        const daysAgo = 3 + ((counter * 7) % 300);
        const updatedDate = new Date(Date.UTC(2026, 8, 2) - daysAgo * 86400000)
          .toISOString()
          .slice(0, 10);
        const sizes = generatedFileSizeByType[resourceType] ?? ["1 MB"];
        const fileSize = sizes[counter % sizes.length];

        generated.push({
          id: `g-${themeItem.id}-${topicItem.id}-${variant}`,
          slug: `${themeItem.id}-${topicItem.id}-${resourceType}-${variant}`,
          titleGa: `${typeOption.label.ga}: ${topicItem.label.ga}`,
          titleEn: `${typeOption.label.en}: ${topicItem.label.en}`,
          description: {
            ga: `Acmhainn ${typeOption.label.ga.toLowerCase()} faoin téama '${themeItem.label.ga}', dírithe ar '${topicItem.label.ga}' agus oiriúnach do ${classLevelOption.label.ga}.`,
            en: `A ${typeOption.label.en.toLowerCase()} resource on the theme of '${themeItem.label.en}', focused on '${topicItem.label.en}' and suited to ${classLevelOption.label.en}.`,
          },
          classLevel,
          theme: themeItem.id,
          topic: topicItem.id,
          resourceType,
          assessment: counter % 7 === 0,
          planning: counter % 5 === 0,
          author,
          updatedDate,
          language: IRISH,
          fileSize,
          suitableFor: { ga: "Obair ranga nó grúpa", en: "Whole-class or group work" },
          isNew: counter % 13 === 0,
        });

        counter += 1;
      });
    });
  });

  return generated;
}

export const primaryResources: PrimaryResource[] = [
  ...curatedResources,
  ...buildGeneratedResources(),
];
