import type { ReactElement } from "react";
import {
  BookIcon,
  ChatIcon,
  DocumentIcon,
  FamilyIcon,
  GridIcon,
  HomeIcon,
  MapPinIcon,
  NewsIcon,
  SparkleIcon,
  TeacherIcon,
  TrophyIcon,
  type IconProps,
} from "../../icons";

export const navIconRegistry: Record<string, (props: IconProps) => ReactElement> = {
  home: HomeIcon,
  news: NewsIcon,
  resources: BookIcon,
  competitions: TrophyIcon,
  tobghaeltacht: MapPinIcon,
  padlet: GridIcon,
  book: BookIcon,
  grid: GridIcon,
  chat: ChatIcon,
  document: DocumentIcon,
  star: SparkleIcon,
  teacher: TeacherIcon,
  family: FamilyIcon,
};
