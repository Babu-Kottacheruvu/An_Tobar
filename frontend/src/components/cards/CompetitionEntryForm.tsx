import { useState, type FormEvent } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { TextField, CheckboxField } from "../forms/FormField";
import { CheckIcon } from "../icons";

export function CompetitionEntryForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
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
        <p className="font-semibold text-brand-navy-900">{t("competitions.entrySubmitted")}</p>
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
      <p className="text-sm text-brand-navy-800/80">{t("competitions.enterModalIntro")}</p>
      <TextField label={t("competitions.entrantName")} value={name} onChange={setName} required />
      <TextField label={t("competitions.schoolName")} value={school} onChange={setSchool} required />
      <TextField
        label={t("competitions.contactEmail")}
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      <CheckboxField label={t("competitions.agreeToRules")} checked={agreed} onChange={setAgreed} />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!agreed}
          className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("common.submit")}
        </button>
      </div>
    </form>
  );
}
