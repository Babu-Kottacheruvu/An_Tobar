import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { PrimaryResource } from "../../data/bunscoil/resources";
import { classLevels } from "../../data/bunscoil/classLevels";
import { themes } from "../../data/bunscoil/themes";
import { bunscoilResourceTypes } from "../../data/bunscoil/resourceTypes";
import { DocumentIcon, DownloadIcon, EyeIcon, HeartIcon } from "../icons";
import { translate } from "../../i18n/translations";

interface PrimaryResourceCardProps {
  resource: PrimaryResource;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
  onView: (resource: PrimaryResource) => void;
}

export function PrimaryResourceCard({
  resource,
  isFavourite,
  onToggleFavourite,
  onView,
}: PrimaryResourceCardProps) {
  const { lang, t } = useLanguage();
  const classLevel = classLevels.find((level) => level.id === resource.classLevel);
  const theme = themes.find((item) => item.id === resource.theme);
  const resourceType = bunscoilResourceTypes.find((item) => item.id === resource.resourceType);
  const TypeIcon = resourceType?.icon ?? DocumentIcon;

  const handleDownload = async () => {
    const { downloadResourcePdf } = await import("../../utils/downloadResourcePdf");
    downloadResourcePdf(
      {
        kicker: resourceType?.label[lang],
        title: lang === "ga" ? resource.titleGa : resource.titleEn,
        description: resource.description[lang],
        meta: [
          classLevel && { label: translate("bunscoil.filters.classLevel", lang), value: classLevel.label[lang] },
          theme && { label: translate("bunscoil.card.theme", lang), value: theme.label[lang] },
          { label: translate("bunscoil.card.author", lang), value: resource.author },
        ].filter((row): row is { label: string; value: string } => Boolean(row)),
      },
      `${resource.slug}.pdf`,
      lang,
    );
  };

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-brand-navy-800/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between gap-2 bg-brand-green-50 px-5 py-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-green-800 shadow-sm">
          <TypeIcon className="h-6 w-6" />
        </span>
        <div className="relative z-10 flex items-center gap-2">
          {resource.isNew && (
            <span className="rounded-full bg-brand-gold-400 px-2.5 py-1 text-xs font-black text-brand-navy-900">
              {t("common.new")}
            </span>
          )}
          <button
            type="button"
            onClick={() => onToggleFavourite(resource.id)}
            aria-pressed={isFavourite}
            aria-label={isFavourite ? t("bunscoil.card.removeFavourite") : t("bunscoil.card.addFavourite")}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              isFavourite
                ? "bg-red-100 text-red-600"
                : "bg-white text-brand-navy-800/40 hover:text-red-500"
            }`}
          >
            <HeartIcon className="h-5 w-5" fill={isFavourite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-black text-brand-navy-900">
          <Link to={`/bunscoil/acmhainni/${resource.slug}`} className="rounded after:absolute after:inset-0">
            {lang === "ga" ? resource.titleGa : resource.titleEn}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
          {resource.description[lang]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          {classLevel && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
              {classLevel.label[lang]}
            </li>
          )}
          {theme && (
            <li className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-brand-gold-600">
              {theme.label[lang]}
            </li>
          )}
          {resourceType && (
            <li className="rounded-full bg-brand-green-50 px-2.5 py-1 text-brand-green-800">
              {resourceType.label[lang]}
            </li>
          )}
        </ul>

        <p className="mt-3 text-xs font-semibold text-brand-navy-800/50">
          {resource.author} · {t("bunscoil.card.updated")}{" "}
          {new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="relative z-10 mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onView(resource)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand-green-700 px-3 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            <EyeIcon className="h-4 w-4" />
            {t("bunscoil.card.view")}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <DownloadIcon className="h-4 w-4" />
            {t("common.download")}
          </button>
        </div>
      </div>
    </article>
  );
}
