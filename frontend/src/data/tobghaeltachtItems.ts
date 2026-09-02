import type { Bilingual } from "./types";

export type MediaType = "video" | "audio" | "activity" | "document";

export interface TobghaeltachtItem {
  id: string;
  category: string;
  mediaType: MediaType;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
}

export const tobghaeltachtItems: TobghaeltachtItem[] = [
  {
    id: "tg1",
    category: "saol-laethuil",
    mediaType: "video",
    titleGa: "Gaeilge ar an tSráid",
    titleEn: "Irish on the Street",
    description: {
      ga: "Físeán gairid a thaispeánann Gaeilge á labhairt i suíomhanna laethúla - sa siopa, sa chlub agus ar an mbus.",
      en: "A short video showing Irish spoken in everyday settings - the shop, the club and the bus.",
    },
  },
  {
    id: "tg2",
    category: "saol-laethuil",
    mediaType: "document",
    titleGa: "Frásaí Laethúla",
    titleEn: "Everyday Phrases",
    description: {
      ga: "Liosta frásaí simplí is féidir a úsáid gach lá sa rang agus sa bhaile.",
      en: "A list of simple phrases you can use every day in class and at home.",
    },
  },
  {
    id: "tg3",
    category: "gniomhaiochtai",
    mediaType: "activity",
    titleGa: "Tóraíocht Taisce Gaeilge",
    titleEn: "Irish Treasure Hunt",
    description: {
      ga: "Gníomhaíocht ranga a spreagann daltaí chun leideanna Gaeilge a réiteach ar fud na scoile.",
      en: "A class activity encouraging students to solve Irish-language clues around the school.",
    },
  },
  {
    id: "tg4",
    category: "gniomhaiochtai",
    mediaType: "activity",
    titleGa: "Cluiche Boird: Cúpla Focal",
    titleEn: "Board Game: A Few Words",
    description: {
      ga: "Cluiche boird priontáilte a spreagann comhrá simplí Gaeilge idir dhaltaí.",
      en: "A printable board game encouraging simple Irish conversation between students.",
    },
  },
  {
    id: "tg5",
    category: "fisean",
    mediaType: "video",
    titleGa: "Turas go dtí an Ghaeltacht",
    titleEn: "A Trip to the Gaeltacht",
    description: {
      ga: "Físeán a thugann blaiseadh de shaol laethúil i gceantar Gaeltachta.",
      en: "A video giving a taste of everyday life in a Gaeltacht area.",
    },
  },
  {
    id: "tg6",
    category: "fisean",
    mediaType: "video",
    titleGa: "Laethanta i Scoil Ghaeltachta",
    titleEn: "Days in a Gaeltacht School",
    description: {
      ga: "Daltaí ó scoil Ghaeltachta ag roinnt cur síos ar a lá scoile trí Ghaeilge.",
      en: "Students from a Gaeltacht school describing their school day in Irish.",
    },
  },
  {
    id: "tg7",
    category: "fuaim",
    mediaType: "audio",
    titleGa: "Podchraoladh: Scéalta ón nGaeltacht",
    titleEn: "Podcast: Stories from the Gaeltacht",
    description: {
      ga: "Sraith ghearr phodchraolta le scéalta agus cuimhní ó phobal na Gaeltachta.",
      en: "A short podcast series with stories and memories from the Gaeltacht community.",
    },
  },
  {
    id: "tg8",
    category: "fuaim",
    mediaType: "audio",
    titleGa: "Amhráin Traidisiúnta",
    titleEn: "Traditional Songs",
    description: {
      ga: "Cnuasach amhrán traidisiúnta le foghlaim agus le canadh sa rang.",
      en: "A collection of traditional songs to learn and sing in class.",
    },
  },
  {
    id: "tg9",
    category: "cultur",
    mediaType: "document",
    titleGa: "Béaloideas na hÉireann",
    titleEn: "Irish Folklore",
    description: {
      ga: "Cnuasach gearrscéalta béaloidis oiriúnach do léitheoireacht ranga.",
      en: "A collection of short folklore tales suited to class reading.",
    },
  },
  {
    id: "tg10",
    category: "cultur",
    mediaType: "activity",
    titleGa: "Damhsa Céilí don Rang",
    titleEn: "Céilí Dance for the Class",
    description: {
      ga: "Treoracha simplí céime chun céilí a mhúineadh don rang ar fad.",
      en: "Simple step-by-step instructions for teaching a céilí dance to the whole class.",
    },
  },
  {
    id: "tg11",
    category: "dushlan",
    mediaType: "activity",
    titleGa: "Dúshlán 5 Lá as Gaeilge",
    titleEn: "5-Day Irish Challenge",
    description: {
      ga: "Dúshlán seachtaine a spreagann daltaí Gaeilge a úsáid ar bhealach nua gach lá.",
      en: "A week-long challenge encouraging students to use Irish in a new way each day.",
    },
  },
  {
    id: "tg12",
    category: "dushlan",
    mediaType: "activity",
    titleGa: "Tomhaiseanna as Gaeilge",
    titleEn: "Irish Riddles",
    description: {
      ga: "Sraith tomhaiseanna spraíúla a chuireann foclóir agus greann Gaeilge ar taispeáint.",
      en: "A set of fun riddles showcasing Irish vocabulary and humour.",
    },
  },
  {
    id: "tg13",
    category: "acmhainni",
    mediaType: "document",
    titleGa: "Foclóir Beo ar Líne",
    titleEn: "Living Online Dictionary",
    description: {
      ga: "Treoir chuig foinsí foclóra ar líne atá úsáideach do dhaltaí agus do mhúinteoirí araon.",
      en: "A guide to online dictionary sources useful for both students and teachers.",
    },
  },
  {
    id: "tg14",
    category: "acmhainni",
    mediaType: "document",
    titleGa: "Pacáiste Tobghaeltachta don Mhúinteoir",
    titleEn: "Tobghaeltacht Pack for Teachers",
    description: {
      ga: "Pacáiste tacaíochta iomlán chun lá tumoideachais Tobghaeltacht a phleanáil.",
      en: "A complete support pack for planning a Tobghaeltacht immersion day.",
    },
  },
];
