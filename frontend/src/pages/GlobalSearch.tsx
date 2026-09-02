import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import {
  globalContentTypeOptions,
  globalResourceTypeOptions,
  globalSchoolLevelOptions,
  globalSearchResults,
  globalTopicOptions,
  globalUserTypeOptions,
  globalYearGroupOptions,
} from "../data/globalSearch";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { FilterSidebar, type FilterGroup } from "../components/common/FilterSidebar";
import { GlobalSearchBar } from "../components/search/GlobalSearchBar";
import { GlobalResultCard } from "../components/search/GlobalResultCard";
import { Pagination } from "../components/common/Pagination";
import { GridIcon, ListIcon } from "../components/icons";

type SortOption = "relevant" | "newest" | "az";
type ResultsPerPage = 10 | 20 | 100 | "all";

function useMultiToggle() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, setSelected, toggle };
}

const RELATED_SEARCH_IDS = [
  "main-subject:gramadach",
  "bunscoil-topic:an-aimsir",
  "tobshaol-topic:is-gael-me",
  "teacher-cat:professional-learning",
  "main-subject:filiocht",
  "bunscoil-topic:sa-bhaile",
];

export function GlobalSearch() {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [resultsPerPage, setResultsPerPage] = useState<ResultsPerPage>(20);
  const [searchSaved, setSearchSaved] = useState(false);

  const userType = useMultiToggle();
  const contentType = useMultiToggle();
  const schoolLevel = useMultiToggle();
  const yearGroup = useMultiToggle();
  const topic = useMultiToggle();
  const resourceType = useMultiToggle();

  const activeCount =
    userType.selected.length +
    contentType.selected.length +
    schoolLevel.selected.length +
    yearGroup.selected.length +
    topic.selected.length +
    resourceType.selected.length;

  const clearAll = () => {
    userType.setSelected([]);
    contentType.setSelected([]);
    schoolLevel.setSelected([]);
    yearGroup.setSelected([]);
    topic.setSelected([]);
    resourceType.setSelected([]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return globalSearchResults.filter((result) => {
      if (userType.selected.length && !result.userTypes.some((type) => userType.selected.includes(type))) {
        return false;
      }
      if (contentType.selected.length && !contentType.selected.includes("resources")) return false;
      if (schoolLevel.selected.length && (!result.schoolLevel || !schoolLevel.selected.includes(result.schoolLevel))) {
        return false;
      }
      if (yearGroup.selected.length && (!result.yearGroup || !yearGroup.selected.includes(result.yearGroup.id))) {
        return false;
      }
      if (topic.selected.length && !topic.selected.includes(result.topic.id)) return false;
      if (resourceType.selected.length && !resourceType.selected.includes(result.resourceType)) return false;
      if (trimmed) {
        const haystack = `${result.titleGa} ${result.titleEn} ${result.description[lang]}`.toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }
      return true;
    });
  }, [
    query,
    lang,
    userType.selected,
    contentType.selected,
    schoolLevel.selected,
    yearGroup.selected,
    topic.selected,
    resourceType.selected,
  ]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "newest") {
      list.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime());
    } else if (sort === "az") {
      list.sort((a, b) => (lang === "ga" ? a.titleGa.localeCompare(b.titleGa) : a.titleEn.localeCompare(b.titleEn)));
    }
    return list;
  }, [filtered, sort, lang]);

  const totalPages = resultsPerPage === "all" ? 1 : Math.max(1, Math.ceil(sorted.length / resultsPerPage));
  const paged =
    resultsPerPage === "all" ? sorted : sorted.slice((page - 1) * resultsPerPage, page * resultsPerPage);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 2) return [];
    const seen = new Set<string>();
    const matches: { id: string; label: string }[] = [];
    for (const result of globalSearchResults) {
      for (const label of [result.titleGa, result.titleEn]) {
        if (label.toLowerCase().includes(trimmed) && !seen.has(label)) {
          seen.add(label);
          matches.push({ id: result.id + label, label });
        }
      }
      if (matches.length >= 6) break;
    }
    return matches.slice(0, 6);
  }, [query]);

  const relatedSearches = RELATED_SEARCH_IDS.map((id) => globalTopicOptions.find((option) => option.id === id)).filter(
    (option): option is NonNullable<typeof option> => Boolean(option),
  );

  const handleSaveSearch = () => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("antobar-saved-searches") ?? "[]");
      saved.push({ query, filters: { userType: userType.selected, schoolLevel: schoolLevel.selected }, savedAt: Date.now() });
      window.localStorage.setItem("antobar-saved-searches", JSON.stringify(saved));
      setSearchSaved(true);
      window.setTimeout(() => setSearchSaved(false), 3000);
    } catch {
      // localStorage unavailable - fail silently, this is a non-critical convenience feature
    }
  };

  const groups: FilterGroup[] = [
    {
      id: "userType",
      label: t("search.userType"),
      options: globalUserTypeOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: userType.selected,
      onToggle: (id) => {
        userType.toggle(id);
        setPage(1);
      },
    },
    {
      id: "contentType",
      label: t("search.contentType"),
      options: globalContentTypeOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: contentType.selected,
      onToggle: (id) => {
        contentType.toggle(id);
        setPage(1);
      },
    },
    {
      id: "schoolLevel",
      label: t("globalSearch.filters.schoolLevel"),
      options: globalSchoolLevelOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: schoolLevel.selected,
      onToggle: (id) => {
        schoolLevel.toggle(id);
        setPage(1);
      },
    },
    {
      id: "yearGroup",
      label: t("search.yearGroup"),
      options: globalYearGroupOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: yearGroup.selected,
      onToggle: (id) => {
        yearGroup.toggle(id);
        setPage(1);
      },
    },
    {
      id: "topic",
      label: t("common.subject"),
      options: globalTopicOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: topic.selected,
      onToggle: (id) => {
        topic.toggle(id);
        setPage(1);
      },
    },
    {
      id: "resourceType",
      label: t("common.type"),
      options: globalResourceTypeOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: resourceType.selected,
      onToggle: (id) => {
        resourceType.toggle(id);
        setPage(1);
      },
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: t("common.search") }]} />

      <div className="bg-brand-green-50 py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">
            {t("globalSearch.heading")}
          </h1>
          <p className="mt-2 text-base text-brand-navy-800/80">{t("globalSearch.intro")}</p>
          <div className="mt-6">
            <GlobalSearchBar
              value={query}
              onChange={(value) => {
                setQuery(value);
                setPage(1);
              }}
              suggestions={suggestions}
              onSelectSuggestion={(label) => {
                setQuery(label);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <div>
            <FilterSidebar groups={groups} onClear={clearAll} activeCount={activeCount} />
            <button
              type="button"
              onClick={handleSaveSearch}
              className="mt-5 w-full rounded-md border border-brand-navy-800/20 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
            >
              {t("globalSearch.saveSearch")}
            </button>
            {searchSaved && (
              <p role="status" className="mt-2 text-center text-sm font-semibold text-brand-green-700">
                {t("globalSearch.searchSaved")}
              </p>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-brand-navy-900" role="status">
                {sorted.length} {t("common.results")}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <label htmlFor="global-sort" className="sr-only">
                  {t("bunscoil.results.sortLabel")}
                </label>
                <select
                  id="global-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2 text-sm font-semibold text-brand-navy-900 focus:border-brand-green-700"
                >
                  <option value="relevant">{t("bunscoil.results.sortRelevant")}</option>
                  <option value="newest">{t("bunscoil.results.sortNewest")}</option>
                  <option value="az">{t("bunscoil.results.sortAz")}</option>
                </select>

                <label htmlFor="global-per-page" className="sr-only">
                  {t("search.resultsPerPage")}
                </label>
                <select
                  id="global-per-page"
                  value={resultsPerPage}
                  onChange={(event) => {
                    setResultsPerPage(event.target.value === "all" ? "all" : (Number(event.target.value) as ResultsPerPage));
                    setPage(1);
                  }}
                  className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2 text-sm font-semibold text-brand-navy-900 focus:border-brand-green-700"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                  <option value="all">{t("search.resultsAll")}</option>
                </select>

                <div className="flex items-center gap-1 rounded-md border border-brand-navy-800/20 p-0.5">
                  <button
                    type="button"
                    onClick={() => setLayout("list")}
                    aria-pressed={layout === "list"}
                    aria-label={t("globalSearch.displayList")}
                    className={`flex h-8 w-8 items-center justify-center rounded ${layout === "list" ? "bg-brand-green-700 text-white" : "text-brand-navy-800/60"}`}
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("grid")}
                    aria-pressed={layout === "grid"}
                    aria-label={t("globalSearch.displayGrid")}
                    className={`flex h-8 w-8 items-center justify-center rounded ${layout === "grid" ? "bg-brand-green-700 text-white" : "text-brand-navy-800/60"}`}
                  >
                    <GridIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {paged.length === 0 ? (
              <p className="mt-8 rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
                {t("globalSearch.emptyState")}
              </p>
            ) : (
              <div
                className={
                  layout === "grid"
                    ? "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "mt-6 flex flex-col gap-4"
                }
              >
                {paged.map((result) => (
                  <GlobalResultCard key={result.id} result={result} layout={layout} />
                ))}
              </div>
            )}

            {resultsPerPage !== "all" && (
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            )}

            <div className="mt-12 rounded-xl bg-brand-navy-50 p-6">
              <h2 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/70">
                {t("globalSearch.relatedSearches")}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {relatedSearches.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(option.label[lang]);
                        setPage(1);
                      }}
                      className="rounded-full border border-brand-navy-800/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-navy-900 hover:border-brand-green-700 hover:text-brand-green-800"
                    >
                      {option.label[lang]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
