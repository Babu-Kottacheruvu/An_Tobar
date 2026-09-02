import { useId, useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import { Modal } from "../../common/Modal";
import { UploadIcon } from "../../icons";

export function ImportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClose = () => {
    setFileName(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("admin.res.import")}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-brand-navy-800/80">{t("admin.res.importIntro")}</p>

        <label
          htmlFor={inputId}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
        >
          <UploadIcon className="h-4 w-4" />
          {t("admin.res.importFile")}
        </label>
        <input
          id={inputId}
          type="file"
          accept=".csv,.json"
          className="sr-only"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        />

        {fileName && (
          <p className="text-sm font-semibold text-brand-green-800">
            {fileName} — {t("admin.res.readyToImport")}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900"
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            disabled={!fileName}
            onClick={handleClose}
            className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("admin.res.import")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
