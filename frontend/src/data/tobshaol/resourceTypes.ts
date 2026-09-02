import type { ReactElement } from "react";
import type { Bilingual } from "../types";
import { DocumentIcon, PictureIcon, PresentationIcon, type IconProps } from "../../components/icons";

export interface TobshaolResourceTypeOption {
  id: string;
  label: Bilingual;
  icon: (props: IconProps) => ReactElement;
}

export const tobshaolResourceTypes: TobshaolResourceTypeOption[] = [
  { id: "ppt", label: { ga: "PPT", en: "PPT" }, icon: PresentationIcon },
  { id: "word", label: { ga: "Cáipéis Word", en: "Word Document" }, icon: DocumentIcon },
  { id: "posters", label: { ga: "Póstaeir", en: "Posters" }, icon: PictureIcon },
  { id: "worksheets", label: { ga: "Bileoga Oibre", en: "Worksheets" }, icon: DocumentIcon },
];
