import { useMemo, useRef } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolYearGroups } from "../../data/tobshaol/yearGroups";
import { yearUnitsByYearGroup } from "../../data/tobshaol/yearUnits";
import { aonadNavByUnit } from "../../data/tobshaol/aonadNav";
import { tobshaolResources } from "../../data/tobshaol/resources";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { YearUnitCard } from "../../components/tobshaol/YearUnitCard";
import { TobshaolResourceCard } from "../../components/tobshaol/TobshaolResourceCard";
import { TobshaolYearSearch, type TobshaolYearSearchHandle } from "../../components/tobshaol/TobshaolYearSearch";
import { NotFound } from "../NotFound";

const SEARCH_SECTION_ID = "tobshaol-year-search";

interface YearGroupPageProps {
  yearGroupId: string;
}

export function YearGroupPage({ yearGroupId }: YearGroupPageProps) {
  const { lang, t } = useLanguage();
  const searchRef = useRef<TobshaolYearSearchHandle>(null);

  const yearGroup = tobshaolYearGroups.find((option) => option.id === yearGroupId);
  const units = yearUnitsByYearGroup[yearGroupId] ?? [];

  const yearResources = useMemo(
    () => tobshaolResources.filter((resource) => resource.yearGroup === yearGroupId),
    [yearGroupId],
  );
  const featured = yearResources.filter((resource) => resource.featured).slice(0, 4);
  const recentlyAdded = useMemo(
    () =>
      [...yearResources]
        .sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime())
        .slice(0, 4),
    [yearResources],
  );
  const popular = yearResources.filter((resource) => resource.popular).slice(0, 4);

  if (!yearGroup) return <NotFound />;

  const scrollToSearch = () => {
    document.getElementById(SEARCH_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTopicSelect = (topicId: string) => {
    searchRef.current?.selectTopic(topicId);
    scrollToSearch();
  };

  return (
    <>
      <Breadcrumbs
        variant="dark"
        items={[
          { label: "#Tobshaol", path: "/iar-bhunscoil" },
          { label: yearGroup.label[lang] },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
          {yearGroup.label[lang]}
        </h1>

        {units.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-black uppercase tracking-wide text-white/80">
              {t("tobshaol.unitsHeading")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((unit) => (
                <YearUnitCard
                  key={unit.id}
                  unit={unit}
                  onTopicSelect={handleTopicSelect}
                  onScrollToSearch={scrollToSearch}
                  pagePath={aonadNavByUnit[unit.id] ? `/iar-bhunscoil/${yearGroupId}/${unit.id}` : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {featured.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black uppercase tracking-wide text-white/80">
              {t("home.featuredResources")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((resource) => (
                <TobshaolResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {recentlyAdded.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black uppercase tracking-wide text-white/80">
              {t("tobshaol.recentlyAdded")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyAdded.map((resource) => (
                <TobshaolResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {popular.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black uppercase tracking-wide text-white/80">
              {t("tobshaol.popularResources")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((resource) => (
                <TobshaolResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}

        <section id={SEARCH_SECTION_ID} className="mt-16 scroll-mt-20">
          <TobshaolYearSearch
            ref={searchRef}
            yearGroupId={yearGroupId}
            heading={`${t("tobshaol.searchWithinPrefix")} ${yearGroup.label[lang]}`}
          />
        </section>
      </div>
    </>
  );
}
