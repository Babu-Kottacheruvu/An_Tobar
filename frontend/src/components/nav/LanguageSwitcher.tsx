import { useLanguage } from "../../i18n/useLanguage";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.switcherLabel")}
      className={`inline-flex items-center rounded-md border border-brand-navy-800/20 bg-white p-0.5 text-sm font-semibold ${className}`}
    >
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`min-h-9 rounded px-3 py-2 transition-colors ${
          lang === "en"
            ? "bg-brand-green-700 text-white"
            : "text-brand-navy-900 hover:bg-brand-green-50"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={lang === "ga"}
        onClick={() => setLang("ga")}
        className={`min-h-9 rounded px-3 py-2 transition-colors ${
          lang === "ga"
            ? "bg-brand-green-700 text-white"
            : "text-brand-navy-900 hover:bg-brand-green-50"
        }`}
      >
        GA
      </button>
    </div>
  );
}
