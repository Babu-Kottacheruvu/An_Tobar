import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { primaryResources, type PrimaryResource } from "../../data/bunscoil/resources";
import { relatedSearches, relatedTopics, type RelatedItem } from "../../data/bunscoil/related";
import { BunscoilHeroSlider } from "../../components/bunscoil/BunscoilHeroSlider";
import { PrimaryFilterPanel, type ToggleGroup } from "../../components/bunscoil/PrimaryFilterPanel";
import { PrimaryResourceCard } from "../../components/bunscoil/PrimaryResourceCard";
import { PrimaryResourceViewer } from "../../components/bunscoil/PrimaryResourceViewer";
import { RelatedChips } from "../../components/bunscoil/RelatedChips";
import { SearchBar } from "../../components/common/SearchBar";
import { Modal } from "../../components/common/Modal";

const RESULTS_PER_PAGE_OPTIONS = [10, 20, 100] as const;
type ResultsPerPage = "all" | (typeof RESULTS_PER_PAGE_OPTIONS)[number];

function useMultiToggle(): ToggleGroup {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, toggle };
}

export function BunscoilHome() {
  const { lang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#acmhainni") {
      document.getElementById("acmhainni")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const [query, setQuery] = useState("");
  const classLevel = useMultiToggle();
  const theme = useMultiToggle();
  const topic = useMultiToggle();
  const resourceType = useMultiToggle();
  const [assessment, setAssessment] = useState(false);
  const [planning, setPlanning] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState<ResultsPerPage>(10);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [viewResource, setViewResource] = useState<PrimaryResource | null>(null);

  const toggleFavourite = (id: string) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return primaryResources.filter((resource) => {
      if (classLevel.selected.length && !classLevel.selected.includes(resource.classLevel)) {
        return false;
      }
      if (theme.selected.length && !theme.selected.includes(resource.theme)) return false;
      if (topic.selected.length && !topic.selected.includes(resource.topic)) return false;
      if (
        resourceType.selected.length &&
        !resourceType.selected.includes(resource.resourceType)
      ) {
        return false;
      }
      if (assessment && !resource.assessment) return false;
      if (planning && !resource.planning) return false;
      if (trimmed) {
        const haystack = `${resource.titleGa} ${resource.titleEn} ${resource.description[lang]}`.toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }
      return true;
    });
  }, [query, classLevel.selected, theme.selected, topic.selected, resourceType.selected, assessment, planning, lang]);

  const visible = resultsPerPage === "all" ? filtered : filtered.slice(0, resultsPerPage);

  const activeCount =
    classLevel.selected.length +
    theme.selected.length +
    topic.selected.length +
    resourceType.selected.length +
    (assessment ? 1 : 0) +
    (planning ? 1 : 0);

  const clearAll = () => {
    classLevel.selected.forEach((id) => classLevel.toggle(id));
    theme.selected.forEach((id) => theme.toggle(id));
    topic.selected.forEach((id) => topic.toggle(id));
    resourceType.selected.forEach((id) => resourceType.toggle(id));
    setAssessment(false);
    setPlanning(false);
  };

  const handleRelatedSelect = (item: RelatedItem) => {
    setQuery(item.label[lang]);
    document.getElementById("acmhainni")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <BunscoilHeroSlider />
      </div>

      <section id="acmhainni" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">
          {t("bunscoil.searchHeading")}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-navy-800/80">
          {t("bunscoil.searchIntro")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <PrimaryFilterPanel
            classLevel={classLevel}
            theme={theme}
            topic={topic}
            resourceType={resourceType}
            assessment={assessment}
            onAssessmentChange={setAssessment}
            planning={planning}
            onPlanningChange={setPlanning}
            onClear={clearAll}
            activeCount={activeCount}
          />

          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <SearchBar value={query} onChange={setQuery} />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="bunscoil-results-per-page" className="text-sm font-bold text-brand-navy-900">
                  {t("search.resultsPerPage")}
                </label>
                <select
                  id="bunscoil-results-per-page"
                  value={resultsPerPage}
                  onChange={(event) =>
                    setResultsPerPage(
                      event.target.value === "all" ? "all" : (Number(event.target.value) as ResultsPerPage),
                    )
                  }
                  className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2 text-sm text-brand-navy-900 focus:border-brand-green-700"
                >
                  <option value="all">{t("search.resultsAll")}</option>
                  {RESULTS_PER_PAGE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-brand-navy-800/70" role="status">
              {filtered.length} {t("common.results")}
            </p>

            {visible.length === 0 ? (
              <p className="mt-6 rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
                {t("common.noResults")}
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((resource) => (
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

            <div className="mt-6 text-center">
              <Link
                to={`/bunscoil/acmhainni${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`}
                className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
              >
                {t("search.viewAllResults")} →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 rounded-2xl bg-brand-navy-50 p-6 sm:grid-cols-2 sm:p-8">
          <RelatedChips
            heading={t("bunscoil.related.searches")}
            items={relatedSearches}
            onSelect={handleRelatedSelect}
          />
          <RelatedChips
            heading={t("bunscoil.related.topics")}
            items={relatedTopics}
            onSelect={handleRelatedSelect}
          />
        </div>
      </section>

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
