import type { GlobalResult } from "./globalSearch";
import type { ResourceLibraryCategory } from "./resourceLibraryCategories";

/** True when a result belongs to the given top-level library category. */
export function matchesCategory(result: GlobalResult, category: ResourceLibraryCategory): boolean {
  if (category.dimension === "schoolLevel") {
    return result.schoolLevel === category.value;
  }
  if (category.dimension === "userType") {
    return result.userTypes.includes(category.value as GlobalResult["userTypes"][number]);
  }
  // contentType: all aggregated data is real "resources" content - Training and
  // Language Classes have no backing data yet, so they honestly match nothing.
  return false;
}
