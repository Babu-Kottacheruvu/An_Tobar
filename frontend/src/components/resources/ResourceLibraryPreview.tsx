import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import type { GlobalResourceType } from "../../data/globalSearch";
import { DocumentIcon, GridIcon, PictureIcon, PlayIcon, PresentationIcon, SoundIcon } from "../icons";

export function ResourceLibraryPreview({ resourceType }: { resourceType: GlobalResourceType }) {
  const { t } = useLanguage();
  let body: ReactNode;

  if (resourceType === "video") {
    body = (
      <div className="flex min-h-55 items-center justify-center rounded-lg bg-linear-to-br from-brand-navy-800 to-brand-navy-900">
        <button
          type="button"
          aria-label={t("bunscoil.card.view")}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-navy-900 shadow-lg transition-transform hover:scale-105"
        >
          <PlayIcon className="h-7 w-7" />
        </button>
      </div>
    );
  } else if (resourceType === "audio") {
    body = (
      <div className="flex min-h-55 flex-col items-center justify-center gap-4 rounded-lg bg-brand-green-50">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-700 text-white">
          <SoundIcon className="h-7 w-7" />
        </span>
        <div className="flex w-56 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
          <PlayIcon className="h-4 w-4 shrink-0 text-brand-green-700" />
          <div className="h-1.5 flex-1 rounded-full bg-brand-navy-800/10">
            <div className="h-1.5 w-1/4 rounded-full bg-brand-green-700" />
          </div>
        </div>
      </div>
    );
  } else if (resourceType === "presentation") {
    body = (
      <div className="flex min-h-55 flex-col justify-center gap-3 rounded-lg bg-brand-gold-50 p-8">
        <PresentationIcon className="h-8 w-8 text-brand-gold-600" />
        <div className="h-3 w-2/3 rounded bg-brand-navy-800/15" />
        <div className="h-2 w-full rounded bg-brand-navy-800/10" />
        <div className="h-2 w-4/5 rounded bg-brand-navy-800/10" />
      </div>
    );
  } else if (resourceType === "pictures") {
    body = (
      <div className="flex min-h-55 items-center justify-center rounded-lg bg-brand-gold-50">
        <PictureIcon className="h-14 w-14 text-brand-gold-600" />
      </div>
    );
  } else if (resourceType === "game") {
    body = (
      <div className="flex min-h-55 items-center justify-center rounded-lg bg-brand-green-50">
        <GridIcon className="h-14 w-14 text-brand-green-700" />
      </div>
    );
  } else {
    body = (
      <div className="flex min-h-55 flex-col items-center justify-center gap-3 rounded-lg bg-brand-navy-50 p-8">
        <DocumentIcon className="h-14 w-14 text-brand-navy-800/30" />
        <div className="h-2 w-4/5 rounded bg-brand-navy-800/10" />
        <div className="h-2 w-3/5 rounded bg-brand-navy-800/10" />
      </div>
    );
  }

  return (
    <div>
      {body}
      <p className="mt-3 text-xs text-brand-navy-800/50">{t("bunscoil.detail.previewUnavailable")}</p>
    </div>
  );
}
