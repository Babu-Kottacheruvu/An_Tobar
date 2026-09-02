import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import type { MediaType } from "../../data/tobghaeltachtItems";
import { DocumentIcon, GridIcon, PlayIcon, SoundIcon } from "../icons";

export function MultimediaPreview({ mediaType }: { mediaType: MediaType }) {
  const { t } = useLanguage();
  let body: ReactNode;

  if (mediaType === "video") {
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
  } else if (mediaType === "audio") {
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
  } else if (mediaType === "activity") {
    body = (
      <div className="flex min-h-55 items-center justify-center rounded-lg bg-brand-gold-50">
        <GridIcon className="h-14 w-14 text-brand-gold-600" />
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
