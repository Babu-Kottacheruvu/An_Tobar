import { useLanguage } from "../i18n/useLanguage";
import type { TranslationKey } from "../i18n/translations";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";

interface StaticInfoPageProps {
  titleKey: TranslationKey;
  body: { en: string; ga: string };
}

export function StaticInfoPage({ titleKey, body }: StaticInfoPageProps) {
  const { lang, t } = useLanguage();

  return (
    <>
      <Breadcrumbs items={[{ label: t(titleKey) }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">{t(titleKey)}</h1>
        <p className="mt-4 text-base leading-relaxed text-brand-navy-800/90">{body[lang]}</p>
      </div>
    </>
  );
}
