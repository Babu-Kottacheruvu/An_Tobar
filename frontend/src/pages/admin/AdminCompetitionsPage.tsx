import { useLanguage } from "../../i18n/useLanguage";
import {
  competitions,
  getCompetitionStatus,
  type Competition,
  type CompetitionStatus,
} from "../../data/competitions";
import { AdminTable, type AdminTableColumn } from "../../components/admin/AdminTable";

const statusLabel: Record<CompetitionStatus, { en: string; ga: string }> = {
  open: { en: "Open", ga: "Oscailte" },
  "closing-soon": { en: "Closing Soon", ga: "Ag Dúnadh go Luath" },
  closed: { en: "Closed", ga: "Dúnta" },
};

export function AdminCompetitionsPage() {
  const { lang, t } = useLanguage();

  const columns: AdminTableColumn<Competition>[] = [
    { key: "title", header: t("admin.title"), render: (row) => row.title[lang] },
    { key: "deadline", header: t("common.deadline"), render: (row) => row.deadline },
    {
      key: "status",
      header: t("admin.status"),
      render: (row) => statusLabel[getCompetitionStatus(row.deadline)][lang],
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

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">
          {t("admin.competitions")}
        </h1>
        <button
          type="button"
          className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("admin.addNew")}
        </button>
      </div>
      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={competitions}
          getRowId={(row) => row.id}
          caption={t("admin.competitions")}
        />
      </div>
    </div>
  );
}
