import { useLanguage } from "../../i18n/useLanguage";
import type { TeacherResource } from "../../data/tobshaol/teacherResources";
import { lessonResourceTypes } from "../../data/tobshaol/lessonResourceTypes";
import { DocumentIcon, DownloadIcon } from "../icons";

export function DownloadableDocumentsList({ documents }: { documents: TeacherResource[] }) {
  const { lang, t } = useLanguage();

  return (
    <ul className="divide-y divide-brand-navy-800/10 rounded-xl border border-brand-navy-800/10 bg-teen-surface">
      {documents.map((doc) => {
        const type = lessonResourceTypes.find((option) => option.id === doc.resourceType);
        const TypeIcon = type?.icon ?? DocumentIcon;
        return (
          <li key={doc.id} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teen-cyan-600/10 text-teen-cyan-600">
              <TypeIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-brand-navy-900">
                {lang === "ga" ? doc.titleGa : doc.titleEn}
              </p>
              <p className="text-xs font-semibold text-brand-navy-800/40">
                {type?.label[lang]} · {doc.fileSize}
              </p>
            </div>
            <button
              type="button"
              onClick={async () => {
                const { downloadResourcePdf } = await import("../../utils/downloadResourcePdf");
                downloadResourcePdf(
                  {
                    kicker: type?.label[lang],
                    title: lang === "ga" ? doc.titleGa : doc.titleEn,
                    description: doc.description[lang],
                    meta: [
                      type && { label: t("bunscoil.filters.resourceType"), value: type.label[lang] },
                      { label: t("bunscoil.detail.fileSize"), value: doc.fileSize },
                    ].filter((row): row is { label: string; value: string } => Boolean(row)),
                  },
                  `${doc.id}.pdf`,
                  lang,
                );
              }}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-brand-navy-800/20 px-3 py-2 text-xs font-bold text-brand-navy-900 hover:bg-brand-navy-800/5"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              {t("common.download")}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
