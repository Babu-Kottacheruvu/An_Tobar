import { useEffect, useId, useMemo, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import {
  initialMediaAssets,
  mediaFolders,
  mediaTypeOptions,
  type MediaAsset,
} from "../../data/admin/mediaLibrary";
import { MediaCard } from "../../components/admin/media-library/MediaCard";
import { MediaPreviewModal } from "../../components/admin/media-library/MediaPreviewModal";
import { SearchIcon, UploadIcon } from "../../components/icons";

function useMultiToggle() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  return { selected, setSelected, toggle };
}

export function AdminMediaLibraryPage() {
  const { lang, t } = useLanguage();
  const uploadInputId = useId();
  const [assets, setAssets] = useState<MediaAsset[]>(initialMediaAssets);
  const [query, setQuery] = useState("");
  const folder = useMultiToggle();
  const fileType = useMultiToggle();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [uploadedNotice, setUploadedNotice] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadedNotice && !copiedNotice) return;
    const timeout = window.setTimeout(() => {
      setUploadedNotice(null);
      setCopiedNotice(null);
    }, 3000);
    return () => window.clearTimeout(timeout);
  }, [uploadedNotice, copiedNotice]);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return assets.filter((asset) => {
      if (folder.selected.length && !folder.selected.includes(asset.folder)) return false;
      if (fileType.selected.length && !fileType.selected.includes(asset.type)) return false;
      if (trimmed && !asset.filename.toLowerCase().includes(trimmed)) return false;
      return true;
    });
  }, [assets, query, folder.selected, fileType.selected]);

  const allVisibleSelected = filtered.length > 0 && filtered.every((asset) => selectedIds.includes(asset.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((current) => current.filter((id) => !filtered.some((asset) => asset.id === id)));
    } else {
      setSelectedIds((current) => [...new Set([...current, ...filtered.map((asset) => asset.id)])]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`${t("admin.delete")}: ${selectedIds.length} ${t("admin.media.selected")}?`)) return;
    setAssets((current) => current.filter((asset) => !selectedIds.includes(asset.id)));
    setSelectedIds([]);
  };

  const handleDeleteOne = (asset: MediaAsset) => {
    if (!window.confirm(`${t("admin.delete")}: ${asset.filename}?`)) return;
    setAssets((current) => current.filter((item) => item.id !== asset.id));
    setSelectedIds((current) => current.filter((id) => id !== asset.id));
  };

  const handleCopyReference = async (asset: MediaAsset) => {
    try {
      await navigator.clipboard.writeText(`/media/${asset.folder}/${asset.filename}`);
      setCopiedNotice(asset.filename);
    } catch {
      // Clipboard API unavailable - non-critical, fail silently
    }
  };

  const handleUpload = (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    setUploadedNotice(file.name);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.mediaLibrary")}</h1>
          <p className="mt-1 text-sm text-brand-navy-800/70">{t("admin.media.intro")}</p>
        </div>
        <div>
          <label
            htmlFor={uploadInputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            <UploadIcon className="h-4 w-4" />
            {t("admin.media.upload")}
          </label>
          <input
            id={uploadInputId}
            type="file"
            className="sr-only"
            onChange={(event) => handleUpload(event.target.files)}
          />
          {uploadedNotice && (
            <p role="status" className="mt-1.5 text-right text-xs font-semibold text-brand-green-700">
              {t("admin.media.fileSelected")}: {uploadedNotice}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-md">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy-800/40" />
          <label htmlFor="media-search" className="sr-only">
            {t("admin.media.searchPlaceholder")}
          </label>
          <input
            id="media-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("admin.media.searchPlaceholder")}
            className="w-full rounded-md border border-brand-navy-800/25 bg-white py-2.5 pl-10 pr-3 text-sm text-brand-navy-900 focus:border-brand-green-700"
          />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <fieldset>
          <legend className="text-xs font-black uppercase tracking-wide text-brand-navy-800/50">
            {t("admin.media.folder")}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {mediaFolders.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
                  folder.selected.includes(option.id)
                    ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
                    : "border-brand-navy-800/15 text-brand-navy-800/70"
                }`}
              >
                <input
                  type="checkbox"
                  checked={folder.selected.includes(option.id)}
                  onChange={() => folder.toggle(option.id)}
                  className="h-3.5 w-3.5 accent-brand-green-700"
                />
                {option.label[lang]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-black uppercase tracking-wide text-brand-navy-800/50">
            {t("admin.media.fileType")}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {mediaTypeOptions.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
                  fileType.selected.includes(option.id)
                    ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
                    : "border-brand-navy-800/15 text-brand-navy-800/70"
                }`}
              >
                <input
                  type="checkbox"
                  checked={fileType.selected.includes(option.id)}
                  onChange={() => fileType.toggle(option.id)}
                  className="h-3.5 w-3.5 accent-brand-green-700"
                />
                {option.label[lang]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brand-navy-800/10 pt-4">
        <label className="flex items-center gap-2 text-sm font-bold text-brand-navy-900">
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={toggleSelectAll}
            className="h-4 w-4 accent-brand-green-700"
          />
          {t("admin.media.selectAll")}
        </label>

        <div className="flex items-center gap-3">
          {copiedNotice && (
            <p role="status" className="text-xs font-semibold text-brand-green-700">
              {t("admin.media.referenceCopied")}: {copiedNotice}
            </p>
          )}
          {selectedIds.length > 0 && (
            <>
              <span className="text-sm font-semibold text-brand-navy-800/70">
                {selectedIds.length} {t("admin.media.selected")}
              </span>
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-bold text-red-700 hover:bg-red-50"
              >
                {t("admin.media.deleteSelected")}
              </button>
            </>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
          {t("common.noResults")}
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <MediaCard
              key={asset.id}
              asset={asset}
              selected={selectedIds.includes(asset.id)}
              onToggleSelect={() => toggleSelect(asset.id)}
              onPreview={() => setPreviewAsset(asset)}
              onCopyReference={() => handleCopyReference(asset)}
              onDelete={() => handleDeleteOne(asset)}
            />
          ))}
        </ul>
      )}

      <MediaPreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />
    </div>
  );
}
