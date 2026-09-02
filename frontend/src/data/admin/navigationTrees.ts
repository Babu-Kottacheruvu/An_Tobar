export interface CmsNavItem {
  id: string;
  labelGa: string;
  labelEn: string;
  path: string;
  icon: string;
  parentId: string | null;
  order: number;
  active: boolean;
}

export type NavigationTreeId = "main" | "bunscoil" | "iar-bhunscoil" | "bliain-groups" | "unit-nav";

export interface NavigationTreeMeta {
  id: NavigationTreeId;
  label: { en: string; ga: string };
  theme: "light" | "bunscoil" | "tobshaol";
}

export const navigationTreeMeta: NavigationTreeMeta[] = [
  { id: "main", label: { en: "Main", ga: "Príomh-Nascleanúint" }, theme: "light" },
  { id: "bunscoil", label: { en: "Bunscoil", ga: "Bunscoil" }, theme: "bunscoil" },
  { id: "iar-bhunscoil", label: { en: "Iar-bhunscoil", ga: "Iar-bhunscoil" }, theme: "tobshaol" },
  { id: "bliain-groups", label: { en: "Bliain groups", ga: "Grúpaí Bliana" }, theme: "tobshaol" },
  { id: "unit-nav", label: { en: "Unit navigation", ga: "Nascleanúint Aonaid" }, theme: "tobshaol" },
];

/**
 * Seed data for the Navigation Manager, mirroring the site's real current
 * navigation. Editing here is admin-side CMS state only - the live site's
 * actual nav config (data/navigation.ts etc.) is unaffected, since this
 * prototype has no backend to persist changes back to it.
 */
export const initialNavigationTrees: Record<NavigationTreeId, CmsNavItem[]> = {
  main: [
    { id: "main-1", labelGa: "Baile", labelEn: "Home", path: "/", icon: "home", parentId: null, order: 1, active: true },
    { id: "main-2", labelGa: "Nuacht", labelEn: "News", path: "/nuacht", icon: "news", parentId: null, order: 2, active: true },
    { id: "main-3", labelGa: "Acmhainní an Tobair", labelEn: "An Tobar Resources", path: "/acmhainni", icon: "resources", parentId: null, order: 3, active: true },
    { id: "main-4", labelGa: "Comórtais", labelEn: "Competitions", path: "/comortais", icon: "competitions", parentId: null, order: 4, active: true },
    { id: "main-5", labelGa: "Tobghaeltacht", labelEn: "Tobghaeltacht", path: "/tobghaeltacht", icon: "tobghaeltacht", parentId: null, order: 5, active: true },
    { id: "main-6", labelGa: "Padlet COGG", labelEn: "COGG Padlet", path: "/padlet-cogg", icon: "padlet", parentId: null, order: 6, active: true },
  ],
  bunscoil: [
    { id: "bun-1", labelGa: "Baile", labelEn: "Home", path: "/bunscoil", icon: "home", parentId: null, order: 1, active: true },
    { id: "bun-2", labelGa: "Treoir an Mhúinteora", labelEn: "Teacher's Guide", path: "/bunscoil/treoir-an-muinteora", icon: "book", parentId: null, order: 2, active: true },
    { id: "bun-3", labelGa: "Acmhainní", labelEn: "Resources", path: "/bunscoil/acmhainni", icon: "resources", parentId: null, order: 3, active: true },
    { id: "bun-4", labelGa: "Suaitheantas na gCarachtar", labelEn: "Character Badges", path: "/bunscoil/suaitheantais", icon: "star", parentId: null, order: 4, active: true },
    { id: "bun-5", labelGa: "Cúinne na bPáistí", labelEn: "Children's Corner", path: "/bunscoil/cuinne-na-bpaisti", icon: "chat", parentId: null, order: 5, active: true },
  ],
  "iar-bhunscoil": [
    { id: "iar-1", labelGa: "Baile", labelEn: "Home", path: "/iar-bhunscoil", icon: "home", parentId: null, order: 1, active: true },
    { id: "iar-2", labelGa: "Nuacht", labelEn: "News", path: "/nuacht", icon: "news", parentId: null, order: 2, active: true },
    { id: "iar-3", labelGa: "Acmhainní an Tobair", labelEn: "An Tobar Resources", path: "/acmhainni", icon: "resources", parentId: null, order: 3, active: true },
    { id: "iar-4", labelGa: "Comórtais", labelEn: "Competitions", path: "/comortais", icon: "competitions", parentId: null, order: 4, active: true },
    { id: "iar-5", labelGa: "Tobghaeltacht", labelEn: "Tobghaeltacht", path: "/tobghaeltacht", icon: "tobghaeltacht", parentId: null, order: 5, active: true },
  ],
  "bliain-groups": [
    { id: "bg-1", labelGa: "Bliain 1", labelEn: "1st Year", path: "/iar-bhunscoil/bliain-1", icon: "grid", parentId: null, order: 1, active: true },
    { id: "bg-2", labelGa: "Bliain 2/3", labelEn: "2nd/3rd Year", path: "#tobshaol-cuardach", icon: "grid", parentId: null, order: 2, active: true },
    { id: "bg-3", labelGa: "Idirbhliain", labelEn: "Transition Year", path: "#tobshaol-cuardach", icon: "grid", parentId: null, order: 3, active: true },
    { id: "bg-4", labelGa: "Bliain 5/6", labelEn: "5th/6th Year", path: "#tobshaol-cuardach", icon: "grid", parentId: null, order: 4, active: true },
    { id: "bg-5", labelGa: "Pacáistí Tacaíochta", labelEn: "Support Packages", path: "#tobshaol-cuardach", icon: "document", parentId: null, order: 5, active: true },
    { id: "bg-6", labelGa: "Pacáistí Uile Scoile", labelEn: "Whole-School Packages", path: "/tobghaeltacht", icon: "book", parentId: null, order: 6, active: true },
    { id: "bg-7", labelGa: "Tuismitheoirí / Teaghlaigh", labelEn: "Parents / Families", path: "/acmhainni?audience=parents", icon: "family", parentId: null, order: 7, active: true },
    { id: "bg-8", labelGa: "Múinteoirí", labelEn: "Teachers", path: "/iar-bhunscoil/muinteoiri", icon: "teacher", parentId: null, order: 8, active: true },
    { id: "bg-9", labelGa: "Naisc Eile", labelEn: "Other Links", path: "/#naisc-sheachtracha", icon: "star", parentId: null, order: 9, active: true },
  ],
  "unit-nav": [
    { id: "un-1", labelGa: "Ceacht 1", labelEn: "Lesson 1", path: "#ceacht-1", icon: "chat", parentId: null, order: 1, active: true },
    { id: "un-2", labelGa: "Ceacht 2", labelEn: "Lesson 2", path: "#ceacht-2", icon: "chat", parentId: null, order: 2, active: true },
    { id: "un-3", labelGa: "Ceacht 3", labelEn: "Lesson 3", path: "#ceacht-3", icon: "chat", parentId: null, order: 3, active: true },
    { id: "un-4", labelGa: "Ceacht 4", labelEn: "Lesson 4", path: "#ceacht-4", icon: "chat", parentId: null, order: 4, active: true },
    { id: "un-5", labelGa: "Ceacht 5", labelEn: "Lesson 5", path: "#ceacht-5", icon: "chat", parentId: null, order: 5, active: true },
    { id: "un-6", labelGa: "Ceacht 6", labelEn: "Lesson 6", path: "#ceacht-6", icon: "chat", parentId: null, order: 6, active: true },
    { id: "un-7", labelGa: "Aonad Iomlán", labelEn: "Full Unit", path: "#aonad-iomlan", icon: "competitions", parentId: null, order: 7, active: true },
    { id: "un-8", labelGa: "Treoir don Mhúinteoir", labelEn: "Teacher's Guide", path: "#treoir-muinteora", icon: "book", parentId: null, order: 8, active: true },
    { id: "un-9", labelGa: "Nodbhileoga don Mhúinteoir", labelEn: "Teacher's Answer Sheets", path: "#nodbhileoga", icon: "document", parentId: null, order: 9, active: true },
    { id: "un-10", labelGa: "Pacáiste Tacaíochta", labelEn: "Support Package", path: "#pacaiste-tacaiochta", icon: "grid", parentId: null, order: 10, active: true },
    { id: "un-11", labelGa: "Naisc Eile", labelEn: "Other Links", path: "/#naisc-sheachtracha", icon: "star", parentId: null, order: 11, active: false },
  ],
};

export const iconOptions = [
  "home",
  "news",
  "resources",
  "competitions",
  "tobghaeltacht",
  "padlet",
  "book",
  "grid",
  "chat",
  "document",
  "star",
  "teacher",
  "family",
] as const;
