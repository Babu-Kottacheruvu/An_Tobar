import type { ReactElement } from "react";
import type { Bilingual } from "../types";
import {
  DocumentIcon,
  PictureIcon,
  PlayIcon,
  PresentationIcon,
  SoundIcon,
  type IconProps,
} from "../../components/icons";

export interface ResourceTypeOption {
  id: string;
  label: Bilingual;
  icon: (props: IconProps) => ReactElement;
}

export const bunscoilResourceTypes: ResourceTypeOption[] = [
  { id: "pictures", label: { en: "Pictures", ga: "Pictiúir" }, icon: PictureIcon },
  { id: "videos", label: { en: "Videos", ga: "Físeáin" }, icon: PlayIcon },
  { id: "sound", label: { en: "Sound files", ga: "Comhaid Fuaime" }, icon: SoundIcon },
  { id: "powerpoint", label: { en: "PowerPoint", ga: "PowerPoint" }, icon: PresentationIcon },
  { id: "worksheets", label: { en: "Worksheets", ga: "Bileoga Oibre" }, icon: DocumentIcon },
  { id: "word", label: { en: "Word Document", ga: "Cáipéis Word" }, icon: DocumentIcon },
  { id: "pdf", label: { en: "PDF", ga: "PDF" }, icon: DocumentIcon },
];
