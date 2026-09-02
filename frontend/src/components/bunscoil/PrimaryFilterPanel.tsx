import { useLanguage } from "../../i18n/useLanguage";
import { classLevels } from "../../data/bunscoil/classLevels";
import { themes } from "../../data/bunscoil/themes";
import { bunscoilResourceTypes } from "../../data/bunscoil/resourceTypes";
import { FilterIcon } from "../icons";

export interface ToggleGroup {
  selected: string[];
  toggle: (id: string) => void;
}

interface PrimaryFilterPanelProps {
  classLevel: ToggleGroup;
  theme: ToggleGroup;
  topic: ToggleGroup;
  resourceType: ToggleGroup;
  assessment: boolean;
  onAssessmentChange: (value: boolean) => void;
  planning: boolean;
  onPlanningChange: (value: boolean) => void;
  onClear: () => void;
  activeCount: number;
  /** When provided, renders a prominent "Apply filters" button (used for a staged/draft filter flow). */
  onApply?: () => void;
}

export function PrimaryFilterPanel({
  classLevel,
  theme,
  topic,
  resourceType,
  assessment,
  onAssessmentChange,
  planning,
  onPlanningChange,
  onClear,
  activeCount,
  onApply,
}: PrimaryFilterPanelProps) {
  const { lang, t } = useLanguage();

  return (
    <aside aria-label={t("common.filters")} className="w-full">
      <div className="flex items-center justify-between gap-2 border-b border-brand-navy-800/15 pb-3">
        <h2 className="flex items-center gap-2 text-base font-black text-brand-navy-900">
          <FilterIcon className="h-5 w-5 text-brand-green-700" />
          {t("common.filters")}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
          >
            {t("bunscoil.filters.clearAll")}
          </button>
        )}
      </div>

      <div className="mt-2 divide-y divide-brand-navy-800/10">
        {/* Class level */}
        <details open className="py-3">
          <summary className="cursor-pointer text-sm font-bold text-brand-navy-900 marker:text-brand-green-700">
            {t("bunscoil.filters.classLevel")}
          </summary>
          <fieldset className="mt-3 space-y-2.5">
            <legend className="sr-only">{t("bunscoil.filters.classLevel")}</legend>
            {classLevels.map((level) => (
              <label key={level.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-navy-900">
                <input
                  type="checkbox"
                  checked={classLevel.selected.includes(level.id)}
                  onChange={() => classLevel.toggle(level.id)}
                  className="h-4 w-4 shrink-0 accent-brand-green-700"
                />
                <span>{level.label[lang]}</span>
              </label>
            ))}
          </fieldset>
        </details>

        {/* Themes + nested expandable topics */}
        <details open className="py-3">
          <summary className="cursor-pointer text-sm font-bold text-brand-navy-900 marker:text-brand-green-700">
            {t("bunscoil.filters.themes")}
            <span className="ml-2 text-xs font-semibold text-brand-navy-800/50">
              ({t("bunscoil.filters.topics")})
            </span>
          </summary>
          <div className="mt-3 space-y-1">
            {themes.map((themeItem) => (
              <details key={themeItem.id} className="rounded-md border border-brand-navy-800/10 px-3 py-2">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 text-sm text-brand-navy-900 marker:content-none">
                  <input
                    type="checkbox"
                    checked={theme.selected.includes(themeItem.id)}
                    onChange={(event) => {
                      event.stopPropagation();
                      theme.toggle(themeItem.id);
                    }}
                    onClick={(event) => event.stopPropagation()}
                    className="h-4 w-4 shrink-0 accent-brand-green-700"
                  />
                  <span className="flex-1 font-semibold">{themeItem.label[lang]}</span>
                </summary>
                <fieldset className="mt-2 space-y-2 border-t border-brand-navy-800/10 pl-6 pt-2">
                  <legend className="sr-only">
                    {t("bunscoil.filters.topics")}: {themeItem.label[lang]}
                  </legend>
                  {themeItem.topics.map((topicItem) => (
                    <label
                      key={topicItem.id}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-navy-800/90"
                    >
                      <input
                        type="checkbox"
                        checked={topic.selected.includes(topicItem.id)}
                        onChange={() => topic.toggle(topicItem.id)}
                        className="h-3.5 w-3.5 shrink-0 accent-brand-green-700"
                      />
                      <span>{topicItem.label[lang]}</span>
                    </label>
                  ))}
                </fieldset>
              </details>
            ))}
          </div>
        </details>

        {/* Resource types */}
        <details open className="py-3">
          <summary className="cursor-pointer text-sm font-bold text-brand-navy-900 marker:text-brand-green-700">
            {t("bunscoil.filters.resourceType")}
          </summary>
          <fieldset className="mt-3 space-y-2.5">
            <legend className="sr-only">{t("bunscoil.filters.resourceType")}</legend>
            {bunscoilResourceTypes.map((option) => {
              const Icon = option.icon;
              return (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-navy-900"
                >
                  <input
                    type="checkbox"
                    checked={resourceType.selected.includes(option.id)}
                    onChange={() => resourceType.toggle(option.id)}
                    className="h-4 w-4 shrink-0 accent-brand-green-700"
                  />
                  <Icon className="h-4 w-4 shrink-0 text-brand-navy-800/60" />
                  <span>{option.label[lang]}</span>
                </label>
              );
            })}
          </fieldset>
        </details>

        {/* Additional filters */}
        <details open className="py-3">
          <summary className="cursor-pointer text-sm font-bold text-brand-navy-900 marker:text-brand-green-700">
            {t("bunscoil.filters.additional")}
          </summary>
          <fieldset className="mt-3 space-y-2.5">
            <legend className="sr-only">{t("bunscoil.filters.additional")}</legend>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-navy-900">
              <input
                type="checkbox"
                checked={assessment}
                onChange={(event) => onAssessmentChange(event.target.checked)}
                className="h-4 w-4 shrink-0 accent-brand-green-700"
              />
              <span>{t("bunscoil.filters.assessment")}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-navy-900">
              <input
                type="checkbox"
                checked={planning}
                onChange={(event) => onPlanningChange(event.target.checked)}
                className="h-4 w-4 shrink-0 accent-brand-green-700"
              />
              <span>{t("bunscoil.filters.planning")}</span>
            </label>
          </fieldset>
        </details>
      </div>

      {onApply && (
        <button
          type="button"
          onClick={onApply}
          className="mt-5 w-full rounded-md bg-brand-green-700 px-4 py-3 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("bunscoil.filters.apply")}
        </button>
      )}
    </aside>
  );
}
