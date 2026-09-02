import { useLanguage } from "../../i18n/useLanguage";
import type { ExternalOrg } from "../../data/externalLinks";
import { ExternalLinkIcon } from "../icons";

export function ExternalLinkCard({ org }: { org: ExternalOrg }) {
  const { lang, t } = useLanguage();

  return (
    <div className="flex h-full flex-col rounded-lg border border-brand-navy-800/12 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-brand-navy-900">{org.name[lang]}</h3>
        <ExternalLinkIcon className="h-4 w-4 shrink-0 text-brand-navy-800/40" />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
        {org.description[lang]}
      </p>
      <span className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-navy-800/50">
        {t("common.comingSoon")}
      </span>
    </div>
  );
}
