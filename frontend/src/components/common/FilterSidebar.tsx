import { useLanguage } from "../../i18n/useLanguage";
import { FilterIcon } from "../icons";

export interface FilterGroupOption {
  id: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterGroupOption[];
  selected: string[];
  onToggle: (optionId: string) => void;
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  onClear: () => void;
  activeCount: number;
}

export function FilterSidebar({ groups, onClear, activeCount }: FilterSidebarProps) {
  const { t } = useLanguage();

  return (
    <aside aria-label={t("common.filters")} className="w-full">
      <div className="flex items-center justify-between gap-2 border-b border-brand-navy-800/15 pb-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-brand-navy-900">
          <FilterIcon className="h-5 w-5" />
          {t("common.filters")}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded text-sm font-semibold text-brand-green-800 underline-offset-2 hover:underline"
          >
            {t("common.clearFilters")}
          </button>
        )}
      </div>

      <div className="mt-2 divide-y divide-brand-navy-800/10">
        {groups.map((group) => (
          <details key={group.id} open className="py-3">
            <summary className="cursor-pointer text-sm font-bold text-brand-navy-900 marker:text-brand-green-700">
              {group.label}
              {group.selected.length > 0 && (
                <span className="ml-2 rounded-full bg-brand-green-100 px-2 py-0.5 text-xs font-semibold text-brand-green-800">
                  {group.selected.length}
                </span>
              )}
            </summary>
            <fieldset className="mt-3 space-y-2.5">
              <legend className="sr-only">{group.label}</legend>
              {group.options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-navy-900"
                >
                  <input
                    type="checkbox"
                    checked={group.selected.includes(option.id)}
                    onChange={() => group.onToggle(option.id)}
                    className="h-4 w-4 shrink-0 accent-brand-green-700"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
          </details>
        ))}
      </div>
    </aside>
  );
}
