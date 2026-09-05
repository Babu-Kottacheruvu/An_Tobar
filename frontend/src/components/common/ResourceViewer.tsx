import { useLanguage } from "../../i18n/useLanguage";
import type { Resource } from "../../data/resources";
import {
  audienceOptions,
  levelOptions,
  resourceTypeOptions,
  subjectOptions,
} from "../../data/resources";
import { DocumentIcon, DownloadIcon, PlayIcon } from "../icons";

function findLabel(
  list: { id: string; label: { en: string; ga: string } }[],
  id: string,
  lang: "en" | "ga",
) {
  return list.find((item) => item.id === id)?.label[lang] ?? id;
}

export function ResourceViewer({ resource }: { resource: Resource }) {
  const { lang, t } = useLanguage();
  const isVideo = resource.type === "fisean";
  const Icon = isVideo ? PlayIcon : DocumentIcon;

  const handleDownload = async () => {
    const { downloadResourcePdf } = await import("../../utils/downloadResourcePdf");
    downloadResourcePdf(
      {
        kicker: findLabel(resourceTypeOptions, resource.type, lang),
        title: resource.title[lang],
        description: resource.description[lang],
        meta: [
          { label: t("common.level"), value: findLabel(levelOptions, resource.level, lang) },
          { label: t("common.subject"), value: findLabel(subjectOptions, resource.subject, lang) },
          { label: t("common.type"), value: findLabel(resourceTypeOptions, resource.type, lang) },
          {
            label: t("common.audience"),
            value: resource.audience.map((id) => findLabel(audienceOptions, id, lang)).join(", "),
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
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-800">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-brand-navy-900">
            {resource.title[lang]}
          </h3>
          <p className="mt-1 text-sm text-brand-navy-800/80">
            {resource.description[lang]}
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("common.level")}</dt>
          <dd className="text-brand-navy-800/80">
            {findLabel(levelOptions, resource.level, lang)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("common.subject")}</dt>
          <dd className="text-brand-navy-800/80">
            {findLabel(subjectOptions, resource.subject, lang)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("common.type")}</dt>
          <dd className="text-brand-navy-800/80">
            {findLabel(resourceTypeOptions, resource.type, lang)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy-900">{t("common.audience")}</dt>
          <dd className="text-brand-navy-800/80">
            {resource.audience
              .map((id) => findLabel(audienceOptions, id, lang))
              .join(", ")}
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
