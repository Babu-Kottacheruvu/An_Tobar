import type { Bilingual } from "../types";
import { tobshaolYearGroups } from "./yearGroups";
import { tobshaolTopics } from "./topics";
import { tobshaolResourceTypes } from "./resourceTypes";

export interface TobshaolResource {
  id: string;
  slug: string;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  yearGroup: string;
  topic: string;
  resourceType: string;
  author: string;
  updatedDate: string;
  featured?: boolean;
  /** Editorially curated "popular" flag - not a live usage metric. */
  popular?: boolean;
}

const curated: TobshaolResource[] = [
  {
    id: "t1",
    slug: "ce-mise-lathoir",
    titleGa: "Cé Mise? Láithreoireacht Réamhrá",
    titleEn: "Who Am I? Introduction Presentation",
    description: {
      ga: "Láithreoireacht spraíúil chun daltaí Bhliain 1 a spreagadh iad féin a chur in aithne trí Ghaeilge.",
      en: "A fun presentation to get 1st Years introducing themselves in Irish.",
    },
    yearGroup: "bliain-1",
    topic: "is-gael-me",
    resourceType: "ppt",
    author: "An Tobar",
    updatedDate: "2026-02-20",
    featured: true,
  },
  {
    id: "t2",
    slug: "abhair-scoile-amchlar",
    titleGa: "Ábhair Scoile agus Amchlár",
    titleEn: "School Subjects and Timetable",
    description: {
      ga: "Bileog oibre a chleachtaíonn foclóir na n-ábhar scoile agus laethanta na seachtaine.",
      en: "A worksheet practising school subject vocabulary and days of the week.",
    },
    yearGroup: "bliain-2-3",
    topic: "mo-shaol-ar-scoil",
    resourceType: "worksheets",
    author: "COGG",
    updatedDate: "2026-01-14",
  },
  {
    id: "t3",
    slug: "tionscadal-saol-sosialta",
    titleGa: "Plean Tionscadail: Mo Shaol Sóisialta",
    titleEn: "Project Plan: My Social Life",
    description: {
      ga: "Plean tionscadail Idirbhliana a spreagann daltaí chun cur síos a dhéanamh ar a saol sóisialta.",
      en: "A Transition Year project plan encouraging students to describe their social life.",
    },
    yearGroup: "idirbhliain",
    topic: "mo-shaol-sosialta",
    resourceType: "word",
    author: "Máire Ní Bhriain",
    updatedDate: "2025-11-19",
    featured: true,
  },
  {
    id: "t4",
    slug: "postaer-ait-chonaithe",
    titleGa: "Póstaer: Cur Síos ar M'áit Chónaithe",
    titleEn: "Poster: Describing My Local Area",
    description: {
      ga: "Póstaer inphriontáilte le foclóir úsáideach chun an ceantar áitiúil a chur síos.",
      en: "A printable poster with useful vocabulary for describing the local area.",
    },
    yearGroup: "bliain-5-6",
    topic: "m-ait-chonaithe",
    resourceType: "posters",
    author: "Seán Ó Conaill",
    updatedDate: "2025-10-02",
  },
  {
    id: "t5",
    slug: "mo-chlann-bileog",
    titleGa: "Bileog Oibre: Mo Chlann agus Mé Féin",
    titleEn: "Worksheet: My Family and Myself",
    description: {
      ga: "Cleachtaí gramadaí agus foclóra bunaithe ar an teaghlach agus ar chur síos pearsanta.",
      en: "Grammar and vocabulary exercises based on family and personal description.",
    },
    yearGroup: "bliain-1",
    topic: "is-gael-me",
    resourceType: "worksheets",
    author: "An Tobar",
    updatedDate: "2026-02-08",
    featured: true,
  },
  {
    id: "t6",
    slug: "ullmhuchan-idirbhliana",
    titleGa: "Láithreoireacht: Ullmhúchán don Idirbhliain",
    titleEn: "Presentation: Preparing for Transition Year",
    description: {
      ga: "Láithreoireacht do ranganna a bhogann isteach san Idirbhliain, ag cur béim ar an nGaeilge bheo.",
      en: "A presentation for classes moving into Transition Year, with a focus on living Irish.",
    },
    yearGroup: "idirbhliain",
    topic: "mo-shaol-ar-scoil",
    resourceType: "ppt",
    author: "Aoife Nic Cárthaigh",
    updatedDate: "2025-09-25",
  },
  {
    id: "t7",
    slug: "postaer-caitheamh-aimsire",
    titleGa: "Póstaer Ranga: Caithimh Aimsire",
    titleEn: "Classroom Poster: Hobbies",
    description: {
      ga: "Póstaer dathannach a thaispeánann caithimh aimsire choitianta déagóirí.",
      en: "A colourful poster showing common teenage hobbies.",
    },
    yearGroup: "bliain-2-3",
    topic: "mo-shaol-sosialta",
    resourceType: "posters",
    author: "Pádraig Ó Dálaigh",
    updatedDate: "2025-12-16",
    featured: true,
  },
  {
    id: "t8",
    slug: "aiste-ait-chonaithe",
    titleGa: "Aiste Shamplach: M'áit Chónaithe",
    titleEn: "Sample Essay: My Local Area",
    description: {
      ga: "Aiste shamplach le nótaí eagair a chuideoidh le daltaí Bhliain 5/6 dá gcuid scríbhneoireachta féin.",
      en: "A sample essay with structure notes to support 5th/6th Year students' own writing.",
    },
    yearGroup: "bliain-5-6",
    topic: "m-ait-chonaithe",
    resourceType: "word",
    author: "COGG",
    updatedDate: "2026-01-30",
  },
];

const authors = ["An Tobar", "COGG", "Máire Ní Bhriain", "Seán Ó Conaill", "Aoife Nic Cárthaigh"];

function buildGenerated(): TobshaolResource[] {
  const generated: TobshaolResource[] = [];
  let counter = 0;

  tobshaolTopics.forEach((topic, topicIndex) => {
    tobshaolResourceTypes.forEach((type, typeIndex) => {
      const yearGroup = tobshaolYearGroups[(topicIndex + typeIndex) % tobshaolYearGroups.length];
      const author = authors[counter % authors.length];
      const daysAgo = 5 + ((counter * 11) % 260);
      const updatedDate = new Date(Date.UTC(2026, 8, 2) - daysAgo * 86400000)
        .toISOString()
        .slice(0, 10);

      generated.push({
        id: `tg-${topic.id}-${type.id}`,
        slug: `${topic.id}-${type.id}`,
        titleGa: `${type.label.ga}: ${topic.label.ga}`,
        titleEn: `${type.label.en}: ${topic.label.en}`,
        description: {
          ga: `Acmhainn ${type.label.ga.toLowerCase()} don téama '${topic.label.ga}', oiriúnach do ${yearGroup.label.ga}.`,
          en: `A ${type.label.en.toLowerCase()} resource for the theme '${topic.label.en}', suited to ${yearGroup.label.en}.`,
        },
        yearGroup: yearGroup.id,
        topic: topic.id,
        resourceType: type.id,
        author,
        updatedDate,
      });

      counter += 1;
    });
  });

  return generated;
}

const POPULAR_IDS = new Set(["t1", "tg-mo-shaol-ar-scoil-worksheets", "tg-m-ait-chonaithe-word"]);

export const tobshaolResources: TobshaolResource[] = [...curated, ...buildGenerated()].map(
  (resource) => (POPULAR_IDS.has(resource.id) ? { ...resource, popular: true } : resource),
);
