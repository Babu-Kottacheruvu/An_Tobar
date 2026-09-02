import { useLanguage } from "../../../i18n/useLanguage";
import type { MediaAsset } from "../../../data/admin/mediaLibrary";
import { mediaTypeOptions } from "../../../data/admin/mediaLibrary";
import { mediaTypeStyles } from "./mediaTypeStyles";
import { CloseIcon } from "../../icons";

interface MediaCardProps {
  asset: MediaAsset;
  selected: boolean;
  onToggleSelect: () => void;
  onPreview: () => void;
  onCopyReference: () => void;
  onDelete: () => void;
}

export function MediaCard({ asset, selected, onToggleSelect, onPreview, onCopyReference, onDelete }: MediaCardProps) {
  const { lang, t } = useLanguage();
  const { icon: Icon, tile } = mediaTypeStyles[asset.type];
  const typeLabel = mediaTypeOptions.find((option) => option.id === asset.type)?.label[lang];

  return (
    <li className="relative rounded-lg border border-brand-navy-800/12 bg-white p-3">
      <label className="absolute left-3 top-3 z-10 flex h-5 w-5 items-center justify-center">
        <span className="sr-only">
          {asset.filename} - {t("common.filters")}
        </span>
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelect}
          className="h-5 w-5 rounded accent-brand-green-700"
        />
      </label>

      <button
        type="button"
        onClick={onPreview}
        aria-label={`${t("admin.media.preview")}: ${asset.filename}`}
        className={`flex h-24 w-full items-center justify-center rounded-md ${tile}`}
      >
        <Icon className="h-8 w-8" />
      </button>

      <p className="mt-2 truncate text-sm font-bold text-brand-navy-900" title={asset.filename}>
        {asset.filename}
      </p>
      <p className="text-xs text-brand-navy-800/50">
        {typeLabel} · {asset.fileSize}
      </p>
      <p className="text-xs text-brand-navy-800/50">
        {t("admin.media.uploadedDate")}:{" "}
        {new Date(asset.uploadedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="mt-1 truncate text-xs text-brand-navy-800/60" title={asset.usedBy.join(", ")}>
        {t("admin.media.usedBy")}: {asset.usedBy.length > 0 ? asset.usedBy.join(", ") : t("admin.media.notUsed")}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onCopyReference}
          className="flex-1 rounded-md border border-brand-navy-800/25 px-2 py-1.5 text-xs font-bold text-brand-navy-900 hover:bg-brand-navy-50"
        >
          {t("admin.media.copyReference")}
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`${t("admin.delete")}: ${asset.filename}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-200 text-red-700 hover:bg-red-50"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
