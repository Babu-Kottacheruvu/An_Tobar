import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { initialFilterGroups, type FilterGroupConfig, type FilterOptionRow } from "../../data/admin/filterManager";
import { FilterOptionsEditor } from "../../components/admin/filter-manager/FilterOptionsEditor";
import { FilterPreview } from "../../components/admin/filter-manager/FilterPreview";

type Banner = { type: "saved" | "published"; message: string } | null;

export function AdminFiltersPage() {
  const { lang, t } = useLanguage();
  const [savedGroups, setSavedGroups] = useState<FilterGroupConfig[]>(initialFilterGroups);
  const [draftGroups, setDraftGroups] = useState<FilterGroupConfig[]>(initialFilterGroups);
  const [activeGroupId, setActiveGroupId] = useState(initialFilterGroups[0].id);
  const [banner, setBanner] = useState<Banner>(null);

  const activeGroup = draftGroups.find((group) => group.id === activeGroupId)!;
  const isDirty = JSON.stringify(draftGroups) !== JSON.stringify(savedGroups);

  const updateActiveGroup = (updater: (group: FilterGroupConfig) => FilterGroupConfig) => {
    setDraftGroups((current) => current.map((group) => (group.id === activeGroupId ? updater(group) : group)));
    setBanner(null);
  };

  const handleOptionsChange = (options: FilterOptionRow[]) => {
    updateActiveGroup((group) => ({ ...group, options }));
  };

  const handleSave = () => {
    setSavedGroups(draftGroups);
    setBanner({ type: "saved", message: t("admin.filters.saved") });
  };

  const handleCancel = () => {
    setDraftGroups(savedGroups);
    setBanner(null);
  };

  const handlePublish = () => {
    setSavedGroups(draftGroups);
    setBanner({ type: "published", message: t("admin.filters.published") });
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.filters")}</h1>
          <p className="mt-1 text-sm text-brand-navy-800/70">{t("admin.filters.intro")}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isDirty}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty}
              className="rounded-md border border-brand-green-700 px-4 py-2.5 text-sm font-bold text-brand-green-800 hover:bg-brand-green-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("admin.filters.saveChanges")}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
            >
              {t("admin.filters.publish")}
            </button>
          </div>
          {banner ? (
            <p
              role="status"
              className={`text-sm font-semibold ${banner.type === "published" ? "text-brand-green-700" : "text-brand-navy-800/70"}`}
            >
              {banner.message}
            </p>
          ) : (
            isDirty && (
              <p role="status" className="text-sm font-semibold text-brand-gold-600">
                {t("admin.filters.unsavedChanges")}
              </p>
            )
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr_280px]">
        <nav aria-label={t("admin.filters")} className="lg:sticky lg:top-6 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {draftGroups.map((group) => (
              <li key={group.id} className="shrink-0 lg:w-full">
                <button
                  type="button"
                  onClick={() => setActiveGroupId(group.id)}
                  aria-current={group.id === activeGroupId}
                  className={`block w-full whitespace-nowrap rounded-md px-4 py-2.5 text-left text-sm font-semibold ${
                    group.id === activeGroupId
                      ? "bg-brand-green-800 text-white"
                      : "text-brand-navy-900 hover:bg-brand-green-50"
                  }`}
                >
                  {lang === "ga" ? group.nameGa : group.nameEn}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="rounded-lg border border-brand-navy-800/12 bg-white p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="group-name-ga" className="text-sm font-bold text-brand-navy-900">
                  Irish: <span className="text-brand-green-800">*</span>
                </label>
                <input
                  id="group-name-ga"
                  type="text"
                  value={activeGroup.nameGa}
                  onChange={(event) => updateActiveGroup((group) => ({ ...group, nameGa: event.target.value }))}
                  className="mt-1.5 w-full rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
                />
              </div>
              <div>
                <label htmlFor="group-name-en" className="text-sm font-bold text-brand-navy-900">
                  English: <span className="text-brand-green-800">*</span>
                </label>
                <input
                  id="group-name-en"
                  type="text"
                  value={activeGroup.nameEn}
                  onChange={(event) => updateActiveGroup((group) => ({ ...group, nameEn: event.target.value }))}
                  className="mt-1.5 w-full rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <FilterOptionsEditor options={activeGroup.options} onChange={handleOptionsChange} />
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <h2 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/60">
            {t("admin.filters.preview")}
          </h2>
          <div className="mt-3">
            <FilterPreview group={activeGroup} />
          </div>
        </div>
      </div>
    </div>
  );
}
