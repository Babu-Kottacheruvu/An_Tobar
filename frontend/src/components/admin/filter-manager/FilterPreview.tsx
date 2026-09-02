import { useLanguage } from "../../../i18n/useLanguage";
import type { FilterGroupConfig } from "../../../data/admin/filterManager";

export function FilterPreview({ group }: { group: FilterGroupConfig }) {
  const { lang, t } = useLanguage();
  const visible = [...group.options].filter((option) => option.active).sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-lg border border-brand-navy-800/12 bg-brand-cream p-5">
      <p className="text-sm font-bold text-brand-navy-900">{lang === "ga" ? group.nameGa : group.nameEn}</p>
      {visible.length === 0 ? (
        <p className="mt-3 text-xs text-brand-navy-800/50">{t("common.noResults")}</p>
      ) : (
        <fieldset className="mt-3 space-y-2">
          <legend className="sr-only">{lang === "ga" ? group.nameGa : group.nameEn}</legend>
          {visible.map((option) => (
            <label key={option.id} className="flex items-center gap-2.5 text-sm text-brand-navy-900">
              <input type="checkbox" disabled className="h-4 w-4 accent-brand-green-700" />
              <span>{lang === "ga" ? option.labelGa : option.labelEn}</span>
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}
