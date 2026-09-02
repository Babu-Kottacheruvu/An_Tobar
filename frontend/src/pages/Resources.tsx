import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import {
  globalResourceTypeOptions,
  globalSearchResults,
  globalTopicOptions,
  globalYearGroupOptions,
  type GlobalResult,
} from "../data/globalSearch";
import { resourceLibraryCategories } from "../data/resourceLibraryCategories";
import { matchesCategory } from "../data/resourceLibraryFilters";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { GlobalSearchBar } from "../components/search/GlobalSearchBar";
import { FilterSidebar, type FilterGroup } from "../components/common/FilterSidebar";
import { ResourceLibraryCard } from "../components/resources/ResourceLibraryCard";
import { ResourceLibraryPreview } from "../components/resources/ResourceLibraryPreview";
import { Pagination } from "../components/common/Pagination";
import { Modal } from "../components/common/Modal";
import { FilterIcon, ChevronDownIcon } from "../components/icons";

const PAGE_SIZE = 12;
type SortOption = "newest" | "popular" | "az";

const LEGACY_AUDIENCE_TO_CATEGORY: Record<string, string> = {
  parents: "parent",
  teachers: "teacher",
  students: "learner",
  professionals: "teacher",
};

function useMultiToggle(initial: string[] = []) {
  const [selected, setSelected] = useState<string[]>(initial);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, setSelected, toggle };
}

export function Resources() {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q");
  const levelFromUrl = searchParams.get("level");
  const subjectFromUrl = searchParams.get("subject");
  const audienceFromUrl = searchParams.get("audience");

  const initialCategory = levelFromUrl === "primary" ? "primary" : levelFromUrl === "post-primary" ? "secondary" : null;
  const initialAudienceCategory = audienceFromUrl ? LEGACY_AUDIENCE_TO_CATEGORY[audienceFromUrl] : null;
  const initialCategories = [initialCategory, initialAudienceCategory].filter((id): id is string => Boolean(id));

  const [query, setQuery] = useState(queryFromUrl ?? "");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewResult, setViewResult] = useState<GlobalResult | null>(null);

  const category = useMultiToggle(initialCategories);
  const topic = useMultiToggle(subjectFromUrl ? [`main-subject:${subjectFromUrl}`] : []);
  const resourceType = useMultiToggle();
  const yearGroup = useMultiToggle();

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

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return globalSearchResults.filter((result) => {
      if (category.selected.length) {
        const matchesAny = category.selected.some((id) => {
          const config = resourceLibraryCategories.find((option) => option.id === id);
          return config ? matchesCategory(result, config) : false;
        });
        if (!matchesAny) return false;
      }
      if (topic.selected.length && !topic.selected.includes(result.topic.id)) return false;
      if (resourceType.selected.length && !resourceType.selected.includes(result.resourceType)) return false;
      if (yearGroup.selected.length && (!result.yearGroup || !yearGroup.selected.includes(result.yearGroup.id))) {
        return false;
      }
      if (trimmed) {
        const haystack = `${result.titleGa} ${result.titleEn} ${result.description[lang]}`.toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }
      return true;
    });
  }, [query, lang, category.selected, topic.selected, resourceType.selected, yearGroup.selected]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "newest") {
      list.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime());
    } else if (sort === "az") {
      list.sort((a, b) => (lang === "ga" ? a.titleGa.localeCompare(b.titleGa) : a.titleEn.localeCompare(b.titleEn)));
    } else if (sort === "popular") {
      // "Most popular" uses each source's own editorially curated prominence
      // flags rather than fabricated view-count analytics.
      list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [filtered, sort, lang]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeAdvancedCount = topic.selected.length + resourceType.selected.length + yearGroup.selected.length;

  const advancedGroups: FilterGroup[] = [
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
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.resources") }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">{t("resources.title")}</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-navy-800/80">
          {t("resources.intro")}
        </p>

        <div className="mt-8 max-w-xl">
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

        <nav aria-label={t("resources.categoryNav")} className="mt-6 flex flex-wrap gap-2">
          {resourceLibraryCategories.map((option) => {
            const isActive = category.selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  category.toggle(option.id);
                  setPage(1);
                }}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                  isActive
                    ? "border-brand-green-700 bg-brand-green-700 text-white"
                    : "border-brand-navy-800/15 text-brand-navy-800/70 hover:border-brand-green-600"
                }`}
              >
                {option.label[lang]}
              </button>
            );
          })}
        </nav>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="advanced-filters-panel"
            className="flex items-center gap-2 self-start rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <FilterIcon className="h-4 w-4" />
            {t("search.showFilters")}
            {activeAdvancedCount > 0 && (
              <span className="rounded-full bg-brand-green-700 px-2 py-0.5 text-xs font-black text-white">
                {activeAdvancedCount}
              </span>
            )}
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          <label htmlFor="library-sort" className="sr-only">
            {t("bunscoil.results.sortLabel")}
          </label>
          <select
            id="library-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2.5 text-sm font-semibold text-brand-navy-900 focus:border-brand-green-700"
          >
            <option value="newest">{t("resources.sortNewest")}</option>
            <option value="popular">{t("resources.sortPopular")}</option>
            <option value="az">{t("resources.sortAz")}</option>
          </select>
        </div>

        {filtersOpen && (
          <div id="advanced-filters-panel" className="mt-5 max-w-sm rounded-lg border border-brand-navy-800/12 bg-white p-5">
            <FilterSidebar
              groups={advancedGroups}
              onClear={() => {
                topic.setSelected([]);
                resourceType.setSelected([]);
                yearGroup.setSelected([]);
                setPage(1);
              }}
              activeCount={activeAdvancedCount}
            />
          </div>
        )}

        <p className="mt-6 text-sm font-semibold text-brand-navy-800/70" role="status">
          {sorted.length} {t("common.results")}
        </p>

        {paged.length === 0 ? (
          <p className="mt-6 rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
            {t("globalSearch.emptyState")}
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paged.map((result) => (
              <ResourceLibraryCard key={result.id} result={result} onView={setViewResult} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        isOpen={Boolean(viewResult)}
        onClose={() => setViewResult(null)}
        title={(lang === "ga" ? viewResult?.titleGa : viewResult?.titleEn) ?? ""}
      >
        {viewResult && (
          <div>
            <p className="mt-2 text-sm leading-relaxed text-brand-navy-800/85">
              {viewResult.description[lang]}
            </p>
            <div className="mt-4">
              <ResourceLibraryPreview resourceType={viewResult.resourceType} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
