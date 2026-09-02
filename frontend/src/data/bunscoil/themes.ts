import type { Bilingual } from "../types";

export interface Topic {
  id: string;
  label: Bilingual;
}

export interface Theme {
  id: string;
  label: Bilingual;
  topics: Topic[];
}

export const themes: Theme[] = [
  {
    id: "me-fein",
    label: { en: "Myself", ga: "Mé Féin" },
    topics: [
      { id: "mo-chorp", label: { en: "My Body", ga: "Mo Chorp" } },
      { id: "mo-mhothuchain", label: { en: "My Feelings", ga: "Mo Mhothúcháin" } },
      { id: "m-ainm-aois", label: { en: "My Name and Age", ga: "M'Ainm agus M'Aois" } },
    ],
  },
  {
    id: "ar-scoil",
    label: { en: "At School", ga: "Ar Scoil" },
    topics: [
      { id: "an-seomra-ranga", label: { en: "The Classroom", ga: "An Seomra Ranga" } },
      { id: "abhair-scoile", label: { en: "School Subjects", ga: "Ábhair Scoile" } },
      { id: "foireann-na-scoile", label: { en: "School Staff", ga: "Foireann na Scoile" } },
    ],
  },
  {
    id: "caitheamh-aimsire",
    label: { en: "Pastimes", ga: "Caitheamh Aimsire" },
    topics: [
      { id: "sport", label: { en: "Sport", ga: "Spórt" } },
      { id: "caithimh-laistigh", label: { en: "Indoor Hobbies", ga: "Caithimh Aimsire Laistigh" } },
      { id: "cluichi", label: { en: "Games", ga: "Cluichí" } },
    ],
  },
  {
    id: "an-aimsir",
    label: { en: "Weather", ga: "An Aimsir" },
    topics: [
      { id: "seasuir", label: { en: "Seasons", ga: "Séasúir" } },
      { id: "cur-sios-aimsir", label: { en: "Describing Weather", ga: "Cur Síos ar an Aimsir" } },
    ],
  },
  {
    id: "bia",
    label: { en: "Food", ga: "Bia" },
    topics: [
      { id: "bricfeasta", label: { en: "Breakfast", ga: "Bricfeasta" } },
      { id: "torthai-glasrai", label: { en: "Fruit and Vegetables", ga: "Torthaí agus Glasraí" } },
      { id: "ag-an-mbord", label: { en: "At the Table", ga: "Ag an mBord" } },
    ],
  },
  {
    id: "eadai",
    label: { en: "Clothes", ga: "Éadaí" },
    topics: [
      { id: "eadai-scoile", label: { en: "School Clothes", ga: "Éadaí Scoile" } },
      { id: "eadai-aimsire", label: { en: "Weather Clothes", ga: "Éadaí Aimsire" } },
    ],
  },
  {
    id: "ocaidi-speisialta",
    label: { en: "Special Occasions", ga: "Ócáidí Speisialta" },
    topics: [
      { id: "nollaig", label: { en: "Christmas", ga: "Nollaig" } },
      { id: "caisc", label: { en: "Easter", ga: "Cáisc" } },
      { id: "la-fheile-padraig", label: { en: "St Patrick's Day", ga: "Lá Fhéile Pádraig" } },
    ],
  },
  {
    id: "an-teilifis",
    label: { en: "Television", ga: "An Teilifís" },
    topics: [
      { id: "clair-teilifise", label: { en: "TV Programmes", ga: "Cláir Theilifíse" } },
      { id: "carachtair", label: { en: "Characters", ga: "Carachtair" } },
    ],
  },
  {
    id: "ag-siopadoireacht",
    label: { en: "Shopping", ga: "Ag Siopadóireacht" },
    topics: [
      { id: "sa-siopa-grosaera", label: { en: "At the Grocery Shop", ga: "Sa Siopa Grósaera" } },
      { id: "airgead", label: { en: "Money", ga: "Airgead" } },
    ],
  },
  {
    id: "sa-bhaile",
    label: { en: "At Home", ga: "Sa Bhaile" },
    topics: [
      { id: "seomrai-an-ti", label: { en: "Rooms of the House", ga: "Seomraí an Tí" } },
      { id: "poist-ti", label: { en: "Household Chores", ga: "Poist Tí" } },
    ],
  },
];
