import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import {
  levelOptions,
  resourceTypeOptions,
  resources,
  subjectOptions,
} from "../../data/resources";
import {
  contentTypeOptions,
  resultsPerPageOptions,
  userTypeOptions,
  yearGroupOptions,
} from "../../data/searchOptions";
import { ResourceCard } from "../cards/ResourceCard";
import { FilterDrawer } from "../common/FilterDrawer";
import { SearchIcon, FilterIcon } from "../icons";

type ResultsPerPage = "all" | (typeof resultsPerPageOptions)[number];

function useMultiToggle(initial: string[] = []) {
  const [selected, setSelected] = useState<string[]>(initial);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, toggle, clear: () => setSelected([]) };
}

function FilterChip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
        checked
          ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
          : "border-brand-navy-800/20 text-brand-navy-900 hover:bg-brand-navy-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-brand-green-700"
      />
      {label}
    </label>
  );
}

export function SearchSection() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const userType = useMultiToggle();
  const contentType = useMultiToggle();
  const schoolLevel = useMultiToggle();
  const [yearGroup, setYearGroup] = useState("any");
  const [topic, setTopic] = useState("any");
  const [resourceType, setResourceType] = useState("any");
  const [resultsPerPage, setResultsPerPage] = useState<ResultsPerPage>(10);

  const showResourceFields = contentType.selected.includes("resources");

  const yearGroupChoices = useMemo(() => {
    if (schoolLevel.selected.length === 0) return yearGroupOptions;
    return yearGroupOptions.filter((option) => schoolLevel.selected.includes(option.level));
  }, [schoolLevel.selected]);

  const filteredResources = useMemo(() => {
    if (contentType.selected.length > 0 && !contentType.selected.includes("resources")) {
      return [];
    }

    const selectedYearGroup = yearGroupOptions.find((option) => option.id === yearGroup);
    const trimmedQuery = query.trim().toLowerCase();

    return resources.filter((resource) => {
      if (schoolLevel.selected.length && !schoolLevel.selected.includes(resource.level)) {
        return false;
      }
      if (selectedYearGroup && resource.level !== selectedYearGroup.level) {
        return false;
      }
      if (topic !== "any" && resource.subject !== topic) return false;
      if (resourceType !== "any" && resource.type !== resourceType) return false;
      if (trimmedQuery) {
        const haystack = `${resource.title[lang]} ${resource.description[lang]}`.toLowerCase();
        if (!haystack.includes(trimmedQuery)) return false;
      }
      return true;
    });
  }, [contentType.selected, schoolLevel.selected, yearGroup, topic, resourceType, query, lang]);

  const visibleResults =
    resultsPerPage === "all" ? filteredResources : filteredResources.slice(0, resultsPerPage);

  const goToFullResults = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (schoolLevel.selected.length === 1) params.set("level", schoolLevel.selected[0]);
    if (topic !== "any") params.set("subject", topic);
    navigate(`/acmhainni${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="rounded-2xl border border-brand-navy-800/12 bg-white p-6 shadow-md sm:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">
            {t("search.heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base text-brand-navy-800/80">
            {t("search.intro")}
          </p>
        </div>

        <form
          className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            goToFullResults();
          }}
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy-800/50" />
            <label htmlFor="home-search" className="sr-only">
              {t("search.heading")}
            </label>
            <input
              id="home-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("common.searchPlaceholder")}
              className="w-full rounded-md border border-brand-navy-800/25 bg-white py-3.5 pl-10 pr-3 text-base text-brand-navy-900 placeholder:text-brand-navy-800/50 focus:border-brand-green-700"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-brand-green-700 px-6 py-3.5 text-base font-bold text-white hover:bg-brand-green-800"
          >
            {t("search.button")}
          </button>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            aria-haspopup="dialog"
            className="flex min-h-13 items-center justify-center gap-2 rounded-md border border-brand-navy-800/25 px-5 py-3.5 text-base font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <FilterIcon className="h-5 w-5" />
            {t("search.showFilters")}
          </button>
        </form>

        <FilterDrawer isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} title={t("search.showFilters")}>
          <div className="mx-auto max-w-4xl space-y-7">
            <fieldset>
              <legend className="text-sm font-bold text-brand-navy-900">
                {t("search.userType")}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {userTypeOptions.map((option) => (
                  <FilterChip
                    key={option.id}
                    label={t(option.labelKey)}
                    checked={userType.selected.includes(option.id)}
                    onChange={() => userType.toggle(option.id)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-brand-navy-900">
                {t("search.contentType")}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {contentTypeOptions.map((option) => (
                  <FilterChip
                    key={option.id}
                    label={t(option.labelKey)}
                    checked={contentType.selected.includes(option.id)}
                    onChange={() => contentType.toggle(option.id)}
                  />
                ))}
              </div>
            </fieldset>

            {showResourceFields && (
              <div className="rounded-lg bg-brand-green-50/60 p-5">
                <fieldset>
                  <legend className="text-sm font-bold text-brand-navy-900">
                    {t("search.schoolLevel")}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {levelOptions.map((option) => (
                      <FilterChip
                        key={option.id}
                        label={option.label[lang]}
                        checked={schoolLevel.selected.includes(option.id)}
                        onChange={() => schoolLevel.toggle(option.id)}
                      />
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="year-group" className="text-sm font-bold text-brand-navy-900">
                      {t("search.yearGroup")}
                    </label>
                    <select
                      id="year-group"
                      value={yearGroup}
                      onChange={(event) => setYearGroup(event.target.value)}
                      className="mt-2 w-full rounded-md border border-brand-navy-800/25 bg-white px-3 py-2.5 text-sm text-brand-navy-900 focus:border-brand-green-700"
                    >
                      <option value="any">{t("search.yearGroupAny")}</option>
                      {yearGroupChoices.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="topic" className="text-sm font-bold text-brand-navy-900">
                      {t("search.topic")}
                    </label>
                    <select
                      id="topic"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      className="mt-2 w-full rounded-md border border-brand-navy-800/25 bg-white px-3 py-2.5 text-sm text-brand-navy-900 focus:border-brand-green-700"
                    >
                      <option value="any">{t("search.yearGroupAny")}</option>
                      {subjectOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="resource-type" className="text-sm font-bold text-brand-navy-900">
                      {t("search.resourceType")}
                    </label>
                    <select
                      id="resource-type"
                      value={resourceType}
                      onChange={(event) => setResourceType(event.target.value)}
                      className="mt-2 w-full rounded-md border border-brand-navy-800/25 bg-white px-3 py-2.5 text-sm text-brand-navy-900 focus:border-brand-green-700"
                    >
                      <option value="any">{t("search.yearGroupAny")}</option>
                      {resourceTypeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label[lang]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy-800/10 pt-5">
              <div className="flex items-center gap-3">
                <label htmlFor="results-per-page" className="text-sm font-bold text-brand-navy-900">
                  {t("search.resultsPerPage")}
                </label>
                <select
                  id="results-per-page"
                  value={resultsPerPage}
                  onChange={(event) =>
                    setResultsPerPage(
                      event.target.value === "all" ? "all" : (Number(event.target.value) as ResultsPerPage),
                    )
                  }
                  className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2 text-sm text-brand-navy-900 focus:border-brand-green-700"
                >
                  <option value="all">{t("search.resultsAll")}</option>
                  {resultsPerPageOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  userType.clear();
                  contentType.clear();
                  schoolLevel.clear();
                  setYearGroup("any");
                  setTopic("any");
                  setResourceType("any");
                }}
                className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
              >
                {t("common.clearFilters")}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="w-full rounded-md bg-brand-green-700 px-6 py-3.5 text-base font-bold text-white hover:bg-brand-green-800"
            >
              {filteredResources.length} {t("common.results")}
            </button>
          </div>
        </FilterDrawer>

        <div className="mt-10 border-t border-brand-navy-800/10 pt-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-brand-navy-900">{t("search.previewHeading")}</h3>
            <p className="text-sm font-semibold text-brand-navy-800/70" role="status">
              {filteredResources.length} {t("common.results")}
            </p>
          </div>

          {visibleResults.length === 0 ? (
            <p className="mt-6 rounded-lg border border-dashed border-brand-navy-800/20 p-8 text-center text-brand-navy-800/70">
              {t("common.noResults")}
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleResults.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={goToFullResults}
              className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
            >
              {t("search.viewAllResults")} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
