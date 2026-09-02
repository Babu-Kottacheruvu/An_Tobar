import type { Bilingual } from "../types";
import {
  BookIcon,
  ChatIcon,
  CheckIcon,
  DocumentIcon,
  GridIcon,
  HomeIcon,
  LayersIcon,
  SparkleIcon,
  type IconProps,
} from "../../components/icons";
import type { ReactElement } from "react";

export interface TeacherGuideSection {
  id: string;
  title: Bilingual;
  description: Bilingual;
  bullets: Bilingual[];
  icon: (props: IconProps) => ReactElement;
}

export const teacherGuideSections: TeacherGuideSection[] = [
  {
    id: "getting-started",
    title: { en: "Getting Started", ga: "Ag Tosú Amach" },
    description: {
      en: "Simple first steps for using An Tobar and the Teacher Guide in your school.",
      ga: "Céimeanna simplí tosaigh chun An Tobar agus Treoir an Mhúinteora a úsáid i do scoil.",
    },
    bullets: [
      { en: "Register your school", ga: "Cláraigh do scoil" },
      { en: "Read the introduction", ga: "Léigh an réamhrá" },
    ],
    icon: SparkleIcon,
  },
  {
    id: "curriculum-guidance",
    title: { en: "Curriculum Guidance", ga: "Treoir Churaclaim" },
    description: {
      en: "How An Tobar's resources map onto the primary language curriculum strands.",
      ga: "Conas a nascann acmhainní An Tobair le snáitheanna churaclam teanga na bunscoile.",
    },
    bullets: [
      { en: "Curriculum strands", ga: "Snáitheanna churaclaim" },
      { en: "Learning outcomes", ga: "Torthaí foghlama" },
    ],
    icon: BookIcon,
  },
  {
    id: "lesson-planning",
    title: { en: "Lesson Planning", ga: "Pleanáil Ceachta" },
    description: {
      en: "Weekly and termly planning templates built around An Tobar's themes.",
      ga: "Teimpléid phleanála seachtainiúla agus téarma bunaithe ar théamaí An Tobair.",
    },
    bullets: [
      { en: "Weekly templates", ga: "Teimpléid sheachtainiúla" },
      { en: "Sample term plans", ga: "Pleananna téarma samplacha" },
    ],
    icon: DocumentIcon,
  },
  {
    id: "classroom-resources",
    title: { en: "Classroom Resources", ga: "Acmhainní Ranga" },
    description: {
      en: "Quick links to worksheets, games and printable display materials.",
      ga: "Naisc thapa chuig bileoga oibre, cluichí agus ábhar taispeána inphriontáilte.",
    },
    bullets: [
      { en: "Worksheets", ga: "Bileoga oibre" },
      { en: "Classroom posters", ga: "Postaeir ranga" },
    ],
    icon: GridIcon,
  },
  {
    id: "assessment",
    title: { en: "Assessment", ga: "Measúnú" },
    description: {
      en: "Formative and summative assessment tools for tracking progress in Irish.",
      ga: "Uirlisí measúnaithe foirmitheacha agus suimitheacha chun dul chun cinn sa Ghaeilge a rianú.",
    },
    bullets: [
      { en: "Assessment tools", ga: "Uirlisí measúnaithe" },
      { en: "Simple rubrics", ga: "Rúibricí simplí" },
    ],
    icon: CheckIcon,
  },
  {
    id: "differentiation",
    title: { en: "Differentiation", ga: "Difreáil" },
    description: {
      en: "Practical supports for mixed-ability classes and additional learning needs.",
      ga: "Tacaíochtaí praiticiúla do ranganna ilchumais agus do riachtanais bhreise foghlama.",
    },
    bullets: [
      { en: "Additional support", ga: "Tacaíocht bhreise" },
      { en: "Extension challenges", ga: "Dúshláin bhreise" },
    ],
    icon: LayersIcon,
  },
  {
    id: "gaeilge-support",
    title: { en: "Gaeilge Support", ga: "Tacaíocht Ghaeilge" },
    description: {
      en: "Confidence-building supports for teachers who are less confident in Irish.",
      ga: "Tacaíochtaí muiníne do mhúinteoirí nach bhfuil chomh muiníneach sin as Gaeilge.",
    },
    bullets: [
      { en: "Classroom phrases", ga: "Frásaí ranga" },
      { en: "Pronunciation help", ga: "Cabhair fuaimnithe" },
    ],
    icon: ChatIcon,
  },
  {
    id: "school-wide-resources",
    title: { en: "School-wide Resources", ga: "Acmhainní Scoile ar Fad" },
    description: {
      en: "Whole-school planning, displays and events to build an Irish-friendly culture.",
      ga: "Pleanáil scoile iomlán, taispeántais agus imeachtaí chun cultúr báúil don Ghaeilge a fhorbairt.",
    },
    bullets: [
      { en: "Whole-school planning", ga: "Pleanáil scoile iomlán" },
      { en: "School events", ga: "Imeachtaí scoile" },
    ],
    icon: HomeIcon,
  },
];
