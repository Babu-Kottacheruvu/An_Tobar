import type { ReactElement } from "react";
import type { Bilingual } from "../types";
import { BookIcon, FamilyIcon, GridIcon, TeacherIcon, ExternalLinkIcon, type IconProps } from "../../components/icons";

export interface SecondaryButton {
  id: string;
  label: Bilingual;
  path: string;
  icon: (props: IconProps) => ReactElement;
}

/**
 * The smaller quick-link buttons under the main year-group grid. Fully
 * data-driven so an administrator can rename, add or remove an entry
 * without touching component code.
 */
export const tobshaolSecondaryButtons: SecondaryButton[] = [
  {
    id: "support-packages",
    label: { ga: "Pacáistí Tacaíochta", en: "Support Packages" },
    path: "#tobshaol-cuardach",
    icon: GridIcon,
  },
  {
    id: "whole-school-packages",
    label: { ga: "Pacáistí Uile Scoile", en: "Whole-School Packages" },
    path: "/tobghaeltacht",
    icon: BookIcon,
  },
  {
    id: "parents-families",
    label: { ga: "Tuismitheoirí / Teaghlaigh", en: "Parents / Families" },
    path: "/acmhainni?audience=parents",
    icon: FamilyIcon,
  },
  {
    id: "teachers",
    label: { ga: "Múinteoirí", en: "Teachers" },
    path: "/iar-bhunscoil/muinteoiri",
    icon: TeacherIcon,
  },
  {
    id: "other-links",
    label: { ga: "Naisc Eile", en: "Other Links" },
    path: "/#naisc-sheachtracha",
    icon: ExternalLinkIcon,
  },
];
