import { useMemo, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { teacherCategories } from "../../data/tobshaol/teacherCategories";
import { teacherResources, type TeacherResource } from "../../data/tobshaol/teacherResources";
import { lessonResourceTypes } from "../../data/tobshaol/lessonResourceTypes";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { TeacherCategoryCard } from "../../components/tobshaol/TeacherCategoryCard";
import { TeacherResourceCard } from "../../components/tobshaol/TeacherResourceCard";
import { DownloadableDocumentsList } from "../../components/tobshaol/DownloadableDocumentsList";
import { TobshaolResourcePreview } from "../../components/tobshaol/TobshaolResourcePreview";
import { Modal } from "../../components/common/Modal";
import { SearchIcon } from "../../components/icons";

const DASHBOARD_ID = "muinteoiri-painéal";

function useMultiToggle() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { selected, setSelected, toggle };
}

function FilterChip({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
        checked
          ? "border-teen-pink-400 bg-teen-pink-600/10 text-teen-pink-600"
          : "border-brand-navy-800/15 text-brand-navy-800/70 hover:border-brand-navy-800/30"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-teen-pink-600" />
      {label}
    </label>
  );
}

export function TeacherResourcesPage() {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const category = useMultiToggle();
  const resourceType = useMultiToggle();
  const [previewResource, setPreviewResource] = useState<TeacherResource | null>(null);

  const scrollToDashboard = () =>
    document.getElementById(DASHBOARD_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleCategorySelect = (categoryId: string) => {
    category.setSelected([categoryId]);
    scrollToDashboard();
  };

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return teacherResources.filter((resource) => {
      if (category.selected.length && !category.selected.includes(resource.category)) return false;
      if (resourceType.selected.length && !resourceType.selected.includes(resource.resourceType)) {
        return false;
      }
      if (trimmed) {
        const haystack = `${resource.titleGa} ${resource.titleEn} ${resource.description[lang]}`.toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }
      return true;
    });
  }, [query, category.selected, resourceType.selected, lang]);

  const isFiltering = query.trim() !== "" || category.selected.length > 0 || resourceType.selected.length > 0;

  const featured = teacherResources.filter((resource) => resource.featured).slice(0, 4);
  const recentlyAdded = useMemo(
    () =>
      [...teacherResources]
        .sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime())
        .slice(0, 4),
    [],
  );
  const downloadableDocuments = teacherResources
    .filter((resource) => resource.resourceType === "pdf" || resource.resourceType === "word")
    .slice(0, 6);

  const now = new Date();
  const newThisMonth = teacherResources.filter((resource) => {
    const updated = new Date(resource.updatedDate);
    return updated.getFullYear() === now.getFullYear() && updated.getMonth() === now.getMonth();
  }).length;
  const categoryCount = teacherCategories.filter((option) => !option.external).length;

  return (
    <>
      <Breadcrumbs
        variant="dark"
        items={[{ label: "#Tobshaol", path: "/iar-bhunscoil" }, { label: t("tobshaol.teacher.tagline") }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black uppercase tracking-tight text-brand-navy-900 sm:text-5xl">
          {t("tobshaol.teacher.tagline")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-navy-800/70">
          {t("tobshaol.teacher.intro")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teacherCategories.map((option) => (
            <TeacherCategoryCard key={option.id} category={option} onSelect={handleCategorySelect} />
          ))}
        </div>

        <div id={DASHBOARD_ID} className="mt-16 scroll-mt-20 rounded-2xl border border-brand-navy-800/10 bg-teen-surface p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-brand-navy-900 sm:text-3xl">
            {t("tobshaol.teacher.dashboardHeading")}
          </h2>

          <dl className="mt-5 grid grid-cols-3 gap-4 rounded-xl bg-teen-surface-2 p-5 text-center">
            <div>
              <dd className="text-2xl font-black text-teen-pink-600 sm:text-3xl">{teacherResources.length}</dd>
              <dt className="mt-1 text-xs font-bold text-brand-navy-800/50 sm:text-sm">
                {t("tobshaol.teacher.statsResources")}
              </dt>
            </div>
            <div>
              <dd className="text-2xl font-black text-teen-cyan-600 sm:text-3xl">{categoryCount}</dd>
              <dt className="mt-1 text-xs font-bold text-brand-navy-800/50 sm:text-sm">
                {t("tobshaol.teacher.statsCategories")}
              </dt>
            </div>
            <div>
              <dd className="text-2xl font-black text-teen-yellow-600 sm:text-3xl">{newThisMonth}</dd>
              <dt className="mt-1 text-xs font-bold text-brand-navy-800/50 sm:text-sm">
                {t("tobshaol.teacher.statsNewThisMonth")}
              </dt>
            </div>
          </dl>

          <div className="relative mt-6 max-w-lg">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy-800/40" />
            <label htmlFor="teacher-search" className="sr-only">
              {t("common.search")}
            </label>
            <input
              id="teacher-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("common.searchPlaceholder")}
              className="w-full rounded-full border border-brand-navy-800/15 bg-teen-surface-2 py-3 pl-10 pr-4 text-sm text-brand-navy-900 placeholder:text-brand-navy-800/40 focus:border-teen-pink-400"
            />
          </div>

          <div className="mt-6 space-y-5">
            <fieldset>
              <legend className="text-xs font-black uppercase tracking-wide text-brand-navy-800/50">
                {t("tobshaol.filters.category")}
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {teacherCategories
                  .filter((option) => !option.external)
                  .map((option) => (
                    <FilterChip
                      key={option.id}
                      label={lang === "ga" ? option.titleGa : option.titleEn}
                      checked={category.selected.includes(option.id)}
                      onChange={() => category.toggle(option.id)}
                    />
                  ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-black uppercase tracking-wide text-brand-navy-800/50">
                {t("bunscoil.filters.resourceType")}
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {lessonResourceTypes.map((option) => (
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

          {isFiltering ? (
            <div className="mt-8">
              <p className="text-sm font-bold text-brand-navy-800/50" role="status">
                {filtered.length} {t("common.results")}
              </p>
              {filtered.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-brand-navy-800/15 p-8 text-center text-brand-navy-800/50">
                  {t("common.noResults")}
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((resource) => (
                    <TeacherResourceCard key={resource.id} resource={resource} onPreview={setPreviewResource} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <section className="mt-10">
                <h3 className="text-lg font-black uppercase tracking-wide text-brand-navy-800/80">
                  {t("home.featuredResources")}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {featured.map((resource) => (
                    <TeacherResourceCard key={resource.id} resource={resource} onPreview={setPreviewResource} />
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h3 className="text-lg font-black uppercase tracking-wide text-brand-navy-800/80">
                  {t("tobshaol.recentlyAdded")}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {recentlyAdded.map((resource) => (
                    <TeacherResourceCard key={resource.id} resource={resource} onPreview={setPreviewResource} />
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h3 className="text-lg font-black uppercase tracking-wide text-brand-navy-800/80">
                  {t("tobshaol.teacher.downloadableDocuments")}
                </h3>
                <div className="mt-4">
                  <DownloadableDocumentsList documents={downloadableDocuments} />
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={Boolean(previewResource)}
        onClose={() => setPreviewResource(null)}
        title={(lang === "ga" ? previewResource?.titleGa : previewResource?.titleEn) ?? ""}
      >
        {previewResource && <TobshaolResourcePreview resource={previewResource} />}
      </Modal>
    </>
  );
}
