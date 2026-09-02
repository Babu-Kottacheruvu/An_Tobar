export interface FilterOptionRow {
  id: string;
  name: string;
  labelGa: string;
  labelEn: string;
  active: boolean;
  order: number;
}

export interface FilterGroupConfig {
  id: string;
  nameGa: string;
  nameEn: string;
  options: FilterOptionRow[];
}

function opts(rows: [string, string, string][]): FilterOptionRow[] {
  return rows.map(([name, labelGa, labelEn], index) => ({
    id: `${name}`,
    name,
    labelGa,
    labelEn,
    active: true,
    order: index + 1,
  }));
}

/**
 * Seed data for the Filter & Taxonomy Manager, mirroring the real filter
 * taxonomies already used across the live site (see data/resources.ts,
 * data/bunscoil/themes.ts, data/globalSearch.ts). Editing here is CMS
 * working-draft state only - this prototype has no backend to write
 * changes back into those live config files.
 */
export const initialFilterGroups: FilterGroupConfig[] = [
  {
    id: "user-type",
    nameGa: "Cineál Úsáideora",
    nameEn: "User Type",
    options: opts([
      ["parent", "Tuismitheoir", "Parent"],
      ["teacher", "Múinteoir", "Teacher"],
      ["learner", "Foghlaimeoir", "Learner"],
    ]),
  },
  {
    id: "content-type",
    nameGa: "Cineál Ábhair",
    nameEn: "Content Type",
    options: opts([
      ["resources", "Acmhainní", "Resources"],
      ["training", "Oiliúint", "Training"],
      ["language-classes", "Ranganna Gaeilge", "Language Classes"],
    ]),
  },
  {
    id: "school-level",
    nameGa: "Leibhéal Scoile",
    nameEn: "School Level",
    options: opts([
      ["primary", "Bunscoil", "Primary"],
      ["post-primary", "Iar-bhunscoil", "Secondary"],
    ]),
  },
  {
    id: "year-group",
    nameGa: "Grúpa Bliana",
    nameEn: "Year Group",
    options: opts([
      ["naionain-shoisearacha", "Naíonáin Shóisearacha", "Junior Infants"],
      ["naionain-shinsearacha", "Naíonáin Shinsearacha", "Senior Infants"],
      ["rang-1", "Rang a hAon", "1st Class"],
      ["rang-2", "Rang a Dó", "2nd Class"],
      ["rang-3", "Rang a Trí", "3rd Class"],
      ["rang-4", "Rang a Ceathair", "4th Class"],
      ["rang-5", "Rang a Cúig", "5th Class"],
      ["rang-6", "Rang a Sé", "6th Class"],
      ["bliain-1", "Bliain 1", "1st Year"],
      ["bliain-2-3", "Bliain 2/3", "2nd/3rd Year"],
      ["idirbhliain", "Idirbhliain", "Transition Year"],
      ["bliain-5-6", "Bliain 5/6", "5th/6th Year"],
    ]),
  },
  {
    id: "theme",
    nameGa: "Téama",
    nameEn: "Theme",
    options: opts([
      ["me-fein", "Mé Féin", "Myself"],
      ["ar-scoil", "Ar Scoil", "At School"],
      ["caitheamh-aimsire", "Caitheamh Aimsire", "Pastimes"],
      ["an-aimsir", "An Aimsir", "Weather"],
      ["bia", "Bia", "Food"],
      ["eadai", "Éadaí", "Clothes"],
      ["ocaidi-speisialta", "Ócáidí Speisialta", "Special Occasions"],
      ["an-teilifis", "An Teilifís", "Television"],
      ["ag-siopadoireacht", "Ag Siopadóireacht", "Shopping"],
      ["sa-bhaile", "Sa Bhaile", "At Home"],
    ]),
  },
  {
    id: "topic",
    nameGa: "Ábhar",
    nameEn: "Topic",
    options: opts([
      ["gramadach", "Gramadach", "Grammar"],
      ["leitheoireacht", "Léitheoireacht", "Reading"],
      ["cluastuiscint", "Cluastuiscint", "Listening comprehension"],
      ["scribhneoireacht", "Scríbhneoireacht", "Writing"],
      ["comhra", "Comhrá", "Oral Irish"],
      ["filiocht", "Filíocht", "Poetry"],
      ["amhrain", "Amhráin", "Songs"],
      ["cultur", "Cultúr", "Culture"],
    ]),
  },
  {
    id: "resource-type",
    nameGa: "Cineál Acmhainne",
    nameEn: "Resource Type",
    options: opts([
      ["pictures", "Pictiúir", "Pictures"],
      ["video", "Físeán", "Video"],
      ["audio", "Fuaim", "Audio"],
      ["presentation", "Láithreoireacht", "Presentation"],
      ["document", "Cáipéis", "Document"],
      ["worksheet", "Bileog Oibre", "Worksheet"],
      ["game", "Cluiche", "Game"],
    ]),
  },
  {
    id: "assessment",
    nameGa: "Measúnú",
    nameEn: "Assessment",
    options: opts([["assessment", "Measúnú", "Assessment"]]),
  },
  {
    id: "planning",
    nameGa: "Pleanáil",
    nameEn: "Planning",
    options: opts([["planning", "Pleanáil", "Planning"]]),
  },
];
