import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  YoutubeIcon,
  HomeIcon,
  NewsIcon,
  BookIcon,
  TrophyIcon,
  MapPinIcon,
  GridIcon,
} from "./icons";

export const socialIcons = {
  facebook: FacebookIcon,
  twitter: XIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
} as const;

export const navIcons = {
  home: HomeIcon,
  news: NewsIcon,
  resources: BookIcon,
  competitions: TrophyIcon,
  tobghaeltacht: MapPinIcon,
  padlet: GridIcon,
} as const;
