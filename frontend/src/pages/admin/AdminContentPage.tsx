import { useLanguage } from "../../i18n/useLanguage";
import { globalSearchResults, type GlobalResult } from "../../data/globalSearch";
import { draftContent, type DraftContentItem } from "../../data/admin/draftContent";
import { AdminTable, type AdminTableColumn } from "../../components/admin/AdminTable";

const SECTION_LABEL: Record<GlobalResult["source"], { en: string; ga: string }> = {
  main: { en: "Main site", ga: "Príomhshuíomh" },
  bunscoil: { en: "Bunscoil", ga: "Bunscoil" },
  tobshaol: { en: "#Tobshaol", ga: "#Tobshaol" },
  teacher: { en: "Teachers", ga: "Múinteoirí" },
};

const PREVIEW_LIMIT = 20;

export function AdminContentPage() {
  const { lang, t } = useLanguage();
  const published = globalSearchResults.slice(0, PREVIEW_LIMIT);

  const publishedColumns: AdminTableColumn<GlobalResult>[] = [
    { key: "title", header: t("admin.title"), render: (row) => (lang === "ga" ? row.titleGa : row.titleEn) },
    {
      key: "type",
      header: t("admin.content.type"),
      render: (row) => row.resourceType,
    },
    {
      key: "section",
      header: t("admin.content.section"),
      render: (row) => SECTION_LABEL[row.source][lang],
    },
    {
      key: "status",
      header: t("admin.status"),
      render: () => (
        <span className="rounded-full bg-brand-green-50 px-2.5 py-1 text-xs font-bold text-brand-green-800">
          {t("admin.published")}
        </span>
      ),
    },
    {
      key: "actions",
      header: t("admin.actions"),
      render: () => (
        <div className="flex gap-3">
          <button type="button" className="font-semibold text-brand-green-800 hover:underline">
            {t("admin.edit")}
          </button>
          <button type="button" className="font-semibold text-red-700 hover:underline">
            {t("admin.delete")}
          </button>
        </div>
      ),
    },
  ];

  const draftColumns: AdminTableColumn<DraftContentItem>[] = [
    { key: "title", header: t("admin.title"), render: (row) => (lang === "ga" ? row.titleGa : row.titleEn) },
    { key: "section", header: t("admin.content.section"), render: (row) => row.section[lang] },
    { key: "updated", header: t("bunscoil.card.updated"), render: (row) => row.updatedDate },
    {
      key: "status",
      header: t("admin.status"),
      render: () => (
        <span className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-xs font-bold text-brand-gold-600">
          {t("admin.draft")}
        </span>
      ),
    },
    {
      key: "actions",
      header: t("admin.actions"),
      render: () => (
        <button type="button" className="font-semibold text-brand-green-800 hover:underline">
          {t("admin.edit")}
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.content")}</h1>
      <p className="mt-1 text-sm text-brand-navy-800/70">{t("admin.content.intro")}</p>

      <p className="mt-6 text-xs font-semibold text-brand-navy-800/50">
        {published.length} / {globalSearchResults.length}
      </p>
      <div className="mt-2">
        <AdminTable columns={publishedColumns} rows={published} getRowId={(row) => row.id} caption={t("admin.content")} />
      </div>

      <h2 className="mt-10 text-lg font-bold text-brand-navy-900">{t("admin.content.pendingReview")}</h2>
      <div className="mt-3">
        <AdminTable
          columns={draftColumns}
          rows={draftContent}
          getRowId={(row) => row.id}
          caption={t("admin.content.pendingReview")}
        />
      </div>
    </div>
  );
}
