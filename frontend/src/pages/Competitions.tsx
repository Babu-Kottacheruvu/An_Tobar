import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { competitions } from "../data/competitions";
import { competitionLevelOptions, entryTypeOptions } from "../data/competitionFilters";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { FilterSidebar, type FilterGroup } from "../components/common/FilterSidebar";
import { FeaturedCompetition } from "../components/cards/FeaturedCompetition";
import { CompetitionCard } from "../components/cards/CompetitionCard";

function useMultiToggle() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, setSelected, toggle };
}

export function Competitions() {
  const { lang, t } = useLanguage();
  const level = useMultiToggle();
  const entryType = useMultiToggle();

  const featured = competitions.find((competition) => competition.featured);

  const filtered = useMemo(
    () =>
      competitions.filter((competition) => {
        if (level.selected.length && !competition.levels.some((l) => level.selected.includes(l))) {
          return false;
        }
        if (
          entryType.selected.length &&
          !competition.entryTypes.some((type) => entryType.selected.includes(type))
        ) {
          return false;
        }
        return true;
      }),
    [level.selected, entryType.selected],
  );

  const activeCount = level.selected.length + entryType.selected.length;
  const clearAll = () => {
    level.setSelected([]);
    entryType.setSelected([]);
  };

  const groups: FilterGroup[] = [
    {
      id: "level",
      label: t("bunscoil.filters.classLevel"),
      options: competitionLevelOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: level.selected,
      onToggle: level.toggle,
    },
    {
      id: "entryType",
      label: t("competitions.entryType"),
      options: entryTypeOptions.map((option) => ({ id: option.id, label: option.label[lang] })),
      selected: entryType.selected,
      onToggle: entryType.toggle,
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.competitions") }]} />

      <section className="bg-linear-to-br from-brand-green-700 to-brand-green-900 py-14 text-center text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-4xl font-black sm:text-5xl">{t("competitions.title")}</h1>
          <p className="mt-3 text-xl font-bold text-brand-gold-400">{t("competitions.tagline")}</p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-green-50/90">
            {t("competitions.intro")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {featured && (
          <div className="mb-12">
            <FeaturedCompetition competition={featured} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <FilterSidebar groups={groups} onClear={clearAll} activeCount={activeCount} />

          <div>
            <p className="text-sm font-semibold text-brand-navy-800/70" role="status">
              {filtered.length} {t("common.results")}
            </p>

            {filtered.length === 0 ? (
              <p className="mt-6 rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
                {t("common.noResults")}
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filtered.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
