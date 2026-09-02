import { useLanguage } from "../../../i18n/useLanguage";
import { newsCategoryOptions } from "../../../data/admin/newsManagement";
import { NewsIcon } from "../../icons";

interface NewsPreviewCardProps {
  titleGa: string;
  titleEn: string;
  summaryGa: string;
  summaryEn: string;
  categories: string[];
}

export function NewsPreviewCard({ titleGa, titleEn, summaryGa, summaryEn, categories }: NewsPreviewCardProps) {
  const { lang, t } = useLanguage();
  const categoryLabels = categories
    .map((id) => newsCategoryOptions.find((option) => option.id === id))
    .filter((option): option is NonNullable<typeof option> => Boolean(option));

  return (
    <article className="mx-auto max-w-sm overflow-hidden rounded-lg border border-brand-navy-800/12 bg-white shadow-sm">
      <div className="flex h-32 items-center justify-center bg-linear-to-br from-brand-navy-700 to-brand-navy-900 text-white">
        <NewsIcon className="h-10 w-10 text-brand-gold-400" />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5">
          {categoryLabels.map((option) => (
            <span key={option.id} className="rounded-full bg-brand-green-50 px-2 py-0.5 text-xs font-bold text-brand-green-800">
              {option.label[lang]}
            </span>
          ))}
        </div>
        <h3 className="mt-2 text-base font-bold text-brand-navy-900">
          {(lang === "ga" ? titleGa : titleEn) || "—"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy-800/80">
          {lang === "ga" ? summaryGa || "—" : summaryEn || "—"}
        </p>
        <span className="mt-3 inline-block text-sm font-bold text-brand-green-800">{t("common.readMore")} →</span>
      </div>
    </article>
  );
}
