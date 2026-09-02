import type { Bilingual } from "./types";
import { resources, subjectOptions } from "./resources";
import { classLevels } from "./bunscoil/classLevels";
import { themes } from "./bunscoil/themes";
import { primaryResources } from "./bunscoil/resources";
import { tobshaolYearGroups } from "./tobshaol/yearGroups";
import { tobshaolTopics } from "./tobshaol/topics";
import { tobshaolResources } from "./tobshaol/resources";
import { teacherCategories } from "./tobshaol/teacherCategories";
import { teacherResources } from "./tobshaol/teacherResources";

export type GlobalUserType = "parent" | "teacher" | "learner";
export type GlobalSchoolLevel = "primary" | "post-primary";
export type GlobalResourceType =
  | "pictures"
  | "video"
  | "audio"
  | "presentation"
  | "document"
  | "worksheet"
  | "game";

export interface GlobalOption {
  id: string;
  label: Bilingual;
}

const IRISH: Bilingual = { ga: "Gaeilge", en: "Irish" };

export const globalUserTypeOptions: GlobalOption[] = [
  { id: "parent", label: { en: "Parent", ga: "Tuismitheoir" } },
  { id: "teacher", label: { en: "Teacher", ga: "Múinteoir" } },
  { id: "learner", label: { en: "Learner", ga: "Foghlaimeoir" } },
];

export const globalContentTypeOptions: GlobalOption[] = [
  { id: "resources", label: { en: "Resources", ga: "Acmhainní" } },
  { id: "training", label: { en: "Training", ga: "Oiliúint" } },
  { id: "language-classes", label: { en: "Language Classes", ga: "Ranganna Gaeilge" } },
];

export const globalSchoolLevelOptions: GlobalOption[] = [
  { id: "primary", label: { en: "Bunscoil", ga: "Bunscoil" } },
  { id: "post-primary", label: { en: "Iar-bhunscoil", ga: "Iar-bhunscoil" } },
];

export const globalResourceTypeOptions: GlobalOption[] = [
  { id: "pictures", label: { en: "Pictures", ga: "Pictiúir" } },
  { id: "video", label: { en: "Video", ga: "Físeán" } },
  { id: "audio", label: { en: "Audio", ga: "Fuaim" } },
  { id: "presentation", label: { en: "Presentation", ga: "Láithreoireacht" } },
  { id: "document", label: { en: "Document", ga: "Cáipéis" } },
  { id: "worksheet", label: { en: "Worksheet", ga: "Bileog Oibre" } },
  { id: "game", label: { en: "Game", ga: "Cluiche" } },
];

export interface GlobalResult {
  id: string;
  source: "main" | "bunscoil" | "tobshaol" | "teacher";
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  schoolLevel: GlobalSchoolLevel | null;
  yearGroup: GlobalOption | null;
  topic: GlobalOption;
  resourceType: GlobalResourceType;
  language: Bilingual;
  updatedDate: string;
  userTypes: GlobalUserType[];
  detailPath: string | null;
  /** Editorially curated prominence (from each source's own featured/popular flags) - not a usage metric. */
  featured: boolean;
}

function buildMainResults(): GlobalResult[] {
  return resources.map((resource) => {
    const subject = subjectOptions.find((option) => option.id === resource.subject);
    const typeMap: Record<string, GlobalResourceType> = {
      bileog: "worksheet",
      "plean-ceachta": "document",
      fisean: "video",
      cluiche: "game",
      postaer: "pictures",
    };
    const userTypes: GlobalUserType[] = [];
    if (resource.audience.includes("students")) userTypes.push("learner");
    if (resource.audience.includes("teachers") || resource.audience.includes("professionals")) {
      userTypes.push("teacher");
    }
    if (resource.audience.includes("parents")) userTypes.push("parent");

    return {
      id: `main:${resource.id}`,
      source: "main",
      titleGa: resource.title.ga,
      titleEn: resource.title.en,
      description: resource.description,
      schoolLevel: resource.level,
      yearGroup: null,
      topic: {
        id: `main-subject:${resource.subject}`,
        label: subject?.label ?? { ga: resource.subject, en: resource.subject },
      },
      resourceType: typeMap[resource.type] ?? "document",
      language: IRISH,
      updatedDate: resource.updated,
      userTypes: userTypes.length ? userTypes : ["learner", "teacher"],
      detailPath: `/acmhainni/${resource.slug}`,
      featured: Boolean(resource.featured),
    };
  });
}

function buildBunscoilResults(): GlobalResult[] {
  const typeMap: Record<string, GlobalResourceType> = {
    pictures: "pictures",
    videos: "video",
    sound: "audio",
    powerpoint: "presentation",
    worksheets: "worksheet",
    word: "document",
    pdf: "document",
  };

  return primaryResources.map((resource) => {
    const theme = themes.find((option) => option.id === resource.theme);
    const classLevel = classLevels.find((option) => option.id === resource.classLevel);

    return {
      id: `bunscoil:${resource.id}`,
      source: "bunscoil",
      titleGa: resource.titleGa,
      titleEn: resource.titleEn,
      description: resource.description,
      schoolLevel: "primary",
      yearGroup: classLevel
        ? { id: `bunscoil-year:${classLevel.id}`, label: classLevel.label }
        : null,
      topic: theme
        ? { id: `bunscoil-topic:${theme.id}`, label: theme.label }
        : { id: "bunscoil-topic:unknown", label: { ga: "Eile", en: "Other" } },
      resourceType: typeMap[resource.resourceType] ?? "document",
      language: resource.language,
      updatedDate: resource.updatedDate,
      userTypes: ["teacher", "learner"],
      detailPath: `/bunscoil/acmhainni/${resource.slug}`,
      featured: Boolean(resource.isNew),
    };
  });
}

function buildTobshaolResults(): GlobalResult[] {
  const typeMap: Record<string, GlobalResourceType> = {
    ppt: "presentation",
    word: "document",
    posters: "pictures",
    worksheets: "worksheet",
  };

  return tobshaolResources.map((resource) => {
    const topic = tobshaolTopics.find((option) => option.id === resource.topic);
    const yearGroup = tobshaolYearGroups.find((option) => option.id === resource.yearGroup);

    return {
      id: `tobshaol:${resource.id}`,
      source: "tobshaol",
      titleGa: resource.titleGa,
      titleEn: resource.titleEn,
      description: resource.description,
      schoolLevel: "post-primary",
      yearGroup: yearGroup ? { id: `tobshaol-year:${yearGroup.id}`, label: yearGroup.label } : null,
      topic: topic
        ? { id: `tobshaol-topic:${topic.id}`, label: topic.label }
        : { id: "tobshaol-topic:unknown", label: { ga: "Eile", en: "Other" } },
      resourceType: typeMap[resource.resourceType] ?? "document",
      language: IRISH,
      updatedDate: resource.updatedDate,
      userTypes: ["teacher", "learner"],
      detailPath: `/iar-bhunscoil/acmhainni/${resource.slug}`,
      featured: Boolean(resource.featured || resource.popular),
    };
  });
}

function buildTeacherResults(): GlobalResult[] {
  const typeMap: Record<string, GlobalResourceType> = {
    ppt: "presentation",
    word: "document",
    pdf: "document",
    video: "video",
    audio: "audio",
  };

  return teacherResources.map((resource) => {
    const category = teacherCategories.find((option) => option.id === resource.category);

    return {
      id: `teacher:${resource.id}`,
      source: "teacher",
      titleGa: resource.titleGa,
      titleEn: resource.titleEn,
      description: resource.description,
      schoolLevel: "post-primary",
      yearGroup: null,
      topic: category
        ? { id: `teacher-cat:${category.id}`, label: { ga: category.titleGa, en: category.titleEn } }
        : { id: "teacher-cat:unknown", label: { ga: "Eile", en: "Other" } },
      resourceType: typeMap[resource.resourceType] ?? "document",
      language: IRISH,
      updatedDate: resource.updatedDate,
      userTypes: ["teacher"],
      detailPath: "/iar-bhunscoil/muinteoiri",
      featured: Boolean(resource.featured),
    };
  });
}

export const globalYearGroupOptions: GlobalOption[] = [
  ...classLevels.map((level) => ({ id: `bunscoil-year:${level.id}`, label: level.label })),
  ...tobshaolYearGroups.map((year) => ({ id: `tobshaol-year:${year.id}`, label: year.label })),
];

export const globalTopicOptions: GlobalOption[] = [
  ...subjectOptions.map((option) => ({ id: `main-subject:${option.id}`, label: option.label })),
  ...themes.map((theme) => ({ id: `bunscoil-topic:${theme.id}`, label: theme.label })),
  ...tobshaolTopics.map((topic) => ({ id: `tobshaol-topic:${topic.id}`, label: topic.label })),
  ...teacherCategories
    .filter((category) => !category.external)
    .map((category) => ({
      id: `teacher-cat:${category.id}`,
      label: { ga: category.titleGa, en: category.titleEn },
    })),
];

export const globalSearchResults: GlobalResult[] = [
  ...buildMainResults(),
  ...buildBunscoilResults(),
  ...buildTobshaolResults(),
  ...buildTeacherResults(),
];
