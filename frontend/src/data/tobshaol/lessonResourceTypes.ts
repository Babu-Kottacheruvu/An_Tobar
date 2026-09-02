import type { ReactElement } from "react";
import type { Bilingual } from "../types";
import { DocumentIcon, PlayIcon, PresentationIcon, SoundIcon, type IconProps } from "../../components/icons";

export interface LessonResourceTypeOption {
  id: string;
  label: Bilingual;
  icon: (props: IconProps) => ReactElement;
}

/** Resource types used on unit/lesson pages - a richer, more media-heavy set than the year-level search filters. */
export const lessonResourceTypes: LessonResourceTypeOption[] = [
  { id: "ppt", label: { ga: "PowerPoint", en: "PowerPoint" }, icon: PresentationIcon },
  { id: "word", label: { ga: "Cáipéis Word", en: "Word document" }, icon: DocumentIcon },
  { id: "pdf", label: { ga: "PDF", en: "PDF" }, icon: DocumentIcon },
  { id: "video", label: { ga: "Físeán", en: "Video" }, icon: PlayIcon },
  { id: "audio", label: { ga: "Comhad Fuaime", en: "Audio file" }, icon: SoundIcon },
];
