import { useLanguage } from "../../i18n/useLanguage";
import type { TranslationKey } from "../../i18n/translations";
import { SparkleIcon } from "../../components/icons";

interface BunscoilComingSoonProps {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}

export function BunscoilComingSoon({ titleKey, bodyKey }: BunscoilComingSoonProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold-50 text-brand-gold-600">
        <SparkleIcon className="h-8 w-8" />
      </span>
      <h1 className="mt-5 text-3xl font-black text-brand-navy-900 sm:text-4xl">{t(titleKey)}</h1>
      <p className="mt-3 text-base leading-relaxed text-brand-navy-800/80">{t(bodyKey)}</p>
      <span className="mt-6 rounded-full bg-brand-navy-800/10 px-4 py-2 text-sm font-bold text-brand-navy-800/70">
        {t("common.comingSoon")}
      </span>
    </div>
  );
}
