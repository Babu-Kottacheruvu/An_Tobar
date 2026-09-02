import { useLanguage } from "../../i18n/useLanguage";
import type { TeacherResource } from "../../data/tobshaol/teacherResources";
import { lessonResourceTypes } from "../../data/tobshaol/lessonResourceTypes";
import { DocumentIcon, DownloadIcon } from "../icons";

export function DownloadableDocumentsList({ documents }: { documents: TeacherResource[] }) {
  const { lang, t } = useLanguage();

  return (
    <ul className="divide-y divide-white/10 rounded-xl border border-white/10 bg-teen-surface">
      {documents.map((doc) => {
        const type = lessonResourceTypes.find((option) => option.id === doc.resourceType);
        const TypeIcon = type?.icon ?? DocumentIcon;
        return (
          <li key={doc.id} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-teen-cyan-400">
              <TypeIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                {lang === "ga" ? doc.titleGa : doc.titleEn}
              </p>
              <p className="text-xs font-semibold text-white/40">
                {type?.label[lang]} · {doc.fileSize}
              </p>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/20 px-3 py-2 text-xs font-bold text-white hover:bg-white/10"
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
