import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolResources } from "../../data/tobshaol/resources";
import { tobshaolTopics } from "../../data/tobshaol/topics";
import { tobshaolResourceTypes } from "../../data/tobshaol/resourceTypes";
import { TobshaolResourceCard } from "./TobshaolResourceCard";
import { SearchIcon } from "../icons";

export interface TobshaolYearSearchHandle {
  selectTopic: (topicId: string) => void;
}

function useMultiToggle() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, setSelected, toggle };
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
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
        checked
          ? "border-teen-pink-400 bg-teen-pink-600/20 text-teen-pink-400"
          : "border-white/15 text-white/70 hover:border-white/30"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-teen-pink-600" />
      {label}
    </label>
  );
}

interface TobshaolYearSearchProps {
  yearGroupId: string;
  heading: string;
}

export const TobshaolYearSearch = forwardRef<TobshaolYearSearchHandle, TobshaolYearSearchProps>(
  function TobshaolYearSearch({ yearGroupId, heading }, ref) {
    const { lang, t } = useLanguage();
    const [query, setQuery] = useState("");
    const topic = useMultiToggle();
    const resourceType = useMultiToggle();

    useImperativeHandle(ref, () => ({
      selectTopic: (topicId: string) => topic.setSelected([topicId]),
    }));

    const yearResources = useMemo(
      () => tobshaolResources.filter((resource) => resource.yearGroup === yearGroupId),
      [yearGroupId],
    );

    const filtered = useMemo(() => {
      const trimmed = query.trim().toLowerCase();
      return yearResources.filter((resource) => {
        if (topic.selected.length && !topic.selected.includes(resource.topic)) return false;
        if (resourceType.selected.length && !resourceType.selected.includes(resource.resourceType)) {
          return false;
        }
        if (trimmed) {
          const haystack = `${resource.titleGa} ${resource.titleEn} ${resource.description[lang]}`.toLowerCase();
          if (!haystack.includes(trimmed)) return false;
        }
        return true;
      });
    }, [yearResources, query, topic.selected, resourceType.selected, lang]);

    return (
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>

        <div className="relative mt-5 max-w-lg">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <label htmlFor={`${yearGroupId}-search-input`} className="sr-only">
            {heading}
          </label>
          <input
            id={`${yearGroupId}-search-input`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("common.searchPlaceholder")}
            className="w-full rounded-full border border-white/15 bg-teen-surface py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-teen-pink-400"
          />
        </div>

        <div className="mt-6 space-y-5">
          <fieldset>
            <legend className="text-xs font-black uppercase tracking-wide text-white/50">
              {t("tobshaol.filters.topic")}
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {tobshaolTopics.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label[lang]}
                  checked={topic.selected.includes(option.id)}
                  onChange={() => topic.toggle(option.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-black uppercase tracking-wide text-white/50">
              {t("tobshaol.filters.resourceType")}
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {tobshaolResourceTypes.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label[lang]}
                  checked={resourceType.selected.includes(option.id)}
                  onChange={() => resourceType.toggle(option.id)}
                />
              ))}
            </div>
          </fieldset>
        </div>

        <p className="mt-6 text-sm font-bold text-white/50" role="status">
          {filtered.length} {t("common.results")}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-white/15 p-8 text-center text-white/50">
            {t("common.noResults")}
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((resource) => (
              <TobshaolResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    );
  },
);
