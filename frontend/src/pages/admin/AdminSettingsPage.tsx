import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { TextField, CheckboxField } from "../../components/forms/FormField";

export function AdminSettingsPage() {
  const { t } = useLanguage();
  const [siteName, setSiteName] = useState("An Tobar");
  const [contactEmail, setContactEmail] = useState("eolas@antobar.ie");
  const [showIrishFirst, setShowIrishFirst] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.settings")}</h1>

      <form
        className="mt-6 flex max-w-lg flex-col gap-5 rounded-lg border border-brand-navy-800/12 bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <TextField label="Site name" value={siteName} onChange={setSiteName} required />
        <TextField
          label="Contact email"
          type="email"
          value={contactEmail}
          onChange={setContactEmail}
          required
        />
        <CheckboxField
          label="Show Irish (Gaeilge) by default for new visitors"
          checked={showIrishFirst}
          onChange={setShowIrishFirst}
        />

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            {t("common.save")}
          </button>
          {saved && (
            <span role="status" className="text-sm font-semibold text-brand-green-800">
              {t("common.save")} ✓
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
