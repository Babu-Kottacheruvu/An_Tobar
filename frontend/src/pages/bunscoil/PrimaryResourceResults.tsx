import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { Lang } from "../../i18n/translations";
import { primaryResources, type PrimaryResource } from "../../data/bunscoil/resources";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { SearchBar } from "../../components/common/SearchBar";
import { Pagination } from "../../components/common/Pagination";
import { Modal } from "../../components/common/Modal";
import { FilterDrawer } from "../../components/common/FilterDrawer";
import { PrimaryFilterPanel } from "../../components/bunscoil/PrimaryFilterPanel";
import { PrimaryResourceCard } from "../../components/bunscoil/PrimaryResourceCard";
import { PrimaryResourceViewer } from "../../components/bunscoil/PrimaryResourceViewer";
import { FilterIcon } from "../../components/icons";

const PAGE_SIZE = 12;
type SortOption = "relevant" | "newest" | "az";

interface AppliedFilters {
  classLevel: string[];
  theme: string[];
  topic: string[];
  resourceType: string[];
  assessment: boolean;
  planning: boolean;
}

const EMPTY_FILTERS: AppliedFilters = {
  classLevel: [],
  theme: [],
  topic: [],
  resourceType: [],
  assessment: false,
  planning: false,
};

function useMultiToggle(initial: string[] = []) {
  const [selected, setSelected] = useState<string[]>(initial);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const clear = () => setSelected([]);
  return { selected, toggle, clear, set: setSelected };
}

function formatResultCount(count: number, lang: Lang) {
  if (lang === "ga") return `${count} acmhainn aimsithe`;
  return `${count} ${count === 1 ? "resource" : "resources"} found`;
}

export function PrimaryResourceResults() {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [viewResource, setViewResource] = useState<PrimaryResource | null>(null);

  const draftClassLevel = useMultiToggle();
  const draftTheme = useMultiToggle();
  const draftTopic = useMultiToggle();
  const draftResourceType = useMultiToggle();
  const [draftAssessment, setDraftAssessment] = useState(false);
  const [draftPlanning, setDraftPlanning] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(EMPTY_FILTERS);

  const draftActiveCount =
    draftClassLevel.selected.length +
    draftTheme.selected.length +
    draftTopic.selected.length +
    draftResourceType.selected.length +
    (draftAssessment ? 1 : 0) +
    (draftPlanning ? 1 : 0);

  const appliedActiveCount =
    appliedFilters.classLevel.length +
    appliedFilters.theme.length +
    appliedFilters.topic.length +
    appliedFilters.resourceType.length +
    (appliedFilters.assessment ? 1 : 0) +
    (appliedFilters.planning ? 1 : 0);

  const applyFilters = () => {
    setAppliedFilters({
      classLevel: draftClassLevel.selected,
      theme: draftTheme.selected,
      topic: draftTopic.selected,
      resourceType: draftResourceType.selected,
      assessment: draftAssessment,
      planning: draftPlanning,
    });
    setPage(1);
    setDrawerOpen(false);
  };

  const clearAllFilters = () => {
    draftClassLevel.clear();
    draftTheme.clear();
    draftTopic.clear();
    draftResourceType.clear();
    setDraftAssessment(false);
    setDraftPlanning(false);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const toggleFavourite = (id: string) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return primaryResources.filter((resource) => {
      if (
        appliedFilters.classLevel.length &&
        !appliedFilters.classLevel.includes(resource.classLevel)
      ) {
        return false;
      }
      if (appliedFilters.theme.length && !appliedFilters.theme.includes(resource.theme)) {
        return false;
      }
      if (appliedFilters.topic.length && !appliedFilters.topic.includes(resource.topic)) {
        return false;
      }
      if (
        appliedFilters.resourceType.length &&
        !appliedFilters.resourceType.includes(resource.resourceType)
      ) {
        return false;
      }
      if (appliedFilters.assessment && !resource.assessment) return false;
      if (appliedFilters.planning && !resource.planning) return false;
      if (trimmed) {
        const haystack = `${resource.titleGa} ${resource.titleEn} ${resource.description[lang]}`.toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }
      return true;
    });
  }, [appliedFilters, query, lang]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "newest") {
      list.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime());
    } else if (sort === "az") {
      list.sort((a, b) => (lang === "ga" ? a.titleGa.localeCompare(b.titleGa) : a.titleEn.localeCompare(b.titleEn)));
    }
    return list;
  }, [filtered, sort, lang]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filterPanelProps = {
    classLevel: draftClassLevel,
    theme: draftTheme,
    topic: draftTopic,
    resourceType: draftResourceType,
    assessment: draftAssessment,
    onAssessmentChange: setDraftAssessment,
    planning: draftPlanning,
    onPlanningChange: setDraftPlanning,
    onClear: clearAllFilters,
    activeCount: draftActiveCount,
    onApply: applyFilters,
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t("home.entryBunscoilTitle"), path: "/bunscoil" },
          { label: t("bunscoil.nav.resources") },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">
          {t("bunscoil.searchHeading")}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-navy-800/80">
          {t("bunscoil.searchIntro")}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1 sm:max-w-xl">
            <SearchBar
              value={query}
              onChange={(value) => {
                setQuery(value);
                setPage(1);
              }}
              placeholder={t("bunscoil.results.searchPlaceholder")}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-3 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50 lg:hidden"
            >
              <FilterIcon className="h-5 w-5" />
              {t("common.filters")}
              {appliedActiveCount > 0 && (
                <span className="rounded-full bg-brand-green-700 px-2 py-0.5 text-xs font-black text-white">
                  {appliedActiveCount}
                </span>
              )}
            </button>

            <label htmlFor="sort-select" className="sr-only">
              {t("bunscoil.results.sortLabel")}
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-3 text-sm font-semibold text-brand-navy-900 focus:border-brand-green-700"
            >
              <option value="relevant">{t("bunscoil.results.sortRelevant")}</option>
              <option value="newest">{t("bunscoil.results.sortNewest")}</option>
              <option value="az">{t("bunscoil.results.sortAz")}</option>
            </select>
          </div>
        </div>

        <p className="mt-5 text-sm font-bold text-brand-navy-900" role="status">
          {formatResultCount(sorted.length, lang)}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <PrimaryFilterPanel {...filterPanelProps} />
          </div>

          <div>
            {paged.length === 0 ? (
              <p className="rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
                {t("common.noResults")}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paged.map((resource) => (
                  <PrimaryResourceCard
                    key={resource.id}
                    resource={resource}
                    isFavourite={favourites.includes(resource.id)}
                    onToggleFavourite={toggleFavourite}
                    onView={setViewResource}
                  />
                ))}
              </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={t("bunscoil.filters.openDrawer")}
      >
        <PrimaryFilterPanel {...filterPanelProps} />
      </FilterDrawer>

      <Modal
        isOpen={Boolean(viewResource)}
        onClose={() => setViewResource(null)}
        title={(lang === "ga" ? viewResource?.titleGa : viewResource?.titleEn) ?? ""}
      >
        {viewResource && <PrimaryResourceViewer resource={viewResource} />}
      </Modal>
    </>
  );
}
