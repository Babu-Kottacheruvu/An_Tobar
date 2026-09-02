export interface SlideItem {
  id: string;
  titleGa: string;
  titleEn: string;
  descriptionGa: string;
  descriptionEn: string;
  ctaText: string;
  ctaDestination: string;
  imageIcon: string;
  startDate: string;
  endDate: string;
  active: boolean;
  order: number;
}

export type SliderTabId = "homepage" | "primary" | "secondary" | "featured-resources";

export interface SliderTabMeta {
  id: SliderTabId;
  label: { en: string; ga: string };
  accent: string;
}

export const sliderTabMeta: SliderTabMeta[] = [
  { id: "homepage", label: { en: "Homepage Slider", ga: "Sleamhnóir an Bhaile" }, accent: "from-brand-green-700 to-brand-navy-900" },
  { id: "primary", label: { en: "Primary Slider", ga: "Sleamhnóir na Bunscoile" }, accent: "from-brand-green-600 to-brand-gold-500" },
  { id: "secondary", label: { en: "Secondary Spotlight", ga: "Spotsholas Iar-bhunscoile" }, accent: "from-teen-pink-600 to-teen-violet-600" },
  { id: "featured-resources", label: { en: "Featured Resources", ga: "Príomhacmhainní" }, accent: "from-brand-navy-700 to-brand-green-800" },
];

function slides(rows: Omit<SlideItem, "id" | "order">[]): SlideItem[] {
  return rows.map((row, index) => ({ ...row, id: `slide-${index + 1}-${row.titleEn.slice(0, 6)}`, order: index + 1 }));
}

/**
 * Seed data for the Featured Content & Slider Manager. "Homepage Slider" is
 * new CMS-only content (the live homepage currently has a single static
 * hero); "Primary Slider", "Secondary Spotlight" and "Featured Resources"
 * mirror the real sliders already live on Bunscoil, #Tobshaol and the main
 * site (see BunscoilHeroSlider, TobshaolSpotlight and Home.tsx). Editing
 * here is CMS working-draft state only, per this prototype's no-backend
 * pattern.
 */
export const initialSliderTabs: Record<SliderTabId, SlideItem[]> = {
  homepage: slides([
    {
      titleGa: "Fáilte go dtí An Tobar",
      titleEn: "Welcome to An Tobar",
      descriptionGa: "Ag tacú le múineadh agus le foghlaim na Gaeilge i mbunscoileanna agus in iarbhunscoileanna lán-Bhéarla.",
      descriptionEn: "Supporting the teaching and learning of Irish in English-medium primary and post-primary schools.",
      ctaText: "Féach ar acmhainní",
      ctaDestination: "/acmhainni",
      imageIcon: "home",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Nuacht is Déanaí",
      titleEn: "Latest News",
      descriptionGa: "Nuashonruithe, imeachtaí agus fógraí ó An Tobar agus ón bpobal oideachais Gaeilge.",
      descriptionEn: "Updates, events and announcements from An Tobar and the Irish-medium education community.",
      ctaText: "Léigh an nuacht",
      ctaDestination: "/nuacht",
      imageIcon: "news",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Comórtais Oscailte",
      titleEn: "Open Competitions",
      descriptionGa: "Comórtais bhliantúla a thugann deis do dhaltaí a gcuid Gaeilge a úsáid go spraíúil.",
      descriptionEn: "Annual competitions giving students a fun reason to use their Irish.",
      ctaText: "Bí páirteach",
      ctaDestination: "/comortais",
      imageIcon: "competitions",
      startDate: "2026-02-01",
      endDate: "2026-12-31",
      active: true,
    },
  ]),
  primary: slides([
    {
      titleGa: "Fáilte go Bunscoil",
      titleEn: "Welcome to Bunscoil",
      descriptionGa: "Gach a dteastaíonn ó bhunscoil chun an Ghaeilge a bheochtú, ó na Naíonáin go Rang a Sé.",
      descriptionEn: "Everything a primary school needs to bring Irish to life, from Naíonáin to Rang a Sé.",
      ctaText: "Féach ar na hacmhainní",
      ctaDestination: "/bunscoil/acmhainni",
      imageIcon: "home",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Foghlaim Gaeilge ar bhealach spraíúil",
      titleEn: "Learn Irish in a fun way",
      descriptionGa: "Cluichí, amhráin agus gníomhaíochtaí dathannacha a fhágann an Ghaeilge mar chuid de shaol laethúil an ranga.",
      descriptionEn: "Games, songs and colourful activities that make Irish part of everyday classroom life.",
      ctaText: "Tabhair cuairt ar Chúinne na bPáistí",
      ctaDestination: "/bunscoil/cuinne-na-bpaisti",
      imageIcon: "grid",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Acmhainní nua do mhúinteoirí",
      titleEn: "New resources for teachers",
      descriptionGa: "Bileoga oibre úra, tacaíochtaí pleanála agus uirlisí measúnaithe á gcur leis gach mí.",
      descriptionEn: "Fresh worksheets, planning supports and assessment tools added every month.",
      ctaText: "Léigh Treoir an Mhúinteora",
      ctaDestination: "/bunscoil/treoir-an-muinteora",
      imageIcon: "book",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
  ]),
  secondary: slides([
    {
      titleGa: "Cé Mise? Láithreoireacht Réamhrá",
      titleEn: "Who Am I? Introduction Presentation",
      descriptionGa: "Láithreoireacht spraíúil chun daltaí Bhliain 1 a spreagadh iad féin a chur in aithne trí Ghaeilge.",
      descriptionEn: "A fun presentation to get 1st Years introducing themselves in Irish.",
      ctaText: "Féach ar Bhliain 1",
      ctaDestination: "/iar-bhunscoil/bliain-1",
      imageIcon: "chat",
      startDate: "2026-02-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Plean Tionscadail: Mo Shaol Sóisialta",
      titleEn: "Project Plan: My Social Life",
      descriptionGa: "Plean tionscadail Idirbhliana a spreagann daltaí chun cur síos a dhéanamh ar a saol sóisialta.",
      descriptionEn: "A Transition Year project plan encouraging students to describe their social life.",
      ctaText: "Féach ar #Tobshaol",
      ctaDestination: "/iar-bhunscoil",
      imageIcon: "grid",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Póstaer Ranga: Caithimh Aimsire",
      titleEn: "Classroom Poster: Hobbies",
      descriptionGa: "Póstaer dathannach a thaispeánann caithimh aimsire choitianta déagóirí.",
      descriptionEn: "A colourful poster showing common teenage hobbies.",
      ctaText: "Féach ar #Tobshaol",
      ctaDestination: "/iar-bhunscoil",
      imageIcon: "star",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
  ]),
  "featured-resources": slides([
    {
      titleGa: "Pacáiste Gramadaí: An Aimsir Láithreach",
      titleEn: "Present Tense Grammar Pack",
      descriptionGa: "Mínithe soiléire agus cleachtaí praiticiúla ar bhriathra rialta agus neamhrialta san aimsir láithreach.",
      descriptionEn: "Clear explanations and practice exercises for regular and irregular verbs in the present tense.",
      ctaText: "Féach ar an acmhainn",
      ctaDestination: "/acmhainni/aimsir-lathair-gramadach",
      imageIcon: "book",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "An Modh Coinníollach Mínithe",
      titleEn: "The Conditional Mood Explained",
      descriptionGa: "Treoir chéim ar chéim ar an modh coinníollach le samplaí oibrithe do ranganna scrúdaithe.",
      descriptionEn: "A step-by-step guide to the conditional mood with worked examples for exam classes.",
      ctaText: "Féach ar an acmhainn",
      ctaDestination: "/acmhainni/modh-coinniollach",
      imageIcon: "document",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
    {
      titleGa: "Ag Tacú leis an nGaeilge sa Bhaile",
      titleEn: "Supporting Irish at Home: A Parent's Guide",
      descriptionGa: "Leideanna simplí, nach dteastaíonn Gaeilge uathu, chun Gaeilge do linbh a spreagadh lasmuigh den scoil.",
      descriptionEn: "Simple, no-Irish-needed tips for encouraging your child's Irish outside school.",
      ctaText: "Féach ar an acmhainn",
      ctaDestination: "/acmhainni/gaeilge-sa-bhaile-treoir-tuismitheoiri",
      imageIcon: "family",
      startDate: "2026-01-01",
      endDate: "",
      active: true,
    },
  ]),
};

export const slideIconOptions = ["home", "news", "resources", "competitions", "tobghaeltacht", "book", "grid", "chat", "document", "star", "teacher", "family"] as const;
