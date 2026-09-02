import { useId, useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { NewsArticleRecord } from "../../../data/admin/newsManagement";
import { newsCategoryOptions } from "../../../data/admin/newsManagement";
import { FilterDrawer } from "../../common/FilterDrawer";
import { TextField, TextAreaField } from "../../forms/FormField";
import { NewsPreviewCard } from "./NewsPreviewCard";

type DraftArticle = Omit<NewsArticleRecord, "id" | "publishedDate" | "updatedDate">;

const EMPTY: DraftArticle = {
  titleGa: "",
  titleEn: "",
  summaryGa: "",
  summaryEn: "",
  bodyGa: "",
  bodyEn: "",
  imageAlt: "",
  categories: [],
  status: "draft",
  scheduledDate: "",
  author: "",
};

interface NewsFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: DraftArticle) => void;
  initialArticle?: NewsArticleRecord;
}

export function NewsFormDrawer({ isOpen, onClose, onSave, initialArticle }: NewsFormDrawerProps) {
  const { lang, t } = useLanguage();
  const imageInputId = useId();
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const [form, setForm] = useState<DraftArticle>(EMPTY);
  const [imageName, setImageName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [wasOpen, setWasOpen] = useState(false);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setForm(initialArticle ?? EMPTY);
      setImageName(initialArticle?.imageAlt ?? null);
      setErrors({});
      setStep("edit");
    }
  }

  const update = <K extends keyof DraftArticle>(key: K, value: DraftArticle[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleCategory = (id: string) => {
    update("categories", form.categories.includes(id) ? form.categories.filter((c) => c !== id) : [...form.categories, id]);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.titleGa.trim()) nextErrors.titleGa = t("admin.res.titleGaRequired");
    if (!form.titleEn.trim()) nextErrors.titleEn = t("admin.res.titleEnRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePreview = () => {
    if (validate()) setStep("preview");
  };

  const handleSaveDraft = () => {
    if (!validate()) return;
    onSave({ ...form, status: "draft" });
  };

  const handlePublish = () => {
    if (!validate()) return;
    onSave({ ...form, status: form.status === "scheduled" && form.scheduledDate ? "scheduled" : "published" });
  };

  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose} title={initialArticle ? t("admin.edit") : t("admin.news.addArticle")}>
      {step === "edit" ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <TextField label={t("admin.news.titleGa")} value={form.titleGa} onChange={(v) => update("titleGa", v)} required error={errors.titleGa} />
          <TextField label={t("admin.news.titleEn")} value={form.titleEn} onChange={(v) => update("titleEn", v)} required error={errors.titleEn} />
          <TextAreaField label={t("admin.news.summaryGa")} value={form.summaryGa} onChange={(v) => update("summaryGa", v)} rows={2} />
          <TextAreaField label={t("admin.news.summaryEn")} value={form.summaryEn} onChange={(v) => update("summaryEn", v)} rows={2} />
          <TextAreaField label={t("admin.news.bodyGa")} value={form.bodyGa} onChange={(v) => update("bodyGa", v)} rows={5} />
          <TextAreaField label={t("admin.news.bodyEn")} value={form.bodyEn} onChange={(v) => update("bodyEn", v)} rows={5} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor={imageInputId} className="text-sm font-bold text-brand-navy-900">
              {t("admin.news.featuredImage")}
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor={imageInputId}
                className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
              >
                {t("admin.res.chooseFiles")}
              </label>
              <input
                id={imageInputId}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => setImageName(event.target.files?.[0]?.name ?? null)}
              />
              <p className="text-sm text-brand-navy-800/70">{imageName ?? t("admin.media.noFileChosen")}</p>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-bold text-brand-navy-900">{t("admin.news.category")}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {newsCategoryOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
                    form.categories.includes(option.id)
                      ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
                      : "border-brand-navy-800/15 text-brand-navy-800/70"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.categories.includes(option.id)}
                    onChange={() => toggleCategory(option.id)}
                    className="h-4 w-4 accent-brand-green-700"
                  />
                  {option.label[lang]}
                </label>
              ))}
            </div>
          </fieldset>

          <TextField label={t("admin.res.authorProvider")} value={form.author} onChange={(v) => update("author", v)} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="news-status" className="text-sm font-bold text-brand-navy-900">
                {t("admin.news.publishStatus")}
              </label>
              <select
                id="news-status"
                value={form.status}
                onChange={(event) => update("status", event.target.value as DraftArticle["status"])}
                className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
              >
                <option value="draft">{t("admin.news.statusDraft")}</option>
                <option value="scheduled">{t("admin.news.statusScheduled")}</option>
                <option value="published">{t("admin.news.statusPublished")}</option>
              </select>
            </div>
            {form.status === "scheduled" && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="news-scheduled-date" className="text-sm font-bold text-brand-navy-900">
                  {t("admin.news.scheduledDate")}
                </label>
                <input
                  id="news-scheduled-date"
                  type="date"
                  value={form.scheduledDate}
                  onChange={(event) => update("scheduledDate", event.target.value)}
                  className="rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
                />
              </div>
            )}
          </div>

          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900"
            >
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="rounded-md border border-brand-green-700 px-4 py-2.5 text-sm font-bold text-brand-green-800 hover:bg-brand-green-50"
            >
              {t("admin.res.preview")}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
            >
              {t("admin.news.saveDraft")}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
            >
              {t("admin.news.publish")}
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <NewsPreviewCard
            titleGa={form.titleGa}
            titleEn={form.titleEn}
            summaryGa={form.summaryGa}
            summaryEn={form.summaryEn}
            categories={form.categories}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep("edit")}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900"
            >
              {t("admin.res.backToEdit")}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
            >
              {t("admin.news.saveDraft")}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
            >
              {t("admin.news.publish")}
            </button>
          </div>
        </div>
      )}
    </FilterDrawer>
  );
}
