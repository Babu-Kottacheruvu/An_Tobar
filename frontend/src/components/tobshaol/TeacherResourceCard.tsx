import { useLanguage } from "../../i18n/useLanguage";
import type { TeacherResource } from "../../data/tobshaol/teacherResources";
import { teacherCategories } from "../../data/tobshaol/teacherCategories";
import { lessonResourceTypes } from "../../data/tobshaol/lessonResourceTypes";
import { DocumentIcon, DownloadIcon, EyeIcon } from "../icons";

interface TeacherResourceCardProps {
  resource: TeacherResource;
  onPreview: (resource: TeacherResource) => void;
}

export function TeacherResourceCard({ resource, onPreview }: TeacherResourceCardProps) {
  const { lang, t } = useLanguage();
  const category = teacherCategories.find((option) => option.id === resource.category);
  const type = lessonResourceTypes.find((option) => option.id === resource.resourceType);
  const TypeIcon = type?.icon ?? DocumentIcon;

  const handleDownload = async () => {
    const { downloadResourcePdf } = await import("../../utils/downloadResourcePdf");
    downloadResourcePdf(
      {
        kicker: type?.label[lang],
        title: lang === "ga" ? resource.titleGa : resource.titleEn,
        description: resource.description[lang],
        meta: [
          category && {
            label: t("tobshaol.filters.category"),
            value: lang === "ga" ? category.titleGa : category.titleEn,
          },
          type && { label: t("bunscoil.filters.resourceType"), value: type.label[lang] },
          { label: t("bunscoil.card.author"), value: resource.author },
          {
            label: t("bunscoil.card.updated"),
            value: new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
        ].filter((row): row is { label: string; value: string } => Boolean(row)),
      },
      `${resource.id}.pdf`,
      lang,
    );
  };

  return (
    <article className="flex h-full flex-col rounded-xl border border-brand-navy-800/10 bg-teen-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teen-cyan-600/10 text-teen-cyan-600">
          <TypeIcon className="h-5 w-5" />
        </span>
        {resource.featured && (
          <span className="rounded-full bg-teen-yellow-400 px-2.5 py-1 text-xs font-black text-brand-navy-900">
            {t("common.featured")}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-black text-brand-navy-900">
        {lang === "ga" ? resource.titleGa : resource.titleEn}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/70">
        {resource.description[lang]}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        {category && (
          <li className="rounded-full bg-brand-navy-800/10 px-2.5 py-1 text-brand-navy-800/80">
            {lang === "ga" ? category.titleGa : category.titleEn}
          </li>
        )}
        {type && <li className="rounded-full bg-brand-navy-800/10 px-2.5 py-1 text-brand-navy-800/80">{type.label[lang]}</li>}
      </ul>

      <p className="mt-3 text-xs font-semibold text-brand-navy-800/40">
        {resource.author} · {t("bunscoil.card.updated")}{" "}
        {new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onPreview(resource)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-teen-pink-600 px-3 py-2.5 text-sm font-bold text-white hover:bg-teen-pink-600/90"
        >
          <EyeIcon className="h-4 w-4" />
          {t("bunscoil.card.view")}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-brand-navy-800/20 px-3 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-800/5"
        >
          <DownloadIcon className="h-4 w-4" />
          {t("common.download")}
        </button>
      </div>
    </article>
  );
}
