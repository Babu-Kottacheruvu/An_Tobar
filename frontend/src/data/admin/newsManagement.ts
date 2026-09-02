import { newsItems } from "../news";

export type NewsPublishStatus = "draft" | "scheduled" | "published";

export interface NewsCategoryOption {
  id: string;
  label: { en: string; ga: string };
}

/** The 7 CMS category options for news articles (a curated subset of the public site's tag list). */
export const newsCategoryOptions: NewsCategoryOption[] = [
  { id: "primary", label: { en: "Primary", ga: "Bunscoil" } },
  { id: "secondary", label: { en: "Secondary", ga: "Iar-bhunscoil" } },
  { id: "teachers", label: { en: "Teachers", ga: "Múinteoirí" } },
  { id: "parents", label: { en: "Parents", ga: "Tuismitheoirí" } },
  { id: "learners", label: { en: "Learners", ga: "Foghlaimeoirí" } },
  { id: "events", label: { en: "Events", ga: "Imeachtaí" } },
  { id: "announcements", label: { en: "Announcements", ga: "Fógraí" } },
];

export interface NewsArticleRecord {
  id: string;
  titleGa: string;
  titleEn: string;
  summaryGa: string;
  summaryEn: string;
  bodyGa: string;
  bodyEn: string;
  imageAlt: string;
  categories: string[];
  status: NewsPublishStatus;
  scheduledDate: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
}

const validCategoryIds = new Set(newsCategoryOptions.map((option) => option.id));

/**
 * CMS records for News Management, seeded from the real published articles
 * (data/news.ts) plus a couple of admin-only draft/scheduled examples. The
 * "resources" tag used on the public site isn't one of this CMS's 7
 * category options, so it's dropped when carrying tags over.
 */
const fromLiveArticles: NewsArticleRecord[] = newsItems.map((item) => ({
  id: `pub-${item.id}`,
  titleGa: item.title.ga,
  titleEn: item.title.en,
  summaryGa: item.summary.ga,
  summaryEn: item.summary.en,
  bodyGa: item.body.ga,
  bodyEn: item.body.en,
  imageAlt: item.title.en,
  categories: item.tags.filter((tag) => validCategoryIds.has(tag)),
  status: "published",
  scheduledDate: "",
  publishedDate: item.date,
  updatedDate: item.date,
  author: item.author,
}));

const draftAndScheduled: NewsArticleRecord[] = [
  {
    id: "draft-1",
    titleGa: "Torthaí Chomórtas na Nollag",
    titleEn: "Christmas Competition Results",
    summaryGa: "Ainmneacha na mbuaiteoirí ó chomórtas scríbhneoireachta na Nollag.",
    summaryEn: "The winners' names from the Christmas writing competition.",
    bodyGa: "Tá áthas orainn torthaí chomórtas scríbhneoireachta na Nollag a fhógairt. Comhghairdeas leis na buaiteoirí ar fad.",
    bodyEn: "We're delighted to announce the results of the Christmas writing competition. Congratulations to all the winners.",
    imageAlt: "Christmas Competition Results",
    categories: ["primary", "secondary", "announcements"],
    status: "draft",
    scheduledDate: "",
    publishedDate: "",
    updatedDate: "2026-08-29",
    author: "Foireann Comórtas",
  },
  {
    id: "scheduled-1",
    titleGa: "Seachtain na Gaeilge 2027: Réamhfhógra",
    titleEn: "Seachtain na Gaeilge 2027: Advance Notice",
    summaryGa: "Réamhfhógra go bhfuil pleanáil do Sheachtain na Gaeilge 2027 ag tosú go luath.",
    summaryEn: "Advance notice that planning for Seachtain na Gaeilge 2027 is starting soon.",
    bodyGa: "Beidh pacáistí pleanála do Sheachtain na Gaeilge 2027 ar fáil go luath. Coinnigh súil ar an leathanach seo.",
    bodyEn: "Planning packs for Seachtain na Gaeilge 2027 will be available soon. Keep an eye on this page.",
    imageAlt: "Seachtain na Gaeilge 2027",
    categories: ["primary", "secondary", "teachers", "events"],
    status: "scheduled",
    scheduledDate: "2027-01-15",
    publishedDate: "",
    updatedDate: "2026-08-20",
    author: "Foireann An Tobar",
  },
];

export const initialNewsArticles: NewsArticleRecord[] = [...fromLiveArticles, ...draftAndScheduled];
