import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { initialNewsArticles, newsCategoryOptions, type NewsArticleRecord } from "../../data/admin/newsManagement";
import { AdminTable, type AdminTableColumn } from "../../components/admin/AdminTable";
import { NewsStatusBadge } from "../../components/admin/news-manager/NewsStatusBadge";
import { NewsFormDrawer } from "../../components/admin/news-manager/NewsFormDrawer";
import { NewsPreviewCard } from "../../components/admin/news-manager/NewsPreviewCard";
import { Modal } from "../../components/common/Modal";

const AUDIENCE_IDS = new Set(["primary", "secondary", "teachers", "parents", "learners"]);
const CONTENT_CATEGORY_IDS = new Set(["events", "announcements"]);

function labelsFor(ids: string[], lang: "en" | "ga") {
  return ids
    .map((id) => newsCategoryOptions.find((option) => option.id === id)?.label[lang])
    .filter(Boolean)
    .join(", ");
}

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `news-${Date.now()}`;
}

export function AdminNewsPage() {
  const { lang, t } = useLanguage();
  const [articles, setArticles] = useState<NewsArticleRecord[]>(initialNewsArticles);
  const [formOpen, setFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticleRecord | undefined>(undefined);
  const [viewingArticle, setViewingArticle] = useState<NewsArticleRecord | null>(null);

  const openAdd = () => {
    setEditingArticle(undefined);
    setFormOpen(true);
  };
  const openEdit = (article: NewsArticleRecord) => {
    setEditingArticle(article);
    setFormOpen(true);
  };

  const handleSave = (draft: Omit<NewsArticleRecord, "id" | "publishedDate" | "updatedDate">) => {
    const today = new Date().toISOString().slice(0, 10);
    if (editingArticle) {
      setArticles((current) =>
        current.map((item) =>
          item.id === editingArticle.id
            ? {
                ...item,
                ...draft,
                updatedDate: today,
                publishedDate: draft.status === "published" && !item.publishedDate ? today : item.publishedDate,
              }
            : item,
        ),
      );
    } else {
      setArticles((current) => [
        ...current,
        {
          ...draft,
          id: makeId(),
          updatedDate: today,
          publishedDate: draft.status === "published" ? today : "",
        },
      ]);
    }
    setFormOpen(false);
  };

  const handleDelete = (article: NewsArticleRecord) => {
    if (!window.confirm(`${t("admin.delete")}: ${lang === "ga" ? article.titleGa : article.titleEn}?`)) return;
    setArticles((current) => current.filter((item) => item.id !== article.id));
  };

  const columns: AdminTableColumn<NewsArticleRecord>[] = [
    {
      key: "title",
      header: t("admin.title"),
      render: (row) => (
        <div>
          <p className="font-semibold text-brand-navy-900">
            {lang === "ga" ? row.titleGa : row.titleEn}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: t("admin.news.category"),
      render: (row) => labelsFor(row.categories.filter((id) => CONTENT_CATEGORY_IDS.has(id)), lang) || "—",
    },
    {
      key: "audience",
      header: t("admin.news.audience"),
      render: (row) => labelsFor(row.categories.filter((id) => AUDIENCE_IDS.has(id)), lang) || "—",
    },
    { key: "status", header: t("admin.status"), render: (row) => <NewsStatusBadge status={row.status} /> },
    { key: "published", header: t("admin.news.publishedDate"), render: (row) => row.publishedDate || "—" },
    { key: "updated", header: t("bunscoil.card.updated"), render: (row) => row.updatedDate },
    {
      key: "actions",
      header: t("admin.actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={() => setViewingArticle(row)} className="font-semibold text-brand-green-800 hover:underline">
            {t("admin.res.view")}
          </button>
          <button type="button" onClick={() => openEdit(row)} className="font-semibold text-brand-green-800 hover:underline">
            {t("admin.edit")}
          </button>
          <button type="button" onClick={() => handleDelete(row)} className="font-semibold text-red-700 hover:underline">
            {t("admin.delete")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.news")}</h1>
        <button
          type="button"
          onClick={openAdd}
          className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("admin.news.addArticle")}
        </button>
      </div>

      <div className="mt-6">
        <AdminTable columns={columns} rows={articles} getRowId={(row) => row.id} caption={t("admin.news")} />
      </div>

      <NewsFormDrawer isOpen={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} initialArticle={editingArticle} />

      <Modal
        isOpen={Boolean(viewingArticle)}
        onClose={() => setViewingArticle(null)}
        title={(lang === "ga" ? viewingArticle?.titleGa : viewingArticle?.titleEn) ?? ""}
      >
        {viewingArticle && (
          <NewsPreviewCard
            titleGa={viewingArticle.titleGa}
            titleEn={viewingArticle.titleEn}
            summaryGa={viewingArticle.summaryGa}
            summaryEn={viewingArticle.summaryEn}
            categories={viewingArticle.categories}
          />
        )}
      </Modal>
    </div>
  );
}
