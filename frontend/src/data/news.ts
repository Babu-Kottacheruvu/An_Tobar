import type { Bilingual } from "./types";

export interface NewsCategory {
  id: string;
  label: Bilingual;
}

export const newsCategories: NewsCategory[] = [
  { id: "imeachtai", label: { en: "Events", ga: "Imeachtaí" } },
  { id: "acmhainni", label: { en: "New resources", ga: "Acmhainní Nua" } },
  { id: "comortais", label: { en: "Competitions", ga: "Comórtais" } },
  { id: "beartas", label: { en: "Policy", ga: "Beartas" } },
];

export interface NewsItem {
  id: string;
  slug: string;
  title: Bilingual;
  summary: Bilingual;
  body: Bilingual;
  category: string;
  /** Audience/type tags matching newsFilterTags - drives the News page filters. */
  tags: string[];
  author: string;
  date: string;
  featured?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    slug: "seachtain-na-gaeilge-2026",
    title: {
      en: "Seachtain na Gaeilge 2026: Planning packs now live",
      ga: "Seachtain na Gaeilge 2026: Pacáistí pleanála beo anois",
    },
    summary: {
      en: "Free whole-school planning packs for Seachtain na Gaeilge are now available to download.",
      ga: "Tá pacáistí pleanála saor in aisce don scoil ar fad ar fáil anois le híoslódáil do Sheachtain na Gaeilge.",
    },
    body: {
      en: "An Tobar has published this year's Seachtain na Gaeilge planning packs, with a daily activity calendar, assembly scripts and printable displays for both primary and post-primary schools. Schools can register their events for a chance to be featured on our national map.",
      ga: "D'fhoilsigh An Tobar pacáistí pleanála na bliana seo do Sheachtain na Gaeilge, le féilire gníomhaíochtaí laethúla, scripteanna do thionóil agus taispeántais inphriontáilte do bhunscoileanna agus d'iarbhunscoileanna araon. Is féidir le scoileanna a n-imeachtaí a chlárú agus seans a bheith acu a bheith le feiceáil ar ár léarscáil náisiúnta.",
    },
    category: "imeachtai",
    tags: ["events", "primary", "secondary", "teachers"],
    author: "Foireann An Tobar",
    date: "2026-02-20",
    featured: true,
  },
  {
    id: "n2",
    slug: "20-acmhainn-nua-cluastuisceana",
    title: {
      en: "20 new listening-comprehension resources added",
      ga: "20 acmhainn nua cluastuisceana curtha leis",
    },
    summary: {
      en: "A fresh batch of graded listening clips has been added to the resource library this month.",
      ga: "Cuireadh sraith nua píosaí éisteachta céimnithe leis an leabharlann acmhainní an mhí seo.",
    },
    body: {
      en: "Building on feedback from teachers, we have added 20 new short listening clips spanning both primary and post-primary levels, each with printable question sheets and an answer key.",
      ga: "Ag tógáil ar aiseolas ó mhúinteoirí, chuireamar 20 gearrphíosa nua éisteachta leis a chlúdaíonn leibhéal na bunscoile agus na hiarbhunscoile araon, gach ceann acu le bileoga ceisteanna inphriontáilte agus eochair freagraí.",
    },
    category: "acmhainni",
    tags: ["resources", "primary", "teachers"],
    author: "Foireann Acmhainní",
    date: "2026-02-05",
    featured: true,
  },
  {
    id: "n3",
    slug: "comortas-scribhneoireachta-2026-oscailte",
    title: {
      en: "Creative Writing Competition 2026 now open for entries",
      ga: "Comórtas Scríbhneoireachta Cruthaithí 2026 oscailte anois",
    },
    summary: {
      en: "This year's competition invites students to write a short story or poem in Irish on the theme 'Mo Dhomhan'.",
      ga: "Tugann comórtas na bliana seo cuireadh do dhaltaí gearrscéal nó dán a scríobh i nGaeilge faoin téama 'Mo Dhomhan'.",
    },
    body: {
      en: "Entries are welcome from both primary and post-primary students, with category prizes and a whole-school prize for the highest number of entries submitted. See the Competitions page for full rules and the entry form.",
      ga: "Fáiltítear roimh iontrálacha ó dhaltaí bunscoile agus iarbhunscoile araon, le duaiseanna catagóire agus duais don scoil ar fad ar an líon is mó iontrálacha a cuireadh isteach. Féach ar leathanach na gComórtas le haghaidh na rialacha iomlána agus an fhoirm iontrála.",
    },
    category: "comortais",
    tags: ["events", "primary", "secondary", "learners"],
    author: "Foireann Comórtas",
    date: "2026-01-28",
  },
  {
    id: "n4",
    slug: "tobghaeltacht-laethanta-tumoideachais",
    title: {
      en: "Tobghaeltacht immersion days booking for spring term",
      ga: "Laethanta tumoideachais Tobghaeltacht á gcur in áirithe don téarma earraigh",
    },
    summary: {
      en: "Schools can now book a Tobghaeltacht immersion day for their class group for the spring term.",
      ga: "Is féidir le scoileanna lá tumoideachais Tobghaeltacht a chur in áirithe dá ngrúpa ranga don téarma earraigh anois.",
    },
    body: {
      en: "Each immersion day brings a guest facilitator into the classroom for a full day of Irish-only activities, games and storytelling. Places are limited and allocated on a first-come, first-served basis.",
      ga: "Tugann gach lá tumoideachais éascaitheoir cuairte isteach sa seomra ranga do lá iomlán de ghníomhaíochtaí, cluichí agus scéalaíocht trí Ghaeilge amháin. Tá áiteanna teoranta agus leithdháiltear iad ar bhonn 'an chéad duine a thagann'.",
    },
    category: "imeachtai",
    tags: ["events", "primary", "teachers"],
    author: "Foireann Tobghaeltacht",
    date: "2026-01-15",
  },
  {
    id: "n5",
    slug: "treoirlinte-nua-pleanail-gaeilge",
    title: {
      en: "Updated guidance on whole-school Irish planning published",
      ga: "Treoirlínte nuashonraithe ar phleanáil scoile don Ghaeilge foilsithe",
    },
    summary: {
      en: "New guidance for principals and Irish co-ordinators supports embedding Irish across the school day.",
      ga: "Tacaíonn treoirlínte nua do phríomhoidí agus do chomhordaitheoirí Gaeilge leis an nGaeilge a leabú tríd an lá scoile.",
    },
    body: {
      en: "Developed with input from serving principals, the new guidance offers practical steps for building an Irish-friendly school culture, including signage, morning routines and staff CPD planning.",
      ga: "Forbraíodh na treoirlínte nua le hionchur ó phríomhoidí atá i mbun poist, agus cuireann siad céimeanna praiticiúla ar fáil chun cultúr scoile atá bá leis an nGaeilge a fhorbairt, lena n-áirítear comharthaíocht, gnáthaimh mhaidine agus pleanáil FGL don fhoireann.",
    },
    category: "beartas",
    tags: ["announcements", "teachers", "primary", "secondary"],
    author: "Foireann An Tobar",
    date: "2025-12-11",
  },
  {
    id: "n6",
    slug: "padlet-cogg-nuashonraithe",
    title: {
      en: "COGG Padlet refreshed with spring classroom ideas",
      ga: "Padlet COGG nuashonraithe le smaointe ranga don earrach",
    },
    summary: {
      en: "The COGG Padlet board has been refreshed with seasonal classroom ideas and shared teacher resources.",
      ga: "Tá clár Padlet COGG nuashonraithe le smaointe ranga séasúracha agus acmhainní roinnte ó mhúinteoirí.",
    },
    body: {
      en: "The COGG Padlet is a living, teacher-contributed board of ideas. This update adds new sections on spring vocabulary, St. Brigid's Day activities and sample display work.",
      ga: "Is clár beo é Padlet COGG a bhfuil múinteoirí ag cur leis. Cuireann an nuashonrú seo ranna nua ar fáil ar fhoclóir an earraigh, gníomhaíochtaí Lá Fhéile Bríde agus samplaí de thaispeántais ranga.",
    },
    category: "acmhainni",
    tags: ["resources", "teachers", "parents"],
    author: "COGG",
    date: "2025-11-20",
  },
  {
    id: "n7",
    slug: "comhairle-tuismitheoiri-obair-bhaile",
    title: {
      en: "Parent Tip: Helping with Irish Homework",
      ga: "Comhairle do Thuismitheoirí: Cabhrú le hObair Bhaile Gaeilge",
    },
    summary: {
      en: "Simple, no-Irish-needed ways for parents to support Irish homework at home.",
      ga: "Bealaí simplí, nach dteastaíonn Gaeilge uathu, chun tuismitheoirí a chumasú tacú le hobair bhaile Gaeilge sa bhaile.",
    },
    body: {
      en: "You don't need fluent Irish to help your child with their homework. This short guide offers practical tips - from listening to them read aloud to using our audio resources together.",
      ga: "Ní gá Gaeilge líofa a bheith agat chun cabhrú le do pháiste lena chuid obair bhaile. Cuireann an treoir ghairid seo leideanna praiticiúla ar fáil - ó bheith ag éisteacht leo ag léamh os ard go bheith ag úsáid ár n-acmhainní fuaime le chéile.",
    },
    category: "acmhainni",
    tags: ["parents", "resources"],
    author: "Foireann An Tobar",
    date: "2026-02-16",
  },
  {
    id: "n8",
    slug: "failte-daltai-nua-tobshaol",
    title: {
      en: "Welcoming New Students to #Tobshaol",
      ga: "Fáilte roimh Dhaltaí Nua go dtí #Tobshaol",
    },
    summary: {
      en: "1st Year students starting post-primary school can now find everything they need on #Tobshaol.",
      ga: "Is féidir le daltaí Bhliain 1 atá ag tosú san iarbhunscoil gach a dteastaíonn uathu a aimsiú anois ar #Tobshaol.",
    },
    body: {
      en: "Our new secondary hub, #Tobshaol, brings together year-group resources, teacher supports and competitions in one energetic space designed just for post-primary students.",
      ga: "Tugann ár mol nua iarbhunscoile, #Tobshaol, acmhainní grúpa bliana, tacaíochtaí do mhúinteoirí agus comórtais le chéile in aon spás fuinniúil amháin atá deartha go sonrach do dhaltaí iarbhunscoile.",
    },
    category: "imeachtai",
    tags: ["secondary", "learners", "announcements"],
    author: "Foireann An Tobar",
    date: "2026-02-27",
  },
];
