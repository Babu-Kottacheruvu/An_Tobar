import { useState, type FormEvent } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { TextAreaField } from "../forms/FormField";
import { CheckIcon } from "../icons";

export function ReportIssueForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { t } = useLanguage();
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
          <CheckIcon className="h-6 w-6" />
        </span>
        <p className="font-semibold text-brand-navy-900">{t("bunscoil.detail.reportIssueThanks")}</p>
        <button
          type="button"
          onClick={onSubmitted}
          className="mt-2 rounded-md bg-brand-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("common.close")}
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <p className="text-sm text-brand-navy-800/80">{t("bunscoil.detail.reportIssueIntro")}</p>
      <TextAreaField
        label={t("bunscoil.detail.reportIssueLabel")}
        value={details}
        onChange={setDetails}
        required
        rows={4}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("common.submit")}
        </button>
      </div>
    </form>
  );
}
