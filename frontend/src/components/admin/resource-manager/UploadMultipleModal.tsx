import { useId, useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import { Modal } from "../../common/Modal";
import { UploadIcon, DocumentIcon, CheckIcon } from "../../icons";

export function UploadMultipleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const inputId = useId();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleClose = () => {
    setFileNames([]);
    setDone(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("admin.res.uploadMultiple")}>
      {done ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
            <CheckIcon className="h-6 w-6" />
          </span>
          <p className="font-semibold text-brand-navy-900">
            {fileNames.length} {t("admin.res.filesSelected")}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 rounded-md bg-brand-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            {t("common.close")}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label
            htmlFor={inputId}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <UploadIcon className="h-4 w-4" />
            {t("admin.res.chooseFiles")}
          </label>
          <input
            id={inputId}
            type="file"
            multiple
            className="sr-only"
            onChange={(event) => setFileNames(Array.from(event.target.files ?? []).map((file) => file.name))}
          />

          {fileNames.length > 0 && (
            <ul className="divide-y divide-brand-navy-800/10 rounded-md border border-brand-navy-800/12">
              {fileNames.map((name) => (
                <li key={name} className="flex items-center gap-2 px-3 py-2 text-sm text-brand-navy-900">
                  <DocumentIcon className="h-4 w-4 text-brand-navy-800/50" />
                  {name}
                </li>
              ))}
            </ul>
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
              disabled={fileNames.length === 0}
              onClick={() => setDone(true)}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("admin.res.startUpload")}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
