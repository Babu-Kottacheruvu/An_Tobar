import type { Bilingual } from "../types";
import { subjectOptions, resourceTypeOptions, levelOptions, audienceOptions } from "../resources";
import { classLevels } from "../bunscoil/classLevels";
import { themes } from "../bunscoil/themes";
import { bunscoilResourceTypes } from "../bunscoil/resourceTypes";
import { tobshaolYearGroups } from "../tobshaol/yearGroups";
import { tobshaolTopics } from "../tobshaol/topics";
import { tobshaolResourceTypes } from "../tobshaol/resourceTypes";
import { newsFilterTags } from "../newsFilters";
import { competitionLevelOptions, entryTypeOptions } from "../competitionFilters";

export interface FilterRegistryEntry {
  id: string;
  name: Bilingual;
  scope: Bilingual;
  optionCount: number;
}

/**
 * A live inventory of every filter/category list used across the site,
 * built from the real config arrays so the counts never go stale.
 */
export const filterRegistry: FilterRegistryEntry[] = [
  { id: "main-level", name: { en: "Level", ga: "Leibhéal" }, scope: { en: "Main site", ga: "Príomhshuíomh" }, optionCount: levelOptions.length },
  { id: "main-subject", name: { en: "Topic", ga: "Ábhar" }, scope: { en: "Main site", ga: "Príomhshuíomh" }, optionCount: subjectOptions.length },
  { id: "main-type", name: { en: "Resource type", ga: "Cineál Acmhainne" }, scope: { en: "Main site", ga: "Príomhshuíomh" }, optionCount: resourceTypeOptions.length },
  { id: "main-audience", name: { en: "Audience", ga: "Lucht Féachana" }, scope: { en: "Main site", ga: "Príomhshuíomh" }, optionCount: audienceOptions.length },
  { id: "news-tags", name: { en: "News filters", ga: "Scagairí Nuachta" }, scope: { en: "Nuacht", ga: "Nuacht" }, optionCount: newsFilterTags.length },
  { id: "comp-level", name: { en: "Competition level", ga: "Leibhéal Comórtais" }, scope: { en: "Comórtais", ga: "Comórtais" }, optionCount: competitionLevelOptions.length },
  { id: "comp-entry", name: { en: "Entry type", ga: "Cineál Iontrála" }, scope: { en: "Comórtais", ga: "Comórtais" }, optionCount: entryTypeOptions.length },
  { id: "bunscoil-class-level", name: { en: "Class level", ga: "Rang" }, scope: { en: "Bunscoil", ga: "Bunscoil" }, optionCount: classLevels.length },
  { id: "bunscoil-themes", name: { en: "Themes", ga: "Téamaí" }, scope: { en: "Bunscoil", ga: "Bunscoil" }, optionCount: themes.length },
  { id: "bunscoil-type", name: { en: "Resource type", ga: "Cineál Acmhainne" }, scope: { en: "Bunscoil", ga: "Bunscoil" }, optionCount: bunscoilResourceTypes.length },
  { id: "tobshaol-year", name: { en: "Year group", ga: "Grúpa Bliana" }, scope: { en: "#Tobshaol", ga: "#Tobshaol" }, optionCount: tobshaolYearGroups.length },
  { id: "tobshaol-topics", name: { en: "Topics", ga: "Ábhair" }, scope: { en: "#Tobshaol", ga: "#Tobshaol" }, optionCount: tobshaolTopics.length },
  { id: "tobshaol-type", name: { en: "Resource type", ga: "Cineál Acmhainne" }, scope: { en: "#Tobshaol", ga: "#Tobshaol" }, optionCount: tobshaolResourceTypes.length },
];
