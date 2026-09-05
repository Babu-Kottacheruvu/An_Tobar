import { useLanguage } from "../../i18n/useLanguage";
import type { PrimaryResource } from "../../data/bunscoil/resources";
import { classLevels } from "../../data/bunscoil/classLevels";
import { themes } from "../../data/bunscoil/themes";
import { bunscoilResourceTypes } from "../../data/bunscoil/resourceTypes";
import { DocumentIcon, DownloadIcon } from "../icons";
import { translate } from "../../i18n/translations";

export function PrimaryResourceViewer({ resource }: { resource: PrimaryResource }) {
  const { lang, t } = useLanguage();
  const classLevel = classLevels.find((level) => level.id === resource.classLevel);
  const theme = themes.find((item) => item.id === resource.theme);
  const topic = theme?.topics.find((item) => item.id === resource.topic);
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
          { label: translate("bunscoil.card.yearGroup", lang), value: classLevel?.label[lang] ?? "" },
          { label: translate("bunscoil.card.theme", lang), value: theme?.label[lang] ?? "" },
          { label: translate("bunscoil.filters.topics", lang), value: topic?.label[lang] ?? "" },
          { label: translate("bunscoil.card.author", lang), value: resource.author },
          {
            label: translate("bunscoil.card.updated", lang),
            value: new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
        ],
      },
      `${resource.slug}.pdf`,
      lang,
    );
  };

  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-800">
          <TypeIcon className="h-7 w-7" />
        </span>
        <div>
          <h3 className="text-lg font-black text-brand-navy-900">
            {lang === "ga" ? resource.titleGa : resource.titleEn}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-brand-navy-800/90">
        {resource.description[lang]}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("bunscoil.card.yearGroup")}</dt>
          <dd className="text-brand-navy-800/80">{classLevel?.label[lang]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("bunscoil.card.theme")}</dt>
          <dd className="text-brand-navy-800/80">{theme?.label[lang]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("bunscoil.filters.topics")}</dt>
          <dd className="text-brand-navy-800/80">{topic?.label[lang]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("bunscoil.filters.resourceType")}</dt>
          <dd className="text-brand-navy-800/80">{resourceType?.label[lang]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("bunscoil.card.author")}</dt>
          <dd className="text-brand-navy-800/80">{resource.author}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("bunscoil.card.updated")}</dt>
          <dd className="text-brand-navy-800/80">
            {new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={handleDownload}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-700 px-4 py-3 text-sm font-bold text-white hover:bg-brand-green-800 sm:w-auto"
      >
        <DownloadIcon className="h-5 w-5" />
        {t("common.download")}
      </button>
    </div>
  );
}
