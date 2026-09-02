import type { ReactElement } from "react";
import type { Bilingual } from "../types";
import {
  BookIcon,
  ChatIcon,
  DocumentIcon,
  ExternalLinkIcon,
  GridIcon,
  TeacherIcon,
  type IconProps,
} from "../../components/icons";

export interface TeacherCategory {
  id: string;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  icon: (props: IconProps) => ReactElement;
  colorClass: string;
  /** Categories without a `#external` id have real resources filterable in the dashboard below. */
  external?: boolean;
}

export const teacherCategories: TeacherCategory[] = [
  {
    id: "classroom-resources",
    titleGa: "Acmhainní don Seomra Ranga",
    titleEn: "Classroom Resources",
    description: {
      ga: "Bileoga, láithreoireachtaí agus ábhar réidh don rang.",
      en: "Worksheets, presentations and ready-to-use classroom material.",
    },
    icon: GridIcon,
    colorClass: "bg-teen-pink-600",
  },
  {
    id: "guidance-support",
    titleGa: "Treoir agus Tacaíocht",
    titleEn: "Guidance & Support",
    description: {
      ga: "Treoirlínte agus tacaíochtaí praiticiúla do mhúinteoirí Gaeilge.",
      en: "Guidelines and practical supports for teachers of Irish.",
    },
    icon: ChatIcon,
    colorClass: "bg-teen-violet-600",
  },
  {
    id: "whole-school-packages",
    titleGa: "Pacáistí Uile Scoile",
    titleEn: "Whole-School Packages",
    description: {
      ga: "Acmhainní pleanála do thionscnaimh scoile iomlán.",
      en: "Planning resources for whole-school initiatives.",
    },
    icon: BookIcon,
    colorClass: "bg-teen-cyan-600",
  },
  {
    id: "professional-learning",
    titleGa: "FGL",
    titleEn: "Professional Learning",
    description: {
      ga: "Deiseanna forbartha gairmiúla leanúnaí do mhúinteoirí.",
      en: "Continuing professional development opportunities for teachers.",
    },
    icon: TeacherIcon,
    colorClass: "bg-teen-pink-600",
  },
  {
    id: "irish-courses",
    titleGa: "Cúrsaí Gaeilge",
    titleEn: "Irish Courses",
    description: {
      ga: "Cúrsaí chun do chuid Gaeilge féin a fhorbairt.",
      en: "Courses to develop your own Irish.",
    },
    icon: DocumentIcon,
    colorClass: "bg-teen-violet-600",
  },
  {
    id: "other-links",
    titleGa: "Naisc Eile",
    titleEn: "Other Links",
    description: {
      ga: "Naisc chuig eagraíochtaí agus acmhainní úsáideacha eile.",
      en: "Links to other useful organisations and resources.",
    },
    icon: ExternalLinkIcon,
    colorClass: "bg-teen-cyan-600",
    external: true,
  },
];
