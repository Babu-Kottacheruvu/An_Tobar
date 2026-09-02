import { useId } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import { UploadIcon } from "../../icons";

const ACCEPT =
  ".pdf,.ppt,.pptx,.doc,.docx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,video/*,audio/*,image/*";

interface FileUploadFieldProps {
  fileName: string | null;
  onChange: (fileName: string | null) => void;
}

export function FileUploadField({ fileName, onChange }: FileUploadFieldProps) {
  const { t } = useLanguage();
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-brand-navy-900">
        {t("admin.res.fileUpload")}
      </label>
      <p className="text-xs text-brand-navy-800/50">{t("admin.res.acceptedTypes")}</p>
      <div className="flex items-center gap-3">
        <label
          htmlFor={id}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
        >
          <UploadIcon className="h-4 w-4" />
          {t("admin.res.chooseFiles")}
        </label>
        <input
          id={id}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(event) => onChange(event.target.files?.[0]?.name ?? null)}
        />
        <p className="text-sm text-brand-navy-800/70">
          {fileName ?? t("admin.media.noFileChosen")}
        </p>
      </div>
    </div>
  );
}
