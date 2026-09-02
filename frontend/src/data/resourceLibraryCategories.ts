import type { Bilingual } from "./types";
import type { GlobalSchoolLevel, GlobalUserType } from "./globalSearch";

export type CategoryDimension = "schoolLevel" | "userType" | "contentType";

export interface ResourceLibraryCategory {
  id: string;
  label: Bilingual;
  dimension: CategoryDimension;
  value: GlobalSchoolLevel | GlobalUserType | "training" | "language-classes";
}

/**
 * The category navigation bar on the resource library. Each category maps
 * onto one dimension of the underlying aggregated data - configurable here
 * without touching the page component.
 */
export const resourceLibraryCategories: ResourceLibraryCategory[] = [
  { id: "primary", label: { en: "Primary", ga: "Bunscoil" }, dimension: "schoolLevel", value: "primary" },
  { id: "secondary", label: { en: "Secondary", ga: "Iar-bhunscoil" }, dimension: "schoolLevel", value: "post-primary" },
  { id: "teacher", label: { en: "Teacher", ga: "Múinteoir" }, dimension: "userType", value: "teacher" },
  { id: "parent", label: { en: "Parent", ga: "Tuismitheoir" }, dimension: "userType", value: "parent" },
  { id: "learner", label: { en: "Learner", ga: "Foghlaimeoir" }, dimension: "userType", value: "learner" },
  { id: "training", label: { en: "Training", ga: "Oiliúint" }, dimension: "contentType", value: "training" },
  {
    id: "language-classes",
    label: { en: "Language Classes", ga: "Ranganna Gaeilge" },
    dimension: "contentType",
    value: "language-classes",
  },
];
