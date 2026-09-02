import { DocumentIcon, PictureIcon, PlayIcon, PresentationIcon, SoundIcon, type IconProps } from "../../icons";
import type { MediaAssetType } from "../../../data/admin/mediaLibrary";
import type { ReactElement } from "react";

export const mediaTypeStyles: Record<MediaAssetType, { icon: (props: IconProps) => ReactElement; tile: string }> = {
  image: { icon: PictureIcon, tile: "bg-brand-gold-50 text-brand-gold-600" },
  pdf: { icon: DocumentIcon, tile: "bg-red-50 text-red-700" },
  powerpoint: { icon: PresentationIcon, tile: "bg-orange-50 text-orange-600" },
  word: { icon: DocumentIcon, tile: "bg-blue-50 text-blue-700" },
  video: { icon: PlayIcon, tile: "bg-brand-navy-50 text-brand-navy-800" },
  audio: { icon: SoundIcon, tile: "bg-brand-green-50 text-brand-green-800" },
};
