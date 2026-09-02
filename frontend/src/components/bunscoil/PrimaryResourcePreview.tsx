import { forwardRef, type ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import type { PrimaryResource } from "../../data/bunscoil/resources";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentIcon,
  DownloadIcon,
  PictureIcon,
  PlayIcon,
  PresentationIcon,
  SoundIcon,
} from "../icons";

interface PrimaryResourcePreviewProps {
  resource: PrimaryResource;
}

function PreviewShell({
  toneClass,
  children,
}: {
  toneClass: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex min-h-70 flex-col items-center justify-center gap-4 rounded-xl border-2 border-brand-navy-800/10 p-6 sm:min-h-90 ${toneClass}`}
    >
      {children}
    </div>
  );
}

export const PrimaryResourcePreview = forwardRef<HTMLDivElement, PrimaryResourcePreviewProps>(
  function PrimaryResourcePreview({ resource }, ref) {
    const { lang, t } = useLanguage();

    let preview: ReactNode;

    if (resource.resourceType === "pdf") {
      preview = (
        <PreviewShell toneClass="bg-brand-navy-50">
          <div className="flex w-full max-w-sm items-center justify-between rounded-t-md bg-brand-navy-800 px-4 py-2 text-white">
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-bold">
              {lang === "ga" ? resource.titleGa : resource.titleEn}.pdf
            </span>
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-3 rounded-b-md bg-white px-6 py-10 shadow-inner">
            <DocumentIcon className="h-16 w-16 text-brand-navy-800/30" />
            <div className="h-2 w-4/5 rounded bg-brand-navy-800/10" />
            <div className="h-2 w-3/5 rounded bg-brand-navy-800/10" />
          </div>
        </PreviewShell>
      );
    } else if (resource.resourceType === "powerpoint") {
      preview = (
        <PreviewShell toneClass="bg-brand-gold-50">
          <div className="flex w-full max-w-md flex-col gap-3 rounded-md border-2 border-brand-gold-400 bg-white p-6 shadow">
            <PresentationIcon className="h-8 w-8 text-brand-gold-600" />
            <div className="h-3 w-2/3 rounded bg-brand-navy-800/15" />
            <div className="h-2 w-full rounded bg-brand-navy-800/10" />
            <div className="h-2 w-4/5 rounded bg-brand-navy-800/10" />
            <div className="h-2 w-3/5 rounded bg-brand-navy-800/10" />
          </div>
        </PreviewShell>
      );
    } else if (resource.resourceType === "videos") {
      preview = (
        <PreviewShell toneClass="bg-linear-to-br from-brand-navy-800 to-brand-navy-900">
          <button
            type="button"
            aria-label={t("bunscoil.card.view")}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-brand-navy-900 shadow-lg transition-transform hover:scale-105"
          >
            <PlayIcon className="h-9 w-9" />
          </button>
          <p className="text-sm font-semibold text-white/80">
            {lang === "ga" ? resource.titleGa : resource.titleEn}
          </p>
        </PreviewShell>
      );
    } else if (resource.resourceType === "sound") {
      preview = (
        <PreviewShell toneClass="bg-brand-green-50">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-700 text-white">
            <SoundIcon className="h-8 w-8" />
          </span>
          <div className="flex w-full max-w-sm items-center gap-3 rounded-full bg-white px-4 py-3 shadow">
            <button
              type="button"
              aria-label={t("bunscoil.card.view")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-white"
            >
              <PlayIcon className="h-4 w-4" />
            </button>
            <div className="h-1.5 flex-1 rounded-full bg-brand-navy-800/10">
              <div className="h-1.5 w-1/3 rounded-full bg-brand-green-700" />
            </div>
            <span className="text-xs font-semibold text-brand-navy-800/60">0:00 / 2:14</span>
          </div>
        </PreviewShell>
      );
    } else if (resource.resourceType === "pictures") {
      preview = (
        <PreviewShell toneClass="bg-brand-gold-50">
          <PictureIcon className="h-20 w-20 text-brand-gold-500" />
        </PreviewShell>
      );
    } else {
      preview = (
        <PreviewShell toneClass="bg-brand-navy-50">
          <DocumentIcon className="h-20 w-20 text-brand-navy-800/30" />
        </PreviewShell>
      );
    }

    return (
      <div ref={ref} tabIndex={-1}>
        {preview}
        <p className="mt-3 flex items-center gap-2 text-xs text-brand-navy-800/60">
          <DownloadIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t("bunscoil.detail.previewUnavailable")}
        </p>
      </div>
    );
  },
);
